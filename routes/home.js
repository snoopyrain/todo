const express = require('express')
const router =express.Router()
const Todo = require('../models/todo')
//設定首頁路由器

router.get('/', (req, res) => {
  //把todo model 所有資料都抓回來
  Todo.find({})
    .sort({ name: 'asc' })
    .exec((err, todos) => {
      if (err) return console.error(err)
      return res.render('index', { todos: todos })
      //將資料傳給index 樣板 變數 todos
    })

})

module.exports = router