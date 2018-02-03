
(function(){
	var mkui = window['mkui'] = window.$$ = {};
	
	/**
	 * @description 选择器
	 * @example $('#mkui'), $(h1),$('.p')
	 * */
	$$ = function(ele){
			if(ele.indexOf('#')==0){
					return document.querySelector(ele);
			}else{
					return document.querySelectorAll(ele);
			}
		};
	
	/**
	 * @description 获取值
	 * */
	$$.val = function(ele,val){
		return ele.value = val;
	};
	
	/**
	 *@description 
	 */
	$$.html = function(ele,html){
		return ele.innerHTML = str;
	};
	
	/**
	 * @description JSON对象转成数组
	 */
	$$.jsonToArray = function(param){
			var str = JSON.stringify(param).replace(/^{|}|\"|$/g,'').split(',');
			var arr = [];
			for(var i = 0; i<str.length;i++){
				arr.push(str[i].split(':'));
			}
			return arr;
		};
	
	
	
	/**
	 * @description 
	 * */
	$$.text = function(ele,str){
		return ele.innerText = str;
	};
	
 	/**
	 * @description 添加样式
	 * @example
	 * */
	$$.addClass = function(obj, sClass) { 
	    var aClass = obj.className.split(' ');
	    if (!obj.className) {
	        obj.className = sClass;
	        return;
	    }
	    for (var i = 0; i < aClass.length; i++) {
	        if (aClass[i] === sClass) return;
	    }
	    obj.className += ' ' + sClass;
	};
	
	
	/**
	 * @description 删除样式
	 * @example
	 * */
	$$.removeClass = function(obj, sClass){ 
	   var aClass = obj.className.split(' ');
	    if (!obj.className) return;
	    for (var i = 0; i < aClass.length; i++) {
	        if (aClass[i] === sClass) {
	            aClass.splice(i, 1);
	            obj.className = aClass.join(' ');
	            break;
	        }
	    }
	};
	
	/**
	 *@description tab切换
	 *@example $$.tab('.tab-t ul li','.tab-c .tab-cont');
	 *@html 
	 * <section class="tab-t">
	 * 	  <ul>
	 * 		<li></li>
	 * 		<li></li>
	 * 	 </ul>
	 * </section>
	 * <section class="tab-c">
	 * 	  <div class="tab-cont"></div>
	 * 	  <div class="tab-cont"></div>
	 * </section>
	 */
	$$.tab = function(th,tc){
				var th = $(th);
				var tc = $(tc);
					for(var i=0;i<th.length;i++){
						th[i].index=i;
						
						th[i].onclick = function(){
							for(var i=0;i<th.length;i++){
								$$.removeClass(th[i],'current');
								$$.addClass(tc[i],'none');
							}
							
							$$.addClass(this,'current')
							$$.removeClass(tc[this.index],'none')
							
						}
		 			}
			};
			
	/**
	 * @description tab切换，jQuery使用方法
	 * */
	$$.tabJquery = function(tab,tabcont){
		var tab =$(tab);
		var tabcont =$(tabcont);
		tab.click(function(){
			$(this).addClass('current').siblings().removeClass('current');
			tabcont.eq($(this).index()).show().siblings().hide();
		});
	};

	/**
	 * 判断是否是手机号
	 * @param {Object} num
	 */
	$$.isMobile = function(num){
		var reg=/^(1[\d]{10})$/;
		if(!reg.test(num)){
			return false;
		}
		return true;
	};
	
	/**
	 * 判断是否是验证码
	 */
	$$.isIdentityCode = function(num){
		var reg=/^([\d]{4})$/;
		if(reg.test(num)){
			return true;
		}
		return false;
	}
	
	/**
	 * 判断身份证号
	 * @param {Object} num
	 */
	$$.isIdNumber = function(code){
		
		var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
           };

		checkCard = function(card)
		{
		    //是否为空
		    if(card === '')
		    {
		        return false;
		    }
		    //校验长度，类型
		    if(isCardNo(card) === false)
		    {
		        return false;
		    }
		    //检查省份
		    if(checkProvince(card) === false)
		    {
		        return false;
		    }
		    //校验生日
		    if(checkBirthday(card) === false)
		    {
		        return false;
		    }
		    //检验位的检测
		    if(checkParity(card) === false)
		    {
		        return false;
		    }
		    return true;
		};
		
		
		//检查号码是否符合规范，包括长度，类型
		isCardNo = function(card)
		{
		    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
		    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
		    if(reg.test(card) === false)
		    {
		        return false;
		    }
		
		    return true;
		};
		
		//取身份证前两位,校验省份
		checkProvince = function(card)
		{
		    var province = card.substr(0,2);
		    if(vcity[province] == undefined)
		    {
		        return false;
		    }
		    return true;
		};
		
		//检查生日是否正确
		checkBirthday = function(card)
		{
		    var len = card.length;
		    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
		    if(len == '15')
		    {
		        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
		        var arr_data = card.match(re_fifteen);
		        var year = arr_data[2];
		        var month = arr_data[3];
		        var day = arr_data[4];
		        var birthday = new Date('19'+year+'/'+month+'/'+day);
		        return verifyBirthday('19'+year,month,day,birthday);
		    }
		    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
		    if(len == '18')
		    {
		        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		        var arr_data = card.match(re_eighteen);
		        var year = arr_data[2];
		        var month = arr_data[3];
		        var day = arr_data[4];
		        var birthday = new Date(year+'/'+month+'/'+day);
		        return verifyBirthday(year,month,day,birthday);
		    }
		    return false;
		};
		
		//校验日期
		verifyBirthday = function(year,month,day,birthday)
		{
		    var now = new Date();
		    var now_year = now.getFullYear();
		    //年月日是否合理
		    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
		    {
		        //判断年份的范围（3岁到100岁之间)
		        var time = now_year - year;
		        if(time >= 3 && time <= 100)
		        {
		            return true;
		        }
		        return false;
		    }
		    return false;
		};
		
		//校验位的检测
		checkParity = function(card)
		{
		    //15位转18位
		    card = changeFivteenToEighteen(card);
		    var len = card.length;
		    if(len == '18')
		    {
		        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		        var cardTemp = 0, i, valnum;
		        for(i = 0; i < 17; i ++)
		        {
		            cardTemp += card.substr(i, 1) * arrInt[i];
		        }
		        valnum = arrCh[cardTemp % 11];
		        if (valnum == card.substr(17, 1))
		        {
		            return true;
		        }
		        return false;
		    }
		    return false;
		};
		
		//15位转18位身份证号
		changeFivteenToEighteen = function(card)
		{
		    if(card.length == '15')
		    {
		        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		        var cardTemp = 0, i;  
		        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
		        for(i = 0; i < 17; i ++)
		        {
		            cardTemp += card.substr(i, 1) * arrInt[i];
		        }
		        card += arrCh[cardTemp % 11];
		        return card;
		    }
		    return card;
		};
		
		return checkCard(code);
	}
	
	/**
	 * @description 判断是否有值
	 */
	$$.isValue = function(ele){
		if($$.val(ele)){
			return ture;
		}
		return false;
	}
	
	
	/**
	 * @description 弹出公用弹层
	 * @example $$.alert();
	 */
	$$.layer = function(json,fn){
		var ele = document.createElement('div');
			ele.className = 'mask';
			ele.id = 'pop';
			var str = '<div class="pop" style="width:'+json['width']+'px;height:'+json['height']+'px;">'+
					  '</div>';
			ele.innerHTML = str;
			document.body.insertBefore(ele,$$("#script")||$$('script')[0]);
			fn?fn():null;
	};

	/**
	 * @description 删除公用弹层
	 * @example $$.delAlert();
	 * */
	$$.delLayer =function(){
		if($$('#pop')){
			document.body.removeChild($$('#pop'));
		}		
 	};
 	
 	/**
 	 *@description alert弹层
 	 *@example var json = {
 			"width":width,
 			"height":height,
 			"msg":msg,
 			"btnVal":btnVal,
 			"classVal":classVal
 		}
 	 */
 	
 	$$.alert = function(json){
		var ele = document.createElement('div');
		ele.className = 'mask';
		ele.id = 'pop';
		var str = '<div class="pop" style="width:'+(json.width||240)+'px;height:'+(json.height||120)+'px;">'+
					'<p>'+json.msg+'</p>'+
					'<footer><span class="btn '+(json.classVal||'')+' btnsure">'+(json.btnVal ||'确定')+'</span></footer>'+
				  '</div>';
		ele.innerHTML = str;
		$(ele).insertBefore($('body script')[0]);	
		//单击关闭弹层
		if(json.classVal){
			$$('.'+json.classVal+'')[0].addEventListener('click',function(){
				$$.delLayer();
			},false);
		}else{
			$$('.btnsure')[0].addEventListener('click',function(){
				$$.delLayer();
			},false);
		}
	};
	

 	/**
 	 *@description confirm弹层
 	 *@example var json = {
 			"width":width,
 			"height":height,
 			"msg":msg,
 			"classSure":btnVal,
 			"classCancel":btnVal,
 			"btnSure":classVal,
 			"btnCancel":classVal
 		}
 	 */
 	$$.confirm = function(option){
		var ele = document.createElement('div');
		ele.className = 'mask';
		ele.id = 'pop';
		var str = '<div class="pop" style="width:'+(option.width || 240)+'px;height:'+(option.height || 120)+'px;">'+
					'<p>'+option.msg+'</p>'+
					'<footer class="row"><span class="btn '+(option.classCancel || '')+' bg-gray btn-cancel col-6">'+(option.btnCancel || "取消" )+'</span><span class="btn '+option.classSure+' btn-sure bg-red col-6">'+option.btnSure+'</span></footer>'+
				  '</div>';
		ele.innerHTML = str;
		document.body.insertBefore(ele,$$("#script")||$$('script')[0]);
	
		//取消
		$$('.btn-cancel' ||option.classCancel)[0].addEventListener('touchend',function(){
			$$.delLayer();
		},false);
		
		
	};

	/**
	 * @description 显示加载条
	 * @example $$.loading()
	 */
	$$.showLoad = function(imgurl){
		var ele = document.createElement('div');
		ele.className = 'mask'; 
		ele.id = 'loading';
		ele.innerHTML = '<img class="loading" src="'+imgurl+'" alt="" />';
		document.body.insertBefore(ele,$$("#script")||$$('script')[0]);
	};
	
	/**
	 * @description 删除加载loading
	 */
	$$.hideLoad = function(){
		$$("#loading")?document.body.removeChild($$('#loading')):null;
	};
	
	/**
	 * @description 返回顶部
	 */
	$$.goTop = function(){
		var ele = document.createElement('div');
			ele.id = 'go-top';
			ele.className = 'none';
			var s = document.getElementsByTagName("script")[0]; 
			s.parentNode.insertBefore(ele,s);
	
		var oTop = $$("#go-top");
	
		window.onscroll = function(){
		    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		    if(scrolltop >= 500){
		    	oTop.className='';
		    }else if(scrolltop<500){
		    	oTop.className = 'none';
		    }
		}
		
	   oTop.onclick = function(){
	    	document.documentElement.scrollTop = document.body.scrollTop = 0;
	    	this.className = 'none';
	   }
	   
	};
	
	/**
	 * @description 返回上一页
	 */
	$$.goBack = function(){
		window.location.href = document.referrer;
	}
	
	/**
	 * @description 价格保留2位小数
	 * @param {Object} x
	 */
	$$.price = function(x){    
	    var f = parseFloat(x);    
	    if (isNaN(f)) {    
	        return false;    
	    }    
	    var f = Math.round(x*100)/100;    
	    var s = f.toString();    
	    var rs = s.indexOf('.');    
	    if (rs < 0) {    
	        rs = s.length;    
	        s += '.';    
	    }    
	    while (s.length <= rs + 2) {    
	        s += '0';    
	    }    
	    return s;    
	  };

	/**
	 * @description 获取url中参数的值
	 * @param {Object} name
	 */
	$$.getQueryString = function(name,url){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			if(url){
				var r = url.substr(1).match(reg);
			}else{
				var r = window.location.search.substr(1).match(reg);
			}
			
			if (r != null){
				if(!r[2] || r[2]=='' || r[2]=='null'){
					// 由于新版本app URL不传userId, 没办法只能这样处理
					if(name=='userId' && window.JSI && window.JSI.getUserId){
						return window.JSI.getUserId();
					}
				}
				return r[2];
			}
			// 由于新版本app URL不传userId, 没办法只能这样处理
			if(name=='userId' && window.JSI && window.JSI.getUserId){
				return window.JSI.getUserId();
			}
			return null;
	};
	
	//获取当前域名
	$$.curDomain = function(url){
		var curUrl = url ||window.location.href;
		var _url = curUrl.replace(/http:\/\/|https:\/\//,'')
		console.log(_url.substr(0,_url.indexOf('/')))
		return _url.substr(0,_url.indexOf('/'));
	}
	
	/**
	 * @description 判断输入的是否是商品件数 
	 */
	$$.isGoodsNum = function(num){
		var txtnum= /^[0-9]+$/;
		if(!txtnum.test(num)){
			return false;
		}
		return true;
	};
	
	
	/**
	 * @description 过滤特殊字符
	 */
	$$.isSpecialString = function(str){
		if(/[^\u4E00-\u9FA5\d\w \(\)\（\）\.]/g.test(title)){
			return false;
		}
		return true;
	};
	
	
	/**
	 * @description 来源域名
	 */
	$$.sourceDomain = function(){
		var preUrl = document.referrer;
		var _url = preUrl.replace(/http:\/\/|https:\/\//,'')
		console.log(_url.substr(0,_url.indexOf('/')))
		return _url.substr(0,_url.indexOf('/'));
	};
	
	
	
	
	$$.getJingWei= function(){
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
			  	getBaiDuCity(r.point.lng,r.point.lat);
			}else {
				console.log(this.getStats())
			}        
		},{enableHighAccuracy: true});
	}
	
	/**
	 * @description 通过传入经纬度获取当前城市(百度地图API)
	 */
	$$.getBaiDuCity = function(longitude,latitude){
	    var point = new BMap.Point(longitude,latitude);
	    var gc = new BMap.Geocoder();
	    gc.getLocation(point, function(rs){
	    var addComp = rs.addressComponents;
		console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
	    });
	}

	
	/**
	 * @description 字符串：删除字符串空格
	 * */
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	
	/**
	 * @description 日期：毫秒数切换成年月日
	 * @example alert(new Date(1432648098000).Format("yyyy-MM-dd HH-MM"))
	 * */
	Date.prototype.Format = function(formatStr) {   
	    var str = formatStr;   
	    var Week = ['日','一','二','三','四','五','六'];  
	    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
	    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
	    str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));   
	    str=str.replace(/M/g,this.getMonth()+1);   
	    str=str.replace(/w|W/g,Week[this.getDay()]);   
	    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
	    str=str.replace(/d|D/g,this.getDate());   
	    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
	    str=str.replace(/h|H/g,this.getHours());   
	    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
	    str=str.replace(/m/g,this.getMinutes());   
	    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
	    str=str.replace(/s|S/g,this.getSeconds());   
	    return str;   
	};   





	
})();
/* 百度流量统计代码 
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?b2bf749885c83e6182ad66079206ecf5";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();*/

var getQueryString = function(name,url){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			if(url){
				var r = url.substr(1).match(reg);
			}else{
				var r = window.location.search.substr(1).match(reg);
			}
			
			if (r != null){
				if(!r[2] || r[2]=='' || r[2]=='null'){
					// 由于新版本app URL不传userId, 没办法只能这样处理
					if(name=='userId' && window.JSI && window.JSI.getUserId){
						return window.JSI.getUserId();
					}
				}
				return r[2];
			}
			// 由于新版本app URL不传userId, 没办法只能这样处理
			if(name=='userId' && window.JSI && window.JSI.getUserId){
				return window.JSI.getUserId();
			}
			return null;
	};