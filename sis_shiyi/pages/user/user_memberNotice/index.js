var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        datum: "",
        title: ""
    },
    onLoad: function() {
        var t = this;
        _function.system(this), _function.request("entry/wxapp/UserIndex", {
            types: 2
        }, "", function(e) {
            e.center_intro && WxParse.wxParse("content", "html", e.center_intro, t), t.setData({
                datum: e.center_intro,
                title: e.dg_article_title
            });
        }, this);
    },
    onPullDownRefresh: function() {
        var t = this;
        _function.system(""), _function.request("entry/wxapp/UserIndex", {
            types: 2
        }, "", function(e) {
            e.article.content && WxParse.wxParse("content", "html", e.center_intro, t), t.setData({
                datum: e.center_intro
            }), wx.stopPullDownRefresh();
        }, this);
    }
});