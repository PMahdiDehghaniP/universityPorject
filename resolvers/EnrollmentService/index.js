const EnrollmentMutationResolvers = require("./EnrollmentMutationResolver");
const EnrollmentQueriesResolver = require("./EnrollmentQueriesResolvers");

const EnrollmentServiceHandlers = {
  ...EnrollmentMutationResolvers,
  ...EnrollmentQueriesResolver,
};

module.exports = {
  EnrollmentServiceHandlers,
};
