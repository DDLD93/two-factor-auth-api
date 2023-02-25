const redis = require('redis');
const { host, password, user, port } = require('../config').redis;



class RedisCTRL {

    constructor() {
        this.client = null
        this.subscriber = null
        this.#init()
        //this.test()
    }
    async #init() {
        this.client = redis.createClient({
            url: `redis://${user}:${password}@${host}:${port}`
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
    write(key, value) {
        this.client.set(key, value)
    }
    otpSMS(phone, options = { EX: 15000, NX: true }) {
        let code = Math.floor(100000 + Math.random() * 900000);
        this.client.set(phone, code, options)
        this.plish("sms", {receiver:phone,code:code})
    }
   async otpResendSMS(phone, options = { EX: 15000, NX: true }) {
        await this.client.del(phone)
        let code = Math.floor(100000 + Math.random() * 900000);
        this.client.set(phone, code, options)
        this.plish("sms", {receiver:phone,code:code})
    }
    otpEmail(email, options = { EX: 15000, NX: true }) {
        let code = Math.floor(100000 + Math.random() * 900000);
        this.client.set(email, code, options)
        this.plish("email", {receiver:email,code:code})
    }

    async read(key) {
        console.log("before reading >>>>>>>>",{key});
        let value = await this.client.get(key)
        console.log("reading >>>>>>>>",{value})
        return value
    }
    async test (){
        setTimeout(async() => {
            console.log("redis test start >>>>>")
            let radNum = Math.floor(100000 + Math.random() * 900000);
            console.log({radNum})
            this.client.set("+2347055793354", radNum, { EX: 15, NX: true });
            console.log("getting value >>>>>>");
            let value = await this.client.get('+2347055793354');
            console.log({value});      
        },10000);

    }

    async plish(chan, msg) {
        if (!this.client) {
            await this.client.connect()
            await this.client.PUBLISH(chan,JSON.stringify(msg))   
        }else{
            await this.client.publish(chan,JSON.stringify(msg))   
        }
      
    }

}
module.exports = new RedisCTRL();