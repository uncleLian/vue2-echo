const mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost:27017/music', { useMongoClient: true }, (err) => {
    if (err) {
        console.log("数据库连接失败！");
    } else {
        console.log("数据库连接成功！");
    }
})

const infoSchema = mongoose.Schema({
	_id: String,
    song: String,
    singer: String
})


const Models = {
    Info: mongoose.model('info', infoSchema, 'info')
}

module.exports = Models