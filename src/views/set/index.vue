<template>
    <el-main>
        <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
        <!-- 外壳 -->
        <div class="common-wrapped">
            <!-- 内容 -->
            <div class="common-content">
                <el-tabs v-model="activeName" class="demo-tabs">
                    <el-tab-pane label="账号详情" name="first">账号详情</el-tab-pane>
                    <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
                    <el-tab-pane label="首页管理" name="third">首页管理</el-tab-pane>
                    <el-tab-pane label="其他设置" name="fourth">其他设置</el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </el-main>
</template>

<script lang="ts" setup>
    import {
        ref
    }from 'vue'
    // 默认打开的标签页
    const activeName = ref('first')
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'系统设置',
    })

</script>

<style lang="scss" scoped>
    .el-main{
        --el-main-padding: 20px;
        border-width: 1px;
        border-color: #000;
        // 外壳
        .common-wrapped{
            padding: 10px;
            background-color: #f5f5f5;
            // 计算,减去头部和面包屑的高度
            height: calc(100vh - 85px);
            // 内容
            .common-content{
                padding: 0 10px;
                height: 100%;
                background-color: #fff;
                border-radius: calc(.5rem + 4px);
            }
        }
    }
    
    // Tabs标签页样式
    .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    }
</style>