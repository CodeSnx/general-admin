export default {
    state: {
        isCollapse: false, //控制菜单展开或收起
        tabList: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}