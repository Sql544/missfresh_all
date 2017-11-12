<template lang="html">
	<div class="goods" v-if="showall" >
		<header>
			<div class="back"v-on:click="goBack">
				<span class="iconfont">&#xe7ed;</span>
			</div>
			<ul class="goods-navbar">
				<li class="detail active">商品详情</li>
				<li class="quality">安心保障</li>
			</ul>
			<div class="share" v-on:click="showShareBox" >
				<span class="iconfont">&#xe7d4;</span>
			</div>
		</header>
		<section>
			<div class="goods-banner">
				<mt-swipe :auto="3000">
					<mt-swipe-item v-for="(item,i) in rangler">
						<img :src="'http://localhost:4000/static/upload/'+ item.icon">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="detail-info">
				<div class="title">“{{data.subtitle}}”</div>
				<div class="num">{{data.name}}</div>
				<div class="sale">{{data.vip_price_pro.price_up.name}}￥<span>{{data.vip_price_pro.price_up.price/100}}</span></div>
				<div class="vip">
					<span>{{data.vip_price_pro.price_down.name}}￥<i>{{data.vip_price_pro.price_down.price/100}}</i></span>
					<b>已售{{data.product_Message.sales_volume}}份</b>
				</div>
				<div class="other-info">
					<span>
						<i class="iconfont">&#xe7f3;</i>
						<b>{{data.product_Message.country}}</b>
					</span>
					<span>
						<i class="iconfont">&#xe671;</i>
						<b>{{data.product_Message.delivery_mode_name}}</b>
					</span>
					<span>
						<i class="iconfont">&#xe6d3;</i>
						<b>实付满69包邮</b>
					</span>
				</div>
			</div>
			<div class="present">
				<div class="title">
					<span>
						<img src="http://missfresh-asschool-develop-common.ufile.ucloud.com.cn/img_20170215184830712.png">
						<b>买就送积分，多买多得</b>
						<i class="iconfont">&#xe691;</i>
					</span>
				</div>
				<div class="share01">
					<span>
						<img src="https://j-image.missfresh.cn/img_20171019234117594.png" />
					</span>
					<span>
						{{data.product_Message.share_product_text}}
					</span>
				</div>
				<div class="share02" v-on:click="showShareBox" >
					<span>点击分享</span>
				</div>
			</div>
			<div class="light">
				<div class="light-title">
					<span><img src="//static-as.missfresh.cn/frontend/img/bright-left.png"/></span>
					<span>亮点</span>
					<span><img src="//static-as.missfresh.cn/frontend/img/bright-right.png"/></span>
				</div>
				<ul class="goods-dec">
					<li v-for="(item,i) in data.product_Message.description">{{item}}</li>
				</ul>
			</div>
			<div class="dec-list">
				<div class="title">商品详情</div>
				<ul class="decoration">
					<li>规格：{{data.product_Message.unit}}</li>
					<li>重量：{{data.product_Message.weight}}</li>
					<li>包装：{{data.product_Message.pack}}</li>
					<li>保质期：{{data.product_Message.storage_time}}</li>
					<li>存储方式：{{data.product_Message.storage_method}}</li>
				</ul>
				<ul class="goods-pic">
					<li v-for="(item,i) in images"><img :src="'http://localhost:4000/static/upload/'+item.path"></li>
				</ul>
			</div>
			<div class="safe">
				<div class="safe-title">安心保障</div>
				<div class="safe-pic">
					<img v-for="(item,i) in qc" :src="'http://localhost:4000/static/upload/'+item.path"/>
				</div>
			</div>
			
		</section>
		<footer>
			<div class="shopcar">
				<span class="iconfont">
					&#xe6af;
					<i class="goods_num" v-show="shownum">{{num}}</i>
				</span>
			</div>
			<div class="addToCar" v-on:click="addToCar(data)">
				<span>加入购物车</span>
			</div>
		</footer>
		<share v-if="showShare" :showShare="showShare" @cancelShareBox="changeShare" @showGoToShare="showGotoShare" @shareType="sharetype"></share>
		<gotoshare v-if="gotosharebox" :data="data" @cancelBox="cancelShare" :type="type"></gotoshare>
	</div>
