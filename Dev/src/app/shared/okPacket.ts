export interface OkPacket {
  affectedRows;
  changedRows;
  fieldCount;
  insertId;
  message;
  protocol141;
  serverStatus;
  warningCount;
}

export class PasswordMismatch implements OkPacket {
  affectedRows = 0;
  changedRows = 0;
  fieldCount = undefined;
  insertId = undefined;
  message = 'Password mismatch! Please try again.';
  protocol141 = undefined;
  serverStatus = undefined;
  warningCount = undefined;
}

export class NothingToUpdate implements OkPacket {
  affectedRows = 0;
  changedRows = 0;
  fieldCount = undefined;
  insertId = undefined;
  message = '';
  protocol141 = undefined;
  serverStatus = undefined;
  warningCount = undefined;
}
