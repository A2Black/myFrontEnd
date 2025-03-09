import instance from "@/http/index.js";

// 获取用户信息
export const getUserInfo = id => {
    return instance({
        url:'user/getUserInfo',
        method:'POST',
        // 传入数据
        data: {
            id
        }
    })
}

// 绑定图片跟账号
export const bind = (account,onlyId,url) => {
    return instance({
        url:'user/bindAccount',
        method:'POST',
        // 传入数据
        data: {
            account,
            onlyId,
            url
        }
    })
}

// 修改姓名
export const changeName = (id,name) => {
    return instance({
        url:'user/changeName',
        method:'POST',
        // 传入数据
        data: {
            id,
            name
        }
    })
}

// 修改性别
export const changeSex = (id,sex) => {
    return instance({
        url:'user/changeSex',
        method:'POST',
        // 传入数据
        data: {
            id,
            sex
        }
    })
}

// 修改密码
export const changePassword = (id,oldPassword,newPassword) => {
    return instance({
        url:'user/changePassword',
        method:'POST',
        // 传入数据
        data: {
            id,
            oldPassword,
            newPassword
        }
    })
}

// 修改邮箱
export const changeEmail = (id,email) => {
    return instance({
        url:'user/changeEmail',
        method:'POST',
        // 传入数据
        data: {
            id,
            email
        }
    })
}