const {
    APP_PORT,
    APP_MONGODB_URL,
    APP_VERSION,
    JWT_SECRET,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USER,
    REDIS_PASS

} = process.env;

module.exports = {
    app: {
        port: APP_PORT || 3000,
        appVersion: APP_VERSION || "v1",
        jwtSecret: JWT_SECRET || "cSi6nundefinedei3eEz&xt&xgzcqZhhoCd46cXr1$Bg&PbwjMQXwl!%$Ssert"
    },
    redis: {
        host: REDIS_HOST || 'redis',
        port: REDIS_PORT || 6379,
        user: REDIS_USER || "default",
        password: REDIS_PASS || ""
    },

    endpoints: {
        mongoUrl: APP_MONGODB_URL || "mongodb://mongodb:27017/auth"
    },
  
}

