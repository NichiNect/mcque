const McQueue = require('mcque');

McQueue.dispatch('TestingJob', {
    hello: 'world!'
}).then(() => {
    console.log('Job added successfully.');
}).catch((err) => {
    console.error('We found the errors:', err);
});