</template>

<script>
	import axios from 'axios';
	import share from "./share.vue";
	import gotoshare from "./goToShare.vue"
	import "mint-ui/lib/style.css";
	import { Swipe, SwipeItem } from 'mint-ui';
	import store from "../../index/scripts/vuex/store.js"
	export default {
		data() {
			return {
				data: {},
				showall:false,
				showShare:false,
				gotosharebox:false,
				type:'',
				num:0,
				shownum:false,
				rangler : [],
				images : [],
				qc : []
			}
		},
		components:{
			share,
			gotoshare
		},
		methods: {
			goBack(){
				this.$router.push({name:"hot"});
			},
			showShareBox(){
				this.showShare=true
			},
			changeShare(){
				this.showShare=false;
			},
			showGotoShare(){
				this.showShare=false;
				this.gotosharebox=true;
			},
			sharetype(type){
				this.type = type
			},
			cancelShare(){
				this.gotosharebox=false
			},
			addToCar(obj){
				this.shownum=true
				this.num++
				axios({
					url : '/api/carts/search',
					method : 'post',
					data : {
						index : 'skuAndbelongs',
						message : { sku : obj.sku , belongs : store.state.Loginuser},
						range : ''
					}
				}).then((res)=>{
					if(res.data.products.length!=0){
						console.log(res.data.products)
						axios({
							url : '/api/carts/updatemember',
							method : 'post',
							data : {
								index : res.data.products[0].sku,
								index1 : res.data.products[0].belongs,
								num : res.data.products[0].num+1,
								price_up : res.data.products[0].vip_price_pro.price_up.price,
								price_down : res.data.products[0].vip_price_pro.price_down.price,
								sku : res.data.products[0].sku,
								name : res.data.products[0].name,
								product_tagName : res.data.products[0].product_tagName,
								belongs : store.state.Loginuser
							}
						}).then((res)=>{
							console.log(res.data);
						})
					}else{
						axios({
							url : '/api/carts/addtocarts',
							method : 'post',
							data : {
								num : 1,
								price_up : obj.vip_price_pro.price_up.price,
								price_down : obj.vip_price_pro.price_down.price,
								sku : obj.sku,
								name : obj.name,
								product_tagName : obj.product_tagName,
								promote_tag : obj.promote_tag,
								belongs : store.state.Loginuser
							}
						}).then((res)=>{
							console.log(res);
						})
					}
				})
	      		store.commit('addtocarts',obj);
			}
		},
		mounted() {
			axios({
				url: '/api/goods/search',
				method: 'post',
				data : {
					index : 'sku',
					message : this.$route.query.sku,
					range : ''
				}
			}).then((result) => {
				this.data = result.data.products[0];
				this.showall = true
				var obj = this.data;
				axios({
					url : '/api/carts/search',
					method : 'post',
					data : {
						index : 'skuAndbelongs',
						message : { sku : obj.sku , belongs : store.state.Loginuser},
						range : ''
					}
				}).then((res)=>{
					console.log(res);
					if(res.data.products.length!=0){
						console.log(111111)
						this.num = res.data.products[0].num;
						this.shownum=true
					}
				})
			})
			axios({
				url: '/api/rangler/search',
				method: 'post',
				data : {
					index : 'position',
					message : this.$route.query.sku,
					range : ''
				}
			}).then((res)=>{
				this.rangler = res.data.banner;
				console.log(this.rangler);
				
			})
			axios({
				url: '/api/images/search',
				method: 'post',
				data : {
					index : 'sku',
					message : this.$route.query.sku,
				}
			}).then((res)=>{
				for(var i in res.data.images){
					if(res.data.images[i].position=='详情'){
						this.images.push(res.data.images[i])
					}
				}
			})
			axios({
				url: '/api/images/search',
				method: 'post',
				data : {
					index : 'sku',
					message : 'qc',
				}
			}).then((res)=>{
				this.qc = res.data.images;
			})
			
		}
	}
</script>

<style lang="scss">
	@import "../../../styles/app.scss";
	@import "../styles/detail-goods.scss";
</style>