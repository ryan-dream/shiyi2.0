var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        datum: [],
        total: 0,
        userInfo: [],
        types: 0,
        ismore: !0,
        p: 1,
        pnum: 6,
        art_edit_way: !1,
        tp: "",
        aid: "",
        pcart: ""
    },
    onLoad: function(t) {
        _function.system(this), 1 == t.types ? wx.setNavigationBarTitle({
            title: "我的文章"
        }) : 2 == t.types ? wx.setNavigationBarTitle({
            title: "已购买文章"
        }) : 3 == t.types && wx.setNavigationBarTitle({
            title: "我的收藏"
        });
        var a = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: a,
            types: t.types
        }), this.getDatum();
    },
    getDatum: function() {
        var e = this;
        1 == this.data.ismore ? _function.request("entry/wxapp/UserArticle", {
            p: this.data.p,
            pnum: this.data.pnum,
            types: this.data.types,
            openid: this.data.userInfo.openid,
            author_id: this.data.userInfo.author
        }, "", function(t) {
            var a = e.data.datum;
            a = 1 == e.data.p ? t.data || [] : a.concat(t.data || []), e.setData({
                datum: a,
                total: t.total,
                ismore: a.length != e.data.total,
                pcart: t.pcart
            });
        }, this) : _function.hint(1, "没有更多啦^_^!", 2e3, function(t) {});
    },
    detail: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.url;
        null == t.currentTarget.dataset.title ? _function.request("entry/wxapp/Judge", {
            uid: this.data.userInfo.id,
            id: a
        }, "", function(t) {
            0 == t ? _function.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}) : wx.navigateTo({
                url: e + "?id=" + a
            });
        }, this) : wx.navigateTo({
            url: "../../newcms/column/column?id=" + a
        });
    },
    onReachBottom: function() {
        this.setData({
            p: parseInt(this.data.p) + 1
        }), this.getDatum();
    },
    onPullDownRefresh: function() {
        _function.system(this), 1 == this.data.types ? wx.setNavigationBarTitle({
            title: "我的文章"
        }) : 2 == this.data.types ? wx.setNavigationBarTitle({
            title: "已购买文章"
        }) : 3 == this.data.types && wx.setNavigationBarTitle({
            title: "我的收藏"
        }), this.getDatum(), wx.stopPullDownRefresh();
    },
    linkto: function(t) {
        wx.navigateTo({
            url: "../user_publish/index?id=" + t.currentTarget.dataset.id
        });
    },
    editArt: function(t) {
        wx.navigateTo({
            url: "../user_publish/index?id=" + t
        });
    },
    artEditWay: function(t) {
        var a = this, e = t.currentTarget.dataset.canpc, i = t.currentTarget.dataset.types, n = t.currentTarget.dataset.id;
        "open" == t.currentTarget.dataset.way ? 1 == i ? 1 == e ? a.setData({
            tp: 1,
            art_edit_way: !0,
            aid: n
        }) : a.setData({
            tp: 2,
            art_edit_way: !0,
            aid: n
        }) : a.setData({
            tp: "",
            art_edit_way: !0,
            aid: n
        }) : "close" == t.currentTarget.dataset.way && a.setData({
            art_edit_way: !1,
            aid: "",
            tp: ""
        });
    },
    artEditWayTrue: function(t) {
        var e = this, a = t.currentTarget.id;
        setTimeout(function() {
            e.setData({
                art_edit_way: !1
            }), "pc" == a ? (wx.showLoading({
                title: "链接生成..."
            }), _function.request("entry/wxapp/getPcArtUrl", {
                aid: e.data.aid
            }, "", function(t) {
                if (1 == t.code) {
                    var a = t.goUrl;
                    wx.showModal({
                        title: "【复制链接，在PC端发布】",
                        content: a,
                        confirmText: "复制",
                        success: function(t) {
                            if (t.confirm) e.copyZy(a); else if (t.cancel) return !1;
                        },
                        fail: function(t) {
                            return !1;
                        }
                    });
                } else wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2500
                });
            }, this)) : "mob" == a ? e.editArt(e.data.aid) : wx.showToast({
                title: "非法操作",
                icon: "none",
                duration: 800
            });
        }, 130);
    },
    copyZy: function(t) {
        var a = t;
        wx.setClipboardData({
            data: a,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {},
                    fail: function(t) {
                        wx.showToast({
                            title: "出错了!",
                            icon: "none",
                            duration: 1200
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "出错了!",
                    icon: "none",
                    duration: 1200
                });
            }
        });
    }
});