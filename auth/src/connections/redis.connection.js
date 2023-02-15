const redis = require('redis');
const { host,user, password, port  } = require('../config').redis;

module.exports = async () => {
    let client = null;

    const url = `redis://${user}:${password}@${host}:${port}`;

    client = redis.createClient({
        url
    });

    client
        .on('connect', () => {
            console.log('Connecting to Redis ...');
        })
        .on('ready', async () => {
            console.log('Connected to Redis!');
        })
        .on('reconnecting', () => {
            console.log('Reconnected to Redis!');
        })
        .on('end', () => {
            console.log('disonnected from Redis!');
        })
        .on('error', err => {
            console.log('Redis error ... >> ', err);
        });

         await client.connect();


    return client
    
}
