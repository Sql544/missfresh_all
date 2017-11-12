const ImagesModel = require('../db/images.js')
const { getImagesMsg } = require('../utils/backparams.js')
const addMember = function(req,res){
	const {position,sku,imageid} = req.body;
	ImagesModel.findOne({imageid}).then((result)=>{
		if(!result){
			const NewMember = new ImagesModel({
				position,
				sku,
				imageid,
				path : req.file.filename&&req.file ? req.file.filename : ''
			})
			NewMember.save().then(()=>{
				res.json({success:true,img_load:req.file.filename})
			})
		}else{
			res.json({success:false})
		}
	})
}


const UpdateMember = function(req,res){
	const {index , sku,imageid,position} = req.body;
	const UpdateMember = {
		sku,
		imageid,
		position
	}
	if(req.file!=undefined){
		UpdateMember.icon = req.file.filename
	}
	ImagesModel.update({sku : index},{$set:UpdateMember}).then((result)=>{
		res.json({success:true,img_load:req.file.filename})
	})
}

const DeleteMember = function(req,res){
	const {sku} = req.body;
	ImagesModel.remove({sku}).then((result)=>{
		res.json({success:true})
	})
}

const getMsg = function(req,res){
	ImagesModel.find({},{_id:0}).then((result)=>{
		res.json(getImagesMsg(result))
	})
}


const SearchMsg = function(req,res){
	const {index,message} = req.body;
	switch(index){
		case 'imageid' : ImagesModel.find({imageid : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getImagesMsg(result));
		});break;
		case 'position' : ImagesModel.find({position : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getImagesMsg(result));
		});break;
		case 'sku' : ImagesModel.find({sku : eval('/'+message+'/')},{_id:0}).then((result)=>{
			res.json(getImagesMsg(result));
		});break;
	}
}

module.exports = { addMember,UpdateMember,DeleteMember,getMsg,SearchMsg }
