var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad: function(e) {
        _function.system(this);
    },
    getUserInfo: function(e) {
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? wx.login({
                    success: function(e) {
                        e.code && _function.request("entry/wxapp/GetSessionkey", {
                            code: e.code
                        }, "", function(t) {
                            t && wx.getUserInfo({
                                withCredentials: !0,
                                success: function(e) {
                                    var n = this;
                                    _function.request("entry/wxapp/GetUserInfo", {
                                        session_key: t.session_key,
                                        encryptedData: e.encryptedData,
                                        iv: e.iv
                                    }, "", function(e) {
                                        _function.request("entry/wxapp/GetUserInfoInto", {
                                            openId: e.openId,
                                            nickName: e.nickName,
                                            avatarUrl: e.avatarUrl,
                                            gender: e.gender,
                                            unionId: e.unionId
                                        }, "", function(e) {
                                            wx.setStorageSync("userInfo", e), wx.navigateBack();
                                        }, n);
                                    }, this);
                                }
                            });
                        }, this);
                    }
                }) : _function.jump(4, "/sis_shiyi/pages/newcms/index/index");
            }
        });
    }
});