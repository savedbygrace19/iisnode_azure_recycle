var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

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
router.delete('/:dbName', (req, res, next) => {
  console.log("deleting db");
  PouchDB.destroy(req.params.dbName)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
