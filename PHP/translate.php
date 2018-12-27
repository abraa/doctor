<?php
include_once PHPCMS_PATH.'translategoogledemo.php';
	$url ='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	$postData = empty($_POST) ? array() : $_POST;
	$postData['translate_google'] = 1;
	$q = sendHttpRequest($url,'post',http_build_query($postData),$_SERVER['HTTP_USER_AGENT']);
	$num = strlen($q);
	$limit = pow(2,14);
	$start =0;
	$res='';
	do{
		//判断剩余字符数是否是全部
		$l2 = $limit;
		if($num-$start >=$limit){
			//不是全部拆分处理
			$str1 = substr($q,$start,$limit);
			//取最后html标签所在位置
			$l =strrpos($str1,'</');
			if(!empty($l)){
				$l2 = $l;
			}
		}
		$str1 = substr($q,$start,$l2);
		$str = translate('en', $prefix,$str1);
		$str = preg_replace("/\\\\u([0-9a-f]{3,4})/i", "&#x\\1;", $str);
		$str= html_entity_decode($str, null, 'UTF-8');
		eval('$str='.$str.';');
		$res .= $str;
		$start += $l2;
	}while($num>$start);
	echo $res;
	exit;

?>