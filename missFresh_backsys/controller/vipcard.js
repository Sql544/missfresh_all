const VipCardModel = require('../db/vipcard.js')
const { getSearchIconMsg,getVipCardMsg } = require('../utils/backparams.js')

const addMember = function(req,res){
	const {name,target,position,type} = req.body;
	const icon = (req.file.filename&&req.file ? req.file.filename : '')
	VipCardModel.findOne({name}).then((result)=>{
		if(!result){
			const newIcon = new VipCardModel({
				name,
				target,
				position,
				type,
				icon
			});
			newIcon.save().then((result)=>{
				res.json({success:true,img_load:req.file.filename})
			})
		}else{
			res.json({success:false})
		}
	})
}

const UpdateMember = function(req,res){
	const {index , name,target,position,type} = req.body;
	const UpdateMember = {
		name,
		target,
		position,
		type
	}
	if(req.file!=undefined){
		UpdateMember.icon = req.file.filename
	}
	VipCardModel.update({name : index},{$set:UpdateMember}).then((result)=>{
		res.json({success:true,img_load:req.file.filename})
	})
}

const DeleteMember = function(req,res){
	const {name} = req.body;
	VipCardModel.remove({name}).then((result)=>{
		res.json({success:true})
	})
}

const getMsg = function(req,res){
	VipCardModel.find({},{_id:0}).then((result)=>{
		res.json(getVipCardMsg(result))
	})
}


const SearchMsg = function(req,res){
	const {index,message} = req.body;
	switch(index){
		case 'name' : VipCardModel.find({name : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getVipCardMsg(result));
		});break;
		case 'position' : VipCardModel.find({position : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getVipCardMsg(result));
		});break;
		case 'target' : VipCardModel.find({target : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getVipCardMsg(result));
		});break;
		case 'type' : VipCardModel.find({type : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getVipCardMsg(result));
		});break;
	}
}

module.exports = { addMember,UpdateMember,DeleteMember,getMsg,SearchMsg }
