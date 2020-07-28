const express = require('express')
const mongoose = require('mongoose')

module.exports = app => {
  const router = express.Router({
    nergeParams: true
  })
  // 公共CRUD 中间件
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = mongoose.model(`${modelName}`) // 挂载模型名称
    next()
  }, router)

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 查询资源
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName == 'Category') { // 关联
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 单个资源详情
  router.get('/:id', async (req, res) => {
    const model = req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ success: true })
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    res.send({ isLogin: true })
  })
}