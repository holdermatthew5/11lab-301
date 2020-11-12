INSERT INTO books (authors, title, isbn, image_url, description)
 VALUES (
   'Marc Shapiro',
   'J. K. Rowling: New and Revised',
   'ISBN_10: 0312286627',
   'https://books.google.com/books/content?id=r288hPCHBRoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
   'Celebrates'
  )RETURNING *;