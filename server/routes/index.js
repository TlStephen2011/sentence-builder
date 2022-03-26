var express = require('express');
var router = express.Router();
const WordType = require('../models/wordType');
const Word = require('../models/word');
const Sentence = require('../models/sentence');
const sequelize = require('../utils/database');

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
  const {wordId, position} = req.body;
  console.log(req.body);
  if (position == -1)
  {
    // Create new sentence increment the sentence Id
    const [results, metadata] = await sequelize.query('SELECT MAX(sentenceId) AS sentenceId FROM sentences');
    let lastInsertedSentenceId = results[0].sentenceId;
    lastInsertedSentenceId = lastInsertedSentenceId == null ?  1 : lastInsertedSentenceId;

    let insertedSentence = await Sentence.create({ sentenceId: lastInsertedSentenceId + 1, position: 1 });
    res.status(201).json(insertedSentence);
    return;
  }

  if (wordId != null && position != null) {
    const [results, metadata] = await sequelize.query('SELECT MAX(sentenceId) AS sentenceId FROM sentences');
    const lastInsertedSentenceId = results[0].sentenceId;
    let insertedSentence = await Sentence.create({ sentenceId: lastInsertedSentenceId, wordId: wordId, position: position });
    res.status(201).json(insertedSentence);
  }
  else {
    // Bad request
    res.statusMessage = 'Please pass a word id and position or eof delimiter';
    res.status(400).end();
  }
});

router.get('/sentence', async function(req, res) {
  let sentences = await Sentence.findAll();
  sentences.sort(function(a, b) {
    if (a.position < b.position && a.sentenceId < b.sentenceId)
      return true;
    else
      return false;
  });
  res.json(await buildSentences(sentences));
});

async function buildSentences(sentencesObj) {
  var i = 0;
  var fullSentences = [];
  var sentenceId = 0;
  var fullSentence = '';
  while (i < sentencesObj.length)
  {
    const currentSentence = sentencesObj[i];

    if (currentSentence.wordId == null || currentSentence.wordId == undefined) {
      i++;

      if (currentSentence.sentenceId != sentenceId) {
        fullSentences.push(fullSentence.trimEnd());
        sentenceId++;
        fullSentence = '';
      }

      continue;
    }

    var wordObj = await Word.findOne({ where: { id: currentSentence.wordId } });
    fullSentence = fullSentence + wordObj.word + " ";
    i++;
  }

  return fullSentences;
}

module.exports = router;
