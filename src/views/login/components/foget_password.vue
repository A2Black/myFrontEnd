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
                    <el-button type="primary" @click="openChangePassword">
                    下一步
                    </el-button>
                </div>
            </template>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="500" >
        <el-form class="login-form" label-width="auto" style="max-width: 400px" :label-position="labelPosition" :rules="rules">
            <el-form-item label="请输入你的新密码" prop="passwo">
            <el-input v-model="forgetData.password" placeholder="请输入你的新密码" />
            </el-form-item>
            <el-form-item label="请再次输入你的新密码" prop="repassw">
            <el-input v-model="forgetData.repassword" placeholder="请再次输入你的新密码" />
            </el-form-item>
        </el-form>
        <!-- 忘记密码底部内容-->
        <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.changePasswordDialog = false">取消</el-button>
                    <el-button type="primary" @click="state.changePasswordDialog = false">
                    确认
                    </el-button>
                </div>
            </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
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
    // 打开下一步修改密码的弹窗
    const openChangePassword = ()=>{
        state.forgetPasswordDialog = false
        state.changePasswordDialog = true
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