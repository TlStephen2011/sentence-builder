var express = require('express');
var router = express.Router();
const WordType = require('../models/wordType');
const Word = require('../models/word');

router.get('/word-types', async function(req, res, next) {
  res.json(await WordType.findAll());
});

router.get('/words', async function(req, res, next) {
  res.json(await Word.findAll());
});

module.exports = router;
