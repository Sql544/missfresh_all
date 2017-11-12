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
			<el-button type="primary" round style="float: right;"  @click="addMemberBtn">添加</el-button>
			<el-table :data="tableData" border height="450" style="width: 1100px;;text-align: center;">
				<el-table-column prop="id" label="序号" >
				</el-table-column>
				<el-table-column prop="name" label="名字" >
				</el-table-column>
				<el-table-column prop="icon" label="图标路径">
					<template slot-scope="scope">
						<img :src="tableData[scope.$index].icon"  height="50" width="50"/>
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
			<!--<el-form :model="form" id="myform" enctype="multipart/form-data" @submit.prevent="addmember">
				<el-form-item label="名字" :label-width="formLabelWidth">
					<el-input v-model="form.name" name="name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上传图片" :label-width="formLabelWidth">
					<input type='file' id="load_img" name="load_img" auto-complete="off"></input>
				</el-form-item>
			</el-form>-->
			<form enctype="multipart/form-data" @submit.prevent="addmember" id="myform">
					<label class="el-form-item__label" style="width: 120px;">名字</label>
					<input class="el-input el-input__inner" v-model="form.name" name="name" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
					</br>
					<label class="el-form-item__label" style="width: 120px;">上传文件</label>
					<input type='file' id="load_img" name="load_img" auto-complete="off" style="margin-top: 10px;"></input>
			</form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<button type="submit"  form="myform">确 定</button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		props : [ 'ifclick' ],
		data(){
			return {
				options : [
					{
						value : 'name',
						label : '名字'
					},
					{
						value : 'icon',
						label : '图标路径'
					}
				],
				input : '',
				tableData : [
				],
				form: {
					name : '',
					icon : ''
				},
				value : '',
				pageSize : 5,
				total : 1,
				currentPage3 : 1,
				dialogFormVisible : false,
				formLabelWidth : "120px",
				dataArray : [],
				whichclick : '',
				titleName : '',
				updateobj_name : ''
			}
		},
		methods : {
			addMemberBtn(){
				this.titleName = '添加图标信息';
				this.form.name='';
				this.form.icon = '';
				this.dialogFormVisible = true;
				this.whichclick = 'add';
			},
			changeBtn(index,rows){
				this.titleName = '修改图标信息';
				this.form.name=rows[index].name;
				this.form.icon = rows[index].icon;
				this.updateobj_name = rows[index].name;
				this.whichclick = 'change';
				this.dialogFormVisible = true;
			},
			deleteBtn(index, rows){
				this.$confirm('确认删除这个商标', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var that = this;
					axios({
						url: "/api/SearchIcons/deleteMember",
						method: 'post',
						data: {
							name: rows[index].name
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
			handleSizeChange(){
				
			},
			handleCurrentChange(){
				this.tableData = this.dataArray.slice((this.currentPage3 - 1) * this.pageSize, this.currentPage3 * this.pageSize);
			},
			submit1(){
				console.log(1);
				this.addmember();
			},
			addmember(event){
				if(this.whichclick =='add'){
					var fileobj = document.getElementById("load_img");
					var formData = new FormData(event.target);
					axios({
						url : '/api/SearchIcons/addmember',
						method : 'post',
						enctype : "multipart/form-data",
						headers : {
							enctype:"multipart/form-data",
						},
						data :formData
					}).then((res)=>{
						console.log(res);
						if(res.data.success){
							this.$message({
								message: '添加成功',
								type: 'success'
							});
							this.dialogFormVisible = false;
							var newMember = {
								id : this.dataArray.length+1,
								name : this.form.name,
								icon : ('/static/upload/' + res.data.img_load)
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
					console.log(formData)
					axios({
						url : '/api/SearchIcons/updatemember',
						method : 'post',
						data : formData
					}).then((res)=>{
						if(res.data.success){
							for(var i in this.dataArray) {
								if(this.dataArray[i].name == this.updateobj_name) {
									this.dataArray[i].name = this.form.name;
									this.dataArray[i].icon = ('/static/upload/' + res.data.img_load);
								}
							}
							this.$message({
								message: '修改成功',
								type: 'success'
							});
//							this.currentPage3 = 1;
							this.dialogFormVisible = false
						}else{
							this.$message.error('修改失败');
						}
					})
				}
			},
			init(){
				axios({
				url : '/api/SearchIcons/getmsg',
				method:'get'
				}).then((result)=>{
					console.log(result);
					this.dataArray = result.data.category_list;
					for(var i in this.dataArray){
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].icon = ('/static/upload/' + result.data.category_list[i].icon);
					}
					this.total = this.dataArray.length;
					this.tableData = this.dataArray.slice(0,this.pageSize);
				})
			},
			search(msg){
				axios({
					url: 'api/SearchIcons/search',
					method: 'post',
					data: {
						index: this.value,
						message: msg,
					}
				}).then((res) => {
					this.dataArray = res.data.category_list;
					for(var i in this.dataArray) {
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].icon = ('/static/upload/' + res.data.category_list[i].icon);
					}
					console.log(this.dataArray)
					this.total = this.dataArray.length;
					this.tableData = this.dataArray.slice(0, this.pageSize)
					this.currentPage3 = 1;
					this.input = '';
					this.value = '';
				})
			}
		},
		mounted(){
			this.init();
		},
	}
</script>

<style>
	
</style>