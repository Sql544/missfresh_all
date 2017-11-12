<template>
	<div style="height: 100%;">
		<el-container style="height: 100%; border: 1px solid #eee">
			<el-aside width="200px" style="background-color: rgb(238, 241, 246);overflow: unset;">
				<el-menu  @open="handleOpen">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>用户信息</template>
						<el-menu-item index="1-1" @click="superMsger">超管信息</el-menu-item>
						<el-menu-item index="1-2" @click="Msger">管理员信息</el-menu-item>
						<el-menu-item index="1-3" @click="normalPeople">普通用户信息</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i>其他信息</template>
						<el-menu-item index="2-1" @click="searchListMsg">搜索列表信息</el-menu-item>
						<el-menu-item index="2-2" @click="promise">产品保证信息</el-menu-item>
						<el-menu-item index="2-3" @click="vipcard">会员卡信息</el-menu-item>
						<el-menu-item index="2-4" @click="rangler">轮播图信息</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i>产品</template>
						<el-menu-item index="3-1" @click="goods">全部商品信息</el-menu-item>
						<el-menu-item index="3-2" @click="carts">购物车商品信息</el-menu-item>
						<el-menu-item index="3-3" @click="images">产品相关图片</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<el-dropdown @command="handleCommand">
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>查看</el-dropdown-item>
							<el-dropdown-item command="logout">注销</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>{{Loginuser}}</span>
				</el-header>

				<el-main style="height: 580px;line-height: 0;" v-if="nowStatus=='people'">
					<el-select v-model="value" placeholder="请选择" @change="change" style="width:120px">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-input v-model="range.floorrange" v-if="isShowSelectRange" placeholder="请输入下限" style="width: 120px;margin-bottom: 10px;"></el-input>
					<span v-if="isShowSelectRange">-</span>
					<el-input v-model="range.ceilrange" v-if="isShowSelectRange" placeholder="请输入上限" style="width: 120px;margin-bottom: 10px;"></el-input>

					<el-input v-if="!isShowSelectRange" v-model="input" placeholder="请输入内容" style="width: 200px;margin-bottom: 10px;"></el-input>
					<el-button type="primary" round @click="search(input,range)">搜索</el-button>
					<el-button type="primary" round style="float: right;" v-if="(nowposition!='superMsger'||Logintype>2)" @click="addMemberBtn">添加</el-button>
					<el-button type="primary" round style="float: right;" v-else disabled>添加</el-button>
					<el-table :data="tableData"  :nowTable="nowposition" border height="450" style="width: 100%;text-align: center;">
						<el-table-column prop="id" label="序号" width="120">
						</el-table-column>
						<el-table-column prop="username" label="用户名" width="120">
						</el-table-column>
						<el-table-column prop="telephone" label="手机号" width="160">
						</el-table-column>
						<el-table-column prop="money" label="余额" width="140">
						</el-table-column>
						<el-table-column prop="score" label="积分" width="140">
						</el-table-column>
						<el-table-column prop="type" label="用户类型" width="120">
						</el-table-column>
						<el-table-column label="操作" fixed="right" width="160">
							<template slot-scope="scope">
								<el-button type="danger" size="mini" disabled v-if="(Logintype<2 && nowposition=='normalMsger') || (nowposition=='superMsger'&&Logintype<=2)">删除</el-button>
								<el-button type="danger" size="mini" v-else @click="deleteBtn(scope.$index, tableData)">删除</el-button>
								<el-button type="primary" size="mini" disabled v-if="(Logintype<2 && nowposition=='normalMsger') || (nowposition=='superMsger'&&Logintype<=2)">修改</el-button>
								<el-button type="primary" size="mini" @click="updateBtn(scope.$index, tableData)" v-else>修改</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!--<el-table :data="tableData" v-if="nowStatus=='products'" border height="380" style="width: 100%;text-align: center;">
						<el-table-column prop="id" label="序号" width="120">
						</el-table-column>
						<el-table-column prop="username" label="商品名" width="120">
						</el-table-column>
						<el-table-column prop="telephone" label="商品名" width="160">
						</el-table-column>
						<el-table-column prop="money" label="商品名" width="140">
						</el-table-column>
						<el-table-column prop="score" label="商品名" width="140">
						</el-table-column>
						<el-table-column prop="type" label="商品名" width="120">
						</el-table-column>
						<el-table-column label="操作" fixed="right" width="160">
							<template slot-scope="scope">
								<el-button type="danger" size="mini">删除</el-button>
								<el-button type="primary" size="mini">修改</el-button>
							</template>
						</el-table-column>
					</el-table>-->

					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
					</el-pagination>

				</el-main>
					<router-view v-if="nowStatus=='products'" :ifclick="true"></router-view>
			</el-container>
		</el-container>
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" center>
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="form.password" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" :label-width="formLabelWidth">
					<el-input v-model="form.telephone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="nowposition=='normalPeople'" label="余额" :label-width="formLabelWidth">
					<el-input v-model="form.money" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="nowposition=='normalPeople'" label="积分" :label-width="formLabelWidth">
					<el-input v-model="form.score" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="类别" :label-width="formLabelWidth">
					<el-input v-model="form.type" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addmember">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<style>
	html,
	body,
	#app {
		height: 100%;
	}
	
	* {
		margin: 0;
		padding: 0;
	}
	
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
	
	.el-aside {
		color: #333;
	}
	
	.cell {
		text-align: center;
	}
