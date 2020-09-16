var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        userInfo: [],
        datum: [],
        author_id: 0
    },
    onLoad: function() {
        _function.system(this);
        var t = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: t
        }), this.getDatum();
    },
    getDatum: function() {
        var n = this;
        _function.request("entry/wxapp/UserIndex", {
            types: 3,
            openid: this.data.userInfo.openid
        }, "", function(t) {
            console.log("小一", t), n.setData({
                datum: t.data,
                author_id: t.id
            });
        }, this);
    },
    getcash: function(t) {
        var n = this;
        if (Number(this.data.datum.can_money) < Number(this.data.datum.modules.cash)) return _function.hint(3, "抱歉，金额低于" + this.data.datum.modules.cash + "元不能提现哦！", "温馨提示", function(t) {}), 
        !1;
        _function.request("entry/wxapp/Getcash", {
            author_id: this.data.author_id,
            openid: this.data.userInfo.openid,
            cash: this.data.datum.can_money
        }, "", function(t) {
            console.log(t), 1 == t ? _function.hint(3, "申请提现成功！", "温馨提示", function(t) {}) : 3 == t ? _function.hint(3, "申请提现失败！", "温馨提示", function(t) {}) : 4 == t && _function.hint(3, "提现金额不合法！", "温馨提示", function(t) {}), 
            n.getDatum();
        }, this);
    },
    onPullDownRefresh: function() {
        _function.system(this), this.getDatum(), wx.stopPullDownRefresh();
    }
});