import{i as r}from"./index-Cyc5mHF5.js";const n=e=>r({url:"user/getUserInfo",method:"POST",data:{id:e}}),u=(e,t,a)=>r({url:"user/bindAccount",method:"POST",data:{account:e,onlyId:t,url:a}}),d=(e,t)=>r({url:"user/changeName",method:"POST",data:{id:e,name:t}}),o=(e,t)=>r({url:"user/changeSex",method:"POST",data:{id:e,sex:t}}),c=(e,t,a)=>r({url:"user/changePassword",method:"POST",data:{id:e,oldPassword:t,newPassword:a}}),h=(e,t)=>r({url:"user/changeEmail",method:"POST",data:{id:e,email:t}}),m=e=>{const{account:t,...a}=e;return r({url:"user/createAdmin",method:"POST",data:{account:t,...a}})},i=e=>{const{id:t,...a}=e;return r({url:"user/editAdminInfo",method:"POST",data:{id:t,...a}})},l=e=>r({url:"user/changeAdminToUser",method:"POST",data:{id:e}}),T=(e,t)=>r({url:"user/changeUserToAdmin",method:"POST",data:{id:e,identity:t}}),g=(e,t)=>r({url:"user/searchUser",method:"POST",data:{account:e,identity:t}}),P=e=>r({url:"user/searchUserByDepartment",method:"POST",data:{department:e}}),S=e=>r({url:"user/banUser",method:"POST",data:{id:e}}),O=e=>r({url:"user/hotUser",method:"POST",data:{id:e}}),U=()=>r({url:"user/getBanList",method:"POST"}),A=(e,t)=>r({url:"user/deleteUser",method:"POST",data:{id:e,account:t}}),L=e=>r({url:"user/getAdminListLength",method:"POST",data:{identity:e}}),f=(e,t)=>r({url:"user/returnListData",method:"POST",data:{pager:e,identity:t}});export{d as a,u as b,c,o as d,h as e,m as f,L as g,n as h,i,T as j,S as k,O as l,P as m,U as n,l as o,A as p,f as r,g as s};
