const express = require('express'),
     http = require('http');
const mongoose = require('mongoose')
const Dishes = require('./models/sample')
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {

    console.log('Connected correctly to server');

    Dishes.create({
            name: 'Uthappizza',
            description: 'test'
        })
        .then((dish) => {
            console.log(dish);

            return Dishes.find({});
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });

});

const hostname = 'localhost';
const port = 3000;
const morgan = require('morgan');
const app = express();
const dishRouter = require('./routes/dishRouter');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'))

app.use(express.json({ limit: '5mb' }));
app.use('/dishes', dishRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});