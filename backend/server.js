const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const collectionRouter = require('./routes/collections');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const uri = process.env.DB_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established successully');
});

app.use('/collections', collectionRouter);
app.use('/auth', userRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});