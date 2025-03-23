<!-- 创建和编辑消息的组件 -->
<template>
    <!-- 添加管理员对话窗 -->
    <el-dialog v-model="dialogFormVisible" :title="title" width="46%" center align-center :destroy-on-close="true" append-to-body >
        <div class="dialog-content">
            <el-form :model="formData" label-width="auto" style="max-width: 600px" :rules="rules" :label-position="labelPosition">
                <el-form-item label="主题" prop="message_title">
                    <el-input v-model="formData.message_title" />
                </el-form-item>
                <el-form-item label="发布部门" prop="message_publish_department" v-if="title=='发布公告'||title=='编辑公告'">
                    <el-select v-model="formData.message_publish_department" placeholder="请选择发布部门">
                        <el-option label="五色眼" value="五色眼" />
						<el-option label="深空动力研究院" value="深空动力研究院" />
                        <el-option label="外星生态工程部" value="外星生态工程部" />
                        <el-option label="星际资源事业部" value="星际资源事业部" />
					</el-select>
                </el-form-item>
                <el-form-item label="发布人" prop="message_publish_name">
                    <el-input v-model="formData.message_publish_name" />
                </el-form-item>
                <el-form-item label="接收部门" prop="message_receipt_object" placeholder="请选择接收部门" v-if="title=='发布公告'||title=='编辑公告'">
                    <el-select v-model="formData.message_receipt_object" >
						<el-option label="深空动力研究院" value="深空动力研究院" />
                        <el-option label="外星生态工程部" value="外星生态工程部" />
                        <el-option label="星际资源事业部" value="星际资源事业部" />
					</el-select>
                </el-form-item>
                <el-form-item label="公告等级" prop="message_level" v-if="title=='发布公告'||title=='编辑公告'">
                    <el-select v-model="formData.message_level" placeholder="请选择公告等级">
						<el-option label="一般" value="一般" />
                        <el-option label="重要" value="重要" />
                        <el-option label="紧急" value="紧急" />
					</el-select>
                </el-form-item>
                <el-form-item label="内容" prop="message_content">
                    <div style="border: 1px solid #ccc">
                    <!-- wangEditor结构 --> 
                        <Toolbar style="border-bottom: 1px solid #ccc ; width: 600px;" :editor="editorRef" :defaultConfig="toolbarConfig"
                            :mode="mode" />
                        <Editor style="height: 300px; overflow-y: hidden; width: 600px;" v-model="valueHtml" :defaultConfig="editorConfig"
                            :mode="mode" @onCreated="handleCreated" />
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <!-- 底部内容-->
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="yes">
                确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    
</template>

