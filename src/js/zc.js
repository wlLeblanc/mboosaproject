onload=function(){
//			//存储数据
//			var str = getCookie("arr");
//			// 用于存储所有的用户名和密码
//			var arr = [];
//			if (str != "")
//			{
//			// 取出来转换成数组
//				arr = eval(str);
//			}
//		
//		//给提交按钮绑定一个点击事件
//		obtn.onclick=function(){
//			// 获取用户名
//			
//			//定义一个对象
//			var obj = {};
//			//将用户名和密码添加到对象中
//			obj.username = oUsername.value;
//			obj.passwrd = oPassword.value;
//			arr.push(obj);
//			// 将数组的内容设置到 cookie 中呢？
//			// cookie 的名字是 arr, 内容是数组中的用户名和密码，过期时间是7天以后
//			addCookie("arr", arr.toSource(), 7);
//
//		}
//		
		var obtn=document.getElementById("btnRegister")
		var oUsername=document.getElementById("txtEMail")
		var oPassword=document.getElementById("txtRegPwd")
		obtn.onclick = function() {

		// oCheck.checked 为 true，那么就勾选了，否则就没勾选
			console.log('hh')

			// 勾选了，才保存 cookie
			// alert(oPassword.value);
			// 取出用户名和密码
			var strUsername = oUsername.value;
			var strPassword = oPassword.value;


			// 保存到cookie 中
			var oDate = new Date();

			// 得到7天后的日期对象
			oDate.setDate(oDate.getDate() + 7);

			document.cookie = "username="+strUsername+";expires=" + oDate;

			document.cookie = "password="+strPassword+";expires=" + oDate;
		
	}
		
	
}	
