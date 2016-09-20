
$(function () {
    $("#txtLoginID").blur(function () {
        var loginid = $('#txtLoginID').val();
        if (ML.Validator.IsEmptyOrNull(loginid)) {
            Validate.SetError('txtLoginID', '邮箱/手机号/会员卡号不能为空');
        }
        else if (ML.Validator.IsEmail(loginid) || ML.Validator.IsMobile(loginid) || Validate.IsCusCode(loginid)) {
            Validate.SetCorrect('txtLoginID');
            var isVerify = $("#isVerify").val();
            if (isVerify == 0) {
                MLVerifyCode.ValLoginID();
            }
        }
        else {
            Validate.SetError('txtLoginID', '邮箱/手机号/会员卡号错误，请重新输入');
        }
    });
    $("#txtLoginPwd").blur(function () {
        var password = $("#txtLoginPwd").val();
        if (ML.Validator.IsEmptyOrNull(password)) {
            Validate.SetError('txtLoginPwd', '密码不能为空');
        }
        else {
            Validate.SetCorrect('txtLoginPwd');
        }
    });
    $("#txtLoginMob").blur(function () {
        var loginmob = $("#txtLoginMob").val();
        if (ML.Validator.IsEmptyOrNull(loginmob)) {
            Validate.SetError('txtLoginMob', "手机号不能为空");
        }
        else if (ML.Validator.IsMobile(loginmob)) {
            Validate.SetCorrect('txtLoginMob');
        }
        else {
            Validate.SetError('txtLoginMob', "您输入手机号码不符合规范");
        }
    });
    $("#member_login_Code").blur(function () {
        var result = MLVerifyCode.ValCode('member_login');

        if (result == "0") {
            Validate.SetCorrect('member_login_Code');
            return true;
        }
        else if (result == -100) {
			Validate.SetError('member_login_Code', '请输入验证码');
			return false;
		}
		else if (result == -101) {
			Validate.SetError('member_login_Code', '请输入四位验证码');
			return false;
		}
		else if (result == -102) {
			Validate.SetError('member_login_Code', '请输入正确的验证码');
			MLVerifyCode.ChangeVCode('member_login', 0);
			return false;
		}
		else {
			Validate.SetError('member_login_Code', '验证码已过期，请重新输入');
			MLVerifyCode.ChangeVCode('member_login', 0);
			return false;
		}
    });
    $('#member_login_ValImg').live('click', function() {
        if (MLVerifyCode.ValToken()) {
            MLVerifyCode.ChangeVCode('member_login', 0);
        } else {
            MLVerifyCode.SetHint(true, "页面已经过期,请刷新页面！");
        }
    });
    $("#aLoginChgVCode").click(function () {
        if (MLVerifyCode.ValToken()) {
            MLVerifyCode.ChangeVCode('member_login', 0);
        } else {
            MLVerifyCode.SetHint(true, "页面已经过期,请刷新页面！");
        }
    });

    /*用户登录*/
    $("#btnLogin").click(function () {

        var isSubmit = true;

        var loginid = $('#txtLoginID').val();
        if (ML.Validator.IsEmptyOrNull(loginid)) {
            Validate.SetError('txtLoginID', '邮箱/手机号/会员卡号不能为空');
            isSubmit = false;
        }
        else if (ML.Validator.IsEmail(loginid) || ML.Validator.IsMobile(loginid) || Validate.IsCusCode(loginid)) {
            Validate.SetCorrect('txtLoginID');
        }
        else {
            Validate.SetError('txtLoginID', '邮箱/手机号/会员卡号错误，请重新输入');
            isSubmit = false;
        }
        var password = $("#txtLoginPwd").val();
        if (ML.Validator.IsEmptyOrNull(password)) {
            Validate.SetError('txtLoginPwd', '密码不能为空');
            isSubmit = false;
        }
        else {
            Validate.SetCorrect('txtLoginPwd');
        }

        if (!MLVerifyCode.ValToken()) {
            MLVerifyCode.SetHint(true, "页面已经过期,请刷新页面！");
            isSubmit = false;
        }

        MLVerifyCode.SetVerifyCode("member_login");

        if (MLLogin.GetIsShowLoginVCode()) {
            var result = MLVerifyCode.ValCode('member_login');
            if (result == 0) {
                MLVerifyCode.SetHint(false);
            }
            else if (result == -100) {
                Validate.SetError('member_login_Code', '请输入验证码');
                isSubmit = false;
            }
            else if (result == -101) {
                Validate.SetError('member_login_Code', '请输入四位验证码');
                isSubmit = false;
            }
            else if (result == -102) {
                Validate.SetError('member_login_Code', '请输入正确的验证码');
                MLVerifyCode.ChangeVCode('member_login', 0);
                isSubmit = false;
            }
            else {
                Validate.SetError('member_login_Code', '验证码已过期，请重新输入');
                MLVerifyCode.ChangeVCode('member_login', 0);
                isSubmit = false;
            }
        }

        if (isSubmit == false) {
            return false;
        }
        else {
            $("#btnLogin").attr('disabled', 'disabled').removeClass('i_btn_ok').addClass('i_btn_disabled').val('登录中...');
            $("#loginMsg").hide();
            $.ajax({
                type: 'post',
                url: '/home/userlogin',
                data: $("#form").serialize(),
                success: function (str) {
                    $("#btnLogin").removeAttr("disabled").removeClass('i_btn_disabled').addClass('i_btn_ok').val('登录'); //设置登录按钮为可点击
                    if (str.IsShow == 0 && str.Result == -1) { //展示验证码
                        $("#isVerify").val(1);
                        MLVerifyCode.SetVerifyHtml("member_login");
                    }

                    if (typeof (str.Msg) == 'undefined') {
                        MLVerifyCode.SetHint(true, "系统异常，请稍后再试！");
                    }
                    else {
                        if (str.Result == 1) {
                            $("#dialog").dialog('open');
                            MLLogin.Redirect();
                        }
                        else {
                            $("#loginMsg").show();
                            if (str.Result == 105) {
                                $("#loginMsg").html('因系统升级,您帐号密码过于简单,暂禁止登录,请<a href="/reset/step1"><font color=red>找回密码</font></a>修改为复杂密码');
                            }
                            else {
                                MLVerifyCode.SetHint(true, str.Msg);
                            }
                        }
                    }
                },
                error: function () {
                    MLVerifyCode.SetHint(true, "数据传输异常，登录失败！");
                }
            });
        }
    });

    $("#ulUserLogin").keypress(function (event) {
        if (event.keyCode == 13) {
            $("#btnLogin").click();
        }
    });

    $("#dialog").dialog({
        modal: true,
        title: '系统提示',
        width: 300,
        height: 160,
        autoOpen: false,
        showClose: false
    });

    //点击无密码登录
    $('.login-txt_2').on('click', function () {
        $("#btnLogin").hide();
        $("#btnSmsLogin").show();
        MLVerifyCode.SetHint(false);
		Validate.SetError(false);
		$("input.i_text, input.i_text_checkCode").removeClass("i_text_error");
		
		var active = $("#txtLoginIDTip,#txtLoginPwdTip,#txtLoginMobTip,#member_login_CodeTip,#txtLoginDpwdTip");
		active.removeClass("f_explain");
		active.html("");

        if (MLVerifyCode.ValToken()) {
            MLVerifyCode.SetVerifyHtml("member_login");
        } else {
            MLVerifyCode.SetHint(true, "页面已经过期,请刷新页面！");
        }
        
        $(".input_block_1").hide();
        $(".input_block_2").show();
        $(".login-txt").removeClass("login_active");
        $(".login-txt_2").addClass("login_active");
        $(".login_bor_1").hide();
        $(".login_bor_2").show();
    });
    $(".login-txt").on('click', function () {
        $("#btnLogin").show();
        $("#btnSmsLogin").hide();
        MLVerifyCode.SetHint(false);
        $(".input_block_2").hide();
        $(".input_block_1").show();
        $(".login-txt_2").removeClass("login_active");
        $(".login-txt").addClass("login_active");
        $(".login_bor_2").hide();
        $(".login_bor_1").show();
    });

    //获取手机动态口令
    $("#get_dynPwd").click(function () {
        if (MLVerifyCode.ValToken()) {
            MLVerifyCode.SetVerifyCode("member_login");
        } else {
            MLVerifyCode.SetHint(true, "页面已经过期,请刷新页面！");
        }

        
        var isSubmit = true;
        var loginmob = $("#txtLoginMob").val();

        if (ML.Validator.IsEmptyOrNull(loginmob)) {
            Validate.SetError('txtLoginMob', "手机号不能为空！");
            return false;
        }
        else if (ML.Validator.IsMobile(loginmob)) {
            Validate.SetError(false);
        }
        else {
            Validate.SetError('txtLoginMob', "您输入手机号码不符合规范！");
            return false;
        }

        var result = MLVerifyCode.ValCode('member_login');
        if (result == 0) {
            MLVerifyCode.SetHint(false);
        }
		else if (result == -100) {
			Validate.SetError('member_login_Code', '请输入验证码');
			isSubmit = false;
		}
		else if (result == -101) {
			Validate.SetError('member_login_Code', '请输入四位验证码');
			isSubmit = false;
		}
		else if (result == -102) {
			Validate.SetError('member_login_Code', '请输入正确的验证码');
			MLVerifyCode.ChangeVCode('member_login', 0);
			isSubmit = false;
		}
		else {
			Validate.SetError('member_login_Code', '验证码已过期，请重新输入');
			MLVerifyCode.ChangeVCode('member_login', 0);
			isSubmit = false;
		}

        if (isSubmit == false) {
            return false;
        } else {
            $.ajax({
                type: 'post',
                url: '/VerifyCode/SendSms',
                data: $("#form").serialize(),
                success: function (str) {
                    if (str.Result == 1) {
                        Min();
                    }else {
                        MLVerifyCode.SetHint(true, str.Msg);
                    }
                },
                error: function () {
                    MLVerifyCode.SetHint(true, "数据传输异常，登录失败！");
                }
            });
        }
    });
	
	//无密码登录
    $("#btnSmsLogin").click(function () {
        
        var isSubmit = true;
        var loginmob = $("#txtLoginMob").val();

        if (ML.Validator.IsEmptyOrNull(loginmob)) {
            Validate.SetError('txtLoginMob', "手机号不能为空！");
            return false;
        }
        else if (ML.Validator.IsMobile(loginmob)) {
           Validate.SetError(false);
        }
        else {
            Validate.SetError('txtLoginMob', "您输入手机号码不符合规范！");
            return false;
        }
        MLVerifyCode.SetVerifyCode("member_login");
        var result = MLVerifyCode.ValCode('member_login');
        if (result == 0) {
            MLVerifyCode.SetHint(false);
        }
        else if (result == -100) {
			Validate.SetError('member_login_Code', '请输入验证码');
			isSubmit = false;
		}
		else if (result == -101) {
			Validate.SetError('member_login_Code', '请输入四位验证码');
			isSubmit = false;
		}
		else if (result == -102) {
			Validate.SetError('member_login_Code', '请输入正确的验证码');
			MLVerifyCode.ChangeVCode('member_login', 0);
			isSubmit = false;
		}
		else {
			Validate.SetError('member_login_Code', '验证码已过期，请重新输入');
			MLVerifyCode.ChangeVCode('member_login', 0);
			isSubmit = false;
		}

        if (isSubmit == false) {
            return false;
        } else {
            $.ajax({
                type: 'post',
                url: '/home/UserSmsLogin',
                data: $("#form").serialize(),
                success: function (str) {
                    if (typeof (str.Msg) == 'undefined') {
                        MLVerifyCode.SetHint(true, "系统异常，请稍后再试！");
                    }
                    else {
                        if (str.Result == 1) {
                            $("#dialog").dialog('open');
                            MLLogin.Redirect();
                        }
                        else {
                            $("#loginMsg").show();
                            if (str.Result == 105) {
                                $("#loginMsg").html('因系统升级,您帐号密码过于简单,暂禁止登录,请<a href="/reset/step1"><font color=red>找回密码</font></a>修改为复杂密码');
                            }
                            else {
                                MLVerifyCode.SetHint(true, str.Msg);
                            }
                        }
                    }
                },
                error: function () {
                    MLVerifyCode.SetHint(true, "数据传输异常，登录失败！");
                }
            });
        }
    });

});

