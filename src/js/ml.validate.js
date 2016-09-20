var ML = {
    Validator: {
        IsEmail: function (val) {
            return /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/i.test(val);
        },
        IsMobile: function (val) {
            return /^1[34578][0-9]{9,9}$/i.test(val);
        },
        IsTelphone: function (val) {
            return /(^(\d{3,4})-(\d{7,8})$)|(^(\d{3,4})-(\d{7,8})-(\d{1,4})$)/i.test(val);
        },
        IsDate: function (val) {
            return !/Invalid|NaN/.test(new Date(val));
        },
        IsEmptyOrNull: function (val) {
            val = $.trim(val);
            return val == "" || val == null || val == undefined
        },
        IsCusCode: function (val) {
            return /^\d{8}$/.test(val);
        }
    },
    ValidatorStyle: {
        Error: function (obj, msg) {
            $("#" + obj).removeClass();
            $("#" + obj).text(msg);
            $("#" + obj).addClass("validateerror");
        },
        Success: function (obj) {
            $("#" + obj).removeClass();
            $("#" + obj).html("&nbsp;");
            $("#" + obj).addClass("validatesuccess");
        }
    }
}