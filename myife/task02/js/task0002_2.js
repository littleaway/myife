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

function showDiff(dateIn){
    var yearIn = dateIn.substr(0,4);
    var monthIn = dateIn.substr(5,2);
    var dayIn = dateIn.substr(8,2);
    newdateIn = yearIn+"/"+monthIn+"/"+dayIn+" "+"00:00:00";

    var nowTime = new Date();
    var endTime = new Date(newdateIn);
    var diff = endTime.getTime()-nowTime.getTime();
    if(diff>0){
        var d = Math.floor(diff/1000/60/60/24);
        var h = Math.floor(diff/1000/60/60%24);
        var m = Math.floor(diff/1000/60%60);
        var s = Math.floor(diff/1000%60);

        var result = "距离"+yearIn+"年"+monthIn+"月"+dayIn+"日还有"+d+"天"+h+"小时"+m+"分"+s+"秒";

        document.getElementById('txt').innerHTML = result;
        var t = setTimeout(function(){
            showDiff(dateIn);
        },1000);
    }else if(diff==0){
        clearTimeout(t);
    }else{
        alert("Please enter a legal date of the very format or a future date!");
    }
}

EventUtil.addHandler(window,"load",function(event){
	var Btn = document.forms[0].elements[1];
	var Textbox = document.forms[0].elements[0];

	EventUtil.addHandler(Btn,"click",function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
// not considering any illegal input circumstance, just realize a simple count down.
		var dateUser = new Array();      
        showDiff(Textbox.value);       
                       
		EventUtil.preventDefault(event);

	});


});