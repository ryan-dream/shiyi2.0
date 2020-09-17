getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var e = require("../../../resource/function/function.js");

Page({
    data: {
        nav: [],
        title: ""
    },
    onLoad: function(t) {
        e.system(this), this.getDatum();
    },
    onPullDownRefresh: function() {
        this.getDatum(), wx.stopPullDownRefresh();
    },
    getDatum: function(t, r) {
        var s = this;
        e.request("entry/wxapp/Classify", {}, "", function(e) {
            s.setData({
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