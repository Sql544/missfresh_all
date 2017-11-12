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
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="已售">
								<span>{{ props.row.sales_volume }}</span>
							</el-form-item>
							<el-form-item label="国家">
								<span>{{ props.row.country }}</span>
							</el-form-item>
							<el-form-item label="多久送达">
								<span>{{ props.row.delivery_mode_name }}</span>
							</el-form-item>
							<el-form-item label="多少人分享">
								<span>{{ props.row.share_product_text }}</span>
							</el-form-item>
							<el-form-item label="商品描述">
								<span>{{ props.row.description }}</span>
							</el-form-item>
							<el-form-item label="规格">
								<span>{{ props.row.unit }}</span>
							</el-form-item>
							<el-form-item label="重量">
								<span>{{ props.row.weight }}</span>
							</el-form-item>
							<el-form-item label="包装">
								<span>{{ props.row.pack }}</span>
							</el-form-item>
							<el-form-item label="保质期">
								<span>{{ props.row.storage_time }}</span>
							</el-form-item>
							<el-form-item label="存储方式">
								<span>{{ props.row.storage_method }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="id" label="序号" width="120">
				</el-table-column>
				<el-table-column prop="type" label="类型" width="120">
				</el-table-column>
				<el-table-column prop="position" label="显示位置" width="120">
				</el-table-column>
				<el-table-column prop="price_up" label="市场价" width="100">
				</el-table-column>
				<el-table-column prop="price_down" label="商城价" width="100">
				</el-table-column>
				<el-table-column prop="subtitle" label="二级标题" width="180">
				</el-table-column>
				<el-table-column label="购物车图标" width="100">
					<template slot-scope="scope">
						<img src="/static/upload/img_20170425134548759.png" height="50" width="50" />
					</template>
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
				<el-table-column prop="num" label="库存" width="100">
				</el-table-column>
				<el-table-column prop="product_tagName" label="小标题" width="120">
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
				<label class="el-form-item__label" style="width: 120px;">类型</label>
				<input class="el-input el-input__inner" v-model="form.type" name="type" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">显示位置</label>
				<input class="el-input el-input__inner" v-model="form.position" name="position" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">市场价</label>
				<input class="el-input el-input__inner" v-model="form.price_up" name="price_up" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商城价</label>
				<input class="el-input el-input__inner" v-model="form.price_down" name="price_down" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">二级标题</label>
				<input class="el-input el-input__inner" v-model="form.subtitle" name="subtitle" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商品标识</label>
				<input class="el-input el-input__inner" v-model="form.sku" name="sku" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商品名</label>
				<input class="el-input el-input__inner" v-model="form.name" name="name" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">库存</label>
				<input class="el-input el-input__inner" v-model="form.num" name="num" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">小标题</label>
				<input class="el-input el-input__inner" v-model="form.product_tagName" name="product_tagName" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">已售</label>
				<input class="el-input el-input__inner" v-model="form.sales_volume" name="sales_volume" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">国家</label>
				<input class="el-input el-input__inner" v-model="form.country" name="country" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">多久到达</label>
				<input class="el-input el-input__inner" v-model="form.delivery_mode_name" name="delivery_mode_name" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">分享人数</label>
				<input class="el-input el-input__inner" v-model="form.share_product_text" name="share_product_text" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商品描述</label>
				<input class="el-input el-input__inner" v-model="form.description" name="description" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">规格</label>
				<input class="el-input el-input__inner" v-model="form.unit" name="unit" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">重量</label>
				<input class="el-input el-input__inner" v-model="form.weight" name="weight" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">包装</label>
				<input class="el-input el-input__inner" v-model="form.pack" name="pack" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">保质期</label>
				<input class="el-input el-input__inner" v-model="form.storage_time" name="storage_time" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">存储方式</label>
				<input class="el-input el-input__inner" v-model="form.storage_method" name="storage_method" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
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

				options: [{
						value: 'type',
						label: '类型'
					},
					{
						value: 'position',
						label: '显示位置'
					},
					{
						value: 'price_up',
						label: '市场价'
					},
					{
						value: 'price_down',
						label: '商场价'
					},
					{
						value: 'subtitle',
						label: '二级标题'
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
						label: '库存'
					},
					{
						value: 'product_tagName',
						label: '小标题'
					},
					{
						value: 'sales_volume',
						label: '已售'
					},
					{
						value: 'country',
						label: '国家'
					},
					{
						value: 'delivery_mode_name',
						label: '多久到达'
					},
					{
						value: 'share_product_text',
						label: '分享人数'
					},
					{
						value: 'description',
						label: '商品描述'
					},
					{
						value: 'unit',
						label: '规格'
					},
					{
						value: 'weight',
						label: '重量'
					},
					{
						value: 'pack',
						label: '包装'
					},
					{
						value: 'storage_time',
						label: '保质期'
					},
					{
						value: 'storage_method',
						label: '存储方式'
					}
				],
				input: '',
				tableData: [{
					aa: 1,
					bb: 1,
					cc: 1,
					dd: 1,
					ff: 1,
					gg: 1
				}],
				form: {
					type : '',
					position : '',
					price_up : '',
					price_down : '',
					subtitle : '',
					sku : '',
					name : '',
					num : '',
					product_tagName : '',
					sales_volume : '',
					country : '',
					delivery_mode_name : '',
					share_product_text : '',
					unit : '',
					weight : '',
					pack : '',
					description : '',
					storage_time : '',
					storage_method : ''
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
						url: "/api/goods/deleteMember",
						method: 'post',
						data: {
							sku: rows[index].sku
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
				this.form.type=''
				this.form.position = ''
				this.form.price_up= ''
				this.form.price_down= ''
				this.form.subtitle= ''
				this.form.sku= ''
				this.form.name= ''
				this.form.num= ''
				this.form.product_tagName= ''
				this.form.sales_volume= ''
				this.form.country= ''
				this.form.delivery_mode_name= ''
				this.form.share_product_text= ''
				this.form.unit= ''
				this.form.weight= ''
				this.form.pack= ''
				this.form.description = ''
				this.form.storage_time= ''
				this.form.storage_method= ''
				this.whichclick = 'add';
				this.titleName = "添加产品保证信息";
				this.dialogFormVisible = true;
			},
			changeBtn(index, rows) {
				this.titleName = '修改产品保证信息';
				this.form.type=rows[index].type;
				this.form.position = rows[index].position;
				this.form.price_up= rows[index].price_up;
				this.form.price_down= rows[index].price_down;
				this.form.subtitle= rows[index].subtitle;
				this.form.sku= rows[index].sku;
				this.form.name=rows[index].name;
				this.form.num= rows[index].num;
				this.form.product_tagName= rows[index].product_tagName;
				this.form.sales_volume= rows[index].sales_volume;
				this.form.country= rows[index].country;
				this.form.delivery_mode_name= rows[index].delivery_mode_name;
				this.form.share_product_text= rows[index].share_product_text;
				this.form.unit= rows[index].unit;
				this.form.weight= rows[index].weight;
				this.form.pack= rows[index].pack;
				this.form.description = rows[index].description;
				this.form.storage_time= rows[index].storage_time;
				this.form.storage_method= rows[index].storage_method;
				this.updateobj_name = rows[index].sku;
				this.whichclick = 'change';
				this.dialogFormVisible = true;
			},
			search(msg) {
				axios({
					url: 'api/goods/search',
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
						this.dataArray[i].description = result.data.products[i].product_Message.description.join(',');
						this.dataArray[i].price_up = result.data.products[i].vip_price_pro.price_up.price;
						this.dataArray[i].price_down = result.data.products[i].vip_price_pro.price_down.price;
						this.dataArray[i].country = result.data.products[i].product_Message.country;
						this.dataArray[i].sales_volume = result.data.products[i].product_Message.sales_volume;
						this.dataArray[i].delivery_mode_name = result.data.products[i].product_Message.delivery_mode_name;
						this.dataArray[i].share_product_text = result.data.products[i].product_Message.share_product_text;
						this.dataArray[i].unit = result.data.products[i].product_Message.unit;
						this.dataArray[i].weight = result.data.products[i].product_Message.weight + 'g';
						this.dataArray[i].pack = result.data.products[i].product_Message.pack;
						this.dataArray[i].storage_time = result.data.products[i].product_Message.storage_time + '天';
						this.dataArray[i].storage_method = result.data.products[i].product_Message.storage_method;
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
				if(key=='price_up'||key=='price_down'||key=='num'||key=='sales_volume'||key=='weight'||key=='storage_time'){
					this.isShowSelectRange = true;
				}else{
					this.isShowSelectRange = false;
				}
			},
			addmember(event) {
				if(this.whichclick == 'add') {
					var fileobj = document.getElementById("load_img");
					var formData = new FormData(event.target);
					axios({
						url: '/api/goods/addmember',
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
								type : this.form.type,
								position : this.form.position,
								price_up : this.form.price_up,
								price_down : this.form.price_down,
								subtitle : this.form.subtitle,
								sku : this.form.sku,
								name : this.form.name,
								num : this.form.num,
								product_tagName : this.form.product_tagName,
								sales_volume : this.form.sales_volume,
								country : this.form.country,
								delivery_mode_name : this.form.delivery_mode_name,
								share_product_text : this.form.share_product_text,
								unit : this.form.unit,
								weight : this.form.weight,
								pack : this.form.pack,
								description : this.form.description ,
								storage_time : this.form.storage_time,
								storage_method : this.form.storage_method,
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
					var fileobj = document.getElementById("load_img");
					var formData = new FormData(event.target);
					formData.append('index', this.updateobj_name);
					axios({
						url: '/api/goods/updatemember',
						method: 'post',
						data: formData
					}).then((res) => {
						if(res.data.success) {
							for(var i in this.dataArray) {
								if(this.dataArray[i].sku == this.updateobj_name) {
									this.dataArray[i].type = this.form.type;
									this.dataArray[i].position = this.form.position;
									this.dataArray[i].price_up = this.form.price_up;
									this.dataArray[i].price_down = this.form.price_down;
									this.dataArray[i].subtitle = this.form.subtitle;
									this.dataArray[i].sku = this.form.sku;
									this.dataArray[i].name = this.form.name;
									this.dataArray[i].num = this.form.num;
									this.dataArray[i].product_tagName = this.form.product_tagName;
									this.dataArray[i].sales_volume = this.form.sales_volume;
									this.dataArray[i].country = this.form.country;
									this.dataArray[i].delivery_mode_name = this.form.delivery_mode_name;
									this.dataArray[i].share_product_text = this.form.share_product_text;
									this.dataArray[i].unit = this.form.unit;
									this.dataArray[i].weight = this.form.weight;
									this.dataArray[i].pack = this.form.pack;
									this.dataArray[i].description = this.form.description;
									this.dataArray[i].storage_time = this.form.storage_time;
									this.dataArray[i].storage_method = this.form.storage_method;
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
					url: '/api/goods/getmsg',
					method: 'get'
				}).then((result) => {
					this.dataArray = result.data.products;
					for(var i in this.dataArray) {
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].description = result.data.products[i].product_Message.description.join(',');
						this.dataArray[i].price_up = result.data.products[i].vip_price_pro.price_up.price;
						this.dataArray[i].price_down = result.data.products[i].vip_price_pro.price_down.price;
						this.dataArray[i].country = result.data.products[i].product_Message.country;
						this.dataArray[i].sales_volume = result.data.products[i].product_Message.sales_volume;
						this.dataArray[i].delivery_mode_name = result.data.products[i].product_Message.delivery_mode_name;
						this.dataArray[i].share_product_text = result.data.products[i].product_Message.share_product_text;
						this.dataArray[i].unit = result.data.products[i].product_Message.unit;
						this.dataArray[i].weight = result.data.products[i].product_Message.weight + 'g';
						this.dataArray[i].pack = result.data.products[i].product_Message.pack;
						this.dataArray[i].storage_time = result.data.products[i].product_Message.storage_time + '天';
						this.dataArray[i].storage_method = result.data.products[i].product_Message.storage_method;
						this.dataArray[i].icon = ('/static/upload/' + result.data.products[i].promote_tag);
					}
					this.total = this.dataArray.length;
					this.tableData = this.dataArray.slice(0, this.pageSize);
				})
			}
		},
		mounted() {
			this.init();
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