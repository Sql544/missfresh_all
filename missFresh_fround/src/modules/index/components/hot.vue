<template>
	<div>
		<div class="load_img" v-if="isloading"><img src="/media/images/loading-gif.gif" /></div>
		<div v-if="!isloading">
			<mt-loadmore :bottomDistance="0" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomAllLoaded="false" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
				<div slot="top" class="mint-loadmore-top">
					<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
			      	<img src="/media/images/loading-gif.gif" width="120" height="40"/>
			      	<p>优质生鲜 两小时到</p>
			      </span>
					<span v-show="topStatus === 'loading'">
			      	<img src="/media/images/loading-gif.gif" width="120" height="40"/>
			      	<p>优质生鲜 两小时到</p>
			      </span>
				</div>
				<div class="banner">
					<mt-swipe :auto="4000">
						<mt-swipe-item v-for="(value,i) in imgs" :key="i"><img :src="'http://localhost:4000/static/upload/'+value.icon" /></mt-swipe-item>
					</mt-swipe>
				</div>
				<div class="promise">
					<ul>
						<li v-for="(value,i) in brands" :key="i"><img :src="'http://localhost:4000/static/upload/'+value.icon" />{{value.name}}</li>
					</ul>
				</div>
				<div class="cards">
					<section>
						<div>
							<img :src="'http://localhost:4000/static/upload/'+card_left" />
						</div>
						<div>
							<div>
								<img :src="'http://localhost:4000/static/upload/'+card_right_top" />
							</div>
							<div>
								<div>
									<img :src="'http://localhost:4000/static/upload/'+card_right_bottom_left" />
								</div>
								<div>
									<img :src="'http://localhost:4000/static/upload/'+card_right_bottom_right" />
								</div>
							</div>
						</div>
					</section>
				</div>
				<div class="goods">
					<div class="title">
						<span>今日特卖</span>
					</div>
					<div class="goods_list">
						<ul>
							<!--<li v-for="(goods_list,i) in goods_lists" v-if="(goods_list.buy_permission===0)" @click="gotodetail(goods_list.sku)">-->
							<li v-for="(goods_list,i) in goods_lists" @click="gotodetail(goods_list.sku)">
								<div class="li_container">
									<div class="img_left">
										<img :src="'http://localhost:4000/static/upload/'+goods_list.promote_tag" />
										<img src="http://localhost:4000/static/upload/img_20170605114049455.png" />
									</div>
									<div class="message_right">
										<div class="message_title">
											{{goods_list.name}}
										</div>
										<div class="message_info">
											{{goods_list.subtitle}}
										</div>
										<div class="message_des">
											<!--<span v-for="value in goods_list.product_tags">{{value.name}}</span>-->
											<span>{{goods_list.product_tagName}}</span>
										</div>
										<div class="message_highprice">
											<span>可用券价 ¥{{(goods_list.vip_price_pro.price_up.price)/100}}</span>
										</div>
										<div class="message_lowprice">
											<span>商城价 <span>¥&nbsp;</span><span>&nbsp;{{(goods_list.vip_price_pro.price_down.price)/100}}</span></span>
										</div>
										<div class="message_cart">
											<!--<img :src="goods_list.cart_image" @click="gotocart($event,goods_list)"/>-->
											<img src="http://localhost:4000/static/upload/img_20170425134548759.png" @click="gotocart($event,goods_list)" />
										</div>
									</div>
								</div>
							</li>
							<!--<div class="sell_out" v-else-if="goods_list.code=='sell-out'">
								<span>{{goods_list.name}}</span><span>{{goods_list.second_title}}</span>
							</div>
							<div class="img_container" v-else>
								<img v-for="(value,i) in goods_list.banner" :src="value.path" :key="i"/>
							</div>-->
						</ul>
					</div>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">
			      </span>
					<span v-show="bottomStatus === 'loading'">
			      </span>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>
