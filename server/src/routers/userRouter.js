const express = require('express')
const User = require('../models/users')
const Book = require('../models/books')

const router = express.Router()

router.post("/add-user", async(req,res)=>{
    
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    if (err === 'EMAIL_EXIST') {
      res.status(400).send({
        status: 400,
        message: "EMAIL_EXIST",
      });
    } else {
      res.status(400).send({
        status: 400,
        message: err.message,
      });
    }
  }
})

router.patch("/user/add-book", async(req,res)=>{
    const allowUpdates = ["userId", "bookId"];
    for (let update in req.body) {
      if (!allowUpdates.includes(update)) {
        return res.status(400).send({
          status: 400,
          message: "Invalid update" + update,
        });
      }
    }

    try {
      const user = await User.findById(req.body.userId);
      const book = await Book.findById(req.body.bookId);
      console.log(user);
      console.log(book);
  
      if (!user) {
        return res.status(404).send({
          status: 404,
          message: "No user",
        });
      }else if(!book){
        if (!user) {
            return res.status(404).send({
              status: 404,
              message: "No book",
            });
      }}
      if(!user.books.includes(req.body.bookId)){
      user.books.push(req.body.bookId)
      user.save()
      res.send(user)        
      }else{
        return res.status(404).send({
          status: 404,
          message: "the book is already exist",
        });
      }

    } catch (err) {
        console.log(err);
      res.status(500).send(err);
    }

})

router.get("/user/get-user", async(req,res)=>{
    const email = req.query.email;
    const password = req.query.password;

    try {
      const user = await User.findOne({email,password})
  
      if (!user) {
        return res.status(404).send({
          status: 404,
          message: "No user",
        });
      }
  
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
})

router.get("/user/get-user-By-id", async(req,res)=>{
  const id = req.query.id;


  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "No user",
      });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})

router.delete('/user/delete-user',async(req,res)=>{
      const _id = req.query.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "wrong id",
      });
    }

    res.send();
  } catch (err) {
    res.status(500).send();
  }
})

router.patch('/user/delete-book',async(req,res)=>{
  const allowUpdates = ["userId", "bookId"];
  for (let update in req.body) {
    if (!allowUpdates.includes(update)) {
      return res.status(400).send({
        status: 400,
        message: "Invalid update" + update,
      });
    }
  }

  try {
    const user = await User.findById(req.body.userId);
    const book = await Book.findById(req.body.bookId);
    console.log(user);
    console.log(book);

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "No user",
      });
    }else if(!book){
      if (!user) {
          return res.status(404).send({
            status: 404,
            message: "No book",
          });
    }}
    const bookIndex = user.books.indexOf(req.body.bookId)
    if(bookIndex>-1){
      user.books.splice(bookIndex,1)     
    }else{
      res.send("the user dont oun this book")
    }
  
    user.save()
    res.send(user)
  } catch (err) {
      console.log(err);
    res.status(500).send(err);
  }
})

router.patch('/user/edit-details', async(req,res)=>{
  const _id = req.query.id;
  try{
      const user = await User.findByIdAndUpdate(_id,req.body)
      if(user){
          res.send(user)
      }else{
          return res.status.send(404).send({
              status:404,
              message: "no user"            
          })
      }
  }catch(err){
      res.status(500).send(err)
  }
})

module.exports = router