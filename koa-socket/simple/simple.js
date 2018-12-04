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
let count = 0
var socketArr = [] //创建一个数组来存放所有连接的socket.id
io.on('connection', (socket) => {
  count++
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
    console.info('count1111111', count)
    socket.broadcast.emit('userConnected',`欢迎${msg}用户到来`)
  })
  socket.on('disconnect', () => {
    count--
    console.info('user disconnected')
    socket.broadcast.emit('userDisconnect',`拜拜${id}用户`)
     // 4: 在线人数
    io.sockets.emit('userCount', count)
  })
  // 2:
  socket.on('sendOther', data => {
    console.info('sendOther')
    socket.broadcast.emit('messageOther', data)
  })
  // 3: 正在发送消息
  let inputingTimeout = null
  socket.on('inputing', data => {
    if (inputingTimeout) clearTimeout(inputingTimeout)
    socket.broadcast.emit('otherinputing', true)
    inputingTimeout = setTimeout(() => {
      socket.broadcast.emit('otherinputing', false)
    },2000)
  })
  // 4: 在线人数
  io.sockets.emit('userCount', count)
  // 5:私聊
  // io.sockets.socket(socketid).emit('String', data)
  let socketId = socket.id
  console.info('socketId!!', socketId)
  socketArr.push(socketId)
  socket.on('sayTo', data => {
    let userId = data.id
    let msg = data.msg
    io.to(userId).emit('secret', msg)
  })
})



server.listen('3000')
/**
 * https://www.cnblogs.com/lxxhome/p/5980615.html
 * https://github.com/mbjgithub/socket.io-express-SingleChatAndMultiplyChat/blob/master/public/javascript/index.js
 * https://blog.csdn.net/koastal/article/details/53677766
 * https://www.jianshu.com/p/a0d8f7e8609c !!!!!!
 * https://blog.csdn.net/zls986992484/article/details/71599297
 *  */