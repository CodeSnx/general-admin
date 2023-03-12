<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <h3>{{isCollapse ? '后台':'通用管理后台系统'}}</h3>
    <el-menu-item @click="checkMenu(item)" :index="item.name" v-for="item in noChildren" :key="item.name">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu @click="checkMenu(item)" :index="item.label" v-for="item in hashChildren" :key="item.label">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item @click="checkMenu(subItem)" :index="subItem.name" v-for="subItem in item.children" :key="subItem.name">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    checkMenu(item) {
        if (this.$route.path !== item.path && !(item.path === '/' && (this.$route.path === '/home'))){
            this.$router.push(item.path)
        }
    }
  },
  computed: {
    // 沒有子菜单
    noChildren(){
        return this.menuData.filter(item => !item.children)
    },
    hashChildren(){
        return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
    border-right: none;
    height: 100%;
    h3 {
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
    }
}
</style>
