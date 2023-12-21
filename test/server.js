const fastify = require('fastify');
const McQueue = require('mcque');

const app = fastify({
    logger: true
});

app.get("/", async (req, res) => {

    const dataQueue = {
        hello: 'world!'
    }

    await McQueue.dispatch('TestingJob', dataQueue)
        .catch((err) => {
            console.error('Queue dispatcher error:', err);
        });

    res.send({
        success: true,
        message: 'Request success',
        data: dataQueue
    });
});

/**
 * Run the server!
 */
const start = async () => {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();
