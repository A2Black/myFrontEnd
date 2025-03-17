<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="删除操作" width="30%" center draggable>
        <span>是否取消该用户的管理员职位?删除后该该用户将展现在用户列表中</span>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="deleteadmin">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import { onBeforeUnmount, ref } from 'vue'
    import { 
        changeAdminToUser
    } from '@/api/userinfor'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    const dialogFormVisible = ref(false)
    // 控制弹窗打开
    // 打开编辑管理员的弹窗
    const open = ()=>{
        dialogFormVisible.value = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })

    const userid = ref()
    // bus接受id
    bus.on('deleteId',async(id:number)=>{
        userid.value = id
    })
    // 接受success
    const emit = defineEmits(['success'])
    // 对管理员进行降级
    const deleteadmin = async() => {
        const res = await changeAdminToUser(userid.value)
        if(res.status === 0){
            ElMessage({
                message: '对管理员进行降级成功！',
                type: 'success',
            })
            // 发送success
            emit('success')
            // 关闭弹窗
            dialogFormVisible.value = false
        }else{
            ElMessage.error('对管理员进行降级失败！请重新操作')
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

</style>