function Min() {
    $("#get_dynPwd").css({ "background": "#7C7C7C", "cursor": "no-drop" });
    var s = parseInt($("#get_dynPwd").attr("data-time"));
    $("#get_dynPwd").attr('disabled', 'disabled');
    if (s > 1) {
        var ret = s - 1;
        $("#get_dynPwd").attr("data-time", ret);
        $("#get_dynPwd").val(ret + "秒后重新获取");
        setTimeout(Min, 1000);
    }
    else if (s == 1) {
        $("#get_dynPwd").removeAttr('disabled');
        $("#get_dynPwd").attr("data-time", 60);
        $("#get_dynPwd").val("获取手机动态口令");
        $("#get_dynPwd").css({ "background": "#ff9cb1", "cursor": "pointer"});
    }
}

var MLLogin = {
    GetIsShowLoginVCode: function () {
        return $("#isVerify").val() == 1 ? true : false;
    },
    Redirect: function () {
        var location = window.location.href.toLowerCase();

        var redirecturl = MemberDomain;

        var referrer = document.referrer.toLowerCase();

        if (location.indexOf('returnurl=') > 0) {
            var p = location.split('returnurl=');
            if (p.length > 1) {
                redirecturl = unescape(p[1]);
            }
        }
        else if (referrer != "" && referrer != null && referrer.indexOf("/reset/step2")==-1 ) {
            redirecturl = referrer;
        }

        window.location.href = redirecturl;
    }
}