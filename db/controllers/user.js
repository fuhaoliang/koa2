const mongoose =  require('mongoose')
const User = require('../models/user')
const userHelper = require('../dbhelper/userHelper')

const usersPage = async (ctx, next) => {
  let { page, size } = ctx.request.body
  console.info('ctx.request', ctx.request.body)
  let options = {
    page: Number(page),
    size: Number(size)
  }
  let { data, totleCount } = await userHelper.findAllUsersPage(options)
  if ( !totleCount ) {
    ctx.body = {
      success: false,
      data:[]
    }
  } else {
    ctx.body = {
      success: true,
      data:{
        options: {...options, totleCount},
        userData: data
      }
    }
  }
}

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
  deleteUser,
  usersPage
}
