<template>
    <!-- 忘记密码 -->
    <el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="500" >
        <el-form class="login-form" label-width="auto" style="max-width: 400px" :label-position="labelPosition" :rules="rules">
            <el-form-item label="请输入你的注册账号" prop="account">
            <el-input v-model="forgetData.account" placeholder="请输入你的注册账号" />
            </el-form-item>
            <el-form-item label="请输入你的个人邮箱" prop="email">
            <el-input v-model="forgetData.email" placeholder="请输入你的个人邮箱" />
            </el-form-item>
        </el-form>
        <!-- 忘记密码底部内容-->
        <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
                    <el-button type="primary" @click="verifyAccountAndEmail">
                    下一步
                    </el-button>
                </div>
            </template>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="500" >
        <el-form class="login-form" label-width="auto" style="max-width: 400px" :label-position="labelPosition" :rules="rules">
            <el-form-item label="请输入你的新密码" prop="passwo">
            <el-input v-model="forgetData.password" placeholder="请输入你的新密码" show-password/>
            </el-form-item>
            <el-form-item label="请再次输入你的新密码" prop="repassw">
            <el-input v-model="forgetData.repassword" placeholder="请再次输入你的新密码" show-password/>
            </el-form-item>
        </el-form>
        <!-- 忘记密码底部内容-->
        <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.changePasswordDialog = false">取消</el-button>
                    <el-button type="primary" @click="resetPassword">
                    确认
                    </el-button>
                </div>
            </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { verify, reset } from '@/api/login.js'
//import { reset } from '@/api/login.js'

// 导入消息提示
import { ElMessage } from 'element-plus'

// 表单对齐方式
const labelPosition = ref('top')

    // 忘记密码表单接口
    interface forgetData {
        account:number,
        email:string,
        password:string,
        repassword:string,
    }

    // 忘记密码表单数据
    const forgetData:forgetData = reactive({
        account: null,
        email: '',
        password:'',
        repassword:'',
    })
    // 控制弹窗的开启与关闭，默认关闭
    const state = reactive({
        forgetPasswordDialog:false,
        changePasswordDialog:false
    })
    // 打开弹窗
    const open = ()=>{
        state.forgetPasswordDialog = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })
    // 打开验证邮箱和账号的弹窗
    const verifyAccountAndEmail = async()=>{
        const res = await verify(forgetData)
        if(res.status == 0){
            ElMessage({
                message: '验证成功！',
                type: 'success',
            })
            // localStorage是将id存储到浏览器的本地存储空间，sessionStorag是将id存储到浏览器的会话空间
            localStorage.setItem('id', res.id)
            state.forgetPasswordDialog = false
            state.changePasswordDialog = true
        }else{
            ElMessage.error('验证失败')
        }
        
    }

    // 重置密码
    const resetPassword = async() =>{
        if(forgetData.password == forgetData.repassword){
            const newPassword = forgetData.repassword
            // localStorage.getItem能够获取存储在浏览器本地存储空间的数据，sessionStorag.getItem同理
            // 调用reset接口
            await reset(localStorage.getItem('id'),newPassword)
            ElMessage({
                message: '重置成功！',
                type: 'success',
            })
        }else{
            ElMessage.error('重置失败，请检查两次密码输入是否一致')
        }
        
    }

    // 表单控制规则
    const rules = reactive({
        account: [
            { required: true, message: '请输入您的账号', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入您的个人邮箱', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入您的新密码', trigger: 'blur' },
        ],
        repassword: [
            { required: true, message: '再次输入密码以确认更改', trigger: 'blur' },
        ],
    })
    

</script>
    
<style lang="scss" scoped></style>