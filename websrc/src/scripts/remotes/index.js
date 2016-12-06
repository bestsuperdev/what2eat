var {ajax} = require('../utils/ajax')
/*获取列表数据*/
function getList(success){
	return ajax({
		type:'GET',
		url:'/api/restaurant/list',
		body:'',
		success:success
	})
}

function getDetail(id,success){

}
/*修改*/
function save(data,success){
	return	ajax({
                type:'POST',
                url:'/api/restaurant/edit',
                body:{"id":data.id,"name":data.name,"address":data.address},
                success:success
             })
}
/*增加*/
function add (data,success) {
	return  ajax({
				type:'POST',
				url:'/api/restaurant/save',
				body:{"name":data.name,"address":data.address},
				success:success
			 })  
}
/*删除*/
function remove(id,success){
	return  ajax({
				type:'POST',
				url:'/api/restaurant/remove',
				body:{"id":id},
				success:success
			 })
}

module.exports = {getList,getDetail,save,add,remove}