<template>
    <el-dialog v-model="dialogFormVisible" :title="title" width="40%" center draggable>
        <el-container>
            <el-main>
                <!-- 主题 -->
                <div class="title">{{ message.message_title }}</div>
                <!-- 内容 -->
                 <!-- v-html 会将数据解析为 HTML 代码并渲染到页面上 -->
                <div v-html="message.message_content"></div>
            </el-main>
            <el-aside width="200px">
                <div class="pub-msg" v-if="title == '公司公告'">发布部门：{{ message.message_publish_department }}</div>
                <div class="pub-msg">发布人：{{ message.message_publish_name }}</div>
                <div class="pub-msg">类别：{{ message.message_category }}</div>
                <div class="pub-msg" v-if="title == '公司公告'">等级：
                    <template>
                        <el-tag effect="light" type="primary" round v-if="message.message_level == '一般'">{{ message.message_level }}</el-tag>
                        <el-tag effect="light" type="warning" round v-if="message.message_level == '重要'">{{ message.message_level }}</el-tag>
                        <el-tag effect="light" type="danger" round v-if="message.message_level == '紧急'">{{ message.message_level }}</el-tag>
                    </template>
                </div>
                <div class="pub-msg">发布时间：
                    <template> 
                        <div>{{ message.message_publish_time?.slice(0,10) }}</div>
                    </template>
                </div>
            </el-aside>
        </el-container>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, reactive, onBeforeUnmount } from 'vue'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"

    // bus接收数据
    bus.on('homeCompany',(row:any) => {
        title.value = '公司公告'
        message.message_title = row.message_title
        message.message_content = row.message_content
        message.message_publish_department = row.message_publish_department
        message.message_category = row.message_category
        message.message_level = row.message_level
        message.message_publish_name = row.message_publish_name
        message.message_publish_time = row.message_publish_time
    })
    bus.on('homeSystem',(row:any) => {
        title.value = '系统消息'
        message.message_title = row.message_title
        message.message_content = row.message_content
        message.message_publish_department = row.message_publish_department
        message.message_category = row.message_category
        message.message_level = row.message_level
        message.message_publish_name = row.message_publish_name
        message.message_publish_time = row.message_publish_time
    })

    // 类型
    interface message {
        message_title: string,
        message_content: string,
		message_publish_department: string,
		message_category: string,
		message_level: string,
		message_publish_name: string,
		message_publish_time: string,
    }

    // 创建响应式变量
    const title = ref('')
    const message : message = reactive({
        message_title: '',
		message_content: '',
		message_publish_department: '',
		message_category: '',
		message_level: '',
		message_publish_name: '',
		message_publish_time: '',
    })

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

    // 取消监听
    onBeforeUnmount(()=>{
        bus.all.clear()
    })
</script>

<style scoped lang="scss">
    	.el-main {
		min-height: 500px;
		--el-main-padding: 0px;
		border-right: 1px solid #eee;
	}

	.el-aside {
		padding-right: 8px;
	}

	.title {
		height: 32px;
		line-height: 32px;
		font-size: 16px;
		margin-bottom: 8px;
		margin-left: 8px;
		border-bottom: 1px solid #eee;
	}

	.content {
		text-align: center;
	}

	.pub-msg {
		height: 32px;
		line-height: 32px;
		font-size: 16px;
		margin-bottom: 8px;
		margin-left: 8px;
		border-bottom: 1px solid #eee;
	}
</style>