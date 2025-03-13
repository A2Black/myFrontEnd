<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部外壳 -->
      <el-header class="header-wrapped">
        <!-- 头部的内容 -->
		  <div class="header-content">
			  <h2>
				  星海后台管理系统
			  </h2>
        <!-- 欢迎语 -->
        <span class="welcome">尊敬的领航员,欢迎你的登录</span>
		  </div>
	  </el-header>
    <!--main部分-->
      <el-main>
        <div class="login-wrapped">
          <el-card class="box-card">
            <!-- Tabs标签页 -->
            <el-tabs v-model="activeName" class="demo-tabs" stretch="true">
              <el-tab-pane label="登录" name="first">
                <!-- 登录表单 -->
                <el-form class="login-form" label-width="auto" style="max-width: 600px">
                  <el-form-item label="账号">
                    <el-input v-model="loginData.account" placeholder="请输入账号" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="loginData.password" placeholder="请输入密码" show-password/>
                  </el-form-item>

                  <!-- 登录卡片底部外壳-->
                  <div class="footer-wrapped">
                    <div class="forget-password">
                      <span class="forget-password-button" @click="fogetPassWord">忘记密码?</span>
                    </div>

                    <!-- 登录按钮 -->
                     <div class="footer-button">
                      <el-button type="primary" @click="Login" round>登录</el-button>
                     </div>

                   <!-- 还没有账号?马上注册 -->
                    <div class="footer-go-register">
                      还没有账号?<span class="go-register">马上注册</span>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <!-- 注册表单 -->
              <el-tab-pane label="注册" name="second">
                <el-form class="login-form" label-width="auto" style="max-width: 600px">
                  <el-form-item label="账号">
                    <el-input v-model="registerData.account" placeholder="账号长度为6-12位" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="registerData.password" placeholder="密码长度为6-12位需含数字和字母" />
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="registerData.repassword" placeholder="请再次输入密码" />
                  </el-form-item>
                  <!-- 注册按钮 -->
                  <div class="footer-button">
                    <el-button type="primary"  @click="Register" round>注册</el-button>
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <!-- footer部分 -->
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <div class="title">
            <span>Technology saves the world!</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
  <forget ref="fogetPass"></forget>
</template>

<!-- lang = "ts"声明当前<script>标签中使用 ​TypeScript​ 语言,setup启用Vue3的 ​Composition API 语法糖 -->
<script lang = "ts" setup> 
  import { ref, reactive } from 'vue'
  // 导入消息提示
  import { ElMessage } from 'element-plus'
  // 导入
  import forget from "./components/foget_password.vue"
  // 调用注册和登录的接口
  import {
    login,register
  }from'@/api/login'
  //登录用路由跳转
  import { useRouter } from 'vue-router'
  // 导入定义好的storage
  import { useUserInforStore } from '@/store/userinfo'

  const activeName = ref('first') //打开网页默认指向登录或是注册

  // 创建实例
  const router = useRouter()
  // 创建实例
  const store = useUserInforStore()

  // 表单接口
  interface formData {
    account: number;
    password: string;
    repassword ?: string;     //?的作用是使用这个接口的对象即使没有这个参数也不会报错，比如loginData对象中没有repassword这个参数，但是也不会报错
  }

  // 登录表单数据
  const loginData : formData = reactive ({
    account: null,
    password: '',
  })

  //注册表单数据
  const registerData : formData = reactive ({
    account: null,
    password: '',
    repassword: '',
  })

  // 登录函数
  const Login = async()=>{
    const res = await login(loginData)
    if(res.message == "登录成功"){
      const { id } = res.results
      const {token} = res
      ElMessage({
          message: '登录成功！',
          type: 'success',
      })
      // 将id存放在localStorage
      localStorage.setItem('id', id)
      // 将token存在localStorage
      localStorage.setItem('token', token)
      // 使用store中的获取用户信息方法
      store.userInfo(id)
      // 路由跳转到首页
      router.push('/home')
    }else{
      ElMessage.error('登录失败，请检查账号和密码是否正确！')
    }
  }

  // 注册函数
  const Register = async() => {
    if(registerData.password == registerData.repassword){
      const res = await register(registerData)
      //console.log(res)
      if(res.message == "注册账号成功"){
        ElMessage({
          message: '恭喜，注册成功！',
          type: 'success',
        })
        activeName.value = 'first';
      }
      else if(res.message == "账号已存在"){
        ElMessage({
          message: '账号已存在！',
          type: 'warning',
        })
      }
      else{
        ElMessage.error('注册失败，请检查输入数据是否正确')
      }
      }else{
        ElMessage.error('两次密码不一致，请重新输入！')
      }
  }

  // 忘记密码弹窗
  const fogetPass = ref()
  // 打开忘记密码弹窗
  const fogetPassWord = ()=>{
    fogetPass.value.open()
  }

</script>

<!-- 声明当前<style>标签中使用SCSS/SASS​预处理器语法（而非默认的CSS）,scoped启用样式作用域,使CSS仅对当前组件生效,避免污染全局样式 -->
<style lang = "scss" scoped>
  .header-wrapped {
    .header-content {
      width: 1200px;
      margin: 0 auto;   //设置居中
      display: flex;    //弹性布局
      justify-content: space-between;
      align-items: center;
      .welcome {
        font-size: 13px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      }
    }
  }
  // 主体部分
  .el-main {
    // 设置login页面背景图
    background-image: url('@/assets/loginBackgroundImage.png');
    height: 750px;
    --el-main-padding: 0;
    // 登录外壳
    .login-wrapped {
      width: 1200px;
      height: 650px;
      margin: 0 auto;
      // 登录卡片页样式
      .box-card {
        width: 350px;
        height: 375px;
        float: right;
        position: relative;
        top: 14%;

        // 登录底部外壳
        .login-form {
          
          .footer-wrapped {
            display: flex;
            flex-direction: column;
            
            .forget-password {
              display: flex;
              justify-content: flex-end;
              margin: 10px 0;

              .forget-password-button {
                color: #409eff;
                font-size: 12px;
                // 添加鼠标移入的效果
                cursor: pointer;
              }
            }

            //马上注册
            .footer-go-register {
              font-size: 12px;
              margin: 12px 0;
              display: flex;
              justify-content: center;

              .go-register {
                color: #409eff;
                font-size: 12px;
                cursor: pointer;
              }
            }
          }

          // 底部登录按钮
          .footer-button {
              width: 100%;
              display: flex;
              justify-content: center;
            }
        }
      }
    }
    
  }
  // 底部外壳
  .footer-wrapped {
    margin-top: 8px;
    // 底部内容
    .footer-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
  }
  //底部标题介绍
  .title {
    color: #135eb4;
    font-size: larger;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  //表单边距
  .el-form {
    margin-top: 30px;
  }

  // 添加样式穿透，权重大，覆盖原有样式
  // 设置Tabs标签字体大小
  :deep(.el-tabs__item) {
    color: #333;
    font-size: 18px; 
  }
  // 输入框高度
  :deep(.el-input__inner) {
    height: 40px;
  }
  // 输入框标签字体高度
  :deep(.el-form-item__label) {
    height: 40px;
    line-height: 40px;
  }
  //登录&注册按钮
  :deep(.el-button){
    width: 300px;
    height: 45px;
    font-size: 16px;
  }
</style>