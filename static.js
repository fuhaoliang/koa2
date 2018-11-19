const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

// 解析静态资源类型
function parseMime(url) {
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'
  return mimes[ extName ]
}

app.use( async (ctx) => {
  // 静态资源目录在本地的绝对路径
  let fullStaticPath = path.join(__dirname, staticPath)
  // 获取文件内容
  let _content = await content(ctx, fullStaticPath)
  // 解析文件内容
  let _mime = parseMime (ctx.url)

  if(_mime) {
    ctx.type = _mime
  }

  // 输出静态资源
  if (_mime && _mime.indexOf('image/') >= 0) {
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    ctx.body = _content
  }
})

app.listen(3000)
