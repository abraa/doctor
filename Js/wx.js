/**
 * 微信支付
 * @param {Object} orderId
 */
function pay(orderId){
//	var wxcfgurl="http://prep.ddzybj.com/weixin/getWxPayConfig?url=";
//	var endurl=wxcfgurl + currentUrl;
//	sendAjax(endurl, function(json){
//		wxconfig = json.result;
//		wxconfig.jsApiList = ["chooseWXPay"];
//		wx.config(wxconfig);
		
			var url = payment_url+'/client/payinfo/weixinH5Payment';
			var opt = {
				"orderId":orderId,
				"paymentMethodId":"11",
				"wxTradeType":"JSAPI"
			};
			var endurl = getEndUrl(url, opt);
			sendAjax(endurl, function(data){
				if(data.code == 0){
					function onBridgeReady(){
					   WeixinJSBridge.invoke(
					       'getBrandWCPayRequest', {
					           "appId" : data.result.appId,     //公众号名称，由商户传入     
					           "timeStamp": data.result.timeStamp,         //时间戳，自1970年以来的秒数     
					           "nonceStr": data.result.nonceStr, //随机串     
					           "package": data.result.packageStr,     
					           "signType": "MD5",         //微信签名方式：     
					           "paySign": data.result.sign //微信签名 
					       },
					       function(res){     
					            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					            	if(orderId.length>12 && orderId.substring(0,1) == '2'){
					            		jump('prescription-detail.html',{'presId' : orderId});
					            	}else{
					            		jump('pay-success.html', {'orderId': orderId});					            
					            	}
					            }
					       }
					   ); 
					}
					if (typeof WeixinJSBridge == "undefined"){
					   if( document.addEventListener ){
					       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					   }else if (document.attachEvent){
					       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
					       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					   }
					}else{
					   onBridgeReady();
					}
				}
			});
//		wx.ready(function(){
//			var url = payment_url+'/client/payinfo/weixinH5Payment';
//			var opt = {
//				"orderId":orderId,
//				"paymentMethodId":"11",
//				"wxTradeType":"JSAPI"
//			};
//			var endurl = getEndUrl(url, opt);
//			sendAjax(endurl, function(data){
//				if(data.code == 0){
//					wx.chooseWXPay({
//						appId: data.result.appId,
//						timestamp: data.result.timeStamp, 
//					    nonceStr: data.result.nonceStr, 
//					    package: data.result.packageStr, 
//					    signType: 'MD5', 
//					    paySign: data.result.sign, 
//					    success: function (result) {
//					    	jump('pay-success.html');
//					    },
//					    fail:function(result){
//					    },
//	 				    complete:function(result){
//					    },
//					    cancel:function(result){
//					    }
//					});	
//				}
//			});
//		});
		
//	});
//	var url = payment_url+'/client/payinfo/weixinH5Payment';
//	var opt = {
//		"orderId":orderId,
//		"paymentMethodId":"11",
//		"wxTradeType":"JSAPI"
//	};
//	var endurl = getEndUrl(url, opt);
//	sendAjax(endurl, function(json){
//		wx.chooseWXPay({
//			appId: json.result.appId,
//			timestamp: json.result.timeStamp, 
//		    nonceStr: json.result.nonceStr, 
//		    package: json.result.packageStr, 
//		    signType: 'MD5', 
//		    paySign: json.result.sign, 
//		    success: function (result) {
//		        alert('支付成功');
//		    },
//		    fail:function(result){
//				alert('支付失败');
//		    },
//		    complete:function(result){
//		    	alert('支付成功');
//		    },
//		    cancel:function(result){
//		    	alert('支付取消');
//		    }
//		});	
//	});
}

/**
 * 预览图片
 * @param {Object} arr 预览图片的URL
 */
function viewPic(arr){
	wx.previewImage({
	    current: currentUrl, // 当前显示图片的http链接
	    urls: arr // 需要预览的图片http链接列表
	});
}

/**
 * 拍照或从手机相册中选图
 */
function chooseImg(cb){
	wx.chooseImage({
	    count: 3, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res, files) {
	        //var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	    	cb(res, files);
	    }
	});
}

