const express = require("express");
const router = express.Router();
const db = require("../mysqlDB/mysqlConn");
const msParser = require("../parser/msFileParser");
const multer = require("multer");
const nJwt = require("njwt");
const jwt_decode = require("jwt-decode");
const secureRandom = require("secure-random");
const cryptoJs = require("crypto-js");
const randomCryptoText =
  "cQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w9z$C";
const dest = `./public/uploads/`;
const quarantineDest = `./public/Quarantine/`;
const upload = multer({ dest: dest });
const Zip = require("adm-zip");
const fs = require("fs");
const path = require("path");
let _activeUsers = [];
let _incorrectLogins = [];
let _auditEnum = [];
const _signingKeyMap = {};
let _activeQuery = false;

// The various Roles
const wearer = 1;
const manufacturer = 2;
const scientist = 3;
const analyst = 4;
const manager = 5;
const administrator = 6;
const auditor = 7;
const developer = 8;
const demonstrator = 9;

// set to a 15 min idle lockout
const _timeout = 60 * 1000 * 15;
const _queries = [];

initBackendResources();

/*
 * Callback function used by the nJwt Verifier.
 * nJwt passes a key id to resolve which key was used to sign the initial JWT.
 * */
function signingKeyResolver(kid, cb) {
  let key = _signingKeyMap[kid];

  if (key) {
    return cb(null, key);
  }

  cb(new Error("Unknown kid"));
}

/*
 * Returns a JWT incorporating the userId and role of the user logging in.
 * The userId is concatenated with 'kid_' and saved as a key in the signingKeyMap.
 * The role of the user determines what level of encryption is used for demonstration
 * purposes to show how the JWT can be tailored for specific user.
 * */
function getRoleBasedToken(id, role, username) {
  let keyId = "kid_" + id;
  let base64SigningKey = getRoleBasedSigningKey(role);
  let algValue = getRoleBasedAlgorithm(role);
  let claims = {
    iss: process.env.API_URL,
    sub: id,
    role: role,
    username: username,
  };
  let retToken = nJwt
    .create(claims, base64SigningKey, algValue)
    .setHeader("kid", keyId);

  if (retToken) {
    _signingKeyMap[keyId] = base64SigningKey;
    const expires = Date.now() + 3600 * 1000 * 24;
    _queries.push({
      queryText:
        "INSERT INTO sessions (`session_id`, `expires`, `key`) VALUES(?,?,?) ON DUPLICATE KEY UPDATE sessions.expires = ?, sessions.key = ?;",
      params: [
        Number(id),
        expires,
        base64SigningKey,
        expires,
        base64SigningKey,
      ],
      callback: (error) => {
        if (error) {
          console.error(error);
          delete _signingKeyMap[keyId];
        }

        _activeQuery = false;
      },
    });

    evaluateQueries();
  }

  return retToken;
}

/*
 * Returns a securely, randomly generated string of bytes encoded in base64 in order to make the
 * signing key persistent in the database.
 * */
function getRoleBasedSigningKey(role) {
  switch (true) {
    case role >= 6:
      return secureRandom.randomBuffer(512).toString("base64");
    case role >= 3:
      return secureRandom.randomBuffer(384).toString("base64");
    default:
      return secureRandom.randomBuffer(256).toString("base64");
  }
}

/*
 * Returns the algorithm value to pass to nJwt to create a secure json web token.
 * */
function getRoleBasedAlgorithm(role) {
  switch (true) {
    case role >= 6:
      return "HS512";
    case role >= 3:
      return "HS384";
    default:
      return "HS256";
  }
}

/*
 * Function to verify url encoded json web tokens (jwt) attached to incoming requests.
 * Incorporates jwt_decode to obtain the key id that will map to the actual signing key
 * used sign the jwt when created. Only the backend knows of these signing keys and they
 * should not be passed backed to the frontend for any reason.
 * nJwt.verify(...) returns a parsed json web token if all checks are passed and the request
 * is subsequently trusted. If there is an error, an exception is thrown and caught in the
 * router.all(...) handler.
 * */
function verifyRequest(jwt) {
  let decodedJwt = jwt_decode(jwt, {
    header: true,
  });
  return nJwt
    .createVerifier()
    .withKeyResolver(signingKeyResolver)
    .setSigningKey(_signingKeyMap[decodedJwt.kid])
    .setSigningAlgorithm(decodedJwt.alg)
    .verify(jwt);
}

function encrypt(value) {
  const key = cryptoJs.enc.Utf8.parse(randomCryptoText);
  const iv = cryptoJs.enc.Utf8.parse(randomCryptoText);
  const encrypted = cryptoJs.AES.encrypt(
    cryptoJs.enc.Utf8.parse(value.toString()),
    key,
    {
      keySize: 256 / 32,
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7,
    }
  );

  return encrypted.toString();
}

router.all("*", function (req, res, next) {
  let requestPath = req.path;
  let requestMethod = req.method.toUpperCase();
  if (requestPath.endsWith("maintenance") && requestMethod === "GET") {
    next();
  } else if (
    requestPath.endsWith("/auth") &&
    (requestMethod === "POST" || requestMethod === "PUT")
  ) {
    next();
  } else {
    try {
      const incomingJwt = verifyRequest(req.header("Authorization"));
      const subId = Number(incomingJwt.body.sub);
      const subRole = Number(incomingJwt.body.role);
      const username = incomingJwt.body.username;
      if (!_activeUsers.find((x) => x.id === subId)) {
        _activeUsers.push({
          id: subId,
          username: username,
          role: subRole,
          group_id: "unknown",
          location_id: 1,
          inactive_timeout: Date.now() + _timeout,
          ipAddress: req.socket.remoteAddress,
          jwt: req.header("Authorization"),
        });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ help: "Authorization not found.", error: error });
    }
  }
});

router.post("/getTokens", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  const queryText =
    "SELECT * FROM xplosafedb.token_table AS tt " +
    "WHERE tt.badge_serial_number = ?;";
  _queries.push({
    queryText,
    params: [req.body.serialNum],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        if (req.body.tokenId === "") {
          res.status(200).json(null);
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      }
    },
  });

  evaluateQueries();
});

