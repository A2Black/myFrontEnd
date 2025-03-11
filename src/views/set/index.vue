<template>
    <!-- 外壳 -->
    <div class="common-wrapped">
        <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
        <!-- 内容 -->
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="账号详情" name="first">
                    <!-- 用户头像信息盒子 -->
                    <div class="account-infor-wrapped">
                        <span>头像：</span>
                        <div class="account-infor-content">
                            <!-- action是上传头像的接口 -->
                            <el-upload
                                class="avatar-uploader" action="http://127.0.0.1:3007/user/uploadAvatar"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                        </div>
                    </div>
                    <!-- 用户账号盒子 -->
                    <div class="account-infor-wrapped">
                        <span>账号：</span>
                        <div class="account-infor-content">
                            <!-- disabled不可修改 -->
                            <el-input v-model="userStore.account" disabled></el-input>
                        </div>
                    </div>
                    <!-- 用户修改密码盒子 -->
                    <div class="account-infor-wrapped">
                        <span>密码：</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openChangePassword">修改密码</el-button>
                        </div>
                    </div>
                    <!-- 用户姓名盒子 -->
                    <div class="account-infor-wrapped">
                        <span>姓名：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userStore.name"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveName">保存</el-button>
                        </div>
                    </div>
                    <!-- 用户性别盒子 -->
                    <div class="account-infor-wrapped">
                        <span>性别：</span>
                        <div class="account-infor-content">
                            <el-select v-model="userStore.sex">
                                <el-option label="男" value="man" />
                                <el-option label="女" value="woman" />
                            </el-select>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveSex">保存</el-button>
                        </div>
                    </div>
                    <!-- 用户身份盒子 -->
                    <div class="account-infor-wrapped">
                        <span>身份：</span>
                        <div class="account-infor-content">
                            <!-- disabled不可修改 -->
                            <el-input v-model="userStore.identity" disabled></el-input>
                        </div>
                    </div>
                    <!-- 所属部门盒子 -->
                    <div class="account-infor-wrapped">
                        <span>部门：</span>
                        <div class="account-infor-content">
                            <!-- disabled不可修改 -->
                            <el-input v-model="userStore.department" disabled></el-input>
                        </div>
                    </div>
                    <!-- 用户邮箱盒子 -->
                    <div class="account-infor-wrapped">
                        <span>邮箱：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userStore.email"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveEmail">保存</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
                <el-tab-pane label="首页管理" name="third">首页管理</el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">其他设置</el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <!-- 修改密码弹窗 -->
    <change ref="changeP"></change>
</template>

<script lang="ts" setup>
    import {
        ref,reactive
    }from 'vue'
    import { ElMessage } from 'element-plus'
    
    import { Plus } from '@element-plus/icons-vue'

    import type { UploadProps } from 'element-plus'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 导入useUserInforStore
    import { useUserInforStore } from '@/store/userinfo'
    // 导入修改姓名,性别,邮箱的api
    import { changeName,changeSex,changeEmail } from '@/api/userinfor'
    // 导入修改密码组件
    import change from './components/change_password.vue'
    // 导入绑定账号
    import { bind, changePassword } from '@/api/userinfor'
    // 创建实例
    const userStore = useUserInforStore()
    const changeP  = ref()
    // 默认打开的标签页
    const activeName = ref('first')
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'系统设置',
    })

    // 头像上传成功的函数
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
    ) => {
        if(response.status == 0){
            userStore.$patch({
                imageUrl:response.url
            })
            ElMessage({
                message: '头像更新成功！',
                type: 'success',
            }),
            (async()=>{
                await bind(userStore.account,response.onlyId,response.url)
            })()
        }else{
            ElMessage.error('头像更新失败!请重新上传')
        }
    }
    // 头像上传之前的函数
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg') {
    //     ElMessage.error('头像请上传jpg格式!')
    //     return false
    //} else 
    if (rawFile.size / 1024 / 1024 > 6) {
        ElMessage.error('头像大小请不要超过6MB!')
        return false
    }
    return true
    }

    // 账号详情
    const AccountDetailData = reactive({
        account:'',
        name:'',
        sex:'',
        identity:'',
        department:'',
        email:''
    })

    // 打开密码弹窗
    const openChangePassword =()=>{
        changeP.value.open();
    }

    // 保存姓名的点击函数
    const saveName = async()=>{
        const res = await changeName(localStorage.getItem('id'),userStore.name)
        console.log(res)
        if(res.data.status == 0){
                ElMessage({
                message: '修改成功！',
                type: 'success',
                })
            }else{
                ElMessage.error('修改失败,请重新输入')
            }
    }

        // 保存性别的点击函数
        const saveSex = async()=>{
        const res = await changeSex(localStorage.getItem('id'),userStore.sex)
        console.log(res)
        if(res.data.status == 0){
                ElMessage({
                message: '修改成功！',
                type: 'success',
                })
            }else{
                ElMessage.error('修改失败,请重新输入')
            }
    }

        // 保存邮箱的点击函数
        const saveEmail = async()=>{
        const res = await changeEmail(localStorage.getItem('id'),userStore.email)
        console.log(res)
        if(res.data.status == 0){
                ElMessage({
                message: '修改成功！',
                type: 'success',
                })
            }else{
                ElMessage.error('修改失败,请重新输入')
            }
    }

</script>

<style lang="scss" scoped>
    // 外壳
    .common-wrapped{
        padding-left: 26px;
        background-color: #f5f5f5;
        // 计算,减去头部和面包屑的高度
        height: calc(100vh - 85px);

        // 内容
        .common-content{
            padding: 0 10px;
            height: 95%;
            width: 97%;
            background-color: #fff;
            border-radius: calc(.5rem + 4px);
            font-size: 14px;
            border:2px solid #e4e4e7;

            // 账号信息外壳
            .account-infor-wrapped{
                display: flex;
                align-items: center;
                padding-left: 50px;
                margin-bottom: 30px;
                // 账号信息内容
                .account-infor-content{
                    margin-left: 24px;
                    margin-right: 16px;
                    
                }
            }
            // 保存按钮
            .account-save-button{
                margin-left: 16px;
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

    // 输入框长度
    :deep(.el-input){
        width: 240px;
    }
    // 下拉选择宽度
    :deep(.el-select){
        width: 240px;
    }
    // :deep(.el-main){
    //     border-width: 1px;
    //     border-color: #000;
    // }

</style>

<style>
    /* 头像上传样式 */
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