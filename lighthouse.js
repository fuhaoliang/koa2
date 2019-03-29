/*
	webp图片生成

	运行：npm install && npm start

	程序依赖谷歌官方webp转换工具cwebp
	mac下安装 brew install webp
	windows下可以去google官方下载

	安装完成后运行cwebp -h 如果显示了使用帮助则表示安装成功
*/

const process = require('child_process');
const opn = require('opn')
// const lighthouse = require('lighthouse')

// 得到shell命令
function getShellCmd() {
	console.info('我执行了！！')
  return 'lighthouse https://www.homestyler.com/int/ --disable-device-emulation --output html --output-path ./googleReports/report.html'
}

process.exec(getShellCmd(), err => {
	console.info()
  if (err !== null) {
  } else {
    opn('./googleReports/report.html')
  }
})