'use strict';

// BRING IN DEPENDENCIES
let express = require('express');
let superagent = require('superagent');
let ejs = require('ejs');
const pg = require('pg');

// PREPARE DEPENDENCIES
const { response, urlencoded } = require('express');
let app = express();
require('dotenv').config();

// SET DATABASE URL
const client = new pg.Client(process.env.DATABASE_URL);

// SET PORT
let PORT = process.env.PORT || 3000;

// SET BASE URL
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// SET VIEW ENGINE
app.set('view engine', 'ejs');

// ROUTES
app.get('/', home);
app.post('/show', show);
app.get('/books/:id', booksDetail);
app.post('/books', books);
app.get('/new', search);

// ROUTE HANDLERS
// HOME
function home(request, response) {
  const sql = `SELECT * FROM books;`;
  let count = 0;
  // RETRIEVE BOOKS FROM DATABASE
  client.query(sql).then(data => {
    count = data.rowCount;
    // RENDER SAVED BOOKS TO PAGE
    response.render('pages/index', {'books': data.rows, 'count': count});
  }).catch((error) => {
    console.log(error);
  });
}

// MAKE A SEARCH
function search(request, response) {
  // RENDER SEARCH FORM
  response.render('pages/searches/new');
}

// SEARCH RESULTS
function show(request, response) {
  let searchType = `in${request.body.choice}`;
  let searchQuery = request.body.search_query;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+${searchType}`;
  // REQUEST LIST OF BOOKS FROM GOOGLE BOOKS API
  superagent.get(url).then(data => {
    let items = data.body.items;
    let img = '';
    // USE ONLY WHAT WE NEED
    let books = items.map(obj => {
      if (obj.volumeInfo.imageLinks.smallThumbnail[4] === ':') {
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
    // RENDER SEARCH RESULTS TO PAGE
    response.status(200).render('pages/searches/show', {'books': books});
  })
  .catch ((error) => {
    console.log(error);
    response.render('pages/error', error);
  });
}

// BOOK DETAILS
function booksDetail(request, response) {
  const select = `SELECT * FROM books WHERE id=$1;`;
  const safeVal = [bookId];
  // RETRIEVE REQUESTED BOOK FROM DATABASE
  client.query(select, safeVal).then(data => {
    let book = data.rows;
    // RENDER DETAILS OF BOOK TO PAGE
    response.render('pages/books/show', {'book': book});
  });
}

// ADD BOOKS TO DATABASE
function books(request, response) {
  const obj = request.body;
  const insert = 'INSERT INTO books (authors, title, isbn, image_url, description, shelf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
  const safeInsert = [obj.authors, obj.title, obj.isbn, obj.image_url, obj.description, obj.shelf];
  // ADD BOOK TO DATABASE
  client.query(insert, safeInsert)
    .then(data => {
      let newBook = data.rows[0].id;
      // REDIRECT TO DETAILS VIEW AND PASS IN DATA NECESSARY FOR FINDING DETAILS OF SAVED BOOKS
      response.redirect(`/books/${newBook}`);
  })
}

function edit(request, response) {

}

// TAILOR INCOMING DATA TO OUR NEEDS
function Book(obj, image) {
  this.authors = obj.volumeInfo.authors || 'We\'re not really sure who wrote this one, sorry.',
  this.title = obj.volumeInfo.title || 'This book lost it\'s title :(',
  this.isbn = `${obj.volumeInfo.industryIdentifiers[0].type}: ${obj.volumeInfo.industryIdentifiers[0].identifier}` || 'Honestly, it could be anything.',
  this.image_url = image || 'https://i.imgur.com/J5LVHEL.jpg',
  this.description = obj.volumeInfo.description || 'We haven\'t heard about this one yet.',
  this.shelf = obj.volumeInfo.categories
}

// START OUR SERVER WITH A DATABASE CONNECTION
client.connect();
app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));