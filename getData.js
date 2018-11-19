const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  let url = ctx.url
  // 1.ctx.query获取数据
  let {query, querystring} = ctx
  let req_query = ctx.request.query
  let req_querystring = ctx.request.querystring
  // 2.ctx.request
  ctx.body = {
    query,
    querystring,
    req_query,
    req_querystring
  }
})

app.listen(3000)