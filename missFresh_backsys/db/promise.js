const db = require('./db.js')

const Promise = new db.Schema({
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
	}
})

var PromiseModel = db.model('promises',Promise,'promises');

module.exports = PromiseModel;
