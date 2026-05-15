const express = require('express');
const cors = require('cors');
const diaryRouter = require('./3.Routers/diaries');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/diary', diaryRouter);

module.exports = app