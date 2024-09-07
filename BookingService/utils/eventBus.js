const amqp = require('amqplib');

let channel;

async function connectEventBus() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertExchange('ticket_exchange', 'topic', { durable: false });
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
}

connectEventBus();

const publishEvent = async (routingKey, message) => {
  try {
    channel.publish('ticket_exchange', routingKey, Buffer.from(JSON.stringify(message)));
  } catch (error) {
    console.error('Error publishing event:', error);
  }
};

module.exports = publishEvent