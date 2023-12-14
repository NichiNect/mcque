/**
 * McQueue
 * Free Open Source Software
 */

const Processor = require('./Processor');
const redisConfig = require('./config');
const BullMQ = require('bullmq');

class Queue {

    BullQueue;

    async dispatch(type, data, options) {

        this.#initQueueInstance();

        if (!options) {
            options = {};
        }

        options.removeOnComplete = true;
        options.type = type;

        data.type = type;

        await this.BullQueue.add(redisConfig?.queueName, data, options).catch((err) => {
            console.error(`Error add queue: ${err}`)
        })
    }

    #initQueueInstance() {

        if (!this.BullQueue) {
            this.BullQueue = new BullMQ.Queue(redisConfig?.queueName, {
                connection: redisConfig?.connection
            })
        }
    }
}

module.exports = Queue;