var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');

const sequelize = require("./utils/database");

const Sentence = require('./models/sentence');
const Word = require('./models/word');
const WordType = require('./models/wordType');

Word.hasMany(Sentence);
WordType.hasOne(Word);

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

sequelize
  .sync({force: true})
//   .sync()
  .then((result) => {
    // Create word types
    WordType.create({ wordType: "Noun" });
    WordType.create({ wordType: "Verb" });
    WordType.create({ wordType: "Adjective" });
    WordType.create({ wordType: "Adverb" });
    WordType.create({ wordType: "Pronoun" });
    WordType.create({ wordType: "Preposition" });
    WordType.create({ wordType: "Conjunction" });
    WordType.create({ wordType: "Determiner" });
    WordType.create({ wordType: "Exclamation" });

    // Create Words
    Word.create({ word: "dog", wordTypeId: 1 });
    Word.create({ word: "cat", wordTypeId: 1 });
    Word.create({ word: "city", wordTypeId: 1 });
    Word.create({ word: "building", wordTypeId: 1 });
    Word.create({ word: "heart", wordTypeId: 1 });

    Word.create({ word: "run", wordTypeId: 2 });
    Word.create({ word: "jump", wordTypeId: 2 });
    Word.create({ word: "slide", wordTypeId: 2 });
    Word.create({ word: "dance", wordTypeId: 2 });
    Word.create({ word: "do", wordTypeId: 2 });

    Word.create({ word: "charming", wordTypeId: 3 });
    Word.create({ word: "cruel", wordTypeId: 3 });
    Word.create({ word: "fantastic", wordTypeId: 3 });
    Word.create({ word: "gentle", wordTypeId: 3 });
    Word.create({ word: "huge", wordTypeId: 3 });

    Word.create({ word: "abnormally", wordTypeId: 4 });
    Word.create({ word: "diligently", wordTypeId: 4 });
    Word.create({ word: "hopelessly", wordTypeId: 4 });
    Word.create({ word: "doubtfully", wordTypeId: 4 });
    Word.create({ word: "highly", wordTypeId: 4 });

    Word.create({ word: "I", wordTypeId: 5 });
    Word.create({ word: "me", wordTypeId: 5 });
    Word.create({ word: "he", wordTypeId: 5 });
    Word.create({ word: "she", wordTypeId: 5 });
    Word.create({ word: "it", wordTypeId: 5 });

    Word.create({ word: "for", wordTypeId: 6 });
    Word.create({ word: "from", wordTypeId: 6 });
    Word.create({ word: "in", wordTypeId: 6 });
    Word.create({ word: "inside", wordTypeId: 6 });
    Word.create({ word: "into", wordTypeId: 6 });

    Word.create({ word: "where", wordTypeId: 7 });
    Word.create({ word: "when", wordTypeId: 7 });
    Word.create({ word: "until", wordTypeId: 7 });
    Word.create({ word: "that", wordTypeId: 7 });
    Word.create({ word: "once", wordTypeId: 7 });

    Word.create({ word: "a", wordTypeId: 8 });
    Word.create({ word: "an", wordTypeId: 8 });
    Word.create({ word: "the", wordTypeId: 8 });
    Word.create({ word: "some", wordTypeId: 8 });
    Word.create({ word: "few", wordTypeId: 8 });

    Word.create({ word: "!", wordTypeId: 9 });
    Word.create({ word: " ", wordTypeId: 9 });
    Word.create({ word: "", wordTypeId: 9 });

    // Sentence.create({ wordId:43, sentenceId: 1, position: 1 });
  })
  .catch(err => console.log(err));

module.exports = app;
