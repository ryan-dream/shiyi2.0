var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        url: ""
    },
    onLoad: function(e) {
        _function.system(this), e.fxid && e.fxtype && wx.setStorageSync("fxid", e.fxid), 
        this.setData({
            url: e.url
        });
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("share_title"),
            path: "sis_shiyi/pages/newcms/index/index?fxid=" + this.data.userInfo.id + "&fxtype=fx"
        };
    }
});