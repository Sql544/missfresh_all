const db = require('./db.js')

var loginSchema = new db.Schema({
	username : {
		type : String                                                    
	},
	password : {
		type : String
	},
	telephone : {
		type : String
	},
	money : {
		type : Number
	},
	score : {
		type : Number
	},
	type : {
		type : String
	}
})

var LoginModel = db.model("login",loginSchema,"login");

module.exports = LoginModel;