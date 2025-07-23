const path = require("path");
const PROTO_FILES_DIR = path.join(__dirname, "../proto");
const StudentServiceHandlers = require("../resolvers/StudentService");

const GRPC_SERVICES = [
  //   {
  //     filePath: path.join(PROTO_FILES_DIR, "class.proto"),
  //     packageName: "Class",
  //     serviceName: "Class",
  //     handler: () => {},
  //   },
  {
    filePath: path.join(PROTO_FILES_DIR, "student.proto"),
    packageName: "Student",
    serviceName: "Student",
    handler: StudentServiceHandlers,
  },
];

module.exports = GRPC_SERVICES;
