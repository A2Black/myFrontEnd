import{o as $}from"./operation_log-B2181nWq.js";const k=async(f,i,a,w,c)=>{if(c==0){if(f=="管理员"){let t=`对管理员'${a}'进行了降职操作`;await $(i,t,w)}if(f=="用户"){let t=`对用户'${a}'进行了删除操作`;await $(i,t,w)}if(f=="用户登录状态"){let t=`对用户'${a}'进行了冻结操作`;await $(i,t,w)}if(f=="产品入库"){let t=`对'${a}'进行了出库操作`;await $(i,t,w)}}if(c==1){if(f=="用户登录状态"){let t=`对用户'${a}'进行了解冻操作`;await $(i,t,w)}if(f=="产品入库"){let t=`对'${a}'进行了入库操作`;await $(i,t,w)}}};export{k as t};
