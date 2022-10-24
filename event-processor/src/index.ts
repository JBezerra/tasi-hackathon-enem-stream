import { Kafka } from "kafkajs";
import EnemInputMessage from "./models/EnemInputMessage";
import EnemOutputMessage from "./models/EnemOutputMessage";
import { Server } from "socket.io";


const kafka = new Kafka({ clientId: 'enem-processor', brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'enem-processor-4' });

const io = new Server();

async function main() {

	await consumer.connect()
	await consumer.subscribe({ topic: 'enem-data', fromBeginning: true });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			
			if (!message.value)
				return;

			const enemInputMessage = JSON.parse(message.value.toString()) as EnemInputMessage;

			const enemOutputMessage = new EnemOutputMessage(enemInputMessage);

			io.on("connection", (socket) => {
				socket.emit("enem-data", enemOutputMessage);
			});

			console.log(`Message received! Content: ${JSON.stringify(enemOutputMessage)}`);
		}
	})
}

io.listen(3001);

main()