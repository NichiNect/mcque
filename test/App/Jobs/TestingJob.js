const BaseQueueJob = require('../../../src/Queue');

class TestingJob extends BaseQueueJob {

    async handle(data) {

        console.log('run testing queue');

        return;
    }
}

module.exports = TestingJob;