<script>
	import Vue from "vue"
	import { Swipe, SwipeItem } from "mint-ui"
	import { Loadmore } from "mint-ui"
	import { Lazyload } from 'mint-ui';
	import "mint-ui/lib/style.css"
	import store from "../scripts/vuex/store.js"
	import axios from "axios"
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	Vue.use(Lazyload);
	export default {
		data() {
			return {
				imgs: [],
				brands: [],
				card_left: {},
				card_right_top: {},
				card_right_bottom_left: {},
				card_right_bottom_right: {},
				goods_lists: [],
				godds_lists_all: [],
				page_num: 7,
				topStatus: '',
				bottomStatus: '',
				allLoaded: false,
				isloading: true
			}
		},
		mounted() {
			var that = this;
			axios({
				url: '/api/rangler/search',
				method: 'post',
				data: {
					index: 'position',
					message: '首页'
				}
			}).then((res) => {
				this.imgs = res.data.banner;
				this.isloading = false;
			})
			axios({
				url: '/api/promise/getmsg',
				method: 'get',
			}).then((res) => {
				this.brands = res.data.products_list;
			})
			axios({
				url: '/api/vipcard/getmsg',
				method: 'get',
			}).then((res) => {
				this.card_left = res.data.category_areas[0].icon;
				this.card_right_top = res.data.category_areas[1].icon;
				this.card_right_bottom_left = res.data.category_areas[2].icon;
				this.card_right_bottom_right = res.data.category_areas[3].icon;
			})
			axios({
				url: '/api/goods/search',
				method: 'post',
				data: {
					index: 'position',
					message: '首页',
					range: ''
				}
			}).then((res) => {
				this.goods_lists_all = res.data.products;
				this.goods_lists = this.goods_lists_all.slice(0, 7);
				console.log(this.goods_lists);
			})
			//			axios({
			//				url : '/api/images/search',
			//				method : 'post',
			//				data : {
			//					index : 'sku',
			//					message : '首页'
			//				}
			//			}).then((res)=>{
			//				this.goods_lists_all = res.data.products;
			//				this.goods_lists = this.goods_lists_all.slice(0,7);
			//				console.log(this.goods_lists);
			//			})
			//			axios({
			//				url : '/api/v2/product/home/index?device_id=3d48c219f6d8d2386530b0b414bfb6cb&env=web&fromSource=zhuye&platform=web&uuid=3d48c219f6d8d2386530b0b414bfb6cb&version=3.8.0.1',
			//				method : 'post',
			//				headers : {
			//					"Content-Type" : "application/json;charset=UTF-8",
			//					"x-region" : '{"station_code":"","address_code":"110105"}',
			//					"X-Tingyun-Id" : "Q1KLryMuSto;r=75130083",
			//					"version" : '3.8.0.1',
			//					'platform':'web'
			//				},
			//				data : {
			//					lat : ""
			//				}
			//			})
			//			.then(function(response){
			//				that.imgs =  response.data.product_list.banner;
			//				that.brands = response.data.product_list.brands;
			//				that.card_left = response.data.product_list.category_areas[0];
			//				that.card_right_top = response.data.product_list.category_areas[1];
			//				that.card_right_bottom_left= response.data.product_list.category_areas[2];
			//				that.card_right_bottom_right= response.data.product_list.category_areas[3];
			//				that.goods_lists_all = response.data.product_list.products;
			//				that.goods_lists = that.goods_lists_all.slice(1,7);
			//				that.isloading = false;
			//			})
			
		},
		methods: {
			loadTop() {
				axios({
					url: '/api/goods/search',
					method: 'post',
					data: {
						index: 'position',
						message: '首页',
						range: ''
					}
				}).then((res) => {
					this.goods_lists_all = res.data.products;
//					this.goods_lists = this.goods_lists_all.slice(0, 7);
					this.$refs.loadmore.onTopLoaded();
				})

			},
			loadBottom() {
								this.page_num += 7 ;
				this.goods_lists = this.goods_lists_all.slice(0, this.page_num);
				this.allLoaded = true;
				this.$refs.loadmore.onBottomLoaded();
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			gotodetail(params) {
				this.$router.push({
					name: 'detail',
					query: {
						sku: params
					}
				});
			},
			gotocart(event, obj) {
				var ws = new WebSocket('ws://localhost:9000/ws');
				ws.onopen=function(){ 
					ws.send(111)
				}
//				var ws = new WebSocket('ws://localhost:4000/ws'); 
//				ws.onopen=function(){  
//		  		ws.send('add to cart');
//		  	}; 
				event.cancelBubble = true;
				axios({
					url: '/api/carts/search',
					method: 'post',
					data: {
						index: 'skuAndbelongs',
						message: {
							sku: obj.sku,
							belongs: store.state.Loginuser
						},
						range: ''
					}
				}).then((res) => {
					if(res.data.products.length != 0) {
						console.log(res.data.products)
						axios({
							url: '/api/carts/updatemember',
							method: 'post',
							data: {
								index: res.data.products[0].sku,
								index1: res.data.products[0].belongs,
								num: res.data.products[0].num + 1,
								price_up: res.data.products[0].vip_price_pro.price_up.price,
								price_down: res.data.products[0].vip_price_pro.price_down.price,
								sku: res.data.products[0].sku,
								name: res.data.products[0].name,
								product_tagName: res.data.products[0].product_tagName,
								belongs: store.state.Loginuser
							}
						}).then((res) => {
							ws.send('gotocart');
						})
					} else {
						axios({
							url: '/api/carts/addtocarts',
							method: 'post',
							data: {
								num: 1,
								price_up: obj.vip_price_pro.price_up.price,
								price_down: obj.vip_price_pro.price_down.price,
								sku: obj.sku,
								name: obj.name,
								product_tagName: obj.product_tagName,
								promote_tag: obj.promote_tag,
								belongs: store.state.Loginuser
							}
						}).then((res) => {
								ws.send('gotocart');
						})
					}
				})
				store.commit('addtocarts', obj);
			}
		}
	}
</script>

<style lang="scss">
	@import "../styles/hot.scss";
	image[lazy=loading] {
		width: 40px;
		height: 300px;
		margin: auto;
	}
</style>