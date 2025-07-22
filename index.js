const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const { connectToDatabase } = require("./config/createConnectionToDB");

const startServer = async () => {
  connectToDatabase();
};

startServer();
