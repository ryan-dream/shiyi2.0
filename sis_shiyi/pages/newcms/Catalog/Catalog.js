getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var t = require("../../../resource/function/function.js");

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
    onLoad: function(a) {
        if (console.log(a), t.system(this), wx.setNavigationBarTitle({
            title: a.name
        }), 2 == a.ser_type) {
            var e = wx.getStorageSync("userInfo");
            e ? this.setData({
                userInfo: e
            }) : t.getUserinfo(this);
        }
        this.setData({
            id: a.id,
            free_chapter: a.free_chapter - 1,
            member: a.member,
            mypay: a.mypay,
            name: a.name
        }), wx.setStorageSync("free_chapter", a.free_chapter), wx.setStorageSync("member", a.member), 
        wx.setStorageSync("mypay", a.mypay), this.getDatum(a.id);
    },
    onPullDownRefresh: function() {
        this.setData({
            datum: [],
            p: 1,
            ismore: !0
        }), this.getDatum(this.data.id), wx.stopPullDownRefresh();
    },
    inverted: function() {
        var a = this;
        this.setData({
            positive: "正序" == this.data.positive ? "倒叙" : "正序"
        }), t.request("entry/wxapp/Catalog", {
            id: this.data.id,
            p: this.data.p,
            pnum: this.data.pnum,
            positive: this.data.positive
        }, "", function(t) {
            var e = a.data.datum;
            e = 1 == a.data.p ? t.data || [] : e.concat(t.data || []), a.setData({
                datum: e,
                total: t.total,
                ismore: e.length != a.data.total
            });
        }, this);
    },
    onReachBottom: function() {
        this.setData({
            p: parseInt(this.data.p) + 1
        }), this.getDatum(this.data.id);
    },
    getDatum: function(a) {
        var e = this;
        1 == this.data.ismore ? t.request("entry/wxapp/Catalog", {
            id: a,
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
        }, this) : t.hint(1, "没有更多啦^_^!", 2e3, function(t) {});
    },
    pay: function() {
        t.hint(2, "更多内容请先购买后继续阅览哦^_^!", "温馨提示！", function(t) {});
    },
    index: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    }
});