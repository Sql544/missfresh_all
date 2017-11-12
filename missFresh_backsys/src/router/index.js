import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/Login'
import SearchIcons from '@/components/SearchIcons'
import Promise from '@/components/promise'
import Rangler from '@/components/rangler'
import Vipcard from '@/components/vipcard'
import Goods from '@/components/goods'
import Carts from '@/components/carts'
import Images from '@/components/images'
Vue.use(Router)

export default new Router({
  routes: [
    {
    	path : '/',
    	name : 'login',
    	component : Login
    },
    {
    	path : '/index',
    	name : 'index',
    	component : Index,
    	children : [
    		{
    			path : '/index/SearchIcons',
    			name : 'SearchIcons',
    			component : SearchIcons
    		},
    		{
    			path : '/index/promise',
    			name : 'promise',
    			component : Promise
    		},
    		{
    			path : '/index/rangler',
    			name : 'rangler',
    			component : Rangler
    		},
    		{
    			path : '/index/vipcard',
    			name : 'vipcard',
    			component : Vipcard
    		},
    		{
    			path : '/index/goods',
    			name : 'goods',
    			component : Goods
    		},
    		{
    			path : '/index/carts',
    			name : 'carts',
    			component : Carts
    		},
    		{
    			path : '/index/images',
    			name : 'images',
    			component : Images
    		},
    	]
    }
  ]
})
