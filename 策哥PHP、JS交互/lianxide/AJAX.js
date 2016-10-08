
/*

	* 这是函数，用来请求网络数据

	* type,请求类型 GET/POST

	* url,服务器地址/网络请求地址 

	* data,是一个对象，用来存放参数信息

	*** data = {
			key1: value1,
			key2: value2
		}

	* isAsync, 是否异步请求

	* fnSuccess,是一个函数，用来执行成功回调

	* fnFailure,是一个函数，用来执行错误回调

*/

function AJAX(type,url,data,isAsync,fnSuccess,fnFailure) {

	// type转大写
	type = type.toUpperCase();

	// 拼接data
	var arr = [];
	for(var key in data) {
		var row = key + "=" + data[key];
		arr.push(row);
	}
	var deTail = arr.join("&");

	var ajax = null;
	if (window.ActiveXObject) {
		ajax = new ActiveXObject();
	} else {
		ajax = new XMLHttpRequest();
	}

	//分析是get还是post
	if (type === "GET") {
		//GET 请求
		var requestURL = url+"?"+deTail;
		ajax.open("GET",requestURL,isAsync);
		deTail = null;
	} else {
		//POST 请求
		ajax.open("POST",url,isAsync);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}

	//监听  并回调
	ajax.onreadystatechange = function() {
		var numSta = ajax.status;
		var result = ajax.responseText;
		if (numSta == 200) {
			//成功
			fnSuccess(result);
		} else {
			//失败
			fnFailure(result);
		}
	}

	//发送
	ajax.send(deTail);
}





