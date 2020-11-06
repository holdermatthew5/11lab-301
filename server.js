'use strict';

let express = require('express');
let superagent = require('superagent');
let ejs = require('ejs');
const pg = require('pg');
const { response, urlencoded } = require('express');
let app = express();
const client = new pg.Client(process.env.DATABASEURL);
require('dotenv').config();

let PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// non-dependency global variables
let books = [];

app.post('/show', search);
app.get('/', home);

function home(request, response) {
  const select = `SELECT * FROM books;`;
  let count = 0;
  books = [];
  client.query(select).then(data => {
    count = data.rowCount;
    data.rows.forEach(obj => {
      let book = new Book(obj);
      books.push(book);
    })
  });
  response.render('pages/index', {'books': books, 'count': count});
}

function search(request, response) {
  let searchType = `in${request.body.choice}`;
  let searchQuery = request.body.search_query;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+${searchType}`;
  superagent.get(url).then(data => {
    let items = data.body.items;
    let i = 0;
    books = items.map(obj => {
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
  this.authors = obj.authors || 'We\'re not really sure who wrote this one, sorry.',
  this.title = obj.title || 'This book lost it\'s title :(',
  this.isbn = obj.isbn || 'Honestly, it could be anything.',
  this.image_url = image || obj.image_url || 'https://i.imgur.com/J5LVHEL.jpg',
  this.description = obj.description || 'We haven\'t heard about this one yet.'
}

app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));