wx.ready(function(){
	var jumpLink = '';
	var title = '';
	var desc = '';
	var imgUrl = '../../img/doctor/login_page/logo.png';
	if(location.href.indexOf('medicinal-ewm.html') != -1){
		jumpLink = share_pres_url + '?presId=' + pageData.params.presId + '&doctorToken=' + pageData.doctorToken;
		title = '【叮当中医】中药处方';
		desc = '本次就诊中药处方如下，请查收。温馨提示：建议及时下单服用，以免病情变化>>';
		wx.showOptionMenu();
		wx.hideMenuItems({
		    menuList: ['menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
	}else if(location.href.indexOf('doctor-card.html') != -1){
		jumpLink = share_doctor_url + '?doctorToken=' + pageData.doctorToken;
		title = '【叮当中医】'+thisPageApp.realName+' '+thisPageApp.titleTxt;
		desc = '快捷在线咨询答疑，复诊调方足不出户，欢迎关注我的个人主页！';
		imgUrl = thisPageApp.headImg;
		wx.showOptionMenu();
		wx.hideMenuItems({
		    menuList: ['menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
	}else if(location.href.indexOf('docter-card.html') != -1){
		jumpLink = share_doctor_url + '?doctorId=' + pageData.params.doctorId;
		title = '【叮当中医】'+thisPageApp.realName+' '+thisPageApp.titleTxt;
		desc = '快捷在线咨询答疑，复诊调方足不出户，欢迎关注我的个人主页！';
		imgUrl = thisPageApp.headImg;
		wx.showOptionMenu();
		wx.hideMenuItems({
		    menuList: ['menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
	}else if(location.href.indexOf('doctor/recommend.html') != -1){
		jumpLink = share_recommend_d_url + '?doctorToken=' + pageData.doctorToken;
		title = '【叮当中医】入驻叮当中医，云端自由执业！';
		desc = '空中药房一站解决中药煎煮配送，高额服务补贴还原医疗价值尊严，医生独立微信账号实现低成本患者管理，平台统一客服分担医务琐事。';
		wx.showOptionMenu();
		wx.hideMenuItems({
		    menuList: ['menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
	}else if(location.href.indexOf('patient/recommend.html') != -1){
		jumpLink = share_recommend_p_url + '?patientToken=' + pageData.patientToken;
		title = '【叮当中医】足不出户看中医，不沾烟火吃汤药';
		desc = '拍方抓药，煎煮配送，一键到家；在线名医咨询答疑，复诊调方足不出户。';
		wx.showOptionMenu();
		wx.hideMenuItems({
		    menuList: ['menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
	}else if(location.href.indexOf('doctor/reservation-ewm-show.html') != -1){
		jumpLink = share_reservation_url + '?resId=' + pageData.params.resId+'&doctorId='+pageData.params.doctorId+'&qrCode='+pageData.params.qrCode+'&doctorName='+pageData.params.doctorName+'&doctorImg='+pageData.params.doctorImg;
		title = '【叮当中医】预约咨询';
		desc = decodeURIComponent(pageData.params.doctorName)+'医生给您发送了预约咨询单，请查收';
		wx.showOptionMenu();
		wx.hideMenuItems({
		    menuList: ['menuItem:share:timeline'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
		});
	}else if(location.href.indexOf('www.ddzybj.com') != -1){//叮当中医官网
		jumpLink = 'http://www.ddzybj.com/';
		title = '叮当中医';
		desc = '叮当中医，为您量身打造的中医自由执业平台';
		imgUrl = 'http://prewx.ddzybj.com/ddzy/images/wx-logo/logo.png';
//		wx.showOptionMenu();
	}else if(location.href.indexOf('doctor/download.html') != -1){//叮当app下载
//		jumpLink = 'http://www.ddzybj.com/';
//		title = '叮当中医';
//		desc = '叮当中医，为您量身打造的中医自由执业平台';
//		imgUrl = 'http://prewx.ddzybj.com/ddzy/images/wx-logo/logo.png';
//		wx.showOptionMenu();
	}else{
		jumpLink = share_default_url;
		title = '【叮当中医】足不出户看中医，不沾烟火吃汤药';
		desc = '拍方抓药，煎煮配送，一键到家；在线名医咨询答疑，复诊调方足不出户。';
		wx.hideOptionMenu();
	}
	// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc, 
		link: jumpLink,
		imgUrl: imgUrl,
		type: 'link', 
        success:function (){
        	$('.maskimg').hide();
        }
    });
    
    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
  wx.onMenuShareTimeline({
      title: title,
      link: jumpLink,
      imgUrl: imgUrl,
      success:function (){
      	//alert('分享成功！');
      	$('.maskimg').hide();
      }
  });
    
});