<!-- 撤回申请 -->
<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="撤回申请" width="20%" center >
        <div class="warning-text">
            <span>确定撤回此产品的出库申请吗？</span>
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
        withdrawApplyProduct
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

    // 定义withdrawpId
    const withdrawpId = ref()
    // bus接受id
    bus.on('withdrawproductId',async(id:number)=>{
        withdrawpId.value = id
    })
   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 撤回产品出库申请
    const deleteproduct = async() => {
        const res = await withdrawApplyProduct(withdrawpId.value)
        if(res.status === 0){
            ElMessage({
                message: '撤回申请成功！',
                type: 'success',
            })
            // 触发事件
            emit('success')
            // bus.emit('deleteproductId',3)
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('撤回申请失败！请重新操作')
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