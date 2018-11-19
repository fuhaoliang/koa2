const koa = require('koa')
const convert = require('koa-convert')
const loggerAsync = require('./middleware/logger-async')
const loggerGenerator = require('./middleware/logger-generator')
const app = new koa()

// app.use(loggerAsync())
app.use(convert(loggerGenerator()))
app.use( async (ctx) => {
  let url = ctx.request.url
  ctx.body = url
})
app.listen(3000)