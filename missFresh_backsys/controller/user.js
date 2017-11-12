const LoginModel = require('../db/users.js')
const { getparams,getuserMsg } = require('../utils/backparams.js')
const bcrypt = require('bcrypt')
const Login = function(req,res){
//	const password = "111"
//	bcrypt.hash(password,10).then(function(password){
//		const newLogin = new LoginModel({
//			username : "lyl",
//			password : password ,
//			telephone : 15010376054 ,
//			money : 777,
//			score : 777,
//			type : "2"
//		});
//		const newLogin2 = new LoginModel({
//			username : "hyx",
//			password : password ,
//			telephone : 15735104481 ,
//			money : 888,
//			score : 999,
//			type : "2"
//		});
//		const newLogin3 = new LoginModel({
//			username : "yhn",
//			password : password ,
//			telephone : 18222851317 ,
//			money : 555,
//			score : 555,
//			type : "0"
//		});
//		newLogin.save();
//		newLogin2.save();
//		newLogin3.save();
//	})
	LoginModel.find({username : req.body.username})
		.then(function(result){
			if(result.length>0){
				bcrypt.compare(req.body.password, result[0].password).then(function()
				{
					req.session.username = req.body.username
					res.json(getparams(result[0].type));
				})
			}else{
				res.json({msg:"登录失败"})
			}
		})
}
const PeopleMsg = function(req,res){
	LoginModel.find({type : req.body.type},{username:1,telephone:1,money:1,score:1,type:1,_id:0}).then((result)=>{
		res.json(getuserMsg(result))
	})
}

const LoginStatus = function(req,res){
	LoginModel.find({username : req.session.username},{type:1,_id:0}).then((result)=>{
		if(result.length>0){
			res.json({username : req.session.username,type:result[0].type})
		}else{
			res.json({success:'nologin'})
		}
		
	})
}

const Logout = function(req,res){
	req.session.username = '';
	res.json({success:true});
}

const addMemer = function(req,res){
	const {username , password ,telephone , money , score , type } = req.body;
	LoginModel.find({username}).then((findresult)=>{
		if(findresult.length==0){
			bcrypt.hash(password,10).then(function(password){
				const newLogin = new LoginModel({
					username ,
					password ,
					telephone ,
					money ,
					score ,
					type 
				});
				newLogin.save().then((result)=>{
					res.json({success:true})
				})
			})
		}else{
			res.json({success:false})
		}
	})
}

const deleteMember = function(req,res){
	const {username} = req.body;
	LoginModel.remove({username}).then((result)=>{
		res.json({success:true})
	})
}

const updateMemberMsg = function(req,res){
	const{index,username,password,telephone,money,score} = req.body;
	const UpdateMember = {
		username ,
		telephone,
		money,
		score
	}
	if(password){
		bcrypt.hash(password,10).then(function(password){
			UpdateMember.password = password;
			LoginModel.update({username : index},{$set:UpdateMember}).then((result)=>{
				res.json({success:true})
			})
		})
	}else{
		LoginModel.update({username : index},{$set:UpdateMember}).then((result)=>{
			res.json({success:true})
		})
	}
}

const searchUser = function(req,res){
	const { index , message ,type ,range} = req.body;
	if(range.floorrange==''){
		range.floorrange = 0;
	}
	if(range.ceilrange==''){
		range.ceilrange = 9999999999;
	}
	switch(index){
		case 'username' : LoginModel.find({username : eval('/'+message+'/'),type : type},{_id:0,password:0}).then((result)=>{
			res.json(getuserMsg(result));
		});break;
		case 'telephone' : LoginModel.find({telephone : eval('/'+message+'/'),type : type},{_id:0,password:0}).then((result)=>{
			res.json(getuserMsg(result));
		});break;
		case 'money' : LoginModel.find({money : {$gte:range.floorrange,$lte:range.ceilrange},type : type},{_id:0,password:0}).then((result)=>{
			res.json(getuserMsg(result));
		});break;
		case 'score' : LoginModel.find({score : {$gte:range.floorrange,$lte:range.ceilrange},type : type},{_id:0,password:0}).then((result)=>{
			res.json(getuserMsg(result));
		});break;
	}
}

module.exports = {Login,PeopleMsg,LoginStatus,addMemer,deleteMember,updateMemberMsg,Logout,searchUser}
