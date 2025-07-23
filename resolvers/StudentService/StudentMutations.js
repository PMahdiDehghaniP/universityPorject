const grpc = require("@grpc/grpc-js");
const { dbConnection } = require("../../config/createConnectionToDB");
const { v4: uuid } = require("uuid");

const AddNewStudent = async (call, callback) => {
  try {
    const {
      First_name,
      Last_name,
      Age,
      Phone_number,
      Code_meli,
      College_id,
      Gpa,
    } = call.request;
    const student_id = uuid();
    await dbConnection.query(
      `INSERT INTO Student(id,firstname,lastname,age,phonenumber,code_meli,college_id,gpa) VALUES(?,?,?,?,?,?,?,?)`,
      [
        student_id,
        First_name,
        Last_name,
        Age,
        Phone_number,
        Code_meli,
        College_id,
        Gpa,
      ]
    );
    return callback(null, {
      Student_id: student_id,
      Message: "Student SuccessFully Added!",
    });
  } catch (error) {
    callback({ code: grpc.status.INTERNAL, message: error });
  }
};

module.exports = {
  AddNewStudent,
};
