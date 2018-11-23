const mongoose =  require('mongoose')
const User = require('../models/user')
const userHelper = require('../dbhelper/userHelper')

const users = async (ctx, next) => {
  var data = await userHelper.findAllUsers()
  // var obj = await userHelper.findByPhoneNumber({phoneNumber : '13525584568'})
  // console.log('obj=====================================>'+obj)
  ctx.body = {
    success: true,
    data
  }
}

/**
 *删除用户
 *
 * @param {*} ctx
 * @param {*} next
 */
const deleteUser = async (ctx, next) => {
  const _id = ctx.request.body._id
  let data = await userHelper.deleteUser({ _id: '1' })
  ctx.body = {
    success: data
  }
}

module.exports = {
  users,
  deleteUser
}
