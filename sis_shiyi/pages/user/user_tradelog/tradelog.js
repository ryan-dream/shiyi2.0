var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        data: [],
        userInfo: [],
        p: 1,
        pnum: 10,
        total: 0,
        ismore: !0
    },
    onLoad: function(t) {
        _function.system(this);
        var a = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: a
        }), this.setData({
            p: 1,
            data: []
        }), this.getIndex();
    },
    onPullDownRefresh: function() {
        this.setData({
            p: 1,
            data: [],
            ismore: !0
        }), this.getIndex(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.setData({
            p: parseInt(this.data.p) + 1
        }), this.getIndex();
    },
    getIndex: function(t, a) {
        var e = this;
        1 == this.data.ismore && _function.request("entry/wxapp/Invite", {
            uid: this.data.userInfo.id,
            p: this.data.p,
            pnum: this.data.pnum
        }, "", function(t) {
            var a = e.data.data;
            a = 1 == e.data.p ? t.data || [] : a.concat(t.data || []), e.setData({
                data: a,
                total: t.total,
                ismore: a.length != e.data.total
            });
        }, this);
    }
});