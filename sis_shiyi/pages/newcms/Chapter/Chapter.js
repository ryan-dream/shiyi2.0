getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore");

var t = require("../../../resource/wxParse/wxParse.js"), e = require("../../../resource/function/function.js");

Page({
    data: {
        articleHidden: !0,
        contentHidden: !1,
        datum: [],
        userInfo: [],
        sid: 0,
        total: 0,
        displayorder: 0,
        scrollTop: 0,
        floorstatus: !1
    },
    onLoad: function(t) {
        e.system(this), wx.setNavigationBarTitle({
            title: t.name
        });
        var a = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: a,
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
    showContent: function() {
        this.setData({
            articleHidden: !0,
            contentHidden: !1
        });
    },
    showArticle: function() {
        this.setData({
            articleHidden: !1,
            contentHidden: !0
        });
    },
    getDatum: function(a, s) {
        var r = this;
        e.request("entry/wxapp/Serialize", {
            openid: this.data.userInfo.openid,
            displayorder: a,
            sid: s
        }, "", function(s) {
            0 < s.member || s.mypay || parseInt(a) <= parseInt(s.free_chapter) ? (s.data.explain2 && t.wxParse("explain2", "html", s.data.explain2, r), 
            s.data.content && t.wxParse("content", "html", s.data.content, r), r.setData({
                datum: s.data
            })) : e.hint(3, "更多内容请先购买后继续阅览哦^_^!", "温馨提示！", function(t) {});
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