</style>

<script>
	import axios from "axios"
	export default {
		data() {
			return {
				tableData: [],
				pageSize: 2,
				total: 0,
				currentPage3: 1,
				input: '',
				Loginuser: '',
				nowStatus: 'people',
				dialogFormVisible: false,
				formLabelWidth: '120px',
				range: {
					floorrange: '',
					ceilrange: ''
				},
				form: {
					name: "",
					password: '',
					telephone: '',
					money: '',
					score: '',
					type: '管理员'
				},
				options: [{
						value: 'username',
						label: '用户名'
					},
					{
						value: 'telephone',
						label: '电话号码'
					},
					{
						value: 'score',
						label: '积分'
					},
					{
						value: 'money',
						label: '金额'
					}
				],
				isShowSelectRange: false,
				value: '',
				Logintype: -1,
				nowposition: '',
				titleName: '添加个人信息',
				clickobj: '',
				updateobj_username: '',
				dataArray: []
			}
		},
		methods: {
			superMsger() {
				this.getmsg('superMsger', '2', '超管');
				this.options = [{
						value: 'username',
						label: '用户名'
					},
					{
						value: 'telephone',
						label: '电话号码'
					}
				]
			},
			Msger() {
				this.getmsg('normalMsger', '1', '普通管理员')
				this.options = [{
						value: 'username',
						label: '用户名'
					},
					{
						value: 'telephone',
						label: '电话号码'
					}
				]
			},
			normalPeople() {
				this.getmsg('normalPeople', '0', '普通用户')
				this.options = [{
						value: 'username',
						label: '用户名'
					},
					{
						value: 'telephone',
						label: '电话号码'
					},
					{
						value: 'score',
						label: '积分'
					},
					{
						value: 'money',
						label: '金额'
					}
				]
			},
			getmsg(nowposition, type, typeName) {
				this.$router.push({name : 'index'});
				this.dataArray = [];
				this.nowposition = nowposition
				this.nowStatus = 'people'
				this.form.type = typeName
				this.currentPage3 = 1
				axios({
					url: "/api/users/getPeopleMsg",
					method: 'post',
					data: {
						type: type
					},
				}).then((res) => {
					this.tableData = res.data.data;
					for(var i in this.tableData) {
						this.tableData[i].id = parseInt(i) + 1;
						this.tableData[i].type = typeName
					}
					for(var i in this.tableData) {
						this.dataArray[i] = this.tableData[i];
					}
					this.total = this.tableData.length;
					this.tableData = this.dataArray.slice(0, this.pageSize);
				})
			},
			rangler(){
				this.nowStatus = 'products';
				this.$router.push({path : '/index/rangler'});
			},
			promise(){
				this.nowStatus = 'products';
				this.$router.push({path : '/index/promise'});
			},
			vipcard(){
				this.nowStatus = 'products';
				this.$router.push({path : '/index/vipcard'});
			},
			goods(){
				this.nowStatus = 'products';
				this.$router.push({path : '/index/goods'});
			},
			carts(){
				this.nowStatus = 'products';
				this.$router.push({path : '/index/carts'});
			},
			searchListMsg() {
				this.nowStatus = 'products';
				this.$router.push({path : '/index/SearchIcons'});
			},
			images(){
				this.nowStatus = 'products';
				this.$router.push({path : '/index/images'});
			},
			handleSizeChange() {},
			handleCurrentChange() {
				this.tableData = this.dataArray.slice((this.currentPage3 - 1) * this.pageSize, this.currentPage3 * this.pageSize);
			},
			handleOpen(key, keyPath) {
			},
			addMemberBtn() {
				this.form.name = '';
				this.form.password = '';
				this.form.telephone = '';
				this.form.money = '';
				this.form.score = '';
				this.titleName = '添加个人信息';
				this.clickobj = 'add';
				this.dialogFormVisible = true;
			},
			updateBtn(index, rows) {
				this.clickobj = 'update',
				this.updateobj_username = rows[index].username;
				this.titleName = '修改个人信息';
				this.dialogFormVisible = true;
				this.form.name = rows[index].username;
				this.form.password = '';
				this.form.telephone = rows[index].telephone;
				this.form.money = rows[index].money;
				this.form.score = rows[index].score;
			},
			addmember() {
				if(this.nowposition == "normalMsger") {
					var type = 1
					var typeName = "普通管理员"
				} else if(this.nowposition == "normalPeople") {
					var type = 0
					var typeName = "普通用户"
				}
				if(this.clickobj == 'add') {
					if(this.Logintype < 1) {
						alert('你没有权限添加用户');
						this.dialogFormVisible = false
					} else {
						axios({
							url: "/api/users/addMember",
							method: 'post',
							data: {
								username: this.form.name,
								password: this.form.password,
								telephone: this.form.telephone,
								money: this.form.money,
								score: this.form.score,
								type: type
							},
						}).then((res) => {
							if(res.data.success) {
								var newMember = {
									id: this.dataArray.length + 1,
									username: this.form.name,
									password: this.form.password,
									telephone: this.form.telephone,
									money: this.form.money,
									score: this.form.score,
									type: typeName
								}
								this.$message({
									message: '添加成功',
									type: 'success'
								});
								this.dataArray.push(newMember);
								this.dialogFormVisible = false;
								this.tableData = this.dataArray.slice(0, this.pageSize);
								this.currentPage3 = 1;
								this.total = this.dataArray.length;
							} else {
								this.$message.error('添加失败该名字已存在');
							}
						})
					}
				} else if(this.clickobj == 'update') {
					axios({
						url: "/api/users/updateMember",
						method: 'post',
						data: {
							index: this.updateobj_username,
							username: this.form.name,
							password: this.form.password,
							telephone: this.form.telephone,
							money: this.form.money,
							score: this.form.score
						}
					}).then((res) => {
						if(res.data.success) {
							for(var i in this.dataArray) {
								if(this.dataArray[i].username == this.updateobj_username) {
									this.dataArray[i].username = this.form.name;
									this.dataArray[i].telephone = this.form.telephone;
									this.dataArray[i].money = this.form.money;
									this.dataArray[i].score = this.form.score
								}
							}
							this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.dialogFormVisible = false
						} else {
							this.$message.error('修改失败');
						}
					})
				}
			},
			deleteBtn(index, rows) {
				this.$confirm('确认删除这个用户', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var that = this;
					axios({
						url: "/api/users/deleteMember",
						method: 'post',
						data: {
							username: rows[index].username
						},
					}).then((res) => {
						if(res.data.success) {
							//	        			rows.splice(index,1)
							this.dataArray.splice((this.currentPage3 - 1) * this.pageSize + index, 1)
							for(var i in this.dataArray) {
								//	        				rows[i].id = parseInt(i)+1;
								this.dataArray[i].id = parseInt(i) + 1;
							}
							that.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.tableData = this.dataArray.slice(0, this.pageSize);
							this.currentPage3 = 1;
							this.total = this.dataArray.length;
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					});
				});
			},
			logout() {
				this.$confirm('确认退出', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var that = this;
					axios({
						url: '/api/users/Logout',
						method: 'get',
					}).then((res) => {
						this.$router.push({
							name: 'login'
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消注销'
					});
				});
			},
			handleCommand(command) {
				if(command == 'logout') {
					this.logout();
				}
			},
			search(msg, range) {
				if(this.nowposition == "normalMsger") {
					var type = '1'
					var typeName = "普通管理员"
				} else if(this.nowposition == "normalPeople") {
					var type = '0'
					var typeName = "普通用户"
				} else if(this.nowposition == "superMsger") {
					var type = '2'
					var typeName = "超管"
				}
				this.dataArray = [];
				if(msg != '' || range.floorrange != '' || range.ceilrange != '') {
					axios({
						url: 'api/users/searchUsers',
						method: 'post',
						data: {
							index: this.value,
							message: msg,
							range: range,
							type: type
						}
					}).then((res) => {
						this.dataArray = res.data.data;
						console.log(res.data.data)
						for(var i in this.dataArray) {
							this.dataArray[i].id = parseInt(i) + 1;
							this.dataArray[i].type = typeName;
						}
						this.total = this.dataArray.length;
						this.tableData = this.dataArray.slice(0, this.pageSize)
						this.currentPage3 = 1;
						this.range.floorrange = '';
						this.range.ceilrange = '';
						this.input = '';
						this.value = '';
					})

				}
			},
			change(key) {
				if(key == 'score' || key == 'money') {
					this.isShowSelectRange = true;
				} else {
					this.isShowSelectRange = false;

				}
			}
		},
		mounted() {
			this.Loginuser = "";
			var that = this;
			axios({
				url: "/api/users/getLoginStatus",
				method: 'get',
			}).then((res) => {
				if(res.data.success == 'nologin') {
					this.$alert('未登录', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							this.$router.push({
								name: 'login'
							})
						}
					})
				} else {
					that.Logintype = res.data.type
					that.Loginuser = res.data.username
				}
			})
		}
	};
</script>