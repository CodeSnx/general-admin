<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb> -->
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <el-avatar size="medium" :src="avatar"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="layout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            avatar: 'https://i.328888.xyz/2023/01/31/83V8c.jpeg'
        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        handleClick(command) {
            if (command === 'layout') {
                Cookie.remove('token')
                this.$router.push('/login')
                this.$message({
                    message: '退出成功'
                })
            }
        }
    }
}
</script>


<style lang="less" scoped>
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: 14px;
            margin-left: 10px;
        }
        .r-content {
            width: 36px;
            height: 36px;
            margin-right: 20px;
        }
    }
</style>