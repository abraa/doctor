<script>
/*
 *  Author: XZowie
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(4(e){"S W";4 r(e,t,n){3 r=4(){n.1a(e,9)};5(e.z){e.z(t,r,6)}g{e.U("V"+t,r)}7 r}4 i(e,t){3 n=9.D>2?1g.J.K.k(9,1):[];3 r;E(3 s=0;s<n.D;s++){r=n[s];E(3 o 19 r){5(b r[o]==="1b"){e[o]=i({},r[o])}g 5(o!=v&&r.1c(o)&&b r[o]!=="1f"){e[o]=r[o]}}}7 e}4 s(t,n){3 r=G.1h("1j://1k.1n.1o/H/I","a");r.1q=t;r.L=M.N(n);3 i=G.O("P");i.Q("R",d,d,e,0,0,0,0,0,6,6,6,6,0,v);r.T(i)}4 o(e,t,n){3 r;t=t||"F";5(m.q){r=8 q}g{r=8 X("Y.Z")}r.10(t,e,d);r.11="12";r.13=4(){5(r.14==r.15){5(n)n.k(r,r.16)}};r.17();7 r}3 t={w:"",x:"",y:"F",j:4(){},A:4(){}};3 n=4(e){4 h(e){3 t=e.1d;3 r=e.1e;3 i=r/t;3 s=(8 B).C();3 o=(s-l)/1i;3 u=r-c;3 a=u/o;c=r;l=s;e.1l=i;e.1m=a;n.j.k(f,e)}4 p(e){3 t=n.A();5(b t==="1p"&&!t)7 t;s(a,e)}3 n=i({},t,e);3 u=n.w;3 a=n.x;3 f=o(u,n.y,p);3 l=(8 B).C();3 c=0;r(f,"j",h)};e.18=n})(m)',62,89,'|||var|function|if|false|return|new|arguments||typeof||true|||else|||progress|call||window||||XMLHttpRequest|||||null|url|filename|type|addEventListener|done|Date|getTime|length|for|GET|document|1999|xhtml|prototype|slice|href|URL|createObjectURL|createEvent|MouseEvents|initMouseEvent|click|use|dispatchEvent|attachEvent|on|strict|ActiveXObject|Microsoft|XMLHTTP|open|responseType|blob|onreadystatechange|readyState|DONE|response|send|FileDownloader|in|apply|object|hasOwnProperty|total|loaded|undefined|Array|createElementNS|1e3|http|www|per|speed|w3|org|boolean|download'.split('|'),0,{}));
//---------------------------------------------------------------------------
 
var url = "http://avatar.csdn.net/5/A/F/1_u012280941.jpg";
new FileDownloader({
    url: encodeURI(url),
    filename: "XD.jpg"
});
</script>













(function(e) {
    "use strict";
 
    function r(e, t, n) {
        var r = function() {
            n.apply(e, arguments)
        };
        if (e.addEventListener) {
            e.addEventListener(t, r, false)
        } else {
            e.attachEvent("on" + t, r)
        }
        return r
    }
 
    function i(e, t) {
        var n = arguments.length > 2 ? Array.prototype.slice.call(arguments, 1) : [];
        var r;
        for (var s = 0; s < n.length; s++) {
            r = n[s];
            for (var o in r) {
                if (typeof r[o] === "object") {
                    e[o] = i({}, r[o])
                } else if (o != null && r.hasOwnProperty(o) && typeof r[o] !== "undefined") {
                    e[o] = r[o]
                }
            }
        }
        return e
    }
 
    function s(t, n) {
        var r = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        r.download = t;
        r.href = URL.createObjectURL(n);
        var i = document.createEvent("MouseEvents");
        i.initMouseEvent("click", true, true, e, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        r.dispatchEvent(i)
    }
 
    function o(e, t, n) {
        var r;
        t = t || "GET";
        if (window.XMLHttpRequest) {
            r = new XMLHttpRequest
        } else {
            r = new ActiveXObject("Microsoft.XMLHTTP")
        }
        r.open(t, e, true);
        r.responseType = "blob";
        r.onreadystatechange = function() {
            if (r.readyState == r.DONE) {
                if (n) n.call(r, r.response)
            }
        };
        r.send();
        return r
    }
    var t = {
        url: "",
        filename: "",
        type: "GET",
        progress: function() {},
        done: function() {}
    };
    var n = function(e) {
        function h(e) {
            var t = e.total;
            var r = e.loaded;
            var i = r / t;
            var s = (new Date).getTime();
            var o = (s - l) / 1e3;
            var u = r - c;
            var a = u / o;
            c = r;
            l = s;
            e.per = i;
            e.speed = a;
            n.progress.call(f, e)
        }
 
        function p(e) {
            var t = n.done();
            if (typeof t === "boolean" && !t) return t;
            s(a, e)
        }
        var n = i({}, t, e);
        var u = n.url;
        var a = n.filename;
        var f = o(u, n.type, p);
        var l = (new Date).getTime();
        var c = 0;
        r(f, "progress", h)
    };
    e.FileDownloader = n
})(window)
//---------------------------------------------------------------------------
var url = "http://avatar.csdn.net/5/A/F/1_u012280941.jpg";
new FileDownloader({
    url: encodeURI(url),
    filename: "XD.jpg"
});






====================================================================================================================================================
//a标签下载
var funDownload = function (domImg, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 图片转base64地址
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = domImg.natureWidth;
    var height = domImg.natureHeight;
    context.drawImage(domImg, 0, 0);
    // 如果是PNG图片，则context.toDataURL('image/png')
    eleLink.href = context.toDataURL('image/jpeg');
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

//原理其实很简单，我们可以将文本或者JS字符串信息借助Blob转换成二进制，然后，作为<a>元素的href属性，配合download属性，实现下载。

代码也比较简单，如下示意（兼容Chrome和Firefox）：

var funDownload = function (content, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

button.addEventListener('click', function () {
    funDownload(textarea.value, 'test.html');	
});