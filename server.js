'use strict';

const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const express    = require('express');
const port       = process.env.PORT || 3000;
const app        = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redirect-dev');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public/`));
// app.use('/', urlRouter);
// app.use('/*', express.static(`${__dirname}/public/`));

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
