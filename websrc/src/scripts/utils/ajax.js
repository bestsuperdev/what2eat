
function ajax(opt){
	opt = opt || {};
	var type = opt.type;//请求方式
	var url = opt.url||''; //请求地址
	var data = opt.body || null; // 请求时传入的参数
	var success = opt.success || function () {}; //请求成功，调用方法
	var xmlHttp = null;
	if(XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else{
		xmlHttp = new ActiveXObject('Microsoft.HMLHTTP');
	}
	var dataStr = JSON.stringify(data);
	if (type == 'GET') {
		xmlHttp.open(type,url,true);
		xmlHttp.send();
	} else {//针对POST
		xmlHttp.open(type,url,true);
		xmlHttp.setRequestHeader('Content-Type','application/json');
		xmlHttp.send(dataStr);
	}
	xmlHttp.onreadystatechange = function (){
		if (xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status <300 )) {

			success(JSON.parse(xmlHttp.responseText));
		} 
	}
}
module.exports = ajax;