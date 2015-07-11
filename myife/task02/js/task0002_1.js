var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    getEvent: function(event){
        return event ? event : window.event;
    },
    
 	getTarget: function(event){
        return event.target || event.srcElement;
    },

    preventDefault: function(event){
    	if (event.preventDefault) {
    		event.preventDefault();
    	}else{
    		event.returnValue = false;
    	}
    }

};

// function unique(Arr){
// 	var temp = new Array();
// 	label:for(var i = 0; i < Arr.length; i++){
// 		for(var j = 0; j < temp.length; j++){
// 			if(temp[j] == Arr[i] || Arr[i] == ""){
// 				continue label;
// 			}
// 		}
// 		temp.push(Arr[i]);
// 	}

// 	return temp;
// }

function unique(Str){
	
}

EventUtil.addHandler(window,"load",function(event){
	var Btn = document.forms[0].elements[1];
	var Textbox = document.forms[0].elements[0];

	EventUtil.addHandler(Btn,"click",function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		var hobbies = new Array();
		// hobbies = Textbox.value.split(/,/);
		hobbies = Textbox.value;
		hobbiesText = unique(hobbies).toString();//一个操作函数之后转为字符串

		var form = document.getElementsByTagName('form');
		var p = document.createElement('p');
		p.innerHTML = hobbiesText;
		document.body.insertBefore(p,form.nextSibling);

		EventUtil.preventDefault(event);//阻止提交默认事件

	});
});
