import amqp from 'amqplib';

async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

export async function publishToQueue(data) {
  const queue = '';
  try {
    const { channel, connection } = await connectToRabbitMQ();
    await channel.assertQueue(queue)
                 .sendToQueue(queue, Buffer.from(JSON.stringify(data)))
                 .close();
    await connection.close();
  } catch (error) {
    console.error('Error publishing to queue:', error);
    throw error;
  }
}

