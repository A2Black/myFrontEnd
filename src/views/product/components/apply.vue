<!-- 产品申请入库组件 -->
<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="申请出库" width="600px"  align-center draggable>
        <div class="product-name">您申请出库的产品是:&nbsp;&nbsp;{{ formData.product_name }}</div>
        <div class="product-name">该产品剩余库存数量:&nbsp;&nbsp;{{ formData.product_in_warehouse_number }}</div>
        <div class="dialog-content">
            <!-- 表单内容 -->
            <el-form ref="ruleFormRef" :model="formData" :rules="rules" :label-position="labelPosition" label-width="120px">
                <el-form-item label="申请出库编号" prop="product_out_id">
                    <el-input v-model="formData.product_out_id" />
                </el-form-item>
                <el-form-item label="出库单价" prop="product_single_price">
                    <el-input v-model="formData.product_single_price" disabled />
                </el-form-item>
                <el-form-item label="出库数量" prop="product_out_number">
                    <el-input v-model="formData.product_out_number" />
                </el-form-item>
                <el-form-item label="出库申请人" prop="product_out_apply_person">
                    <el-input v-model="formData.product_out_apply_person" />
                </el-form-item>
                <el-form-item label="申请出库备注" prop="apply_memo">
                    <el-input v-model="formData.apply_memo" />
                </el-form-item>
            </el-form>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="applyOutproduct">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref, onBeforeUnmount } from 'vue'
    import { applyOutProduct  } from '@/api/product'
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
    bus.on('applyOutId',(row:any)=>{
        formData.id = row.id
        formData.product_name = row.product_name
        formData.product_single_price = row.product_single_price
        formData.product_in_warehouse_number = row.product_in_warehouse_number
    })

    const departmentData = ref([])
    // 获取部门数据
    // const getdepartment = async() => {
    //     departmentData.value = await getDepartment()
    // }
    // getdepartment()

    // 为formData添加接口
    interface formData {
        id:number,
        product_out_id:number,
        product_single_price:number,
        product_out_number:number,
        product_out_apply_person:string,
        apply_memo:string,
        product_name:string,
        product_in_warehouse_number:number,
    }

    // 为model创建表单数据对象
    const formData : formData = reactive({
        id: null,
        product_single_price:null,
        product_name:'',
        product_out_id:null,
        product_out_number:null,
        product_out_apply_person:'',
        apply_memo:'',
        product_in_warehouse_number:null
    })

    //添加表单验证规则
    const rules = reactive({
        product_out_id: [
            { required: true, message: '请输入申请出库编号', trigger: 'blur' },
        ],
        product_out_number: [
            { required: true, message: '请输入申请出库数量', trigger: 'blur' },
        ],
        product_out_apply_person: [
            { required: true, message: '请输入申请出库人的姓名', trigger: 'blur' },
        ],
        apply_memo: [
            { required: true, message: '请输入申请出库备注', trigger: 'blur' },
        ],
    })
    // 通信暂且使用自定义事件
    const emit = defineEmits(['success'])

    // 申请产品出库
    const applyOutproduct = async() => {
        const res = await applyOutProduct(formData)
        if(res.status === 0){
            ElMessage({
                message: '产品申请出库成功！',
                type: 'success',
            })
            emit('success')
            // bus.emit('adminDialogOff',1)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('产品申请出库失败，请重新申请')
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

    //取消监听
    onBeforeUnmount(()=>{
        bus.all.clear()
    })
</script>

<style lang="scss" scoped>
    .dialog-content {
        display: flex;
        padding: 0px 30px 20px 30px;
        flex-direction: column;
    }

    .product-name {
        display: flex;
        justify-content: center;
        margin: 10px;
        font-size: 16px;
        color: #333;
    }

    :deep(.el-form-item) {
        margin: 30px;
    }
</style>