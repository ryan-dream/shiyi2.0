var t = getApp(), e = (require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js")), a = require("../../../resource/function/function.js");

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
        shareMenuHidden: !0,
        ios: "",
        serAetList: [],
        lOrd: 2
    },
    onLoad: function(e) {
        a.system(this), e.fxid && e.fxtype && wx.setStorageSync("fxid", e.fxid);
        var i = wx.getStorageSync("is_pay");
        this.setData({
            id: e.id,
            is_pay: 1 == i,
            ios: t.globalData.MobileSystem
        });
        var s = wx.getStorageSync("userInfo");
        s ? (this.setData({
            userInfo: s
        }), this.getDatum(e.id, 1)) : a.getUserinfo(this);
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
        var s = this;
        1 == this.data.ismore && a.request("entry/wxapp/ColumnDetail", {
            id: t,
            p: this.data.p,
            pnum: this.data.pnum,
            types: i,
            openid: this.data.userInfo.openid
        }, "", function(t) {
            if (console.log("数据", t), 1 == i) s.setData({
                datum: t,
                collect: t.collect,
                member: t.member,
                mypay: t.mypay,
                free_chapter: t.serialize.free_chapter,
                comment: t.comment,
                total: t.total
            }); else {
                var a = s.data.comment;
                a = 1 == s.data.p ? t.comment || [] : a.concat(t.comment || []), s.setData({
                    comment: a,
                    ismore: a.length != s.data.total
                });
            }
            var n = 2 == i ? 1 : t.serialize.ser_type ? t.serialize.ser_type : "";
            console.log("类型", n), 2 == n && (e.wxParse("serialize_desc_2", "html", t.serialize.serialize_desc, s), 
            s.getSerArtList()), console.log("类型", n), 2 == n && (e.wxParse("serialize_pay_2", "html", t.serialize.serialize_pay, s), 
            s.getSerArtList()), console.log("类型", n), 1 == n && (e.wxParse("serialize_desc_show", "html", t.serialize.serialize_desc, s), 
            s.getSerArtList()), console.log("类型", n), 1 == n && (e.wxParse("serialize_pay", "html", t.serialize.serialize_pay, s), 
            s.getSerArtList());
        }, this);
    },
    collect: function(t) {
        var e = this, i = t.currentTarget.dataset.types;
        a.request("entry/wxapp/Zancollect", {
            id: this.data.id,
            openid: this.data.userInfo.openid,
            types: i
        }, "", function(t) {
            5 == i && t ? e.setData({
                collect: 0
            }) : 6 == i && t ? e.setData({
                collect: e.data.id
            }) : a.hint(1, "网络错误！", 2e3, function(t) {});
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
        var e = this, i = t.detail.value.content, s = t.detail.formId;
        if ("" == i) return a.hint(3, "对不起，请输入评论内容^_^!", "温馨提示", function(t) {}), !1;
        a.request("entry/wxapp/Message", {
            id: this.data.id,
            content: i,
            openid: this.data.userInfo.openid,
            uid: this.data.userInfo.id,
            nickname: this.data.userInfo.nickname,
            avatar: this.data.userInfo.avatar,
            types: 1,
            formId: s
        }, "", function(t) {
            console.log(t), 1 == t ? a.hint(3, "评论成功^_^!", "温馨提示", function(t) {}) : 4 == t && a.hint(3, "评论失败^_^!", "温馨提示", function(t) {}), 
            e.setData({
                tk: !e.data.tk
            });
        }, this);
    },
    pay: function(t) {
        var e = this, i = this.data.datum.serialize.serialize_price, s = wx.getStorageSync("fxid");
        a.request("entry/wxapp/Pay", {
            id: this.data.id,
            author_openid: this.data.datum.serialize.author_openid,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid,
            money: i,
            types: 2,
            fxid: s
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
                    a.hint(3, "支付失败^_^!", "网络提示", function(t) {});
                }
            }) : a.hint(1, "网络错误！", "", function(t) {});
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
            path: "sis_shiyi/pages/newcms/column/column?id=" + this.data.id + "&fxid=" + this.data.userInfo.id + "&fxtype=fx",
            success: function(t) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success",
                    duration: 1e3,
                    mask: !0
                });
            }
        } : {
            title: t && e ? e : t,
            path: "sis_shiyi/pages/newcms/column/column?id=" + this.data.id,
            success: function(t) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success",
                    duration: 1e3,
                    mask: !0
                });
            }
        };
    },
    shareMenu: function() {
        this.setData({
            shareMenuHidden: !1
        });
    },
    CloseShareMenu: function() {
        this.setData({
            shareMenuHidden: !0
        });
    },
    iosbuy: function() {
        return wx.showModal({
            title: "温馨提示",
            content: "请切换至安卓(Android)系统，继续体验该功能"
        }), !1;
    },
    getSerArtList: function() {
        var t = this, e = {
            p: t.data.p,
            pnum: t.data.pnum,
            serid: t.data.id,
            openid: t.data.userInfo.openid
        };
        a.request("entry/wxapp/getSerArtListData", e, "", function(e) {
            console.log("文章类专栏列表数据", e);
            var a = t.data.serAetList;
            a = 1 == t.data.p ? e.data || [] : a.concat(e.data || []), t.setData({
                total: e.total,
                serAetList: a,
                ismore: a.length != t.data.total
            });
        }, t);
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