const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('dotenv').config();

const packageDef = protoLoader.loadSync(
  path.join(__dirname, '../../../proto/enrollment.proto'),
  {
    keepCase: true
  }
);

const grpcObject = grpc.loadPackageDefinition(packageDef);

const EnrollmentService = grpcObject.EnrollmentService;

const client = new EnrollmentService(
  process.env.ENROLLMENT_SERVICE_URL,
  grpc.credentials.createInsecure()
);

module.exports = client;
