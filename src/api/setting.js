import instance from "@/http/index.js";

/**
 * 获取所有轮播图数据
 * @returns {Promise<string[]>} 返回图片 URL 数组
 */

// 获取所有轮播图
export const getAllSwiper = () => {
    // 调用instance
    return instance({
        url:'set/getAllSwiper',
        method:'POST',
    })
}

// 获取公司名称
export const getCompanyName = () => {
    // 调用instance
    return instance({
        url:'set/getCompanyName',
        method:'POST',
    })
}

// 修改公司名称
export const changeCompanyName = (set_value) => {
    // 调用instance
    return instance({
        url:'set/changeCompanyName',
        method:'POST',
        data:{
            set_value
        }
    })
}

// 编辑公司介绍的接口
export const changeCompanyIntroduce = (set_text,set_name) => {
    // 调用instance
    return instance({
        url:'set/changeCompanyIntroduce',
        method:'POST',
        data:{
            set_text,
            set_name
        }
    })
}

// 获取公司介绍
export const getCompanyIntroduce = (set_name) => {
    // 调用instance
    return instance({
        url:'set/getCompanyIntroduce',
        method:'POST',
        data:{
            set_name
        }
    })
}

/**
 * 获取公司介绍数据
 * @returns {Promise<string[]>} 
 */
// 获取所有公司信息
export const getAllCompanyIntroduce = () => {
    // 调用instance
    return instance({
        url:'set/getAllCompanyIntroduce',
        method:'POST',
    })
}