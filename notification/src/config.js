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
    app: {
        port: APP_PORT || 3000,
        appVersion: APP_VERSION || "v1",
        jwtSecret: JWT_SECRET || "cSi6nundefinedei3eEz&xt&xgzcqZhhoCd46cXr1$Bg&PbwjMQXwl!%$Ssert"
    },
    redis: {
        host: REDIS_HOST || '102.134.17.171',
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
    }
}

