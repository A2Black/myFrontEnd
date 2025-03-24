// 导入mitt事件总线库
import mitt from 'mitt'

// 创建并导出事件总线实例
// mitt()返回一个具有on、off、emit方法的事件发射器
// 用于组件间的通信
export const bus = mitt()