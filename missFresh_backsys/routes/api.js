const express = require('express')
const router = express.Router();
const user = require('../controller/user.js')
const upload = require('../utils/loadimg.js')
const SearchIcons = require('../controller/SearchIcons.js')
const Promise = require('../controller/promise.js')
const VipCard = require('../controller/vipcard.js')
const Rangler = require('../controller/rangler.js')
const Goods = require('../controller/goods.js')
const Carts = require('../controller/carts.js')
const Images = require('../controller/images.js')
//定义用户相关的路由
router.post('/users/Login',user.Login)
router.post('/users/getPeopleMsg',user.PeopleMsg)
router.post('/users/addMember',user.addMemer)
router.post('/users/deleteMember',user.deleteMember)
router.post('/users/updateMember',user.updateMemberMsg)
router.post('/users/searchUsers',user.searchUser)
router.get('/users/getLoginStatus',user.LoginStatus)
router.get('/users/Logout',user.Logout)
//定义列表图标相关路由
router.post('/SearchIcons/addmember',upload.single('load_img'),SearchIcons.addMember)
router.post('/SearchIcons/updatemember',upload.single('load_img'),SearchIcons.UpdateMember)
router.post('/SearchIcons/deleteMember',SearchIcons.DeleteMember)
router.post('/SearchIcons/search',SearchIcons.SearchMsg)
router.get('/SearchIcons/getmsg',SearchIcons.getMsg)
//定义产品保证相关路由
router.post('/promise/addmember',upload.single('load_img'),Promise.addMember)
router.post('/promise/updatemember',upload.single('load_img'),Promise.UpdateMember)
router.post('/promise/deleteMember',Promise.DeleteMember)
router.post('/promise/search',Promise.SearchMsg)
router.get('/promise/getmsg',Promise.getMsg)
//定义会员卡相关路由
router.post('/vipcard/addmember',upload.single('load_img'),VipCard.addMember)
router.post('/vipcard/updatemember',upload.single('load_img'),VipCard.UpdateMember)
router.post('/vipcard/deleteMember',VipCard.DeleteMember)
router.post('/vipcard/search',VipCard.SearchMsg)
router.get('/vipcard/getmsg',VipCard.getMsg)
//定义轮播图相关路由
router.post('/rangler/addmember',upload.single('load_img'),Rangler.addMember)
router.post('/rangler/updatemember',upload.single('load_img'),Rangler.UpdateMember)
router.post('/rangler/deleteMember',Rangler.DeleteMember)
router.post('/rangler/search',Rangler.SearchMsg)
router.get('/rangler/getmsg',Rangler.getMsg)
//定义商品相关路由
router.post('/goods/addmember',upload.single('load_img'),Goods.addMember)
router.post('/goods/updatemember',upload.single('load_img'),Goods.UpdateMember)
router.post('/goods/deleteMember',Goods.DeleteMember)
router.post('/goods/search',Goods.SearchMsg)
router.get('/goods/getmsg',Goods.getMsg)
//定义购物车相关路由
router.post('/carts/addmember',upload.single('load_img'),Carts.addMember)
router.post('/carts/addtocarts',Carts.addtoCarts)
router.post('/carts/updatemember',upload.single('load_img'),Carts.UpdateMember)
router.post('/carts/deleteMember',Carts.DeleteMember)
router.post('/carts/search',Carts.SearchMsg)
router.get('/carts/getmsg',Carts.getMsg)
//定义图片相关路由
router.post('/images/addmember',upload.single('load_img'),Images.addMember)
router.post('/images/updatemember',upload.single('load_img'),Images.UpdateMember)
router.post('/images/deleteMember',Images.DeleteMember)
router.post('/images/search',Images.SearchMsg)
router.get('/images/getmsg',Images.getMsg)
module.exports = router;