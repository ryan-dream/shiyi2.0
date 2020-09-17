var t = getApp(), e = (require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js"), require("../../../resource/function/function.js"));

Page({
    data: {
        cardCur: 0,
        cardCur1: 0,
        datum: [],
        uid: 0,
        tk: !1,
        title: "",
        is_pay: !1,
        nav: [],
        music: 0,
        wxapp_article_newtitle: "",
        wxapp_article_hottitle: "",
        wxapp_serialize_newtitle: "",
        ios: ""
    },
    onLoad: function(a) {
        console.log("--e---index---:", a), e.getMobleInfo(), this.setData({
            ios: t.globalData.MobileSystem
        }), e.system(this, 1);
        var i = decodeURIComponent(a.scene);
        if (console.log("scene: ", i), -1 != i.indexOf("&")) {
            var r = i.split("&");
            wx.setStorageSync("fxid", r[0]), wx.setStorageSync("fx_pay_type", "scene"), wx.reLaunch({
                url: "/sis_shiyi/pages/newcms/detail/index?id=" + r[1] + "&fxid=" + r[0] + "&fxtype=fx"
            });
        }
        "undefined" != i ? (wx.setStorageSync("fxid", i), wx.setStorageSync("fx_pay_type", "scene")) : a.fxid && a.fxtype && (wx.setStorageSync("fxid", a.fxid), 
        wx.setStorageSync("fx_pay_type", "share")), this.getDatum();
        var s = wx.getStorageSync("music");
        this.setData({
            music: s
        });
    },
    onPullDownRefresh: function() {
        this.getDatum(), wx.stopPullDownRefresh();
    },
    getDatum: function() {
        var a = this;
        e.request("entry/wxapp/Index", {}, "", function(e) {
            if (t.globalData.msgsh = e.modules.msgsh, t.globalData.artsh = e.modules.artsh, 
            t.globalData.vipCon = e.modules.vipCon, console.log(e), a.setData({
                datum: e
            }), e.modules) {
                wx.setStorageSync("is_pay", e.modules.is_pay);
                var i = wx.getStorageSync("is_pay");
                a.setData({
                    is_pay: 1 == i
                }), a.setData({
                    wxapp_article_newtitle: e.modules.wxapp_article_newtitle
                }), a.setData({
                    wxapp_article_hottitle: e.modules.wxapp_article_hottitle
                }), a.setData({
                    wxapp_serialize_newtitle: e.modules.wxapp_serialize_newtitle
                });
            }
        }, this, "POST");
    },
    swiper: function(t) {
        var a = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.urlone.indexOf("http");
        if (a) return wx.navigateToMiniProgram({
            appId: a,
            path: t.currentTarget.dataset.url
        }), !1;
        wx.getStorageSync("userInfo") || e.getUserinfo(this), -1 == i ? wx.navigateTo({
            url: t.currentTarget.dataset.urlone
        }) : wx.navigateTo({
            url: "../outside/index?url=" + t.currentTarget.dataset.urlone
        });
    },
    detail: function(t) {
        var a = t.currentTarget.dataset.id, i = t.currentTarget.dataset.authorid, r = t.currentTarget.dataset.url, s = t.currentTarget.dataset.type;
        "music" == s && (a = wx.getStorageSync("music"));
        var n = wx.getStorageSync("userInfo");
        n ? (this.setData({
            uid: n.id
        }), this.detailTwo(a, r, s, n.id, i)) : e.getUserinfo(this);
    },
    detailTwo: function(t, a, i, r, s) {
        if (2 == i) wx.navigateTo({
            url: a + "?id=" + t
        }); else {
            var n = wx.getStorageSync("userInfo");
            e.request("entry/wxapp/Judge", {
                uid: r,
                id: t
            }, "", function(i) {
                0 == i && n.author != s ? e.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}) : wx.navigateTo({
                    url: a + "?id=" + t
                });
            }, this);
        }
    },
    more: function(t) {
        var a = t.currentTarget.dataset.types, i = t.currentTarget.dataset.url, r = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.path, n = wx.getStorageSync("userInfo");
        if (r) return wx.navigateToMiniProgram({
            appId: r,
            path: s,
            success: function(t) {
                console.log("打开成功");
            }
        }), !1;
        n ? i || r ? wx.navigateTo({
            url: i
        }) : wx.navigateTo({
            url: "../art_list/index?types=" + a
        }) : e.getUserinfo(this);
    },
    formSubmit: function(t) {
        var a = t.detail.value.title;
        if ("" == a) return e.hint(3, "请输入关键词^_^!", "温馨提示", function(t) {}), !1;
        wx.navigateTo({
            url: "../search/index?title=" + a + "&type=1"
        }), this.setData({
            title: ""
        });
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("share_title");
        return 0 != this.data.uid ? {
            title: t,
            path: "sis_shiyi/pages/newcms/index/index?fxid=" + this.data.uid + "&fxtype=fx"
        } : {
            title: t,
            path: "sis_shiyi/pages/newcms/index/index"
        };
    },
    DotStyle: function(t) {
        this.setData({
            DotStyle: t.detail.value
        });
    },
    cardSwiper: function(t) {
        this.setData({
            cardCur: t.detail.current
        });
    }
});