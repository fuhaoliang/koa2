const Koa = require('koa')
const app = new Koa()

app.use( async (ctx) => {
  if( ctx.url === '/index'){
    ctx.cookies.set(
      'setCookie',
      '6666666',
      {
        domain: 'localhost',
        path: '/index',
        maxAge: 10 * 60 * 1000,
        expires: new Date('2018-11-17'),
        httpOnly: false,
        overwrite: false
      }
    )
    let setCookie = ctx.cookies.get('setCookie')
    ctx.body = setCookie
  } else {
    ctx.body = 'hello world'
  }
})

app.listen(3000)