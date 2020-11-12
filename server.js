'use strict';

let express = require('express');
let superagent = require('superagent');
let ejs = require('ejs');
const pg = require('pg');
const { response, urlencoded } = require('express');
let app = express();
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL);


let PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// non-dependency global variables
// use get when not making request

app.get('/', home);
app.post('/show', show);
app.get('/books/:id', booksDetail);
app.post('/books', books);
app.get('/new', search);
// app.put('/books:id', edit);

function home(request, response) {
  const sql = `SELECT * FROM books;`;
  let count = 0;
  client.query(sql).then(data => {
    count = data.rowCount;
    response.render('pages/index', {'books': data.rows, 'count': count});
  }).catch((error) => {
    console.log(error);
  });
}

function search(request, response) {
  response.render('pages/searches/new');
}

function show(request, response) {
  let searchType = `in${request.body.choice}`;
  let searchQuery = request.body.search_query;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+${searchType}`;
  superagent.get(url).then(data => {
    let items = data.body.items;
    let img = '';
    let books = items.map(obj => {
      if (obj.volumeInfo.imageLinks.smallThumbnail[4] === ':') {
        let imgUrlArr = [];
        img = '';
        for (let i = 0; i < obj.volumeInfo.imageLinks.smallThumbnail.length; i++) {
          imgUrlArr.push(obj.volumeInfo.imageLinks.smallThumbnail[i]);
        }
        imgUrlArr.splice(4, 0, 's');
        imgUrlArr.forEach(letter => {
          img += letter;
        });
      };
      const book = new Book(obj, img);
      return book;
    });
    response.status(200).render('pages/searches/show', {'books': books});
  })
  .catch ((error) => {
    console.log(error);
    response.render('pages/error', error);
  });
}

function booksDetail(request, response) {
  console.log(request.body);
  let bookId = request.params.id;
  const select = `SELECT * FROM books WHERE id=$1;`;
  const safeVal = [bookId];
  client.query(select, safeVal).then(data => {
    let book = data.rows;
    response.render('pages/books/show', {'book': book});
  });
  
}

function books(request, response) {
  const obj = request.body;
  const insert = 'INSERT INTO books (authors, title, isbn, image_url, description, shelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
  const safeInsert = [obj.authors, obj.title, obj.isbn, obj.image_url, obj.description, obj.shelf];
  client.query(insert, safeInsert)
    .then(data => {
      let newBook = data.rows[0].id;
      response.redirect(`/books/${newBook}`);
  })
  // const select = 'SELECT * FROM books;';
  // client.query(select).then(data => {
  //   response.redirect('/books:id?id=');
  // });
}

function edit(request, response) {

}

function Book(obj, image) {
  this.authors = obj.volumeInfo.authors || 'We\'re not really sure who wrote this one, sorry.',
  this.title = obj.volumeInfo.title || 'This book lost it\'s title :(',
  this.isbn = `${obj.volumeInfo.industryIdentifiers[0].type}: ${obj.volumeInfo.industryIdentifiers[0].identifier}` || 'Honestly, it could be anything.',
  this.image_url = image || 'https://i.imgur.com/J5LVHEL.jpg',
  this.description = obj.volumeInfo.description || 'We haven\'t heard about this one yet.',
  this.shelf = obj.volumeInfo.categories
}
client.connect();
app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));