//判断数组
function testA(){
	function isArray(arr){
		var result = arr instanceof Array;
		return result;
	}

	var test1 = [1,2,3];
	var test2 = 10;
	console.log(isArray(test1));
	console.log(isArray(test2));
}
testA();

//判断函数
function testB(){	
	function ifFunction(fn){
		return typeof fn === 'function';
	}

	var test3 = 1;
	var test4 = function(){
		alert("hi!");
	};
	console.log(ifFunction(test3));
	console.log(ifFunction(test4));
}
testB();

//用递归克隆对象（number,string,boolean,date,array,object）
function testC(){
	function isClass(o){   //判断对象类型
		return Object.prototype.toString.call(o).slice(8,-1);
		//不直接用toString()是为了防止对象中的toString()被重写,比如有给toString()中传一个参数来得到几进制字符串。
	}

	function cloneObject(src){
		var result;
		var srcClass = isClass(src); 

		if(srcClass === "Object"){
			result = {};   //用字面量表示法创建一个对象类型的实例，只包含默认属性和方法
		}else if(srcClass === "Array"){
			result = [];   //创建空数组
		}else if(srcClass === "Date"){
		 	result = ""; 
		}else{
			return src;    //是基本类型就直接返回
		}

		for(key in src){   //遍历目标值的键
			var copy = src[key];   //变量保存目标值的键值
			if(isClass(copy) == "Object" || isClass(copy) == "Array" || isClass(copy) == "Date"){   //再判断键值的类型
				result[key] = arguments.callee(copy);  
				//cloneObject函数的递归调用
			}else{
				result[key] = copy;  //键值是基本类型就直接返回
			}
		}
		return result;
	}

	var srcObj = {
		a:1,
		b:{
			b1:["hello","hi"],
			b2:"JavaScript"
		}
	};

	var abObj = srcObj;
	var tarObj = cloneObject(srcObj);

	srcObj.a = 2;
	srcObj.b.b1[0] = "Hello";

	console.log(abObj.a);  //2
	console.log(abObj.b.b1[0]);  //"Hello"

	console.log(tarObj.a);  //1
	console.log(tarObj.b.b1[0]);  //"hello"	
}
testC();

//数组去重
function testD(){
	//方法一：
	function uniqArray1(arr){
		var n = []; 	
		for(var i = 0; i < arr.length; i++){
			if (n.indexOf(arr[i]) == -1) { //数组n中没有该项就push进n
				n.push(arr[i]);
			};
		}
		return n;
	}
	//方法二：
	function uniqArray2(arr){
		var n = [arr[0]]; 
		for(var i = 1; i < arr.length; i++){
			if (arr.indexOf(arr[i]) == i) { //该项第一次出现的位置不是i就push进数组n
				n.push(arr[i]);
			};
		}
		return n;
	}
	//方法三：
	function uniqArray3(arr){
		arr.sort(); //升序排序
		var n = [arr[0]];
		for(var i = 1; i < arr.length; i++){
			if (arr[i] !== n[n.length-1]) { //该项与前一项不同就push进数组n
				n.push(arr[i]);
			};
		}
		return n;
	}
	var a = [1,"s",3,5,7,5,3,"s","s"];
	var b = uniqArray1(a);
	var c = uniqArray2(a);
	var d = uniqArray3(a);
	console.log(b);
	console.log(c);
	console.log(d);
}
testD();

//trim函数去空白字符
function testE(){
	function simpleTrim(str){
		var n = [];	
		var start = 0;
		var end = 0;	
		for(var i = 0; i <= str.length-1; i++){
			if(str.charAt(i) != " " && str.charAt(i) != "	"){
				start = i;
				break;
			}
		}
		for(var i = str.length-1; i >= 0; i--){
			if(str.charAt(i) != " " && str.charAt(i) != "	"){
				end = i;
				break;
			}
		}
		var result = str.slice(start,end+1);
		return result;
	}

	var str = ' 	hi!    ';
	str = simpleTrim(str);
	console.log(str); //'hi!'
}
testE();

//正则表达式的trim函数
function testF(){
	function trim (str) {
		var result = str.replace(/(^\s*)|(\s*$)/g,"");
		return result;
	}

	var str = ' 	hi!    ';
	str = trim(str);
	console.log(str); //'hi!'
}
testF();

//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// function testG () {
	function each(arr,fn){	
		for(var i = 0; i <= arr.length-1; i++){
			fn(i,arr[i]);
		}			
	}

	var arr = ['java','c','php','html'];
	function output(index,item){
		console.log(index + ':' + item)
	}	 
	each(arr,output);
// }
// testG();

//获取一个对象里面第一层元素的数量，返回一个整数
function testH(){
	function getObjectLength(obj){
		return Object.keys(obj).length;
	}

	var obj = {
		a:1,
		b:2,
		c:{
			c1:3,
			c2:4
		}
	};
	console.log(getObjectLength(obj)); //3
}
testH();

