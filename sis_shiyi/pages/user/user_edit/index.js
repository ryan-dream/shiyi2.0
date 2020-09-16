var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        userInfo: {},
        imgsave: ""
    },
    onLoad: function() {
        _function.system(this);
        var e = wx.getStorageSync("userInfo");
        e ? this.setData({
            userInfo: e
        }) : (_function.getUserinfo(this), this.setData({
            userInfo: wx.getStorageSync("userInfo")
        }));
    },
    onChooseImageTap: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var o = e.tempFilePaths;
                t.setData({
                    imgsave: o[0]
                }), console.log(o[0]), t.upload();
            }
        });
    },
    upload: function() {
        var e = app.util.url("entry/wxapp/Uploads");
        e += "m=sis_shiyi", console.log(e), wx.uploadFile({
            url: e,
            filePath: this.data.imgsave,
            name: "file",
            formData: {
                id: this.data.userInfo.id
            },
            success: function(e) {
                console.log(e);
                e.data;
            },
            fail: function(e) {
                console.log(e);
                e.data;
            }
        });
    },
    formSubmit: function(e) {
        var o = e.detail.value;
        _function.request("entry/wxapp/SavaUserInfo", {
            realname: o.realname,
            sex: o.sex,
            mobile: o.mobile,
            desc: o.desc,
            id: this.data.userInfo.id,
            Alipay: o.Alipay
        }, "300", function(e) {
            400 != e ? _function.hint(2, "用户信息更新成功！", "温馨提示", function(e) {
                wx.setStorageSync("userInfo", e);
            }) : _function.hint(2, "用户信息更新失败！", "温馨提示", function(e) {});
        }, this);
    },
    onPullDownRefresh: function() {
        var o = this;
        _function.getUserinfo(this, "300", function(e) {
            o.setData({
                userInfo: e
            }), wx.setStorageSync("userInfo", e), wx.stopPullDownRefresh();
        }, this);
    }
});