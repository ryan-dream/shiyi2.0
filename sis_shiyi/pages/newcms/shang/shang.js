getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var t = require("../../../resource/function/function.js");

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
    setUserInfo: function(a) {
        var n = wx.getStorageSync("userInfo");
        n ? this.setData({
            userInfo: n
        }) : t.getUserinfo(this);
    },
    getaAuthorInfo: function(a) {
        var n = this;
        t.request("entry/wxapp/getaAuthorInfo", {
            author_id: a
        }, "", function(t) {
            n.setData({
                authorInfo: t
            });
        }, this);
    },
    shangPay: function(a) {
        var n = this, i = a.target.dataset.rmb;
        return "" == i ? (t.hint(3, "对不起，请输入打赏金额^_^!", "温馨提示", function(t) {}), !1) : this.data.id && this.data.userInfo && this.data.authorInfo ? void t.request("entry/wxapp/Shang", {
            id: this.data.id,
            shang_money: i,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid,
            avatar: this.data.userInfo.avatar,
            author_id: this.data.authorInfo.id
        }, "", function(a) {
            if (1 == a.state) {
                var i = n;
                wx.requestPayment({
                    timeStamp: a.timeStamp,
                    nonceStr: a.nonceStr,
                    package: a.package,
                    signType: "MD5",
                    paySign: a.paySign,
                    success: function(a) {
                        t.hint(3, "打赏成功^_^!", "温馨提示！", function(t) {}), t.request("entry/wxapp/Detail", {
                            id: i.data.id,
                            types: "shang"
                        }, "", function(t) {
                            i.setData({
                                shang_num: t
                            });
                        }, this);
                    },
                    fail: function(a) {
                        t.hint(3, "打赏失败^_^!", "网络提示", function(t) {});
                    }
                });
            } else t.hint(3, "网络错误，请稍后重试—_—!", "温馨提示！", function(t) {});
        }, this) : (t.hint(3, "对不起，出错了，请返回上一页重新操作!", "温馨提示", function(t) {}), !1);
    },
    qita: function(a) {
        var n = "?shang_num=" + this.data.shang_num + "&id=" + this.data.id + "&author_id=" + this.data.authorInfo.id;
        t.jump(1, "/sis_shiyi/pages/newcms/shang_more/shang_more" + n);
    }
});