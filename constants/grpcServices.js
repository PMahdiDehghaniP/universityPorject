const PROTO_FILES_DIR = path.join(__dirname, "../proto");
const path = require("path");

const grpcServices = [
  {
    filePath: path.join(PROTO_FILES_DIR, "class.proto"),
    packageName: "Class",
    serviceName: "Class",
    handler: () => {},
  },
  {
    filePath: path.join(PROTO_FILES_DIR, "student.proto"),
    packageName: "Student",
    serviceName: "Student",
    handler: StudentServiceHandlersF,
  },
];

module.exports = grpcServices;
