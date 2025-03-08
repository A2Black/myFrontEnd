<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
    <!-- 外壳 -->
    <div class="common-wrapped">
        <!-- 内容 -->
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="账号详情" name="first">
                    <div class="account-infor-wrapped">
                        <span>用户头像：</span>
                        <div class="account-infor-content">
                            <!-- action是上传头像的接口 -->
                            <el-upload
                                class="avatar-uploader"
                                action="http://127.0.0.1:3007/user/uploadAvatar"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
                <el-tab-pane label="首页管理" name="third">首页管理</el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">其他设置</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        ref
    }from 'vue'
    import { ElMessage } from 'element-plus'
    
    import { Plus } from '@element-plus/icons-vue'

    import type { UploadProps } from 'element-plus'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 默认打开的标签页
    const activeName = ref('first')
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'系统设置',
    })

    const imageUrl = ref('')

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
    ) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('头像请上传jpg格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像大小请不要超过2MB!')
        return false
    }
    return true
    }
</script>

<style lang="scss" scoped>
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

            // 账号信息外部
            .account-infor-wrapped{
                display: flex;
                align-items: center;
                padding-left: 50px;
                margin-bottom: 50px;
                // 账号信息内容
                .account-infor-content{
                    margin-left: 24px;
                    margin-right: 16px;
                }
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

    // 上传头像样式
    .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    }
</style>