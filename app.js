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

//  引用 body-parser
const bodyParser = require('body-parser');
// 設定bodyParser
app.use(bodyParser.urlencoded({extended:true}));
// Todo 首頁
app.get('/',(req, res)=>{
  Todo.find((err, todos)=>{
    //把todo model 所有資料都抓回來
    if (err) return console.error(err)
    return res.render('index', { todos: todos })
    //將資料傳給index 樣板 變數 todos
  })
 
})
//列出全部 Todo
app.get('/todos',(req, res)=>{
  res.send('列出所有的todo')
})
//新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
//新增一筆 Todo
app.post('/todos', (req, res) => {
  const todo=Todo({
    name: req.body.name,
  })
  todo.save(err =>{
    if(err) return console.error(err)
    return res.redirect('/')
  })
  
})


//顯示 Todo 詳細內容
app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo)=>{
    if (err) return console.error(err)
    return res.render('detail', {todo: todo})
  })
})

// 修改 Todo 頁面
app.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {

  if (err) return console.error(err)
  return res.render('edit', { todo: todo })
})
})

app.post('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo)=>{
    if (err) return console.error(err)
    todo.name= req.body.name
    todo.save(err=>{
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)

    })
  })

})

//刪除Todo
app.post('/todos/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo)=>{
    if(err) return console.error(err)
    todo.remove(err=>{
      if(err) return console.error(err)
      return res.redirect('/')
    })
  })
})


app.listen(3000, ()=>{
  console.log('app is runing')
})