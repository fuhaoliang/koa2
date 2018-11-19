const Koa = require('koa')
const app = new Koa()

// 解析上下文里node原生请求的POST参数
function parsePostDate (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ''
      ctx.req.addListener('data', data => {
        console.info('进入')
        postdata += data
      })
      ctx.req.addListener('end', () => {
        let parseData = parseQueryStr (postdata)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}
// 将POST请求参数字符串解析成JSON

function parseQueryStr (queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.info('queryStrlist', queryStrList)
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}


app.use( async (ctx) => {
  if (ctx.url === '/' & ctx.method === 'GET') {
    let html = `
      <div>
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/">
          <p>userName</p>
          <input name="userName" /><br/>
          <p>nickName</p>
          <input name="nickName" /><br/>
          <p>email</p>
          <input name="email" /><br/>
          <button type="submit">submit</button>
        </form>
      </div>
    `
    ctx.body = html
  } else if ( ctx.method === 'POST') {
    let postData = await parsePostDate(ctx)
    ctx.body = postData
  } else {
    ctx.body = `<h1>404!!!</h1>`
  }
})

app.listen(3000)