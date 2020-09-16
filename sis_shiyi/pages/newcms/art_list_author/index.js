var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

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
    onLoad: function(t) {
        var e = this;
        _function.system("");
        var a = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: a
        }), a || _function.getUserinfo("300", function(t) {
            wx.setStorageSync("userInfo", t), e.setData({
                userInfo: t
            });
        }, this), this.getDatum();
    },
    getDatum: function(t, e) {
        var a = this;
        1 == this.data.ismore && _function.request("entry/wxapp/AuthorRanking", {
            p: this.data.p,
            pnum: this.data.pnum,
            select_text: this.data.select_text
        }, "", function(t) {
            var e = a.data.datum;
            e = 1 == a.data.p ? t || [] : e.concat(t || []), a.setData({
                datum: e,
                ismore: !(t.length < a.data.pnum),
                hint: t.length < a.data.pnum ? "没有更多啦~" : ""
            });
        }, this);
    },
    select: function(t) {
        if ("" == t.detail.value) return _function.hint(3, "抱歉,请输入昵称搜索~", "系统提示", function(t) {}), 
        !1;
        this.setData({
            p: 1,
            datum: [],
            ismore: !0,
            select_text: t.detail.value
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