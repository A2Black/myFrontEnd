<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="清空登录日志" width="20%" center >
        <div class="warning-text">
            <span>您确认清空登录日志吗?</span>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirmClearLlog">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { clearLoginLogList } from '@/api/login_log'
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    const dialogFormVisible = ref(false)
    // 控制弹窗打开
    // 打开弹窗
    const open = ()=>{
        dialogFormVisible.value = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })
   
    // 自定义触发事件
    const emit = defineEmits(['success'])
    // 确认清空日志
    const confirmClearLlog = async() => {
        const res = await clearLoginLogList()
        if(res.status === 0){
            ElMessage({
                message: '登录日志已清空！',
                type: 'success',
            })
            // 触发事件
            emit('success')
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('登录日志清空失败！请重新操作')
            // 关闭弹窗
            dialogFormVisible.value = false
        }
    }
        
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