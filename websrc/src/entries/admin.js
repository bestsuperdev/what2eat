require('bootstrap/dist/css/bootstrap.css')
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

window.$ = window.jQuery = require('jquery')
require('bootstrap')
var {getList,save} = require('../scripts/remotes')
var {ajax} = require('../scripts/utils/ajax');
var {addRow} = require('../scripts/table/addRow');
var {insertRow} = require('../scripts/table/insertRow')

var restaurantLength;
getList(searchRow)
var $container = document.querySelector("#eatTable");
$container.hidden = false;
function searchRow(env){
	restaurantLength = env.length;
	for(var i = restaurantLength-1; i >= 0 ; i--){
		      insertRow({ rowPosition: 1,
                        returnId: env[i].id,
                        resname: env[i].name,
                        resaddress: env[i].address,
                        createTime: env[i].createTime,
                        updateTime: env[i].updateTime })	
	}
}
/*处理新增时候输入框清空*/
$('#conform').click(function (event){
 	event.stopPropagation();
 	addRow();
 	$('#myModal').modal('hide');
})
var id ='';
var idvalue = '';
$('#myModal').on('shown.bs.modal', function (e) {
     if(!(e.relatedTarget.parentNode.parentNode.id.match(/[0-9].*/))){
		 	 $('#resaddress').val('');
		     $('#resname').val('');
		     $("#updateform").hide();//更新确定按钮隐藏
			 $("#conform").show();
			 $('#h3').text('新增餐厅信息');
     }else{
     		 $("#updateform").show();
		     $("#conform").hide();
		     $('#h3').text('修改餐厅信息');
     	     $('#resname').val(e.relatedTarget.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML);
		     $('#resaddress').val(e.relatedTarget.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML);
		     idvalue = e.relatedTarget.parentNode.parentNode.id;
		     id =  e.relatedTarget.parentNode.parentNode;
		 }
})
$('#myModalAdd').on('shown.bs.modal', function (e) {
		 	 $('#resaddress').val('');
		     $('#resname').val('');
		     $("#updateform").hide();//更新确定按钮隐藏
			 $("#conform").show();
     }
)
$('#updateform').click(
	function (){
				var data = {id : idvalue, name : $('#resname').val(), address : $('#resaddress').val()};	
				save(data,function (env){					
                 if (env.code == 0) {          	
	                    alert("修改成功");
	                    $('#myModal').modal('hide');
	                    id.getElementsByTagName("td")[0].innerHTML= env.name;
	                    id.getElementsByTagName("td")[1].innerHTML = env.address;
	                    id.getElementsByTagName("td")[2].innerHTML = env.updateTime;
                } else {
                    	alert(env.message)
        		}
        })
	}
)
/*分页*/
$('li').click(function (){
	console.log($(this).text())//$(this).text()
	$('ul li').removeClass('active');
	console.log($(this).addClass('active'));
	//发送ajax请求，查询一次数据
  }
);