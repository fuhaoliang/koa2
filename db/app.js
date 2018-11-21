const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const dbPath = 'mongodb://localhost/myDB'

/**
 * mongoose连接数据库
 *
 */
mongoose.Promise = global.Promise
mongoose.connect(dbPath)

mongoose.connection.on('error', err => {
  console.info('err', err)
})
mongoose.connection.on('open', () => {
  console.info('连接数据库成功')
})

const models_path = path.join(__dirname, '/models')

/**
 * 递归读取表的文件
 */
const walk = (models_path) => {
  fs
    .readdirSync(models_path)
    .forEach(file => {
      let filePath = path.join(models_path, '/' + file)
      let stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      } else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}

walk(models_path)
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()

app.use(cors())
app.use(bodyParser())
/**
 * 配置路由信息
 */
const router = require('./config/router')()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(1234)