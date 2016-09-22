$(function(){
	$('#btnRegister').on('click',function(){
	
		
	})
		var state=false;
		//判断邮箱是否正确
		var $email=$('#txtEMail');
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
				$('#txtEMailTip').show().html('邮箱不能为空')
				$(this).focus();
			}
			else 
			{
				if (reg.test($(this).val())==false) {
					$('#txtEMailTip').html('')
					$('#txtEMailTip').show().html('你输入的邮箱格式不正确')
					//alert("你输入的邮箱格式不正确");
					$(this).focus();
					
				} else{
					$('#txtEMailTip').html('')
					$('#txtEMailTip').show().html('你输入的邮箱格式正确')
					state=true;
					
				}
				
			}
		});
		//判断手机号
		var $mobile=$('#txtMobile')
		$mobile.focus(function(){
			if(state=false){
				$(this).val('')	;
			}
		});
		$mobile.blur(function(){
			var phone = /^1[34578]\d{9}$/;
			if($(this).val()==""){
				//alert('手机号不能为空');
				$('#txtMobileTip').show().html('手机号不能为空')
				$(this).focus();
			}
			else 
			{
					//alert("你输入的手机号码不正确");
					$('#txtMobileTip').html('')
					$('#txtMobileTip').show().html('你输入的手机号不正确')
					$(this).focus();
					
				} else{
					$('#txtMobileTip').html('')
					$('#txtMobileTip').show().html('输入正确')
					state=true;
					
				}
				
			}
		});
		//判断密码长度
		var $pwd=$('#txtRegPwd');
		var $pw=$pwd.val();
		$pwd.focus(function(){
			if(state=false){
				$(this).val('')	;
			}
		});
		$pwd.blur(function(){
			if($(this).val()==""){
				//alert('邮箱不能为空');
				$('#txtRegPwdTip').show().html('密码不能为空')
				$(this).focus();
			}
			 else{
				if ($pw.length<6||$pw.length>18) {
				$('#txtRegPwdTip').html("");
				$('#txtRegPwdTip').show().html("密码长度必须为6——18位")
				
				}
			}
		})
		//确认密码部分
		var $firmpwd=$('#txtConfirmPwd')
		var $fpw=$firmpwd.val();
		$firmpwd.focus(function(){
			if(state=false){
				$(this).val('')	;
			}
		});
		$firmpwd.blur(function(){
			if($pw!=$fpw){
				
				$('#txtConfirmPwdTip').show().html('密码不能为空')
				$(this).focus();
			}
			
		})
	
})