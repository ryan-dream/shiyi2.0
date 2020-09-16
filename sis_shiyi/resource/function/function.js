var app = getApp(), util = require("../js/util.js");

module.exports = {
    request: function(t, e) {
        var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0, a = arguments[3], s = (arguments[4], 
        5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : "GET");
        app.util.request({
            url: t,
            method: s,
            data: e,
            cachetime: o,
            success: function(t) {
                a(t.data.data);
            },
            fail: function(e) {
                "1" == e.data.errno ? a(wx.showToast({
                    title: e.data.message,
                    icon: "success",
                    duration: 3e3
                })) : "2" == e.data.errno ? a(wx.showModal({
                    title: "提示",
                    content: e.data.message,
                    success: function(t) {
                        e.confirm ? wx.navigateBack() : e.cancel;
                    }
                })) : a(wx.showModal({
                    title: "提示",
                    content: e.data.message,
                    success: function(t) {}
                }));
            }
        });
    },
    getUserinfo: function(o) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "", e = wx.getStorageSync("userInfo");
        e ? 1 == t ? module.exports.request("entry/wxapp/GetUserInfoOne", {
            openid: e.openid
        }, "", function(t) {
            if (0 != t) return wx.setStorageSync("userInfo", t), o.setData({
                userInfo: t
            }), !1;
            module.exports.jump(1, "/sis_shiyi/pages/user/tips-info/index");
        }, this) : (wx.setStorageSync("userInfo", e), o.setData({
            userInfo: e
        })) : wx.login({
            success: function(t) {
                var e = this;
                t.code ? module.exports.request("entry/wxapp/GetSessionkey", {
                    code: t.code
                }, "", function(t) {
                    t && module.exports.request("entry/wxapp/GetUserInfoOne", {
                        openid: t.openid
                    }, "", function(t) {
                        if (0 != t) return wx.setStorageSync("userInfo", t), o.setData({
                            userInfo: t
                        }), !1;
                        module.exports.jump(1, "/sis_shiyi/pages/user/tips-info/index");
                    }, e);
                }, this) : callback(wx.showModal({
                    title: "提示",
                    content: t.data.message
                }));
            }
        });
    },
    hint: function(t, e, o, a) {
        1 == t ? wx.showToast({
            title: e,
            icon: "none",
            duration: o
        }) : a(2 == t ? wx.showModal({
            title: o,
            content: e,
            success: function(t) {
                t.confirm ? wx.navigateBack() : t.cancel && wx.navigateBack();
            }
        }) : wx.showModal({
            title: o,
            content: e,
            success: function(t) {
                console.log(t);
            }
        }));
    },
    jump: function(t, e) {
        1 == t ? wx.navigateTo({
            url: e
        }) : 2 == t ? wx.redirectTo({
            url: e
        }) : 3 == t ? wx.switchTab({
            url: e
        }) : 4 == t ? wx.reLaunch({
            url: e
        }) : 5 == t && wx.navigateBack({
            delta: e
        });
    },
    system: function(e) {
        var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
        module.exports.request("entry/wxapp/System", "", "", function(t) {
            e.setData({
                color: t.color
            }), wx.setNavigationBarColor({
                frontColor: t.frontColor,
                backgroundColor: t.topBackcolor
            }), wx.setStorageSync("title", t.title), wx.setStorageSync("share_title", t.share_title), 
            1 == o && wx.setNavigationBarTitle({
                title: t.title
            }), wx.setStorageSync("tabbar", t.tabbar), e.setData({
                tabbar: t.tabbar,
                tabbarcolor: t.tabbarcolor,
                textcolor: t.textcolor
            });
        }, e);
    },
    uploadImage: function(e) {
        var o = this, a = e.i ? e.i : 0, s = e.success ? e.success : 0, n = e.fail ? e.fail : 0, i = e.formData;
        if (i.orderTwo = a, null != e.path[a]) {
            var t = e.path[a].indexOf("images");
            console.log("data.path[i]", e.path[a]), -1 == t ? wx.uploadFile({
                url: e.url,
                filePath: e.path[a],
                name: "file",
                formData: i,
                success: function(t) {
                    s++;
                },
                fail: function(t) {
                    n++;
                },
                complete: function(t) {
                    console.log("res", t), a++, console.log("有更新请求"), a >= e.path.length ? console.log("成功：" + s, "失败：" + n) : (e.i = a, 
                    e.success = s, e.fail = n, o.uploadImage(e));
                }
            }) : (i.path = e.path[a], console.log(i), this.request("entry/wxapp/PublishUploads", i, "", function(t) {
                delete i.path, console.log(i), a++, console.log("无更新请求"), a >= e.path.length || (e.i = a, 
                e.success = s, e.fail = n, o.uploadImage(e));
            }, this));
        }
    },
    getMobleInfo: function() {
        wx.getSystemInfo({
            success: function(t) {
                var e = t.system.substr(0, 3).toLocaleLowerCase();
                app.globalData.MobileSystem = "ios" == e ? 1 : 0;
            },
            fail: function(t) {
                app.globalData.MobileSystem = 1;
            }
        });
    }
};