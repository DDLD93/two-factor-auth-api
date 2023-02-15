const {username,apiKey} = require("../config").adfricatalking
const sms = require('africastalking')({username,apiKey}).SMS;


module.exports = async function(to,code){
    const options = {
        // Set the numbers you want to send to in international format
        to:to,
        // Set your message
        message: `Your audifric verification code is ${code}`,
        // Set your shortCode or senderId
        from: null
    }
    try {
        let res = await sms.send(options)
     return {ok:true, message: res}   
    } catch (error) {
        return {ok:false, message: error.message}   
    }
}
