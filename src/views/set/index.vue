<template>
    <!-- 外壳 -->
    <div class="common-wrapped">
        <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
        <!-- 内容 -->
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="账号详情" name="first">
                    <!-- 用户头像信息盒子 -->
                    <div class="account-infor-wrapped">
                        <span>头像：</span>
                        <div class="account-infor-content">
                            <!-- action是上传头像的接口 -->
                            <el-upload
                                class="avatar-uploader" action="http://127.0.0.1:3007/user/uploadAvatar"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                        </div>
                    </div>
                    <!-- 用户账号盒子 -->
                    <div class="account-infor-wrapped">
                        <span>账号：</span>
                        <div class="account-infor-content">
                            <!-- disabled不可修改 -->
                            <el-input v-model="userStore.account" disabled></el-input>
                        </div>
                    </div>
                    <!-- 用户修改密码盒子 -->
                    <div class="account-infor-wrapped">
                        <span>密码：</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openChangePassword">修改密码</el-button>
                        </div>
                    </div>
                    <!-- 用户姓名盒子 -->
                    <div class="account-infor-wrapped">
                        <span>姓名：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userStore.name"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveName">保存</el-button>
                        </div>
                    </div>
                    <!-- 用户性别盒子 -->
                    <div class="account-infor-wrapped">
                        <span>性别：</span>
                        <div class="account-infor-content">
                            <el-select v-model="userStore.sex">
                                <el-option label="男" value="男" />
                                <el-option label="女" value="女" />
                            </el-select>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveSex">保存</el-button>
                        </div>
                    </div>
                    <!-- 用户身份盒子 -->
                    <div class="account-infor-wrapped">
                        <span>身份：</span>
                        <div class="account-infor-content">
                            <!-- disabled不可修改 -->
                            <el-input v-model="userStore.identity" disabled></el-input>
                        </div>
                    </div>
                    <!-- 所属部门盒子 -->
                    <div class="account-infor-wrapped">
                        <span>部门：</span>
                        <div class="account-infor-content">
                            <!-- disabled不可修改 -->
                            <el-input v-model="userStore.department" disabled></el-input>
                        </div>
                    </div>
                    <!-- 用户邮箱盒子 -->
                    <div class="account-infor-wrapped">
                        <span>邮箱：</span>
                        <div class="account-infor-content">
                            <el-input v-model="userStore.email"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="saveEmail">保存</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公司信息" name="second">
                    <div class="account-infor-wrapped">
                        <span>公司名称：</span>
                        <div class="account-infor-content">
                            <el-input v-model="companyName"></el-input>
                        </div>
                        <div class="account-save-button">
                            <el-button type="primary" @click="changeCompanyname">编辑公司名称</el-button>
                        </div>
                    </div>
                    <div class="account-infor-wrapped">
                        <span>公司介绍：</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(1)">编辑公司介绍</el-button>
                        </div>
                    </div>
                    <div class="account-infor-wrapped">
                        <span>公司架构：</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(2)">编辑公司架构</el-button>
                        </div>
                    </div>
                    <div class="account-infor-wrapped">
                        <span>公司战略：</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(3)">编辑公司战略</el-button>
                        </div>
                    </div>
                    <div class="account-infor-wrapped">
                        <span>公司高层：</span>
                        <div class="account-infor-content">
                            <el-button type="primary" @click="openEditor(4)">编辑公司高层</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="首页管理" name="third">
					<div class="home-wrapped">
						<!-- 提示语 -->
						<div class="tips">
							<span>提示：点击图片框进行切换首页轮播图</span>
						</div>
						<!-- 轮播图部分 -->
						<div class="swiper-wrapped" v-for="(item,index) in swiperData" :key='index'>
							<div class="swiper-name">轮播图{{index+1}}:&nbsp;&nbsp;</div>
							<el-upload
								class="avatar-uploader"
								action="http://127.0.0.1:3007/set/uploadSwiper"
								:show-file-list="false"
								:on-success="handleSwiperSuccess"
								:before-upload="beforeAvatarUpload" :data='item'>
								<template #trigger>
									<img v-if="imageUrl[index]" :src="imageUrl[index]" class="swiper" />
									<img src="@/assets/logo.png" alt="" v-else>
								</template>
							</el-upload>
						</div>
					</div>
				</el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">
                    <div class="other-set">
                        <div class="department-set">
                            <span>部门设置:</span>
                                <div class="flex gap-2">
                                    <el-tag
                                    v-for="tag in dynamicTags"
                                    :key="tag"
                                    size="large"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(tag)"
                                    >
                                    {{ tag }}
                                    </el-tag>
                                    <el-input
                                    v-if="inputVisible"
                                    ref="InputRef"
                                    v-model="inputValue"
                                    class="w-20"
                                    size="small"
                                    @keyup.enter="handleInputConfirm"
                                    @blur="handleInputConfirm"
                                    />
                                    <el-button v-else class="button-new-tag" @click="showInput">
                                    +添加新部门
                                    </el-button>
                                </div>
                        </div>
                        <div class="product-set">
                            <span>产品设置:</span>
                                <div class="flex gap-2">
                                    <el-tag
                                    v-for="tag in dynamicProductTags"
                                    :key="tag"
                                    closable
                                    size="large"
                                    :disable-transitions="false"
                                    @close="handleCloseProduct(tag)"
                                    >
                                    {{ tag }}
                                    </el-tag>
                                    <el-input
                                    v-if="inputProductVisible"
                                    ref="InputProductRef"
                                    v-model="inputPruductValue"
                                    class="w-20"
                                    size="small"
                                    @keyup.enter="handleInputProductConfirm"
                                    @blur="handleInputProductConfirm"
                                    />
                                    <el-button v-else class="button-new-tag" @click="showProductInput">
                                    +添加新产品类别
                                    </el-button>
                                </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <!-- 修改密码弹窗 -->
    <change ref="changeP"></change>
    <editor ref="editorP"></editor>
