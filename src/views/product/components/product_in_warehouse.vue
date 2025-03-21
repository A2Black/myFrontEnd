<!-- 产品申请入库组件 -->
<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="添加产品入库" width="600px"  align-center draggable>
        <div class="dialog-content">
            <!-- 表单内容 -->
            <el-form ref="ruleFormRef" :model="formData" :rules="rules" :label-position="labelPosition" label-width="120px">
                <el-form-item label="入库编号" prop="product_id">
                    <el-input v-model="formData.product_id" />
                </el-form-item>
                <el-form-item label="产品名称" prop="product_name">
                    <el-input v-model="formData.product_name" />
                </el-form-item>
                <el-form-item label="产品类别" prop="product_category">
                    <el-select v-model="formData.product_category" placeholder="请选择产品类别">
                        <el-option label="食品类" value="食品类" />
                        <el-option label="服装类" value="服装类" />
                    </el-select>
                </el-form-item>
                <el-form-item label="产品单位" prop="product_unit">
                    <el-select v-model="formData.product_unit" placeholder="请选择产品单位">
                        <el-option label="个" value="个" />
                        <el-option label="件" value="件" />
                    </el-select>
                </el-form-item>
                <el-form-item label="产品入库数量" prop="product_in_warehouse_number">
                    <el-input v-model="formData.product_in_warehouse_number" />
                </el-form-item>
                <el-form-item label="产品入库单价" prop="product_single_price">
                    <el-input v-model="formData.product_single_price" />
                </el-form-item>
                <el-form-item label="入库操作人" prop="product_create_person">
                    <el-input v-model="formData.product_create_person" />
                </el-form-item>
                <el-form-item label="入库备注" prop="in_memo">
                    <el-input v-model="formData.in_memo" :rows="3" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="addProduct">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { reactive, ref, onBeforeUnmount } from 'vue'
    import { createProduct  } from '@/api/product'
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 设置表单item向左对齐
    import type { FormProps } from 'element-plus'
    const labelPosition = ref<FormProps['labelPosition']>('left')
    // 定义title
    const title = ref()
    // bus接受id
    // bus.on('createId',(id:number)=>{
    //     if(id === 1){
    //         title.value = "新建产品管理员"
    //         formData.identity = '产品管理员'
    //     }
    //     if(id === 2){
    //         title.value = "新建用户管理员"
    //         formData.identity = '用户管理员'
    //     }
    //     if(id === 3){
    //         title.value = "新建消息管理员"
    //         formData.identity = '消息管理员'
    //     }
    // })

    const departmentData = ref([])
    // 获取部门数据
    // const getdepartment = async() => {
    //     departmentData.value = await getDepartment()
    // }
    // getdepartment()

    // 为formData添加接口
    interface formData {
        product_id:number,
        product_name:string,
        product_category:string,
        product_unit:string,
        product_in_warehouse_number:number,
        product_single_price:number,
        product_create_person:string,
        in_memo:string
    }

    // 为model创建表单数据对象
    const formData : formData = reactive({
        product_id:null,
        product_name:'',
        product_category:'',
        product_unit:'',
        product_in_warehouse_number:null,
        product_single_price:null,
        product_create_person:'',
        in_memo:''
    })

    //添加表单验证规则
    const rules = reactive({
        product_id: [
            { required: true, message: '请输入入库编号', trigger: 'blur' },
        ],
        product_name: [
            { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],
        product_category: [
            { required: true, message: '请选择产品类别', trigger: 'blur' },
        ],
        product_unit: [
            { required: true, message: '请选择产品单位', trigger: 'blur' },
        ],
        product_in_warehouse_number: [
            { required: true, message: '请输入产品入库数量', trigger: 'blur' },
        ],
        product_single_price: [
            { required: true, message: '请输入产品入库单价', trigger: 'blur' },
        ],
        product_create_person: [
            { required: true, message: '请输入入库操作人的姓名', trigger: 'blur' },
        ],
        in_memo: [
            { required: true, message: '请输入入库备注', trigger: 'blur' },
        ],
    })
    // 通信暂且使用自定义事件
    const emit = defineEmits(['success'])

    // 添加产品 产品入库
    const addProduct = async() => {
        const res = await createProduct(formData)
        if(res.status === 0){
            ElMessage({
                message: '产品入库成功！',
                type: 'success',
            })
            emit('success')
            // bus.emit('adminDialogOff',1)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('产品入库失败，请重新添加')
            // 关闭弹窗
            dialogFormVisible.value = false
        }
    }

    const dialogFormVisible = ref(false)
    // 控制弹窗打开
    // 打开产品入库的弹窗
    const open = ()=>{
        dialogFormVisible.value = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })

    // 取消监听
    // onBeforeUnmount(()=>{
    //     bus.all.clear()
    // })
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