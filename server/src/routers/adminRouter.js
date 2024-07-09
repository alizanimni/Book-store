const express = require('express')
const Book = require('../models/books');
const User = require('../models/users');

const router = express.Router()

router.patch('/edit-book', async(req,res)=>{
    const _id = req.query.id;
    try{
        const book = await Book.findByIdAndUpdate(_id,req.body)
        if(book){
            res.send(book)
        }else{
            return res.status.send(404).send({
                status:404,
                message: "no book"            
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/add-book',async(req,res)=>{
    const book = new Book(req.body)
    try{
       await book.save()
       res.send(book)
    }catch(err){
      res.status(400).send({
        status:400,
        message: err.message
      })
    } 
})

router.delete('/delete-book',async(req,res)=>{
    const _id = req.query.id;
    try{
        const book = await Book.findByIdAndDelete(_id)
        if(!book){
            return res.status.send(404).send({
                status:404,
                message: "no book"            
            })
        }
        send.res()
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/get-all-users', async(req,res)=>{
    try{
        const users = await User.find({})
        if(users.length>0){
            res.send(users)
        }else{
            return res.status.send(404).send({
                status:404,
                message: "no users"            
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
})



module.exports =router