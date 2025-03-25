<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="审核产品" width="20%" center draggable>
        <div class="warning-text">
            <span>是否同意本产品的出库?</span>
                <el-radio-group v-model="formData.product_out_status">
                <el-radio label="同意" size="large">同意</el-radio>
                <el-radio label="否决" size="large">否决</el-radio>
                </el-radio-group>
                <el-input
                    v-model="formData.audit_memo"
                    style="width: 240px"
                    :rows="3"
                    type="textarea"
                    placeholder="请输入审核备注"
                />
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="auditproduct">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref, reactive } from 'vue'
    import { 
        auditProduct
    } from '@/api/product'
    import { tracking } from '@/utils/operation.js'
    // 导入useUserInforStore
    import { useUserInforStore } from '@/store/userinfo.js'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    const dialogFormVisible = ref(false)
    // 创建实例
    const userStore = useUserInforStore()

    // 表单对象
    const formData = reactive({
        id: 0,
		product_name:'',
		product_out_id: 0,
		product_out_status: '',
		audit_memo: '',
		product_out_price: 0,
		product_out_audit_person: userStore.name,
		product_out_apply_person: '',
    	product_in_warehouse_number: 0,
		product_single_price: 0,
		product_out_number: '',
		product_apply_time:''
    })

    // bus接受id
    bus.on('auditproductId',(row:any)=>{
        formData.id = row.id
		formData.product_out_id = row.product_out_id
		formData.product_name = row.product_name
        formData.product_out_status = row.product_out_status
		formData.audit_memo = row.audit_memo
		formData.product_out_price = row.product_out_price
		formData.product_out_apply_person = row.product_out_apply_person
		formData.product_in_warehouse_number = row.product_in_warehouse_number
		formData.product_single_price = row.product_single_price
		formData.product_out_number = row.product_out_number
		formData.product_apply_time = row.product_apply_time
    })
   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 审核产品
    const auditproduct = async() => {
        const res = await auditProduct(formData)
        console.log(res);
        if(res.status === 0){
            ElMessage({
                message: '审核产品成功！',
                type: 'success',
            })
            // 触发事件
            emit('success')
            tracking('产品入库',localStorage.getItem('name'),formData.product_name,'一般',0)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('审核产品失败！请重新操作')
            // 关闭弹窗
            dialogFormVisible.value = false
        }
    }
    
    // 控制弹窗打开
    // 打开审核产品的弹窗
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
    .warning-text {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
        flex-direction: column;
        
        span {
            font-size: 14px;
            color: #606266;
        }
    }
</style>