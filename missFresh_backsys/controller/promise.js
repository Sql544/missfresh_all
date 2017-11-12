const PromiseModel = require('../db/promise.js')
const { getSearchIconMsg,getPromiseMsg } = require('../utils/backparams.js')

const addMember = function(req,res){
	const {name,target,position} = req.body;
	const icon = (req.file.filename&&req.file ? req.file.filename : '')
	PromiseModel.findOne({name}).then((result)=>{
		if(!result){
			const newIcon = new PromiseModel({
				name,
				target,
				position,
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
	const {index , name,target,position} = req.body;
	const UpdateMember = {
		name,
		target,
		position
	}
	if(req.file!=undefined){
		UpdateMember.icon = req.file.filename
	}
	PromiseModel.update({name : index},{$set:UpdateMember}).then((result)=>{
		res.json({success:true,img_load:req.file.filename})
	})
}

const DeleteMember = function(req,res){
	const {name} = req.body;
	PromiseModel.remove({name}).then((result)=>{
		res.json({success:true})
	})
}

const getMsg = function(req,res){
	PromiseModel.find({},{_id:0}).then((result)=>{
		res.json(getPromiseMsg(result))
	})
}


const SearchMsg = function(req,res){
	const {index,message} = req.body;
	switch(index){
		case 'name' : PromiseModel.find({name : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getPromiseMsg(result));
		});break;
		case 'position' : PromiseModel.find({position : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getPromiseMsg(result));
		});break;
		case 'target' : PromiseModel.find({target : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getPromiseMsg(result));
		});break;
	}
}

module.exports = { addMember,UpdateMember,DeleteMember,getMsg,SearchMsg }
