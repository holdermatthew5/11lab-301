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
  let searchType = `in${request.body.choice}`;
  let searchQuery = request.body.search_query;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+${searchType}`;
  superagent.get(url).then(data => {
    let items = data.body.items;
    let i = 0;
    let books = items.map(obj => {
      let newUrl = '';
      let imgUrlArr = [];
      if (obj.volumeInfo.imageLinks.smallThumbnail[4] === ':') {
        for (let i = 0; i < obj.volumeInfo.imageLinks.smallThumbnail.length; i++) {
          imgUrlArr.push(obj.volumeInfo.imageLinks.smallThumbnail[i]);
        }
        imgUrlArr.splice(4, 0, 's');
        imgUrlArr.forEach(letter => newUrl += letter);
      };
      i++
      console.log(imgUrlArr);
      return new Book(obj.volumeInfo, newUrl);
    });
    response.status(200).render('pages/index', {'books': books});
  })
  .catch ((error) => {
    console.log(error);
    response.render('pages/error', error);
  });
}

function Book(obj, image) {
  this.title = obj.title || 'This book lost it\'s title :(',
  this.subtitle = obj.subtitle || '',
  this.authors = obj.authors || 'We\'re not really sure who wrote this one, sorry.',
  this.description = obj.description || `We haven't heard about this one yet.`,
  this.categories = obj.categories || 'This book doesn\'t like labels',
  this.image = image || 'https://i.imgur.com/J5LVHEL.jpg',
  this.lang = obj.language || 'It is written in a language... but we don\'t know which one.'
}

app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));