const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const router = new Router()

const logger = require('./middleware/logger-async')
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 200*1024*1024
  }
}))

router.get('/', async (ctx, next) => {
  ctx.body = `
    <form action="http://localhost:3000/uploadfile" method="post" enctype="multipart/form-data">
      <input type="file" name="file" id="file" value="" multiple="multiple" />
      <input type="submit" value="提交"/>
    </form>
  `
})

router.post('/uploadfile', logger(), async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, 'upload-files/') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = "上传成功！";
});

app.use(router.routes(), router.allowedMethods())
app.listen(3000)