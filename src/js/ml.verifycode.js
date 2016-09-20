$.ajaxSetup({ cache: false });
var MLVerifyCode = {
    ChangeVCode: function (name, type) {
        var token = $("#token").val();
        var key = MLVerifyCode.Guid();
        $("#" + name + "_key").val(key);
        $("#" + name + "_ValImg").attr("src", "/verifycode/showimg?guid=" + key + "&token=" + token);
        $("#" + name + "_Code").val("");

        $(".chect_image").css({ "background-image": "url(/verifycode/showimg?guid=" + key + "&token=" + token + ")" });

		if(!!window.XDomainRequest &&function () {var obj = {'1':1, '0':1};for (var s in obj) return!+s;}()){
			return;
		}
		else {
			$(".chect_image").each(function () {
				var pos = $(this).css("background-position");
				var posArr = pos.split(' ');
				$(this).css({ "background-position": posArr[0] + " 0px" });
			});
		}

        $(".chect_image").css({ "background-image": "url(/verifycode/showimg?guid=" + key + "&token=" + token + ")", "background-position-y": "0px" });
        $(".img_code_spin").val(0);
    },
    ValToken: function() {
        var token = $("#token").val();
        if (token.length > 0) {
            var res = "";
            $.ajax({
                type: "post",
                async: false,
                //data: { token: token },
                url: "/verifycode/CheckToken?token=" + token+"&guid="+MLVerifyCode.Guid(),
                success: function(result) {
                    res = result;
                }
            });
            if (res == -1) {
                return false;
            } else {
                return true;
            }
        }
    },
    ValLoginID: function () {
        var loginid = $('#txtLoginID').val();
        var token = $("#token").val();
        $.ajax({
            type: 'post',
            url: '/VerifyCode/IsVerify',
            data: { "loginID": loginid, "toKen": token },
            success: function (str) {
                if (str.Data) {
                    $("#isVerify").val(1);
                    MLVerifyCode.SetVerifyHtml("member_login");
                }
            }
        });
    },
    ValCode: function (name) {
        var vcode = $("#" + name + "_Code").val();
        var guid = $("#" + name + "_key").val();
        var data = "vcode=" + vcode + "&guid=" + guid;
        if (ML.Validator.IsEmptyOrNull(vcode)) {
            return "-100"; //0:正确 -100:请输入验证码 -101:请输入正确的验证码 -102:请输入正确的验证码 其它值：请输入正确的验证码　 MLValImg.ChangeVCode();
        }
        else {
            if (vcode.length < 3) {
                return "-101";
            }
            else {
                var rt = "";
                $.ajax({
                    type: "get",
                    async: false,
                    url: "/verifycode/CheckValCode",
                    data: data,
                    success: function (result) {
                        rt = result;
                    }
                });
                return rt;
            }
        }
    },
    Guid: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;  
    },
    SetVerifyHtml: function (operation) {
        var token = $("#token").val();
        var method = $("#method").val();
        var guid = MLVerifyCode.Guid();
        $("#" + operation + "_key").val(guid);
        if (operation=="member_login")
            $("#securityCode").show();
            
        if (method == 1) {
            $("#" + operation + "_Code").show();
            var strhtml = '<div class="General"><img height="24" name="' + operation + '_ValImg" id="' + operation + '_ValImg"　align="absbottom" src="/verifycode/showimg?guid=' + guid + '&token=' + token + '" alt="验证码"></div>';

            $("#container").html(strhtml);
            $(".checkCodeImg").css({ "width": "140px", "left": "175px" });
			$(".f_item_code").css("height","89px");
        } else if (method == 2) {
            $("#" + operation + "_Code").show();
            var strhtml = '<img class="Color" height="24" name="' + operation + '_ValImg" id="' + operation + '_ValImg"　align="absbottom" src="/verifycode/showimg?guid=' + guid + '&token=' + token + '" alt="验证码">';

            $("#container").html(strhtml);
            $(".i_text_checkCode").css({ "width": "120px" });
            $(".checkCodeImg").css({ "width": "140px", "left": "175px" });
			$(".f_item_code").css("height","89px");
        } else {
            $(".i_text_checkCode").hide();
            $(".check_code").css({ "position": "relative" });
			$(".code-line label").hide();
			$("#member_login_CodeTip").attr("style","top:99px");
			$("#member_reg_CodeTip").attr("style","top:99px");
			$(".checkcode-notice").show();
			
            var strhtml = "";
            strhtml += '<div class="chect_code_img">';
            strhtml += '<div class="chect_image s0" n onclick="javascript:MLVerifyCode.ChangeImgPos(this);" style="background-image:url(/verifycode/showimg?guid=' + guid + '&token=' + token + ')"></div>';
            strhtml += '<input type="hidden" class="img_code_spin" id="img_code_spin_0" name="" value="0" />';
            strhtml += '<div class="chect_image s1"onclick="javascript:MLVerifyCode.ChangeImgPos(this);" style="background-image:url(/verifycode/showimg?guid=' + guid + '&token=' + token + ')"></div>';
            strhtml += '<input type="hidden" class="img_code_spin" id="img_code_spin_1" name="" value="0" />';
            strhtml += '<div class="chect_image s2"onclick="javascript:MLVerifyCode.ChangeImgPos(this);" style="background-image:url(/verifycode/showimg?guid=' + guid + '&token=' + token + ')"></div>';
            strhtml += '<input type="hidden" class="img_code_spin" id="img_code_spin_2" name="" value="0" />';
            strhtml += '<div class="chect_image s3" onclick="javascript:MLVerifyCode.ChangeImgPos(this);" style="background-image:url(/verifycode/showimg?guid=' + guid + '&token=' + token + ')"></div>';
            strhtml += '<input type="hidden" class="img_code_spin" id="img_code_spin_3" name="" value="0" />';
            strhtml += '</div>';
            $("#container").html(strhtml);

            $("#member_reg_Code").attr("maxlength", "7");
            $(".checkcode-link").css({ "top": "0" }).html("换一组");
            $(".J_code_item").css({ "paddingBottom": "15px" });
        }
    },
    SetHint: function (ishow,msg) {
        if (ishow) {
            $("#loginMsg").show();
            $("#loginMsg").html('<span class="loginmsg">' + msg + '</span>');    
        } else {
            $("#loginMsg").hide();
        }
    },
    SetVerifyCode: function (name) {
        var method = $("#method").val();
        if (method == 3) {
            var val1 = $("#img_code_spin_0").val();
            var val2 = $("#img_code_spin_1").val();
            var val3 = $("#img_code_spin_2").val();
            var val4 = $("#img_code_spin_3").val();
            if (val1 != null && val2 != null && val3 != null && val4 != null) {
                var val = val1 + "," + val2 + "," + val3 + "," + val4;
                $("input[name='" + name + "_Code']").val(val);
            }
        }
    },
    ChangeImgPos: function (that) {
		var navigatorName = "Microsoft Internet Explorer";
        if(navigator.appName != navigatorName && $(that).css("backgroundPosition")) {
			var _pos = $(that).css("backgroundPosition");
			changeY(_pos);

		} 
		//兼容IE9
		else if(!!window.XDomainRequest &&function () {var obj = {'1':1, '0':1};for (var s in obj) return!+s;}()) {			  
				var pos_9 = $(that).css("backgroundPositionY");
				pos_9 = pos_9.substring(0, pos_9.indexOf("p")); 
				if (pos_9 == "-225") {
					pos_9 = 0;
					$(that).css({ "backgroundPositionY": pos_9 + "px" });
				} else {
				$(that).css({ "backgroundPositionY": (pos_9 - 75) + "px" });
					}

		}else {
			var _pos = getStyle($(that).get(0),"backgroundPosition");
			changeY(_pos);
		}
		
		function changeY(pos) {
			var posArr = pos.split(' ');
			var pos_y = posArr[1];
			pos_y = pos_y.substring(0, pos_y.indexOf("p"));
			
			if (pos_y == "-225") {
				pos_y = 0;
				$(that).css({ "backgroundPosition": posArr[0] + " " + pos_y + "px" });
			} else {
				$(that).css({ "backgroundPosition": posArr[0] + " " + (pos_y - 75) + "px" });
			}
		}
        
        //旋转一次 改图片对应的value值
        var index = $(that).parent().find(".chect_image").index($(that));
        var value = $("#img_code_spin_" + index).val();
        $("#img_code_spin_" + index).val(parseInt(value) + 1);
    }

}

//兼容IE7、8获取background-position;
function getStyle(obj,attr){
  if(obj.currentStyle){
    if(attr=="backgroundPosition"){
      return obj.currentStyle.backgroundPositionX +" "+obj.currentStyle.backgroundPositionY; 
    }
    else{
      return obj.currentStyle[attr];
    }
  }
  else{
    return document.defaultView.getComputedStyle(obj,null)[attr]; 
  }
}