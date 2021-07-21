"use strict";
const fs = require("fs");
const msFileSpec = [];
let msParsedFields = null;
let parsedDataOffset = 0;
let fullFileBuffer;
let fileCorrectlyParsed = true;
fillFileSpec();

function getChar(offset) {
  return fullFileBuffer.readInt8(offset);
}

function getCharArray(lenField, start, end) {
  let currentFieldLength = msParsedFields[lenField];
  return fullFileBuffer
    .subarray(start, end)
    .toString("ascii", 0, currentFieldLength);
}

function getLong(offset) {
  return fullFileBuffer.readInt32BE(offset);
}

function getShort(offset) {
  return fullFileBuffer.readInt16BE(offset);
}

function getUShort(offset) {
  return fullFileBuffer.readUInt16BE(offset);
}

function getAbundanceStruct(offset) {
  return fullFileBuffer.readUIntBE(offset, 1);
}

function fillFileSpec() {
  msFileSpec.push(
    {
      section: "Header",
      fields: [
        {
          field: "file_num_str_len",
          start: 0,
          end: 0,
          type: "char",
          parseField: function () {
            return getChar(0);
          },
        },
        {
          field: "file_num_str",
          start: 1,
          end: 3,
          type: "char[]",
          parseField: function () {
            return getCharArray("file_num_str_len", 1, 3);
          },
        },
        {
          field: "file_str_len",
          start: 4,
          end: 4,
          type: "char",
          parseField: function () {
            return getChar(4);
          },
        },
        {
          field: "file_str",
          start: 5,
          end: 23,
          type: "char[]",
          parseField: function () {
            return getCharArray("file_str_len", 5, 23);
          },
        },
        {
          field: "data_name_len",
          start: 24,
          end: 24,
          type: "char",
          parseField: function () {
            return getChar(24);
          },
        },
        {
          field: "data_name",
          start: 25,
          end: 85,
          type: "char[]",
          parseField: function () {
            return getCharArray("data_name_len", 25, 85);
          },
        },
        {
          field: "misc_info_len",
          start: 86,
          end: 86,
          type: "char",
          parseField: function () {
            return getChar(86);
          },
        },
        {
          field: "misc_info",
          start: 87,
          end: 147,
          type: "char[]",
          parseField: function () {
            return getCharArray("misc_info_len", 87, 147);
          },
        },
        {
          field: "operator_len",
          start: 148,
          end: 148,
          type: "char",
          parseField: function () {
            return getChar(148);
          },
        },
        {
          field: "operator",
          start: 149,
          end: 177,
          type: "char[]",
          parseField: function () {
            return getCharArray("operator_len", 149, 177);
          },
        },
        {
          field: "date_time_len",
          start: 178,
          end: 178,
          type: "char",
          parseField: function () {
            return getChar(178);
          },
        },
        {
          field: "date_time",
          start: 179,
          end: 207,
          type: "char[]",
          parseField: function () {
            return getCharArray("date_time_len", 179, 207);
          },
        },
        {
          field: "inst_model_len",
          start: 208,
          end: 208,
          type: "char",
          parseField: function () {
            return getChar(208);
          },
        },
        {
          field: "inst_model",
          start: 209,
          end: 217,
          type: "char[]",
          parseField: function () {
            return getCharArray("inst_model_len", 209, 217);
          },
        },
        {
          field: "inlet_len",
          start: 218,
          end: 218,
          type: "char",
          parseField: function () {
            return getChar(218);
          },
        },
        {
          field: "inlet",
          start: 219,
          end: 227,
          type: "char[]",
          parseField: function () {
            return getCharArray("inlet_len", 219, 227);
          },
        },
        {
          field: "method_file_len",
          start: 228,
          end: 228,
          type: "char",
          parseField: function () {
            return getChar(228);
          },
        },
        {
          field: "method_file",
          start: 229,
          end: 247,
          type: "char[]",
          parseField: function () {
            return getCharArray("method_file_len", 229, 247);
          },
        },
        {
          field: "file_type",
          start: 248,
          end: 251,
          type: "long",
          parseField: function () {
            return getLong(248);
          },
        },
        {
          field: "seq_index",
          start: 252,
          end: 253,
          type: "short",
          parseField: function () {
            return getShort(252);
          },
        },
        {
          field: "als_bottle",
          start: 254,
          end: 255,
          type: "short",
          parseField: function () {
            return getShort(254);
          },
        },
        {
          field: "replicate",
          start: 256,
          end: 257,
          type: "short",
          parseField: function () {
            return getShort(256);
          },
        },
        {
          field: "dir_ent_type",
          start: 258,
          end: 259,
          type: "short",
          parseField: function () {
            return getShort(258);
          },
        },
        {
          field: "dir_offset",
          start: 260,
          end: 263,
          type: "long",
          parseField: function () {
            return getLong(260);
          },
        },
        {
          field: "data_offset",
          start: 264,
          end: 267,
          type: "long",
          parseField: function () {
            parsedDataOffset = getLong(264);
            return getLong(264);
          },
        },
        {
          field: "run_tbl_offset",
          start: 268,
          end: 271,
          type: "long",
          parseField: function () {
            return getLong(268);
          },
        },
        {
          field: "norm_offset",
          start: 272,
          end: 275,
          type: "long",
          parseField: function () {
            return getLong(272);
          },
        },
        {
          field: "extra_records",
          start: 276,
          end: 277,
          type: "short",
          parseField: function () {
            return getShort(276);
          },
        },
        {
          field: "num_records",
          start: 278,
          end: 281,
          type: "long",
          parseField: function () {
            return getLong(278);
          },
        },
        {
          field: "start_rtime",
          start: 282,
          end: 285,
          type: "long",
          parseField: function () {
            return getLong(282);
          },
        },
        {
          field: "end_rtime",
          start: 286,
          end: 289,
          type: "long",
          parseField: function () {
            return getLong(286);
          },
        },
        {
          field: "max_signal",
          start: 290,
          end: 293,
          type: "long",
          parseField: function () {
            return getLong(290);
          },
        },
        {
          field: "min_signal",
          start: 294,
          end: 297,
          type: "long",
          parseField: function () {
            return getLong(294);
          },
        },
        {
          field: "unused",
          start: 298,
          end: 511,
          type: undefined,
          parseField: function () {
            return fullFileBuffer.readInt32BE(298, 511 - 298);
          },
        },
      ],
    },
    {
      section: "Spectral",
      fields: [
        {
          field: "record_words",
          start: 0,
          end: 1,
          type: "short",
          calculateOffset: function () {
            return parsedDataOffset * 2;
          },
          parseField: function () {
            return getShort(this.calculateOffset());
          },
        },
        {
          field: "ret_time",
          start: 2,
          end: 5,
          type: "long",
          calculateOffset: () => {
            return 2 * +parsedDataOffset + 2;
          },
          parseField: function () {
            return getLong(this.calculateOffset());
          },
        },
        {
          field: "num_words",
          start: 6,
          end: 7,
          type: "short",
          calculateOffset: () => {
            return 2 * (+parsedDataOffset - 1) + 6;
          },
          parseField: function () {
            return getShort(this.calculateOffset());
          },
        },
        {
          field: "data_type",
          start: 8,
          end: 9,
          type: "short",
          calculateOffset: () => {
            return 2 * (+parsedDataOffset - 1) + 8;
          },
          parseField: function () {
            return getShort(this.calculateOffset());
          },
        },
        {
          field: "status_word",
          start: 10,
          end: 11,
          type: "short",
          calculateOffset: () => {
            return 2 * (+parsedDataOffset - 1) + 10;
          },
          parseField: function () {
            return getShort(this.calculateOffset());
          },
        },
        {
          field: "number_peaks",
          start: 12,
          end: 13,
          type: "short",
          calculateOffset: () => {
            return 2 * (+parsedDataOffset - 1) + 12;
          },
          parseField: function () {
            return getShort(this.calculateOffset());
          },
        },
        {
          field: "base_peak",
          start: 14,
          end: 15,
          type: "unsigned short",
          calculateOffset: () => {
            return 2 * (+parsedDataOffset - 1) + 14;
          },
          parseField: function () {
            getUShort(this.calculateOffset());
          },
        },
        {
          field: "base_abund",
          start: 16,
          end: 17,
          type: "abundance_rec",
          calculateOffset: () => {
            return 2 * (+parsedDataOffset - 1) + 16;
          },
          parseField: function () {
            return getAbundanceStruct(this.calculateOffset());
          },
        },
      ],
    }
  );
}

