<template>
	<div class="container">
		<el-row>
		  <el-col :span="24">
		  	<div class="main">
		  		<el-row>
		  			<el-col :span="8">
		  				<div class="login">
		  					<div class="title">登录<p>后台管理系统</p></div>
		  					<el-row>  
							    <el-col :span="8">  
							        <el-input id="name"  v-model="name" placeholder="请输入帐号">  
							            <template slot="prepend" style="background: crimson; color: white;">帐号</template>  
							        </el-input>   
							    </el-col>  
							 </el-row>  
							 <el-row>  
							    <el-col :span="8">  
							        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">  
							            <template slot="prepend">密码</template>  
							        </el-input>  
							    </el-col>  
							 </el-row>  
							 <el-row>  
							    <el-col :span="8">  
							        <el-button id="login" v-on:click="login(name,password)" style="width:100%" type="primary">登录</el-button>  
							    </el-col>  
							 </el-row>  
		  				</div>
	  				</el-col>
				</el-row>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import "../scripts/libs/jquery-1.11.3.js"
	import ElementUI from "element-ui"
	import 'element-ui/lib/theme-chalk/index.css'
	import Vue from "vue"
	Vue.use(ElementUI);
	export default{
		data(){
			return{
				name : '',
				password : ''
			}
		},
		methods : {
			login(name,password){
				$.ajax({
					url : '/api/users/Login',
					method : 'post',
					data:{
						username : name,
						password : password,
					},
					success : this.handleGetLogin.bind(this)
				})
			},
			handleGetLogin(res){
				if(res.msg=="登录成功"&&res.type=="1" || res.msg=="登录成功"&&res.type=="2"){
					this.$router.push({name : 'index'})
				}else if(res.msg=="登录成功"&&res.type=="0"){
					alert("你没有权限登录")
				}else{
					alert("用户名密码错误")
				}
			}
		}
	}
	
</script>

<style lang="css">
	*{
		margin: 0;
		padding: 0;
	}
	html,body{
		height: 100%;
	}
	#app{
		height: 100%;
	}
	.main{
		height: 100%;
		width: 100%;
		background: url(../assets/307409.jpg) no-repeat center center rgba(255,255,255,0.7);
		background-size: 100% 100%;
	}
	.container{
		height: 100%;
	}
	.main>.el-row>.el-col{
		background: rgba(255,255,255,0.4);
		border-radius: 20px;
		box-shadow:  10px 10px  20px #333333;
		margin-top:10%;
		height: 400px;
		margin-left: 33.33%;
	}
	.login{
		padding-top: 10%;
	}
	.login .title{
		line-height: 50px;
		font-size: 30px;
		margin-bottom: 20px;
		border-bottom: 1px solid #D3DCE6;
		text-align: center;
		letter-spacing: 7px;
	}
	.login .title p{
		line-height: 20px;
		font-size: 14px;
		margin-left: 10px;
		letter-spacing: 7px;
		margin-bottom: 5px;
	}
	.login .el-input-group__prepend{
		opacity: 1;
		background: #333333;
		border: #333333;
		color: white;
	}
	.login .el-col{
		margin-left: 20%;
		width: 60%;
	}
	.login .el-button{
		background: #333333;
		border: #333333;
	}
	.login .el-row{
		margin-bottom: 20px;
	}
    .el-row {
		height:100%; 
		&:last-child {
		  margin-bottom: 0;
		}
    }
  .el-col {
    border-radius: 4px;
    height: 100%;
  }
  .bg-purple-dark {
    background:#ffd356 ;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 60px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #pink;
  }
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    color: #333;
    text-align: center;
    text-align: center;
    line-height: 300px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>