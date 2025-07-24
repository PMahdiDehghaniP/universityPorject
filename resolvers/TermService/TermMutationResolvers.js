const grpc = require("@grpc/grpc-js");
const { v4: uuid } = require("uuid");
const { convertTimeStampToDate } = require("../../utils/formatDate");
const { dbConnection } = require("../../config/createConnectionToDB");
const AddNewTerm = async (call, callback) => {
  try {
    const { Year, Start_date, End_date, Season, Status } = call.request;
    const term_id = uuid();
    await dbConnection.query(
      "INSERT INTO Term(id,year,start_date,end_date,season,status) VALUES(?,?,?,?,?,?)",
      [
        term_id,
        Year,
        convertTimeStampToDate(Start_date.seconds),
        convertTimeStampToDate(End_date.seconds),
        Season,
        Status,
      ]
    );
    return callback(null, {
      Term_id: term_id,
      Message: "Term SuccessFully Added.",
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};

module.exports = {
  AddNewTerm,
};