function parse() {
  return parseHeader();
  // parseSpectralRecords();
  // parseDirectoryRecords();
}

function parseHeader() {
  if (msParsedFields === null) {
    msParsedFields = {};
  }

  let result = true;
  msFileSpec[0].fields.forEach((fieldSpec) => {
    try {
      let resolvedProm = Promise.resolve(fieldSpec.parseField.call(fieldSpec));
      resolvedProm.then((onfulfilled) => {
        msParsedFields[fieldSpec.field] = Function.prototype.apply(onfulfilled);
        // console.log([
        //   fieldSpec.start,
        //   fieldSpec.end,
        //   fieldSpec.type,
        //   fieldSpec.field,
        //   // msParsedFields[fieldSpec.field],
        //   fieldSpec.parseField(fieldSpec),
        //   // resolvedProm,
        // ]);
        return msParsedFields[fieldSpec.field];
      });
    } catch (err) {
      result = false;
    }
  });
  if (result) {
    // perform the last checks on the files header to ensure its in the proper format.
    result = !msFileSpec[0].fields.find((x) => x.parseField(x) === undefined);
  }

  return result;
}

function parseSpectralRecords() {
  if (msParsedFields !== null) {
    msParsedFields = {};
  }

  msFileSpec[1].fields.forEach((fieldSpec) => {
    msParsedFields[fieldSpec.field] = fieldSpec.parseField.call(fieldSpec);
    console.log([
      fieldSpec.start,
      fieldSpec.end,
      fieldSpec.type,
      fieldSpec.field,
      msParsedFields[fieldSpec.field],
    ]);
  });
}

function parseDirectoryRecords() {
  console.debug("Directory Records");
}

function MoveFile(directoryPath, newPath) {
  console.debug("Attempting to move file");
  try {
    const newDirectory = directoryPath.slice(0, directoryPath.length - 8);
    console.debug("New Directory: " + newDirectory);
    console.debug("Directory Path: " + directoryPath);
    console.debug("New Path: " + newPath);
    fs.rename(directoryPath, newPath, function (err) {
      if (err) {
        console.error("Error: " + err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  validate: function (data) {
    fullFileBuffer = Buffer.from(data, "utf-8");
    return parse();
  },
  moveFile: function (path, newPath) {
    MoveFile(path, newPath);
  },
};
