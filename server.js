'use strict';

let express = require('express');
let superagent = require('superagent');
let ejs = require('ejs');
const { response, urlencoded } = require('express');
let app = express();

require('dotenv').config();

let PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.get('/hello', (request, response) => {
  response.status(200).render('pages/index.ejs');
});

app.get('/', (request, response) => {
  response.status(404).send('Sorry we didn\'t find that one.');
});

app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));