<template>
    <el-card class="login-container">
        <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="auto">
            <h3>系统登录(账号密码为admin)</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import Cookie from "js-cookie"
import {getMenu} from "../api"

export default({
    data () {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {required: true, trigger: 'blur', message: '请输入用户名'}
                ],
                password: [
                    {required: true, trigger: 'blur', message: '请输入密码'}
                ]
            }
        }
    },
    methods: {
        submit() {
            console.log(this.form);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({data}) => {
                        
                        if (data.code === 20000) {
                            Cookie.set('token',data.data.token)
                            this.$router.push('/home')
                            this.$message({
                                showClose: true,
                                message: data.data.message,
                                type: 'success'
                            })
                        }else {
                            this.$message({
                                showClose: true,
                                message: data.data.message,
                                type: 'warning'
                            })
                        }
                    }) 
                }
            })
        }
    }
})
</script>

<style lang="less" scoped>
    .login-container {
        width: 380px;
        margin: 180px auto;
        padding: 35px 35px 15px;
        border-radius: 15px;
        box-sizing: border-box;
        h3 {
            margin-bottom: 40px;
            text-align: center;
        }
        .el-input {
            width: 188px;
        }
        .el-button {
            width: 128px;
            margin-left: 50%;
        }
    }
</style>
