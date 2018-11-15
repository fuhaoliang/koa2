function log(ctx) {
  console.info('logger-generator', ctx.method, ctx.header.host, ctx.url);
}

module.exports = function() {
  return function* (next) {
    log(this)
    if (next) {
      yield next
    }
  }
}
