const express = require('express')
const router = express.Router()
const passport = require ('passport') //載入 passport
const User = require('../models/user')
//登入頁面
router.get('/login', (req,res)=>{
  res.render('login')
})

//登入檢查
router.post('/login', (req, res, next)=>{
  passport.authenticate('local', { //使用passport 認證
    successRedirect: '/',  //登入成功會回到根目錄
    failureRedirect: '/users/login',  //失敗會留在原本頁面
  })(req, res, next)
})
//註冊頁面
router.get('/register', (req, res)=>{
  res.render('register')
})

//註冊檢查
router.post('/register', (req, res)=>{
  console.log('route post register')
  const { name, email, password, password2} = req.body
  User.findOne({email:email}).then(user =>{
    if (user){
      console.log('User already exists')
      res.render('register',{
        name,
        email,
        password,
        password2,
      })
      //如果email 已經存在就不能送出 回到註冊表單頁面
    } else{
      const newUser = new User({
        name,
        email,
        password,
      })
      newUser.save().then(user=>{
        res.redirect('/')
      })
      .catch(err=>console.log(err))
      //如果email 不存在就新增使用者 
      //新增完成後導回首頁
      console.log("save user")
    }
  })
  
})
// 登出
router.get('/logout', (req, res)=>{
  res.send('logout')
})

module.exports = router