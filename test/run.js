const McQueue = require('mcque');

const QueueHelper = new McQueue.Queue();

QueueHelper.dispatch('TestingJob', {
    hello: 'world!'
}).then(() => {
    console.log('awokawok');
}).catch((err) => {
    console.error('awikwok', err);
});