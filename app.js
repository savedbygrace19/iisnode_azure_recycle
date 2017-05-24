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

app.use(expressPouchDB);

module.exports = app;
