var express = require('express');
var router = express.Router();
var seed = require('../database-seed');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET seed page. */
router.get('/seed', function (req, res, next) {
  seed.dropCollections();
  res.end('<h1>Database seeded...</h1>');
});

module.exports = router;