</template>

<script lang="ts" setup>
    import {
        ref, 
        reactive, 
        nextTick,
        toRaw
    }from 'vue'
    import { ElMessage } from 'element-plus'

    import { Plus } from '@element-plus/icons-vue'

    import type { UploadProps, ElInput } from 'element-plus'
    import type { InputInstance } from 'element-plus'
    // 导入封装后的面包屑组件
    import breadCrumb from '@/components/bread_crumb.vue'
    // 导入useUserInforStore
    import { useUserInforStore } from '@/store/userinfo'
	// 导入获取、修改公司名称的api
	import { getCompanyName,changeCompanyName,getAllSwiper,setDepartment,getDepartment, setProduct, getProduct } from '@/api/setting'
    // 导入修改姓名,性别,邮箱的api
    import { changeName,changeSex,changeEmail } from '@/api/userinfor'
    // 导入修改密码组件
    import change from './components/change_password.vue'
    // 导入绑定账号
    import { bind } from '@/api/userinfor'
    // 导入editor组件
    import editor from './components/editor.vue'
    // 全局总线bus
    import { bus } from "@/utils/mitt.js"
    // 创建实例
    const userStore = useUserInforStore()
    const changeP  = ref()
    // 默认打开的标签页
    const activeName = ref('first')
    // 面包屑
    const breadcrumb = ref()
    // 面包屑参数
    const item = ref({
        first:'系统设置',
    })

    // 头像上传成功的函数
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
    ) => {
        if(response.status == 0){
            userStore.$patch({
                imageUrl:response.url
            })
            ElMessage({
                message: '头像更新成功！',
                type: 'success',
            }),
            (async()=>{
                await bind(userStore.account,response.onlyId,response.url)
            })()
        }else{
            ElMessage.error('头像更新失败!请重新上传')
        }
    }
    // 头像上传之前的函数
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg') {
    //     ElMessage.error('头像请上传jpg格式!')
    //     return false
    //} else 
    if (rawFile.size / 1024 / 1024 > 6) {
        ElMessage.error('头像大小请不要超过6MB!')
        return false
    }
    return true
    }

    // 账号详情
    const AccountDetailData = reactive({
        account:'',
        name:'',
        sex:'',
        identity:'',
        department:'',
        email:''
    })

    // 打开密码弹窗
    const openChangePassword =()=>{
        changeP.value.open();
    }

    // 保存姓名的点击函数
    const saveName = async()=>{
        const res = await changeName(localStorage.getItem('id'),userStore.name)
        console.log(res)
        if(res.status == 0){
                ElMessage({
                message: '修改成功！',
                type: 'success',
                })
            }else{
                ElMessage.error('修改失败,请重新输入')
            }
    }

	// 保存性别的点击函数
	const saveSex = async()=>{
	const res = await changeSex(localStorage.getItem('id'),userStore.sex)
	console.log(res)
	if(res.status == 0){
			ElMessage({
			message: '修改成功！',
			type: 'success',
			})
		}else{
			ElMessage.error('修改失败,请重新输入')
		}
    }

	// 保存邮箱的点击函数
	const saveEmail = async()=>{
	const res = await changeEmail(localStorage.getItem('id'),userStore.email)
	console.log(res)
	if(res.status == 0){
			ElMessage({
			message: '修改成功！',
			type: 'success',
			})
		}else{
			ElMessage.error('修改失败,请重新输入')
		}
    }

    // 公司信息
    // 公司名称
    const companyName = ref()
	// 获取公司名字
	const getCompanyname = async()=>{
		companyName.value = await getCompanyName()
	}
	//调用getCompanyname函数
	getCompanyname()
	
	//修改公司名称
	const changeCompanyname = async()=>{
		const res = await changeCompanyName(companyName.value)
		if(res.status == 0){
			ElMessage({
			message: '修改成功！',
			type: 'success',
			})
		}else{
			ElMessage.error('修改失败,请重新输入!')
		}
	}
	
	//富文本相关
    const editorP = ref()
    // 打开富文本
    const openEditor = (id:number)=>{
        //第一个参数用来标记 第二个参数用来传入的值
        bus.emit('editorTitle',id)
		// 打开弹窗
		editorP.value.open();
    }
	// 首页管理
		const swiperData = [{
			name: 'swiper1'
		}, {
			name: 'swiper2'
		}, {
			name: 'swiper3'
		}, {
			name: 'swiper4'
		}, {
			name: 'swiper5'
		}]
	
	//轮播图上传成功
	const handleSwiperSuccess: UploadProps['onSuccess'] = (
	    response,
	) => {
	    getAllswiper()
	}
	
	// 轮播图
	const imageUrl = ref([]) 
	
	// 获取所有轮播图
	const getAllswiper = async()=>{
		const res = await getAllSwiper()
        //console.log(res)
        imageUrl.value = res
	}
	// 调用getAllswiper
	getAllswiper()

    // ..............................................其他设置.......................................
    // 部门设置
    const inputValue = ref('')
    const dynamicTags = ref([])
    const inputVisible = ref(false)
    const InputRef = ref<InputInstance>()

    // 产品设置
    const inputPruductValue = ref('')
    const dynamicProductTags = ref([])
    const inputProductVisible = ref(false)
    const InputProductRef = ref<InputInstance>()

    // 获取部门数据
    const getdepartment = async() => {
        dynamicTags.value = await getDepartment()
    }
    getdepartment()

    // 获取产品数据
    const getProductData = async() => {
        dynamicProductTags.value = await getProduct()
    }
    getProductData()

    // 部门设置的关闭时执行的回调函数
    const handleClose = async(tag: string) => {
        dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
        // toRaw把响应式数据转换为原生数据
        const res = await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
        if(res.status == 0){
			ElMessage({
			message: '删除部门成功！',
			type: 'success',
			})
		}else{
			ElMessage.error('删除部门失败!')
		}
    }

    // 产品设置的关闭时执行的回调函数
    const handleCloseProduct = async(tag: string) => {
        dynamicProductTags.value.splice(dynamicProductTags.value.indexOf(tag), 1)
        // toRaw把响应式数据转换为原生数据
        const res = await setProduct(JSON.stringify(toRaw(dynamicProductTags.value)))
        if(res.status == 0){
			ElMessage({
			message: '删除产品类别成功！',
			type: 'success',
			})
		}else{
			ElMessage.error('删除产品类别失败!')
		}
    }

    // 部门设置点击按钮出现输入框
    const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
            InputRef.value!.input!.focus()
        })
    }

    // 产品类比设置点击按钮出现输入框
    const showProductInput = () => {
        inputProductVisible.value = true
        nextTick(() => {
            InputProductRef.value!.input!.focus()
        })
    }

    // 部门设置输入数据后的一个函数
    const handleInputConfirm = async() => {
        if (inputValue.value) {
            dynamicTags.value.push(inputValue.value)
            const res = await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
            if(res.status == 0){
                ElMessage({
                message: '添加部门成功！',
                type: 'success',
                })
            }else{
                ElMessage.error('添加部门失败,请重新输入!')
            }
        }
        inputVisible.value = false
        inputValue.value = ''
    }

    //  产品类别设置输入数据后的一个函数
    const handleInputProductConfirm = async() => {
        if (inputPruductValue.value) {
            dynamicProductTags.value.push(inputPruductValue.value)
            const res = await setProduct(JSON.stringify(toRaw(dynamicProductTags.value)))
            if(res.status == 0){
                ElMessage({
                message: '添加产品类别成功！',
                type: 'success',
                })
            }else{
                ElMessage.error('添加产品类别失败,请重新输入!')
            }
        }
        inputProductVisible.value = false
        inputPruductValue.value = ''
    }

