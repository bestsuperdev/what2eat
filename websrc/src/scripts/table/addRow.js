var {add} = require('../remotes')
var {insertRow} = require('./insertRow');
/*增加操作*/
function addRow(){
	var resname = $("#resname").val();
	var resaddress = $("#resaddress").val();
    if(resname == ''){
     	alert("餐厅名称不能为空");
     	return;
    } 
    if (resaddress == '') {
      	alert("餐厅地址不能为空");
     	return;
    }
    var data = {name:resname,address:resaddress} ;
    add(data,function(env){
             if(env.code == 0){
                    alert("添加成功");                    
                    insertRow({
                        rowPosition: (document.querySelector("#eatTable").tBodies[0].rows.length-1),
                        returnId: env.id,
                        resname: resname,
                        resaddress: resaddress,
                        createTime: env.createTime,
                        updateTime: env.updateTime
                    })
                    $('#myModal').modal('hide');
                }else{
                    alert(env.message)
                    return;
                }
    });
}

module.exports = {addRow};