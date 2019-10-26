/*jshint esversion: 6 */
function SendAjax(obj){
    function createAJAX(){
        let ajax = null;
        if(window.XMLHttpRequest){
            ajax=new XMLHttpRequest();
        }else if(window.ActiveXObject){
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }else{
            alert("请升级浏览器");
        }
        return ajax;
    }
    let ajax=createAJAX();
    obj.asyncOther=true;
    if(obj.async==false){
        obj.asyncOther=obj.async;
    }
    if(obj.url==="") alert("网络开了点小差");
    else ajax.open(obj.method,obj.url,obj.asyncOther);
    ajax.onreadystatechange=function(){
        if(ajax.readyState===4&&ajax.status===200){
           obj.success(ajax.responseText);
        }
    };
    if(obj.method==='get'||obj.method===undefined){
        ajax.send(null);
    }else if(obj.method==='post'){
        ajax.setRequestHeader("content-type",'application/x-www-form-urlencoded');
        var str="",v="",f=false;
        if(obj.data==="") alert("网络开了点小差！");
        else for(var attr in obj.data){
            str+=v+attr+"="+obj.data[attr];
            v="&";
            if(obj.data[attr]!=''){
                f=true;
            }else if(obj.data[attr]==""){
                f=false;
                alert("网络开了点小差");
                return f;
            }
        }
        if(f){
            ajax.send(str);
        }
    }
}
/* 
请求方式
请求地址
请求的数据(传一个对象)
请求成功要执行成功的函数
*/
// SendAjax({
//     "method":"get",
//     "url":"select.php",
//     data:{},
//     async:true,
//     success:function (res) {
//         console.log(res);
//     }
// })
function PAjax(obj){
    return new Promise(resolve=>{
        SendAjax({
            method:obj.method,
            url:obj.url,
            data:obj.data,
            async:obj.async,
            success:function(res){
                resolve(res);
            }
        });
    });
}
/* 
请求方式
请求地址
请求的数据(传一个对象)
是否异步（默认异步）
后跟then
*/
// PAjax({
//     method:"",(不填默认get)
//     url:"",(必须)
//     data:{},(post传输时必选)
//     async:true(可选，默认true)
// })