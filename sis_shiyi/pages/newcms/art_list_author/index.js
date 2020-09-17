getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var t = require("../../../resource/function/function.js");

Page({
    data: {
        datum: [],
        p: 1,
        pnum: 10,
        ismore: !0,
        hint: "",
        is_pay: !1,
        select_text: ""
    },
    onLoad: function(e) {
        var a = this;
        t.system("");
        var s = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: s
        }), s || t.getUserinfo("300", function(t) {
            wx.setStorageSync("userInfo", t), a.setData({
                userInfo: t
            });
        }, this), this.getDatum();
    },
    getDatum: function(e, a) {
        var s = this;
        1 == this.data.ismore && t.request("entry/wxapp/AuthorRanking", {
            p: this.data.p,
            pnum: this.data.pnum,
            select_text: this.data.select_text
        }, "", function(t) {
            var e = s.data.datum;
            e = 1 == s.data.p ? t || [] : e.concat(t || []), s.setData({
                datum: e,
                ismore: !(t.length < s.data.pnum),
                hint: t.length < s.data.pnum ? "没有更多啦~" : ""
            });
        }, this);
    },
    select: function(e) {
        if ("" == e.detail.value) return t.hint(3, "抱歉,请输入昵称搜索~", "系统提示", function(t) {}), 
        !1;
        this.setData({
            p: 1,
            datum: [],
            ismore: !0,
            select_text: e.detail.value
        }), this.getDatum();
    },
    onPullDownRefresh: function() {
        this.setData({
            datum: [],
            p: 1,
            ismore: !0,
            select_text: "",
            hint: ""
        }), this.getDatum(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.setData({
            p: parseInt(this.data.p) + 1
        }), this.getDatum();
    }
});