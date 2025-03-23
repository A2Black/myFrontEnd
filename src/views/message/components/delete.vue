<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="删除公告" width="20%" center draggable>
        <div class="warning-text">
            <span>您确认删除公告吗?删除后可在回收站找到</span>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="deletemsg">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref } from 'vue'
    import { 
        firstDelete
    } from '@/api/message'
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

    const messageId = ref()
    // bus接受id
    bus.on('firstdeleteMsgId',(id:number)=>{
        messageId.value = id
    })
   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 删除公告
    const deletemsg = async() => {
        const res = await firstDelete(messageId.value)
        if(res.status === 0){
            ElMessage({
                message: '删除公告成功！',
                type: 'success',
            })
            // 触发事件
            emit('success')
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('删除公告失败！请重新操作')
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