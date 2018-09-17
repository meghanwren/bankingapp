const express = require('express');
const mongodb = require('mongodb');
const nunjucks = require('nunjucks');
var Account = require('../scripts/account.js');
const app = express();
const mongoClient = mongodb.MongoClient;

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

app.listen(9000);

app.set('view engine', 'nunjucks');
app.use(express.static('scripts'));
app.use(express.static('./styles'));
app.use(express.static('./images'));

mongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    console.error(err);
    client.close();
  } else {
    let db = client.db('bank');
    let accounts = db.collection('accounts');

    app.route('/')
      .get((req, res) => {
        res.render('index');
      });

      app.route('/index')
      .get((req, res) => {
        res.render('index');
      });

    app.route('/withdraw')
      .get((req, res) => {
        res.render('withdraw');
      });

     app.route('/deposit')
      .get((req, res) => {
        res.render('deposit');
      })
      .post((req, res) => {
        accounts.findOne({})
      });

    app.route('/new')
      .get((req, res) => {
        res.render('new');
      })
      .post((req, res) => {
        let a = new Account(req.body);
        console.log(req.body);
        accounts.insertOne(a, (err, res1) => {
          accounts.find({}).toArray((err, res2) => {
            res.render('success', {data: res2});
          });
        });
      });
  }
});