const db = require('./db.js')

const Goods = new db.Schema({
	type : {
		type : String
	},
	position : {
		type : String
	},
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
	promote_tag : {
		type : String
	},
	subtitle : {
		type : String
	},
	cart_img : {
		type : String
	},
	sku : {
		type : String,
		required : true
	},
	promote_tag : {
		type : String,
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
	product_Message : {
		country : {
			type : String
		},
		sales_volume : {//已售
			type : Number
		},
		delivery_mode_name : {//多久到达
			type : String
		},
		share_product_text : {//已经有多少人分享了这件商品
			type : String
		},
		description : {//商品描述
			type : Array
		},
		unit : {//规格
			type : String
		},
		weight : {//重量
			type : String
		},
		pack : {//包装
			type : String
		},
		storage_time : {//保质期
			type : String
		},
		storage_method : {//存储方式
			type : String
		}
	}
})

var GoodsModel = db.model('goods',Goods);

module.exports = GoodsModel
