const redis = require('redis');
const { host, password, port } = require('../config').redis;



class RedisCTRL {

    constructor() {
        this.client = null
        this.#init()
    }
    async #init() {
        this.client = redis.createClient({
            url: `redis://default:${password}@${host}:${port}`
        });

        this.client
            .on('connect', () => {
                console.log('Connecting to Redis ...')
            })
            .on('ready', async () => {
                console.log('Connected to Redis!')
            })
            .on('reconnecting', () => {
                console.log('Reconnected to Redis!')
            })
            .on('end', () => {
                console.log('disonnected from Redis!')
            })
            .on('error', err => {
                console.log('Redis error ... >> ', err)
            });

        await this.client.connect();
    }
   

}
module.exports = new RedisCTRL();