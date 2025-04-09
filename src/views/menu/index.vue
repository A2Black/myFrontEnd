<template>
    <div class="common-layout">
        <el-container>
        <el-aside width="200px">
            <el-menu class="el-menu-vertical-demo" router>
                <div class="title">星海后台管理系统</div>
                <el-menu-item index="home">
                    <el-icon><House /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="overview">
                    <el-icon><DataBoard /></el-icon>
                    <span>系统概览</span>
                </el-menu-item>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon><User /></el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group title="管理员管理">
                        <el-menu-item index="product_manage">产品管理员</el-menu-item>
                        <el-menu-item index="users_manage">用户管理员</el-menu-item>
                        <el-menu-item index="message_manage">消息管理员</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="员工管理">
                        <el-menu-item index="users_list">用户列表</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><Suitcase /></el-icon>
                        <span>产品管理</span>
                    </template>
                    <el-menu-item-group title="入库管理">
                        <el-menu-item index="product_list">产品列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="出库管理">
                        <el-menu-item index="outproduct_list">出库列表</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>
                        <el-icon><Message /></el-icon>
                        <span>消息管理</span>
                    </template>
                    <el-menu-item-group title="消息管理">
                        <el-menu-item index="message_list">消息列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="出库管理">
                        <el-menu-item index="recyle">回收站</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-menu-item index="file">
                    <el-icon><Tickets /></el-icon>
                    <span>合同管理</span>
                </el-menu-item>
                <el-menu-item index="operation_log">
                    <el-icon><TakeawayBox /></el-icon>
                    <span>操作日志</span>
                </el-menu-item>
                <el-menu-item index="login_log">
                    <el-icon><Filter /></el-icon>
                    <span>登录日志</span>
                </el-menu-item>
                <el-menu-item index="set">
                    <el-icon><Setting /></el-icon>
                    <span>系统设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 头部左侧内容 -->
                <span class="header-left-content">尊敬的{{ userStore.name }}，欢迎你的登录</span>
                <!-- 头部右侧内容 -->
                 <div class="header-right-content">
                    <!-- 部门消息通知提示 -->
                    <el-badge :is-dot="messageStore.read_list.length > 0 ? true : false" class="item" @click="openDepartmentMessage" style="cursor:pointer">
                        <SvgIcon icon-name="chat" style="width: 24px;height: 24px;"></SvgIcon>
                    </el-badge>
                    <!-- 头部头像mini版显示 -->
                    <el-avatar class="avatarFrame" :size="32" :src="userStore.imageUrl" />
                    <!-- 下拉菜单 -->
                    <el-dropdown>
                        <!-- SvgIcon图标 -->
                        <SvgIcon icon-name="tools" style="width: 24px;height: 24px;" class="tools-icon"></SvgIcon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="accountSetting">账号设置</el-dropdown-item>
                                <el-dropdown-item @click="backLogin">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                 </div>
            </el-header>
            <el-main>
                <!-- 点击菜单时会渲染对应的路由页面 -->
                <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
    <!-- departMessageDialog -->
    <dmdialog ref="opendm"></dmdialog>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    // 导入一般组件
    import dmdialog from '@/components/department_msg.vue'
    // 导入SvgIcon
    import SvgIcon from '@/components/SvgIcon.vue'
    // 导入路由跳转
    import { useRouter } from 'vue-router'
    // 导入useUserInforStore
    import { useUserInforStore } from '@/store/userinfo'
    // 导入useMessageStore
    import { useMessageStore } from '@/store/message'
    // 创建实例
    const userStore = useUserInforStore()
    const messageStore = useMessageStore()

    // 创建实例
    const router = useRouter()
    // 退出登录
    const backLogin = ()=>{
        // 路由跳转到登录页
        router.replace('/login')
    }
    // 账号设置
    const accountSetting = () => {
        // 路由跳转到账号设置页面
        router.push('/set')
    }

    // 打开部门消息通知
    const opendm = ref()
    const openDepartmentMessage = () =>{
        opendm.value.open()
    }

</script>

<style lang="scss" scoped>
    // 侧边栏
    .el-aside{
        height: 100vh;
        background-color: #f1f3f6;
        width: 210px;
        // 隐藏滚动条
        overflow: hidden;
        // 菜单
        .el-menu{
            background-color: #fff;
            width: 210px;
            height: 100vh;
            border-right: 0px;
        }

        // 菜单栏标题
        .title{
            padding: 20px;
            display: flex;
            justify-content: center;
            font-weight: 600;
            color: #323639;  //字体颜色
            // 背景色
            background-color: #fff;
        }

    }

    // 头部部分
    .el-header{
        display: flex;
        height: 55px;
        background-color: #fff;
        color: #323639;
        border-left:1px solid #e4e4e7;
        align-items: center;
        justify-content: space-between;
        // 左侧欢迎语部分
        .header-left-content{
            font-size: 14px;
        }
        // 右侧头部内容
        .header-right-content{
            width: 160px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        // 头像框
        .avatarFrame{
            border:2px solid #e4e4e7;
        }

    }

    .el-main {
    --el-main-padding: 0px;
    box-sizing: border-box;
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    padding: var(--el-main-padding);
    background-color: #f1f3f6;
    border:1px solid #e4e4e7;
    }
    
    // 工具图标样式
    .tools-icon {
        transition: transform 0.3s ease;
        
        &:hover {
            transform: scale(1.25);
        }
    }

    // 添加样式穿透设置悬浮时菜单选项背景色，无子菜单项
    :deep(.el-menu-item:hover){
        background-color: #d9e9fb;
        color: #409eff;
        .el-icon {
            transition: transform 0.5s ease;
            transform: scale(1.25);
        }
    }
    // 有子菜单项
    :deep(.el-sub-menu__title:hover){
        background-color: #d9e9fb;
        color: #409eff;
        .el-icon {
            transition: transform 0.5s ease;
            transform: scale(1.25);
        }
    }

</style>