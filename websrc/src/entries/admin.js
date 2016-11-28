require('styles/admin.less')
/*
	动态设置publicPath，在正式环境运行的时候为绝对路径，如果需要手动指定，可以直接设置
	__webpack_public_path__的值，如  __webpack_public_path__ = '/base/bundles/'

 */
var scripts = document.getElementsByTagName('script')
for (var i = scripts.length - 1; i >= 0; i--) {
	if(scripts[i].src.indexOf('.bundle.js') >= 0){
		var src = scripts[i].getAttribute('src')
		__webpack_public_path__ = src.substr(0, src.lastIndexOf('/') + 1)
		break
	}
}

var xmlHttp;
var restaurantlists;//餐馆列表
var restaurantlist;
var restaurantLength;
if(window.XMLHttpRequest){
 	xmlHttp = new XMLHttpRequest();
 }else{
 	xmlHttp = new ActiveXObject("Microsoft.HMLHTTP");
 }

 xmlHttp.onreadystatechange = function (){
 	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
 		restaurantlists = xmlHttp.responseText;
 		restaurantlist = JSON.parse(restaurantlists);
 	 	searchRow();	
 	}
 }

xmlHttp.open("GET","/api/restaurant",true);
xmlHttp.send();

var $container = document.querySelector("#eatTable");
$container.hidden = false;
var $del = document.getElementsByName("del");
var $update = document.getElementsByName("update");
var $resformMask = document.getElementById("resform-mask");//获取弹出框对象
var $form = document.getElementById("resform");
$resformMask.hidden = true;
var $conform = document.getElementById("conform");//点击弹出框的确定按钮
var $delform = document.getElementById("delform");
var flag = 0;// 确定按钮 0代表新增 ；1 代表修改
var id = '';
var idvalue = '';
function searchRow(){
	restaurantLength = restaurantlist.length;
	for(var i = restaurantLength-1; i >= 0 ; i--){
		var insertR = $container.insertRow(1); //给表格添加一行(不包含单元格) 
		 insertR.id =restaurantlist[i].id ;//
	    var c0 = insertR.insertCell(0);       
	    c0.innerHTML = restaurantlist[i].name;
	    var c1 = insertR.insertCell(1);
	    c1.innerHTML = restaurantlist[i].address;
	    var c2 = insertR.insertCell(2);
	    c2.innerHTML = Math.round(Math.random() * 101);
	    var c3 = insertR.insertCell(3);
	    var date = new Date();
	    var dateuse = "";
	    dateuse += date.getFullYear();
	    if(date.getMonth()<10){
	    	dateuse += "0"+date.getMonth();
	    }else{
	    	dateuse += date.getMonth();
	    }
		if(date.getDay()<10){
			dateuse += "0"+date.getDay();
		}else{
			dateuse += date.getDay();
		}
	    c3.innerHTML = dateuse;
	     var c4 = insertR.insertCell(4);
	     var delBtn = document.createElement('button');
	     delBtn.className = 'del';
	     delBtn.innerHTML = '删除';
	     var updatebtn = document.createElement('button');
	     updatebtn.className = 'update';
	     updatebtn.innerHTML = '修改';
	     c4.appendChild(delBtn);
	     c4.appendChild(updatebtn);
	     /*点击删除按钮*/
	     delBtn.onclick = function ()　{
	     	if(confirm('是否确定删除？')){
	     		this.parentNode.parentNode.remove();
	     		 /*发送请求*/
					xmlHttp.onreadystatechange = function (){
					   if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					 		alert("删除成功");
					 	}
					 }
					xmlHttp.open("DELETE","/api/restaurant/" + this.parentNode.parentNode.id,true);
					 //设置表单提交时的内容类型
			        xmlHttp.setRequestHeader("Content-Type", "application/json");
			        var postValue = {"name":resname,"address":resaddress}
			        console.log(postValue +"---"+this.parentNode.parentNode.id)
			        var params = JSON.stringify(postValue)
			        xmlHttp.send(params);
	     	}
	     }　
	     /*点击修改按钮	*/
	     updatebtn.onclick = function() {
	     	$form.hidden = false;
	     	$resformMask.hidden = false;
	     	flag = 1;
	  		document.getElementsByTagName("legend")[0].innerHTML = '修改餐厅信息';	
	     	var resname = document.getElementById("resname");
	 		var resaddress = document.getElementById("resaddress");
	 		resname.value = this.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
	 		resaddress.value = this.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML;
	 		id = this.parentNode.parentNode.getElementsByTagName("td");	 		
			idvalue = this.parentNode.parentNode.id;			
	     }	    
	}
}
/*增加操作*/
function addRow(){
	var returnId = '';//添加成功返回的id
	var resname = document.getElementById("resname").value;
	var resaddress = document.getElementById("resaddress").value;
    if(resname == ''){
     	alert("餐厅名称不能为空");
     	return;
    }   
	var insertR = $container.insertRow($container.tBodies[0].rows.length-1); //给表格添加一行(不包单元格),插入行的位置
    var c0 = insertR.insertCell(0);       
    c0.innerHTML = resname;
    var c1 = insertR.insertCell(1);
    c1.innerHTML = resaddress;
    var c2 = insertR.insertCell(2);
    c2.innerHTML = Math.round(Math.random() * 101);
    var c3 = insertR.insertCell(3);
    var date = new Date();
    var dateuse = "";
    dateuse += date.getFullYear();
    if(date.getMonth()<10){
    	dateuse += "0"+date.getMonth();
    }else{
    	dateuse += date.getMonth();
    }
	if(date.getDay()<10){
		dateuse += "0"+date.getDay();
	}else{
		dateuse += date.getDay();
	}
    c3.innerHTML = dateuse;
     var c4 = insertR.insertCell(4);
     var delBtn = document.createElement('button');
     delBtn.className = 'del';
     delBtn.innerHTML = '删除';
     var updatebtn = document.createElement('button');
     updatebtn.className = 'update';
     updatebtn.innerHTML = '修改';
     delBtn.onclick = function () {
     	if(confirm("是否确定删除？")){
     		this.parentNode.parentNode.remove();
     		 /*发送请求*/
			xmlHttp.onreadystatechange = function (){
			   if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
			 		alert("删除成功");
			 	}
			 }
			xmlHttp.open("DELETE","/api/restaurant/" + returnId,true);
			 //设置表单提交时的内容类型
	        xmlHttp.setRequestHeader("Content-Type", "application/json");
	        var postValue = {"name":resname,"address":resaddress}
	        var params = JSON.stringify(postValue)
	        xmlHttp.send(params);
     	}
     }	
     updatebtn.onclick = function() {
		$form.hidden = false;
		$resformMask.hidden = false;
		flag = 1;
		document.getElementsByTagName("legend")[0].innerHTML = '修改餐厅信息';	
     	var resname = document.getElementById("resname");
 		var resaddress = document.getElementById("resaddress");
 		resname.value = this.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
 		resaddress.value = this.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML;
 		id = this.parentNode.parentNode.getElementsByTagName("td");
 		idvalue = returnId;
     }
     c4.appendChild(delBtn);
     c4.appendChild(updatebtn);
     /*发送请求*/
		xmlHttp.onreadystatechange = function (){
		   if(xmlHttp.readyState == 4 && (xmlHttp.status >= 200 && xmlHttp.status < 300)){
		   	returnId = JSON.parse(xmlHttp.responseText).id;
		 		alert("添加成功");
		 	}
		 }
		xmlHttp.open("POST","/api/restaurant/",true);
		 //设置表单提交时的内容类型
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        var postValue = {"name":resname,"address":resaddress}
        var params = JSON.stringify(postValue)
        xmlHttp.send(params);

}
var $delform = document.getElementById("delform");
var $addRow = document.getElementsByName("addRow");
/*点击添加按钮*/
$addRow[0].addEventListener("click", function (envent){
	event.stopPropagation();
	$form.hidden = false;
	$resformMask.hidden = false;
	flag = 0;
	document.getElementById("resname").value = '';
	document.getElementById("resaddress").value = '';
}, false)
$delform.addEventListener("click", function (event){
 	event.stopPropagation();
	$form.hidden = true;
	$resformMask.hidden = true;
},false)
$conform.addEventListener("click", function (event){
 	event.stopPropagation();
 	if (!flag) {
		addRow();		
 	}else {
 		var resname = document.getElementById("resname").value;
 		var resaddress = document.getElementById("resaddress").value;
 		id[0].innerHTML = resname;
 		id[1].innerHTML = resaddress;
 		/*发送请求*/
		xmlHttp.onreadystatechange = function (){
		   if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
		 		alert("修改成功");
		 	}
		 }
		xmlHttp.open("PATCH","/api/restaurant/" + idvalue ,true);
		 //设置表单提交时的内容类型
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        var postValue = {"name":resname,"address":resaddress}
        var params = JSON.stringify(postValue)
        xmlHttp.send(params);
	}	
	$form.hidden = true;
	$resformMask.hidden = true;
},false)