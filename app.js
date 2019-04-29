const express = require('express')
const app = express()
// 載入 express-session 與 passport
const session = require ('express-session')
const passport = require('passport')
//使用express session
app.use(session({
  secret: 'your secret key',
}))

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())


// 載入 Passport config
require('./config/passport')(passport)


//建立  local variables
app.use((req, res, next)=>{
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() //便是使用者是否已經登入的變數 讓view 可以使用
  next()
})
// 登入後可以取得使用者的資訊方便我們在view 裡面直接使用
app.use((req, res, next)=>{
  res.locals.user = req.user
  next()
})
//db mongoose setting
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/todo',{useNewUrlParser: true})
// 引用  method-override
const methodOverride = require('method-override')
// 設定method-overrides
app.use(methodOverride('_method'))
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

//設定路由
app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/user'))
app.listen(3000, ()=>{
  console.log('app is runing')
})