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

function unique(Arr){
	var temp = "";
    var resultArr = new Array();

    if (Arr == null || Arr.length == 0 || Arr == ""){
        return false;
        
    }else if(Arr != null && Arr.length != 0 && Arr != "") {
        Arr = Arr.replace(/[\n+|\s+|,+|\uff0c+|\u3001+|\uff1b+|;+]/g,",");//dou dun fen
        Arr = Arr + ",";

        var i = 0, len = Arr.length, start, end, flag;

        while(i < len){

            if(Arr[i] != ","){
                start = i;
                i++;
                while(i<len){
                    if(Arr[i] == ","){
                        end = i;
                        i++;
                        temp = Arr.slice(start,end);
                        flag = 0;

                        for(var j=0, len1 = resultArr.length; j<len1+1; j++){

                            if(temp == resultArr[j]){
                                   flag = 1;
                                   break;
                            }
                        }
                        if(flag == 0 && resultArr.length < 10){
                            resultArr.push(temp);
                        }else if(flag == 0 && resultArr.length ==10){
                           // errorShow();
                            return false;
                        }
                        break;
                    }else{
                        i++;
                    }
                }                
            }else{
                i++;
            }
        }
    }
    return resultArr;
}

function getTop(ele){
    var offset = ele.offsetTop;
    if(ele.offsetParent !=null){
        offset += getTop(ele.offsetParent);
    }
    return offset;
}

function getLeft(ele){
    var offset = ele.offsetLeft;
    if(ele.offsetParent !=null){
        offset += getLeft(ele.offsetParent);
    }
    return offset;
}

function positionIt(ele,top,left){
    ele.style.position = "absolute";
    ele.style.top = top+'px';
    ele.style.left = left+'px';
    return ele;
}

function createCheckbox(parentNode,innerTxt){
    for(var n = 0; n<innerTxt.length; n++){

        var checkBox = document.createElement('input');
        checkBox.setAttribute("type","checkbox");

        var label = document.createElement('LABEL');
        var t = document.createTextNode(innerTxt[n].toString());
        label.appendChild(t);        
        
        parentNode.appendChild(checkBox);
        parentNode.appendChild(label);
    } 
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
		hobbiesText = unique(hobbies);//output is an Array.

        var topOfBtn = getTop(Btn);
        var leftOfBtn = getLeft(Btn);
        
        if(hobbiesText == false){
            var p = document.createElement('p');
            p.innerHTML = "Please enter your hobbies as we advice.";
            p.style.color = 'red';
            p.style.fontSize = '13px';
            document.getElementsByTagName("body")[0].insertBefore(p,document.forms[0]);   
            p = positionIt(p,topOfBtn-35,leftOfBtn);         

        }else{   
            var div = document.createElement('div');
            document.getElementsByTagName("body")[0].insertBefore(div,document.forms[0]);
               
            createCheckbox(div,hobbiesText);
            div = positionIt(div,topOfBtn+30,leftOfBtn-30);
                       
        }
		EventUtil.preventDefault(event);//阻止提交默认事件

	});
});