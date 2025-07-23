const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const GRPC_SERVICES = require("../constants/grpcServices");
const GRPC_PACKAGE_DEFENITION = require("../constants/grpcPackageDefenitionOptions");

const setAllGrpcServices = (grpcServer) => {
  try {
    GRPC_SERVICES.forEach((serviceInfo) => {
      const { filePath, packageName, serviceName, handler } = serviceInfo;
      const servicePackageDefenition = protoLoader.loadSync(
        filePath,
        GRPC_PACKAGE_DEFENITION
      );
      const grpcObj = grpc.loadPackageDefinition(servicePackageDefenition);
      const servicePackage = grpcObj[packageName];

      grpcServer.addService(servicePackage[serviceName].service, handler);
      console.log(`✅ GRPC service added: ${packageName}.${serviceName}`);
    });
  } catch (error) {
    console.log("Error in Add GRPC Server Services Error : ", error);
    process.exit(0);
  }
};

module.exports = setAllGrpcServices;
