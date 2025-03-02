// 登录和注册的接口
// 导入axios
import instance from "@/http/index.js";

// 注册接口
export const register = data => {
    // 传入两个数据，账号和密码
    // 创建结构复制，从data里面获取账号和密码
    const {
        account,
        password
    } = data
    // 调用instance
    return instance({
        url:'api/register',
        method:'POST',
        // 传入数据
        data: {
            account,
            password
        }
    })
}

// 登录接口
export const login = data => {
    // 传入两个数据，账号和密码
    // 创建结构复制，从data里面获取账号和密码
    const {
        account,
        password
    } = data
    // 调用instanc
    return instance({
        url:'api/login',
        method:'POST',
        // 传入数据
        data:{
            account,
            password
        }
    })
}