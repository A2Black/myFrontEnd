<template>
    <!-- 用户信息弹窗 -->
    <el-dialog v-model="dialogUserVisible" title=" 用户信息" width="500px" draggable class="userInfoDialog">
        <el-container>
            <el-aside width="200px">
                <el-avatar :size="120" :src="userData.imageUrl" />
            </el-aside>
            <el-main>
                <div>账号: {{ userData.account }}</div>
                <div>姓名: {{ userData.name }}</div>
                <div>性别: {{ userData.sex }}</div>
                <div>部门: {{ userData.department }}</div>
                <div>邮箱: {{ userData.email }}</div>
                <div>状态：
                    <span v-if="userData.status===0">正常</span>
                    <span v-else>冻结</span>
                </div>
            </el-main>
        </el-container>
        <el-footer>
            <span @click="openEdit(userData.id)">编辑</span>
            <span @click="openPromote(userData.id)">赋权</span>
            <span @click="openDelete(userData.id)">删除用户</span>
        </el-footer>
    </el-dialog>
    <promote ref='pro'></promote>
    <editUesr ref="edituser"></editUesr>
    <remove ref="deleteuser"></remove>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue'
    // 导入一般组件
    import promote from '../components/promote.vue'
    // 导入一般组件
    import editUesr from '../components/edit_user.vue'
    // 导入一般组件
    import remove from '../components/delete_admin.vue'

    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    bus.on('userId',(row:any)=>{
        userData.id = row.id
        userData.imageUrl = row.image_url
        userData.account = row.account
        userData.name = row.name
        userData.sex = row.sex
        userData.department = row.department
        userData.email = row.email
        userData.status = row.status
    })

    // 用户数据
    const userData = reactive({
        id:0,
        imageUrl:'',
        account:0,
        name:'',
        sex:'',
        department:'',
        email:'',
        status:0
    })

    // 赋权成功关闭user_info弹窗
    bus.on('offDialog', (id : number) => {
		if (id) {
			dialogUserVisible.value = false
		}
	})

    // 对用户进行赋权
    const pro = ref()
    const openPromote = (id:number) => {
        bus.emit('promoteId',id)
        pro.value.open()
    }

    // 对用户进行编辑
    const edituser = ref()
    const openEdit = (id:number) => {
        bus.emit('editId',id)
        edituser.value.open()
    }

    // 对用户进行删除
    const deleteuser = ref()
    const openDelete = (id:number) => {
        let userInfor = {
            id:id,
            account:userData.account
        }
        bus.emit('deleteUserId', userInfor)
        deleteuser.value.open()
    }

    // user_info弹窗开关
    const dialogUserVisible = ref(false)
    
    // 打开user_info的弹窗
    const open = ()=>{
        dialogUserVisible.value = true
    }
    // 向外暴露这个api
    defineExpose({
        open
    })

</script>

<style lang="scss" scoped>
    .el-main>div {
        margin-bottom: 8px;
    }
    .el-main {
        --el-main-padding: 0;
    }

    .el-footer {
        display: flex;
        justify-content: flex-end;
        --el-footer-height:12px;

        span {
            margin-left: 8px;
            color: #409eff;
            cursor: pointer;
        }
    }
</style>