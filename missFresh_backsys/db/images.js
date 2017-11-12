const db = require('./db.js')

const Images = new db.Schema({
	position : {
		type : String
	},
	path : {
		type : String
	},
	sku : {
		type : String
	},
	imageid:{
		type : String
	}
})



const ImagesModel = db.model('images',Images,'images');

module.exports = ImagesModel
