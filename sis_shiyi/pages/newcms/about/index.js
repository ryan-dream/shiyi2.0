getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var t = require("../../../resource/function/function.js");

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
    onLoad: function(a) {
        t.system(this), this.setData({
            types: a.type,
            title: a.title,
            cid: a.cid,
            pid: a.pid
        }), this.getTitle();
        var e = wx.getStorageSync("is_pay");
        this.setData({
            is_pay: 1 == e
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
    getTitle: function(a) {
        var e = this;
        t.request("entry/wxapp/SearchTitleTwo", {
            p: this.data.p,
            pnum: this.data.pnum,
            ps: this.data.ps,
            pnums: this.data.pnums,
            title: this.data.title,
            cid: this.data.cid,
            pid: this.data.pid,
            types: this.data.types
        }, "", function(t) {
            if (console.log(55555, t), 2 != a) {
                var s = e.data.datum_s, i = e.data.datum_a;
                s = 1 == e.data.p ? t.s.data || [] : s.concat(t.s.data || []), i = 1 == e.data.p ? t.a.data || [] : i.concat(t.a.data || []), 
                e.setData({
                    datum_s: s,
                    datum_a: i,
                    nav: t.category,
                    hint: "抱歉，搜索无该文章^_^!",
                    total_s: t.s.total,
                    total_a: t.a.total,
                    loader_a: i.length == t.a.total ? "没有更多啦！" : "",
                    loader_s: s.length == t.s.total ? "没有更多啦！" : ""
                });
            } else e.data.change ? (i = e.data.datum_a, i = 1 == e.data.p ? t.a.data || [] : i.concat(t.a.data || []), 
            e.setData({
                datum_a: i,
                hint: "抱歉，搜索无该文章^_^!",
                total_a: t.a.total,
                loader_a: i.length == t.a.total ? "没有更多啦！" : ""
            })) : (s = e.data.datum_s, s = 1 == e.data.ps ? t.s.data || [] : s.concat(t.s.data || []), 
            e.setData({
                datum_s: s,
                hint: "抱歉，搜索无该文章^_^!",
                total_s: t.s.total,
                loader_s: s.length == t.s.total ? "没有更多啦！" : ""
            }));
        }, this);
    },
    change: function() {
        this.setData({
            change: !this.data.change
        });
    },
    detail: function(a) {
        var e = a.currentTarget.dataset.id, s = a.currentTarget.dataset.url, i = a.currentTarget.dataset.type, d = wx.getStorageSync("userInfo");
        this.setData({
            uid: d.id
        }), d ? this.detailTwo(e, s, i, this.data.uid) : t.getUserinfo(this);
    },
    index: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    detailTwo: function(a, e, s, i) {
        2 == s ? wx.navigateTo({
            url: e + "?id=" + a
        }) : t.request("entry/wxapp/Judge", {
            uid: i,
            id: a
        }, "", function(s) {
            0 == s ? t.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}) : wx.navigateTo({
                url: e + "?id=" + a
            });
        }, this);
    }
});