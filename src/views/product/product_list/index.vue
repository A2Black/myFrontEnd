<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 模块化的公用外壳 -->
    <div class="module-common-wrapped">
        <div class="module-common-content">
            <!-- Tabs标签页 -->
            <el-tabs v-model="activeName" class="demo-tabs" stretch="true">
              <el-tab-pane label="产品列表" name="first">
                <div class="pane-content">
                    <div class="pane-top"></div>
                    <div class="table-footer"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="审核列表" name="second"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref }from 'vue'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'产品管理',
        second:'产品列表'
    })

    const activeName = ref('first')
</script>

<style lang="scss" scoped>
    // 公共模块外壳
    .module-common-wrapped {
        padding: 8px;
        background-color: #f1f3f6;
        height: calc(100vh - 105px);

        // 公共模块内容
        .module-common-content {
            padding: 0 10px;
            height: 100%;
            background-color: #fff;
            border:1px solid #e4e4e7;
            border-radius: calc(.5rem + 4px);
        }
    }
</style>