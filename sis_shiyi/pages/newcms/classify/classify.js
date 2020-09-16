var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        nav: [],
        title: ""
    },
    onLoad: function(e) {
        _function.system(this), this.getDatum();
    },
    onPullDownRefresh: function() {
        this.getDatum(), wx.stopPullDownRefresh();
    },
    getDatum: function(e, t) {
        var r = this;
        _function.request("entry/wxapp/Classify", {}, "", function(e) {
            r.setData({
                nav: e
            });
        }, this);
    },
    active: function(e) {
        var t = e.currentTarget.dataset.type, r = e.currentTarget.dataset.id;
        if (1 == t) var s = "pid=" + r; else s = "cid=" + r;
        wx.navigateTo({
            url: "../search/index?type=2&" + s
        });
    }
});