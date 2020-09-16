var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        datum: [],
        userInfo: [],
        sid: 0,
        total: 0,
        displayorder: 0,
        scrollTop: 0,
        floorstatus: !1
    },
    onLoad: function(t) {
        _function.system(this), wx.setNavigationBarTitle({
            title: t.name
        });
        var e = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: e,
            sid: t.sid,
            total: t.total,
            displayorder: t.displayorder
        }), this.getDatum(t.displayorder, t.sid);
    },
    onPullDownRefresh: function() {
        this.setData({
            datum: []
        }), this.getDatum(this.data.displayorder, this.data.sid), wx.stopPullDownRefresh();
    },
    goTop: function(t) {
        console.log(this.data.scrollTop), this.setData({
            scrollTop: 0
        });
    },
    scroll: function(t) {
        console.log(t.detail.scrollTop), 2 < t.detail.scrollTop ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },
    getDatum: function(e, t) {
        var a = this;
        _function.request("entry/wxapp/Serialize", {
            openid: this.data.userInfo.openid,
            displayorder: e,
            sid: t
        }, "", function(t) {
            0 < t.member || t.mypay || parseInt(e) <= parseInt(t.free_chapter) ? (t.data.content && WxParse.wxParse("content", "html", t.data.content, a), 
            a.setData({
                datum: t.data
            })) : _function.hint(3, "更多内容请先购买后继续阅览哦^_^!", "温馨提示！", function(t) {});
        }, this);
    },
    section: function(t) {
        var e = t.currentTarget.dataset.displayorder;
        e = 0 != e ? parseInt(this.data.displayorder) + 1 : parseInt(this.data.displayorder) - 1, 
        this.setData({
            displayorder: e,
            scrollTop: 0
        }), this.getDatum(e, this.data.sid);
    },
    linkto: function() {
        var t = wx.getStorageSync("free_chapter"), e = wx.getStorageSync("member"), a = wx.getStorageSync("mypay");
        wx.reLaunch({
            url: "../Catalog/Catalog?id=" + this.data.sid + "&free_chapter=" + t + "&member=" + e + "&mypay=" + a
        });
    }
});