const express = require('express')
const app = express()

//db mongoose setting
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/todo',{useNewUrlParser: true})

const db = mongoose.connection

db.on('error', ()=>{
  console.log('mongodb error!')
})

db.once('open', ()=>{
  console.log('mongodb connected')
})

//    載入 todo model
const Todo = require('./models/todo');
app.get('/',(req, res)=>{
  res.send('hello world!')
})

app.listen(3000, ()=>{
  console.log('app is runing')
})