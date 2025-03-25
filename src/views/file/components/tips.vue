<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="删除文件" width="20%" center >
        <div class="warning-text">
            <span>您确认删除该文件吗?</span>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirmDelFiles">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref } from 'vue'
    import { deleteFile } from '@/api/file'
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

    // 参数
    const fileId = ref()
    const fileName = ref()
    // bus接受id
    bus.on('deleteFileId',(row:any)=>{
        fileId.value = row.id
        fileName.value = row.file_name
    })
   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 删除文件
    const confirmDelFiles = async() => {
        const res = await deleteFile(fileId.value, fileName.value)
        if(res.status === 0){
            ElMessage({
                message: '删除文件成功！',
                type: 'success',
            })
            // 触发事件
            emit('success')
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('删除文件失败！请重新操作')
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