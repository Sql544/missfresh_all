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
				<el-table-column prop="id" label="序号" width="120">
				</el-table-column>
				<el-table-column prop="name" label="名字" width="140">
				</el-table-column>
				<el-table-column prop="icon" label="图标路径" width="140">
					<template slot-scope="scope">
						<img :src="tableData[scope.$index].icon"  height="50" width="50"/>
					</template>
				</el-table-column>
				<el-table-column prop="target" label="目标地址" width="300">
				</el-table-column>
				<el-table-column prop="position" label="显示位置" width="120">
				</el-table-column>
				<el-table-column prop="type" label="类别" width="120">
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="160">
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
				<label class="el-form-item__label" style="width: 120px;">名字</label>
				<input class="el-input el-input__inner" v-model="form.name" name="name" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">目标地址</label>
				<input class="el-input el-input__inner" v-model="form.target" name="target" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">显示位置</label>
				<input class="el-input el-input__inner" v-model="form.position" name="position" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
				</br>
				<label class="el-form-item__label" style="width: 120px;">类别</label>
				<input class="el-input el-input__inner" v-model="form.type" name="type" auto-complete="off" style="width: 60%; margin-bottom: 30px;"></input>
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
						value: 'name',
						label: '名字'
					},
					{
						value: 'target',
						label: '目标地址'
					},
					{
						value: 'position',
						label: '显示位置'
					},
					{
						value : 'type',
						label : '类别'
					}
				],
				input: '',
				tableData: [
				],
				form: {
					name: '',
					icon: ''
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
						url: "/api/vipcard/deleteMember",
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
			addMemberBtn() {
				this.form.name='';
				this.form.icon = '';
				this.form.target = '';
				this.form.position = '';
				this.form.type = '';
				this.whichclick = 'add';
				this.titleName = "添加会员卡信息";
				this.dialogFormVisible = true;
			},
			changeBtn(index, rows) {
				this.titleName = '修改会员卡信息';
				this.form.name=rows[index].name;
				this.form.icon = rows[index].icon;
				this.form.target = rows[index].target;
				this.form.position = rows[index].position;
				this.form.type = rows[index].type;
				this.updateobj_name = rows[index].name;
				this.whichclick = 'change';
				this.dialogFormVisible = true;
			},
			search(msg) {
				axios({
					url: 'api/vipcard/search',
					method: 'post',
					data: {
						index: this.value,
						message: msg,
					}
				}).then((res) => {
					this.dataArray = res.data.category_areas;
					for(var i in this.dataArray) {
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].icon = ('/static/upload/' + res.data.category_areas[i].icon);
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
					var fileobj = document.getElementById("load_img");
					var formData = new FormData(event.target);
					axios({
						url : '/api/vipcard/addmember',
						method : 'post',
						enctype : "multipart/form-data",
						headers : {
							enctype:"multipart/form-data",
						},
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
								name : this.form.name,
								target : this.form.target,
								position : this.form.position,
								type : this.form.type,
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
					axios({
						url : '/api/vipcard/updatemember',
						method : 'post',
						data : formData
					}).then((res)=>{
						if(res.data.success){
							for(var i in this.dataArray) {
								if(this.dataArray[i].name == this.updateobj_name) {
									this.dataArray[i].name = this.form.name;
									this.dataArray[i].target = this.form.target;
									this.dataArray[i].position = this.form.position;
									this.dataArray[i].type = this.form.type;
									this.dataArray[i].icon = ('/static/upload/' + res.data.img_load);
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
				url : '/api/vipcard/getmsg',
				method:'get'
				}).then((result)=>{
					this.dataArray = result.data.category_areas;
					for(var i in this.dataArray){
						this.dataArray[i].id = parseInt(i) + 1;
						this.dataArray[i].icon = ('/static/upload/' + result.data.category_areas[i].icon);
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