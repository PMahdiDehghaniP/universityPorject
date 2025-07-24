const grpc = require("@grpc/grpc-js");
const { v4: uuid } = require("uuid");
const { dbConnection } = require("../../config/createConnectionToDB");
const AddNewTeacher = async (call, callback) => {
  try {
    const { Name, Lastname, College_id } = call.request;
    const teacher_id = uuid();
    await dbConnection.query(
      "INSERT INTO Teacher(id,name,lastname,college_id) VALUES (?,?,?,?)",
      [teacher_id, Name, Lastname, College_id]
    );
    return callback(null, {
      Teacher_id: teacher_id,
      Message: "Teacher SuccessFully Added",
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};

module.exports = {
  AddNewTeacher,
};
