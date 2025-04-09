import{d as O,r as c,a as L,j as A,w as t,e as r,o as D,f as a,b as e,c as J,l as pe,F as K,g as h,E as F,_ as B,i as M,t as H,h as ae,y as re}from"./index-DAzvbAht.js";import{b as k}from"./mitt-CdlF-dbX.js";import{c as ye,a as se,e as ve,d as Ve,b as we,w as Ce,g as Pe,r as ne,f as xe,h as de,s as he,i as ke}from"./product-S_XmsTMr.js";import{f as ie}from"./setting-COqKDi4v.js";import{t as _e}from"./operation-DqFEevio.js";import{u as Ue}from"./userinfo-DTtnKP-y.js";import{b as Ie}from"./bread_crumb-BVsCHufp.js";import"./index-Cyc5mHF5.js";import"./operation_log-B2181nWq.js";import"./userinfor-5i_LEdTx.js";import"./SvgIcon-CrgHh77p.js";const $e={class:"dialog-content"},qe={class:"dialog-footer"},De=O({__name:"product_in_warehouse",emits:["success"],setup(T,{expose:$,emit:q}){const m=c("left"),o=L({product_id:null,product_name:"",product_category:"",product_unit:"",product_in_warehouse_number:null,product_single_price:null,product_create_person:"",in_memo:""}),p=c([]);(async()=>{p.value=await ie()})();const I=L({product_id:[{required:!0,message:"请输入入库编号",trigger:"blur"}],product_name:[{required:!0,message:"请输入产品名称",trigger:"blur"}],product_category:[{required:!0,message:"请选择产品类别",trigger:"change"}],product_unit:[{required:!0,message:"请选择产品单位",trigger:"change"}],product_in_warehouse_number:[{required:!0,message:"请输入产品入库数量",trigger:"blur"}],product_single_price:[{required:!0,message:"请输入产品入库单价",trigger:"blur"}],product_create_person:[{required:!0,message:"请输入入库操作人的姓名",trigger:"blur"}],in_memo:[{required:!0,message:"请输入入库备注",trigger:"blur"}]}),b=q,u=async()=>{(await ye(o)).status===0?(F({message:"产品入库成功！",type:"success"}),b("success"),_e("产品入库",localStorage.getItem("name"),o.product_name,"一般",1),n(),s.value=!1):(F.error("产品入库失败，请重新添加"),s.value=!1)},n=()=>{o.product_id=null,o.product_name="",o.product_category="",o.product_unit="",o.product_in_warehouse_number=null,o.product_single_price=null,o.product_create_person="",o.in_memo=""},s=c(!1);return $({open:()=>{s.value=!0}}),(g,i)=>{const P=r("el-input"),C=r("el-form-item"),x=r("el-option"),z=r("el-select"),j=r("el-form"),R=r("el-button"),v=r("el-dialog");return D(),A(v,{modelValue:s.value,"onUpdate:modelValue":i[8]||(i[8]=w=>s.value=w),title:"添加产品入库",width:"600px","align-center":"",draggable:""},{footer:t(()=>[a("div",qe,[e(R,{type:"primary",onClick:u},{default:t(()=>i[9]||(i[9]=[h(" 确认 ")])),_:1})])]),default:t(()=>[a("div",$e,[e(j,{ref:"ruleFormRef",model:o,rules:I,"label-position":m.value,"label-width":"120px"},{default:t(()=>[e(C,{label:"入库编号",prop:"product_id"},{default:t(()=>[e(P,{modelValue:o.product_id,"onUpdate:modelValue":i[0]||(i[0]=w=>o.product_id=w)},null,8,["modelValue"])]),_:1}),e(C,{label:"产品名称",prop:"product_name"},{default:t(()=>[e(P,{modelValue:o.product_name,"onUpdate:modelValue":i[1]||(i[1]=w=>o.product_name=w)},null,8,["modelValue"])]),_:1}),e(C,{label:"产品类别",prop:"department"},{default:t(()=>[e(z,{modelValue:o.product_category,"onUpdate:modelValue":i[2]||(i[2]=w=>o.product_category=w),placeholder:"请选择产品类别"},{default:t(()=>[(D(!0),J(K,null,pe(p.value,w=>(D(),A(x,{key:w,label:w,value:w},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(C,{label:"产品单位",prop:"product_unit"},{default:t(()=>[e(z,{modelValue:o.product_unit,"onUpdate:modelValue":i[3]||(i[3]=w=>o.product_unit=w),placeholder:"请选择产品单位"},{default:t(()=>[e(x,{label:"个",value:"个"}),e(x,{label:"件",value:"件"})]),_:1},8,["modelValue"])]),_:1}),e(C,{label:"产品入库数量",prop:"product_in_warehouse_number"},{default:t(()=>[e(P,{modelValue:o.product_in_warehouse_number,"onUpdate:modelValue":i[4]||(i[4]=w=>o.product_in_warehouse_number=w)},null,8,["modelValue"])]),_:1}),e(C,{label:"产品入库单价",prop:"product_single_price"},{default:t(()=>[e(P,{modelValue:o.product_single_price,"onUpdate:modelValue":i[5]||(i[5]=w=>o.product_single_price=w)},null,8,["modelValue"])]),_:1}),e(C,{label:"入库操作人",prop:"product_create_person"},{default:t(()=>[e(P,{modelValue:o.product_create_person,"onUpdate:modelValue":i[6]||(i[6]=w=>o.product_create_person=w)},null,8,["modelValue"])]),_:1}),e(C,{label:"入库备注",prop:"in_memo"},{default:t(()=>[e(P,{modelValue:o.in_memo,"onUpdate:modelValue":i[7]||(i[7]=w=>o.in_memo=w),rows:3,type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules","label-position"])])]),_:1},8,["modelValue"])}}}),Fe=B(De,[["__scopeId","data-v-7441ba49"]]),Ae={class:"product-name"},Se={class:"product-name"},Le={class:"dialog-content"},Oe={class:"dialog-footer"},Be=O({__name:"apply",emits:["success"],setup(T,{expose:$,emit:q}){const m=c("left");c(),k.on("applyOutId",n=>{o.id=n.id,o.product_name=n.product_name,o.product_single_price=n.product_single_price,o.product_in_warehouse_number=n.product_in_warehouse_number}),c([]);const o=L({id:null,product_single_price:null,product_name:"",product_out_id:null,product_out_number:null,product_out_apply_person:"",apply_memo:"",product_in_warehouse_number:null}),p=L({product_out_id:[{required:!0,message:"请输入申请出库编号",trigger:"blur"}],product_out_number:[{required:!0,message:"请输入申请出库数量",trigger:"blur"}],product_out_apply_person:[{required:!0,message:"请输入申请出库人的姓名",trigger:"blur"}],apply_memo:[{required:!0,message:"请输入申请出库备注",trigger:"blur"}]}),l=q,I=async()=>{(await se(o)).status===0?(F({message:"产品申请出库成功！",type:"success"}),l("success"),b.value=!1):(F.error("产品申请出库失败，请重新申请"),b.value=!1)},b=c(!1);return $({open:()=>{b.value=!0}}),M(()=>{k.all.clear()}),(n,s)=>{const f=r("el-input"),g=r("el-form-item"),i=r("el-form"),P=r("el-button"),C=r("el-dialog");return D(),A(C,{modelValue:b.value,"onUpdate:modelValue":s[5]||(s[5]=x=>b.value=x),title:"申请出库",width:"600px","align-center":"",draggable:""},{footer:t(()=>[a("div",Oe,[e(P,{type:"primary",onClick:I},{default:t(()=>s[6]||(s[6]=[h(" 确认 ")])),_:1})])]),default:t(()=>[a("div",Ae,"您申请出库的产品是:  "+H(o.product_name),1),a("div",Se,"该产品剩余库存数量:  "+H(o.product_in_warehouse_number),1),a("div",Le,[e(i,{ref:"ruleFormRef",model:o,rules:p,"label-position":m.value,"label-width":"120px"},{default:t(()=>[e(g,{label:"申请出库编号",prop:"product_out_id"},{default:t(()=>[e(f,{modelValue:o.product_out_id,"onUpdate:modelValue":s[0]||(s[0]=x=>o.product_out_id=x)},null,8,["modelValue"])]),_:1}),e(g,{label:"出库单价",prop:"product_single_price"},{default:t(()=>[e(f,{modelValue:o.product_single_price,"onUpdate:modelValue":s[1]||(s[1]=x=>o.product_single_price=x),disabled:""},null,8,["modelValue"])]),_:1}),e(g,{label:"出库数量",prop:"product_out_number"},{default:t(()=>[e(f,{modelValue:o.product_out_number,"onUpdate:modelValue":s[2]||(s[2]=x=>o.product_out_number=x)},null,8,["modelValue"])]),_:1}),e(g,{label:"出库申请人",prop:"product_out_apply_person"},{default:t(()=>[e(f,{modelValue:o.product_out_apply_person,"onUpdate:modelValue":s[3]||(s[3]=x=>o.product_out_apply_person=x)},null,8,["modelValue"])]),_:1}),e(g,{label:"申请出库备注",prop:"apply_memo"},{default:t(()=>[e(f,{modelValue:o.apply_memo,"onUpdate:modelValue":s[4]||(s[4]=x=>o.apply_memo=x)},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules","label-position"])])]),_:1},8,["modelValue"])}}}),Te=B(Be,[["__scopeId","data-v-ac622635"]]),ze={class:"dialog-content"},Ee={class:"dialog-footer"},Ne=O({__name:"edit_product",emits:["success"],setup(T,{expose:$,emit:q}){const m=c("left");c(),k.on("editproductId",f=>{l.id=f.id,l.product_id=f.product_id,l.product_name=f.product_name,l.product_category=f.product_category,l.product_unit=f.product_unit,l.product_in_warehouse_number=f.product_in_warehouse_number,l.product_single_price=f.product_single_price,l.product_create_person=f.product_create_person,l.in_memo=f.in_memo});const o=c([]);(async()=>{o.value=await ie()})();const l=L({id:null,product_id:null,product_name:"",product_category:"",product_unit:"",product_in_warehouse_number:null,product_single_price:null,product_create_person:"",in_memo:""}),I=L({product_id:[{required:!0,message:"请输入入库编号",trigger:"blur"}],product_name:[{required:!0,message:"请输入产品名称",trigger:"blur"}],product_category:[{required:!0,message:"请选择产品类别",trigger:"change"}],product_unit:[{required:!0,message:"请选择产品单位",trigger:"change"}],product_in_warehouse_number:[{required:!0,message:"请输入产品入库数量",trigger:"blur"}],product_single_price:[{required:!0,message:"请输入产品入库单价",trigger:"blur"}],product_create_person:[{required:!0,message:"请输入入库操作人的姓名",trigger:"blur"}],in_memo:[{required:!0,message:"请输入入库备注",trigger:"blur"}]}),b=q,u=async()=>{(await ve(l)).status===0?(F({message:"编辑产品信息成功！",type:"success"}),b("success"),n.value=!1):(F.error("编辑产品信息失败，请重新编辑"),n.value=!1)},n=c(!1);return $({open:()=>{n.value=!0}}),M(()=>{k.all.clear()}),(f,g)=>{const i=r("el-input"),P=r("el-form-item"),C=r("el-option"),x=r("el-select"),z=r("el-form"),j=r("el-button"),R=r("el-dialog");return D(),A(R,{modelValue:n.value,"onUpdate:modelValue":g[8]||(g[8]=v=>n.value=v),title:"编辑产品信息",width:"600px","align-center":"",draggable:""},{footer:t(()=>[a("div",Ee,[e(j,{type:"primary",onClick:u},{default:t(()=>g[9]||(g[9]=[h(" 确认 ")])),_:1})])]),default:t(()=>[a("div",ze,[e(z,{ref:"ruleFormRef",model:l,rules:I,"label-position":m.value,"label-width":"120px"},{default:t(()=>[e(P,{label:"入库编号",prop:"product_id"},{default:t(()=>[e(i,{modelValue:l.product_id,"onUpdate:modelValue":g[0]||(g[0]=v=>l.product_id=v),disabled:""},null,8,["modelValue"])]),_:1}),e(P,{label:"产品名称",prop:"product_name"},{default:t(()=>[e(i,{modelValue:l.product_name,"onUpdate:modelValue":g[1]||(g[1]=v=>l.product_name=v)},null,8,["modelValue"])]),_:1}),e(P,{label:"产品类别",prop:"department"},{default:t(()=>[e(x,{modelValue:l.product_category,"onUpdate:modelValue":g[2]||(g[2]=v=>l.product_category=v),placeholder:"请选择产品类别"},{default:t(()=>[(D(!0),J(K,null,pe(o.value,v=>(D(),A(C,{key:v,label:v,value:v},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(P,{label:"产品单位",prop:"product_unit"},{default:t(()=>[e(x,{modelValue:l.product_unit,"onUpdate:modelValue":g[3]||(g[3]=v=>l.product_unit=v),placeholder:"请选择产品单位"},{default:t(()=>[e(C,{label:"个",value:"个"}),e(C,{label:"件",value:"件"})]),_:1},8,["modelValue"])]),_:1}),e(P,{label:"产品入库数量",prop:"product_in_warehouse_number"},{default:t(()=>[e(i,{modelValue:l.product_in_warehouse_number,"onUpdate:modelValue":g[4]||(g[4]=v=>l.product_in_warehouse_number=v)},null,8,["modelValue"])]),_:1}),e(P,{label:"产品入库单价",prop:"product_single_price"},{default:t(()=>[e(i,{modelValue:l.product_single_price,"onUpdate:modelValue":g[5]||(g[5]=v=>l.product_single_price=v)},null,8,["modelValue"])]),_:1}),e(P,{label:"入库负责人",prop:"product_create_person"},{default:t(()=>[e(i,{modelValue:l.product_create_person,"onUpdate:modelValue":g[6]||(g[6]=v=>l.product_create_person=v),disabled:""},null,8,["modelValue"])]),_:1}),e(P,{label:"入库备注",prop:"in_memo"},{default:t(()=>[e(i,{modelValue:l.in_memo,"onUpdate:modelValue":g[7]||(g[7]=v=>l.in_memo=v),rows:3,type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules","label-position"])])]),_:1},8,["modelValue"])}}}),Me=B(Ne,[["__scopeId","data-v-d227b369"]]),Re={class:"dialog-footer"},He=O({__name:"delete_product",emits:["success"],setup(T,{expose:$,emit:q}){const m=c(!1);$({open:()=>{m.value=!0}});const p=c();k.on("deleteproductId",b=>{p.value=b});const l=q,I=async()=>{(await Ve(p.value)).status===0?(F({message:"删除产品成功！",type:"success"}),l("success"),m.value=!1):(F.error("删除产品失败！请重新操作"),m.value=!1)};return M(()=>{k.all.clear()}),(b,u)=>{const n=r("el-button"),s=r("el-dialog");return D(),A(s,{modelValue:m.value,"onUpdate:modelValue":u[0]||(u[0]=f=>m.value=f),title:"删除产品",width:"20%",center:"",draggable:""},{footer:t(()=>[a("div",Re,[e(n,{type:"primary",onClick:I},{default:t(()=>u[1]||(u[1]=[h(" 确认 ")])),_:1})])]),default:t(()=>[u[2]||(u[2]=a("div",{class:"warning-text"},[a("span",null,"请慎重操作,删除后将失去此产品的所有记录")],-1))]),_:1},8,["modelValue"])}}}),je=B(He,[["__scopeId","data-v-e5ab6321"]]),We={class:"warning-text"},Ge={class:"dialog-footer"},Je=O({__name:"audit",emits:["success"],setup(T,{expose:$,emit:q}){const m=c(!1),o=Ue(),p=L({id:0,product_name:"",product_out_id:0,product_out_status:"",audit_memo:"",product_out_price:0,product_out_audit_person:o.name,product_out_apply_person:"",product_in_warehouse_number:0,product_single_price:0,product_out_number:"",product_apply_time:""});k.on("auditproductId",u=>{p.id=u.id,p.product_out_id=u.product_out_id,p.product_name=u.product_name,p.product_out_status=u.product_out_status,p.audit_memo=u.audit_memo,p.product_out_price=u.product_out_price,p.product_out_apply_person=u.product_out_apply_person,p.product_in_warehouse_number=u.product_in_warehouse_number,p.product_single_price=u.product_single_price,p.product_out_number=u.product_out_number,p.product_apply_time=u.product_apply_time});const l=q,I=async()=>{const u=await we(p);console.log(u),u.status===0?(F({message:"审核产品成功！",type:"success"}),l("success"),_e("产品入库",localStorage.getItem("name"),p.product_name,"一般",0),m.value=!1):(F.error("审核产品失败！请重新操作"),m.value=!1)};return $({open:()=>{m.value=!0}}),M(()=>{k.all.clear()}),(u,n)=>{const s=r("el-radio"),f=r("el-radio-group"),g=r("el-input"),i=r("el-button"),P=r("el-dialog");return D(),A(P,{modelValue:m.value,"onUpdate:modelValue":n[2]||(n[2]=C=>m.value=C),title:"审核产品",width:"20%",center:"",draggable:""},{footer:t(()=>[a("div",Ge,[e(i,{type:"primary",onClick:I},{default:t(()=>n[6]||(n[6]=[h(" 确认 ")])),_:1})])]),default:t(()=>[a("div",We,[n[5]||(n[5]=a("span",null,"是否同意本产品的出库?",-1)),e(f,{modelValue:p.product_out_status,"onUpdate:modelValue":n[0]||(n[0]=C=>p.product_out_status=C)},{default:t(()=>[e(s,{label:"同意",size:"large"},{default:t(()=>n[3]||(n[3]=[h("同意")])),_:1}),e(s,{label:"否决",size:"large"},{default:t(()=>n[4]||(n[4]=[h("否决")])),_:1})]),_:1},8,["modelValue"]),e(g,{modelValue:p.audit_memo,"onUpdate:modelValue":n[1]||(n[1]=C=>p.audit_memo=C),style:{width:"240px"},rows:3,type:"textarea",placeholder:"请输入审核备注"},null,8,["modelValue"])])]),_:1},8,["modelValue"])}}}),Ke=B(Je,[["__scopeId","data-v-cdfd8898"]]),Qe={class:"dialog-footer"},Xe=O({__name:"withdraw",emits:["success"],setup(T,{expose:$,emit:q}){const m=c(!1);$({open:()=>{m.value=!0}});const p=c();k.on("withdrawproductId",async b=>{p.value=b});const l=q,I=async()=>{(await Ce(p.value)).status===0?(F({message:"撤回申请成功！",type:"success"}),l("success"),m.value=!1):(F.error("撤回申请失败！请重新操作"),m.value=!1)};return M(()=>{k.all.clear()}),(b,u)=>{const n=r("el-button"),s=r("el-dialog");return D(),A(s,{modelValue:m.value,"onUpdate:modelValue":u[0]||(u[0]=f=>m.value=f),title:"撤回申请",width:"20%",center:""},{footer:t(()=>[a("div",Qe,[e(n,{type:"primary",onClick:I},{default:t(()=>u[1]||(u[1]=[h(" 确认 ")])),_:1})])]),default:t(()=>[u[2]||(u[2]=a("div",{class:"warning-text"},[a("span",null,"确定撤回此产品的出库申请吗？")],-1))]),_:1},8,["modelValue"])}}}),Ye=B(Xe,[["__scopeId","data-v-f7b1b572"]]),Ze={class:"dialog-footer"},et=O({__name:"again_apply",emits:["success"],setup(T,{expose:$,emit:q}){const m=c(!1),o=L({id:null,product_single_price:null,product_name:"",product_out_id:null,product_out_number:null,product_out_apply_person:"",apply_memo:"",product_in_warehouse_number:null});c(),k.on("againId",async b=>{o.id=b.id,o.product_name=b.product_name,o.product_out_id=b.product_out_id,o.product_out_apply_person=b.product_out_apply_person,o.product_in_warehouse_number=b.product_in_warehouse_number,o.product_single_price=b.product_single_price,o.product_out_number=b.product_out_number,o.apply_memo=b.apply_memo});const p=q,l=async()=>{(await se(o)).status===0?(F({message:"申请出库成功！",type:"success"}),p("success"),m.value=!1):(F.error("申请出库失败！请重新操作"),m.value=!1)};return $({open:()=>{m.value=!0}}),M(()=>{k.all.clear()}),(b,u)=>{const n=r("el-button"),s=r("el-dialog");return D(),A(s,{modelValue:m.value,"onUpdate:modelValue":u[0]||(u[0]=f=>m.value=f),title:"再次申请",width:"20%",center:""},{footer:t(()=>[a("div",Ze,[e(n,{type:"primary",onClick:l},{default:t(()=>u[1]||(u[1]=[h(" 确认 ")])),_:1})])]),default:t(()=>[u[2]||(u[2]=a("div",{class:"warning-text"},[a("span",null,"确认操作将重新发起申请")],-1))]),_:1},8,["modelValue"])}}}),tt=B(et,[["__scopeId","data-v-ed671ff9"]]),ot={class:"module-common-wrapped"},lt={class:"module-common-content"},ut={class:"pane-content"},at={class:"pane-top"},rt={class:"module-common-header"},nt={class:"search-wrapped"},dt={class:"button-wrapped"},pt={class:"module-common-table"},st={class:"table-footer"},it={class:"pane-content"},_t={class:"pane-top"},ct={class:"module-common-header"},mt={class:"search-wrapped"},gt={class:"module-common-table"},bt={class:"table-footer"},ft=O({__name:"index",setup(T){const $=c(),q=c({first:"产品管理",second:"产品列表"}),m=c("first"),o=c(),p=c(),l=c([]),I=c([]),b=V=>{V.props.label=="产品列表"&&E(),V.props.label=="审核列表"&&W()},u=c(),n=V=>{k.emit("againId",V),u.value.open()},s=()=>{E(),W()},f=async()=>{l.value=await he(o.value)},g=async()=>{l.value=await ke(p.value)},i=c(),P=()=>{i.value.open()},C=c(),x=V=>{k.emit("applyOutId",V),C.value.open()},z=c(),j=V=>{k.emit("editproductId",V),z.value.open()},R=c(),v=V=>{k.emit("deleteproductId",V),R.value.open()},w=c(),ce=V=>{k.emit("auditproductId",V),w.value.open()},Q=c(),me=V=>{k.emit("withdrawproductId",V),Q.value.open()},S=L({productPageCount:1,productCurrentPage:1,applyPageCount:1,applyCurrentPage:1}),X=c(0),Y=async()=>{const V=await Pe();X.value=V.length,S.productPageCount=Math.ceil(V.length/10)};Y();const E=async()=>{l.value=await ne(1),Y()};E();const ge=async V=>{S.productCurrentPage=V,l.value=await ne(S.productCurrentPage)},Z=c(0),ee=async()=>{const V=await xe();Z.value=V.length,S.productPageCount=Math.ceil(V.length/10)};ee();const W=async()=>{I.value=await de(1),ee()};W();const be=async V=>{S.applyCurrentPage=V,I.value=await de(S.applyCurrentPage)};return M(()=>{k.all.clear()}),(V,d)=>{const te=r("el-input"),N=r("el-button"),y=r("el-table-column"),G=r("el-tag"),oe=r("el-table"),le=r("el-pagination"),ue=r("el-tab-pane"),fe=r("el-tabs");return D(),J(K,null,[e(Ie,{ref_key:"breadcrumb",ref:$,item:q.value},null,8,["item"]),a("div",ot,[a("div",lt,[e(fe,{modelValue:m.value,"onUpdate:modelValue":d[6]||(d[6]=_=>m.value=_),class:"demo-tabs",stretch:"true",onTabClick:b},{default:t(()=>[e(ue,{label:"产品列表",name:"first"},{default:t(()=>[a("div",ut,[a("div",at,[a("div",rt,[a("div",nt,[e(te,{modelValue:o.value,"onUpdate:modelValue":d[0]||(d[0]=_=>o.value=_),style:{width:"240px"},placeholder:"输入入库编号来搜索",clearable:"","suffix-icon":ae(re),onChange:d[1]||(d[1]=_=>f()),onClear:d[2]||(d[2]=_=>E())},null,8,["modelValue","suffix-icon"])]),a("div",dt,[e(N,{type:"primary",onClick:P,round:""},{default:t(()=>d[7]||(d[7]=[h("产品入库")])),_:1})])]),a("div",pt,[e(oe,{data:l.value,style:{width:"100%"},border:"","max-height":"650"},{default:t(()=>[e(y,{type:"index",width:"50"}),e(y,{prop:"product_id",label:"入库编号",width:"200"}),e(y,{prop:"product_name",label:"产品名称",width:"160"}),e(y,{prop:"product_category",label:"产品类别",width:"100"}),e(y,{prop:"product_unit",label:"单位"}),e(y,{prop:"product_in_warehouse_number",label:"库存数量",width:"100"}),e(y,{prop:"product_single_price",label:"产品单价",width:"150"}),e(y,{prop:"product_all_price",label:"库存总价",width:"100"}),e(y,{prop:"product_status",label:"库存状态",width:"100"},{default:t(({row:_})=>[_.product_in_warehouse_number<100?(D(),A(G,{key:0,type:"danger"},{default:t(()=>d[8]||(d[8]=[h("库存过少")])),_:1})):_.product_in_warehouse_number>=100&&_.product_in_warehouse_number<300?(D(),A(G,{key:1,type:"success"},{default:t(()=>d[9]||(d[9]=[h("库存正常")])),_:1})):(D(),A(G,{key:2,type:"warning"},{default:t(()=>d[10]||(d[10]=[h("库存过剩")])),_:1}))]),_:1}),e(y,{prop:"product_create_person",label:"入库负责人",width:"100"}),e(y,{prop:"product_create_time",label:"入库时间",width:"200"},{default:t(({row:_})=>{var U;return[a("div",null,H((U=_.product_create_time)==null?void 0:U.slice(0,10)),1)]}),_:1}),e(y,{prop:"product_update_time",label:"最后修改时间",width:"200"},{default:t(({row:_})=>{var U;return[a("div",null,H((U=_.product_update_time)==null?void 0:U.slice(0,10)),1)]}),_:1}),e(y,{prop:"in_memo",label:"入库备注",width:"200"}),e(y,{label:"操作",width:"300",fixed:"right"},{default:t(({row:_})=>[a("div",null,[e(N,{type:"primary",onClick:U=>x(_),disabled:_.product_out_status=="申请出库"||_.product_in_warehouse_number==0},{default:t(()=>d[11]||(d[11]=[h("申请出库")])),_:2},1032,["onClick","disabled"]),e(N,{type:"success",onClick:U=>j(_),disabled:_.product_out_status=="申请出库"},{default:t(()=>d[12]||(d[12]=[h("修改")])),_:2},1032,["onClick","disabled"]),e(N,{type:"danger",onClick:U=>v(_.id),disabled:_.product_out_status=="申请出库"},{default:t(()=>d[13]||(d[13]=[h("删除")])),_:2},1032,["onClick","disabled"])])]),_:1})]),_:1},8,["data"])])]),a("div",st,[e(le,{"page-size":1,"pager-count":7,layout:"prev, pager, next",total:X.value,"page-count":S.productPageCount,"current-page":S.productCurrentPage,onCurrentChange:ge},null,8,["total","page-count","current-page"])])])]),_:1}),e(ue,{label:"审核列表",name:"second"},{default:t(()=>[a("div",it,[a("div",_t,[a("div",ct,[a("div",mt,[e(te,{modelValue:p.value,"onUpdate:modelValue":d[3]||(d[3]=_=>p.value=_),style:{width:"240px"},placeholder:"输入申请出库编号来搜索",clearable:"","suffix-icon":ae(re),onChange:d[4]||(d[4]=_=>g()),onClear:d[5]||(d[5]=_=>W())},null,8,["modelValue","suffix-icon"])]),d[14]||(d[14]=a("div",{class:"button-wrapped"},null,-1))]),a("div",gt,[e(oe,{data:I.value,style:{width:"100%"},border:"","max-height":"650"},{default:t(()=>[e(y,{type:"index",width:"50"}),e(y,{prop:"product_out_id",label:"申请出库编号",width:"200"}),e(y,{prop:"product_name",label:"产品名称",width:"200"}),e(y,{prop:"product_out_number",label:"申请出库数量",width:"180"}),e(y,{prop:"product_out_price",label:"申请出库总价",width:"180"}),e(y,{prop:"product_out_apply_person",label:"申请人",width:"100"}),e(y,{prop:"product_apply_time",label:"申请出库时间",width:"180"},{default:t(({row:_})=>{var U;return[a("div",null,H((U=_.product_apply_time)==null?void 0:U.slice(0,10)),1)]}),_:1}),e(y,{prop:"product_out_audit_person",label:"审核人",width:"150"}),e(y,{prop:"product_audit_time",label:"审核时间",width:"180"},{default:t(({row:_})=>{var U;return[a("div",null,H((U=_.product_audit_time)==null?void 0:U.slice(0,10)),1)]}),_:1}),e(y,{prop:"product_out_status",label:"审核状态",width:"100"}),e(y,{prop:"apply_memo",label:"申请出库备注",width:"200"}),e(y,{prop:"audit_memo",label:"审核备注",width:"200"}),e(y,{label:"操作",width:"300",fixed:"right"},{default:t(({row:_})=>[a("div",null,[e(N,{type:"danger",onClick:U=>me(_.id),round:""},{default:t(()=>d[15]||(d[15]=[h("撤回申请")])),_:2},1032,["onClick"]),e(N,{type:"success",disabled:_.product_out_status=="申请出库",onClick:U=>n(_),round:""},{default:t(()=>d[16]||(d[16]=[h("再次申请")])),_:2},1032,["disabled","onClick"]),e(N,{type:"primary",onClick:U=>ce(_),round:""},{default:t(()=>d[17]||(d[17]=[h("审核")])),_:2},1032,["onClick"])])]),_:1})]),_:1},8,["data"])])]),a("div",bt,[e(le,{"page-size":1,"pager-count":7,layout:"prev, pager, next",total:Z.value,"page-count":S.applyPageCount,"current-page":S.applyCurrentPage,onCurrentChange:be},null,8,["total","page-count","current-page"])])])]),_:1})]),_:1},8,["modelValue"])])]),e(Fe,{ref_key:"inware",ref:i,onSuccess:E},null,512),e(Te,{ref_key:"apply",ref:C,onSuccess:s},null,512),e(Me,{ref_key:"editP",ref:z,onSuccess:E},null,512),e(je,{ref_key:"deleteP",ref:R,onSuccess:E},null,512),e(Ke,{ref_key:"auditP",ref:w,onSuccess:W},null,512),e(Ye,{ref_key:"withdrawP",ref:Q,onSuccess:s},null,512),e(tt,{ref_key:"againP",ref:u,onSuccess:s},null,512)],64)}}}),$t=B(ft,[["__scopeId","data-v-680ce51b"]]);export{$t as default};
