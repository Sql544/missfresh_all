<template>
    <div class="box" v-if="ishow">
        <header class="address">
            <cartHeader :iscart="'true'"/>
        </header>
        <section>
            <div class="main_top">
                <div class="top_left">
                    <div class="shop_all"></div>
                    <span>次日达</span>
                </div>
                <div class="top_right">
                        实付满69包邮
                        <div>
                            <img src="" alt="">
                        </div>
                </div>
            </div>
            <ul class="shoplist">
                <li v-for="(item,i) in active_item" :key="i">
                    <div class="shop_d"></div>
                    <div class="img_box">
                        <img :src="'http://localhost:4000/static/upload/'+item.promote_tag" alt="">
                    </div>
                    <div class="list_main">
                        <p>{{item.name}}</p>
                        <span>{{item.product_tagName}}</span>
                        <p>{{item.vip_price_pro.price_up.name}} <span>{{item.vip_price_pro.price_up.price / 100}}</span></p>
                        <p>{{item.vip_price_pro.price_down.name}} <span>{{item.vip_price_pro.price_down.price / 100}}</span></p>
                    </div>
                    <div class="list_sum">
                        <span @click="min(item,i)" :sku="item.sku">-</span>
                        <span>{{item.num}}</span>
                        <span @click="add(item,i)" :sku="item.sku">+</span>
                    </div>
                </li>
            </ul>
        </section>
        <div class="all_price">
            <div class="price_left">
                <div></div>
                <span>全选</span>
            </div>
            <div class="price_middle">
                合计<span>{{allprice}}</span>
            </div>
            <div class="price_right">去结算</div>
        </div>
        <footer>
            <foot></foot>
        </footer>
    </div>  
</template>

<script>
import axios from 'axios';
import Vue from "vue";
import store from "../../index/scripts/vuex/store.js";
import foot from '../../common/footer.vue';
import cartHeader from "../../index/components/header.vue";
    export default {
        data(){
            return{
                active_item:[],
                ishow:true,
                allprice:0
            }
        },
        methods:{
            add(item,index){
            	axios({
					url : '/api/carts/updatemember',
					method : 'post',
					data : {
						index : item.sku,
						index1 : item.belongs,
						num : item.num+1,
						price_up : item.vip_price_pro.price_up.price,
						price_down : item.vip_price_pro.price_down.price,
						sku : item.sku,
						name : item.name,
						product_tagName : item.product_tagName,
						belongs : store.state.Loginuser
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.success){
						this.active_item[index].num += 1 ;
					}
				})
//             store.commit('add',{
//                  sku,
//                  num
//              })
                var allprice = this.allprice
                allprice = this.allprice + (item.vip_price_pro.price_down.price/100)
                allprice = parseFloat(allprice.toFixed(2))
                this.allprice = allprice
            },
            min(item,index){
            	if(item.num==1){
            		axios({
						url : '/api/carts/DeleteMember',
						method : 'post',
						data : {
							sku : item.sku,
							belongs : item.belongs
						}
					}).then((res)=>{
						if(res.data.success){
							this.active_item.splice(index,1)
						}
					})
            	}
            	else{
	            	axios({
						url : '/api/carts/updatemember',
						method : 'post',
						data : {
							index : item.sku,
							index1 : item.belongs,
							num : item.num-1,
							price_up : item.vip_price_pro.price_up.price,
							price_down : item.vip_price_pro.price_down.price,
							sku : item.sku,
							name : item.name,
							product_tagName : item.product_tagName,
							belongs : store.state.Loginuser
						}
					}).then((res)=>{
						if(res.data.success){
							this.active_item[index].num -= 1 ;
						}
					})
            	}
//             store.commit('add',{
//                  sku,
//                  num
//              })
                var allprice = this.allprice
                allprice = this.allprice - (item.vip_price_pro.price_down.price/100)
                if(allprice <= 0){
                    this.allprice = 0
                }else{
	                allprice = parseFloat(allprice.toFixed(2))
	                this.allprice = allprice
                }
            }
        },
        computed:{
        },
        components:{
            foot,
            cartHeader
        },
        mounted(){
//          console.log(store.state.goods_list);
//          this.active_item = store.state.goods_list;
//          var allprice = 0
//              this.active_item.forEach(function(item){
//                  allprice += ~~ (item.num*item.vip_price_pro.price_up.price / 100)
//              })
//        	this.allprice = allprice
          	
          	axios({
				url : '/api/carts/getmsg',
				method : 'get',
			}).then((res)=>{
				this.active_item = res.data.products;
				if(this.active_item.length!=0){
					this.active_item = this.active_item.filter(function(key){
						return key.belongs == store.state.Loginuser
					})
					for(var i in res.data.products){
						this.allprice += parseInt(res.data.products[i].vip_price_pro.price_down.price) / 100 * res.data.products[i].num;
					}
					this.allprice = parseFloat(this.allprice.toFixed(2))
				}
			})
          
        }
    }
</script>
<style lang="scss">
    @import "../styles/cart.scss";
</style>

