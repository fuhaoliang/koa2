const Koa = require('koa')
const jsonp = require('koa-jsonp')
const app = new Koa()

app.use(jsonp())

app.use(async (ctx) => {
  let returnData = {
    success: true,
    data: {
      text: 'this is a koa-jsonp api',
      time: new Date().getTime(),
    }
  }
  ctx.body = returnData
})

app.listen(3000, () => {
  console.info('jsonp!!!')
})