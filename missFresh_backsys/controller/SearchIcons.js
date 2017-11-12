const IconsModel = require('../db/SearchIcons.js')
const { getSearchIconMsg } = require('../utils/backparams.js')

const addMember = function(req,res){
	const name = req.body.name;
	const icon = (req.file.filename&&req.file ? req.file.filename : '')
	IconsModel.findOne({name}).then((result)=>{
		if(!result){
			const newIcon = new IconsModel({
				name,
				icon
			});
			console.log(newIcon);
			newIcon.save().then((result)=>{
				res.json({success:true,img_load:req.file.filename})
			})
		}else{
			res.json({success:false})
		}
	})
}


const getMsg = function(req,res){
	IconsModel.find({},{_id:0}).then((result)=>{
		res.json(getSearchIconMsg(result))
	})
}

const UpdateMember = function(req,res){
	const {index , name} = req.body;
	const UpdateMember = {
		name
	}
	if(req.file!=undefined){
		UpdateMember.icon = req.file.filename
	}
	IconsModel.update({name : index},{$set:UpdateMember}).then((result)=>{
		res.json({success:true,img_load:req.file.filename})
	})
}

const DeleteMember = function(req,res){
	const {name} = req.body;
	IconsModel.remove({name}).then((result)=>{
		res.json({success:true})
	})
}

const SearchMsg = function(req,res){
	const {index,message} = req.body;
	switch(index){
		case 'name' : IconsModel.find({name : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getSearchIconMsg(result));
		});break;
		case 'icon' : IconsModel.find({icon : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getSearchIconMsg(result));
		});break;
	}
}
module.exports = { addMember,getMsg,UpdateMember,DeleteMember,SearchMsg }
