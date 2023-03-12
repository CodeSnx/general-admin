<template>
    <div class="manage">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
        <el-form ref="form" :inline="true" :model="form" :rules="rules" class="demo-form-inline">
          <el-form-item label="姓名" prop='name'>
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>

      <div class="manage-header">
        <el-button type="primary" @click="handleAdd">+ 新增</el-button>
        <el-form :model="userForm" :inline="true">
          <el-form-item>
            <el-input placeholder="请输入名字" v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        stripe
        height="90%"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.sex ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
</template>

<style>

</style>

<script>
import {addUser, delUser, editUser, getUser} from '@/api'
  export default {
    data() {
      return {
        dialogVisible: false,
        form: {
          name: '',
          age: '',
          sex: '',
          birth: '',
          addr: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名'}
          ],
          age: [
            {required: true, message: '请输入年龄'}
          ],
          sex: [
            {required: true, message: '请选择性别'}
          ],
          birth: [
            {required: true, message: '请选择日期'}
          ],
          addr: [
            {required: true, message: '请输入地址'}
          ]
        },
        tableData: [],
        modalType: 0,
        total : 0,
        pageData: {
          page: 1,
          limit: 10
        },
        userForm: {
          name: ''
        }
      }
    },
    methods: {
      // 提交用户表单
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if(this.modalType === 0){
              addUser(this.form).then(() => {
                this.getList()
              })
            }else {
              editUser(this.form).then(() => {
                this.getList()
              })
            }
            this.handleClose()
          }
        })
      },
      handleClose() {
        this.$refs.form.resetFields()
        this.dialogVisible = false
      },
      cancel() {
        this.handleClose()
      },
      handleEdit(row) {
        this.modalType = 1
        this.dialogVisible = true
        this.form = JSON.parse(JSON.stringify(row))

      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id: row.id}).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getList() {
        getUser({params: {...this.userForm, ...this.pageData}}).then((data) => {
        this.tableData = data.data.list
        this.total = data.data.count || 0
        }) 
      },
      handleAdd() {
        this.modalType = 0
        this.dialogVisible = true

      },
      handlePage(val) {
        this.pageData.page = val
        this.getList()
      },
      onSubmit() {
        this.getList()
      }
    },
    mounted(){
      this.getList()
    }
  };
</script>

<style lang="less" scoped>
  .manage {
    height: 90%;
    position: relative;
    .el-pagination {
      padding-top: 10px;
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      bottom: -20px;
    }
    .manage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
