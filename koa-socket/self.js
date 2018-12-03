const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')
const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

let router = new Router()
router.get('/', ctx => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('./self.html')
})

app.use(router.routes())

let rooms = []
io.sockets.on('connection', socket => {
  // 群聊
  socket.on('sendAllMsg', data => {
    io.sockets.emit('sendAllMsg', data)
  })

  socket.on('room', room => {
    let isExit = rooms.includes(room)
    if (isExit) {
      // 加入判断
      socket.join(room)
      io.to(room).emit('self_room', `加入${room}房间`)
    } else {
      // 加入判断
      socket.join(room)
      io.to(room).emit('self_room', `加入${room}房间`)
    }
    socket.on('sendMsg', data => {
      console.info('sendMsgServer', data)
      socket.emit('emitMsg', data)
    })
  })
})

server.listen(1234, () => {
  console.info('listen: 1234')
})