const Koa = require('koa')
const path = require('path')
const log4js = require('koa-log4')
const logConfig = require('./logs/logCongfig.js')
const fs = require('fs')
const static = require('koa-static')
const app = new Koa()



const logger = log4js.getLogger('app')
// 生成logs目录 && 加载配置文件 start
const logPath = path.join(__dirname, 'logs')
try {
  fs.mkdirSync(logPath)
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', err)
    process.exit(1)
  }
}
// 生成logs目录 && 加载配置文件 end
log4js.configure(logConfig)




app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(static(
  path.join(__dirname, './static')
))

app.use(async (ctx)=> {
  ctx.body = 'koa-log4'
})

app.on('error', function (err, ctx) {
  logger.error('server error', err, ctx)
})

app.listen(3000)