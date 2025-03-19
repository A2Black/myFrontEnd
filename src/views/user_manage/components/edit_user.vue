<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="编辑用户信息" width="600px"  align-center draggable>
        <div class="dialog-content">
            <!-- 表单内容 -->
            <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="60px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="formData.account" disabled />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="formData.sex" placeholder="请选择性别">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" />
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-select v-model="formData.department" placeholder="请选择部门">
                        <el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirmEditAdmin">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { reactive, ref, onBeforeUnmount } from 'vue'
    import { 
        getUserInfo,
        editAdminInfo
    } from '@/api/userinfor'
    import { getDepartment } from '@/api/setting'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage } from 'element-plus'

    // 创建响应式变量departmentData
    const departmentData = ref([])
    // 获取部门数据
    const getdepartment = async() => {
        departmentData.value = await getDepartment()
    }
    getdepartment()

    // bus接受id
    bus.on('editId',async(id:number)=>{
        const res = await getUserInfo(id)
        formData.id = res.id
        formData.account = res.account
        formData.name = res.name
        formData.sex = res.sex
        formData.email = res.email
        formData.department = res.department
    })

    // 为formData添加接口
    interface formData {
        id ?:number,
        account:number,
        name:string,
        sex:string,
        email:string,
        department:string
    }

    // 为model创建表单数据对象
    const formData : formData = reactive({
        id:null,
        account:null,
        name:'',
        sex:'',
        email:'',
        department:'',
        identity:'用户'
    })

    //添加表单验证规则
    const rules = reactive({
        name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        department: [
            { required: true, message: '请选择部门', trigger: 'blur' },
        ],
    })

    // 弹窗开关
    const dialogFormVisible = ref(false)
    
    // 打开编辑管理员的弹窗
    const open = ()=>{
        dialogFormVisible.value = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })

    // 编辑用户信息
    const confirmEditAdmin = async() => {
        const res = await editAdminInfo(formData)
        if(res.status === 0){
            ElMessage({
                message: '编辑用户信息成功！',
                type: 'success',
            })
            // 发送success
            // emit('success')
            bus.emit('offDialog',2)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('编辑用户信息失败!')
            // 关闭弹窗
            dialogFormVisible.value = false
        }
    }
    
    // 取消监听
    onBeforeUnmount(()=>{
        bus.all.clear()
    })

</script>

<style lang="scss" scoped>
    .dialog-content {
        display: flex;
        padding: 20px 30px;
        flex-direction: column;
    }

    :deep(.el-form-item) {
        margin: 30px;
    }
</style>