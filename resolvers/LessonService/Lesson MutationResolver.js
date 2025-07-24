const { v4: uuid } = require("uuid");
const grpc = require("@grpc/grpc-js");
const { dbConnection } = require("../../config/createConnectionToDB");
const AddNewLesson = async (call, callback) => {
  try {
    const { College_id, Number_of_units, Name } = call.request;
    const lesson_id = uuid();
    await dbConnection.query(
      "INSERT INTO Lesson(id,name,number_of_units,college_id) VALUES(?,?,?,?)",
      [lesson_id, Name, Number_of_units, College_id]
    );
    return callback(null, {
      Lesson_id: lesson_id,
      Message: "Lesson SuccessFully Added",
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};

module.exports = {
  AddNewLesson,
};
