const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "enrollment-service",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
}

async function sendMessage(topic, message) {
  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message)
      }
    ]
  });
}

module.exports = {
  connectProducer,
  sendMessage
};