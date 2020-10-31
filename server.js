'use strict';

let express = require('express');
let superagent = require('superagent');
let ejs = require('ejs');
let app = express();

require('dotenv').config();

let PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.send('Connected.');
});

app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));