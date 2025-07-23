const dotenv = require("dotenv");
const grpc = require("@grpc/grpc-js");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const { connectToDatabase } = require("./config/createConnectionToDB");
const setAllGrpcServices = require("./providers/grpcServiceProvider");

const SERVER_PORT = process.env.PORT;

const grpcServer = new grpc.Server();
setAllGrpcServices(grpcServer);

const startServer = async () => {
  connectToDatabase();
  if (!SERVER_PORT) {
    console.log("❌Missing Server Port Check Env Configs ");
    process.exit(0);
  }
  grpcServer.bindAsync(
    `0.0.0.0:${SERVER_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => console.log(`Server Is Running On Port ${SERVER_PORT} 🚀`)
  );
};

startServer();
