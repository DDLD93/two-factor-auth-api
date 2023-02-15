const {client} = require("./connections/redis.connection");
const sms = require("./connections/aggregator.connection")

client.subscribe("sms",async (msg,chan)=>{
    let {receiver,code} = JSON.parse(msg)
    let {ok, message} = await sms([receiver],code)
    console.log({ok, message})
  
})

client.subscribe("email",(msg,chan)=>{
    console.log(JSON.parse(msg))
    
})