const db = require('./db.js')

const VipCard = new db.Schema({
	name : {
		type : String,
		required : true
	},
	icon : {
		type : String,
		required : true
	},
	target : {
		type : String,
		required : true
	},
	position : {
		type : String,
		required : true
	},
	type : {
		type : String,
		required : true
	}
})

var VipCardModel = db.model('vipcards',VipCard,'vipcards');

module.exports = VipCardModel;
