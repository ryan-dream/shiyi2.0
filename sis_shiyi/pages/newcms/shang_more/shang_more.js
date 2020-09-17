getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var t = require("../../../resource/function/function.js");

Page({
    data: {
        userInfo: "",
        shang_num: 0,
        id: 0,
        authorInfo: [],
        rmbInp: 0
    },
    onLoad: function(t) {
        this.setUserInfo(), this.setData({
            shang_num: t.shang_num,
            id: t.id
        }), this.getaAuthorInfo(t.author_id);
    },
    setUserInfo: function(n) {
        var a = wx.getStorageSync("userInfo");
        a ? this.setData({
            userInfo: a
        }) : t.getUserinfo(this);
    },
    getaAuthorInfo: function(n) {
        var a = this;
        t.request("entry/wxapp/getaAuthorInfo", {
            author_id: n
        }, "", function(t) {
            a.setData({
                authorInfo: t
            });
        }, this);
    },
    rmbValue: function(t) {
        this.setData({
            rmbInp: t.detail.value
        });
    },
    shangPay: function() {
        var n = this, a = this.data.rmbInp;
        return "" == a ? (t.hint(3, "对不起，请输入打赏金额^_^!", "温馨提示", function(t) {}), !1) : this.data.id && this.data.userInfo && this.data.authorInfo ? void t.request("entry/wxapp/Shang", {
            id: this.data.id,
            shang_money: a,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid,
            avatar: this.data.userInfo.avatar,
            author_id: this.data.authorInfo.id
        }, "", function(a) {
            if (1 == a.state) {
                var e = n;
                wx.requestPayment({
                    timeStamp: a.timeStamp,
                    nonceStr: a.nonceStr,
                    package: a.package,
                    signType: "MD5",
                    paySign: a.paySign,
                    success: function(n) {
                        t.hint(3, "打赏成功^_^!", "温馨提示！", function(t) {}), t.request("entry/wxapp/Detail", {
                            id: e.data.id,
                            types: "shang"
                        }, "", function(t) {
                            e.setData({
                                shang_num: t
                            });
                        }, this);
                    },
                    fail: function(n) {
                        t.hint(3, "打赏失败^_^!", "网络提示", function(t) {});
                    }
                });
            } else t.hint(3, "网络错误，请稍后重试—_—!", "温馨提示！", function(t) {});
        }, this) : (t.hint(3, "对不起，出错了，请返回上一页重新操作!", "温馨提示", function(t) {}), !1);
    }
});