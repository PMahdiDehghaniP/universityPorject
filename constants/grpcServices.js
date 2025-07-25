const path = require("path");
const PROTO_FILES_DIR = path.join(__dirname, "../proto");
const StudentServiceHandlers = require("../resolvers/StudentService");
const CollegeServiceHandlers = require("../resolvers/CollegeService");
const ClassServiceHanlders = require("../resolvers/ClassService");
const LessonServiceHanlders = require("../resolvers/LessonService");
const TeacherServiceHanlders = require("../resolvers/TeacherService");
const TermServiceHandlers = require("../resolvers/TermService");
const { EnrollmentServiceHandlers } = require("../resolvers/EnrollmentService");

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
  {
    filePath: path.join(PROTO_FILES_DIR, "lesson.proto"),
    packageName: "Lesson",
    serviceName: "LessonService",
    handler: LessonServiceHanlders,
  },
  {
    filePath: path.join(PROTO_FILES_DIR, "teacher.proto"),
    packageName: "Teacher",
    serviceName: "TeacherService",
    handler: TeacherServiceHanlders,
  },
  {
    filePath: path.join(PROTO_FILES_DIR, "term.proto"),
    packageName: "Term",
    serviceName: "TermService",
    handler: TermServiceHandlers,
  },
  {
    filePath: path.join(PROTO_FILES_DIR, "enrollment.proto"),
    packageName: "Enrollment",
    serviceName: "EnrollmentService",
    handler: EnrollmentServiceHandlers,
  },
];

module.exports = GRPC_SERVICES;
