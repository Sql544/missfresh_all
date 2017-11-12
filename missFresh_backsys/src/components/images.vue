<template>
	<div>
		<el-main style="height: 580px;line-height: 0;">
			<el-select v-model="value" placeholder="请选择" style="width:120px">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<!--<el-input v-model="range.floorrange"  placeholder="请输入下限" style="width: 120px;margin-bottom: 10px;"></el-input>
			<span v-if="isShowSelectRange">-</span>
			<el-input v-model="range.ceilrange"  placeholder="请输入上限" style="width: 120px;margin-bottom: 10px;"></el-input>-->

			<el-input v-model="input" placeholder="请输入内容" style="width: 200px;margin-bottom: 10px;"></el-input>
			<el-button type="primary" round @click="search(input)">搜索</el-button>
			<el-button type="primary" round style="float: right;" @click="addMemberBtn">添加</el-button>
			<el-table :data="tableData" border height="450" style="width: 1100px;text-align: center;">
				<el-table-column prop="id" label="序号">
				</el-table-column>
				<el-table-column prop="position" label="显示位置">
				</el-table-column>
				<el-table-column prop="sku" label="商品标识">
				</el-table-column>
				<el-table-column prop="imageid" label="图片标识">
				</el-table-column>
				<el-table-column prop="path" label="图标路径">
					<template slot-scope="scope">
						<img :src="tableData[scope.$index].path"  height="50" width="50"/>
					</template>
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
				<label class="el-form-item__label" style="width: 120px;">显示位置</label>
				<input class="el-input el-input__inner" v-model="form.position" name="position" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">商品标识</label>
				<input class="el-input el-input__inner" v-model="form.sku" name="sku" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">图片标识</label>
				<input class="el-input el-input__inner" v-model="form.imageid" name="imageid" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				
				</br>
				<label class="el-form-item__label" style="width: 120px;">上传文件</label>
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
						value: 'position',
						label: '显示位置'
					},
					{
						value: 'sku',
						label: '商品标识'
					}
				],
				input: '',
				tableData: [
				],
				form: {
					name: '',
					path: ''
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
				titleName: ''
			}
		},
		methods: {
			handleSizeChange() {

			},
			handleCurrentChange() {
				this.tableData = this.dataArray.slice((this.currentPage3 - 1) * this.pageSize, this.currentPage3 * this.pageSize);
			},
			addmember(event) {},
			deleteBtn(index, rows) {
				this.$confirm('确认删除这个信息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var that = this;
					axios({
						url: "/api/images/deleteMember",
						method: 'post',
						data: {
							imageid: rows[index].imageid
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
				this.form.sku = '';
				this.form.imageid = '';
				this.form.position = '';
				this.whichclick = 'add';
				this.titleName = "添加图片信息";
				this.dialogFormVisible = true;
			},
			changeBtn(index, rows) {
				this.titleName = '修改图片信息';
				this.form.sku=rows[index].sku;
				this.form.imageid = rows[index].imageid;
				this.form.position = rows[index].position;
				this.updateobj_name = rows[index].imageid;
				this.whichclick = 'change';
				this.dialogFormVisible = true;
			},
			search(msg) {
				axios({
					url: 'api/images/search',
					method: 'post',
					data: {
						index: this.value,
						message: msg,
					}
				}).then((res) => {
					this.dataArray = res.data.images;
					for(var i in this.dataArray) {
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].path = ('/static/upload/' + res.data.images[i].path);
					}
					this.total = this.dataArray.length;
					this.tableData = this.dataArray.slice(0, this.pageSize)
					this.currentPage3 = 1;
					this.input = '';
					this.value = '';
				})
			},
			addmember(event){
				if(this.whichclick =='add'){
					var formData = new FormData(event.target);
					axios({
						url : '/api/images/addmember',
						method : 'post',
						data :formData
					}).then((res)=>{
						if(res.data.success){
							this.$message({
								message: '添加成功',
								type: 'success'
							});
							this.dialogFormVisible = false;
							var newMember = {
								id : this.dataArray.length+1,
								sku : this.form.sku,
								imageid : this.form.imageid,
								position : this.form.position,
								path : ('/static/upload/' + res.data.img_load)
							}
							this.dataArray.push(newMember)
							this.tableData = this.dataArray.slice(0, this.pageSize);
							this.currentPage3 = 1;
							this.total = this.dataArray.length;
						}else{
							this.$message.error('添加失败该名字已存在');
						}
					})
				}else if(this.whichclick=='change'){
					var fileobj = document.getElementById("load_img");
					var formData = new FormData(event.target);
					formData.append('index',this.updateobj_name);
					axios({
						url : '/api/images/updatemember',
						method : 'post',
						data : formData
					}).then((res)=>{
						if(res.data.success){
							for(var i in this.dataArray) {
								if(this.dataArray[i].imageid == this.updateobj_name) {
									this.dataArray[i].sku = this.form.sku;
									this.dataArray[i].imageid = this.form.imageid;
									this.dataArray[i].position = this.form.position;
									this.dataArray[i].path = ('/static/upload/' + res.data.img_load);
								}
							}
							this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.dialogFormVisible = false
						}else{
							this.$message.error('修改失败');
						}
					})
				}
			},
			init(){
				axios({
				url : '/api/images/getmsg',
				method:'get'
				}).then((result)=>{
					this.dataArray = result.data.images;
					for(var i in this.dataArray){
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].path = ('/static/upload/' + result.data.images[i].path);
					}
					this.total = this.dataArray.length;
					this.tableData = this.dataArray.slice(0,this.pageSize);
				})
			}
		},
		mounted(){
			this.init();
		}
	}
</script>

<style>
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