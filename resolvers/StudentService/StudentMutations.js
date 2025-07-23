const grpc = require("@grpc/grpc-js");
const { dbConnection } = require("../../config/createConnectionToDB");
const { v4: uuid } = require("uuid");

const AddNewStudent = async (call, callback) => {
  try {
    const {
      Firstname,
      Lastname,
      Age,
      Phonenumber,
      Code_meli,
      College_id,
      Gpa,
    } = call.request;
    const studentId = uuid();
    await dbConnection.query(
      `INSERT IN TO Student(id,firstname,lastname,age,phonenumber,code_meli,college_id,gpa) VALUES(?,?,?,?,?,?,?,?)`,
      [
        studentId,
        Firstname,
        Lastname,
        Age,
        Phonenumber,
        Code_meli,
        College_id,
        Gpa,
      ]
    );
    return callback(null, {
      Message: "Student SuccessFully Added!",
      Student_id: studentId,
    });
  } catch (error) {
    callback({ code: grpc.status.INTERNAL, error: error });
  }
};

module.exports = {
  AddNewStudent,
};
