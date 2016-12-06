var {remove,save} = require('../remotes')
function insertRow (opt) {
    var rowPosition = opt.rowPosition;
    var returnId = opt.returnId;
    var resname = opt.resname;
    var resaddress = opt.resaddress;
    var createTime = opt.createTime;
    var updateTime = opt.updateTime;
	var insertR = document.querySelector("#eatTable").insertRow(rowPosition); //给表格添加一行(不包单元格),插入行的位置
       insertR.id = returnId; 
    var c0 = insertR.insertCell(0);       
    c0.innerHTML = resname;
    var c1 = insertR.insertCell(1);
    c1.innerHTML = resaddress;
    var c2 = insertR.insertCell(2);
    var c3 = insertR.insertCell(3); 
    if (createTime == null || createTime == undefined ) {
    	c2.innerHTML = '';
    }else {
    	c2.innerHTML = createTime;
    }
  	if (createTime == null || createTime == undefined ) {
  		c3.innerHTML = '';
  	}else {
  		c3.innerHTML = updateTime;
  	}   
     var c4 = insertR.insertCell(4);
     var delBtn = document.createElement('button');
     delBtn.className = 'btn-primary btn';
     delBtn.innerHTML = '删除';
     var updatebtn = document.createElement('button');
     updatebtn.className = 'btn-primary btn';
     updatebtn.innerHTML = '修改'; 
     updatebtn.dataset.toggle="modal";
     updatebtn.dataset.target = "#myModal";
	 /*点击删除按钮*/
     delBtn.onclick = function ()　{
     	if(confirm('是否确定删除？')){
     		this.parentNode.parentNode.remove();
            remove(returnId,function (){
                alert('删除成功')
            }) 	
     	}
     }　    
     c4.appendChild(delBtn);
     c4.appendChild(updatebtn);
}
module.exports = {insertRow} ;