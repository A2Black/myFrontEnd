<template>
    <!-- 网站首页 -->
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 首页外壳 -->
    <div class="home-wrapped">
        <!-- 轮播图外壳 -->
        <div class="swipper-wrapped">
            <el-carousel :interval="4000" indicator-position="outside" type="card" height="240px">
                <el-carousel-item v-for="item in 6" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 栅格布局外壳 -->
        <div class="layout-wrapped">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="company-message-area">
                        <span>公司介绍</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="company-message-area">
                        <span>公司架构</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="company-message-area">
                        <span>公司战略</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="company-message-area">
                        <span>高层介绍</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 表格外壳 -->
        <div class="two-tables-wrapped">
            <!-- 公司公告 -->
            <div class="company-notice">
                <span>公司公告</span>
                <el-table :data="tableData" style="width: 100%" :show-header="false">    <!-- 隐藏表头 -->
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
            <!-- 系统消息 -->
            <div class="system-message">
                <span>系统消息</span>
                <el-table :data="tableData" style="width: 100%" :show-header="false">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref }from 'vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'首页',
    })
    const tableData = [
        
    ]
</script>

<style lang="scss" scoped>
    // 混合语法
    @mixin table-class {
        height: 240px;
        width: 48%;
        display: flex;
        flex-direction: column;
        span {
            font-size: 14px;
            margin-bottom: 5px;
            border-bottom: 1px solid #ea0709;
        }
    }

    // 首页外壳
    .home-wrapped{
        padding: 8px;
        height: calc(100vh - 105px);
        background: #f5f5f5;
        display: flex;
        flex-direction: column;

        // 轮播图外壳
        .swipper-wrapped{
            padding: 0 20px;
            background: #fff;
            margin-bottom: 8px;
            border:1px solid #e4e4e7;
            border-radius: calc(.5rem + 4px);
        }
        // 栅格布局外壳
        .layout-wrapped{
            padding: 8px;
            margin-bottom: 8px;
            background: #f5f5f5;

            // 公司信息样式
            .company-message-area{
                background: #fff;
                height: 200px;
                padding: 8px;
                border:1px solid #e4e4e7;
                border-radius: calc(.5rem + 4px);
                cursor: pointer;

                // span标签样式
                span{
                    border-bottom: 1px solid #409eff ;
                    font-size: 14px;
                }
            }
        }
        // 表格外壳
        .two-tables-wrapped{
            height: 300px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background: #fff;
            border:1px solid #e4e4e7;
            border-radius: calc(.5rem + 4px);
            
            // 公司公告
            .company-notice{
                @include table-class()
            }

            // 系统消息
            .system-message{
                @include table-class()
            }
        }

    }

    // 轮播图默认样式
    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
        border:1px solid #e4e4e7;
        border-radius: calc(.5rem + 4px);
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
        border:1px solid #e4e4e7;
        border-radius: calc(.5rem + 4px);
    }
</style>