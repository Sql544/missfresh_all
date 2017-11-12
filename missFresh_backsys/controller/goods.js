const GoodsModel = require('../db/goods.js')
const { getProductsMsg } = require('../utils/backparams.js')
const addMember = function(req,res){
	const {type,position,price_up,price_down,subtitle,sku,name,num,product_tagName,sales_volume,country,delivery_mode_name,share_product_text,description,unit,weight,pack,storage_time,storage_method} = req.body;
	const vip_price_pro = {
		price_up : {
			name : '市场价',
			price : price_up
		},
		price_down : {
			name : '商城价',
			price : price_down
		}
	}
	const product_Message = {
		sales_volume,
		country,
		delivery_mode_name,
		unit,
		weight,
		pack,
		storage_time,
		storage_method,
		share_product_text,
		description : description.split(',')
	}
	var newMember = new GoodsModel({
		type,
		position,
		vip_price_pro,
		subtitle,
		sku,
		name,
		num,
		promote_tag : req.file.filename && req.file ? req.file.filename : '',
		product_tagName,
		product_Message
	})
	GoodsModel.findOne({sku}).then((result)=>{
		if(!result){
			newMember.save().then((success)=>{
				res.json({success:true,img_load:req.file.filename});
			})
		}
	})
}

const getMsg = function(req,res){
	GoodsModel.find({},{_id:0}).then((result)=>{
		res.json(getProductsMsg(result))
	})
}

const UpdateMember = function(req,res){
	const {index,type,position,price_up,price_down,subtitle,sku,name,num,product_tagName,sales_volume,country,delivery_mode_name,share_product_text,description,unit,weight,pack,storage_time,storage_method} = req.body;
	weight = weight.slice(0,-1);
	storage_time = storage_time.slice(0,-1);
	const vip_price_pro = {
		price_up : {
			name : '市场价',
			price : price_up
		},
		price_down : {
			name : '商城价',
			price : price_down
		}
	}
	const product_Message = {
		sales_volume,
		country,
		delivery_mode_name,
		unit,
		weight,
		pack,
		storage_time,
		storage_method,
		share_product_text,
		description : description.split(',')
	}
	var newMember = {
		type,
		position,
		vip_price_pro,
		subtitle,
		sku,
		name,
		num,
		product_tagName,
		product_Message
	}
	if(req.file!=undefined){
		newMember.promote_tag = req.file.filename
	}
	console.log(newMember);
	GoodsModel.update({sku : index},{$set:newMember}).then((result)=>{
		res.json({success:true,img_load:req.file.filename})
	})
}
const DeleteMember = function(req,res){
	const {sku} = req.body;
	GoodsModel.remove({sku}).then((result)=>{
		res.json({success:true})
	})
}

const SearchMsg = function(req,res){
	const { index, message , range} = req.body;
	if(range.floorrange==''){
		range.floorrange = 0;
	}
	if(range.ceilrange==''){
		range.ceilrange = 9999999999;
	}
	switch(index){
		case 'type' : GoodsModel.find({type : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'position' : GoodsModel.find({position : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'price_up' : GoodsModel.find({'vip_price_pro.price_up.price' : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'price_down' : GoodsModel.find({'vip_price_pro.price_down.price' : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'subtitle' : GoodsModel.find({subtitle : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'sku' : GoodsModel.find({sku : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'name' : GoodsModel.find({sku : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'num' : GoodsModel.find({num : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'product_tagName' : GoodsModel.find({product_tagName : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'sales_volume' : GoodsModel.find({'product_Message.sales_volume' : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'country' : GoodsModel.find({'product_Message.country' : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'delivery_mode_name' : GoodsModel.find({'product_Message.delivery_mode_name' : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'unit' : GoodsModel.find({'product_Message.unit' : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'weight' : GoodsModel.find({'product_Message.weight' : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'pack' : GoodsModel.find({'product_Message.pack' : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'storage_time' : GoodsModel.find({'product_Message.storage_time' : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'storage_method' : GoodsModel.find({'product_Message.storage_method' : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'share_product_text' : GoodsModel.find({'product_Message.share_product_text' : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'description' : GoodsModel.find({'product_Message.description' : {$all : message.split(",")}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
	}
}
module.exports = { addMember,getMsg,UpdateMember,DeleteMember,SearchMsg }
