const { v4: uuid } = require("uuid");
const grpc = require("@grpc/grpc-js");
const { dbConnection } = require("../../config/createConnectionToDB");
const AddNewClass = async (call, callback) => {
  try {
    const { College_id, Capacity } = call.request;
    const class_id = uuid();
    await dbConnection.query(
      `INSERT INTO Class(id,college_id,capacity) VALUES(?,?,?)`,
      [class_id, College_id, Capacity]
    );
    return callback(null, {
      Class_id: class_id,
      Message: "Class SuccessFully Added",
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};

module.exports = {
  AddNewClass,
};
