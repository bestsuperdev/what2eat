var {insertRow} = require('./insertRow')

function searchRow(env){
	var restaurantLength = env.length;
	for(var i = restaurantLength-1; i >= 0 ; i--){
		      insertRow({ rowPosition: 1,
                        returnId: env[i].id,
                        resname: env[i].name,
                        resaddress: env[i].address,
                        createTime: env[i].createTime,
                        updateTime: env[i].updateTime})	
	}
}

module.exports = {searchRow}