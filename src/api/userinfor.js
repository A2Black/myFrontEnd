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


// ...............................................................用户管理（增删改查）..................................................................................
// 添加管理员
export const createAdmin = data => {
    const {
        account,
        ...identity
    } = data
    return instance({
        url:'user/createAdmin',
        method:'POST',
        // 传入数据
        data: {
            account,
            ...identity
        }
    })
}

/**
 * @returns {Promise<string[]>} 
 */
// 获取管理员列表
export const getAdminList = identity => {
    return instance({
        url:'user/getAdminList',
        method:'POST',
        // 传入数据
        data: {
            identity
        }
    })
}

// 编辑管理员账号信息
export const editAdminInfo = data => {
    const {
        id,
        ...department
    } = data
    return instance({
        url:'user/editAdminInfo',
        method:'POST',
        // 传入数据
        data: {
            id,
            ...department
        }
    })
}

// 对管理员取消赋权  降级成为普通用户
export const changeAdminToUser = id => {
    return instance({
        url:'user/changeAdminToUser',
        method:'POST',
        // 传入数据
        data: {
            id
        }
    })
}

// 对普通用户赋权 升级成为管理员
export const changeUserToAdmin = (id,identity) => {
    return instance({
        url:'user/changeUserToAdmin',
        method:'POST',
        // 传入数据
        data: {
            id,
            identity
        }
    })
}

// 通过账号对用户进行搜索 
export const searchUser = account => {
    return instance({
        url:'user/searchUser',
        method:'POST',
        // 传入数据
        data: {
            account
        }
    })
}

// 冻结用户
export const banUser = id => {
    return instance({
        url:'user/banUser',
        method:'POST',
        // 传入数据
        data: {
            id
        }
    })
}

// 解冻用户
export const hotUser = id => {
    return instance({
        url:'user/hotUser',
        method:'POST',
        // 传入数据
        data: {
            id
        }
    })
}

// 获取冻结用户列表
export const getBanList = () => {
    return instance({
        url:'user/getBanList',
        method:'POST',
    })
}

// 删除用户
export const deleteUser = (id,account) => {
    return instance({
        url:'user/deleteUser',
        method:'POST',
        // 传入数据
        data: {
            id,
            account
        }
    })
}