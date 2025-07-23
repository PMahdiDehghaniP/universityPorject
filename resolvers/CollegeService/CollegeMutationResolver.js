const grpc = require("@grpc/grpc-js");
const { v4: uuid } = require("uuid");
const { dbConnection } = require("../../config/createConnectionToDB");
const AddNewCollege = async (call, callback) => {
  try {
    const { Name, Number_of_floors, Number_of_classes } = call.request;
    const college_id = uuid();
    await dbConnection.query(
      `INSERT INTO College(id,name,number_of_classes,number_of_floors) VALUES (?,?,?,?)`,
      [college_id, Name, Number_of_classes, Number_of_floors]
    );
    return callback(null, {
      College_id: college_id,
      Message: "College SuccessFully Added",
    });
  } catch (error) {
    return callback({ code: grpc.status.INTERNAL, message: error });
  }
};

module.exports = {
  AddNewCollege,
};
