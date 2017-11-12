const db = require('./db.js')

const Carts = new db.Schema({
	vip_price_pro : {
		price_up : {
			name : {
				type : String
			},
			price : {
				type : Number
			}
		},
		price_down : {
			name : {
				type : String
			},
			price : {
				type : Number
			}
		}
	},
	sku : {
		type : String,
		required : true
	},
	name : {
		type : String
	},
	num : {
		type : Number
	},
	product_tagName : {
		type : String
	},
	promote_tag:{
		type : String
	},
	belongs : {
		type : String
	}
})

var CartsModel = db.model('carts',Carts);

module.exports = CartsModel
