onload = function() {

	var uname = document.getElementById("txtLoginID");
	var pwd = document.getElementById("txtLoginPwd");
	var oBtn=document.getElementById("btnLogin");

	oBtn.onclick=function(){	
		//读取页面cookie
		var str = document.cookie;
		//定义一个对象
		var obj = {};
		//截取数据得到一个数组
		console.log(str);
		var arr = str.split("; ");
		for (var i = 0; i < arr.length; i++)
		{
			var arr2 = arr[i].split("=");
			var name = arr2[0];
			//console.log(arr2)
			var val = arr2[1];
		
			// 在obj对象中添加了一个属性为 name 变量的值，然后这个属性的值是 val
			obj[name] = val;
			
		
		}
		var n=uname.value;
		var m=pwd.value;
	    //做判断
		if (n==obj.username &&m==obj.password)
		{
			alert("登录成功");
			
		}
		else if(n!=obj.username&&m==obj.password){
			alert("用户名错误");
		}
		else if(n==obj.username&&m!=obj.password){
			alert("密码错误");
		}

	}

}
