const foreignKeySetterPorvider = (
  tableName,
  constraintName,
  foreignKey,
  referenceTable,
  referenceColumn
) => `
ALTER TABLE ${tableName}
ADD CONSTRAINT ${constraintName} 
FOREIGN KEY(${foreignKey})
REFERENCES ${referenceTable}(${referenceColumn})
`;

const doesForeignKeyExist = async (connection, tableName, constraintName) => {
  const [rows] = await connection.query(
    `
    SELECT COUNT(*) AS count
    FROM information_schema.table_constraints
    WHERE constraint_type = 'FOREIGN KEY'
      AND constraint_name = ?
      AND table_name = ?
      AND table_schema = DATABASE()
    `,
    [constraintName, tableName]
  );
  return rows[0].count > 0;
};

module.exports = { foreignKeySetterPorvider, doesForeignKeyExist };
