import { Kafka } from "kafkajs";
import EnemInputMessage from "./models/EnemInputMessage";
import EnemOutputMessage from "./models/EnemOutputMessage";

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const kafka = new Kafka({
  clientId: "enem-processor",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "enem-processor-4" });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const connections: any[] = [];

async function main() {
  await consumer.connect();
  await consumer.subscribe({ topic: "enem-data", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;
      const enemInputMessage = JSON.parse(
        message.value.toString()
      ) as EnemInputMessage;

      const enemOutputMessage = new EnemOutputMessage(enemInputMessage);
      connections.forEach((socket) => {
        socket.emit("enem-data", JSON.stringify(enemOutputMessage));
      });
    },
  });
}

io.on("connection", (socket: any) => {
  console.log(`User client: ${socket.id}`);
  connections.push(socket);
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

main();
