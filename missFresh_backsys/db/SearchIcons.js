const db = require('./db.js')

const SearchIcon = new db.Schema({
	name : {
		type : String,
		required : true
	},
	icon : {
		type : String,
		required : true
	}
})

var SearchIconModel = db.model('searchicons',SearchIcon);

module.exports = SearchIconModel;
