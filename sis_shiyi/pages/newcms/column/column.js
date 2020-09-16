var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        datum: [],
        userInfo: [],
        id: "",
        comment: [],
        p: 1,
        pnum: 10,
        ismore: !0,
        tk: !1,
        free_chapter: 0,
        total: 0,
        mypay: null,
        member: 0,
        collect: 0,
        is_pay: 0,
        serialize_desc_show: !1,
        ios: "",
        serAetList: [],
        lOrd: 2
    },
    onLoad: function(t) {
        _function.system(this), t.fxid && t.fxtype && wx.setStorageSync("fxid", t.fxid);
        var e = wx.getStorageSync("is_pay");
        this.setData({
            id: t.id,
            is_pay: 1 == e,
            ios: app.globalData.MobileSystem
        });
        var a = wx.getStorageSync("userInfo");
        a ? (this.setData({
            userInfo: a
        }), this.getDatum(t.id, 1)) : _function.getUserinfo(this);
    },
    onPullDownRefresh: function() {
        this.setData({
            datum: [],
            p: 1,
            ismore: !0
        }), this.getDatum(this.data.id, 1), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.setData({
            p: parseInt(this.data.p) + 1
        }), console.log(this.data.datum);
        var t = this.data.datum.serialize.ser_type;
        1 == t ? this.getDatum(this.data.id, 2) : 2 == t && this.getSerArtList();
    },
    getDatum: function(t, i) {
        var n = this;
        1 == this.data.ismore && _function.request("entry/wxapp/ColumnDetail", {
            id: t,
            p: this.data.p,
            pnum: this.data.pnum,
            types: i,
            openid: this.data.userInfo.openid
        }, "", function(t) {
            if (console.log("数据", t), 1 == i) n.setData({
                datum: t,
                collect: t.collect,
                member: t.member,
                mypay: t.mypay,
                free_chapter: t.serialize.free_chapter,
                comment: t.comment,
                total: t.total
            }); else {
                var e = n.data.comment;
                e = 1 == n.data.p ? t.comment || [] : e.concat(t.comment || []), n.setData({
                    comment: e,
                    ismore: e.length != n.data.total
                });
            }
            var a = 2 == i ? 1 : t.serialize.ser_type ? t.serialize.ser_type : "";
            console.log("类型", a), 2 == a && (WxParse.wxParse("serialize_desc_2", "html", t.serialize.serialize_desc, n), 
            n.getSerArtList());
        }, this);
    },
    collect: function(t) {
        var e = this, a = t.currentTarget.dataset.types;
        _function.request("entry/wxapp/Zancollect", {
            id: this.data.id,
            openid: this.data.userInfo.openid,
            types: a
        }, "", function(t) {
            5 == a && t ? e.setData({
                collect: 0
            }) : 6 == a && t ? e.setData({
                collect: e.data.id
            }) : _function.hint(1, "网络错误！", 2e3, function(t) {});
        }, this);
    },
    linkto: function(t) {
        var e = t.currentTarget.dataset.mypay ? "&mypay=" + t.currentTarget.dataset.mypay : "", a = t.currentTarget.dataset.url + "?id=" + this.data.id + "&free_chapter=" + this.data.free_chapter + "&member=" + t.currentTarget.dataset.member + e + "&name=" + t.currentTarget.dataset.name;
        wx.navigateTo({
            url: a
        });
    },
    tk: function(t) {
        this.setData({
            tk: !this.data.tk
        });
    },
    formSubmit: function(t) {
        var e = this, a = t.detail.value.content, i = t.detail.formId;
        if ("" == a) return _function.hint(3, "对不起，请输入评论内容^_^!", "温馨提示", function(t) {}), 
        !1;
        _function.request("entry/wxapp/Message", {
            id: this.data.id,
            content: a,
            openid: this.data.userInfo.openid,
            uid: this.data.userInfo.id,
            nickname: this.data.userInfo.nickname,
            avatar: this.data.userInfo.avatar,
            types: 1,
            formId: i
        }, "", function(t) {
            console.log(t), 1 == t ? _function.hint(3, "评论成功^_^!", "温馨提示", function(t) {}) : 4 == t && _function.hint(3, "评论失败^_^!", "温馨提示", function(t) {}), 
            e.setData({
                tk: !e.data.tk
            });
        }, this);
    },
    pay: function(t) {
        var e = this, a = this.data.datum.serialize.serialize_price, i = wx.getStorageSync("fxid");
        _function.request("entry/wxapp/Pay", {
            id: this.data.id,
            author_openid: this.data.datum.serialize.author_openid,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid,
            money: a,
            types: 2,
            fxid: i
        }, "", function(t) {
            console.log(t), 1 == t.state ? wx.requestPayment({
                timeStamp: t.timeStamp,
                nonceStr: t.nonceStr,
                package: t.package,
                signType: "MD5",
                paySign: t.paySign,
                success: function(t) {
                    e.setData({
                        mypay: e.data.id,
                        member: 2
                    }), e.getDatum(e.data.id, 1);
                },
                fail: function(t) {
                    _function.hint(3, "支付失败^_^!", "网络提示", function(t) {});
                }
            }) : _function.hint(1, "网络错误！", "", function(t) {});
        }, this);
    },
    serialize_desc_show: function(t) {
        this.setData({
            serialize_desc_show: !this.data.serialize_desc_show
        });
    },
    index: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("share_title"), e = this.data.datum.serialize.serialize_title;
        return this.data.userInfo.id ? {
            title: t && e ? e : t,
            path: "sis_shiyi/pages/newcms/column/column?id=" + this.data.id + "&fxid=" + this.data.userInfo.id + "&fxtype=fx"
        } : {
            title: t && e ? e : t,
            path: "sis_shiyi/pages/newcms/column/column?id=" + this.data.id
        };
    },
    iosbuy: function() {
        return wx.showModal({
            title: "温馨提示",
            content: "请切换至安卓(Android)系统，继续体验该功能"
        }), !1;
    },
    getSerArtList: function() {
        var a = this, t = {
            p: a.data.p,
            pnum: a.data.pnum,
            serid: a.data.id,
            openid: a.data.userInfo.openid
        };
        _function.request("entry/wxapp/getSerArtListData", t, "", function(t) {
            console.log("文章类专栏列表数据", t);
            var e = a.data.serAetList;
            e = 1 == a.data.p ? t.data || [] : e.concat(t.data || []), a.setData({
                total: t.total,
                serAetList: e,
                ismore: e.length != a.data.total
            });
        }, a);
    },
    listOrDes: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.tp;
        this.setData({
            lOrd: e
        }), 1 == e && (this.setData({
            p: 1,
            pnum: 10,
            serAetList: []
        }), this.getSerArtList());
    },
    goArtDetails: function(t) {
        var e = this.data.datum.serialize.one_pay, a = this.data.mypay, i = "../detail/index?id=" + t.currentTarget.dataset.artid;
        1 == e ? wx.navigateTo({
            url: i
        }) : 2 == e && (a ? wx.navigateTo({
            url: i
        }) : 1 != this.data.member ? wx.showToast({
            title: "请购买本专栏后继续",
            icon: "none",
            duration: 2e3
        }) : wx.navigateTo({
            url: i
        }));
    }
});