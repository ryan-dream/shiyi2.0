var t;

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = getApp(), i = (require("../../../resource/js/util.js"), require("../../../resource/utils/underscore"), 
require("../../../resource/wxParse/wxParse.js")), n = require("../../../resource/function/function.js"), s = "play_info";

Page({
    timeId: 0,
    data: (t = {
        datum: [],
        userInfo: [],
        comment: [],
        mypay: null,
        member: 0,
        zan: 0,
        pay_num: 0,
        oldzan: 0,
        collect: 0,
        related: [],
        id: 0,
        continues: !1,
        become: !1
    }, a(t, "userInfo", []), a(t, "tk", !1), a(t, "p", 1), a(t, "pnum", 6), a(t, "is_pay", !1), 
    a(t, "shang", !1), a(t, "shang_num", 0), a(t, "currentStop", 0), a(t, "pay_status", 0), 
    a(t, "is_avautoPlay", 0), a(t, "playStatus", 0), a(t, "stepTime", "00:00"), a(t, "durationTime", "00:00"), 
    a(t, "progress", "0"), a(t, "report_tan", !1), a(t, "radio_value", 0), a(t, "auProVal", 0), 
    a(t, "auProMax", 0), a(t, "msgsh", ""), a(t, "ios", ""), a(t, "iosRead", ""), a(t, "windowHeight", 1e3), 
    a(t, "windowWidth", 600), a(t, "rpx", ""), a(t, "posterLinshiPath", ""), a(t, "posterView", !1), 
    a(t, "none", 0), a(t, "posSucc", !1), t),
    onLoad: function(t) {
        var a = this;
        console.log(t), this.setData({
            msgsh: e.globalData.msgsh,
            ios: e.globalData.MobileSystem
        }), n.system(this), t.fxid && t.fxtype && (wx.setStorageSync("fxid", t.fxid), n.request("entry/wxapp/Judge", {
            uid: this.data.userInfo.id,
            id: t.id
        }, "", function(t) {
            if (0 == t && a.data.userInfo.author != a.data.datum.article.author_id) return n.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}), 
            wx.redirectTo({
                url: "sis_shiyi/pages/newcms/index/index"
            }), !1;
        }, this));
        var i = wx.getStorageSync("is_pay");
        this.setData({
            id: t.id,
            is_pay: 1 == i
        });
        var o = wx.getStorageSync("userInfo");
        o ? this.setData({
            userInfo: o
        }) : n.getUserinfo(this), this.getDatum(t.id), wx.onBackgroundAudioPause(this.onPause), 
        wx.onBackgroundAudioStop(this.onStop), wx.getBackgroundAudioPlayerState({
            success: function(e) {
                var i = wx.getStorageSync(s);
                e.dataUrl, i && 1 == e.status && t.id == i.id && (a.startProgressListener(), a.onProgressUpdate(e));
            }
        });
    },
    onPlay: function() {
        var t = this;
        if (0 < this.timeId ? wx.setNavigationBarTitle({
            title: "文章详情"
        }) : wx.setNavigationBarTitle({
            title: "音频加载中..."
        }), this.setData({
            playStatus: 1
        }), wx.setStorageSync(s, {
            id: this.data.id,
            path: this.data.datum.article.bg_music
        }), this.data.member) this.startProgressListener(); else if (1 != this.data.pay_status || this.data.mypay) this.startProgressListener(); else if (this.timeId > this.data.currentStop) {
            if (3 == this.data.datum.article.types && this.data.userInfo.author != this.data.datum.article.author_id) return n.hint(3, "完成支付继续收听哦^_^!", "温馨提示", function(a) {
                wx.pauseBackgroundAudio({
                    success: function(a) {
                        t.setData({
                            playStatus: 0
                        }), t.stopProgressListener();
                    },
                    fail: function(a) {
                        t.setData({
                            playStatus: 0
                        }), t.stopProgressListener();
                    }
                });
            }), !1;
        } else this.startProgressListener();
    },
    onPause: function() {
        this.setData({
            playStatus: 0
        }), this.stopProgressListener();
    },
    onStop: function(t) {
        this.setData({
            playStatus: 0
        }), this.stopProgressListener(), wx.removeStorageSync(s), wx.getBackgroundAudioPlayerState({
            success: this.onProgressUpdate
        });
    },
    onUnload: function() {
        3 == this.data.datum.article.types && wx.setStorageSync("music", this.data.datum.article.id), 
        this.data.member || 1 != this.data.pay_status || this.data.mypay || 3 == this.data.datum.article.types && this.data.userInfo.author != this.data.datum.article.author_id && wx.stopBackgroundAudio(), 
        this.stopProgressListener();
    },
    startProgressListener: function() {
        var t = this, a = function() {
            wx.getBackgroundAudioPlayerState({
                success: t.onProgressUpdate
            });
        };
        this.timeId = setInterval(a, 250), a();
    },
    stopProgressListener: function() {
        clearInterval(this.timeId);
    },
    onProgressUpdate: function(t) {
        var a = this;
        t.currentPosition && this.setData({
            auProVal: t.currentPosition,
            auProMax: t.duration
        }), this.playUrl = t.dataUrl;
        var e = t.currentPosition, i = t.duration, s = Math.floor(e / 60), o = Math.floor(e % 60), r = Math.floor(i / 60), u = Math.floor(i % 60), d = {
            stepTime: (s < 10 ? "0" + s : s) + ":" + (o < 10 ? "0" + o : o),
            durationTime: (r < 10 ? "0" + r : r) + ":" + (u < 10 ? "0" + u : u),
            progress: e / i * 100,
            downloadPercent: t.downloadPercent
        };
        if (0 != t.status && 1 != t.status || (d.playStatus = t.status), this.setData(d), 
        0 < e && wx.setNavigationBarTitle({
            title: "文章详情"
        }), !this.data.member && 1 == this.data.pay_status && !this.data.mypay && e > this.data.currentStop && 3 == this.data.datum.article.types && this.data.userInfo.author != this.data.datum.article.author_id) return n.hint(3, "完成支付继续收听哦^_^!", "温馨提示", function(t) {
            wx.pauseBackgroundAudio({
                success: function(t) {
                    a.setData({
                        playStatus: 0
                    }), a.stopProgressListener();
                },
                fail: function(t) {
                    a.setData({
                        playStatus: 0
                    }), a.stopProgressListener();
                }
            });
        }), !1;
        e == i && this.setData({
            stepTime: "00:00",
            durationTime: "00:00"
        });
    },
    onTogglePlayTap: function(t) {
        var a = this;
        if (a.data.playStatus) wx.pauseBackgroundAudio({
            success: a.onPause,
            fail: function(t) {
                wx.showModal({
                    content: "暂停失败：" + t.errMsg,
                    showCancel: !1
                });
            }
        }); else {
            var e = wx.getStorageSync(s);
            a.playUrl != e.path && wx.stopBackgroundAudio(), wx.playBackgroundAudio({
                dataUrl: a.data.datum.article.bg_music,
                complete: a.onPlay
            });
        }
    },
    auProChanging: function(t) {
        var a = this, e = a.data.datum.article;
        if (3 == e.types && parseInt(this.timeId) > parseInt(e.aud_free) && !a.data.is_pay) return n.hint(1, "完成支付继续收听", 2e3), 
        a.onPause(), !1;
        var i = wx.getBackgroundAudioManager();
        a.stopProgressListener();
        var s = parseInt(t.detail.value);
        wx.getBackgroundAudioPlayerState({
            success: function(t) {
                t.currentPosition = s, i.seek(s), a.onProgressUpdate(t);
            },
            fail: function(t) {}
        });
    },
    onReady: function(t) {
        this.audioCtx = wx.createAudioContext("myAudio"), this.videoContext = wx.createVideoContext("myVideo");
    },
    videoPlay: function(t) {
        wx.setNavigationBarTitle({
            title: "视频加载中..."
        });
    },
    videoStop: function(t) {
        var a = t.detail.currentTime;
        if (0 < a && wx.setNavigationBarTitle({
            title: "文章详情"
        }), !this.data.member && 1 == this.data.pay_status && !this.data.mypay && a > this.data.currentStop && this.data.userInfo.author != this.data.datum.article.author_id) return this.videoContext.seek(this.data.currentStop), 
        this.videoContext.pause(), n.hint(3, "完成支付继续观看哦^_^!", "温馨提示", function(t) {}), !1;
    },
    onPullDownRefresh: function() {
        this.getDatum(this.data.id), this.comment(this.data.id), wx.stopPullDownRefresh();
    },
    getDatum: function(t) {
        var a = this, e = this;
        n.request("entry/wxapp/Detail", {
            id: t,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid
        }, "", function(t) {
            if (console.log(t), !t.article.id) return n.hint(2, "抱歉,该文章已删除,请阅览其他文章吧~", "系统提示", function(t) {}), 
            !1;
            t.article.content && 2 != t.article.type && i.wxParse("content", "html", t.article.content, e), 
            t.article.description && 2 != t.article.type && i.wxParse("description", "html", t.article.description, e);
            var o = void 0;
            switch (t.article.types) {
              case "3":
                o = t.article.aud_free;
                break;

              case "4":
                o = t.article.ved_free;
            }
            if (a.setData({
                datum: t,
                mypay: t.mypay,
                member: t.member,
                pay_num: t.article.pay_num,
                zan: t.article.zanNum,
                oldzan: t.zan,
                collect: t.collect,
                related: t.related,
                shang_num: t.shang,
                currentStop: o,
                pay_status: 0 < t.article.pay_money ? 1 : 0
            }), 1 == t.pay_free_info) return n.hint(3, "抱歉,距离上次支付超过免费观看时间请再次支付继续观看哦！", "温馨提示", function(t) {}), 
            !1;
            var r = wx.getStorageSync(s);
            3 == t.article.types ? 1 == a.data.is_avautoPlay ? t.article.bg_music != r.path && (wx.stopBackgroundAudio(), 
            wx.setStorageSync(s, {
                id: t.article.id,
                path: t.article.bg_music
            }), wx.playBackgroundAudio({
                dataUrl: t.article.bg_music,
                complete: a.onPlay
            })) : t.article.bg_music != r.path ? (wx.onBackgroundAudioStop(a.onStop), wx.setStorageSync(s, {
                id: t.article.id,
                path: t.article.bg_music
            }), wx.playBackgroundAudio({
                dataUrl: t.article.bg_music,
                complete: a.onPlay
            })) : (wx.onBackgroundAudioStop(a.onStop), wx.getBackgroundAudioPlayerState({
                success: function(t) {
                    wx.getStorageSync(s), a.data.datum.article.bg_music, a.startProgressListener();
                }
            })) : (wx.onBackgroundAudioStop(a.onStop), wx.stopBackgroundAudio());
        }, this), this.comment(t);
    },
    detail: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.url;
        t.currentTarget.dataset.type, n.request("entry/wxapp/Judge", {
            uid: this.data.userInfo.id,
            id: a,
            author: this.data.userInfo.author
        }, "", function(t) {
            if (0 == t) return n.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}), !1;
            wx.redirectTo({
                url: e + "?id=" + a
            });
        }, this);
    },
    comment: function(t) {
        var a = this;
        n.request("entry/wxapp/DetailComment", {
            id: t,
            openid: this.data.userInfo.openid,
            p: this.data.p,
            pnum: this.data.pnum
        }, "", function(t) {
            a.setData({
                comment: t
            });
        }, this);
    },
    more: function(t) {
        var a = t.currentTarget.dataset.types, e = t.currentTarget.dataset.pid, i = t.currentTarget.dataset.cid;
        wx.navigateTo({
            url: "../art_list/index?types=" + a + "&cid=" + e + "," + i
        });
    },
    pay: function(t) {
        var a = this, e = wx.getStorageSync("fxid"), i = wx.getStorageSync("fx_pay_type");
        this.data.userInfo.fopenid || "scene" != i || n.request("entry/wxapp/Binding", {
            fxid: e,
            fx_pay_type: i,
            uid: this.data.userInfo.id
        }, "", function(t) {}, this, "POST");
        var s = t.currentTarget.dataset.types, o = t.currentTarget.dataset.money, r = t.currentTarget.dataset.vid;
        e = e == this.data.userInfo.id ? "" : e, n.request("entry/wxapp/Pay", {
            id: this.data.id,
            author_id: this.data.datum.article.author_id,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid,
            money: o,
            types: s,
            day: t.currentTarget.dataset.day,
            fxid: e,
            fopenid: this.data.userInfo.fopenid,
            vid: r
        }, "", function(t) {
            var e = a;
            1 == t.state ? wx.requestPayment({
                timeStamp: t.timeStamp,
                nonceStr: t.nonceStr,
                package: t.package,
                signType: "MD5",
                paySign: t.paySign,
                success: function(t) {
                    e.setData({
                        pay_status: 2
                    }), e.getDatum(e.data.id, e.data.appoint), 1 == s ? e.setData({
                        mypay: e.data.id
                    }) : 3 == s && e.setData({
                        member: 1
                    }), 3 == e.data.datum.article.types && wx.playBackgroundAudio({
                        dataUrl: e.data.datum.article.bg_music,
                        complete: e.onPlay
                    });
                },
                fail: function(t) {
                    n.hint(3, "支付失败^_^!", "网络提示", function(t) {});
                }
            }) : n.hint(1, "网络错误！", "", function(t) {});
        }, this, "POST");
    },
    zancollect: function(t) {
        var a = this, e = t.currentTarget.dataset.types;
        n.request("entry/wxapp/Zancollect", {
            id: this.data.id,
            openid: this.data.userInfo.openid,
            types: e
        }, "", function(t) {
            1 == e ? a.setData({
                zan: parseInt(a.data.zan) - 1,
                oldzan: 0
            }) : 2 == e ? a.setData({
                zan: parseInt(a.data.zan) + 1,
                oldzan: a.data.id
            }) : 3 == e ? a.setData({
                collect: 0
            }) : 4 == e && a.setData({
                collect: a.data.id
            });
        }, this);
    },
    collect: function() {
        var t = this;
        n.request("entry/wxapp/Collect", {
            id: this.data.id
        }, "", function(a) {
            t.setData({
                zan: parseInt(t.data.zan) + 1
            });
        }, this);
    },
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.datum.article.tel
        });
    },
    zan: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        n.request("entry/wxapp/Zan", {
            id: e,
            aid: this.data.id,
            openid: this.data.userInfo.openid
        }, "", function(t) {
            if (0 != t) {
                var i = a.data.comment;
                for (var s in i) i[s].id == e && (0 == t.type ? (i[s].zan = 0, i[s].zannum = parseInt(i[s].zannum) - 1) : (i[s].zan = 1, 
                i[s].zannum = parseInt(i[s].zannum) + 1));
                a.setData({
                    comment: i
                });
            } else n.hint(1, "网络错误^_^!", 2e3, function(t) {});
            a.setData({
                comzan: t,
                comid: e
            });
        }, this);
    },
    continues: function(t) {
        this.setData({
            continues: !this.data.continues,
            iosRead: 0
        });
    },
    become: function(t) {
        this.setData({
            become: !this.data.become
        });
    },
    tk: function(t) {
        this.setData({
            tk: !this.data.tk
        });
    },
    shang: function(t) {
        if (1 == e.globalData.MobileSystem) return n.hint(3, "请切换至安卓(Android)系统，继续体验该功能", "温馨提示", function(t) {}), 
        !1;
        if (this.data.datum.article.author_id <= 0) return n.hint(3, "对不起，当前文章没有选定作者，不能打赏", "温馨提示", function(t) {}), 
        !1;
        var a = "?shang_num=" + this.data.shang_num + "&id=" + this.data.id + "&author_id=" + this.data.datum.article.author_id;
        n.jump(1, "/sis_shiyi/pages/newcms/shang/shang" + a);
    },
    shangSubmit: function(t) {
        var a = this, e = t.detail.value.shang_money;
        if ("" == e) return n.hint(3, "对不起，请输入打赏金额^_^!", "温馨提示", function(t) {}), !1;
        n.request("entry/wxapp/Shang", {
            id: this.data.id,
            shang_money: e,
            uid: this.data.userInfo.id,
            openid: this.data.userInfo.openid,
            avatar: this.data.userInfo.avatar,
            author_id: this.data.datum.article.author_id
        }, "", function(t) {
            if (1 == t.state) {
                var e = a;
                wx.requestPayment({
                    timeStamp: t.timeStamp,
                    nonceStr: t.nonceStr,
                    package: t.package,
                    signType: "MD5",
                    paySign: t.paySign,
                    success: function(t) {
                        n.hint(3, "打赏成功^_^!", "温馨提示！", function(t) {
                            e.setData({
                                shang: !e.data.shang
                            });
                        }), n.request("entry/wxapp/Detail", {
                            id: e.data.id,
                            types: "shang"
                        }, "", function(t) {
                            e.setData({
                                shang_num: t
                            });
                        }, this);
                    },
                    fail: function(t) {
                        n.hint(3, "打赏失败^_^!", "网络提示", function(t) {
                            e.setData({
                                shang: !e.data.shang
                            });
                        });
                    }
                });
            } else n.hint(3, "网络错误，请稍后重试—_—!", "温馨提示！", function(t) {
                a.setData({
                    shang: !a.data.shang
                });
            });
        }, this);
    },
    formSubmit: function(t) {
        var a = this, i = t.detail.value.content, s = t.detail.formId;
        if ("" == i) return n.hint(3, "对不起，请输入留言内容^_^!", "温馨提示", function(t) {}), !1;
        n.request("entry/wxapp/Message", {
            msgsh: e.globalData.msgsh,
            id: this.data.id,
            content: i,
            openid: this.data.userInfo.openid,
            uid: this.data.userInfo.id,
            nickname: this.data.userInfo.nickname,
            avatar: this.data.userInfo.avatar,
            formId: s
        }, "", function(t) {
            1 == t ? n.hint(3, "评论成功^_^!", "温馨提示！", function(t) {
                a.setData({
                    tk: !a.data.tk
                }), a.onPullDownRefresh();
            }) : n.hint(3, "网络错误，请稍后评论—_—!", "温馨提示！", function(t) {
                a.setData({
                    tk: !a.data.tk
                });
            });
        }, this);
    },
    index: function() {
        wx.redirectTo({
            url: "../index/index"
        });
    },
    report_tan: function() {
        this.setData({
            report_tan: !this.data.report_tan,
            radio_value: 0
        });
    },
    report: function(t) {
        this.setData({
            radio_value: t.detail.value
        });
    },
    report_submit: function(t) {
        var a = this, e = t.detail.value.radio_content;
        if (0 == this.data.radio_value) return n.hint(1, "请选择建议类型", 2e3), !1;
        n.request("entry/wxapp/Report", {
            radio_content: e,
            types: this.data.radio_value,
            a_id: this.data.id,
            u_id: this.data.userInfo.id,
            nickname: this.data.userInfo.nickname,
            avatar: this.data.userInfo.avatar
        }, "", function(t) {
            a.report_tan(), n.hint(3, "建议成功，我们会尽快核实处理您的建议内容！", "温馨提示！", function(t) {});
        }, this, "POST");
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("share_title"), a = this.data.datum.article.title, e = this.data.datum.article.thumb ? this.data.datum.article.thumb : "";
        return this.data.userInfo.id ? {
            title: t && a ? a : t,
            path: "sis_shiyi/pages/newcms/detail/index?id=" + this.data.id + "&fxid=" + this.data.userInfo.id + "&fxtype=fx",
            imageUrl: e
        } : {
            title: t && a ? a : t,
            path: "sis_shiyi/pages/newcms/detail/index?id=" + this.data.id,
            imageUrl: e
        };
    },
    iosread: function() {
        this.setData({
            iosRead: !this.data.iosRead
        });
    },
    ocposter: function(t) {
        var a = this;
        if (wx.showLoading({
            title: "资源处理中..."
        }), "0" == t.currentTarget.dataset.postype) return wx.hideLoading(), wx.setNavigationBarTitle({
            title: "文章详情"
        }), a.setData({
            posterView: !a.data.posterView,
            none: 0,
            posSucc: !1
        }), "";
        wx.getSystemInfo({
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: "文章海报"
                }), a.setData({
                    rpx: t.windowWidth / 375,
                    none: "1",
                    posterView: !a.data.posterView
                }), setTimeout(function() {
                    a.getDetailPos();
                }, 1e3);
            },
            fail: function() {
                wx.hideLoading(), setTimeout(function() {
                    wx.showToast({
                        title: "亲！出错了,请重试",
                        icon: "none",
                        duration: 1800,
                        complete: function(t) {
                            return a.setData({
                                posterView: !1,
                                none: 0
                            }), !1;
                        }
                    });
                }, 800);
            }
        });
    },
    getDetailPos: function(t) {
        var a = this;
        wx.showLoading({
            title: "资源下载中..."
        }), setTimeout(function() {
            n.request("entry/wxapp/getArtDetPoster", {
                art_id: a.data.id,
                uid: a.data.userInfo.id
            }, "", function(t) {
                if (1 == t.code) {
                    var e = [];
                    e.url = a.data.datum.article.thumb;
                    var i = e.url.split(":");
                    "http" == i[0] && (e.url = "https:" + i[1]), wx.downloadFile({
                        url: e.url,
                        success: function(t) {
                            200 === t.statusCode ? (wx.getImageInfo({
                                src: e.url,
                                success: function(t) {
                                    e.scale = t.height / t.width;
                                },
                                fail: function(t) {
                                    e.scale = 1;
                                }
                            }), e.tmpPath = t.tempFilePath) : e.tmpPath = "";
                        },
                        fail: function(t) {
                            e.tmpPath = "";
                        },
                        complete: function(i) {
                            wx.showLoading({
                                title: "海报生成中..."
                            }), setTimeout(function() {
                                a.createPosterImg(t, e);
                            }, 800);
                        }
                    });
                } else wx.hideLoading(), setTimeout(function() {
                    return n.hint(3, "对不起," + t.message, 请使用右上角转发操作, "温馨提示", function(t) {}), !1;
                }, 500);
            }, a);
        }, 1e3);
    },
    createPosterImg: function(t, a) {
        var e = this, i = e.data.datum.article, n = e.data.windowWidth / 2 * e.data.rpx, s = e.data.windowHeight / 2 * e.data.rpx, o = wx.createCanvasContext("artPosterImg");
        wx.getImageInfo({
            src: t.po_img,
            success: function(r) {
                o.fillStyle = "#FFFFFF", o.fillRect(0, 0, n, s), o.setFontSize(16), o.setFillStyle("#333333");
                var u = Math.floor(.05 * s) + 20, d = Math.floor(.07 * n), c = u - Math.floor(.02 * s) - 33, l = Math.floor(.18 * n), h = .1 * s;
                o.drawImage("../../../resource/images/artposter/zhuangshi.png", d, c, l, h);
                var p = i.title;
                o.measureText(p).width >= n - .5 * n && (p = p.substr(0, 10) + " ..."), o.fillText(p, d, u), 
                o.setFontSize(11), o.setFillStyle("#333333");
                var f = u + 30, m = i.ccate1 ? "/" + i.ccate1 : "", g = i.author + " " + i.pcate1 + m;
                o.measureText(g).width >= .5 * n && (g = i.author, o.measureText(g).width >= .5 * n && (g = i.pcate1 + "/" + i.ccate1), 
                o.measureText(g).width >= .5 * n && (g = "")), o.fillText(g, d, f), o.fillText(i.createtime, .65 * n, f);
                var w, y = f + 15;
                o.setFontSize(14);
                var x = Math.floor(.73 * n), v = d, S = y, _ = v + x, P = S + Math.floor(4 * x / 16);
                if (P > Math.floor(.4 * s) && (P = Math.floor(.4 * s)), o.setFillStyle("#e9e9e9"), 
                o.fillRect(v + 4, S + 4, _ + 6, P + 4), "" != a.tmpPath ? o.drawImage(a.tmpPath, v, S, _, P) : (o.setFillStyle("#a6a6a6"), 
                o.fillRect(v, S, _, P)), 3 == i.types || 4 == i.types) {
                    o.setFillStyle("rgba(0,0,0,0.6)"), o.fillRect(v, S, _, P);
                    var I = v + (_ - v) / 2 - 12, T = S + (P - S) / 2 + 25;
                    o.drawImage("../../../resource/images/artposter/bofang.png", I, T, .14 * n, .14 * n);
                }
                w = y + P + 45, o.drawImage("../../../resource/images/artposter/dou_1.png", v, w - 25, .05 * n, .03 * s), 
                o.drawImage("../../../resource/images/artposter/dou_2.png", _ + 6, Math.floor(.78 * s) - 27, .05 * n, .03 * s), 
                o.setFontSize(12), o.setFillStyle("#333333");
                var D = i.description.replace(/<[^>]+>/g, ""), b = Math.floor(.86 * n) - Math.floor(.12 * n), k = D.split("");
                k[0] = "       " + k[0];
                for (var M = "", A = [], z = 0; z < k.length; z++) o.measureText(M).width < b ? M += k[z] : (z--, 
                A.push(M), M = "");
                if (A.push(M), 10 < A.length) {
                    for (var B = A.slice(0, 10), L = B[9], F = "", q = [], V = 0; V < L.length && o.measureText(F).width < b; V++) F += L[V];
                    q.push(F);
                    var U = q[0] + "...";
                    B.splice(9, 1, U), A = B;
                }
                if (w -= 10, 2 != i.types) {
                    if ("" != i.description && "undefined" != i.description && i.description.indexOf("<img") < 0 && i.description.indexOf("<video") < 0) {
                        for (var C = [], R = [], N = 0; N < A.length; N++) C[N] = w + 14 * (N + 1), C[N] = 0 == N ? C[N] : C[N] + 5 * N, 
                        R.push(A[N]), parseInt(C[N]) > parseInt(Math.floor(.78 * s) - 30) && R.pop();
                        R[R.length - 1] = R[R.length - 1] + "...", C = C.slice(0, [ R.length ]);
                        for (var j = 0; j < R.length; j++) j == R.length - 1 && (R[j] = R[j].substr(0, 13) + "..."), 
                        o.fillText(R[j], Math.floor(.1 * n), C[j]);
                    }
                } else o.fillText("", Math.floor(.1 * n), w + 16);
                d = 0, c = Math.floor(.78 * s), l = n, h = s - c, o.drawImage("../../../resource/images/artposter/buttom_bg.png", d, c, l, h);
                var O = r.path;
                d = Math.floor(.68 * n), c = Math.floor(.8 * s), l = Math.floor(.25 * n), h = .15 * s, 
                o.drawImage(O, d, c, l, h), o.setFillStyle("#f2f2f2"), d = Math.floor(.65 * n), 
                c = Math.floor(.82 * s), l = Math.floor(.25 * n), h = .15 * s;
                var W = t.dg_article_title;
                o.setFontSize(16);
                var H = c + h / 3 + 10;
                o.fillText(W, Math.floor(.07 * n), H), o.draw(!0, setTimeout(function() {
                    e.cPosImg();
                }, 1e3));
            },
            fail: function(t) {
                wx.hideLoading(), wx.showModal({
                    title: "温馨提示",
                    content: "出错了！请重试!",
                    complete: function(t) {
                        return e.setData({
                            posterView: !e.data.posterView,
                            none: 0
                        }), !1;
                    }
                });
            }
        });
    },
    cPosImg: function() {
        var t = this;
        wx.showLoading({
            title: "路径生成中..."
        }), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "artPosterImg",
                success: function(a) {
                    wx.showToast({
                        title: "海报创建成功！",
                        icon: "success",
                        duration: 1e3
                    }), setTimeout(function() {
                        t.setData({
                            posterLinshiPath: a.tempFilePath,
                            posSucc: !0
                        });
                    }, 1e3);
                },
                fail: function(a) {
                    wx.hideLoading(), setTimeout(function() {
                        wx.showModal({
                            title: "温馨提示",
                            content: "对不起，海报临时路径生成失败，不能下载，请重试",
                            complete: function(a) {
                                return t.setData({
                                    posterView: !t.data.posterView,
                                    none: 0
                                }), !1;
                            }
                        });
                    }, 500);
                }
            });
        }, 800);
    },
    yulanposter: function(t) {
        var a = this.data.posterLinshiPath, e = [];
        e[0] = a, wx.previewImage({
            current: a,
            urls: e,
            fail: function(t) {
                wx.showToast({
                    title: "出错了！",
                    icon: "none",
                    duration: 1500
                });
            }
        });
    },
    isSaveToAblum: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.writePhotosAlbum"] ? t.savePosImgToAblum() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        t.savePosImgToAblum();
                    },
                    fail: function() {
                        wx.showModal({
                            title: "温馨提示",
                            content: "前往个人中心,授权'保存到相册'权限后重试",
                            complete: function(a) {
                                return t.setData({
                                    posterView: !t.data.posterView,
                                    none: 0
                                }), !1;
                            }
                        });
                    }
                });
            }
        });
    },
    savePosImgToAblum: function() {
        var t = this, a = t.data.posterLinshiPath;
        wx.saveImageToPhotosAlbum({
            filePath: a,
            success: function(a) {
                wx.showToast({
                    title: "保存成功，请在相册中查看",
                    icon: "none",
                    duration: 1800,
                    complete: function(a) {
                        return t.setData({
                            posterView: !t.data.posterView,
                            none: 0
                        }), !1;
                    }
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "保存失败,请重试",
                    icon: "none",
                    duration: 1800,
                    complete: function(a) {
                        return t.setData({
                            posterView: !t.data.posterView,
                            none: 0
                        }), !1;
                    }
                });
            }
        });
    }
});