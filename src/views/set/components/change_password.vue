<template>
    <!-- 修改密码 -->
    <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="500" >
        <el-form class="login-form" label-width="auto" style="max-width: 400px" :label-position="labelPosition" :rules="rules">
            <el-form-item label="请输入你的旧密码" prop="oldPassword">
            <el-input v-model="passwordData.oldPassword" placeholder="请输入你的旧密码" show-password autocomplete="new-password"/>
            </el-form-item>
            <el-form-item label="请输入你的新密码" prop="newPassword">
                <!-- v-model是双向绑定 -->
            <el-input v-model="passwordData.newPassword" placeholder="请输入你的新密码" show-password/>
            </el-form-item>
        </el-form>
        <!-- 忘记密码底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="state.changePasswordDialog = false">取消</el-button>
                <el-button type="primary" @click="changeUserPassword">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { changePassword } from '@/api/userinfor'
    import { useRouter } from 'vue-router'
    // 导入消息提示
    import { ElMessage } from 'element-plus'

    // 创建实例
    const router = useRouter()

    // 表单对齐方式
    const labelPosition = ref('top')

    // 忘记密码表单对象接口
    // 密码是由字幕和数字组成的，所以是string
    interface passwordData {
        oldPassword:string,
        newPassword:string,
    }

    // 忘记密码表单对象
    const passwordData:passwordData = reactive({
        oldPassword:'',
        newPassword:'',
    })
    // 控制弹窗的开启与关闭，默认关闭
    const state = reactive({
        changePasswordDialog:false
    })
    // 打开修改密码的弹窗
    const open = ()=>{
        // 打开弹窗
        state.changePasswordDialog = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })

    // 修改密码 id olaPassword newPassword
    const changeUserPassword = async() =>{
        // 判断输入的密码是否为空
        if(passwordData.oldPassword && passwordData.newPassword){
            // localStorage.getItem能够获取存储在浏览器本地存储空间的数据，sessionStorag.getItem同理
            // 调用changePassword接口
            const res = await changePassword(localStorage.getItem('id'),passwordData.oldPassword,passwordData.newPassword)
            if(res.status == 0){
                ElMessage({
                message: '密码修改成功！',
                type: 'success',
                })
                // 关闭弹窗
                state.changePasswordDialog =  false
                // 跳转到登陆页面
                router.replace('/login')
            }else{
                ElMessage.error('密码修改失败,请重新输入')
            }
            
        }else{
            ElMessage.error('请检查输入的密码是否正确')
        }
        
    }

    // 表单控制规则
    const rules = reactive({
        oldPassword: [
            { required: true, message: '请输入您的旧密码', trigger: 'blur' },
        ],
        newPassword: [
            { required: true, message: '请输入您的新密码', trigger: 'blur' },
        ],
    })
</script>

<style lang="scss" scoped>

</style>