// 判断是否为邮箱地址
function testI(){
	function isEmail(emailStr) {
    	var eq = /^(\w|\.|-)+@(\w+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i;
    	return eq.test(emailStr);
	}
	var str = 'hud.ha_b@si126a.com.cn';
	console.log(isEmail(str));
}
testI();

// 判断是否为手机号
function testJ(){
	function isMobilePhone(phone) {
    	var eq = /^1[3|4|5|8][0-9]\d{4,8}$/;
    	return eq.test(phone);
	}
	var num = 15966548762;
	console.log(isMobilePhone(num));
}
testJ();

//DOM
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName){
	element.classList.add(newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element,oldClassName){
	element.classList.remove(oldClassName);
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element,siblingNode){
	if(element.parentNode !== null && siblingNode.parentNode !== null){
		return element.parentNode == siblingNode.parentNode;
	}else{
		return false;
	}
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element){
	var rect = element.getBoundingClientRect();
	return {
		x: rect.top,
		y: rect.right
	};
}

//实现一个简单的Query
function $(selector) {
	switch (selector.substr(0,1)){
		case '.':
			return document.getElementsByClassName(selector.substr(1));
		case '#':
			return document.getElementById(selector.substr(1));
		case '[':
			var attrString = selector.substr(1,selector.length-2);
			var attrArr = attrString.split('=');
			var allElements = document.getElementsByTagName('*');

			if (attrArr.length === 1) {
				for(var i = 0; i < allElements.length; i++){
					if (allElements[i].getAttribute(attrString) !== null) {
						return allElements[i];
						break;
					};
				}
			}else if(attrArr.length === 2){
				for (var j = 0; j < allElements.length; j++){
					if (allElements[j].getAttribute(attrArr[0]) === attrArr[1]) {
						return allElements[j]; 
						break;
                    }
				}
			}else{
				console.log('attribute selector should end with ]');
			}
		default:
			return document.getElementsByTagName(selector);
	}
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {  //DOM2
    	element.addEventListener(event,listener,false);
    }else if(element.attachEvent){  //IE
    	element.attachEvent("on" + event,listener);
    }else{   //DOM0
    	element["on" + event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) { //DOM2
    	element.removeEventListener(event,listener,false);
    }else if(element.detachEvent){   //IE
    	element.detachEvent("on" + event,listener);
    }else{   //DOM0
    	element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,click,listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,"keyup",listener);
}

//把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on =  function(element, event, listener) {
   			if (element.addEventListener) {  //DOM2
   	 			element.addEventListener(event,listener,false);
  	  		}else if(element.attachEvent){  //IE
    			element.attachEvent("on" + event,listener);
   			}else{   //DOM0
    			element["on" + event] = listener;
   			}
		}
$.un =  function(element, event, listener) {
    		if (element.removeEventListener) { //DOM2
    			element.removeEventListener(event,listener,false);
   	   	 	}else if(element.detachEvent){   //IE
    			element.detachEvent("on" + event,listener);
    		}else{   //DOM0
    			element["on" + event] = null;
    		}
		}
$.click = function (element, listener) {
   	 		addEvent(element,click,listener);
		  }
$.enter = function (element, listener) {
    	 	addEvent(element,"keyup",listener);
		  }

//对一个列表里所有的<li>增加点击事件的监听
//先定义EventUtil对象的方法函数
function getEvent(event){
	return event?event:window.event;
}
function getTarget(event){
	return event.target || event.srcElement;
}
function preventDefault(event){
	if (event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	};
}
function stopPropagation(event){
	if (event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	};
}

//代理事件
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element,eventName,function(event){
    	event = getEvent(eventName);
    	var target = getTarget(event);
    	if(target.nodeName.toLowerCase() == tag){
    		listener(event);
    	}
    });
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	if(navigator.appName == IE){
		return navigator.appVersion;
	}else{
		return -1;
	}
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if (expiredays instanceof Date){
    	cookieText += "; expiredays=" + expiredays.toGMTString();
    };
    document.cookie = cookieText;
}

// 获取cookie值
function getCookie(cookieName) {
    var cookieName = encodeURIComponent(cookieName)+"=",
    	cookieStart = document.cookie.indexOf(cookieName),
    	cookieValue = null;

    if (cookieStart > -1) {
    	var cookieEnd = document.cookie.indexOf(";",cookieStart);
    	if (cookieEnd == -1) {
    		cookieEnd = document.cookie.length;
    	};
    	cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length-1,cookieEnd));
    };

    return cookieValue;
}

//封装一个Ajax方法
function ajax(url,options){
	var xhr = creatXHR();

	function creatXHR(){
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		}else if (typeof ActiveXObject != "undefined") {
			if (typeof arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
					i,len;
				for(i = 0,len = versions.length;i<len;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString=versions[i];
						break;
					}catch(ex){

					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("No XHR object available.");
		}
	}

	if (typeof options == 'object') {
		var type = options.type.toUpperCase();
		var data = options.data||null;
		var onsuccess = options.onsuccess||'undefined';
		var onfail = options.onfail||'undefined';
	}

	if (typeof data == 'object') {
		var str = '';
		for(var key in data){
			str += key +"="+ data[key] + "&";
		}
		data = str.replace(/&$/,'');
		str = null;
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if ((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304) {
				onsuccess(xhr.responseText);
			}else{
				onfail("Request was unsuccessful:" + xhr.status);
			}
		}
	};
	
	if (type == "get") {
		if (data) {
			xhr.open("get",url+"?"+data,true);
		}else{
			xhr.open("get",url,true);
		}
	}else{
		xhr.open("post",url,true);
		xhr.setRequestHeader("content-Type","application/x-www-form-urlencoded");
		xhr.send(data);
	}

	xhr.send(null);
}