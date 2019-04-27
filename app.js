const express = require('express')
const app = express()

//db mongoose setting
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/todo',{useNewUrlParser: true})

//handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const db = mongoose.connection

db.on('error', ()=>{
  console.log('mongodb error!')
})

db.once('open', ()=>{
  console.log('mongodb connected')
})

//    載入 todo model
const Todo = require('./models/todo');
// Todo 首頁
app.get('/',(req, res)=>{
  return res.render('index')
})
//列出全部 Todo
app.get('/todos',(req, res)=>{
  res.send('列出所有的todo')
})
//新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  res.send('新增todo')
})
//新增一筆 Todo
app.post('/todos', (req, res) => {
  res.send('建立todo')
})


//顯示 Todo 詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示todo')
})

//修改Todo 頁面
app.get('/todos/：id/edit', (req, res) => {
  res.send('修改todo')
})

app.post('/todos/:id', (req, res) => {
  res.send('修改todo')
})

//刪除Todo
app.post('/todos/：id/delete', (req, res) => {
  res.send('刪除todo')
})


app.listen(3000, ()=>{
  console.log('app is runing')
})