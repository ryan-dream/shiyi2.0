getApp(), require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js");

var e = require("../../../resource/function/function.js");

Page({
    data: {
        url: ""
    },
    onLoad: function(r) {
        e.system(this), r.fxid && r.fxtype && wx.setStorageSync("fxid", r.fxid), this.setData({
            url: r.url
        });
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("share_title"),
            path: "sis_shiyi/pages/newcms/index/index?fxid=" + this.data.userInfo.id + "&fxtype=fx"
        };
    }
});