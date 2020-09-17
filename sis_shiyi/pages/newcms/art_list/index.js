getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var t = require("../../../resource/function/function.js");

Page({
    data: {
        datum: [],
        userInfo: [],
        nav: [],
        cid: {},
        select_cid: "",
        types: 0,
        stypes: 0,
        ssearch: 0,
        p: 1,
        pnum: 6,
        ismore: !0,
        total: "",
        tk: !1,
        hint: "",
        title: "",
        is_pay: !1,
        author_id: 0
    },
    onLoad: function(a) {
        t.system(this), a.fxid && a.fxtype && (wx.setStorageSync("fxid", a.fxid), t.request("entry/wxapp/Judge", {
            uid: this.data.userInfo.id,
            id: a.id
        }, "", function(a) {
            if (0 == a) return t.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}), wx.redirectTo({
                url: "sis_shiyi/pages/newcms/index/index"
            }), !1;
        }, this));
        var s = a.types;
        this.setData({
            types: s,
            stypes: s,
            datum: [],
            p: 1,
            total: "",
            ismore: !0,
            author_id: a.author
        });
        var e = wx.getStorageSync("is_pay");
        this.setData({
            is_pay: 1 == e
        });
        var i = wx.getStorageSync("userInfo");
        if (i) if (this.setData({
            userInfo: i
        }), 6 == s) {
            var d = a.cid;
            this.setData({
                select_cid: d
            }), this.search(s, d);
        } else this.getDatum(s, 1); else t.getUserinfo(this);
    },
    onPullDownRefresh: function() {
        this.setData({
            datum: [],
            p: 1,
            ismore: !0
        }), 0 == Object.keys(this.data.cid).length ? this.getDatum(this.data.types, 2) : this.search(7, this.data.cid), 
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.setData({
            p: parseInt(this.data.p) + 1
        });
        var t = this.data.types, a = this.data.ssearch;
        "" != this.data.select_cid ? this.search(this.data.types, this.data.select_cid) : this.data.title ? this.searchTitle() : 1 == t || 2 == t && 0 == a || 3 == t || 4 == t || 5 == t && 0 == a || 6 == t ? this.getDatum(this.data.types, 2) : 0 == Object.keys(this.data.cid).length ? this.getDatum(this.data.types, 2) : this.search(7, this.data.cid);
    },
    author: function() {
        var a = this;
        t.request("entry/wxapp/Author_Article", {
            p: this.data.p,
            pnum: this.data.pnum,
            id: this.data.author_id
        }, "", function(t) {
            a.setData({
                datum: t.data,
                nav: t.category,
                total: t.total,
                ismore: t.data.length != a.data.total
            });
        }, this);
    },
    getDatum: function(a, s) {
        var e = this;
        1 == this.data.ismore && (1 == s ? t.request("entry/wxapp/Nav", {
            p: this.data.p,
            pnum: this.data.pnum,
            types: a,
            times: s,
            author_id: this.data.author_id
        }, "", function(t) {
            e.setData({
                datum: t.data,
                nav: t.category,
                total: t.total,
                ismore: t.data.length != e.data.total
            });
        }, this) : t.request("entry/wxapp/Nav", {
            p: this.data.p,
            pnum: this.data.pnum,
            types: a,
            times: s,
            author_id: this.data.author_id
        }, "", function(t) {
            var a = e.data.datum;
            a = 1 == e.data.p ? t.data || [] : a.concat(t.data || []), e.setData({
                datum: a,
                total: t.total,
                ismore: !(a.length >= e.data.total)
            });
        }, this));
    },
    detail: function(a) {
        var s = a.currentTarget.dataset.id, e = a.currentTarget.dataset.url;
        1 == a.currentTarget.dataset.type ? t.request("entry/wxapp/Judge", {
            uid: this.data.userInfo.id,
            id: s
        }, "", function(a) {
            0 == a ? t.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}) : wx.navigateTo({
                url: e + "?id=" + s
            });
        }, this) : wx.navigateTo({
            url: e + "?id=" + s
        });
    },
    tk: function(t) {
        this.setData({
            tk: !this.data.tk,
            p: 1,
            ismore: !0,
            total: 0
        });
    },
    search: function(a, s) {
        var e = this;
        if (this.setData({
            tk: !1,
            types: a
        }), 2 == this.data.stypes || 5 == this.data.stypes ? this.setData({
            types: this.data.stypes,
            ssearch: this.data.stypes
        }) : 6 != a && this.setData({
            types: 7
        }), 0 == Object.keys(this.data.cid).length && 6 != this.data.types) return !1;
        1 == this.data.p && this.setData({
            datum: []
        }), 1 == this.data.ismore && (6 != a ? t.request("entry/wxapp/NavSearch", {
            p: this.data.p,
            pnum: this.data.pnum,
            cid: this.data.cid,
            types: 7,
            stypes: this.data.stypes
        }, "", function(t) {
            var a = e.data.datum;
            a = 1 == e.data.p ? t.data || [] : a.concat(t.data || []), e.setData({
                datum: a,
                hint: "此分类暂无内容！",
                nav: t.category,
                total: t.total,
                ismore: a.length != e.data.total
            });
        }, this) : t.request("entry/wxapp/NavSearch", {
            p: this.data.p,
            pnum: this.data.pnum,
            cid: s,
            types: a
        }, "", function(t) {
            var a = e.data.datum;
            a = 1 == e.data.p ? t.data || [] : a.concat(t.data || []), e.setData({
                datum: a,
                nav: t.category,
                total: t.total,
                ismore: a.length != e.data.total
            });
        }, this));
    },
    formSubmit: function(a) {
        var s = a.detail.value.title;
        if (this.setData({
            p: 1,
            ismore: !0,
            total: 0,
            datum: [],
            title: s
        }), "" == s) return t.hint(3, "请输入正确的内容^_^!", "温馨提示", function(t) {}), !1;
        this.searchTitle();
    },
    searchTitle: function(a) {
        var s = this;
        1 == this.data.ismore && t.request("entry/wxapp/SearchTitle", {
            p: this.data.p,
            pnum: this.data.pnum,
            title: this.data.title,
            cid: this.data.cid,
            types: this.data.stypes,
            author_id: this.data.author_id
        }, "", function(t) {
            var a = s.data.datum;
            a = 1 == s.data.p ? t.data || [] : a.concat(t.data || []), s.setData({
                datum: a,
                nav: t.category,
                hint: "此分类下搜索无该文章^_^!",
                total: t.total,
                ismore: a.length != s.data.total
            });
        }, this);
    },
    unset: function(t) {
        this.setData({
            cid: {}
        });
    },
    index: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("share_title");
        return this.data.userInfo.id ? {
            title: t,
            path: "sis_shiyi/pages/newcms/art_list/index?id=" + this.data.id + "&fxid=" + this.data.userInfo.id + "&fxtype=fx"
        } : {
            title: t,
            path: "sis_shiyi/pages/newcms/art_list/index?id=" + this.data.id
        };
    }
});