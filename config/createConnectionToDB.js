const mySql = require("mysql2/promise");
const ModelsTables = require("../Sql/Models/createTables");
const joinTables = require("../Sql/Join Tables/JoinTables");
const foreignKeyNames = require("../Sql/constants/foreignKeys");
const {
  doesForeignKeyExist,
  foreignKeySetterPorvider,
} = require("../Sql/functions/foreignKeySetter");

const dbConnection = mySql.createPool({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectToDatabase = async () => {
  try {
    for (const table of ModelsTables) {
      await dbConnection.query(table);
    }

    for (const table of joinTables) {
      await dbConnection.query(table);
    }
    console.log("Tables Are Ready ✅");

    for (const foreignKey of foreignKeyNames) {
      const {
        tableName,
        constraintName,
        foreignKeyName,
        referenceTable,
        referenceColumn,
      } = foreignKey;

      const exists = await doesForeignKeyExist(
        dbConnection,
        tableName,
        constraintName
      );
      if (!exists) {
        const sql = foreignKeySetterPorvider(
          tableName,
          constraintName,
          foreignKeyName,
          referenceTable,
          referenceColumn
        );
        await dbConnection.query(sql);
        console.log(`✅ FK ${constraintName} added`);
      } else {
        console.log(`ℹ️ FK ${constraintName} already exists, skipping`);
      }
    }

    console.log("DataBase connected successfully");
  } catch (error) {
    console.log(`❌ Can not connect to database error is  : ${error}`);
  }
};
module.exports = { dbConnection, connectToDatabase };
