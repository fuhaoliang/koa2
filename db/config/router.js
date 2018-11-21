const User = require('../controllers/user')
const Router = require('koa-router')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // // user
  // router.post('/u/signup', App.hasBody, User.signup)
  // router.post('/u/update', App.hasBody, App.hasToken, User.update)

  // DB Interface test
  router.get('/test/user/users',User.users)
  router.post('/test/user/delete',User.deleteUser)
  return router
}