const { dbConnection } = require("../config/createConnectionToDB");

const isDataExists = async (tableName, columnName, value) => {
  const [result] = await dbConnection.query(
    `SELECT 1 FROM ${tableName} WHERE ${columnName}=? LIMIT 1`,
    [value]
  );
  return Boolean(result.length);
};

module.exports = {
  isDataExists,
};
