var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        userInfo: "",
        shang_num: 0,
        id: 0,
        authorInfo: []
    },
    onLoad: function(t) {
        this.setUserInfo(), this.setData({
            shang_num: t.shang_num,
            id: t.id
        }), this.getaAuthorInfo(t.author_id);
    },
    setUserInfo: function(t) {
        var n = wx.getStorageSync("userInfo");
        n ? this.setData({
            userInfo: n
        }) : _function.getUserinfo(this);
    },
    getaAuthorInfo: function(t) {
        var n = this;
        _function.request("entry/wxapp/getaAuthorInfo", {
            author_id: t
        }, "", function(t) {
            n.setData({
                authorInfo: t
            });
        }, this);
    },
    shangPay: function(t) {
        var a = this, n = t.target.dataset.rmb;
        return "" == n ? (_function.hint(3, "对不起，请输入打赏金额^_^!", "温馨提示", function(t) {}), 
        !1) : this.data.id && this.data.userInfo && this.data.authorInfo ? void _function.request("entry/wxapp/Shang", {
            id: this.data.id,
            shang_money: n,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid,
            avatar: this.data.userInfo.avatar,
            author_id: this.data.authorInfo.id
        }, "", function(t) {
            if (1 == t.state) {
                var n = a;
                wx.requestPayment({
                    timeStamp: t.timeStamp,
                    nonceStr: t.nonceStr,
                    package: t.package,
                    signType: "MD5",
                    paySign: t.paySign,
                    success: function(t) {
                        _function.hint(3, "打赏成功^_^!", "温馨提示！", function(t) {}), _function.request("entry/wxapp/Detail", {
                            id: n.data.id,
                            types: "shang"
                        }, "", function(t) {
                            n.setData({
                                shang_num: t
                            });
                        }, this);
                    },
                    fail: function(t) {
                        _function.hint(3, "打赏失败^_^!", "网络提示", function(t) {});
                    }
                });
            } else _function.hint(3, "网络错误，请稍后重试—_—!", "温馨提示！", function(t) {});
        }, this) : (_function.hint(3, "对不起，出错了，请返回上一页重新操作!", "温馨提示", function(t) {}), !1);
    },
    qita: function(t) {
        var n = "?shang_num=" + this.data.shang_num + "&id=" + this.data.id + "&author_id=" + this.data.authorInfo.id;
        _function.jump(1, "/sis_shiyi/pages/newcms/shang_more/shang_more" + n);
    }
});