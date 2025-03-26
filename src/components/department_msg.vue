<template>
    <el-dialog v-model="dialogFormVisible" title="部门消息" width="40%" center draggable>
        <el-container>
            <el-aside width="416px">
                <div class="message-list-wrapped">
                    <div class="list-table-content">
                        <el-table :data="tableData" style="width: 100%" highlight-current-row >
                            <el-table-column type="index" width="50" />
                            <el-table-column prop="message_title" label="主题" >
                                <template #default="{row}">
                                    <div class="title-wrapped">
                                        <div class="title">{{ row.message_title }}</div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="message_level" label="等级">
                                <template #default="{row}">
                                    <el-tag effect="light" type="primary" round v-if="row.message_level=='一般'">{{ row.message_level }}</el-tag>
                                    <el-tag effect="light" type="warning" round v-if="row.message_level=='重要'">{{ row.message_level }}</el-tag>
                                    <el-tag effect="light" type="danger" round v-if="row.message_level=='紧急'">{{ row.message_level }}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="message_publish_time" label="发布时间" >
                                <template #default="{row}">
                                    <div>{{ row.message_publish_time?.slice(0,10) }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <div class="detail-wrapped" v-if="messageInfo.message_title !== ''">
                    <div>{{ messageInfo.message_title }}</div>
                    <div>{{ messageInfo.message_content }}</div>
                </div>
                <div class="detail-wrapped" v-else>
                    <div>请点击左侧列表中的消息查看</div>
                </div>
            </el-main>
        </el-container>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue'
    import { getReadListAndStatus, getDepartmentMsg, getDepartmentMsgList } from '@/api/department_msg'

    // 创建响应式变量
    const tableData = ref([])
    const messageInfo = reactive({
        message_title:'',
        message_content:'',
        // message_level:'',
        // message_publish_time:'',
    })

    // 当前未读消息列表
    const readList = ref([])
    // 获取用户所在部门接收到的消息
    const getUserMessageList = async() => {
        const id = localStorage.getItem('id')
        const department = localStorage.getItem('department')
        // console.log(department)
        // 判断用户是否在该部门
        if(department !== null){
            const res = await getReadListAndStatus(id)
            tableData.value = await getDepartmentMsgList(department)
            if(res[0].read_status == 0){
                const {
                    read_list
                } = await getDepartmentMsg(id,department)
                readList.value = read_list
            }
            else {
                readList.value = JSON.parse(res[0].read_list)
            }
        }        
    }
    getUserMessageList()

    // 创建用于控制对话框是否可见的响应式变量
    // 默认值为false，表示对话框隐藏
    const dialogFormVisible = ref(false)
    // 控制弹窗打开
    // 打开删除产品的弹窗
    const open = ()=>{
        dialogFormVisible.value = true
    }
    // 向外暴露这个方法
    defineExpose({
        open
    })
</script>

<style scoped lang="scss">
    .el-aside {
        padding-left: 8px;
        min-height: 500px;
    }

	.el-main {
		min-height: 500px;
		--el-main-padding: 0px;
		border-left: 1px solid #eee;
	}

	.message-list-wrapped {
		height: 500px;
	}

	.list-table-content {
		min-height: 10px;
		padding: 8px;
	}

	.el-table {
		height: 100%;

		.title-wrapped {
			display: flex;
			align-items: center;
		}

		.title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.readed {
		display: block;
		width: 5px;
		padding: 1px;
		height: 5px;
		border-radius: 50%;
		background: #A9A9A9;
	}

	.noread {
		display: block;
		width: 5px;
		padding: 1px;
		height: 5px;
		border-radius: 50%;
		background: #FFA500;
	}

	.detail-wrapped {
		padding: 8px;
	}
</style>