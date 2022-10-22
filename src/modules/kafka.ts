import { Kafka as KafkaJS, Producer } from 'kafkajs'

export type KafkaMessage = {
  topic: string,
  messages: {
    value: string
  }[]
}

interface KafkaConfig {
  cliendId: string
  broker: string
}

export default class Kafka {
  private kafka: KafkaJS;
  private producer!: Producer;

  constructor({ cliendId, broker }: KafkaConfig) {
    this.kafka = new KafkaJS({
      clientId: cliendId,
      brokers: [broker],
    })
  }

  public async connect() {
    const producer = this.kafka.producer()
    this.producer = producer;
    await this.producer.connect()
  }

  public async message({ topic, messages }: KafkaMessage) {
    await this.producer.send({
      topic,
      messages
    }).then(console.log)
  }
}
