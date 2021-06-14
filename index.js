const express = require('express'),
     http = require('http');

const hostname = 'localhost';
const port = 3000;
const morgan = require('morgan');
const app = express();
const plantRouter = require('./routes/unitRouter');
const mongoose = require('mongoose')
const Plants = require('./models/unit')
const url = 'mongodb://localhost:27017/urbanFarming';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'))

app.use(express.json({ limit: '5mb' }));
app.use('/plants', plantRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});