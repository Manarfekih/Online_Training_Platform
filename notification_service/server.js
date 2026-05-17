const { startConsumer } = require("./src/kafka/consumer");
require("./src/grpc/server");

async function start() {
  await startConsumer();
}

start();