router.post("/upload", upload.array("file", 25), function (req, res, next) {
  // A word of caution, these be strings...
  const {
    badge_serial_number,
    tube_number,
    raw_comments,
    uploaded_by,
    raw_data_id,
  } = req.body;

  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];

  try {
    let userId = Number(uploaded_by);
    if (!checkUserStatus(userId, allowedAccounts)) {
      return res
        .status(401)
        .json({ status: "User not found Access Not Allowed" });
    }

    if (!req.files) {
      generateAudit(userId, 14);
      return res.sendStatus(501).end();
    }

    req.files.forEach((file) => {
      let quarantinedFile = false;
      let {
        fieldname /*    fieldname: 'file' todo: possible differentiator between different file uploads*/,
        originalname /* originalname: 'export.csv' */,
        encoding /*     encoding: '7bit' todo: may want to save for response of download request*/,
        mimetype /*     mimetype: 'application/vnd.ms-excel' todo: may want to save for response of download request*/,
        destination /*  destination: 'public/uploads/' */,
        filename /*     filename: '335834eb2c3a71fb0bba2ea61ad74188' */,
        path /*         path: 'public\\uploads\\335834eb2c3a71fb0bba2ea61ad74188' */,
        size /*         size: 5713 todo: may want to set a limit*/,
      } = file; /* see https://www.npmjs.com/package/multer#file-information for description */

      if (filename === undefined) {
        if (!res.headersSent) res.sendStatus(501);
      }
      if (raw_data_id === undefined) {
        if (!res.headersSent) res.sendStatus(501);
      }

      try {
        const zip = new Zip(path, { readEntries: true });
        if (zip.test("DATA.MS")) {
          zip.getEntries().forEach(function (zipEntry) {
            if (zipEntry.entryName.endsWith("DATA.MS")) {
              quarantinedFile = !msParser.validate(zipEntry.getData());
              if (quarantinedFile) {
                msParser.moveFile(path, quarantineDest + filename);
              }
            }
          });
        } else {
          return res.status(555).json({ status: "No DATA.MS file was found" });
        }
      } catch (e) {
        console.debug("Received an uncompressed file.");
        if (file.originalname.endsWith(".MS")) {
          quarantinedFile = !msParser.validate(fs.readFileSync(path).buffer);
          if (quarantinedFile) {
            msParser.moveFile(path, quarantineDest + filename);
          }
        } else {
          return res.status(555).json({ status: "No DATA.MS file was found" });
        }
      }

      if (!res.headersSent) {
        /*
         * The following is a primitive query builder of sorts.
         *   1) Initialize queryText with the start of the query up to the first parameter.
         *   2) Don't add padding! This is handled next.
         *   3) Push an array with queryText in [0] and the value you want to assign in place of the question mark in [1].
         *   4) Don't add the semi-colon anywhere! This is handled last.
         */
        const qb = [];
        let queryText = "UPDATE xplosafedb.raw_data_table SET";
        qb.push(["raw_data=?", filename]);
        qb.push(["raw_uploaded_by=?", Number(uploaded_by)]);
        qb.push(["raw_comments=?", raw_comments]);
        qb.push(["original_filename=?", originalname]);
        qb.push(["date_last_updated=?", new Date(Date.now()).toString()]);
        qb.push(["WHERE id=?", Number(raw_data_id)]);

        let myParams = [];
        qb.forEach((value, index) => {
          // The query builder is filled with arrays of two values. Access elements of value like a tuple.
          const [text, param] = value;
          /*
           * The following concatenates the query components properly.
           *   1) queryText should already contain the start of the query up to the first parameter.
           *   2) Here the index starts at zero (0).
           *   3) Switch determines whether a space (" "), a comma (,), and/or a semi-colon (;) should be used.
           *      a) For index = 0: queryText += " " + text
           *      b) For index = 1..N-1: queryText += ", " + text
           *      c) For index = N: queryText += " " + text + ";"
           */
          switch (true) {
            case index === 0:
              queryText += " " + text;
              break;
            case index < qb.length - 1:
              queryText += ", " + text;
              break;
            case index === qb.length - 1:
              queryText += " " + text + ";";
              break;
          }
          // Build up the params parameter to be passed with the query text to db.
          myParams.push(param);
        });

        _queries.push({
          queryText,
          params: myParams,
          callback: (error, results) => {
            _activeQuery = false;
            if (error) {
              console.error(error);
              generateAudit(userId, 14);
              evaluateQueries();
              return res.status(500).json({ status: "error" });
            } else {
              generateAudit(userId, 13);
              const user = _activeUsers.find((x) => x.id === userId);
              let name = user.username;
              if (name === "unknown") {
                name = "User: " + user.id.toString();
              }
              let relinquishingParty = getBadgeManager(badge_serial_number);
              if (!relinquishingParty) {
                relinquishingParty = name;
              }
              generateChainOfEvents(
                relinquishingParty,
                name,
                badge_serial_number,
                "Badge has been accepted for analysis."
              );
              evaluateQueries();
              if (quarantinedFile) {
                // Indicates to the Front-End Service that the file had problems and was quarantined.
                console.debug(
                  `-----------------------------------File: ${originalname} was quarantined----------------------------------------`
                );
                return res.status(204).json(results);
              } else {
                // Indicates a successful file parsing and upload.
                console.debug(
                  `-----------------------------------File: ${originalname} was successfully uploaded------------------------------`
                );
                return res.status(200).json(results);
              }
            }
          },
        });

        evaluateQueries();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error" });
  }
});

router.post("/deleteAnalyzedReport", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(Number(req.body.activeUserId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  let params = [req.body.pk];
  _queries.push({
    queryText:
      "DELETE FROM xplosafedb.analyzed_token_table " + "WHERE (`id` = ?);",
    params: params,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        generateAudit(req.body.activeUserId, 25);
        let p = [req.body.pk];
        doehrsAnalyteResult(p, 3);
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.put("/updateAnalyzedReport", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(Number(req.body.activeUserId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  const updatedTime = new Date(Date.now());
  let params = [
    req.body.recorded_value,
    req.body.recorded_units,
    req.body.volume_concentration,
    req.body.found_concentration,
    req.body.concentration_units,
    req.body.token_id,
    req.body.badge_serial_number,
    req.body.analyte_name,
    req.body.cas_number,
    req.body.analyst_id,
    req.body.reporting_limit,
    req.body.analysis_method,
    req.body.comments,
    req.body.token_type,
    updatedTime,
    req.body.pk,
  ];
  _queries.push({
    queryText:
      "UPDATE analyzed_token_table SET " +
      "`recorded_value` = ?, `recorded_units` = ?, `volume_concentration` = ?, `found_concentration` = ?, " +
      "`concentration_units` = ?, `token_id` = ?, `badge_serial_number` = ?, `analyte_name` = ?, `cas_number` = ?, " +
      "`analyst_id` = ?, `reporting_limit` = ?, `analysis_method` = ?, `analyzed_comments` = ?, `token_type` = ?, `date_last_updated` = ? " +
      "WHERE (`id` = ?);",
    params,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        generateAudit(req.body.activeUserId, 24);
        let p = [
          req.body.editedBadgeSerialNumber,
          req.body.cas_number,
          req.body.analyte_name,
          updatedTime,
          req.body.token_type,
          req.body.analysis_method,
          req.body.recorded_value,
          null,
          null,
          null,
          req.body.recorded_units,
          req.body.found_concentration,
          null,
          req.body.volume_concentration,
          null,
          req.body.concentration_units,
          0,
          req.body.comments,
          null,
          null,
          req.body.token_id,
          req.body.pk,
        ];
        doehrsAnalyteResult(p, 2);
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getSpecifiedAnalyzedToken", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(Number(req.body.activeUserId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  let params = [
    req.body.badgeSerialNumber,
    req.body.tokenId,
    req.body.analyteName,
  ];
  _queries.push({
    queryText:
      "SELECT * From analyzed_token_table " +
      "WHERE (`badge_serial_number` = ? and `token_id` = ? and analyte_name = ?) Order by `id` DESC Limit 1;",
    params,
    callback: (error, results) => {
      if (error) {
        console.error(error);
        _activeQuery = false;
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        _activeQuery = false;
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/analyzedReport", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(Number(req.body.activeUserId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  const updatedTime = new Date(Date.now());
  let params = [
    req.body.recorded_value,
    req.body.recorded_units,
    req.body.volume_concentration,
    req.body.found_concentration,
    req.body.concentration_units,
    req.body.token_id,
    req.body.badge_serial_number,
    req.body.analyte_name,
    req.body.cas_number,
    Number(req.body.activeUserId),
    req.body.reporting_limit,
    req.body.analysis_method,
    req.body.comments,
    req.body.token_type,
    updatedTime,
    updatedTime,
    req.body.data_table_id,
  ];
  _queries.push({
    queryText:
      "Insert into analyzed_token_table " +
      "(`recorded_value`, `recorded_units`, `volume_concentration`, `found_concentration`, `concentration_units`, " +
      "`token_id`, `badge_serial_number`, `analyte_name`, `cas_number`, `analyst_id`, `reporting_limit`, " +
      "`analysis_method`, `analyzed_comments`, `token_type`, `date_created`, `date_last_updated`, `data_table_id`) " +
      "Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    params,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        generateAudit(req.body.activeUserId, 23);
        let p = [
          req.body.editedBadgeSerialNumber,
          req.body.cas_number,
          req.body.analyte_name,
          updatedTime,
          req.body.token_type,
          req.body.analysis_method,
          req.body.recorded_value,
          null,
          null,
          null,
          req.body.recorded_units,
          req.body.found_concentration,
          null,
          req.body.volume_concentration,
          null,
          req.body.concentration_units,
          0,
          req.body.comments,
          null,
          null,
          req.body.token_id,
        ];
        doehrsAnalyteResult(p, 1);
        updateBadgeStatus(req.body.badge_serial_number, 8);
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getFoundAnalytesFromTokens", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(Number(req.body.activeUserId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  _queries.push({
    queryText:
      "Select cas_number, analyte_name from xplosafedb.analyzed_token_table;",
    params: [],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getSpecificAnalyteFromTokens", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.body.activeUserId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  let params = [req.body.casNum];
  _queries.push({
    queryText:
      "Select * from xplosafedb.analyzed_token_table where xplosafedb.analyzed_token_table.cas_number = ?;",
    params,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getAnalyzedReports", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  let queryText;
  let params;
  if (req.body.token_id) {
    queryText =
      "SELECT * FROM xplosafedb.analyzed_token_table where `badge_serial_number` = ? AND `token_id` = ?;";
    params = [req.body.badgeSerialNumber, req.body.token_id];
  } else if (req.body.badgeSerialNumber) {
    queryText =
      "SELECT * FROM xplosafedb.analyzed_token_table where `badge_serial_number` = ?;";
    params = [req.body.badgeSerialNumber];
  } else {
    queryText = "SELECT * FROM xplosafedb.analyzed_token_table;";
    params = [];
  }

  _queries.push({
    queryText,
    params,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/addBadge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "Insert into xplosafedb.badge_table (`badge_serial_number`, `badge_status`, `expiration_date`, `batch_group`, `number_of_tokens`, `date_created`,`date_last_updated`) values (?,1,?,?,?,?,?);",
      params: [
        req.body.badgeSerialNumber,
        req.body.expirationDate,
        req.body.batchGroup,
        req.body.numberOfTokens,
        updatedTime,
        updatedTime,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 3);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/removeBadge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "Delete From xplosafedb.badge_table Where (id = ? and badge_serial_number = ?);",
      params: [req.body.badgeId, req.body.badgeSerialNumber],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 3);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/getTokenStates", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText: "Select * from xplosafedb.token_state_table;",
      params: [],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/getTokenTypes", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText: "Select * from xplosafedb.token_type_table;",
      params: [],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/getTargetAnalytes", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "SELECT * FROM xplosafedb.token_target_analytes_table WHERE badge_serial_number = ? and token_id = ?;",
      params: [req.body.badgeSerialNumber, req.body.tokenId],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/updateToken", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "UPDATE xplosafedb.token_table Set `type` = ?, `state` = ? Where `badge_serial_number` = ? && `tube_number` = ?;",
      params: [
        req.body.tokenType,
        req.body.tokenState,
        req.body.badgeSerialNumber,
        req.body.tubeNumber,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/addTargetAnalyte", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: wearer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "Insert into xplosafedb.token_target_analytes_table " +
        "(badge_serial_number, token_id, target_analyte_name, target_cas_number, token_type) values (?, ?, ?, ?, ?);",
      params: [
        req.body.badgeSerialNumber,
        req.body.tubeNumber,
        req.body.targetName,
        req.body.targetCasNumber,
        req.body.tokenType,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/addLocation", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "Insert into xplosafedb.location_table (`city`, `state`, `base`, `country`) values (?,?,?,?);",
      params: [
        req.body.cityValue,
        req.body.stateValue,
        req.body.baseValue,
        req.body.countryValue,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 21);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/updateLocation", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  console.log(req);
  console.log(req.body);
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res.status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "UPDATE xplosafedb.location_table Set `city` = ?, `state` = ?, `base` = ?, `country` = ? Where `id` = ?;",
      params: [
        req.body.cityValue,
        req.body.stateValue,
        req.body.baseValue,
        req.body.countryValue,
        req.body.idValue,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 22);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/editBadge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "update xplosafedb.badge_table Set " +
        "`assigned_user` = ?, " +
        "`badge_status` = ?, " +
        "`activated_time` = ?, " +
        "`turned_in_time` = ?, " +
        "`date_last_updated` = ?, " +
        "`temperature_celsius` = ?, " +
        "`temperature_fahrenheit` = ?, " +
        "`vapors_exposed` = ?, " +
        "`relative_humidity` = ?, " +
        "`notes` = ? " +
        "where (id = ? and badge_serial_number = ?);",
      params: [
        req.body.assignedUser,
        req.body.badgeStatus,
        req.body.activatedTime,
        req.body.turnedInTime,
        updatedTime,
        req.body.temperatureCelsius,
        req.body.temperatureFahrenheit,
        req.body.vaporsExposed,
        req.body.relativeHumidity,
        req.body.notes,
        req.body.badgeId,
        req.body.badgeSerialNumber,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          generateAudit(req.body.activeUserId, 3);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/customData", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT d.badge_serial_number, badge_table.assigned_user, rt.position as role, d.analyst, " +
      "bs.status as badge_status, badge_table.activated_time, badge_table.turned_in_time, " +
      "badge_table.batch_group, badge_table.number_of_tokens, r.original_filename, " +
      "r.raw_comments, badge_table.date_created, badge_table.date_last_updated, " +
      "badge_table.expiration_date, l.group_id, g.manager_name as manager, lt.city as location " +
      "FROM xplosafedb.badge_table " +
      "left join xplosafedb.data_table d on xplosafedb.badge_table.badge_serial_number = d.badge_serial_number " +
      "left join xplosafedb.raw_data_table r on d.raw_data_id = r.id " +
      "left join xplosafedb.login_table l on l.username = xplosafedb.badge_table.assigned_user " +
      "left join xplosafedb.group_table g on g.id = l.group_id " +
      "left join xplosafedb.role_table rt on rt.id = l.role " +
      "left join xplosafedb.badge_status_table bs on bs.id = badge_table.badge_status " +
      "left join xplosafedb.location_table lt on lt.id = l.location_id;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/tokenReportAggregateValues", function (req, res, next) {
  _queries.push({
    queryText:
      "SELECT b.badge_status, b.badge_serial_number, tt.data_table_id, tt.tube_number, tt.state as token_state," +
      "tt.raw_data_id, r.raw_data, r.original_filename, r.raw_comments, r.date_last_updated " +
      "FROM badge_table b join token_table tt on b.badge_serial_number = tt.badge_serial_number " +
      "join raw_data_table r on tt.raw_data_id = r.id WHERE b.badge_status = ?;",
    params: [Number(req.body.badge_status)],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/role", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT * FROM xplosafedb.role_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/downloadFile", function (req, res, next) {
  // todo Get storage location from upload(Multer)
  // todo Get filename(s) and originalFilename(s) from db using badgeSN and token#
  // todo res.download(storedPath + filename, originalFilename, ...)
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  console.log(JSON.stringify(req.body));
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    res.download(
      path.join(__dirname, dest, req.body.fileName),
      req.body.desiredFilename,
      (error) => {
        if (error) {
          console.error(error);
          if (!res.headersSent) {
            res.status(500).json({ status: "error" });
          }
        }
      }
    );
  }
});

router.get("/getmovedfile/:fn", (req, res, next) => {
  // todo Delete this eyesore and update /download handler.
  const fileNameToGet = `${req.params.fn}`;
  res.download(
    path.join(__dirname, "../public/download/", fileNameToGet),
    fileNameToGet,
    (error) => {
      if (error) {
        console.error(error);
        if (!res.headersSent) {
          res.status(500).json({ status: "error" });
        }
      }
    }
  );
});

router.post("/badge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  _queries.push({
    queryText: "SELECT * FROM xplosafedb.badge_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/turnInBadge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: wearer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "UPDATE xplosafedb.badge_table Set " +
        "`badge_status` = 4, " +
        "`activated_time` = ?, " +
        "`turned_in_time` = ?, " +
        "`date_last_updated` = ?, " +
        "`temperature_celsius` = ?, " +
        "`temperature_fahrenheit` = ?, " +
        "`vapors_exposed` = ?, " +
        "`relative_humidity` = ?, " +
        "`notes` = ? " +
        "WHERE (`badge_serial_number` = ?);",
      params: [
        req.body.activatedTime,
        req.body.turnedInTime,
        updatedTime,
        req.body.celsiusTemp,
        req.body.fahrenheitTemp,
        req.body.vaporsExposed,
        req.body.relativeHumidity,
        req.body.notes,
        req.body.badgeSerialNumber,
        req.body.turnedInTime,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 5);
          const id = "id";
          const user = _activeUsers.find(
            (x) => x[id] === req.body.activeUserId
          );
          const key = "username";
          let name = user[key];
          if (name === "unknown") {
            name = "User: " + user.id.toString();
          }
          generateChainOfEvents(
            name,
            getBadgeManager(req.body.badge_serial_number),
            req.body.badgeSerialNumber,
            "Badge has been turned in by wearer and will be sent off to lab."
          );
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/issueBadge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: wearer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "UPDATE xplosafedb.badge_table Set `assigned_user` = ?, `badge_status` = ?, `activated_time` = ?, `date_last_updated` = ? WHERE (`badge_serial_number` = ?);",
      params: [
        req.body.selectedUser,
        req.body.badgeStatus,
        req.body.issuedTime,
        updatedTime,
        req.body.badgeSerialNumber,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 4);
          const user = _activeUsers.find((x) => x.id === req.body.activeUserId);
          const key = "username";
          let name = user[key];
          if (name === "unknown") {
            name = "User: " + user.id.toString();
          }
          if (user.role && user.role > 1) {
            generateChainOfEvents(
              "Manufacturer",
              name,
              req.body.badgeSerialNumber,
              "Badge has been Accepted by Manager."
            );
            generateChainOfEvents(
              name,
              req.body.selectedUser,
              req.body.badgeSerialNumber,
              "Badge has been issued to wearer."
            );
          }
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/getSpecificBadge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: wearer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manufacturer },
    { allowedRole: manager },
    { allowedRole: auditor },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "SELECT * from xplosafedb.badge_table WHERE (`badge_serial_number` = ?);",
      params: [req.body.badgeSerialNumber],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/getBadgeAnalyst", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: wearer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: manufacturer },
    { allowedRole: manager },
    { allowedRole: auditor },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    _queries.push({
      queryText:
        "SELECT * from xplosafedb.login_table join " +
        "xplosafedb.data_table d where xplosafedb.login_table.id = d.analyst_id and d.badge_serial_number = ?;",
      params: [req.body.badgeSerialNumber],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/data", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT * FROM xplosafedb.data_table " +
      "JOIN xplosafedb.raw_data_table r " +
      "Join xplosafedb.login_table l " +
      "Join xplosafedb.location_table loc " +
      "WHERE raw_data_id = r.id and l.id = wearer_id and loc.id = l.location_id;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getAnalytesForReport", function (req, res, next) {
  _queries.push({
    queryText:
      "SELECT analyte_name as name, cas_number FROM xplosafedb.analyte_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        res.statusText = error;
        console.error(error);
        res.status(500).json([]);
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getAnalytes", function (req, res, next) {
  let column;
  if (req.body.searchField === "name") {
    column = "analyte_name";
  } else if (req.body.searchField === "cas") {
    column = "cas_number";
  } else {
    column = "unknown";
  }

  if (column !== "unknown") {
    let search = req.body.analyteLike;
    _queries.push({
      queryText:
        "SELECT analyte_name as name, cas_number FROM xplosafedb.analyte_table WHERE analyte_name LIKE '?%';",
      params: [column, search],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          res.statusText = error;
          res.status(201).json([]);
          evaluateQueries();
        } else {
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  } else {
    res.status(354).json([]);
  }
});

router.post("/updateAnalyte", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: analyst },
    { allowedRole: scientist },
    { allowedRole: manufacturer },
    { allowedRole: wearer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "UPDATE xplosafedb.analyte_table " +
        "Set `osha_pel_ppm` = ?, " +
        "`osha_pel_mg` = ?, " +
        "`cal_osha_pel_8_hour_twa` = ?, " +
        "`cal_osha_pel_8_hour_twa_st` = ?, " +
        "`cal_osha_pel_8_hour_twa_c` = ?, " +
        "`niosh_rel_10_hour_twa` = ?, " +
        "`niosh_rel_10_hour_twa_st` = ?, " +
        "`niosh_rel_10_hour_twa_c` = ?, " +
        "`acgih_2019_tlv_8_hour_twa` = ?, " +
        "`acgih_2019_tlv_8_hour_twa_st` = ?, " +
        "`acgih_2019_tlv_8_hour_twa_c` = ?, " +
        "`reporting_limit` = ?, " +
        "`date_last_updated` = ?, " +
        "`molecular_weight` = ? WHERE (`cas_number` = ?);",
      params: [
        req.body.osha_pel_ppm,
        req.body.osha_pel_mg,
        req.body.cal_osha_pel_8_hour_twa,
        req.body.cal_osha_pel_8_hour_twa_st,
        req.body.cal_osha_pel_8_hour_twa_c,
        req.body.niosh_rel_10_hour_twa,
        req.body.niosh_rel_10_hour_twa_st,
        req.body.niosh_rel_10_hour_twa_c,
        req.body.acgih_2019_tlv_8_hour_twa,
        req.body.acgih_2019_tlv_8_hour_twa_st,
        req.body.acgih_2019_tlv_8_hour_twa_c,
        req.body.reporting_limit,
        updatedTime,
        req.body.molecular_weight,
        req.body.cas_number,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 18);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/updateSamplingRate", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: analyst },
    { allowedRole: scientist },
    { allowedRole: manufacturer },
    { allowedRole: wearer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "UPDATE xplosafedb.sampling_rate_table " +
        "Set `osu_6_sampling_rate` = ?, " +
        "`detection_limit` = ?, " +
        "`date_last_updated` = ? WHERE (`cas_number` = ?);",
      params: [
        req.body.osu_6_sampling_rate,
        req.body.detection_limit,
        updatedTime,
        req.body.cas_number,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 19);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/samplingRate", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
    { allowedRole: scientist },
    { allowedRole: wearer },
    { allowedRole: analyst },
    { allowedRole: manufacturer },
  ];
  if (!checkUserStatus(Number(req.body.activeUserId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  _queries.push({
    queryText: "SELECT * FROM xplosafedb.sampling_rate_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/analyteExposureRatings", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: manufacturer },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  refreshActivity(req.body.activeUserId);
  _queries.push({
    queryText:
      "SELECT" +
      "    a.`id` as 'id'," +
      "    a.`analyte_name` as 'analyte_name'," +
      "    a.`cas_number` as 'cas_number'," +
      "    a.`osha_pel_ppm` as 'osha_pel_ppm'," +
      "    a.`osha_pel_mg` as 'osha_pel_mg'," +
      "    a.`cal_osha_pel_8_hour_twa` as 'cal_osha_pel_8_hour_twa'," +
      "    a.`cal_osha_pel_8_hour_twa_st` as 'cal_osha_pel_8_hour_twa_st'," +
      "    a.`cal_osha_pel_8_hour_twa_c` as 'cal_osha_pel_8_hour_twa_c'," +
      "    a.`niosh_rel_10_hour_twa` as 'niosh_rel_10_hour_twa'," +
      "    a.`niosh_rel_10_hour_twa_st` as 'niosh_rel_10_hour_twa_st'," +
      "    a.`niosh_rel_10_hour_twa_c` as 'niosh_rel_10_hour_twa_c'," +
      "    a.`acgih_2019_tlv_8_hour_twa` as 'acgih_2019_tlv_8_hour_twa'," +
      "    a.`acgih_2019_tlv_8_hour_twa_st` as 'acgih_2019_tlv_8_hour_twa_st'," +
      "    a.`acgih_2019_tlv_8_hour_twa_c` as 'acgih_2019_tlv_8_hour_twa_c'," +
      "    a.`date_last_updated` as 'date_last_updated'," +
      "    a.`molecular_weight` as 'molecular_weight'," +
      "    a.`reporting_limit` as 'reporting_limit'," +
      "    a.`sampling_rate` as 'sampling_rate'," +
      "    s.`detection_limit` as 'detection_limit'," +
      "    s.`osu_6_sampling_rate` as 'osu_6_sampling_rate'" +
      "    FROM xplosafedb.analyte_table a left join xplosafedb.sampling_rate_table s on a.id = s.analyte_id;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/methods", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: manufacturer },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  refreshActivity(req.body.activeUserId);
  _queries.push({
    queryText: "SELECT * FROM xplosafedb.method_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/tokenTypes", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: manufacturer },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  refreshActivity(req.body.activeUserId);
  _queries.push({
    queryText: "SELECT * FROM xplosafedb.token_type_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/reportDamagedBadge", function (req, res) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
    { allowedRole: scientist },
    { allowedRole: analyst },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res.status(401).json({ status: "User Access Not Allowed" });
  }

  const updatedTime = new Date(Date.now());
  _queries.push({
    queryText:
      "update xplosafedb.badge_table b" +
      " join xplosafedb.data_table d on b.badge_serial_number = d.badge_serial_number" +
      " join xplosafedb.raw_data_table r on d.raw_data_id = r.id" +
      " set b.`badge_status` = 6," +
      " b.`date_last_updated` = ?," +
      " r.`date_last_updated` = ?," +
      " r.`raw_comments` = ?" +
      " where b.`badge_serial_number` = ?;",
    params: [updatedTime, updatedTime, req.body.comments, req.body.badgeId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        generateAudit(req.body.activeUserId, 17);
        const id = "id";
        const user = _activeUsers.find((x) => x[id] === req.body.activeUserId);
        const key = "username";
        let name = user[key];
        if (name === "unknown") {
          name = "User: " + user.id.toString();
        }
        generateChainOfEvents(
          getBadgeManager(req.body.badgeSerialNumber),
          name,
          req.body.badgeSerialNumber,
          "Badge is marked as Damaged Due to: " + req.body.comments
        );
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/checkbadge", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  if (req.body.badgeId === "") {
    res.status(200).json(null);
  }
  _queries.push({
    queryText:
      "SELECT (COUNT(*)>0) as does_exist FROM xplosafedb.badge_table WHERE badge_serial_number=?;",
    params: [req.body.badgeId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        if (!res.headersSent) {
          console.error(error);
          res.status(500).json({ status: "error" });
        }
        evaluateQueries();
      } else {
        if (!res.headersSent) {
          res.status(200).json(results);
        }
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getManager/:groupId", function (req, res, next) {
  _queries.push({
    queryText:
      "SELECT * FROM xplosafedb.login_table AS lt WHERE lt.id IN " +
      "(SELECT gt.manager_id FROM xplosafedb.group_table AS gt WHERE gt.id = ?);",
    params: [Number(req.params.groupId)],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getSubordinates/:managerId", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.managerId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  _queries.push({
    queryText:
      "SELECT *" +
      " FROM xplosafedb.login_table AS lt" +
      " WHERE lt.group_id IN (SELECT gt.id" +
      " FROM xplosafedb.group_table AS gt" +
      " WHERE gt.manager_id = ?) and lt.id != ?;",
    params: [Number(req.params.managerId), Number(req.params.managerId)],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getAnalyzedTokens/:analystId", function (req, res) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.analystId), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT * FROM xplosafedb.analyzed_token_table;",
    params: [],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getSubordinantAnalyzedTokens", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT * FROM xplosafedb.analyzed_token_table AS att " +
      "WHERE att.badge_serial_number = " +
      "(select badge_serial_number from xplosafedb.badge_table bt " +
      "JOIN xplosafedb.login_table AS lt " +
      "WHERE (lt.username = bt.assigned_user " +
      "AND lt.id != ? AND bt.badge_status = 4 " +
      "AND att.badge_serial_number = bt.badge_serial_number " +
      "AND lt.group_id = (select id from xplosafedb.group_table " +
      "where xplosafedb.group_table.manager_id = ?)));",
    params: [req.body.activeUserId, req.body.activeUserId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getUsers:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT id, Username FROM xplosafedb.login_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.put("/users/:id", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];

  const {
    updatedRole,
    updatedPassword,
    updatedGroup,
    updatedLocation,
    updatedAccountLock,
    activeUserId,
    subordinateId,
  } = req.body;

  if (!checkUserStatus(activeUserId, allowedAccounts)) {
    return res.status(401).json({ status: "User Access Not Allowed" });
  }

  const queryBuilder = [];
  let queryText = "UPDATE login_table SET";
  if (updatedPassword !== undefined && updatedPassword !== null) {
    queryBuilder.push(["password=?", encrypt(updatedPassword)]);
  }
  if (updatedRole !== undefined && updatedRole !== null) {
    queryBuilder.push(["role=?", updatedRole]);
  }
  if (updatedGroup !== undefined && updatedGroup !== null) {
    queryBuilder.push(["group_id=?", updatedGroup]);
  }
  if (updatedLocation !== undefined && updatedLocation !== null) {
    queryBuilder.push(["location_id=?", updatedLocation]);
  }
  if (updatedAccountLock !== undefined && updatedAccountLock !== null) {
    queryBuilder.push(["account_locked=?", updatedAccountLock]);
    if (!updatedAccountLock) {
      queryBuilder.push(["login_threshold_exceeded=?", updatedAccountLock]);
    }
  }
  if (queryBuilder.length >= 1) {
    queryBuilder.push(["date_last_updated=?", new Date(Date.now())]);
    if (subordinateId !== undefined) {
      queryBuilder.push(["WHERE id=?;", subordinateId]);
    } else {
      queryBuilder.push(["WHERE id=?;", activeUserId]);
    }
  }

  let myParams = [];
  queryBuilder.forEach((value, index) => {
    // Tuple assignment
    const [text, param] = value;
    queryText +=
      (index >= 1 && index < queryBuilder.length - 1 ? ", " : " ") + text;
    myParams.push(param);
  });

  _queries.push({
    queryText,
    params: myParams,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        generateAudit(activeUserId, 7);
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/addUser", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  let nextExpirationDate = new Date(86400 * 90 * 1000).valueOf(); // 90 days worth of milliseconds.
  let currentTime = Date.now().valueOf(); // A "now's" worth of milliseconds (# of milliseconds since Jan. 1st 1970)
  nextExpirationDate = new Date(nextExpirationDate + currentTime).valueOf(); // Add them together and you have the next time the password expires.
  const updatedTime = new Date(Date.now());
  _queries.push({
    queryText:
      "Insert into xplosafedb.login_table(username, password, role, group_id, location_id, date_created, date_last_updated, date_password_expires) values (?, ?, ?, ?, ?, ?, ?, ?);",
    params: [
      req.body.username,
      encrypt(req.body.password),
      req.body.role,
      req.body.group_id,
      req.body.location_id,
      updatedTime,
      updatedTime,
      nextExpirationDate,
    ],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        generateAudit(req.body.activeUserId, 16);
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/updateUserGroup", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    res
      .status(401)
      .json({ status: "Active User not found Access Not Allowed" });
  } else {
    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "UPDATE xplosafedb.login_table Set `group_id` = ?, `date_last_updated` = ? WHERE (`id` = ?);",
      params: [req.body.group_id, updatedTime, req.body.userId],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(req.body.activeUserId, 7);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  }
});

router.post("/getBadges", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT badge_serial_number FROM xplosafedb.badge_table Where badge_status = ?;",
    params: [req.body.badgeStatus],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getWearerBadgesByStatus", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT badge_serial_number FROM xplosafedb.badge_table Where " +
      "(badge_status = ? and assigned_user = (select username from xplosafedb.login_table where id = ?));",
    params: [req.body.badgeStatus, req.body.activeUserId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getWearerBadgeValuesByStatus", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT * FROM xplosafedb.badge_table Where " +
      "(badge_status = ? and assigned_user = (select username from xplosafedb.login_table where id = ?));",
    params: [req.body.badgeStatus, req.body.activeUserId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getWearerBadges", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT * FROM xplosafedb.badge_table where assigned_user = (select username from xplosafedb.login_table where id = ?);",
    params: [req.body.wearerId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getBadgesByStatus", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT * FROM xplosafedb.badge_table Where badge_status = ?;",
    params: [req.body.badgeStatus],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getSubordinantBadgesByStatus", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];

  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT " +
      "bt.id, bt.assigned_user, bt.badge_status, bt.activated_time, bt.turned_in_time, bt.date_last_updated, " +
      "bt.expiration_date, bt.badge_serial_number, bt.number_of_tokens, bt.date_created, bt.batch_group, " +
      "bt.temperature_fahrenheit, bt.temperature_celsius, bt.vapors_exposed, bt.notes, bt.relative_humidity " +
      "FROM xplosafedb.badge_table AS bt " +
      "JOIN xplosafedb.login_table AS lt where (lt.username = bt.assigned_user and lt.id != ? and bt.badge_status = ? " +
      "and lt.group_id = (select id from xplosafedb.group_table where xplosafedb.group_table.manager_id = ?));",
    params: [
      req.body.activeUserId,
      req.body.badgeStatus,
      req.body.activeUserId,
    ],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/audit", function (req, res, next) {
  _queries.push({
    queryText: "Select * From xplosafedb.event_audit_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getSubordinateBadges", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  _queries.push({
    queryText:
      "SELECT " +
      "bt.id, bt.assigned_user, bt.badge_status, bt.activated_time, bt.turned_in_time, bt.date_last_updated, " +
      "bt.expiration_date, bt.badge_serial_number, bt.number_of_tokens, bt.date_created, bt.batch_group, " +
      "bt.temperature_fahrenheit, bt.temperature_celsius, bt.vapors_exposed, bt.notes, bt.relative_humidity " +
      "FROM xplosafedb.badge_table AS bt " +
      "JOIN xplosafedb.login_table AS lt where (lt.username = bt.assigned_user and lt.id != ? and" +
      " lt.group_id = (select id from xplosafedb.group_table where xplosafedb.group_table.manager_id = ?));",
    params: [req.body.activeUserId, req.body.activeUserId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getAnalyst:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT username, id FROM xplosafedb.login_table where role = 4;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getLocation:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT id, city, base FROM xplosafedb.location_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/locations", function (req, res, next) {
  _queries.push({
    queryText: "SELECT * FROM location_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getGroup:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT id FROM xplosafedb.group_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getRole:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT id, position FROM xplosafedb.role_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getManager:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manufacturer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT username, xplosafedb.login_table.id FROM xplosafedb.login_table right join xplosafedb.group_table g on g.manager_id = xplosafedb.login_table.id;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post(
  "/auth",
  function (req, res, next) {
    _queries.push({
      queryText:
        "SELECT * FROM xplosafedb.login_table WHERE username=? AND password=?;",
      params: [req.body.username, encrypt(req.body.password)],
      callback: (error, results) => {
        _activeQuery = false;
        if (error || JSON.stringify(results) === "[]") {
          addIncorrectLoginAttempt(req.body.username);
          if (
            _incorrectLogins.find((x) => x.username === req.body.username)
              .attempts > 2
          ) {
            // This will update the error display message on the client side preventing
            // the end user from ever figuring out the correct password through brute force attempts.
            res.status(504).json({ status: "error" });
          } else {
            res.status(500).json({ status: "error" });
          }
          evaluateQueries();
        } else {
          res.locals.results = JSON.stringify(results);
          for (let i = 0; i < results.length; i++) {
            const {
              id,
              username,
              role,
              group_id,
              location_id,
              account_locked,
            } = results[i];
            let inactive_timeout = Date.now() + _timeout;
            let ipAddress = req.socket.remoteAddress;

            /*
             * Create a JWT with the user's id and role.
             * In addition, an 24 hour expiration is given to the JWT.
             * */
            const jsonWebToken = getRoleBasedToken(
              id,
              role,
              req.body.username
            ).setExpiration(Date.now() + 3600 * 1000 * 24);

            if (!_activeUsers.find((x) => x.id === id)) {
              _activeUsers.push({
                id: id,
                username: req.body.username,
                role: role,
                group_id: group_id,
                location_id: location_id,
                inactive_timeout: inactive_timeout,
                ipAddress: ipAddress,
                jwt: jsonWebToken,
              });
            }

            if (Number(account_locked) !== 1) {
              generateAudit(id, 1);
              res.locals.jwt = jsonWebToken.compact();
            } else {
              generateAudit(id, 10);
              _activeUsers.pop();
            }
          }

          next();
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  },
  function (req, res) {
    let jsonRet = JSON.parse(res.locals.results);
    // The following js object will contain the routes used on the frontend.
    let jsonRoutes;
    switch (jsonRet[0].role) {
      case wearer: // Wearer
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "manage/badges/issue", label: "Activate Badge" },
          { path: "manage/badges/turnIn", label: "Turn In Badge" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case manufacturer: // Manufacturer
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "manage/badges/add", label: "Add Badge" },
          { path: "manage/badges/remove", label: "Remove Badge" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case scientist: // Scientist
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "upload/report", label: "Upload Report" },
          { path: "search/report", label: "Search Reports" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case analyst: // Analyst
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "upload/report", label: "Upload Report" },
          { path: "search/report", label: "Search Reports" },
          { path: "extract/doehrs", label: "Upload Doehrs" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case manager: // Manager
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "manage/users", label: "Manage Users" },
          {
            path: "manage/badges",
            label: "Manage Badges",
            children: [
              { path: "edit", label: "Edit Badge" },
              { path: "issue", label: "Issue Badge" },
              { path: "turnIn", label: "Turn In Badge" },
            ],
          },
          { path: "manage/sites", label: "Manage Sites" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case administrator: // Administrator
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "manage/users", label: "Manage Users" },
          { path: "manage/maintenance", label: "Manage Maintenance" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case auditor: // Auditor
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case developer: // Developer
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "manage/users", label: "Manage Users" },
          {
            path: "manage/badges",
            label: "Manage Badges",
            children: [
              { path: "edit", label: "Edit Badge" },
              { path: "issue", label: "Issue Badge" },
              { path: "turnIn", label: "Turn In Badge" },
            ],
          },
          { path: "manage/sites", label: "Manage Sites" },
          { path: "upload/report", label: "Upload Report" },
          { path: "search/report", label: "Search Reports" },
          { path: "manage/maintenance", label: "Manage Maintenance" },
          { path: "extract/doehrs", label: "Upload Doehrs" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      case demonstrator: // Demonstrator
        jsonRoutes = [
          { path: "home", label: "Home" },
          { path: "manage/account", label: "Manage Account" },
          { path: "manage/users", label: "Manage Users" },
          {
            path: "manage/badges",
            label: "Manage Badges",
            children: [
              { path: "add", label: "Add Badge" },
              { path: "edit", label: "Edit Badge" },
              { path: "issue", label: "Issue Badge" },
              { path: "turnIn", label: "Turn In Badge" },
            ],
          },
          { path: "manage/sites", label: "Manage Sites" },
          { path: "upload/report", label: "Upload Report" },
          { path: "search/report", label: "Search Reports" },
          { path: "manage/maintenance", label: "Manage Maintenance" },
          { path: "extract/doehrs", label: "Upload Doehrs" },
          { path: "extract/audits", label: "View Audits" },
          { path: "manage/bulkAddBadge", label: "Bulk Add Badge"},
          { path: "manage/badges/add", label: "Add Badge" },
          { path: "manage/badges/remove", label: "Remove Badge" },
          { path: "view/customData", label: "Custom Data" },
          { path: "signOut", label: "Sign Out" },
        ];
        break;
      default:
        jsonRoutes = [];
    }

    // The following line will automatically add a member named "routes" to the Object named "jsonRet".
    jsonRet[0].routes = jsonRoutes;

    // The JSON Web Token made for this session.
    jsonRet[0].jwt = res.locals.jwt;

    // The Object named "jsonRet" is already in the JSON form we want. Use "res.send(...)" not "res.json(...)".
    res.status(200).send(jsonRet);
  }
);

router.put("/auth", function (req, res, next) {
  const { userId, newPassword } = req.body;
  if (newPassword && newPassword !== "") {
    let nextExpirationDate = new Date(86400 * 90 * 1000).valueOf(); // 90 days worth of milliseconds.
    let currentTime = Date.now().valueOf(); // A "now's" worth of milliseconds (# of milliseconds since Jan. 1st 1970)
    nextExpirationDate = new Date(nextExpirationDate + currentTime).valueOf(); // Add them together and you have the next time the password expires.

    const updatedTime = new Date(Date.now());
    _queries.push({
      queryText:
        "UPDATE login_table SET password=?, date_last_updated=?, date_password_expires=? WHERE id=?;",
      params: [
        encrypt(newPassword),
        updatedTime,
        new Date(nextExpirationDate),
        userId,
      ],
      callback: (error, results) => {
        _activeQuery = false;
        if (error) {
          console.error(error);
          res.status(500).json({ status: "error" });
          evaluateQueries();
        } else {
          generateAudit(userId, 20);
          res.status(200).json(results);
          evaluateQueries();
        }
      },
    });
    evaluateQueries();
  } else {
    res
      .status(500)
      .json({ status: "New password was undefined or an empty string." });
  }
});

router.get("/maintenance", function (req, res, next) {
  _queries.push({
    queryText: "select * from xplosafedb.maintenance_table where (id = 1);",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.put("/maintenance", function (req, res, next) {
  _queries.push({
    queryText:
      "UPDATE xplosafedb.maintenance_table Set `maintenance_time` = ?, `maintenance_end_time` = ? where (id = 1);",
    params: [req.query.maintenanceTime, req.query.maintenanceEndTime],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/logout", function (req, res, next) {
  const user = _activeUsers.find(({ id }) => id === req.body.activeUserId);
  if (user === undefined) {
    generateAudit(req.body.activeUserId, 11);
    return res
      .status(500)
      .json({ status: "User not found Access Not Allowed" });
  }

  if (userLogout(user)) {
    return res.status(200).json({ status: "User logged out" });
  } else {
    return res.status(501).json({ status: "user not found" });
  }
});

router.get("/loadEventAudits", function (req, res, next) {
  _queries.push({
    queryText: "Select * from xplosafedb.event_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        if (_auditEnum === null || _auditEnum.length < 1 || _auditEnum === []) {
          for (let i = 0; i < results.length; i++) {
            let id = results[i]["id"];
            let event_type = results[i]["event_type"];
            let event_message = results[i]["event_message"];
            _auditEnum.push({
              id: id,
              event_type: event_type,
              event_message: event_message,
            });
          }
        }
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/getSelectedUser", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res.status(401).json({ status: "User Access Not Allowed" });
  }

  _queries.push({
    queryText: "Select * From xplosafedb.login_table Where id = (?);",
    params: [req.body.userId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/updateUser", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res.status(401).json({ status: "User Access Not Allowed" });
  }

  const updatedTime = new Date(Date.now());
  _queries.push({
    queryText:
      "Update xplosafedb.login_table Set `username` = ?, `role` = ?, `group_id` = ?, `location_id` = ?, `date_last_updated` = ? Where id = (?);",
    params: [
      req.body.updatedUsername,
      req.body.userRole,
      req.body.userGroupId,
      req.body.userLocationId,
      updatedTime,
      req.body.userId,
    ],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        generateAudit(req.body.activeUserId, 7);
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/unlockAccount", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res.status(401).json({ status: "User Access Not Allowed" });
  }
  const updatedTime = new Date(Date.now());

  generateAudit(req.body.activeUserId, 9);
  _queries.push({
    queryText:
      "Update xplosafedb.login_table Set `account_locked` = 0, `login_threshold_exceeded` = 0, `date_last_updated` = ? Where id = (?);",
    params: [updatedTime, req.body.lockedAccountId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        resetLoginAttempts(req.body.lockedAccountId);
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/lockAccount", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res.status(401).json({ status: "User Access Not Allowed" });
  }

  const updatedTime = new Date(Date.now());
  generateAudit(req.body.activeUserId, 8);
  _queries.push({
    queryText:
      "Update xplosafedb.login_table Set `account_locked` = 1, `date_last_updated` = ? Where id = (?);",
    params: [updatedTime, req.body.lockedAccountId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getUnLockedAccounts:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "Select * from xplosafedb.login_table where account_locked = 0 && group_id = (select group_id from xplosafedb.login_table where id = " +
      req.params.fu +
      ");",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.get("/getLockedAccounts:fu", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(Number(req.params.fu), allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "Select * from xplosafedb.login_table where account_locked = 1;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/doehrsAnalyteResultData", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT * FROM xplosafedb.doehrs_analyte_result_data;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/doehrsLabData", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT * FROM xplosafedb.doehrs_lab_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/doehrsChainOfCustodyData", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }
  _queries.push({
    queryText: "SELECT * FROM xplosafedb.doehrs_chain_of_custody_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/doehrsSampleData", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText: "SELECT * FROM xplosafedb.doehrs_sample_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

router.post("/doehrsIHLabAnalysis", function (req, res, next) {
  let allowedAccounts = [
    { allowedRole: demonstrator },
    { allowedRole: administrator },
    { allowedRole: developer },
    { allowedRole: scientist },
    { allowedRole: analyst },
    { allowedRole: wearer },
    { allowedRole: auditor },
    { allowedRole: manager },
  ];
  if (!checkUserStatus(req.body.activeUserId, allowedAccounts)) {
    return res
      .status(401)
      .json({ status: "User not found Access Not Allowed" });
  }

  _queries.push({
    queryText:
      "SELECT * FROM xplosafedb.doehrs_ih_lab_sample_analysis_results;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        res.status(500).json({ status: "error" });
        evaluateQueries();
      } else {
        res.status(200).json(results);
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
});

function doehrsAnalyteResult(params, type) {
  switch (type) {
    case 1:
      // Add Analyte Result.
      _queries.push({
        queryText:
          "Insert into xplosafedb.doehrs_analyte_result_data " +
          "(`AnalyteIdentifier`, `CASNumber`, `AnalyteName`, `AnalyzedDateTime`, `Inspirability`, " +
          "`AnalyticalMethod`, `MassMeasuredResult`, `MassMeasuredResultQualifier`, `MassCorrectedResult`, " +
          "`MassCorrectedResultQualifier`, `MassResultUnit`, `ConcentrationMeasuredResult`, " +
          "`ConcentrationMeasuredResultQualifier`, `ConcentrationCorrectedResult`, " +
          "`ConcentrationCorrectedResultQualifier`, `ConcentrationResultUnit`, " +
          "`ResultNotDetected`, `ResultComments`, `ReportingLimit`, `ReportingLimitUnit`, `token_id`) " +
          "Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        params,
        callback: (error, results) => {
          _activeQuery = false;
          if (error) {
            console.error(error);
          }
          evaluateQueries();
        },
      });
      evaluateQueries();
      break;
    case 2:
      // Update Analyte Result.
      _queries.push({
        queryText:
          "UPDATE xplosafedb.doehrs_analyte_result_data SET " +
          "`AnalyteIdentifier` = ?, `CASNumber` = ?, `AnalyteName` = ?, `AnalyzedDateTime` = ?, `Inspirability` = ?, " +
          "`AnalyticalMethod` = ?, `MassMeasuredResult` = ?, `MassMeasuredResultQualifier` = ?, `MassCorrectedResult` = ?, " +
          "`MassCorrectedResultQualifier` = ?, `MassResultUnit` = ?, `ConcentrationMeasuredResult` = ?, " +
          "`ConcentrationMeasuredResultQualifier` = ?, `ConcentrationCorrectedResult` = ?, " +
          "`ConcentrationCorrectedResultQualifier` = ?, `ConcentrationResultUnit` = ?, " +
          "`ResultNotDetected` = ?, `ResultComments` = ?, `ReportingLimit` = ?, `ReportingLimitUnit` = ?, `token_id` = ? " +
          "WHERE (`id` = ?);",
        params,
        callback: (error, results) => {
          _activeQuery = false;
          if (error) {
            console.error(error);
          }
          evaluateQueries();
        },
      });
      evaluateQueries();
      break;
    case 3:
      // Delete Analyte Result.
      _queries.push({
        queryText:
          "DELETE FROM xplosafedb.doehrs_analyte_result_data " +
          "WHERE (`id` = ?);",
        params,
        callback: (error, results) => {
          _activeQuery = false;
          if (error) {
            console.error(error);
          }
          evaluateQueries();
        },
      });
      evaluateQueries();
      break;
  }
}

function getBadgeManager(badge_serial_number) {
  _queries.push({
    queryText:
      "SELECT username FROM xplosafedb.login_table AS lt WHERE lt.id IN " +
      "(SELECT gt.manager_id FROM xplosafedb.group_table AS gt WHERE gt.id IN " +
      "(SELECT group_id FROM xplosafedb.login_table AS lt Where lt.username IN " +
      "(SELECT assigned_user FROM xplosafedb.badge_table AS bt WHERE (bt.badge_serial_number = ?))));",
    params: [badge_serial_number],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        evaluateQueries();
        return "";
      } else {
        evaluateQueries();
        return results["username"];
      }
    },
  });
  evaluateQueries();
}

function generateChainOfEvents(
  relinquishedUser,
  receivedUser,
  badgeSerialNumber,
  comments
) {
  const dateTime = new Date(Date.now());
  if (!receivedUser || !relinquishedUser) {
    return;
  }
  _queries.push({
    queryText:
      "Insert into xplosafedb.doehrs_chain_of_custody_table " +
      "(`RelinquishedBy`, `RelinquishedDateTime`, `ReceivedBy`, `ReceivedDateTime`, `Comments`, `LabSampleId`) " +
      "values (?, ?, ?, ?, ?, ?)",
    params: [
      relinquishedUser,
      dateTime,
      receivedUser,
      dateTime,
      comments,
      badgeSerialNumber,
    ],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
      }
      evaluateQueries();
    },
  });
  evaluateQueries();
}

function checkTime(activeUserId) {
  const user = _activeUsers.find(({ id }) => id === activeUserId);
  if (user === undefined) {
    return;
  }

  let time = Date.now();
  if (user.inactive_timeout > time) {
    return true;
  } else {
    // Forcibly logs out the user on the backend.
    const success = userLogout(user);
    return false;
  }
}

function userLogout(user) {
  generateAudit(user.id, 2);
  for (let i = 0; i < _activeUsers.length; i++) {
    if (_activeUsers[i].id === user.id) {
      _activeUsers.splice(i, 1);
      _queries.push({
        queryText: "DELETE FROM sessions WHERE session_id = ?;",
        params: [user.id],
        callback: (error) => {
          _activeQuery = false;
          if (error) {
            console.error(error);
            evaluateQueries();
          } else {
            const key = "kid_" + user.id;
            delete _signingKeyMap[key];
            evaluateQueries();
          }
        },
      });
      evaluateQueries();
      return true;
    }
  }

  return false;
}
function loadEventAudits() {
  _queries.push({
    queryText: "Select * from xplosafedb.event_table;",
    params: null,
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        evaluateQueries();
      } else {
        for (let i = 0; i < results.length; i++) {
          let id = results[i]["id"];
          let event_type = results[i]["event_type"];
          let event_message = results[i]["event_message"];
          _auditEnum.push({
            id: id,
            event_type: event_type,
            event_message: event_message,
          });
        }
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
}

function initBackendResources() {
  loadEventAudits();
  loadSigningKeyMap();
}

function loadSigningKeyMap() {
  const now = Date.now();
  _queries.push({
    queryText:
      "SELECT s.session_id, s.key FROM sessions as s WHERE s.expires > ?;",
    params: [now],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
        evaluateQueries();
      } else {
        for (let result of results) {
          const key = "kid_" + result.session_id;
          _signingKeyMap[key] = result.key;
        }
        evaluateQueries();
      }
    },
  });
  evaluateQueries();
}

function resetLoginAttempts(userId) {
  _queries.push({
    queryText: "Select username from xplosafedb.login_table Where id = (?);",
    params: [userId],
    callback: (error, results) => {
      _activeQuery = false;
      if (_incorrectLogins.find((x) => x.username === results[0])) {
        _incorrectLogins.find((x) => x.username === results[0]).attempts = 0;
      }
      if (error) {
        console.error(error);
      }
      evaluateQueries();
    },
  });
  evaluateQueries();
}

function addIncorrectLoginAttempt(username) {
  const time = new Date(Date.now());
  let loginAttempts = 1;
  if (_incorrectLogins.find((x) => x.username === username)) {
    _incorrectLogins.find((x) => x.username === username).attempts++;
    _incorrectLogins.find((x) => x.username === username).time = time;
    if (
      _incorrectLogins.find((x) => x.username === username).attempts > 2 &&
      _incorrectLogins.find((x) => x.username === username).attempts < 4
    ) {
      _queries.push({
        queryText:
          "Select id from xplosafedb.login_table Where username = (?);",
        params: [username],
        callback: (error, results) => {
          _activeQuery = false;
          if (results) {
            _activeUsers.push({
              id: results[0],
              username: username,
              role: null,
              group_id: null,
              location_id: null,
              inactive_timeout: null,
              ipAddress: null,
              jwt: null,
            });
            loginThresholdExceeded(results[0]);
            _activeUsers.pop();
          }
          evaluateQueries();
        },
      });
      evaluateQueries();
    }
  } else {
    _incorrectLogins.push({
      username: username,
      time: time,
      attempts: loginAttempts,
    });
  }
}

function userFound(userId) {
  const user = _activeUsers.find(({ id }) => id === userId);
  if (user === undefined || user === null) {
    return false;
  } else {
    return true;
  }
}

function refreshActivity(userId) {
  _activeUsers.find(({ id }) => id === userId).inactive_timeout =
    Date.now() + _timeout;
}

function updateBadgeStatus(badgeSerialNumber, status) {
  const updatedTime = new Date(Date.now());
  _queries.push({
    queryText:
      "update xplosafedb.badge_table Set `badge_status` = ?, `date_last_updated` = ? where (badge_serial_number = ?);",
    params: [status, updatedTime, badgeSerialNumber],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
      }
      evaluateQueries();
    },
  });
  evaluateQueries();
}

function generateAudit(userId, auditNumber) {
  const user = _activeUsers.find(({ id }) => id === userId);
  if (user === undefined || user === null) {
    return;
  }

  if (_auditEnum === null || _auditEnum.length < 1 || _auditEnum === []) {
    loadEventAudits();
  }

  let locId = user.location_id;
  if (!user.location_id) {
    locId = 1;
  }
  const desiredAudit = _auditEnum.find(({ id }) => id === auditNumber);
  const date = new Date(Date.now());
  _queries.push({
    queryText:
      "Insert into xplosafedb.event_audit_table (`event_id`, `user_id`, `log_data`, `location`, `date_created`, `ip_endpoint`) values (?, ?, ?, ?, ?, ?);",
    params: [
      auditNumber,
      userId,
      desiredAudit.event_message,
      locId,
      date,
      user.ipAddress,
    ],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
      }
      evaluateQueries();
    },
  });
  evaluateQueries();
}

function checkUserAuthentication(activeUserId, expectedRoleValue) {
  const user = _activeUsers.find(({ id }) => id === activeUserId);
  for (const acceptableRole of expectedRoleValue) {
    if (user.role === acceptableRole.allowedRole) {
      return true;
    }
  }

  // generate audit of the User
  generateAudit(activeUserId, 11);
  // If we made it to this part the user has made an unauthorized data access attempt and should be logged out
  lockAccount(activeUserId);
  return false;
}

function loginThresholdExceeded(activeUserId) {
  const updatedTime = new Date(Date.now());
  generateAudit(activeUserId, 8);
  _queries.push({
    queryText:
      "Update xplosafedb.login_table Set `account_locked` = 1, `login_threshold_exceeded` = 1, `date_last_updated` = ? Where id = (?);",
    params: [updatedTime, activeUserId.id],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
      }
      evaluateQueries();
    },
  });
  evaluateQueries();
}

function lockAccount(activeUserId) {
  const updatedTime = new Date(Date.now());
  generateAudit(activeUserId, 8);
  _queries.push({
    queryText:
      "Update xplosafedb.login_table Set `account_locked` = 1, `date_last_updated` = ? Where id = (?);",
    params: [updatedTime, activeUserId],
    callback: (error, results) => {
      _activeQuery = false;
      if (error) {
        console.error(error);
      }
      evaluateQueries();
    },
  });
  evaluateQueries();
  userLogout(_activeUsers.find(x => activeUserId));
}

function evaluateQueries() {
  while (!_activeQuery && _queries.length > 0) {
    _activeQuery = true;
    const query = _queries.shift();
    db.query(query.queryText, query.params, query.callback);
  }
}

function checkUserStatus(activeUserId, expectedRoleValue) {
  if (!userFound(activeUserId)) {
    generateAudit(activeUserId, 11);
    return false;
  }

  if (!checkTime(activeUserId)) {
    return false;
  }

  if (!checkUserAuthentication(activeUserId, expectedRoleValue)) {
    generateAudit(req.body.activeUserId, 11);
    return false;
  }

  refreshActivity(activeUserId);
  return true;
}

module.exports = router;

// The following are test methods used to determine that the parser is or is not working properly.
// BuildDirectory(dest + "BADGE11047338_APR26_03.D.zip");
// BuildDirectory(dest + "Test1.zip");
// BuildDirectory('public/uploads/FileExtractionAttempt');
// BuildDirectory(dest + 'bce915924332d58c8ceafec6def53c3e');
// BuildDirectory(dest +'DATA.MS');

// BuildDirectory(dest + 'ProofOfConcept');
