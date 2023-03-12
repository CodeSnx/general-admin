import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/Home.vue'
import User from '../view/User.vue'
import Main from '../view/Main.vue'
import Mall from '@/view/Mall.vue'
import PageOne from '@/view/PageOne.vue'
import PageTwo from '@/view/PageTwo.vue'
import Login from '@/view/login.vue'

Vue.use(VueRouter)

// 将路由和组件进行映射
// const routes = [
//     { path: '/home', component: Home},
//     { path: '/user', component: User},
// ]

// 嵌套路由
const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home', //重定向
        children: [
            { path: 'home', component: Home, name: 'home'},
            { path: 'user', component: User},
            { path: 'mall', component: Mall},
            { path: 'page1', component: PageOne},
            { path: 'page2', component: PageTwo},
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    }
]

// 创建router实例
const router = new VueRouter({
    routes
})

// 对外暴露
export default router
