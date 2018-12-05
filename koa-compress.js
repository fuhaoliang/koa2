const Koa = require('koa');
const path = require('path')
const static = require('koa-static')
const compress = require('koa-compress');
const app = new Koa()


const options = { threshold: 2048 };
app.use(compress(options));

const staticPath = './dist'
app.use(static(
  path.join(__dirname, staticPath)
))

app.use( async (ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000)