webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	/*
		动态设置publicPath，在正式环境运行的时候为绝对路径，如果需要手动指定，可以直接设置
		__webpack_public_path__的值，如  __webpack_public_path__ = '/base/bundles/'

	 */
	var scripts = document.getElementsByTagName('script');
	for (var i = scripts.length - 1; i >= 0; i--) {
		if (scripts[i].src.indexOf('.bundle.js') >= 0) {
			var src = scripts[i].getAttribute('src');
			__webpack_require__.p = src.substr(0, src.lastIndexOf('/') + 1);
			break;
		}
	}
	var ajax = __webpack_require__(2);
	var restaurantLength;
	ajax({
		type: 'GET',
		url: '/api/restaurant/list',
		body: '',
		success: function success(env) {
			searchRow(env);
		}
	});
	var $container = document.querySelector("#eatTable");
	$container.hidden = false;
	document.getElementsByTagName("p")[0].hidden = false;
	var $del = document.getElementsByName("del");
	var $update = document.getElementsByName("update");
	var $resformMask = document.getElementById("resform-mask"); //获取弹出框对象
	var $form = document.getElementById("resform");
	$resformMask.hidden = true;
	var $conform = document.getElementById("conform"); //点击弹出框的确定按钮
	var $delform = document.getElementById("delform");
	var flag = 0; // 确定按钮 0代表新增 ；1 代表修改
	var id = '';
	var idvalue = '';
	function searchRow(env) {
		restaurantLength = env.length;
		for (var i = restaurantLength - 1; i >= 0; i--) {
			var insertR = $container.insertRow(1); //给表格添加一行(不包含单元格) 
			insertR.id = env[i].id; //
			var c0 = insertR.insertCell(0);
			c0.innerHTML = env[i].name;
			var c1 = insertR.insertCell(1);
			c1.innerHTML = env[i].address;
			var c2 = insertR.insertCell(2);
			c2.innerHTML = env[i].createTime;
			var c3 = insertR.insertCell(3);
			c3.innerHTML = env[i].updateTime;
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
			delBtn.onclick = function () {
				if (confirm('是否确定删除？')) {
					this.parentNode.parentNode.remove();
					ajax({
						type: 'POST',
						url: '/api/restaurant/remove',
						body: { "id": this.parentNode.parentNode.id },
						success: function success(env) {
							alert("删除成功");
						}
					});
				}
			};
			/*点击修改按钮	*/
			updatebtn.onclick = function () {
				$form.hidden = false;
				$resformMask.hidden = false;
				flag = 1;
				document.getElementsByTagName("h3")[0].innerHTML = '修改餐厅信息';
				var resname = document.getElementById("resname");
				var resaddress = document.getElementById("resaddress");
				resname.value = this.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
				resaddress.value = this.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML;
				id = this.parentNode.parentNode.getElementsByTagName("td");
				idvalue = this.parentNode.parentNode.id;
			};
		}
	}
	/*增加操作*/
	function addRow() {
		var returnId = ''; //添加成功返回的id
		var createTime = ''; //创建时间,服务端返回
		var updateTime = ''; //修改时间
		var resname = document.getElementById("resname").value;
		var resaddress = document.getElementById("resaddress").value;
		if (resname == '') {
			alert("餐厅名称不能为空");
			return;
		}
		ajax({
			type: 'POST', //添加操作
			url: '/api/restaurant/save',
			body: { "name": resname, "address": resaddress },
			success: function success(env) {
				returnId = env.id;
				createTime = env.createTime;
				updateTime = env.updateTime;
				if (env.code == 0) {
					alert("添加成功");
					insertRow(returnId, resname, resaddress, createTime, updateTime);
				} else {
					alert(env.message);
					console.log("111");
					return;
				}
			}
		});
	}

	function insertRow(returnId, resname, resaddress, createTime, updateTime) {
		var insertR = $container.insertRow($container.tBodies[0].rows.length - 1); //给表格添加一行(不包单元格),插入行的位置
		var c0 = insertR.insertCell(0);
		c0.innerHTML = resname;
		var c1 = insertR.insertCell(1);
		c1.innerHTML = resaddress;
		var date = new Date();
		var c2 = insertR.insertCell(2);
		c2.innerHTML = createTime;
		var c3 = insertR.insertCell(3);
		c3.innerHTML = updateTime;
		var c4 = insertR.insertCell(4);
		var delBtn = document.createElement('button');
		delBtn.className = 'del';
		delBtn.innerHTML = '删除';
		var updatebtn = document.createElement('button');
		updatebtn.className = 'update';
		updatebtn.innerHTML = '修改';
		/*点击删除按钮*/
		delBtn.onclick = function () {
			if (confirm('是否确定删除？')) {
				this.parentNode.parentNode.remove();
				ajax({
					type: 'POST',
					url: '/api/restaurant/remove',
					body: { "id": returnId },
					success: function success(env) {
						alert("删除成功");
					}
				});
			}
		};
		updatebtn.onclick = function () {
			$form.hidden = false;
			$resformMask.hidden = false;
			flag = 1;
			document.getElementsByTagName("h3")[0].innerHTML = '修改餐厅信息';
			var resname = document.getElementById("resname");
			var resaddress = document.getElementById("resaddress");
			resname.value = this.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
			resaddress.value = this.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML;
			id = this.parentNode.parentNode.getElementsByTagName("td");
			idvalue = returnId;
		};
		c4.appendChild(delBtn);
		c4.appendChild(updatebtn);
	}

	var $delform = document.getElementById("delform");
	var $addRow = document.getElementsByName("addRow");
	/*点击添加按钮*/
	$addRow[0].addEventListener("click", function (envent) {
		event.stopPropagation();
		$form.hidden = false;
		$resformMask.hidden = false;
		flag = 0;
		document.getElementById("resname").value = '';
		document.getElementById("resaddress").value = '';
	}, false);
	$delform.addEventListener("click", function (event) {
		event.stopPropagation();
		$form.hidden = true;
		$resformMask.hidden = true;
	}, false);
	$conform.addEventListener("click", function (event) {
		event.stopPropagation();
		if (!flag) {
			addRow();
		} else {
			var resname = document.getElementById("resname").value;
			var resaddress = document.getElementById("resaddress").value;
			ajax({
				type: 'POST', //修改操作
				url: '/api/restaurant/edit',
				body: { "id": idvalue, "name": resname, "address": resaddress },
				success: function success(env) {
					if (env.code == 0) {
						alert("修改成功");
						id[0].innerHTML = env.name;
						id[1].innerHTML = env.address;
						id[3].innerHTML = env.updateTime;
					} else {
						alert(env.message);
					}
				}
			});
		}
		$form.hidden = true;
		$resformMask.hidden = true;
	}, false);

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function ajax(opt) {
		opt = opt || {};
		var type = opt.type; //请求方式
		var url = opt.url || ''; //请求地址
		var data = opt.body || null; // 请求时传入的参数
		var success = opt.success || function () {}; //请求成功，调用方法
		var xmlHttp = null;
		if (XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		} else {
			xmlHttp = new ActiveXObject('Microsoft.HMLHTTP');
		}
		var dataStr = JSON.stringify(data);
		if (type == 'GET') {
			xmlHttp.open(type, url, true);
			xmlHttp.send();
		} else {
			//针对POST
			xmlHttp.open(type, url, true);
			xmlHttp.setRequestHeader('Content-Type', 'application/json');
			xmlHttp.send(dataStr);
		}
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4 && xmlHttp.status >= 200 && xmlHttp.status < 300) {

				success(JSON.parse(xmlHttp.responseText));
			}
		};
	}
	module.exports = ajax;

/***/ }
]);