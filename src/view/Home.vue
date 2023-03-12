<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <!-- user -->
            <el-card class="box-card">
                    <div class="user">
                        <div class="left">
                            <img src="../assets/images/avatar.jpeg" alt="">
                        </div>
                        <div class="right">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="user-info">
                        <p>上次登录时间：<span>2022-1-1</span></p>
                        <p>上次登录地点：<span>武汉</span></p>
                    </div>
            </el-card>

            <!-- 信息展示 -->
            <el-card class="box-card" style="margin-top: 20px; height: 460px">
                <el-table
                :data="tableData"
                stripe
                style="width: 100%;">
                    <el-table-column v-for="(value, key) in tableLabel" :prop="key" :label="value" :key="key">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>

        <el-col :span="16">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
                    <div class="details">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>

            <el-card style="height: 280px">
                <div ref="echarts01" style="height: 280px"></div>
            </el-card>

            <div class="graph">
                <el-card>
                    <div ref="echarts02" style="height: 260px"></div>
                </el-card>
                <el-card>
                    <div ref="echarts03" style="height: 240px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import {getData} from '@/api/index'
import * as echarts from 'echarts'
export default {
    data() {
        return {
            tableLabel: [],
            tableData: [],
            countData: []
        }
    },
    mounted() {
        getData().then(({data}) => {
            this.tableLabel = data.data.tableLabel;
            this.tableData = data.data.tableData;
            this.countData = data.data.countData;

        const {orderData, userData, videoData} = data.data
        // 折线图
        const echarts01 = echarts.init(this.$refs.echarts01)
        const echarts01Option = {}
        const xAxis = Object.keys(orderData.data[1])
        echarts01Option.xAxis = {
            data: orderData.date
        }
        echarts01Option.yAxis = {}
        echarts01Option.legend = {
            data: xAxis
        }
        echarts01Option.series = []
        xAxis.forEach(key => {
            echarts01Option.series.push({
                name: key,
                data: orderData.data.map(item => item[key]),
                type: 'line'
            })
        })
        echarts01.setOption(echarts01Option)

        // 柱状图
        const echarts02 = echarts.init(this.$refs.echarts02)
        const echarts02Option = {
            legend: {
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
            },
            grid: {
                left: "20%",
            },
            // 提示框
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category", // 类目轴
                data: userData.map(item => item.date),
                axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                },
                axisLabel: {
                    interval: 0,
                    color: "#333",
                },
            },
            yAxis: [
                {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                },
            ],
            color: ["#2ec7c9", "#b6a2de"],
            series: [
                {
                    name: '新增用户',
                    data: userData.map(item => item.new),
                    type: 'bar'
                },
                {
                    name: '活跃用户',
                    data: userData.map(item => item.active),
                    type: 'bar'
                }
            ],
        }
        echarts02.setOption(echarts02Option)

        // 饼状图
        const echarts03 = echarts.init(this.$refs.echarts03)
        const echarts03Option = {
            tooltip: {
                trigger: "item",
            },
            color: [
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3ed1cf",
            ],
            series: [
                {
                    data: videoData,
                    type: 'pie'
                }
            ],
        }
        echarts03.setOption(echarts03Option)
        })
    }
}
</script>


<style lang="less" scoped>
    .user {
        margin-bottom: 20px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .left {
            margin-right: 40px;
            img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
        }
        .right {
            .name {
                font-size: 32px;
                margin-bottom: 10px;
            }
            .access {
                color: #999;
            }
        }
    }
    .userinfo {
        p {
            line-height: 28px;
            font-size: 14px;
            color: #999;
            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }
    .num {
        display: flex;
        // 要换行
        flex-wrap: wrap;
        // 从头到尾均匀排列
        justify-content: space-between;
        margin-left: 20px;
        .el-card {
            width: 32%;
            margin-bottom: 20px;
            .icon {
                width: 80px;
                height: 80px;
                line-height: 80px;
                text-align: center;
                font-size: 30px;
                color: #fff;
            }
            .details {
                // 竖着排且居中
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 15px;
                .price {
                    font-size: 30px;
                    margin-bottom: 10px;
                    line-height: 30px;
                    height: 30px;
                    margin-top: 10px;
                }
                .desc {
                    font-size: 14px;
                    color: #999;
                    text-align: center;
                    margin: 0;
                }
            }
        }
    }

    .graph {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .el-card {
            width: 48%;
            height: 260px;
        }
    }
</style>