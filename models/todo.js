const mongoose = require("mongoose")
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name:{
    type: String,
    require: true,
  },
  done: {  //完成狀態
    type: Boolean,
    default: false, // 預設完成狀態為false
  }
})

module.exports =mongoose.model('Todo', todoSchema)