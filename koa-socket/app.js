  const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

let router = new Router()
router.get('/', ctx => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('./index.html')
})

app.use(router.routes())

io.on('connection', socket => {
  socket.on('allMsg', msg => {
    console.info('message', msg)
    io.emit('allMsg', msg)
  })
  socket.on('disconnect', () => {
    console.info('user disconnected')
    let id = socket.id
    console.info('socket.id', socket.id)
  })
})

server.listen(9999, () => {
  console.info('listen: 9999')
})
