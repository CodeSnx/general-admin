<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside/>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header/>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'


export default{

    components: {
        CommonAside,
        CommonHeader
    }

}
</script>


<style lang="less" scoped>
  .el-header {
    background-color: #333;
    color: #fff;
    line-height: 60px;
  }
  .el-aside {
    border-right: none;
    min-height: 100vh;
  }
  

</style>
