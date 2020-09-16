var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        userInfo: [],
        datum: [],
        attachurl: "",
        img: "",
        show: 0
    },
    onLoad: function() {
        _function.system(this);
        var t = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: t
        }), this.getDatum();
    },
    getDatum: function() {
        var e = this;
        _function.request("entry/wxapp/UserIndex", {
            types: 4,
            uid: this.data.userInfo.id
        }, "", function(t) {
            e.setData({
                datum: t.data,
                attachurl: t.attachurl,
                show: t.data[0].ps_id,
                img: t.data[0].bg
            });
        }, this);
    },
    fximg: function(e) {
        var a = this;
        console.log(e), _function.request("entry/wxapp/UserIndex", {
            types: 5,
            uid: this.data.userInfo.id,
            ps_id: e.currentTarget.dataset.id
        }, "", function(t) {
            a.setData({
                img: t,
                show: e.currentTarget.dataset.id
            });
        }, this);
    },
    Image: function(t) {
        wx.previewImage({
            current: this.data.img,
            urls: [ this.data.img ]
        });
    },
    tradelog: function() {
        wx.navigateTo({
            url: "../user_tradelog/tradelog"
        });
    },
    onPullDownRefresh: function() {
        _function.system(this), this.getDatum(), wx.stopPullDownRefresh();
    }
});