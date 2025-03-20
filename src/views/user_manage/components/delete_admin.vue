<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" title="删除操作" width="30%" center draggable>
        <span v-if="adminid">是否取消该用户的管理员职位?删除后该该用户将展现在用户列表中</span>
        <span v-else>请慎重操作,删除后此用户将永久失去登陆资格</span>
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
        changeAdminToUser, deleteUser
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

    const adminid = ref()
    const userid = ref()
    const useraccount = ref()
    // bus接受id
    bus.on('deleteId',async(id:number)=>{
        adminid.value = id
    })
    // bus接受id
    bus.on('deleteUserId',async(userInfor:any)=>{
        userid.value = userInfor.id
        useraccount.value = userInfor.account
    })

    // 接受success
    const emit = defineEmits(['success'])
    // 对管理员进行降级
    const deleteadmin = async() => {
        // 管理员降职
        if(adminid.value){
            const res = await changeAdminToUser(adminid.value)
            if(res.status === 0){
                ElMessage({
                    message: '对管理员进行降级成功！',
                    type: 'success',
                })
                bus.emit('adminDialogOff',3)
                // 关闭弹窗
                dialogFormVisible.value = false
            }else{
                ElMessage.error('对管理员进行降级失败！请重新操作')
                // 关闭弹窗
                dialogFormVisible.value = false
            }
        }
        // 删除用户
        if(userid.value){
            const res = await deleteUser(userid.value,useraccount.value)
            if(res.status === 0){
                ElMessage({
                    message: '删除用户成功！',
                    type: 'success',
                })
                // 特殊情况1：假设用户在第2页的第一条数据 删除之后，页面变为第1页
                // 特殊情况2：假设用户在第2页，但不是第1条数据 删除之后，页面依然为第2页
                bus.emit('offDialog',3)
                // 关闭弹窗
                dialogFormVisible.value = false
            }else{
                ElMessage.error('删除用户失败！请重新操作')
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

</style>