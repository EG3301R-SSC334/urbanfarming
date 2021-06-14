const express = require('express'),
     http = require('http');

// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017'
const dbname = 'conFusion';
const operations = require('./utils/operations')

MongoClient.connect(url).then((client) => {

  console.log('Connected correctly to server');
  const db = client.db(dbname);

  dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
      "dishes")
      .then((result) => {
          console.log("Insert Document:\n", result.ops);

          return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
          console.log("Found Documents:\n", docs);

          return dboper.updateDocument(db, { name: "Vadonut" },
                  { description: "Updated Test" }, "dishes");

      })
      .then((result) => {
          console.log("Updated Document:\n", result.result);

          return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
          console.log("Found Updated Documents:\n", docs);
                          
          return db.dropCollection("dishes");
      })
      .then((result) => {
          console.log("Dropped Collection: ", result);

          return client.close();
      })
      .catch((err) => console.log(err));

})
.catch((err) => console.log(err));

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