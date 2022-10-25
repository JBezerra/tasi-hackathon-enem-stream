import reader from 'line-by-line';

import Kafka from './modules/kafka';
import { parseData } from './modules/dataset'

/**
 * READ ME
 * Download the dataset from https://download.inep.gov.br/microdados/microdados_enem_2021.zip
 * and paste it inside /dataset folder
 */

const BATCH_TIMEOUT = Math.random() * 1000;
const BATCH_SIZE = 1;

async function main() {
  const kafka = new Kafka({ cliendId: 'enem-producer', broker: 'localhost:9092' })
  await kafka.connect();

  let messages: any[] = [];
  const linereader = new reader('./dataset/MICRODADOS_ENEM_2021.csv');
  linereader.on('line', function (line) {
    const data = line.split(",")
    const row = parseData(data);
    messages.push({ value: JSON.stringify(row) })
    if (messages.length > 0 && messages.length % BATCH_SIZE === 0) {
      console.log(`${messages.length} messages sent.`);
      linereader.pause();
      setTimeout(async function () {
        console.log()
        await kafka.message({ topic: 'enem-data', messages })
        messages = [];
        linereader.resume();
      }, BATCH_TIMEOUT);
    }
  });
}

main()