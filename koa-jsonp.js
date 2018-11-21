const Koa = require('koa')
const jsonp = require('koa-jsonp')
const Router = require('koa-router')
const app = new Koa()

// app.use(jsonp())

const home = new Router()
const page = new Router()
const router = new Router()
home.get('/', async (ctx) => {
  ctx.body = 'home'
})

page.get('/1', async(ctx) => {
  ctx.body = {
    text: 'this is a koa-jsonp api',
    time: new Date().getTime(),
  }
}).get('/2', async (ctx) => {
  ctx.body = 'pageTwo'
})

router.use('/', home.routes(), home.allowedMethods())
router.use('/page',jsonp(), page.routes(), page.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// app.use(async (ctx) => {
//   let returnData = {
//     success: true,
//     data: {
//       text: 'this is a koa-jsonp api',
//       time: new Date().getTime(),
//     }
//   }
//   ctx.body = returnData
// })

app.listen(3000, () => {
  console.info('jsonp!!!')
})