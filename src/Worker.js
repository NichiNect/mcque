/**
 * McQueue
 * Free Open Source Software
 */

const BullMQ = require('bullmq');
const Worker = BullMQ.Worker;
const redisConfig = require('./config');
const Processor = require('./Processor');

const worker = new Worker(redisConfig?.queueName, Processor, {
    connection: redisConfig?.connection
});

worker.on('drained', () => {
    console.log('Queue is drained, no more jobs left');
});

worker.on('failed', (job, error) => {

    // * Implement your log error

    console.error(`Error Queue: ${error}`);
});

worker.on('completed', (job, result) => {

    // * Implement your log success

    console.log(`Job ${job?.id} has completed!`);
});
