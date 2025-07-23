const path = require("path");
const PROTO_FILES_DIR = path.join(__dirname, "../proto");
const StudentServiceHandlers = require("../resolvers/StudentService");
const CollegeServiceHandlers = require("../resolvers/CollegeService");
const ClassServiceHanlders = require("../resolvers/ClassService");

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
  {
    filePath: path.join(PROTO_FILES_DIR, "class.proto"),
    packageName: "Class",
    serviceName: "Class",
    handler: ClassServiceHanlders,
  },
];

module.exports = GRPC_SERVICES;
