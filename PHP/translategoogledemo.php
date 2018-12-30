<?php
//最开始使用在github上面，参考网址https://github.com/Stichoza/google-translate-php/
//define('GOOGLE_URL', 'https://translate.google.cn/translate_a/');//这里定义google的网址
define('UA', isset($_SERVER['HTTP_USER_AGENT']) && !empty($_SERVER['HTTP_USER_AGENT']) ?  $_SERVER['HTTP_USER_AGENT'] : 'Mozilla/5.0 (Android; Mobile; rv:22.0) Gecko/22.0 Firefox/22.0');

//session_start();
function t_arrayToXml($arr)
{
    $xml = "<xml>";
    $xml .= t_arrayToXml2($arr);
    $xml.="</xml>";

    return $xml;
}

function t_arrayToXml2($arr){
    $xml = "";
    foreach ($arr as $key=>$val)
    {
        if (is_array($val)){
            $xml.="<".$key.">".t_arrayToXml2($val)."</".$key.">";
        }else{
            $xml.="<".$key."><t_childxml>".$val."</t_childxml></".$key.">";
        }
    }
    return $xml;
}

//xml转数组

function t_xmlToArray($xml){
    $xml = str_replace(array('<t_childxml>','</t_childxml>'),array('<![CDATA[', ']]>'),$xml);
    $array = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)),true);
    return $array;
}
//这个函数是无符号右移
//参考http://www.shangxueba.com/jingyan/1911053.html
function shr32($x, $bits)
{

    if($bits <= 0){
        return $x;
    }
    if($bits >= 32){
        return 0;
    }

    $bin = decbin($x);
    $l = strlen($bin);

    if($l > 32){
        $bin = substr($bin, $l - 32, 32);
    }elseif($l < 32){
        $bin = str_pad($bin, 32, '0', STR_PAD_LEFT);
    }

    return bindec(str_pad(substr($bin, 0, 32 - $bits), 32, '0', STR_PAD_LEFT));
}

//这个就是javascript的charCodeAt
//PHP版本的在这里http://www.phpjiayuan.com/90/225.html
function charCodeAt($str, $index)
{
    $char = mb_substr($str, $index, 1, 'UTF-8');

    if (mb_check_encoding($char, 'UTF-8'))
    {
        $ret = mb_convert_encoding($char, 'UTF-32BE', 'UTF-8');
        return hexdec(bin2hex($ret));
    }
    else
    {
        return null;
    }
}


//直接复制google
function RL($a, $b)
{
    for($c = 0; $c < strlen($b) - 2; $c +=3) {
        $d = $b{$c+2};
        $d = $d >= 'a' ? charCodeAt($d,0) - 87 : intval($d);
        $d = $b{$c+1} == '+' ? shr32($a, $d) : $a << $d;
        $a = $b{$c} == '+' ? ($a + $d & 4294967295) : $a ^ $d;
    }
    return $a;
}

//静态TKK，动态获取请使用另外一个方法
function TKK()
{
    $a = 561666268;
    $b = 1526272306;
    return 406398 . '.' . ($a + $b);
}

//直接复制google
function TL($a)
{

    $tkk = explode('.', TKK());
    $b = $tkk[0];

    for($d = array(), $e = 0, $f = 0; $f < mb_strlen ( $a, 'UTF-8' ); $f ++) {
        $g = charCodeAt ( $a, $f );
        if (128 > $g) {
            $d [$e ++] = $g;
        } else {
            if (2048 > $g) {
                $d [$e ++] = $g >> 6 | 192;
            } else {
                if (55296 == ($g & 64512) && $f + 1 < mb_strlen ( $a, 'UTF-8' ) && 56320 == (charCodeAt ( $a, $f + 1 ) & 64512)) {
                    $g = 65536 + (($g & 1023) << 10) + (charCodeAt ( $a, ++ $f ) & 1023);
                    $d [$e ++] = $g >> 18 | 240;
                    $d [$e ++] = $g >> 12 & 63 | 128;
                } else {
                    $d [$e ++] = $g >> 12 | 224;
                    $d [$e ++] = $g >> 6 & 63 | 128;
                }
            }
            $d [$e ++] = $g & 63 | 128;
        }
    }
    $a = $b;
    for($e = 0; $e < count ( $d ); $e ++) {
        $a += $d [$e];
        $a = RL ( $a, '+-a^+6' );
    }
    $a = RL ( $a, "+-3^+b+-f" );
    $a ^= $tkk[1];
    if (0 > $a) {
        $a = ($a & 2147483647) + 2147483648;
    }
    $a = fmod ( $a, pow ( 10, 6 ) );
    return $a . "." . ($a ^ $b);
}

function translate($sl, $tl, $q, $cn=1, $param = 't?client=webapp', $method = 'post')
{
    if($cn){
        $google_url = 'https://translate.google.cn/translate_a/';
    }else{
        $google_url = 'https://translate.google.com/translate_a/';
    }

    $tk = TL($q);
    $q = urlencode(stripslashes($q));
    $resultRegexes = array(
        '/,+/'  => ',',
        '/\[,/' => '[',
    );

    $url = $google_url . $param . "&sl=".$sl."&tl=".$tl."&hl=".$tl."&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&format=html&ie=UTF-8&oe=UTF-8&otf=2&ssel=0&tsel=0&kc=1&tk=". $tk ;

    if ( $method == 'get' ) $url .= "&q=" . $q;

    $output = sendHttpRequest($url, $method, $method == 'get' ? '' : "&q=" . $q, UA);

    return $output;

}

function sendHttpRequest($url, $method,$data, $params){
    $timeout = 15 ;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, $params);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
	if($method =='post'){
		curl_setopt($ch, CURLOPT_POST, 1); // 发送一个常规的Post请求
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
	}
    $conts = curl_exec($ch);
    return $conts;
}

//文本翻译示例
//$q = file_get_contents('./c.html');
//$str = translate('en', 'ja',$q);
//$str = preg_replace("/\\\\u([0-9a-f]{3,4})/i", "&#x\\1;", $str);
//$str = html_entity_decode($str, null, 'UTF-8');
//$str = stripslashes($str);
//eval('$str='.$str.';');
//echo $str;
//file_put_contents('./d.html',$str);
//echo($res);

//当前网站翻译
if(!isset($_POST['translate_google'])){
    $url ='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    $postData = empty($_POST)?array():$_POST;
    $postData['translate_google']=1;
    $q = sendHttpRequest($url,'post',http_build_query($postData),$_SERVER['HTTP_USER_AGENT']);
    $num = strlen($q);

    $limit = pow(2,14);
    $start =0;
    $res='';
    $i=0;
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
        $str = translate('en', 'ja',$str1);
        $str = preg_replace("/\\\\u([0-9a-f]{3,4})/i", "&#x\\1;", $str);
        $str= html_entity_decode($str, null, 'UTF-8');
        eval('$str='.$str.';');
        $res .= $str;
        $start += $l2;
        $i++;
    }while($num>$start);
    file_put_contents('./d.html',$res);
    file_put_contents('./e',$i);
    exit;
}

echo file_get_contents('./c.html');


//数组转xml翻译
// $str = translate('en', $prefix,$str1);

// $str1 = t_arrayToXml($data);
// $str = preg_replace("/\\\\u([0-9a-f]{3,4})/i", "&#x\\1;", $str);
// $str= html_entity_decode($str, null, 'UTF-8');
// eval('$str='.$str.';');
// var_dump(t_xmlToArray($str));
?>
