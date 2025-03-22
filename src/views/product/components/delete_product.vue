<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="删除产品" width="20%" center draggable>
        <div class="warning-text">
            <span>请慎重操作,删除后将失去此产品的所有记录</span>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="deleteproduct">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref } from 'vue'
    import { 
        deleteProduct
    } from '@/api/product'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    const dialogFormVisible = ref(false)
    // 控制弹窗打开
    // 打开删除产品的弹窗
    const open = ()=>{
        dialogFormVisible.value = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })

    const productId = ref()
    // bus接受id
    bus.on('deleteproductId',async(id:number)=>{
        productId.value = id
    })
   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 删除产品
    const deleteproduct = async() => {
        const res = await deleteProduct(productId.value)
        if(res.status === 0){
            ElMessage({
                message: '删除产品成功！',
                type: 'success',
            })
            // 触发事件
            emit('success')
            // bus.emit('deleteproductId',3)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('删除产品失败！请重新操作')
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