/**
 * 解析URL中参数并保存到pageData中
 * pageData.path: URL地址
 * pageData.params: URL参数
 */
var pageData = {};

/**
 * 只要引入该JS就会对当前URL进行解析，将url，ip,端口，参数等信息保存到pageData中
 */
(function prase(){
	var url = location.href;
	var index = url.indexOf('?')
	var path = index==-1 ? url : url.substr(0, index);
	var param = window.location.search.substr(1);
	var p={};
	if(param){
		var arr = param.split('&');
		for(var i=0; i<arr.length; i++){
			var temp = arr[i].split('=');
			if(temp){
				p[temp[0]] = temp[1] || '';
			}
		}
	}	
	pageData.path = path.substr(0, path.lastIndexOf('/')+1);
	pageData.params = p;
	pageData.action = p.action;		// 表示进入一个页面需要触发的动作
	pageData.from = p.from;			// 表示来自哪个页面
	pageData.pageNum = 1;			// 分页显示用的，表示当前请求的第几页 
	pageData.totalPage = 1;			// 分页显示用，
	pageData.pageSize = 10;			// 每页显示数量\n
	// 同步患者token
	if(window.location.href.substr(window.location.href.indexOf('/html/')+6, 7)=='patient' && p.enc && window.location.href.indexOf('bind.html')<0){
		save('patientToken', p.enc);
	}
//	else if(window.location.href.substr(window.location.href.indexOf('/html/')+6, 6)=='doctor' && p.enc){
//		save('doctorToken', p.enc);
//	}
	pageData.patientToken = p.enc || read('patientToken');
	pageData.doctorToken = read('doctorToken');
	//pageData.doctorToken = p.enc || read('doctorToken');
})();

/**
 * 页面跳转，该方法自动拼装参数
 * url: 待跳转的URL
 * params 参数map
 */
function jumpWithOldParams(url, params){
	var str = '';
	for(var key in params){
		pageData.params[key] = params[key];
	}
	for(var key in pageData.params){
		str += '&'+key+'='+pageData.params[key];
	}
	str = str.replace('&', '?');
	if(thisPageApp.saveData){
		thisPageApp.saveData();
	}
	location.href = url+str;
}

function jump(url, params){
	var str = '';
	for(var key in params){
		str += '&'+key+'='+params[key];
	}
	str = str.replace('&', '?');
	if(thisPageApp.saveData){
		thisPageApp.saveData();
	}
	if(url=='login.html')return;
	location.href = url+str;
}

/**
 * 翻页方法
 */
function canFlip(fn){
	var range = 1;
	$(window).scroll(function() {
		// 若当前页是最后一页
		if(pageData.pageNum == pageData.totalPage){
			return;
		}
		var docHeight = $(document).height(); //文档的高度
		var winHeight = $(window).height(); //窗口(视口)的高度
		var scrollHeight = $(document).scrollTop(); //滚动条的高度
		var height = $(window).scrollTop() + $(window).height(); //滚动的高度=滚动条的高度+窗口（视口）的高度
		//当滚动条的高度为0的时候，在底部追加p
		if (height >= docHeight - range) {
			pageData.pageNum++;
			fn();
		}
	});
}

function updateData(){
	pageData.doctorToken = read('doctorToken');
}
