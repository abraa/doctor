/**
 * 是否微信浏览器
 */
function isWeiXin(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
	return false;
}

/**
 * 判断是否是手机号
 * @param {Object} mob
 */
function isMobile(mob){
	var reg=/^1[34578]\d{9}$/;
	if(!reg.test(mob)){
		return false;
	}
	return true;
}

/**
 * 验证密码格式
 * @param {Object} pwd
 */
function isPwd(pwd){
	var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
	if(!reg.test(pwd)){
		return false;
	}
	return true;
}

/**
 * 名字验证，2-5个字符
 * @param {Object} name
 */
function isName(name){
	if(name.length >5 || name.length<2){
		return false;
	}
	return true;
}

/**
 * 两点间距离
 */
function getDistant(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(Math.abs(x1-x2), 2)+Math.pow(Math.abs(y1-y2), 2));
}

/**
 * 返回上一页
 */
function goBack(){
	window.location.href = (document.referrer || window.history.go(-1) || window.back() || window.history.back());
};

/**
 * 保存数据，目前以cookie方式保存
 * @param {Object} key
 * @param {Object} value
 * @param {Object} date
 */
function save(key, value, date){
	date = date || 300000;
	$.cookie(key, value, {expires:date, domain:domain_way, path:'/'});
}

/**
 * 读取数据，目前以cookie的方式读取
 * @param {Object} key
 */
function read(key){
	return $.cookie(key);
}

/**
 * 清除数据
 * @param {Object} key
 */
function clear(key){
	$.cookie(key, null, {expires:-1, domain:domain_way, path:'/'});
}

/**
 * 清除所有数据
 * 目前cookie只保存：
 * 1.用户信息
 * 2.地址信息
 */
function clearAll(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i=keys.length; i--;){
        	clear(key);
        }
    }
}

/**
 * 防止弹出层时背景层被拖动
 */
function lockBody(){
	$('body').css({'overflow':'hidden','zoom':1});
}

/**
 * 解除锁定
 */
function unlockBody(){
	$('body').css({'overflow':'auto','zoom':1});
}

/**
 * 复制对象
 * @param {Object} obj
 */
function cloneObj(obj){
	var result = {};
	for(var key in obj){
		if(obj[key] instanceof Object){
			cloneObj(obj[key]);
		}else{
			result[key] = obj[key];
		}
	}
	return result;
}

/**
 * 复制数组
 * @param {Object} arr
 */
function cloneArr(arr){
	var result = [];
	for(var i=0; i<arr.length; i++){
		result.push(arr[i]);
	}
	return result;
}

function getYMD(d){
	return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}

function mills2hour(mills){
	var seconds = parseInt(mills / 1000);
	if(seconds >= 3600){
		return '59:59';
	}
	seconds = seconds % 3600;
	var m = parseInt(seconds/60);
	var mstr = m>0 ? ((m<10)? '0'+m+':' : m+':') : '00:';
	var s = seconds % 60;
	var sstr = s>0 ? ((s<10)? '0'+s : s) : '00';
	return mstr + sstr;
}

function timeDown(time){
	if(!time){
		return '';
	}
	var arr = time.split(':');
	if(arr[1] != '00'){
		arr[1] = arr[1]-1 > 9 ? arr[1]-1 : '0'+(arr[1]-1);
	}else{
		arr[1] = 59;
		arr[0] = arr[0]-1 > arr[0]-1 ? arr[0]-1 : '0'+arr[0]-1;
	}
	return arr.join(':');
}


function doctorAuth(){
	getDoctorIndexData_ip(doctorAuthCB);
}

function doctorAuthCB(json){
	if(json.code == 0){
		if(json.result.status != 3 && json.result.status != 4 && json.result.status != 5 && json.result.status != 8){
			//alert('您未通过申请，不能进行该操作！');
			jump('index.html');
		}
	}else{
		//alert(json.msg);
		jump('index.html');
	}
}

/**
 * 数组逆序
 * @param {Object} data
 */
function reverse(data){
	var arr = [];
	for(var i=data.length-1; i>=0; i--){
		arr.push(data[i]);
	}
	return arr;
}

/**
 * 传入一个数组，按照传入的index作为第一个元素，依次重新排列数组,并返回新数组
 * @param {Object} arr
 * @param {Object} index
 */
function getArrByIndex(arr, index){
	var result = [];
	for(var i=index; i<arr.length; i++){
		result.push(arr[i]);
	}
	for(var i=0; i<index; i++){
		result.push(arr[i]);
	}
	return result;
}

/**
 * 滚动条置底
 * @param {Object} dom
 */
function scrollDown(dom){
	dom = dom || $('body');
	dom.scrollTop(dom[0].scrollHeight);
}

function getSettingDateFormat(d){
	return d.getMonth()+1 + '/' + d.getDate();
}

function getWeek(d){
	switch(d.getDay()){
		case 0:
			return '周天';
		case 1:
			return '周一';
		case 2: 
			return '周二';
		case 3:
			return '周三';
		case 4:
			return '周四';
		case 5:
			return '周五';
		case 6:
			return '周六';
	}
}

//计算天数差的函数，通用  
   function  getDateDiff(date1,  date2){    //sDate1和sDate2是2006-12-18格式  
   		if(date1.getFullYear()==date2.getFullYear() && date1.getDate()==date2.getDate() && date1.getMonth()==date2.getMonth()){
   			return 0;
   		}
       iDays  =  parseInt(Math.abs(date1  -  date2)  /  1000  /  60  /  60  /24)+1    //把相差的毫秒数转换为天数  
       return  iDays  
   }    

var showLoading = function(){
	var html = '<div class="load-mask"><img class="loading" src="../../img/loading.gif" style="width:90px;height:90px;position:fixed;top:50%;left:50%;margin-left:-45px;margin-top:-45px;"/></div>';
	$('body').append(html);
//	var imgW = 90;//$('.loading')[0].clientWidth;
//	var imgH = 90;//$('.loading')[0].clientHeight;
//	var mTop = screenHeight / 2 - imgH / 2;
//	var mRight = screenWidth / 2 - imgW / 2;
//	$('.mask').css('padding', mTop+'px '+mRight+'px');
}

var closeLoading = function(){
	//setTimeout(function(){
		$('.load-mask').remove();
	//}, 1500);
}


var clearSessionStorage = function(){
	sessionStorage.clear();
}

var base64ToformData = function(base64, type){
	var type = type || 'image/png'
	var text = window.atob(base64.split(",")[1]);
    var buffer = new ArrayBuffer(text.length);
    var ubuffer = new Uint8Array(buffer);
    var pecent = 0 , loop = null;

    for (var i = 0; i < text.length; i++) {
        ubuffer[i] = text.charCodeAt(i);
    }
    
	var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
	var blob;
	 if (Builder) {
        var builder = new Builder();
        builder.append(buffer);
        blob = builder.getBlob(type);
    } else {
        blob = new window.Blob([buffer], {'type': type});
    }
    
    return blob;
}

function drawCover(ctx, x, y, width, height){
	ctx.save();
	ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fillRect(x, y, width, height);
	ctx.restore();
}
