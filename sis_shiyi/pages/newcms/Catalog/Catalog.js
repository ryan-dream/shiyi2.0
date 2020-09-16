var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        userInfo: [],
        datum: [],
        id: "",
        p: 1,
        pnum: 20,
        ismore: !0,
        total: 0,
        free_chapter: 0,
        member: 0,
        mypay: 0,
        positive: "正序",
        name: ""
    },
    onLoad: function(t) {
        if (console.log(t), _function.system(this), wx.setNavigationBarTitle({
            title: t.name
        }), 2 == t.ser_type) {
            var a = wx.getStorageSync("userInfo");
            a ? this.setData({
                userInfo: a
            }) : _function.getUserinfo(this);
        }
        this.setData({
            id: t.id,
            free_chapter: t.free_chapter - 1,
            member: t.member,
            mypay: t.mypay,
            name: t.name
        }), wx.setStorageSync("free_chapter", t.free_chapter), wx.setStorageSync("member", t.member), 
        wx.setStorageSync("mypay", t.mypay), this.getDatum(t.id);
    },
    onPullDownRefresh: function() {
        this.setData({
            datum: [],
            p: 1,
            ismore: !0
        }), this.getDatum(this.data.id), wx.stopPullDownRefresh();
    },
    inverted: function() {
        var e = this;
        this.setData({
            positive: "正序" == this.data.positive ? "倒叙" : "正序"
        }), _function.request("entry/wxapp/Catalog", {
            id: this.data.id,
            p: this.data.p,
            pnum: this.data.pnum,
            positive: this.data.positive
        }, "", function(t) {
            var a = e.data.datum;
            a = 1 == e.data.p ? t.data || [] : a.concat(t.data || []), e.setData({
                datum: a,
                total: t.total,
                ismore: a.length != e.data.total
            });
        }, this);
    },
    onReachBottom: function() {
        this.setData({
            p: parseInt(this.data.p) + 1
        }), this.getDatum(this.data.id);
    },
    getDatum: function(t) {
        var e = this;
        1 == this.data.ismore ? _function.request("entry/wxapp/Catalog", {
            id: t,
            p: this.data.p,
            pnum: this.data.pnum,
            positive: this.data.positive
        }, "", function(t) {
            console.log("列表", t);
            var a = e.data.datum;
            a = 1 == e.data.p ? t.data || [] : a.concat(t.data || []), e.setData({
                datum: a,
                total: t.total,
                ismore: a.length != e.data.total
            });
        }, this) : _function.hint(1, "没有更多啦^_^!", 2e3, function(t) {});
    },
    pay: function() {
        _function.hint(2, "更多内容请先购买后继续阅览哦^_^!", "温馨提示！", function(t) {});
    },
    index: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    }
});