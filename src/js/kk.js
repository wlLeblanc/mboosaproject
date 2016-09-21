function $(id){
	return document.getElementById(id)
}
var regs = {
	
	userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
	pwdReg: /^.{6,20}$/,
	pwd2Reg: /^.{6,20}$/,
	numReg: /\d/,
	strReg: /[a-zA-Z]/,
	tsReg: /[^\u4e00-\u9fa5a-zA-Z0-9]/,
	emailReg:/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/,
	mobileReg:/^1[3|4|5|7|8]\d{9}$/
}
window.onload = function(){
    // 用户名字母、数字、_、-、中文
	// box   常规 box  出错的时候  box error  正确的时候  box right
	// tip   常规 tip hide  出错的时候  tip error  默认的时候  tip default

	var pwd = $("txtLoginPwd");
	pwd.lv = 0;
	var mobile = $("txtLoginID");
	var btn = $("btn");
	
	pwd.onkeyup=pwd.onfocus=pwd.onblur = function(evt){
		var e = evt || window.event;
		checkUserPwd(e);
	}

	mobile.onkeyup=mobile.onfocus=mobile.onblur = function(evt){
		var e = evt || window.event;
		checkMobile(e);
	}

	function checkMobile(_e){
		var type;
		var value = mobile.value;
		var box = mobile.parentNode;
		var tip = $('tip')
		var span = tip.lastElementChild;
		
		if(_e){
			type = _e;
		}
		if(type="focus") {
			if(value=="") {
				box.className = "box";
				tip.className = "tip default";
				span.innerHTML = "手机号不能为空";
			}
		}
		if(type=="blur") {
			if(value=="") {
				box.className = "box";
				tip.className = "tip hide";
			}
		}

		if(value=="") {
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "手机号不能为空";
			return false;
		} else if(regs.mobileReg.test(value)) {
			box.className = "box right";
			tip.className = "tip hide";
			return true;
		} else {
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "格式错误，请输入正确的11手机号";
			return false;
		}
	}
	
		function checkUserPwd(_e){
		var type;
		var value = pwd.value;
		var box = pwd.parentNode;
		var tip = $('tip');
		var span = tip.lastElementChild;
		
		if(_e){
			type = _e;
		}
		if(type="focus") {
			if(value=="") {
				box.className = "box";
				tip.className = "tip default";
				span.innerHTML = "建议使用数字、字母、下划线或其他特殊字符中的两种以上";
			}
		}
		if(type=="blur") {
			if(value=="") {
				box.className = "box";
				tip.className = "tip hide";
			}
		}

		if(value=="") {
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "密码不能为空";
			return false;
		} else if(regs.pwdReg.test(value)) {
			var level = getPwdLevel(value);
			switch(level){
				case 1 :
				        tip.className = "tip ruo";
				        break;
				case 2 :
				        tip.className = "tip zhong";
				        break;
				case 3 :
				        tip.className = "tip qiang";
				        break;
			}
			box.className = "box right";
			return true;
		} else {
			box.className = "box error";
			tip.className = "tip error";
			if(value.length>20||value.length<4){
			span.innerHTML = "格式错误，长度为6-20位";
			}
			return false;
		}
	}
	
	
	
	ck.onclick = function(){
		var box = ck.parentNode;
		var tip = box.nextElementSibling;
		var span = tip.lastElementChild;
		if(ck.checked){
			tip.className = "tip hide";
		}
	}
	
	
}







