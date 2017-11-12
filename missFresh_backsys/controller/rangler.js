const RanglerModel = require('../db/rangler.js')
const { getSearchIconMsg,getBannersMsg } = require('../utils/backparams.js')

const addMember = function(req,res){
	const {name,target,position} = req.body;
	const icon = (req.file.filename&&req.file ? req.file.filename : '')
	RanglerModel.findOne({name}).then((result)=>{
		if(!result){
			const newIcon = new RanglerModel({
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
	RanglerModel.update({name : index},{$set:UpdateMember}).then((result)=>{
		res.json({success:true,img_load:req.file.filename})
	})
}

const DeleteMember = function(req,res){
	const {name} = req.body;
	RanglerModel.remove({name}).then((result)=>{
		res.json({success:true})
	})
}

const getMsg = function(req,res){
	RanglerModel.find({},{_id:0}).then((result)=>{
		res.json(getBannersMsg(result))
	})
}


const SearchMsg = function(req,res){
	const {index,message} = req.body;
	switch(index){
		case 'name' : RanglerModel.find({name : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getBannersMsg(result));
		});break;
		case 'position' : RanglerModel.find({position : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getBannersMsg(result));
		});break;
		case 'target' : RanglerModel.find({target : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getBannersMsg(result));
		});break;
	}
}

module.exports = { addMember,UpdateMember,DeleteMember,getMsg,SearchMsg }
