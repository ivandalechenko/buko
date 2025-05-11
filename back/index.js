require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
// const healthCheck = require('./components/health-check');

const PORT = process.env.PORT || 5000;
const app = express()


app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, 'https://1jfqnl4w-5173.euw.devtunnels.ms']
}));
app.use(express.json());
app.use(cookieParser());
// app.use('/health-check', healthCheck);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()



