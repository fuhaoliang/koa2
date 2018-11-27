const mongoose = require('mongoose')
const User = require('../models/user')

const findAllUsersPage = async ({ page, size }) => {
  try {
    let totleCount = await User.count() // 总数据
    let data = await User.find({}).limit(size).skip((page - 1) * size)
    return {
      totleCount,
      data
    }
  } catch (err) {
    console.info('findAllUsersPage', err)
    return {}
  }
}

/**
 * 查看所以用户
 * @return {[type]} [res]
 */
const findAllUsers = async () => {
  try {
    let query = await User.find({})
    return query
  } catch (err) {
    return []
  }
}

/**
 *删除用户
 * @param {*} { userID }
 * @returns
 */
const deleteUser = async ({ _id }) => {
  let flag = false
  try {
    await User.remove({_id})
    flag = true
  } catch (err) {
    flag = false
  }
  return flag
}

module.exports = {
  findAllUsers,
  deleteUser,
  findAllUsersPage
}