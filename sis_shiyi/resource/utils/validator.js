module.exports = {
    showToastError: function(r) {
        return wx.showToast({
            title: r,
            icon: "loading",
            duration: 1500
        }), !1;
    },
    required: function(r) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        return null != t && "" != t || (t = "输入项不能为空！"), null == r || "" == r ? this.showToastError(t) : "" != r.replace(/(^\s*)|(\s*$)/g, "") || this.showToastError("输入项不能为空格！");
    },
    isMobile: function(r) {
        1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        if (0 == r.length) return this.showToastError("请输入您的手机号！");
        if (11 != r.length) return this.showToastError("请检查您的手机号长度！");
        return !!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(r) || this.showToastError("手机号有误，请重新检查！");
    },
    isIdCard: function(r) {
        var t = r, o = !0;
        if (/^\d{6}(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$|^\d{6}\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}$/.test(t) && {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        }[t.substr(0, 2)]) {
            if (18 === t.length) {
                for (var s = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ], i = 0, n = 0; n < 17; n++) i += t.charAt(n) * s[n];
                "10X98765432".charAt(i % 11) !== t.charAt(17) && (o = !1);
            }
        } else o = !1;
        return o || this.showToastError("请填写正确的身份证号码");
    }
};