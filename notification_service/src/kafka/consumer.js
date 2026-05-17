const { Kafka } = require("kafkajs");
const service = require("../service/notificationService");
require("dotenv").config();

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "notification-group" });

async function startConsumer() {
  try {
    await consumer.connect();

    await consumer.subscribe({
      topic: "enrollment_created",
      fromBeginning: false
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          if (!message?.value) return;

          const data = JSON.parse(message.value.toString());

          console.log("Kafka event received:", data);

          await service.handleEnrollmentEvent(data);

        } catch (err) {
          console.error("Message processing error:", err.message);
        }
      }
    });

    console.log("Notification Kafka consumer started");

  } catch (err) {
    console.error("Kafka consumer startup failed:", err.message);
  }
}

module.exports = { startConsumer };