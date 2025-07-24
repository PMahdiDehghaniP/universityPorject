const teacherMutationResolvers = require("./teacherMutationResolver");

const TeacherServiceHanlders = {
  ...teacherMutationResolvers,
};

module.exports = TeacherServiceHanlders;
