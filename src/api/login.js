// 登录和注册的接口
// 导入axios
import instance from "@/http/index.js";

/**
 * @typedef {Object} LoginResponse
 * @property {string} message
 * @property {{ id: string }} results
 * @property {string} token
 */

/**
 * 登录请求函数
 * @param {{ account: number, password: string }} data
 * @returns {Promise<LoginResponse>}
 */


// 注册接口
export const register = data => {
    // 传入两个数据，账号和密码
    // 创建解构赋值，从data里面获取账号和密码
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

/**
 * @typedef {Object} LoginResponse
 * @property {string} message
 * @property {{ id: string }} results
 * @property {string} token
 */

/**
 * 登录请求函数
 * @param {{ account: number, password: string }} data
 * @returns {Promise<LoginResponse>}
 */

// 登录接口
export const login = (data)=> {
    // 传入两个数据，账号和密码
    // 创建解构赋值，从data里面获取账号和密码
    const {
        account,
        password
    } = data
    // 调用instanc
    return instance({
		url: '/api/login',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}

// 登陆页面验证邮箱和账户接口
export const verify = data => {
    // 传入两个数据，账号和密码
    // 创建解构赋值，从data里面获取账号和密码
    const {
        account,
        email
    } = data
    // 调用instanc
    return instance({
        url:'user/verifyAccountAndEmail',
        method:'POST',
        // 传入数据
        data:{
            account,
            email
        }
    })
}

// 登陆页面重置密码
export const reset = (id,newPassword) => {
    // 传入两个数据，id和新密码
    // 调用instanc
    return instance({
        url:'user/changePasswordInLogin',
        method:'POST',
        // 传入数据
        data:{
            id,
            newPassword
        }
    })
}
