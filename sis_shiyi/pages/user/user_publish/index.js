var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js"), recorderManager = wx.getRecorderManager(), innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        types: "",
        multiIndex: [ 0, 0 ],
        multiArray: [],
        father: [],
        children: [],
        pcate: 0,
        ccate: 0,
        cover: !0,
        coverImg: "",
        imgArray: [ [] ],
        textArray: [ "" ],
        tuwenNum: [ 0 ],
        items: [ {
            name: "tuwen",
            value: "图文",
            checked: "true"
        }, {
            name: "tuji",
            value: "图集"
        }, {
            name: "video",
            value: "视频"
        }, {
            name: "audio",
            value: "音频"
        } ],
        price: [ {
            name: "free",
            value: "免费",
            checked: "true"
        }, {
            name: "price",
            value: "付费"
        } ],
        videoSrc: "",
        changePrice: !1,
        selectType: 1,
        one: [],
        id: 0,
        recording: "",
        play: !1,
        saverecord: !1,
        articleid: ""
    },
    onLoad: function(e) {
        _function.system(this);
        var t = wx.getStorageSync("userInfo");
        this.setData({
            userInfo: t
        }), this.getDatum(e.id), this.setData({
            articleid: e.id
        });
    },
    getDatum: function(p) {
        var m = this;
        _function.request("entry/wxapp/UserPublish", {
            uid: this.data.userInfo.id,
            id: p
        }, "", function(e) {
            console.log(e);
            var t = [], a = [], i = [];
            for (var r in e.father) for (var n in t[r] = e.father[r].name, e.children) if (n == e.father[r].id && (a[r] = e.children[n]), 
            p) {
                if (e.father[r].id == e.one.pcate) var c = r;
                if (null == a[0]) m.setData({
                    multiIndex: [ c, 0 ]
                }); else {
                    for (var o in e.children[e.one.pcate]) if (i[o] = e.children[e.one.pcate][o].name, 
                    e.children[e.one.pcate][o].id == e.one.ccate) var u = o;
                    m.setData({
                        multiIndex: [ parseInt(c), parseInt(u) ]
                    });
                }
            }
            if (p) {
                if (0 < e.one.pay_money) {
                    var s = [ {
                        name: "free",
                        value: "免费"
                    }, {
                        name: "price",
                        value: "付费",
                        checked: "true"
                    } ];
                    m.setData({
                        price: s,
                        changePrice: !0
                    });
                }
                if (2 == e.one.types) {
                    var d = [ {
                        name: "tuwen",
                        value: "图文"
                    }, {
                        name: "tuji",
                        value: "图集",
                        checked: "true"
                    }, {
                        name: "video",
                        value: "视频"
                    }, {
                        name: "audio",
                        value: "音频"
                    } ], l = (s = [], e.one.imgArray);
                    for (var h in l = l[0]) s.push(l[h]);
                    e.one.imgArray[0] = s;
                }
                if (4 == e.one.types) d = [ {
                    name: "tuwen",
                    value: "图文"
                }, {
                    name: "tuji",
                    value: "图集"
                }, {
                    name: "video",
                    value: "视频",
                    checked: "true"
                }, {
                    name: "audio",
                    value: "音频"
                } ];
                if (3 == e.one.types) d = [ {
                    name: "tuwen",
                    value: "图文"
                }, {
                    name: "tuji",
                    value: "图集"
                }, {
                    name: "video",
                    value: "视频"
                }, {
                    name: "audio",
                    value: "音频",
                    checked: "true"
                } ];
                1 == e.one.types || 2 == e.one.types ? m.setData({
                    id: p,
                    multiArray: [ t, i ],
                    children: a,
                    father: e.father,
                    pcate: e.one.pcate,
                    ccate: e.one.ccate,
                    one: e.one,
                    coverImg: e.one.thumb,
                    cover: !1,
                    imgArray: e.one.imgArray,
                    textArray: e.one.textArray,
                    tuwenNum: e.one.tuwenNum,
                    items: d
                }) : 4 == e.one.types ? m.setData({
                    id: p,
                    multiArray: [ t, i ],
                    children: a,
                    father: e.father,
                    pcate: e.one.pcate,
                    ccate: e.one.ccate,
                    one: e.one,
                    coverImg: e.one.thumb,
                    cover: !1,
                    videoSrc: e.one.bg_music,
                    items: d,
                    selectType: 3
                }) : 3 == e.one.types && m.setData({
                    id: p,
                    multiArray: [ t, i ],
                    children: a,
                    father: e.father,
                    pcate: e.one.pcate,
                    ccate: e.one.ccate,
                    one: e.one,
                    coverImg: e.one.thumb,
                    cover: !1,
                    recording: e.one.bg_music,
                    items: d,
                    selectType: 4,
                    saverecord: !0
                });
            } else if (null == a[0]) m.setData({
                multiArray: [ t, i ],
                children: a,
                father: e.father,
                pcate: e.father[0].id,
                types: "add"
            }); else for (var f in a[0]) i[f] = a[0][f].name, m.setData({
                multiArray: [ t, i ],
                children: a,
                father: e.father,
                pcate: e.father[0].id,
                ccate: a[0][0].id,
                types: "add"
            });
        }, this);
    },
    bindMultiPickerColumnChange: function(e) {
        var t = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        t.multiIndex[e.detail.column] = e.detail.value;
        var a = [];
        for (var i in this.data.children[t.multiIndex[0]]) a[i] = this.data.children[t.multiIndex[0]][i].name;
        t.multiArray[1] = a, this.setData(t);
    },
    bindMultiPickerChange: function(e) {
        this.setData({
            multiIndex: e.detail.value,
            pcate: this.data.father[e.detail.value[0]].id
        }), 0 < this.data.children.length && this.setData({
            ccate: this.data.children[e.detail.value[0]][e.detail.value[1]].id
        });
    },
    change: function(e) {
        var t = e.detail.value, a = this.data.items;
        for (var i in a) {
            a[i].name == t ? (a[i].checked = "true", this.setData({
                selectType: Number(i) + 1
            })) : a[i].checked = "false";
        }
        this.setData({
            items: a,
            imgArray: [ [] ],
            tuwenNum: [ 0 ],
            textArray: [],
            videoSrc: "",
            recording: ""
        });
    },
    changePrice: function(e) {
        var t = e.detail.value, a = this.data.price;
        for (var i in a) {
            var r = a[i].name;
            a[i].checked = r == t ? "true" : "false";
        }
        this.setData({
            changePrice: "price" == t
        });
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        });
    },
    ChooseImageTap: function(e) {
        var i = this, r = e.currentTarget.dataset.count, n = e.currentTarget.dataset.index;
        wx.chooseImage({
            count: r,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                if (1 == r) i.setData({
                    cover: !1,
                    coverImg: e.tempFilePaths
                }); else {
                    var t = i.data.imgArray;
                    if (a) a = t[n]; else {
                        t.push([]);
                        var a = t[n];
                    }
                    9 < (a = a.concat(e.tempFilePaths)).length && 2 != i.data.selectType && (a = a.splice(a.length - 9, a.length - 1), 
                    _function.hint(3, "一次最多可添加9张图片哦^_^!", "温馨提示", function(e) {})), t[n] = a, i.setData({
                        imgArray: t
                    });
                }
            }
        });
    },
    delImg: function(e) {
        var t = e.currentTarget.dataset.index, a = e.currentTarget.dataset.idx, i = this.data.textArray, r = this.data.imgArray, n = r[t];
        if (-1 != r[t][a].indexOf("images") && _function.request("entry/wxapp/DelImg", {
            id: this.data.id,
            types: 1,
            path: r[t][a]
        }, "", function(e) {}, this), n.splice(a, 1), 0 != (r[t] = n).length || 0 == t || "" != i[t] && null != i[t]) this.setData({
            imgArray: r
        }); else {
            r.splice(t, 1);
            var c = this.data.tuwenNum;
            c.splice(t, 1), this.setData({
                imgArray: r,
                tuwenNum: c
            });
        }
    },
    textareablur: function(e) {
        var t = this.data.textArray, a = this.data.imgArray, i = this.data.tuwenNum, r = e.currentTarget.dataset.index, n = e.detail.value;
        n && (t[r] = n + " \r\n "), this.setData({
            tuwenNum: i,
            imgArray: a,
            textArray: t
        });
    },
    tuwenAdd: function(e) {
        var t = this.data.imgArray, a = e.currentTarget.dataset.index, i = this.data.textArray;
        if (0 != t[a].length && i[a]) {
            t.push([]);
            var r = this.data.tuwenNum;
            r.push(this.data.tuwenNum.length), i.push(""), this.setData({
                tuwenNum: r,
                imgArray: t,
                textArray: i
            });
        } else _function.hint(3, "请先完成当前操作^_^!", "温馨提示", function(e) {});
    },
    delAll: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.tuwenNum, i = this.data.textArray, r = this.data.imgArray;
        this.data.id && _function.request("entry/wxapp/DelImg", {
            id: this.data.id,
            types: 2,
            path: r[t]
        }, "", function(e) {}, this), r.splice(t, 1), a.splice(t, 1), i.splice(t, 1), this.setData({
            tuwenNum: a,
            imgArray: r,
            textArray: i,
            videoSrc: ""
        });
    },
    chooseVideo: function(e) {
        var t = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: 60,
            camera: "back",
            success: function(e) {
                t.setData({
                    videoSrc: e.tempFilePath
                });
            }
        });
    },
    delVideo: function(e) {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "确定删除重新上传视频吗？",
            success: function(e) {
                e.confirm && (t.setData({
                    videoSrc: ""
                }), -1 != this.data.videoSrc.indexOf("images") && _function.request("entry/wxapp/DelVideoAudio", {
                    path: this.data.videoSrc
                }, "", function(e) {}, this));
            }
        });
    },
    start: function() {
        var e = this;
        recorderManager.start({
            duration: 6e5,
            sampleRate: 16e3,
            numberOfChannels: 1,
            encodeBitRate: 96e3,
            format: "mp3",
            frameSize: 50
        }), recorderManager.onStart(function() {
            _function.hint(1, "录音开始", 2e3, function(e) {}), e.setData({
                play: !1
            });
        }), recorderManager.onError(function(e) {
            _function.hint(3, "出错啦，请尝试重新录音!", "温馨提示", function(e) {});
        });
    },
    stop: function() {
        var t = this;
        recorderManager.stop(), recorderManager.onStop(function(e) {
            t.setData({
                recording: e.tempFilePath,
                play: !0
            }), _function.hint(1, "录音结束", 2e3, function(e) {});
        });
    },
    play: function() {
        innerAudioContext.autoplay = !0, innerAudioContext.src = this.data.recording, innerAudioContext.onPlay(function() {
            _function.hint(1, "开始播放", 2e3, function(e) {});
        }), innerAudioContext.onError(function(e) {
            _function.hint(3, e.errMsg, "温馨提示", function(e) {});
        });
    },
    saveplay: function() {
        wx.playBackgroundAudio({
            dataUrl: this.data.recording,
            title: this.data.one.title,
            coverImgUrl: this.data.one.thumb
        });
    },
    delRecord: function() {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "确定删除重新录音吗？",
            success: function(e) {
                e.confirm && (wx.stopBackgroundAudio(), t.setData({
                    saverecord: !1
                }), _function.request("entry/wxapp/DelVideoAudio", {
                    types: 3,
                    path: this.data.recording
                }, "", function(e) {}, this));
            }
        });
    },
    formSubmit: function(e) {
        var u, s = this, t = e.detail.value, d = this.data.selectType;
        if (u = 3 == d ? this.data.videoSrc : 4 == d ? this.data.recording : this.data.imgArray[0], 
        (1 == d || 2 == d) && 0 == u.length) return _function.hint(3, "请将信息补充完整^_^!", "温馨提示", function(e) {}), 
        !1;
        if ("" == t.title || "" == this.data.coverImg) return _function.hint(3, "请将信息补充完整^_^!", "温馨提示", function(e) {}), 
        !1;
        if (this.data.changePrice) {
            if (!t.price) return _function.hint(3, "请填写价格!", "温馨提示", function(e) {}), !1;
            if ("" == t.lookImg || "" == t.look) return _function.hint(3, "请填写免费内容!", "温馨提示", function(e) {}), 
            !1;
        }
        _function.request("entry/wxapp/PublishSubmit", {
            artsh: app.globalData.artsh,
            id: this.data.id,
            title: t.title,
            price: t.price,
            lookImg: t.lookImg,
            look: t.look,
            pcate: this.data.pcate,
            ccate: this.data.ccate,
            selectType: d,
            textArray: this.data.textArray,
            author_id: this.data.userInfo.author,
            author: this.data.userInfo.nickname,
            videoSrc: this.data.videoSrc,
            videoFree: t.videoFree,
            recording: this.data.recording,
            musicfree: t.musicfree
        }, "", function(e) {
            if (0 < e) {
                var t = new Array(), a = app.util.url("entry/wxapp/PublishUploads");
                if (a += "m=sis_shiyi", t.url = a, 0 == s.data.id) t.path = s.data.coverImg; else if (-1 != s.data.coverImg.indexOf("images")) {
                    var i = [];
                    i.push(s.data.coverImg), t.path = i;
                } else t.path = s.data.coverImg;
                if (t.formData = {
                    id: e,
                    types: "cover"
                }, _function.uploadImage(t), 1 == d || 2 == d) {
                    if (0 != u.length) if (2 == d) {
                        var r = s.data.imgArray[0];
                        (c = new Array()).url = a, c.path = r, c.formData = {
                            id: e,
                            orderOne: 0,
                            selectType: d
                        }, _function.uploadImage(c);
                    } else {
                        r = s.data.imgArray;
                        for (var n in r) {
                            var c = new Array();
                            a = app.util.url("entry/wxapp/PublishUploads");
                            a += "m=sis_shiyi", c.url = a, c.path = r[n], c.formData = {
                                id: e,
                                orderOne: parseInt(n),
                                selectType: d
                            }, 0 < r[n].length && _function.uploadImage(c);
                        }
                    }
                } else if (3 == d) {
                    t = new Array(), a = app.util.url("entry/wxapp/PublishUploads");
                    a += "m=sis_shiyi", t.url = a, t.path = [], t.path.push(s.data.videoSrc), t.formData = {
                        id: e,
                        selectType: s.data.selectType
                    }, _function.uploadImage(t);
                } else if (4 == d) {
                    t = new Array(), a = app.util.url("entry/wxapp/PublishUploads");
                    a += "m=sis_shiyi", t.url = a, t.path = [], t.path.push(s.data.recording), t.formData = {
                        id: e,
                        selectType: s.data.selectType
                    }, _function.uploadImage(t);
                }
                var o = "";
                o = 0 == app.globalData.artsh ? "发表成功" : "发表成功,请在我的文章里查看!", _function.hint(2, o, "温馨提示", function(e) {});
            } else _function.hint(3, "抱歉，网络错误，发布失败，请稍后重试!", "温馨提示", function(e) {});
        }, this, "POST");
    },
    PCUpdate: function(e) {
        var t = e.currentTarget.dataset.openid, a = e.currentTarget.dataset.articleid;
        _function.request("entry/wxapp/getPCUpdateUrl", {
            openid: t,
            articleid: a
        }, "", function(a) {
            if (-1 == a.code) return wx.showToast({
                title: a.message,
                icon: "none"
            }), !1;
            wx.setClipboardData({
                data: a.pcurl,
                success: function(e) {
                    var t = "链接为一次性使用,可重复获取,有效期2分钟\n链接为：" + a.pcurl;
                    wx.showModal({
                        title: "PC端链接提示",
                        content: t,
                        confirmText: "复制",
                        success: function(e) {
                            if (e.confirm) wx.getClipboardData({
                                success: function(e) {}
                            }); else if (e.cancel) return !1;
                        }
                    });
                },
                fail: function(e) {
                    wx.showToast({
                        title: "系统错误,请刷新重试",
                        icon: "none"
                    });
                }
            });
        }, this);
    }
});