var express = require('express');
var router = express.Router();
const WordType = require('../models/wordType');
const Word = require('../models/word');

router.get('/word-types', async function(req, res) {
  res.json(await WordType.findAll());
});

router.get('/words', async function(req, res) {
  const id = req.query.id;
  if (id)
    res.json(await Word.findAll({where: { wordTypeId: id}}));
  else
  res.json(await Word.findAll());
});

router.post('/sentence', async function(req, res) {
  const {sentenceId, wordId, position} = req.body;

  if (position == -1)
  {
    //Create new sentence
  }

  if (sentenceId && wordId) {

  }
  else {
    // 
  }
});

module.exports = router;
