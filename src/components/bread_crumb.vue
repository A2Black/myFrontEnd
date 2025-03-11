<!-- 封装面包屑组件 -->
<template>
    <div class="bread-crumb">
        <SvgIcon icon-name="location" class="bread-crumb-icon"></SvgIcon>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{ props.item.first }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="props.item.second">{{ props.item.second }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
    import SvgIcon from '@/components/SvgIcon.vue'
    // 在使用 <script setup> 的单文件组件中，props 可以使用 defineProps() 宏来声明
    const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
    .bread-crumb{
        height: 30px;
        padding: 0 20px;
        display: flex;
        align-items: center;
    }

    // 添加样式穿透
    :deep(.el-breadcrumb_item){
        height: 30px;
        font-size: 14px;
        line-height: 30px;
    }
    :deep(.el-breadcrumb_inner){
        font-weight: 500;
    }
</style>