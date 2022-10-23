import { Kafka } from "kafkajs";
import EnemInputMessage from "./models/EnemInputMessage";
import EnemOutputMessage from "./models/EnemOutputMessage";

const kafka = new Kafka({ clientId: 'enem-processor', brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'enem-processor-4' });

let counter = 0;

async function main() {

	await consumer.connect()
	await consumer.subscribe({ topic: 'enem-data', fromBeginning: true });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			
			if (!message.value)
				return;

			const enemInputMessage = JSON.parse(message.value.toString()) as EnemInputMessage;

			const enemOutputMessage = new EnemOutputMessage(enemInputMessage);

			console.log(`Message: ${counter}, Content: ${enemInputMessage.TP_FAIXA_ETARIA}`);
			counter++;
		}
	})
}

main()