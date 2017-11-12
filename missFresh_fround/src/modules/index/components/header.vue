<template>
	<div>
		<ul>
			<li v-if="!iscart" class="head_img">
				<img src="https://j-image.missfresh.cn/img_20170816184022244.png"/>
			</li>
			<li class="head_pos">
				<div>
					<span>
						<img src="https://j-image.missfresh.cn/img_20161026155951214.png"/>
					</span>
					<span>
						北京市
					</span>
					<span>
						<i class="iconfont">&#xe6ec;</i>
					</span>
				</div>
				<div>
					<img src="//static-as.missfresh.cn/frontend/img/home-search-3x-black.png" @click="getmessage('slidein')"/>
				</div>
			</li>
			<li v-if="!iscart" class="head_nav">
				<div class="scroll">
					<ul>
						<li :ref="'huoguo'">
							<span @click="goto('首页')" :class="{active : this.store.state.type=='首页'}" >热卖</span>
						</li>
						<li>
							<span @click="goto('火锅')" :class="{active : this.store.state.type=='火锅'}">火锅</span>
						</li>
						<li>
							<span @click="goto('水果')" :class="{active : this.store.state.type=='水果'}">水果</span>
						</li>
						<li>
							<span @click="goto('蔬菜')" :class="{active : this.store.state.type=='蔬菜'}">蔬菜</span>
						</li>
						<li>
							<span @click="goto('乳品')" :class="{active : this.store.state.type=='乳品'}">乳品</span>
						</li>
						<li>
							<span @click="goto('肉蛋')" :class="{active : this.store.state.type=='肉蛋'}">肉蛋</span>
						</li>
						<li>
							<span @click="goto('零食')" :class="{active : this.store.state.type=='零食'}">零食</span>
						</li>
						<li>
							<span @click="goto('酒饮')" :class="{active : this.store.state.type=='酒饮'}">酒饮</span>
						</li>
						<li>
							<span @click="goto('水产')" :class="{active : this.store.state.type=='水产'}">水产</span>
						</li>
						<li>
							<span @click="goto('速食')" :class="{active : this.store.state.type=='速食'}">速食</span>
						</li>
						<li>
							<span @click="goto('粮油')" :class="{active : this.store.state.type=='粮油'}">粮油</span>
						</li>
						<li>
							<span @click="goto('轻食')" :class="{active : this.store.state.type=='轻食'}" >轻食</span>
						</li>
						<li>
							<span @click="goto('日百')" :class="{active : this.store.state.type=='日百'}">日百</span>
						</li>
					</ul>
				</div>
				<div>
					<i class="iconfont" @click="showlist()">&#xe643;</i>
				</div>
				<div class="list_more" v-if="isshow">
					<div class="all_title">
						全部商品
						<i @click="showlist()"></i>
					</div>
					<div class="all_lists">
						<ul>
							<li v-for="(img_url,i) in img_urls" :key="i"  @click="torward(img_url.name)">
								<i :style="'background-image:url(http://localhost:4000/static/upload/'+ img_url.icon +')' ">
									
								</i>
								<h4>
									{{img_url.name}}
								</h4>
							</li>
							
						</ul>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import IsScroll from "../scripts/libs/iscroll-probe.js"
	import store from "../scripts/vuex/store.js"
	import axios from "axios"
	export default {
		props : ["gettype","getmessage","iscart"],
		data(){
			return {
				store,
				img_urls : [],
				isshow : false
			}
		},
		methods : {
			goto(type){
				if(type=='huoguo'){
					this.$router.push('/index/huoguo')
				}else if(type=='hot'){
					this.$router.push('/index/hot')
				}else{
					this.$router.push({name : 'fruits',params : {type : type}});
				}
				this.gettype(type);
				store.commit('update',type);
			},
			showlist(){
				this.isshow = !this.isshow;
			},
			gotosearch(){
				store.commit('show',true);
			},
			torward(type){
				switch(type){
					case '热卖' : {
						this.isshow = !this.isshow;
						store.commit('update','首页');
						this.$router.push('/index');
						break;
					}
					case '火锅' : {
						this.isshow = !this.isshow;
						store.commit('update','火锅');
						this.$router.push({ name : 'huoguo'});
						break;
					}
					case '水果' : {
						this.isshow = !this.isshow;
						store.commit('update','水果');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '蔬菜' : {
						this.isshow = !this.isshow;
						store.commit('update','蔬菜');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '乳品' : {
						this.isshow = !this.isshow;
						store.commit('update','乳品');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '肉蛋' : {
						this.isshow = !this.isshow;
						store.commit('update','肉蛋');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '零食' : {
						this.isshow = !this.isshow;
						store.commit('update','零食');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '酒饮' : {
						this.isshow = !this.isshow;
						store.commit('update','酒饮');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '水产' : {
						this.isshow = !this.isshow;
						store.commit('update','水产');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '速食' : {
						this.isshow = !this.isshow;
						store.commit('update','速食');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '粮油' : {
						this.isshow = !this.isshow;
						store.commit('update','粮油');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '轻食' : {
						this.isshow = !this.isshow;
						store.commit('update','轻食');
						this.$router.push({ name : 'fruits'});
						break;
					}
					case '日百' : {
						this.isshow = !this.isshow;
						store.commit('update','日百');
						this.$router.push({ name : 'fruits'});
						break;
					}
				}
			}
		},
		mounted(){
			new IsScroll('.scroll',{
				scrollX: true
			});
			axios({
				url : '/api/SearchIcons/getmsg',
			}).then((res)=>{
				this.img_urls = res.data.category_list;
			})
		}
	}
</script>

<style lang="scss">
	@import "../styles/header.scss";
</style>