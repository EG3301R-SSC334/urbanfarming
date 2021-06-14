const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path: path.resolve(__dirname, './.env') });

const express = require('express'),
     http = require('http');

const morgan = require('morgan');
const app = express();
const plantRouter = require('./routes/unitRouter');
const mongoose = require('mongoose');

const Plants = require('./models/unit')
const connect = mongoose.connect(
    process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use('/plants', plantRouter);

app.listen(process.env.port || 3000, () => {
  console.log(`Server running...`)
});