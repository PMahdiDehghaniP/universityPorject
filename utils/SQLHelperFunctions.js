const isDataExists = async (connection, tableName, columnName, value) => {
  const [result] = await connection.query(
    `SELECT 1 FROM ${tableName} WHERE ${columnName}=? LIMIT 1`,
    [value]
  );
  return Boolean(result.length);
};

module.exports = {
  isDataExists,
};
