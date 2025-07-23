const path = require("path");
const PROTO_FILES_DIR = path.join(__dirname, "../proto");
const StudentServiceHandlers = require("../resolvers/StudentService");
const CollegeServiceHandlers = require("../resolvers/CollegeService");

const GRPC_SERVICES = [
    {
      filePath: path.join(PROTO_FILES_DIR, "college.proto"),
      packageName: "College",
      serviceName: "CollegeService",
      handler: CollegeServiceHandlers,
    },
  {
    filePath: path.join(PROTO_FILES_DIR, "student.proto"),
    packageName: "Student",
    serviceName: "Student",
    handler: StudentServiceHandlers,
  },
];

module.exports = GRPC_SERVICES;
