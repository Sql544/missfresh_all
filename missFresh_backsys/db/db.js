const mongoose = require('mongoose')

const options = {
  useMongoClient: true
}
mongoose.connect('mongodb://localhost:27017/missfresh',options)
	.then((db) => {console.log('数据库连接成功~')})
  	.catch((err) => {console.log(err)})
module.exports = mongoose