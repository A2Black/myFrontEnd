<template>
    <el-dialog v-model="dialogPromoteVisible" title="赋权操作" width="30%" center>
        <el-radio-group v-model="radio">
            <el-radio label="产品管理员" size="large" border >产品管理员</el-radio>
            <el-radio label="用户管理员" size="large" border >用户管理员</el-radio>
            <el-radio label="消息管理员" size="large" border >消息管理员</el-radio>
        </el-radio-group>
        <!-- 底部内容-->
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="yes">
                确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { changeUserToAdmin } from '@/api/userinfor'
    // 导入消息提示
    import { ElMessage } from 'element-plus'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"

    const userid = ref()
    bus.on('promoteId',(id:number)=>{
        userid.value = id
    })

    const radio = ref()

    // 点击函数yes
    const yes = async() => {
        const res = await changeUserToAdmin(userid.value,radio.value)
        if(res.status === 0){
            ElMessage({
                message: '创建管理员账号成功！',
                type: 'success',
            })
            bus.emit('offDialog',1)
            // 关闭弹窗
            dialogPromoteVisible.value = false
        }else{
            ElMessage.error('创建管理员账号失败，请重新创建')
            // 关闭弹窗
            dialogPromoteVisible.value = false
        }
    }

    // 弹窗开关
    const dialogPromoteVisible = ref(false)
        
    // 打开编辑管理员的弹窗
    const open = ()=>{
        dialogPromoteVisible.value = true
    }

    // 向外暴露这个api
    defineExpose({
        open
    })

</script>

<style scoped lang="scss">
    .el-radio-group {
        display: flex;
        justify-content: center;
    }
</style>