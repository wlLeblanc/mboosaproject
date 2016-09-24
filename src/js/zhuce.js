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
			    return;
				
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
				if(6<=$(this).val().length&&$(this).val().length<12){
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
					if ($(this).val().length<=6||$(this).val().length>18) {
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
				flag=false;
				$(this).focus();
				
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
			if($Tip.html()=="你输入的邮箱格式不正确"||$call.html()=='你输入的手机号不正确'||$PwdTip.html()=="密码长度必须为6——18位"
			||$('#txtMobile').val()==''||$('#txtEMail').val()==''||$('#txtRegPwd').val()==''||$('#txtConfirmPwdTip').html()=="密码不一致"){
				alert('信息有误')	
			}
			else{
				alert("恭喜你注册成功")
				window.location.href="login.html";
			}
			
			
		});
	
})
onload=function(){

		var obtn=document.getElementById("btnRegister")
		var oUsername=document.getElementById("txtEMail")
		var oPassword=document.getElementById("txtRegPwd")
		obtn.onclick = function() {

			//保存 cookie
			
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

