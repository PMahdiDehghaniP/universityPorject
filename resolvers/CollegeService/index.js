const CollegeMutations = require("./CollegeMutationResolver");

const CollegeServiceHandlers = {
  ...CollegeMutations,
};

module.exports = CollegeServiceHandlers;
