/**
 * McQueue
 * Free Open Source Software
 */

const BullMQ = require('bullmq');
// const SanboxedJob = BullMQ.SanboxedJob;
const redisConfig = require('./config');
const Path = require('node:path');

const BullQueue = new BullMQ.Queue(redisConfig?.queueName, {
    connection: redisConfig?.connection
});

console.log('confg', redisConfig?.connection);

module.exports = async (job) => {

    console.log('job data', job?.data);

    let jobPath = Path.join(__dirname, '..', redisConfig?.jobDirectory, job?.data?.type);
    jobPath = jobPath.replace(/ /g, '\ ');

    const Job = require(jobPath);

    if (!Job) {
        console.error('Job not found');
    }

    let jobInstance = new Job();

    jobInstance.BullQueue = BullQueue;
    // jobInstance.DB = YourDBInstance;

    await jobInstance.handle(job?.data);

    return;
}
