const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)


let router = new Router()
router.get('/', ctx => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('./simple.html')
})

app.use(router.routes())

io.on('connection', (socket) => {
  let id = ''
  console.info('socketIO connection success!!!')
  // 接收客户端信息
  socket.on('client message', msg => {
    console.info('client Message:' + msg)
  })
  // 服务端发送信息
  socket.emit('server message', 'I am from server')

  // broadcast广播
  // (告诉别人我来了)
  socket.broadcast.emit('broadcast', 'socket broadcast')


  // homework
  // 1: Broadcast a message to connected users when someone connects or disconnects.
  socket.on('userConnected', msg => {
    id = msg
    socket.broadcast.emit('userConnected',`欢迎${msg}用户到来`)
  })
  socket.on('disconnect', () => {
    console.info('user disconnected')
    socket.broadcast.emit('userDisconnect',`拜拜${id}用户`)
  })
  // 2:
  socket.on('sendOther', data => {
    console.info('sendOther')
    socket.broadcast.emit('messageOther', data)
  })
})



server.listen('3000')