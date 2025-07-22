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

module.exports = foreignKeySetterPorvider;
