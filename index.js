const express = require('express');
const { request } = require('http');

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let books = [];
//books.push(
  //{
   // "id": "1",
    //"title": "1984",
    //"details": [
      //{
        //"id": "1",
        //"author": "George Orwell",
        //"genre": "Dystopian",
        //"publicationYear": 1949
      //}
    //]
  //}  
//)
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

app.get("/whoami", (request, response) => {
    response.json({studentNumber : '2652150'});
 });

 app.get("/books", (request, responce) => {
    responce.send(books);
 });

 app.get("/books/:id", (request, responce) => {
    const bookID = request.params.id;
    const book = books.find(book => book.id === bookID);

    if(book == null){
        responce.status(404).json({error : 'Book not found'});
    }
    else{
        responce.json(book);
    }

 });

 app.post("/books", (request, responce) =>{
    const bookInfo = request.body;
    
    //space for error handeling
    if (!bookInfo) return responce.status(400).json({error : 'Missing book info'});
    if(!bookInfo.id || !bookInfo.title || !bookInfo.details) return responce.status(400).json({error : 'Missing required book info'})
    for(e in books){
        if (bookInfo.id === e.id) return responce.status(400).json({error : 'Book ID already exists'})
    }    
    books.push(bookInfo);

    responce.status(201).send("Book added successfully");
 });

 app.put("/books/:id", (request, responce) => {

    const bookInfo = request.body;
    const bookID = request.params.id;
    if(!bookID) return responce.status(404).json({error : 'No book ID entered'});
    const book = books.find(book => book.id === bookID);
    if(book == null) return responce.status(404).json({error : 'Book not found'});
    if (!bookInfo) return responce.status(400).json({error : 'Missing book info'});
    if(!bookInfo.id || !bookInfo.title || !bookInfo.details) return responce.status(400).json({error : 'Missing required book info'})
    const bookindex = books.indexOf(book);
    console.log(bookindex);
    books[bookindex] = request.body;

    responce.status(201).send("Book changed successfully");

 });

 app.delete("/books/:id", (request, responce) => {
    const index = books.findIndex(book => book.id === request.params.id);

    if (index === -1) return responce.status(404).json({ error: 'Book not found' });
  
    books.splice(index, 1);
    responce.status(204).send(); 
 });

 app.post("/books/:id/details", (request, responce) => {
    const bookInfo = request.body;
    const bookID = request.params.id;
    if(!bookID) return responce.status(404).json({error : 'No book ID entered'});
    const book = books.find(book => book.id === bookID);
    if(book == null) return responce.status(404).json({error : 'Book not found'});
    if (!bookInfo) return responce.status(400).json({error : 'Missing book info'});
    if(!bookInfo.id) return responce.status(400).json({error: 'Missing detailID'});
    const bookindex = books.indexOf(book);
    books[bookindex].details.push(bookInfo);

    responce.status(201).send()
 });

 app.delete("/books/:id/details/:detailId", (request, responce) => {
    const book = books.find(book => book.id === request.params.id);
    if (!book) return responce.status(404).json({ error: 'Book not found' });

    const detailIndex = book.details.findIndex(detail => detail.id === request.params.detailId);
    if (detailIndex === -1) return res.status(404).json({ error: 'Detail not found' });

  book.details.splice(detailIndex, 1);
  responce.status(204).send();
 });


