import { Kafka } from "kafkajs";
import EnemInputMessage from "./models/EnemInputMessage";
import EnemOutputMessage from "./models/EnemOutputMessage";

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

let totalCount = 0;
let districtsCount: any = {};
let racialLabelsData: any = {};
let acessoInternetLabelsData: any = {};
let faixaEtariaLabelsData: any = {};
app.get("/data", (_req: any, res: any, _next: any) => {
  console.log("+req");
  res.json({
    totalCount,
    districtsCount,
    racialLabelsData,
    acessoInternetLabelsData,
    faixaEtariaLabelsData,
  });
});

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
      console.log("+data");
      totalCount += 1;
      if (enemOutputMessage.corRaca)
        racialLabelsData[enemOutputMessage.corRaca] =
          (racialLabelsData[enemOutputMessage.corRaca] ?? 0) + 1;

      if (enemOutputMessage.questionario[6].answer)
        acessoInternetLabelsData[enemOutputMessage.questionario[6].answer] =
          (acessoInternetLabelsData[enemOutputMessage.questionario[6].answer] ??
            0) + 1;

      if (enemOutputMessage.faixaEtaria)
        faixaEtariaLabelsData[enemOutputMessage.faixaEtaria] =
          (faixaEtariaLabelsData[enemOutputMessage.faixaEtaria] ?? 0) + 1;

      if (enemOutputMessage.ufEscola)
        districtsCount[enemOutputMessage.ufEscola] =
          (districtsCount[enemOutputMessage.ufEscola] ?? 0) + 1;

      connections.forEach((socket) => {
        socket.emit("enem-data", JSON.stringify(enemOutputMessage));
      });
    },
  });
}

io.on("connection", (socket: any) => {
  console.log(`+connection: ${socket.id}`);
  connections.push(socket);
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

main();
