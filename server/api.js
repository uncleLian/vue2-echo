const models = require('./db')
const express = require('express')
const router = express.Router()

/************** 创建(create) 读取(get) 更新(update) 删除(delete) 查询(find)**************/


router.get('/api/music', (req, res) => {
    models.Info.find({singer:'王力宏'}, (err, data) => {
        console.log(data)
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

module.exports = router