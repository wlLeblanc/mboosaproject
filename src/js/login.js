onload=function(){
	var shouji=document.getElementById("txtLoginID");
	var btnLogin=document.getElementById("btnLogin");
	btnLogin.onclick=function(){
		if (shouji.value!=/^1[3458]{1}[0-9]{9}$/) {
		alert("你输入的手机号有误")
		console.log("jhhj")
	}
	}
}

