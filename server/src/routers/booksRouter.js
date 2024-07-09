const express = require('express')
const Book = require('../models/books')

const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const books = await Book.find({})
        if(books.length>0){
            console.log(books)
            res.send(books)
        }else{
            return res.status.send(404).send({
                status:404,
                message: "no books"            
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/books/find-book', async(req,res)=>{
    const _id = req.query.id;
    try{
        const book = await Book.findById(_id)
        if (!book) {
            return res.status(404).send({
              status: 404,
              message: "No book",
            });
          }
      
          res.send(book);
        } catch (err) {
          res.status(500).send(err);
        }
})

router.get('/books/find-auther-books', async(req,res)=>{
    const auther = req.query.auther;
    try{
        const book = await Book.find({auther})
        if (!book) {
            return res.status(404).send({
              status: 404,
              message: "No book",
            });
          }
      
          res.send(book);
        } catch (err) {
          res.status(500).send(err);
        }
})



module.exports =router