<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="再次申请" width="20%" center >
        <div class="warning-text">
            <span>确认操作将重新发起申请</span>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirmAgainApply">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref, reactive } from 'vue'
    import { 
        applyOutProduct
    } from '@/api/product'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    // 控制弹窗打开
    const dialogFormVisible = ref(false)

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

    const productId = ref()
    // bus接受id
    bus.on('againId',async(row:any)=>{
        formData.id = row.id
        formData.product_name = row.product_name
        formData.product_out_id = row.product_out_id
		formData.product_out_apply_person = row.product_out_apply_person
		formData.product_in_warehouse_number = row.product_in_warehouse_number
		formData.product_single_price = row.product_single_price
		formData.product_out_number = row.product_out_number
        formData.apply_memo = row.apply_memo
    })

   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 再次申请
    const confirmAgainApply = async() => {
        const res = await applyOutProduct(formData)
        if(res.status === 0){
            ElMessage({
                message: '申请出库成功！',
                type: 'success',
            })
            // 触发事件
            emit('success')
            // bus.emit('deleteproductId',3)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('申请出库失败！请重新操作')
            // 关闭弹窗
            dialogFormVisible.value = false
        }
    }

    // 控制弹窗打开
    // 打开弹窗
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
        
        span {
            font-size: 14px;
            color: #606266;
        }
    }
</style>