var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        userInfo: [],
        timestamp: "",
        tk: !1,
        au: !1,
        datum: [],
        money: 0,
        id: 0,
        day: 0,
        au_hint: "",
        is_pay: !1,
        login: 0,
        vipCon: 0,
        convert: 0,
        convertNum: "",
        art_push_way: !1,
        pcart: ""
    },
    onShow: function() {
        _function.system(this);
        var t = wx.getStorageSync("userInfo"), n = (n = (n = "'" + (n = Date.parse(new Date())) + "'").substr(0, 11)).substr(1, 10), e = wx.getStorageSync("is_pay");
        t ? (_function.getUserinfo(this, 1), this.setData({
            login: 0,
            timestamp: n,
            is_pay: 1 == e
        }), this.getDatum()) : this.setData({
            login: 1,
            timestamp: n
        });
        e = wx.getStorageSync("is_pay");
        this.setData({
            is_pay: 1 == e
        });
    },
    getDatum: function() {
        var n = this, t = wx.getStorageSync("userInfo");
        _function.request("entry/wxapp/UserIndex", {
            types: 1,
            uid: t.id,
            duihuan: 1
        }, "", function(t) {
            n.setData({
                datum: t.data,
                vipCon: t.vipCon,
                pcart: t.pcart
            });
        }, this);
    },
    select: function(t) {
        t.currentTarget.dataset.convert ? this.setData({
            money: 0,
            id: 0,
            day: 0,
            convert: 1,
            convertNum: ""
        }) : this.setData({
            money: t.currentTarget.dataset.mo,
            id: t.currentTarget.dataset.id,
            day: t.currentTarget.dataset.day,
            convert: 0,
            convertNum: ""
        });
    },
    tk: function(t) {
        this.setData({
            tk: !this.data.tk,
            money: 0,
            convert: 0,
            convertNum: ""
        });
    },
    au: function(t) {
        var n = this, e = t.detail.formId;
        this.setData({
            au: !this.data.au
        }), this.data.au && _function.request("entry/wxapp/UserIndex", {
            types: 6,
            openid: this.data.userInfo.openid,
            uid: this.data.userInfo.id,
            formId: e
        }, "", function(t) {
            0 == t ? n.setData({
                au_hint: "您已经是作者，无需重复申请，请尝试刷新页面变更身份！"
            }) : 1 == t ? n.setData({
                au_hint: "申请成功！请等待管理员审核通过。"
            }) : 2 == t ? n.setData({
                au_hint: "申请失败！请联系管理员。"
            }) : n.setData({
                au_hint: "您已经提交过申请，请耐心等待管理员审核通过！"
            });
        }, this);
    },
    setConvertNum: function(t) {
        this.setData({
            convertNum: t.detail.value
        });
    },
    pay: function(t) {
        var n = this;
        if (1 == n.data.convert) {
            var e = n.data.userInfo.id;
            _function.request("entry/wxapp/ConvertVIP", {
                uid: e,
                openid: this.data.userInfo.openid,
                convertNum: n.data.convertNum
            }, "", function(t) {
                -1 == t.code ? _function.hint(3, t.message, "温馨提示", function(t) {}) : (n.setData({
                    tk: !n.data.tk
                }), n.onPullDownRefresh());
            });
        } else {
            if (1 == app.globalData.MobileSystem) return _function.hint(3, "请切换至安卓(Android)系统，继续体验该功能", "温馨提示", function(t) {}), 
            !1;
            var a = wx.getStorageSync("fxid");
            0 < this.data.money ? _function.request("entry/wxapp/Pay", {
                id: this.data.id,
                uid: this.data.userInfo.id,
                openid: this.data.userInfo.openid,
                money: this.data.money,
                types: 3,
                day: this.data.day,
                fxid: a
            }, "", function(t) {
                1 == t ? _function.hint(3, "支付金额错误!", "温馨提示", function(t) {}) : 1 == t.state ? wx.requestPayment({
                    timeStamp: t.timeStamp,
                    nonceStr: t.nonceStr,
                    package: t.package,
                    signType: "MD5",
                    paySign: t.paySign,
                    success: function(t) {
                        _function.request("entry/wxapp/GetUserInfoOne", {
                            id: n.data.userInfo.id
                        }, "", function(t) {
                            n.setData({
                                tk: !n.data.tk,
                                userInfo: t
                            }), wx.setStorageSync("userInfo", t);
                        }, this);
                    },
                    fail: function(t) {
                        _function.hint(3, "支付失败^_^!", "网络提示", function(t) {});
                    }
                }) : _function.hint(1, "网络错误！", "", function(t) {});
            }, this) : _function.hint(3, "抱歉，您还没有选择购买类型哦！", "", function(t) {});
        }
    },
    linkto: function(t) {
        var n = t.currentTarget.dataset.url, e = t.currentTarget.dataset.types;
        wx.navigateTo({
            url: n + "?types=" + e
        });
    },
    onPullDownRefresh: function() {
        var n = this;
        _function.system(this), _function.request("entry/wxapp/GetUserInfoOne", {
            openid: this.data.userInfo.openid
        }, "", function(t) {
            n.setData({
                userInfo: t
            }), wx.setStorageSync("userInfo", t);
        }, this), this.getDatum(), wx.stopPullDownRefresh();
    },
    artPushWay: function(t) {
        var n = this;
        1 == n.data.pcart ? n.setData({
            art_push_way: !n.data.art_push_way
        }) : wx.navigateTo({
            url: "../user_publish/index"
        });
    },
    artPushWayTrue: function(t) {
        var e = this, n = t.currentTarget.id;
        setTimeout(function() {
            e.artPushWay(), "pc" == n ? (wx.showLoading({
                title: "链接生成..."
            }), _function.request("entry/wxapp/getPcArtUrl", {
                aid: "",
                uid: e.data.userInfo.id,
                author_id: e.data.userInfo.author
            }, "", function(t) {
                if (wx.hideLoading(), 1 == t.code) {
                    var n = t.goUrl;
                    wx.showModal({
                        title: "【复制链接，在PC端发布】",
                        content: n,
                        confirmText: "复制",
                        success: function(t) {
                            if (t.confirm) e.copyZy(n); else if (t.cancel) return !1;
                        },
                        fail: function(t) {
                            return !1;
                        }
                    });
                } else wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2500
                });
            }, this)) : "mob" == n ? wx.navigateTo({
                url: "../user_publish/index"
            }) : wx.showToast({
                title: "非法操作",
                icon: "none",
                duration: 800
            });
        }, 130);
    },
    copyZy: function(t) {
        var n = t;
        wx.setClipboardData({
            data: n,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {},
                    fail: function(t) {
                        wx.showToast({
                            title: "出错了!",
                            icon: "none",
                            duration: 1200
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "出错了!",
                    icon: "none",
                    duration: 1200
                });
            }
        });
    }
});