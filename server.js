'use strict';

let express = require('express');
let superagent = require('superagent');
let ejs = require('ejs');
const { response, urlencoded } = require('express');
let app = express();

require('dotenv').config();

let PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.post('/show', search);

app.get('/', (request, response) => {
  response.render('pages/searches/new.ejs');
});

function search(request, response) {
  try {
    console.log(request.body);
    response.status(200).render('pages/index.ejs');
    let searchType = request.query.choice;
    let searchQuery = 'words';
    let url = `https://www.googleapis.com/apiName/apiVersion/resourcePath?q=${searchQuery}+${searchType}`;
  } catch (error) {
    console.log(error);
  };
}

app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));