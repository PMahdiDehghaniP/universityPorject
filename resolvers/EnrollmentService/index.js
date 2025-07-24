const EnrollmentMutationResolvers = require("./EnrollmentMutationResolver");

const EnrollmentServiceHandlers = {
  ...EnrollmentMutationResolvers,
};

module.exports = {
  EnrollmentServiceHandlers,
};
