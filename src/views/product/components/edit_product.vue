<!-- 产品申请入库组件 -->
<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="编辑产品信息" width="600px"  align-center draggable>
        <div class="dialog-content">
            <!-- 表单内容 -->
            <el-form ref="ruleFormRef" :model="formData" :rules="rules" :label-position="labelPosition" label-width="120px">
                <el-form-item label="入库编号" prop="product_id">
                    <el-input v-model="formData.product_id" disabled />
                </el-form-item>
                <el-form-item label="产品名称" prop="product_name">
                    <el-input v-model="formData.product_name" />
                </el-form-item>
                <el-form-item label="产品类别" prop="department">
                    <el-select v-model="formData.product_category" placeholder="请选择产品类别">
                        <el-option v-for="item in productCategoryData" :key="item" :label="item" :value="item" />
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
                <el-form-item label="入库负责人" prop="product_create_person" >
                    <el-input v-model="formData.product_create_person" disabled />
                </el-form-item>
                <el-form-item label="入库备注" prop="in_memo">
                    <el-input v-model="formData.in_memo" :rows="3" type="textarea" />
                </el-form-item>
            </el-form>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="editproduct">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref, onBeforeUnmount } from 'vue'
    import { editProduct  } from '@/api/product'
    import { getProduct } from '@/api/setting'
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
    bus.on('editproductId',(row:any)=>{
        formData.id = row.id
        formData.product_id = row.product_id
        formData.product_name = row.product_name
        formData.product_category = row.product_category
        formData.product_unit = row.product_unit
        formData.product_in_warehouse_number = row.product_in_warehouse_number
        formData.product_single_price = row.product_single_price
        formData.product_create_person = row.product_create_person
        formData.in_memo = row.in_memo
    })

    // 创建产品类别数组
    const productCategoryData = ref([])
    // 向产品类别数组中添加数据
    const getProductCategoryData = async() => {
        productCategoryData.value = await getProduct()
    }
    getProductCategoryData()

    // 为formData添加接口
    interface formData {
        id:number,
        product_id:null,
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
        id:null,
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
            { required: true, message: '请选择产品类别', trigger: 'change' },
        ],
        product_unit: [
            { required: true, message: '请选择产品单位', trigger: 'change' },
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
    const editproduct = async() => {
        const res = await editProduct(formData)
        if(res.status === 0){
            ElMessage({
                message: '编辑产品信息成功！',
                type: 'success',
            })
            // 出发自定义事件
            emit('success')
            // bus.emit('adminDialogOff',1)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('编辑产品信息失败，请重新编辑')
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