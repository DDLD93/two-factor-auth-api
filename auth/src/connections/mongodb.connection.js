'use strict';

const mongoose = require('mongoose');
const { endpoints } = require('../config')

module.exports = () => {
    mongoose.set('strictQuery', false)


    const db = mongoose.connection;
    db.on('connecting', () => {
        console.log('connecting... to mongodb');
    });

    db.on('connected', () => {
        console.log('We are connected to mongodb');
    });
    db.on('error', (err) => {
        console.log('Error connecting to mongodb ');
        
    });

    db.on('disconnected', () => {
        console.log('Oops we are disconnected from mongodb');
        setTimeout(() => {
            console.log('reconnecting to mongodb');
            mongoose.connect(mongoDbUri);
        }, 5000);

    });

    const mongoDbUri = endpoints.mongoUrl;
    mongoose.connect(mongoDbUri);
}