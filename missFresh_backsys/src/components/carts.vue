<template>
	<div>
		<el-main style="height: 580px;line-height: 0;">
			<el-select v-model="value" placeholder="请选择" @change="change" style="width:120px">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-input v-if="isShowSelectRange" v-model="range.floorrange"  placeholder="请输入下限" style="width: 120px;margin-bottom: 10px;"></el-input>
			<span v-if="isShowSelectRange">-</span>
			<el-input v-if="isShowSelectRange" v-model="range.ceilrange"  placeholder="请输入上限" style="width: 120px;margin-bottom: 10px;"></el-input>

			<el-input v-if="!isShowSelectRange" v-model="input" placeholder="请输入内容" style="width: 200px;margin-bottom: 10px;"></el-input>
			<el-button type="primary" round @click="search(input)">搜索</el-button>
			<el-button type="primary" round style="float: right;" @click="addMemberBtn">添加</el-button>
			<el-table :data="tableData" border height="450" style="width: 1100px;text-align: center;">
				<el-table-column prop="id" label="序号" width="120">
				</el-table-column>
				<el-table-column prop="price_up" label="市场价" width="100">
				</el-table-column>
				<el-table-column prop="price_down" label="商城价" width="100">
				</el-table-column>
				<el-table-column prop="sku" label="商品标识" width="160">
				</el-table-column>
				<el-table-column label="商品图片" width="120">
					<template slot-scope="scope">
						<img :src="tableData[scope.$index].icon" height="50" width="50" />
					</template>
				</el-table-column>
				<el-table-column prop="name" label="商品名" width="150">
				</el-table-column>
				<el-table-column prop="num" label="数量" width="100">
				</el-table-column>
				<el-table-column prop="product_tagName" label="小标题" width="120">
				</el-table-column>
				<el-table-column prop="belongs" label="购买人" width="140">
				</el-table-column>
				<el-table-column label="操作" width="160px">
					<template slot-scope="scope">
						<el-button type="danger" size="mini" @click="deleteBtn(scope.$index, tableData)">删除</el-button>
						<el-button type="primary" size="mini" @click="changeBtn(scope.$index, tableData)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
			</el-pagination>

		</el-main>
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" center>
			<form enctype="multipart/form-data" @submit.prevent="addmember" id="myform">
				<label class="el-form-item__label" style="width: 120px;">市场价</label>
				<input class="el-input el-input__inner" v-model="form.price_up" name="price_up" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商城价</label>
				<input class="el-input el-input__inner" v-model="form.price_down" name="price_down" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商品标识</label>
				<input class="el-input el-input__inner" v-model="form.sku" name="sku" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商品名</label>
				<input class="el-input el-input__inner" v-model="form.name" name="name" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">数量</label>
				<input class="el-input el-input__inner" v-model="form.num" name="num" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">小标题</label>
				<input class="el-input el-input__inner" v-model="form.product_tagName" name="product_tagName" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">购买人</label>
				<input class="el-input el-input__inner" v-model="form.belongs" name="belongs" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">上传商品图片</label>
				<input type='file' id="load_img" name="load_img" auto-complete="off" style="margin-top: 10px;"></input>
				
			</form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<button type="submit" form="myform">确 定</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		data() {
			return {

				options: [
					{
						value: 'price_up',
						label: '市场价'
					},
					{
						value: 'price_down',
						label: '商场价'
					},
					{
						value: 'sku',
						label: '商品标识'
					},
					{
						value: 'name',
						label: '商品名'
					},
					{
						value: 'num',
						label: '数量'
					},
					{
						value: 'product_tagName',
						label: '小标题'
					},
					{
						value : 'belongs',
						label : '购买人'
					}
				],
				input: '',
				tableData: [{
				}],
				form: {
					price_up : '',
					price_down : '',
					sku : '',
					name : '',
					num : '',
					product_tagName : '',
					belongs : ''
				},
				value: '',
				pageSize: 5,
				total: 1,
				currentPage3: 1,
				dialogFormVisible: false,
				formLabelWidth: "120px",
				dataArray: [],
				whichclick: '',
				titleName: '',
				updateobj_sku: '',
				updateobj_name: '',
				titleName: '',
				isShowSelectRange : false,
				range : {
					floorrange : '',
					ceilrange : ''
				}
			}
		},
		methods: {
			handleSizeChange() {

			},
			handleCurrentChange() {
				this.tableData = this.dataArray.slice((this.currentPage3 - 1) * this.pageSize, this.currentPage3 * this.pageSize);
			},
			deleteBtn(index, rows) {
				this.$confirm('确认删除这个信息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var that = this;
					axios({
						url: "/api/carts/deleteMember",
						method: 'post',
						data: {
							sku: rows[index].sku,
							belongs: rows[index].belongs,
						},
					}).then((res) => {
						if(res.data.success) {
							this.dataArray.splice((this.currentPage3 - 1) * this.pageSize + index, 1)
							for(var i in this.dataArray) {
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
			addMemberBtn() {
				this.form.price_up= ''
				this.form.price_down= ''
				this.form.sku= ''
				this.form.name= ''
				this.form.num= ''
				this.form.product_tagName= ''
				this.form.belongs= ''
				this.whichclick = 'add';
				this.titleName = "添加产品保证信息";
				this.dialogFormVisible = true;
			},
			changeBtn(index, rows) {
				this.titleName = '修改产品保证信息';
				this.form.price_up= rows[index].price_up;
				this.form.price_down= rows[index].price_down;
				this.form.subtitle= rows[index].subtitle;
				this.form.sku= rows[index].sku;
				this.form.name=rows[index].name;
				this.form.num= rows[index].num;
				this.form.product_tagName= rows[index].product_tagName;
				this.form.belongs= rows[index].belongs;
				this.updateobj_name = rows[index].belongs;
				this.updateobj_sku = rows[index].sku;
				this.whichclick = 'change';
				this.dialogFormVisible = true;
			},
			search(msg) {
				axios({
					url: 'api/carts/search',
					method: 'post',
					data: {
						index: this.value,
						message: msg,
						range : this.range
					}
				}).then((result) => {
					this.dataArray = result.data.products;
					for(var i in this.dataArray) {
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].price_up = result.data.products[i].vip_price_pro.price_up.price;
						this.dataArray[i].price_down = result.data.products[i].vip_price_pro.price_down.price;
						this.dataArray[i].icon = ('/static/upload/' + result.data.products[i].promote_tag);
					}
					this.total = this.dataArray.length;
					this.tableData = this.dataArray.slice(0, this.pageSize)
					this.currentPage3 = 1;
					this.range.floorrange = '';
					this.range.ceilrange = '';
					this.input = '';
					this.value = '';
				})
			},
			change(key){
				if(key=='price_up'||key=='price_down'||key=='num'){
					this.isShowSelectRange = true;
				}else{
					this.isShowSelectRange = false;
				}
			},
			addmember(event) {
				if(this.whichclick == 'add') {
					var formData = new FormData(event.target);
					axios({
						url: '/api/carts/addmember',
						method: 'post',
						enctype: "multipart/form-data",
						headers: {
							enctype: "multipart/form-data",
						},
						data: formData
					}).then((res) => {
						console.log(res);
						if(res.data.success) {
							this.$message({
								message: '添加成功',
								type: 'success'
							});
							this.dialogFormVisible = false;
							var newMember = {
								id : this.dataArray.length + 1 ,
								price_up : this.form.price_up,
								price_down : this.form.price_down,
								subtitle : this.form.subtitle,
								sku : this.form.sku,
								name : this.form.name,
								num : this.form.num,
								product_tagName : this.form.product_tagName,
								belongs : this.form.belongs,
								icon: ('/static/upload/' + res.data.img_load)
							}
							this.dataArray.push(newMember)
							this.tableData = this.dataArray.slice(0, this.pageSize);
							this.currentPage3 = 1;
							this.total = this.dataArray.length;
						} else {
							this.$message.error('添加失败该名字已存在');
						}
					})
				} else if(this.whichclick == 'change') {
					var formData = new FormData(event.target);
					formData.append('index', this.updateobj_sku);
					formData.append('index1', this.updateobj_name);
					axios({
						url: '/api/carts/updatemember',
						method: 'post',
						data: formData
					}).then((res) => {
						if(res.data.success) {
							for(var i in this.dataArray) {
								if(this.dataArray[i].belongs == this.updateobj_name && this.dataArray[i].sku == this.updateobj_sku) {
									this.dataArray[i].price_up = this.form.price_up;
									this.dataArray[i].price_down = this.form.price_down;
									this.dataArray[i].subtitle = this.form.subtitle;
									this.dataArray[i].sku = this.form.sku;
									this.dataArray[i].name = this.form.name;
									this.dataArray[i].num = this.form.num;
									this.dataArray[i].product_tagName = this.form.product_tagName;
									this.dataArray[i].belongs = this.form.belongs;
									this.dataArray[i].icon = ('/static/upload/' + res.data.img_load);
								}
							}
							this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.tableData = this.dataArray.slice((this.currentPage3 - 1) * this.pageSize, this.currentPage3 * this.pageSize);
							this.dialogFormVisible = false
						} else {
							this.$message.error('修改失败');
						}
					})
				}
			},
			init() {
				axios({
					url: '/api/carts/getmsg',
					method: 'get'
				}).then((result) => {
					this.dataArray = result.data.products;
					for(var i in this.dataArray) {
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].price_up = result.data.products[i].vip_price_pro.price_up.price;
						this.dataArray[i].price_down = result.data.products[i].vip_price_pro.price_down.price;
						this.dataArray[i].icon = ('/static/upload/' + result.data.products[i].promote_tag);
					}
					this.total = this.dataArray.length;
					this.tableData = this.dataArray.slice(0, this.pageSize);
				})
			},
			listen(){
				var that = this;
				var ws = new WebSocket('ws://localhost:9000/ws'); 
				ws.onopen = function(){
					ws.send('come in');
				}
				ws.onmessage = function (event) {
					if(event.data=='somethinggotocart'){
//						window.location.;
						axios({
							url: '/api/carts/getmsg',
							method: 'get'
						}).then((result) => {
							this.dataArray = result.data.products;
							for(var i in this.dataArray) {
								this.dataArray[i].id = parseInt(i) + 1;
								this.dataArray[i].price_up = result.data.products[i].vip_price_pro.price_up.price;
								this.dataArray[i].price_down = result.data.products[i].vip_price_pro.price_down.price;
								this.dataArray[i].icon = ('/static/upload/' + result.data.products[i].promote_tag);
							}
							this.total = this.dataArray.length;
							this.tableData = this.dataArray.slice(0, this.pageSize);
						})
					}
				}.bind(this);
			}
		},
		mounted() {
			this.init();
			this.listen()
		}
	}
</script>

<style>
	.demo-table-expand {
		font-size: 0;
	}
	
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 25%;
	}
	button{
	    display: inline-block;
	    line-height: 1;
	    white-space: nowrap;
	    cursor: pointer;
	    background: #fff;
	    border: 1px solid #d8dce5;
	    color: #5a5e66;
	    -webkit-appearance: none;
	    text-align: center;
	    box-sizing: border-box;
	    outline: 0;
	    margin: 0;
	    -webkit-transition: .1s;
	    transition: .1s;
	    padding: 12px 20px;
   	 	border-radius: 4px;
   	 	color: #fff;
    	background-color: #409EFF;
   	 	border-color: #409EFF;
   	 	margin-left: 10px;
	}
</style>