const getparams = function(data){
	return {
		msg : "登录成功",
		type : data
	}
}
const getuserMsg = function(data){
	return {
		msg : "查询成功",
		data : data
	}
}

const getSearchIconMsg = function(data){
	return {
		msg : "查询成功",
		category_list : data
	}
}
const getPromiseMsg = function(data){
	return {
		msg : "查询成功",
		products_list : data
	}
}

const getVipCardMsg = function(data){
	return {
		msg : "查询成功",
		category_areas : data
	}
}

const getBannersMsg = function(data){
	return {
		msg : "查询成功",
		banner : data
	}
}

const getProductsMsg = function(data){
	return {
		msg : "查询成功",
		products : data
	}
}

const getImagesMsg = function(data){
	return {
		msg : "查询成功",
		images : data
	}
}

module.exports = { getparams,getuserMsg,getSearchIconMsg,getPromiseMsg,getVipCardMsg,getBannersMsg,getProductsMsg,getImagesMsg }
