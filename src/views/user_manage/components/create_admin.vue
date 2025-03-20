<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" :title="title" width="600px"  align-center draggable>
        <div class="dialog-content">
            <!-- 表单内容 -->
            <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="60px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="formData.account" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" />
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
                <el-button type="primary" @click="confirmCreateAdmin">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { reactive, ref, onBeforeUnmount } from 'vue'
    // 导入获取部门的api
    import { getDepartment } from '@/api/setting'
    import { createAdmin } from '@/api/userinfor'
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 定义title
    const title = ref()
    // bus接受id
    bus.on('createId',(id:number)=>{
        if(id === 1){
            title.value = "新建产品管理员"
            formData.identity = '产品管理员'
        }
        if(id === 2){
            title.value = "新建用户管理员"
            formData.identity = '用户管理员'
        }
        if(id === 3){
            title.value = "新建消息管理员"
            formData.identity = '消息管理员'
        }
    })

    const departmentData = ref([])
    // 获取部门数据
    const getdepartment = async() => {
        departmentData.value = await getDepartment()
    }
    getdepartment()

    // 为formData添加接口
    interface formData {
        account:number,
        password:string,
        name:string,
        sex:string,
        email:string,
        department:string,
        identity:string
    }

    // 为model创建表单数据对象
    const formData : formData = reactive({
        account:null,
        password:'',
        name:'',
        sex:'',
        email:'',
        department:'',
        identity:''
    })

    //添加表单验证规则
    const rules = reactive({
        account: [
            { required: true, message: '请输入需要添加的管理员账号', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        name: [
            { required: true, message: '请输入管理员姓名', trigger: 'blur' },
        ],
        sex: [
            { required: true, message: '请选择管理员性别', trigger: 'blur' },
        ],
        email: [
            { required: true, message: '请输入管理员邮箱', trigger: 'blur' },
        ],
        department: [
            { required: true, message: '请选择管理员的部门', trigger: 'blur' },
        ],
    })

    // 创建管理员
    const confirmCreateAdmin = async() => {
        const res = await createAdmin(formData)
        if(res.status === 0){
            ElMessage({
                message: '创建管理员账号成功！',
                type: 'success',
            })
            bus.emit('adminDialogOff',1)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('创建管理员账号失败，请重新创建')
            // 关闭弹窗
            dialogFormVisible.value = false
        }
    }

    const dialogFormVisible = ref(false)
    // 控制弹窗打开
    // 打开创建管理员的弹窗
    const open = ()=>{
        dialogFormVisible.value = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })

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