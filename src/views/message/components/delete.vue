<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" :title="title" width="20%" center draggable>
        <div class="warning-text">
            <span v-if="title =='删除消息'">您确认删除公告吗?删除后可在回收站找到</span>
            <span v-else-if="title == '还原操作'">您确认还原公告吗?</span>
            <span v-else-if="title == '永久删除消息'" >您确认永久删除公告吗?</span>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="operationMessage">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref } from 'vue'
    import { 
        firstDelete,
        recover,
        deleteMessage
    } from '@/api/message'
    import { changeUserReadListButDelete, changeUserReadList } from '@/api/department_msg'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    // 导入useMessageStore
    import { useMessageStore } from '@/store/message'
	// 创建实例
	const messageStore = useMessageStore()

    // 控制弹窗打开
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

    // title
    const title = ref()

    // 消息id
    const messageId = ref()
    // 接受部门
    const messageReceiptDepartmen = ref()
    
    // bus接受id
    bus.on('firstdeleteMsgId',(row:any)=>{
        title.value = '删除消息'
        messageId.value = row.id
        messageReceiptDepartmen.value = row.message_receipt_object
    })
    bus.on('reMessageId',(row:any)=>{
        title.value = '还原操作'
        messageId.value = row.id
        messageReceiptDepartmen.value = row.message_receipt_object
    })
    bus.on('realDeleteId',(id:number)=>{
        title.value = '永久删除公告'
        messageId.value = id
    })
   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 处理公告
    const operationMessage = async() => {
        if (title.value == '删除消息') {
            const res = await firstDelete(messageId.value)
            // console.log(messageReceiptDepartmen.value,messageId.value);
            if(res.status === 0){
                ElMessage({
                    message: '删除公告成功！',
                    type: 'success',
                })
                await changeUserReadListButDelete(messageReceiptDepartmen.value,messageId.value)
                // 部门消息删除成功
                messageStore.returnReadList(localStorage.getItem('id'))
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
        if (title.value == '还原操作') {
            const res = await recover(messageId.value)
            if(res.status === 0){
                ElMessage({
                    message: '还原公告成功！',
                    type: 'success',
                })
                // 部门消息还原成功
                await changeUserReadList(messageReceiptDepartmen.value,messageId.value)
                // 更新用户未读列表，更新徽章
                messageStore.returnReadList(localStorage.getItem('id'))
                // 触发事件
                emit('success')
                // 关闭弹窗
                dialogFormVisible.value = false
            }else{
                ElMessage.error('还原公告失败！请重新操作')
                // 关闭弹窗
                dialogFormVisible.value = false
            }
        }
        if (title.value == '永久删除公告') {
            const res = await deleteMessage(messageId.value)
            if(res.status === 0){
                ElMessage({
                    message: '永久删除公告成功！',
                    type: 'success',
                })
                // 触发事件
                emit('success')
                // 关闭弹窗
                dialogFormVisible.value = false
            }else{
                ElMessage.error('永久删除公告失败！请重新操作')
                // 关闭弹窗
                dialogFormVisible.value = false
            }
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