var express = require('express');
var path = require('path');

var PouchDB = require('pouchdb');
require('pouchdb-all-dbs')(PouchDB);

var app = express();
var expressPouchDB = require('express-pouchdb')(PouchDB);

var db = new PouchDB('bob');
var db2 = new PouchDB('bob2');

db.put({
  _id: "mydoc",
  title: 'bob'
})
.then((response) => {
  return db.put({
    _id: "mydoc2",
    title: 'bob2'
  });
})
.then((response) => {
  return db2.put({
    _id: "mydoc3",
    title: 'bob3'
  });
});

var router = new express.Router();

router.get('/listAll', (req, res, next) => {
  console.log("listing all dbs");
  PouchDB.allDbs()
    .then((dbs) => {
      res.status(200).json(JSON.stringify(dbs));
      next();
    });
});

router.use(expressPouchDB);
app.use(router);

module.exports = app;
