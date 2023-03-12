import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import permission from "./mockServeData/permission";
import userApi from "./mockServeData/user";

Mock.mock('/api/home/getData', homeApi.getStatisticalData)

Mock.mock('/api/user/add', userApi.createUser)
Mock.mock('/api/user/edit', userApi.updateUser)
Mock.mock('/api/user/del', userApi.deleteUser)
Mock.mock(/api\/user\/getUser/, userApi.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)