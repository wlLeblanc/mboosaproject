$(function(){
	
		var state=false;
		//定义一个变量用来判断
		var flag=false;
		//判断邮箱是否正确
		var $email=$('#txtEMail');
		//获取显示框
		var $Tip=$('#txtEMailTip')
		$email.focus(function(){
			if(state=false){
				$(this).val('')	;
			}
		});
		//失去焦点时判断
		$email.blur(function(){
			var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if($(this).val()==""){
				//alert('邮箱不能为空');
				$Tip.show().html('邮箱不能为空')
				$(this).focus();//获取当前的焦点
				flag=false;
				
			}
			else 
			{
				if (reg.test($(this).val())==false) {
					$Tip.html('')
					$Tip.html('你输入的邮箱格式不正确')
					//alert("你输入的邮箱格式不正确");
					$(this).focus();
					flag=false;
					
				} else{
					$Tip.html('')
					$Tip.html('')
					state=true;
					flag=true;
					
				}
				
			}
		});
		//判断手机号
		var $mobile=$('#txtMobile')
		var $call=$('#txtMobileTip')
		$mobile.focus(function(){
			if(state=false){
				$(this).val('')	;
			}
		});
		$mobile.blur(function(){
			var phone = /^1[34578]\d{9}$/;
			if($(this).val()==""){
				//alert('手机号不能为空');
				$call.html('手机号不能为空')
				$(this).focus();
				flag=false;
			}
			else 
			{  
				if(phone.test($(this).val())==false){
					//alert("你输入的手机号码不正确");
					$call.html('')
					$call.html('你输入的手机号不正确')
					$(this).focus();
					flag=false;
					
				} else{
					$call.html('')
					$call.html('');
					state=true;
					flag=true;
					
				}
				
			}
		});
		//判断密码长度
		var $pwd=$('#txtRegPwd');
		var $pw=$pwd.val();
		var $PwdTip=$('#txtRegPwdTip')
		$pwd.focus(function(){
			if(state=false){
				$(this).val('')	;
			}
		});
		//密码改变时
		$pwd.on('input',function(){
			//判断密码的强弱
				if(6<$(this).val().length&&$(this).val().length<12){
					$PwdTip.html("");
					$PwdTip.html("密码强度：弱")
					flag=true;
				}
				else if(12<=$(this).val().length&&$(this).val().length<16){
					$PwdTip.html("");
					$PwdTip.html("密码强度：中");
					flag=true;
				}
				else if(16<=$(this).val().length&&$(this).val().length<=18){
					$PwdTip.html("");
					$PwdTip.html("密码强度：强");
					flag=true;
				}
				 else{
					if ($(this).val().length<6||$(this).val().length>=18) {
						$PwdTip.html("");
						$PwdTip.html("密码长度必须为6——18位")
						flag=false;
					}
				}
			
		});
		$pwd.blur(function(){
			if($(this).val()==""){
				//alert('邮箱不能为空');
				$PwdTip.html('密码不能为空')
				$(this).focus();
				flag=false;
			}
			 else{
					if ($(this).val().length<6||$(this).val().length>=18) {
					$PwdTip.html("");
					$PwdTip.html("密码长度必须为6——18位")
					};
					flag=false;
				}	
		})
		//确认密码部分
		var $firmpwd=$('#txtConfirmPwd')
		var $fpw=$firmpwd.val();
		//获取显示框
		var $firmPwdTip=$('#txtConfirmPwdTip')
		$firmpwd.focus(function(){
			if(state=false){
				$(this).val('')	;
			}
		});
		$firmpwd.blur(function(){
			if($(this).val()==""){
				$firmPwdTip.html('密码不能为空')
				$(this).focus();
				flag=false;
			}
			
			if($('#txtConfirmPwd').val()!=$('#txtRegPwd').val()){
				console.log("hnhjh");
				$firmPwdTip.html('密码不一致')
				$(this).focus();
				flag=false;
			}
			else{
				flag=true;
			}
			
		});
		$('#btnRegister').on('click',function(){
			if(flag){
				alert('恭喜你注册成功')
				window.location.href="login.html";
				
			}
			
			
		});
		//存储数据
	var str = getCookie("arr");
	// 用于存储所有的商品
	var arr = [];
	if (str != "")
	{
		// 说明之前 cookie 中有商品的内容
		// 取出来转换成数组
		arr = eval(str);
	}
	//var arr = [];

	// 商品由 名称 和 价格组成
	// 例如：
	// {product: XXX, price: 180}
		$('#btnRegister').on('click',function(){
			// 获取用户名
			var oUsername=document.getElementById("txtEMail")

			// 密码
			var oPassword=document.getElementById("txtRegPwd")
		
			// 取出标签对象中的名字，也就是商品的名称

			// 函数库中自定义的函数
			// 添加了一个 cookie,名字是 product, 内容是 商品的信息, 过期时间是 7天后
			//alert(oSpan.innerHTML);
			
			// 转换成一个
			// var str = encodeURI(oSpan.innerHTML);

			var obj = {};

			obj.username = oUsername.innerHTML;
			obj.passwrd = oPassword.innerHTML;

			// 将创建好的商品添加到数组中
			arr.push(obj);

			// 将数组的内容设置到 cookie 中呢？
			// cookie 的名字是 arr, 内容是数组中的商品，过期时间是7天以后
			addCookie("arr", arr.toSource(), 7);

			/*
			addCookie("product", oSpan.innerHTML, 7);
			
			// 函数库中自定义的函数
			// 添加了一个 cookie,名字是 price, 内容是 商品的价格, 过期时间是 7天后 
			addCookie("price", oPrice.innerHTML, 7);
			//*/
			

			alert("添加成功");
		}
	
		
	
})