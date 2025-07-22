const mySql = require("mysql2/promise");
const ModelsTables = require("../Sql/createTables");

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
    ModelsTables.forEach(async (table) => {
      await dbConnection.query(table);
    });
    console.log("Tables Created SuccessFully ✅");
  } catch (error) {
    console.log(`❌ Can not connect to database error is  : ${error}`);
  }
};
module.exports = { dbConnection, connectToDatabase };
