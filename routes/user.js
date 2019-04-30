const express = require('express')
const router = express.Router()
const passport = require ('passport') //載入 passport
const bcrypt = require('bcryptjs') // 載入 bcryptjs library
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
  // 加入錯誤訊息提示
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
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

      //先用 genSalt 產生鹽 第一個參數是複雜係數 預設是10
      bcrypt.genSalt(10, (err, salt)=>
      //再用hash 把鹽和使用者的密碼配再一起，然後產生雜揍處理後的hash
      bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if(err) throw err
        newUser.password = hash
        // 用 bcrypt 處理密碼後 再把它儲存起來
        
        newUser.save().then(user => {
          res.redirect('/')
        })
          .catch(err => console.log(err))
        //如果email 不存在就新增使用者 
        //新增完成後導回首頁
        console.log("save user")

      }))
    }
  })
  }
})
// 登出
router.get('/logout', (req, res)=>{
  req.logout()
  // 加入訊息提示
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router