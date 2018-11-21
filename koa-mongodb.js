const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const Monk = require('monk')
const app = new Koa()
mongoose.connect('mongodb://localhost:27017/myDB',{useNewUrlParser:true});
let db = mongoose.connection;
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/myDB',{useNewUrlParser:true})
// const db = mongoose.createConnection('mongodb://localhost:27017/myDB',{useNewUrlParser:true})


db.on("error", function(err){
  console.error("数据库链接失败:"+ err);
});

// 连接成功
db.on("open", function(){
  console.log("数据库链接成功");
  const dataSchema = new mongoose.Schema({});
  const dataModel = mongoose.model('users', dataSchema, 'users');
  let msg = dataModel.find({}, (err, doc) => {
    console.info('doc', doc);
  })
});

// 断开数据库
db.on("disconnected", function(){
  console.log("数据库断开");
})

app.listen(3000)