const {
    APP_PORT,
    APP_MONGODB_URL,
    APP_VERSION,
    JWT_SECRET,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASS

} = process.env;

module.exports = {
   
    redis: {
        host: REDIS_HOST || 'redis',
        port: REDIS_PORT || 6379,
        password: REDIS_PASS || ""
    },

    endpoints: {
        mongoUrl: APP_MONGODB_URL || "mongodb://localhost:27017/auth"
    },
    constant: {
        appVersion:"v1"
    },
    adfricatalking:{
        username: "rida",
        apiKey :"55d02e3f1b1bd23d225002937b1b1364fd5f4ded347be102b592b0c2fb6c8208"
    },
    nodemailer: {
        host: "mail.nonicoms.ng",
        port: 465,
        user: "dev@nonicoms.ng",
        pass: "1600uAj@1105"
    },
}