</script>

<style lang="scss" scoped>
    // 外壳
    .common-wrapped{
        padding-left: 26px;
        background-color: #f5f5f5;
        // 计算,减去头部和面包屑的高度
        height: calc(100vh - 85px);

        // 内容
        .common-content{
            padding: 0 10px;
            height: 95%;
            width: 97%;
            background-color: #fff;
            border-radius: calc(.5rem + 4px);
            font-size: 14px;
            border:2px solid #e4e4e7;

            // 账号信息外壳
            .account-infor-wrapped{
                display: flex;
                align-items: center;
                padding-left: 50px;
                margin-bottom: 30px;
                // 账号信息内容
                .account-infor-content{
                    margin-left: 24px;
                    margin-right: 16px;
                    
                }
            }
			
			//首页管理外壳
			.home-wrapped{
				padding-left: 50px;
				display: flex;
				flex-direction: column;
				// 提示
				.tips{
					display: flex;
					align-items: center;
					margin-bottom: 8px;
					
					span{
						font-size: 14px;
						color: #6b778c;
					}
				}
				//轮播图部分
				.swiper-wrapped{
					display: flex;
					margin-bottom: 16px;
					// 轮播图名字
					.swiper-name{
						font-size: 14px;
						margin-bottom: 24px;
					}
					//轮播图
					.swiper{
						width: 336px;
						height: 120px;
					}
				}
			}
			
			
            // 保存按钮
            .account-save-button{
                margin-left: 16px;
            }
        }
    }
    
    // 其他设置
    .other-set {
        padding-left: 50px;
        font-size: 14px;

        // 部门设置
        .department-set {
            margin-bottom: 24px;
            display: flex;
            align-items: center;

            span {
                margin-right: 24px;
            }
        }

        // 产品设置
       .product-set {
            display: flex;
            align-items: center;
            span {
                margin-right: 24px;
            }
       }
    }

    // Tabs标签页样式
    .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    }

    // 上传头像样式
    .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    }

    // 输入框长度
    :deep(.el-input){
        width: 240px;
    }
    // 下拉选择宽度
    :deep(.el-select){
        width: 240px;
    }
    

</style>

<style>
    /* 头像上传样式 */
    .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    }
</style>