<script setup lang="ts">
    import {
		onBeforeUnmount, ref, shallowRef,
		reactive
	} from 'vue'
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 导入消息提示
    import { ElMessage, FormProps } from 'element-plus'
    // 导入接口
    import { publishMessage, editMessage } from '@/api/message.js'

    
    // 创建labelPosition
    const labelPosition = ref<FormProps['labelPosition']>('right')
    // 标题
    const title = ref()

    // 定义表单数据对象类型
    interface FormData {
		id : number;
		message_title : string;
		message_publish_department : string;
		message_publish_name : string;
		message_category : string;
		message_receipt_object : string;
		message_level : string;
		message_content : string;
	}
    // 定义表单数据对象
    const formData : FormData = reactive({
        id: 0,
		message_title: '',
		message_publish_department: '',
		message_publish_name: localStorage.getItem('name'),
		message_category: '',
		message_receipt_object: '',
		message_level: '',
		message_content: '',
    })
    
    // bus接受
    // 发布公告 发布系统消息
    bus.on('createMId',(id:number)=>{
        if(id == 1){
            title.value = "发布公告"
            valueHtml.value = ''	
            formData.message_title = ''
        }
        if(id == 2){
            title.value = "发布系统消息"
            valueHtml.value = ''	
            formData.message_title = ''
        }
        
    })
    // 编辑公告
    bus.on('editMId',(row:any)=>{
        title.value = "编辑公告"
		valueHtml.value = ''
		formData.id = row.id
		formData.message_title = row.message_title
		formData.message_publish_department = row.message_publish_department
		formData.message_publish_name = row.message_publish_name
		formData.message_receipt_object = row.message_receipt_object
		formData.message_level = row.message_level
		formData.message_content = row.message_content
    })
    // 编辑系统消息
    bus.on('editSystemMId',(row:any)=>{
        title.value = "编辑系统消息"
		valueHtml.value = ''
		formData.id = row.id
		formData.message_title = row.message_title
		formData.message_publish_name = row.message_publish_name
		formData.message_content = row.message_content
    })

    // 子传父 自定义事件
    const emit = defineEmits(['success'])
    // 确认发布消息
    const yes = async() => {
        if (title.value == '发布公告') {
			formData.message_category = '公司公告'
            // 将富文本内容赋值给message_content
            formData.message_content = valueHtml.value
			const res = await publishMessage(formData)
			if (res.status == 0) {
				ElMessage({
					message: '发布公告成功',
					type: 'success',
				})
				emit('success')
				dialogFormVisible.value = false
			} else {
				ElMessage.error('发布公告失败')
				dialogFormVisible.value = false
			}
		}
		if (title.value == '编辑公告') {
            formData.message_content = valueHtml.value
            const res = await editMessage(formData)
			if (res.status == 0) {
				ElMessage({
					message: '编辑公告成功',
					type: 'success',
				})
				emit('success')
				dialogFormVisible.value = false
			} else {
				ElMessage.error('编辑公告失败')
				dialogFormVisible.value = false
			}
		}
        if (title.value == '发布系统消息') {
            formData.message_category = '系统消息'
            // 将富文本内容赋值给message_content
            formData.message_content = valueHtml.value
			const res = await publishMessage(formData)
			if (res.status == 0) {
				ElMessage({
					message: '发布系统消息成功',
					type: 'success',
				})
				emit('success')
				dialogFormVisible.value = false
			} else {
				ElMessage.error('发布系统消息失败')
				dialogFormVisible.value = false
			}
		}
        if (title.value == '编辑系统消息') {
            formData.message_content = valueHtml.value
            const res = await editMessage(formData)
			if (res.status == 0) {
				ElMessage({
					message: '编辑系统消息成功',
					type: 'success',
				})
				emit('success')
				dialogFormVisible.value = false
			} else {
				ElMessage.error('编辑系统消息失败')
				dialogFormVisible.value = false
			}
		}
    }

    // 编辑器实例，必须用 shallowRef
	const editorRef = shallowRef()
	// mode
	const mode = ref('default')
	// 内容 HTML
	const valueHtml = ref()
	const toolbarConfig = {
		excludeKeys: []
	}
	const editorConfig = {
		placeholder: '请输入公告内容...',
		MENU_CONF: {
			
		}
	}
	// 上传图片，修改 uploadImage 菜单配置
	// 需要注意的是，如何去修改参数？
	toolbarConfig.excludeKeys = [
		'blockquote',
		'bgColor',
		'color',
		'group-more-style',
		// 'fontFamily',
		'bulletedList',
		'numberedList',
		'lineHeight',
		'todo',
		// 'emotion',
		'insertLink',
		'group-video',
		'insertTable',
		'codeBlock',
		'divider',
		'fullScreen',
		'group-image',

		// 排除菜单组，写菜单组 key 的值即可
	]

    // 组件销毁时，也及时销毁编辑器
	onBeforeUnmount(() => {
		const editor = editorRef.value
		if (editor == null) return
		editor.destroy()
	})

	const handleCreated = (editor : any) => {
		editorRef.value = editor // 记录 editor 实例，重要！
	}

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

    //添加表单验证规则
    const rules = reactive({
        message_title: [
			{ required: true, message: '请输入公告标题', trigger: 'blur' },
		],
		message_publish_department: [
			{ required: true, message: '请选择发布部门', trigger: 'blur' },
		],
		message_publish_name: [
			{ required: true, message: '请输入发布人', trigger: 'blur' },
		],
		message_receipt_object: [
			{ required: true, message: '请选择的接收对象', trigger: 'blur' },
		],
		message_level: [
			{ required: true, message: '请选择公告等级', trigger: 'blur' },
		],
        message_content: [
			{ required: true, message: '请输入公告内容', trigger: 'blur' },
		],
    })
</script>

<style lang="scss" scoped>
    .dialog-content {
		display: flex;
		padding: 20px 30px;
		flex: 1;
		max-height: 800px;
		overflow: auto;
	}

	.el-dialog__body {
		padding: 0;
	}

	.el-input {
		width: 240px;
	}

	.dialog-footer {
		display: flex;
		justify-content: flex-end;
	}

	.el-form-item {
		margin: 16px;
	}

	:deep(.w-e-text-container p) {
		margin: 0;
	}
</style>