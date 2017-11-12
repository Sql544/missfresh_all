const CartsModel = require('../db/carts.js')
const { getProductsMsg } = require('../utils/backparams.js')
const addMember = function(req,res){
	const {price_up,price_down,sku,name,num,product_tagName,belongs} = req.body;
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
	var newMember = new CartsModel({
		vip_price_pro,
		sku,
		name,
		num,
		promote_tag : req.file.filename && req.file ? req.file.filename : '',
		product_tagName,
		belongs
	})
	CartsModel.findOne({sku,belongs}).then((result)=>{
		if(!result){
			newMember.save().then((success)=>{
				res.json({success:true,img_load:req.file.filename});
			})
		}
	})
}

const getMsg = function(req,res){
	CartsModel.find({},{_id:0}).then((result)=>{
		res.json(getProductsMsg(result))
	})
}

const UpdateMember = function(req,res){
	const {index,index1,price_up,price_down,sku,name,num,product_tagName,belongs} = req.body;
	const vip_price_pro = {
		price_up : {
			name : '市场价',
			price : Number(price_up)
		},
		price_down : {
			name : '商城价',
			price : Number(price_down)
		}
	}
	var newMember = {
		vip_price_pro,
		sku,
		name,
		num,
		product_tagName,
		belongs
	}
	console.log(num);
	if(req.file!=undefined){
		newMember.promote_tag = req.file.filename
	}
	CartsModel.update({sku : index , belongs : index1},{$set:newMember}).then((result)=>{
		console.log(result);
		if(req.file!=undefined){
			res.json({success:true,img_load:req.file.filename})
		}else{
			res.json({success:true})
		}
	})
}
const DeleteMember = function(req,res){
	const {sku,belongs} = req.body;
	CartsModel.remove({sku,belongs}).then((result)=>{
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
		case 'price_up' : CartsModel.find({'vip_price_pro.price_up.price' : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'price_down' : CartsModel.find({'vip_price_pro.price_down.price' : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'sku' : CartsModel.find({sku : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'belongs' : CartsModel.find({belongs : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'name' : CartsModel.find({sku : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'num' : CartsModel.find({num : {$gte:range.floorrange,$lte:range.ceilrange}},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'product_tagName' : CartsModel.find({product_tagName : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
		case 'skuAndbelongs' : CartsModel.find({sku : message.sku,belongs:message.belongs},{_id:0}).then((result)=>{
			res.json(getProductsMsg(result));
		});break;
	}
}

const addtoCarts = function(req,res){
	const {price_up,price_down,sku,name,num,product_tagName,belongs,promote_tag} = req.body;
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
	var newMember = new CartsModel({
		vip_price_pro,
		sku,
		name,
		num,
		promote_tag,
		product_tagName,
		belongs
	})
	newMember.save().then((success)=>{
		res.json({success:true});
	})
}


module.exports = { addMember,getMsg,UpdateMember,DeleteMember,SearchMsg,addtoCarts }
