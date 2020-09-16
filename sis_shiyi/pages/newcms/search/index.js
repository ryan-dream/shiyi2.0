var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        datum_s: [],
        datum_a: [],
        p: 1,
        ps: 1,
        pnum: 6,
        title: "",
        total_s: 0,
        total_a: 0,
        pid: 0,
        cid: 0,
        hint: "努力加载中...",
        loader_s: "",
        loader_a: "",
        change: !0,
        types: 0,
        is_pay: !1
    },
    onLoad: function(t) {
        _function.system(this), this.setData({
            types: t.type,
            title: t.title,
            cid: t.cid,
            pid: t.pid
        }), this.getTitle();
        var a = wx.getStorageSync("is_pay");
        this.setData({
            is_pay: 1 == a
        });
    },
    onPullDownRefresh: function() {
        this.getTitle(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.change ? this.setData({
            p: parseInt(this.data.p) + 1
        }) : this.setData({
            ps: parseInt(this.data.ps) + 1
        }), this.getTitle(2);
    },
    getTitle: function(i) {
        var s = this;
        _function.request("entry/wxapp/SearchTitleTwo", {
            p: this.data.p,
            pnum: this.data.pnum,
            ps: this.data.ps,
            pnums: this.data.pnums,
            title: this.data.title,
            cid: this.data.cid,
            pid: this.data.pid,
            types: this.data.types
        }, "", function(t) {
            if (console.log(55555, t), 2 != i) {
                var a = s.data.datum_s, e = s.data.datum_a;
                a = 1 == s.data.p ? t.s.data || [] : a.concat(t.s.data || []), e = 1 == s.data.p ? t.a.data || [] : e.concat(t.a.data || []), 
                s.setData({
                    datum_s: a,
                    datum_a: e,
                    nav: t.category,
                    hint: "抱歉，搜索无该文章^_^!",
                    total_s: t.s.total,
                    total_a: t.a.total,
                    loader_a: e.length == t.a.total ? "没有更多啦！" : "",
                    loader_s: a.length == t.s.total ? "没有更多啦！" : ""
                });
            } else if (s.data.change) {
                e = s.data.datum_a;
                e = 1 == s.data.p ? t.a.data || [] : e.concat(t.a.data || []), s.setData({
                    datum_a: e,
                    hint: "抱歉，搜索无该文章^_^!",
                    total_a: t.a.total,
                    loader_a: e.length == t.a.total ? "没有更多啦！" : ""
                });
            } else {
                a = s.data.datum_s;
                a = 1 == s.data.ps ? t.s.data || [] : a.concat(t.s.data || []), s.setData({
                    datum_s: a,
                    hint: "抱歉，搜索无该文章^_^!",
                    total_s: t.s.total,
                    loader_s: a.length == t.s.total ? "没有更多啦！" : ""
                });
            }
        }, this);
    },
    change: function() {
        this.setData({
            change: !this.data.change
        });
    },
    detail: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.url, i = t.currentTarget.dataset.type, s = wx.getStorageSync("userInfo");
        this.setData({
            uid: s.id
        }), s ? this.detailTwo(a, e, i, this.data.uid) : _function.getUserinfo(this);
    },
    index: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    detailTwo: function(a, e, t, i) {
        2 == t ? wx.navigateTo({
            url: e + "?id=" + a
        }) : _function.request("entry/wxapp/Judge", {
            uid: i,
            id: a
        }, "", function(t) {
            0 == t ? _function.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}) : wx.navigateTo({
                url: e + "?id=" + a
            });
        }, this);
    }
});