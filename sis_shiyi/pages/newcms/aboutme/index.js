var _data;

function _defineProperty(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}

var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js"), playKey = "play_info";

Page({
  timeId: 0,
  data: (_data = {
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
  }, _defineProperty(_data, "userInfo", []), _defineProperty(_data, "tk", !1), _defineProperty(_data, "p", 1),
    _defineProperty(_data, "pnum", 6), _defineProperty(_data, "is_pay", !1), _defineProperty(_data, "shang", !1),
    _defineProperty(_data, "shang_num", 0), _defineProperty(_data, "currentStop", 0),
    _defineProperty(_data, "pay_status", 0), _defineProperty(_data, "is_avautoPlay", 0),
    _defineProperty(_data, "playStatus", 0), _defineProperty(_data, "stepTime", "00:00"),
    _defineProperty(_data, "durationTime", "00:00"), _defineProperty(_data, "progress", "0"),
    _defineProperty(_data, "report_tan", !1), _defineProperty(_data, "radio_value", 0),
    _defineProperty(_data, "auProVal", 0), _defineProperty(_data, "auProMax", 0), _defineProperty(_data, "msgsh", ""),
    _defineProperty(_data, "ios", ""), _defineProperty(_data, "iosRead", ""), _defineProperty(_data, "windowHeight", 1e3),
    _defineProperty(_data, "windowWidth", 600), _defineProperty(_data, "rpx", ""), _defineProperty(_data, "posterLinshiPath", ""),
    _defineProperty(_data, "posterView", !1), _defineProperty(_data, "none", 0), _defineProperty(_data, "posSucc", !1),
    _data),
  onLoad: function (e) {
    var i = this;
    console.log(e), this.setData({
      msgsh: app.globalData.msgsh,
      ios: app.globalData.MobileSystem
    }), _function.system(this), e.fxid && e.fxtype && (wx.setStorageSync("fxid", e.fxid),
      _function.request("entry/wxapp/Judge", {
        uid: this.data.userInfo.id,
        id: e.id
      }, "", function (t) {
        if (0 == t && i.data.userInfo.author != i.data.datum.article.author_id) return _function.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function (t) { }),
          wx.redirectTo({
            url: "sis_shiyi/pages/newcms/index/index"
          }), !1;
      }, this));
    var t = wx.getStorageSync("is_pay");
    this.setData({
      id: e.id,
      is_pay: 1 == t
    });
    var a = wx.getStorageSync("userInfo");
    a ? this.setData({
      userInfo: a
    }) : _function.getUserinfo(this), this.getDatum(e.id), wx.onBackgroundAudioPause(this.onPause),
      wx.onBackgroundAudioStop(this.onStop), wx.getBackgroundAudioPlayerState({
        success: function (t) {
          var a = wx.getStorageSync(playKey);
          t.dataUrl;
          a && 1 == t.status && e.id == a.id && (i.startProgressListener(), i.onProgressUpdate(t));
        }
      });
  },
  onPlay: function () {
    var a = this;
    if (0 < this.timeId ? wx.setNavigationBarTitle({
      title: "文章详情"
    }) : wx.setNavigationBarTitle({
      title: "音频加载中..."
    }), this.setData({
      playStatus: 1
    }), wx.setStorageSync(playKey, {
      id: this.data.id,
      path: this.data.datum.article.bg_music
    }), this.data.member) this.startProgressListener(); else if (1 != this.data.pay_status || this.data.mypay) this.startProgressListener(); else if (this.timeId > this.data.currentStop) {
      if (3 == this.data.datum.article.types && this.data.userInfo.author != this.data.datum.article.author_id) return _function.hint(3, "完成支付继续收听哦^_^!", "温馨提示", function (t) {
        wx.pauseBackgroundAudio({
          success: function (t) {
            a.setData({
              playStatus: 0
            }), a.stopProgressListener();
          },
          fail: function (t) {
            a.setData({
              playStatus: 0
            }), a.stopProgressListener();
          }
        });
      }), !1;
    } else this.startProgressListener();
  },
  onPause: function () {
    this.setData({
      playStatus: 0
    }), this.stopProgressListener();
  },
  onStop: function (t) {
    this.setData({
      playStatus: 0
    }), this.stopProgressListener(), wx.removeStorageSync(playKey), wx.getBackgroundAudioPlayerState({
      success: this.onProgressUpdate
    });
  },
  onUnload: function () {
    3 == this.data.datum.article.types && wx.setStorageSync("music", this.data.datum.article.id),
      this.data.member || 1 != this.data.pay_status || this.data.mypay || 3 == this.data.datum.article.types && this.data.userInfo.author != this.data.datum.article.author_id && wx.stopBackgroundAudio(),
      this.stopProgressListener();
  },
  startProgressListener: function () {
    var t = this, a = function () {
      wx.getBackgroundAudioPlayerState({
        success: t.onProgressUpdate
      });
    };
    this.timeId = setInterval(a, 250), a();
  },
  stopProgressListener: function () {
    clearInterval(this.timeId);
  },
  onProgressUpdate: function (t) {
    var a = this;
    t.currentPosition && this.setData({
      auProVal: t.currentPosition,
      auProMax: t.duration
    }), this.playUrl = t.dataUrl;
    var e = t.currentPosition, i = t.duration, n = Math.floor(e / 60), o = Math.floor(e % 60), s = Math.floor(i / 60), r = Math.floor(i % 60), u = {
      stepTime: (n < 10 ? "0" + n : n) + ":" + (o < 10 ? "0" + o : o),
      durationTime: (s < 10 ? "0" + s : s) + ":" + (r < 10 ? "0" + r : r),
      progress: e / i * 100,
      downloadPercent: t.downloadPercent
    };
    if (0 != t.status && 1 != t.status || (u.playStatus = t.status), this.setData(u),
      0 < e && wx.setNavigationBarTitle({
        title: "文章详情"
      }), !this.data.member && 1 == this.data.pay_status && !this.data.mypay && e > this.data.currentStop && 3 == this.data.datum.article.types && this.data.userInfo.author != this.data.datum.article.author_id) return _function.hint(3, "完成支付继续收听哦^_^!", "温馨提示", function (t) {
        wx.pauseBackgroundAudio({
          success: function (t) {
            a.setData({
              playStatus: 0
            }), a.stopProgressListener();
          },
          fail: function (t) {
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
  onTogglePlayTap: function (t) {
    var a = this;
    if (a.data.playStatus) wx.pauseBackgroundAudio({
      success: a.onPause,
      fail: function (t) {
        wx.showModal({
          content: "暂停失败：" + t.errMsg,
          showCancel: !1
        });
      }
    }); else {
      var e = wx.getStorageSync(playKey);
      a.playUrl != e.path && wx.stopBackgroundAudio(), wx.playBackgroundAudio({
        dataUrl: a.data.datum.article.bg_music,
        complete: a.onPlay
      });
    }
  },
  auProChanging: function (t) {
    var a = this, e = a.data.datum.article;
    if (3 == e.types && parseInt(this.timeId) > parseInt(e.aud_free) && !a.data.is_pay) return _function.hint(1, "完成支付继续收听", 2e3),
      a.onPause(), !1;
    var i = wx.getBackgroundAudioManager();
    a.stopProgressListener();
    var n = parseInt(t.detail.value);
    wx.getBackgroundAudioPlayerState({
      success: function (t) {
        t.currentPosition = n, i.seek(n), a.onProgressUpdate(t);
      },
      fail: function (t) { }
    });
  },
  onReady: function (t) {
    this.audioCtx = wx.createAudioContext("myAudio"), this.videoContext = wx.createVideoContext("myVideo");
  },
  videoPlay: function (t) {
    wx.setNavigationBarTitle({
      title: "视频加载中..."
    });
  },
  videoStop: function (t) {
    var a = t.detail.currentTime;
    if (0 < a && wx.setNavigationBarTitle({
      title: "文章详情"
    }), !this.data.member && 1 == this.data.pay_status && !this.data.mypay && a > this.data.currentStop && this.data.userInfo.author != this.data.datum.article.author_id) return this.videoContext.seek(this.data.currentStop),
      this.videoContext.pause(), _function.hint(3, "完成支付继续观看哦^_^!", "温馨提示", function (t) { }),
      !1;
  },
  onPullDownRefresh: function () {
    this.getDatum(this.data.id), this.comment(this.data.id), wx.stopPullDownRefresh();
  },
  getDatum: function (t) {
    var i = this, n = this;
    _function.request("entry/wxapp/Detail", {
      id: t,
      uid: this.data.userInfo.id,
      openid: this.data.userInfo.openid
    }, "", function (t) {
      if (console.log(t), !t.article.id) return _function.hint(2, "抱歉,该文章已删除,请阅览其他文章吧~", "系统提示", function (t) { }),
        !1;
      t.article.content && 2 != t.article.type && WxParse.wxParse("content", "html", t.article.content, n),
        t.article.description && 2 != t.article.type && WxParse.wxParse("description", "html", t.article.description, n);
      var a = void 0;
      switch (t.article.types) {
        case "3":
          a = t.article.aud_free;
          break;

        case "4":
          a = t.article.ved_free;
      }
      if (i.setData({
        datum: t,
        mypay: t.mypay,
        member: t.member,
        pay_num: t.article.pay_num,
        zan: t.article.zanNum,
        oldzan: t.zan,
        collect: t.collect,
        related: t.related,
        shang_num: t.shang,
        currentStop: a,
        pay_status: 0 < t.article.pay_money ? 1 : 0
      }), 1 == t.pay_free_info) return _function.hint(3, "抱歉,距离上次支付超过免费观看时间请再次支付继续观看哦！", "温馨提示", function (t) { }),
        !1;
      var e = wx.getStorageSync(playKey);
      3 == t.article.types ? 1 == i.data.is_avautoPlay ? t.article.bg_music != e.path && (wx.stopBackgroundAudio(),
        wx.setStorageSync(playKey, {
          id: t.article.id,
          path: t.article.bg_music
        }), wx.playBackgroundAudio({
          dataUrl: t.article.bg_music,
          complete: i.onPlay
        })) : t.article.bg_music != e.path ? (wx.onBackgroundAudioStop(i.onStop), wx.setStorageSync(playKey, {
          id: t.article.id,
          path: t.article.bg_music
        }), wx.playBackgroundAudio({
          dataUrl: t.article.bg_music,
          complete: i.onPlay
        })) : (wx.onBackgroundAudioStop(i.onStop), wx.getBackgroundAudioPlayerState({
          success: function (t) {
            wx.getStorageSync(playKey), i.data.datum.article.bg_music;
            i.startProgressListener();
          }
        })) : (wx.onBackgroundAudioStop(i.onStop), wx.stopBackgroundAudio());
    }, this), this.comment(t);
  },
  detail: function (t) {
    var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.url;
    t.currentTarget.dataset.type;
    _function.request("entry/wxapp/Judge", {
      uid: this.data.userInfo.id,
      id: a,
      author: this.data.userInfo.author
    }, "", function (t) {
      if (0 == t) return _function.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function (t) { }),
        !1;
      wx.redirectTo({
        url: e + "?id=" + a
      });
    }, this);
  },
  comment: function (t) {
    var a = this;
    _function.request("entry/wxapp/DetailComment", {
      id: t,
      openid: this.data.userInfo.openid,
      p: this.data.p,
      pnum: this.data.pnum
    }, "", function (t) {
      a.setData({
        comment: t
      });
    }, this);
  },
  more: function (t) {
    var a = t.currentTarget.dataset.types, e = t.currentTarget.dataset.pid, i = t.currentTarget.dataset.cid;
    wx.navigateTo({
      url: "../art_list/index?types=" + a + "&cid=" + e + "," + i
    });
  },
  pay: function (t) {
    var e = this, a = wx.getStorageSync("fxid"), i = wx.getStorageSync("fx_pay_type");
    this.data.userInfo.fopenid || "scene" != i || _function.request("entry/wxapp/Binding", {
      fxid: a,
      fx_pay_type: i,
      uid: this.data.userInfo.id
    }, "", function (t) { }, this, "POST");
    var n = t.currentTarget.dataset.types, o = t.currentTarget.dataset.money, s = t.currentTarget.dataset.vid;
    a = a == this.data.userInfo.id ? "" : a, _function.request("entry/wxapp/Pay", {
      id: this.data.id,
      author_id: this.data.datum.article.author_id,
      uid: this.data.userInfo.id,
      openid: this.data.userInfo.openid,
      money: o,
      types: n,
      day: t.currentTarget.dataset.day,
      fxid: a,
      fopenid: this.data.userInfo.fopenid,
      vid: s
    }, "", function (t) {
      var a = e;
      1 == t.state ? wx.requestPayment({
        timeStamp: t.timeStamp,
        nonceStr: t.nonceStr,
        package: t.package,
        signType: "MD5",
        paySign: t.paySign,
        success: function (t) {
          a.setData({
            pay_status: 2
          }), a.getDatum(a.data.id, a.data.appoint), 1 == n ? a.setData({
            mypay: a.data.id
          }) : 3 == n && a.setData({
            member: 1
          }), 3 == a.data.datum.article.types && wx.playBackgroundAudio({
            dataUrl: a.data.datum.article.bg_music,
            complete: a.onPlay
          });
        },
        fail: function (t) {
          _function.hint(3, "支付失败^_^!", "网络提示", function (t) { });
        }
      }) : _function.hint(1, "网络错误！", "", function (t) { });
    }, this, "POST");
  },
  zancollect: function (t) {
    var a = this, e = t.currentTarget.dataset.types;
    _function.request("entry/wxapp/Zancollect", {
      id: this.data.id,
      openid: this.data.userInfo.openid,
      types: e
    }, "", function (t) {
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
  collect: function () {
    var a = this;
    _function.request("entry/wxapp/Collect", {
      id: this.data.id
    }, "", function (t) {
      a.setData({
        zan: parseInt(a.data.zan) + 1
      });
    }, this);
  },
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.datum.article.tel
    });
  },
  zan: function (t) {
    var i = this, n = t.currentTarget.dataset.id;
    _function.request("entry/wxapp/Zan", {
      id: n,
      aid: this.data.id,
      openid: this.data.userInfo.openid
    }, "", function (t) {
      if (0 != t) {
        var a = i.data.comment;
        for (var e in a) a[e].id == n && (0 == t.type ? (a[e].zan = 0, a[e].zannum = parseInt(a[e].zannum) - 1) : (a[e].zan = 1,
          a[e].zannum = parseInt(a[e].zannum) + 1));
        i.setData({
          comment: a
        });
      } else _function.hint(1, "网络错误^_^!", 2e3, function (t) { });
      i.setData({
        comzan: t,
        comid: n
      });
    }, this);
  },
  continues: function (t) {
    this.setData({
      continues: !this.data.continues,
      iosRead: 0
    });
  },
  become: function (t) {
    this.setData({
      become: !this.data.become
    });
  },
  tk: function (t) {
    this.setData({
      tk: !this.data.tk
    });
  },
  shang: function (t) {
    if (1 == app.globalData.MobileSystem) return _function.hint(3, "请切换至安卓(Android)系统，继续体验该功能", "温馨提示", function (t) { }),
      !1;
    if (this.data.datum.article.author_id <= 0) return _function.hint(3, "对不起，当前文章没有选定作者，不能打赏", "温馨提示", function (t) { }),
      !1;
    var a = "?shang_num=" + this.data.shang_num + "&id=" + this.data.id + "&author_id=" + this.data.datum.article.author_id;
    _function.jump(1, "/sis_shiyi/pages/newcms/shang/shang" + a);
  },
  shangSubmit: function (t) {
    var e = this, a = t.detail.value.shang_money;
    if ("" == a) return _function.hint(3, "对不起，请输入打赏金额^_^!", "温馨提示", function (t) { }),
      !1;
    _function.request("entry/wxapp/Shang", {
      id: this.data.id,
      shang_money: a,
      uid: this.data.userInfo.id,
      openid: this.data.userInfo.openid,
      avatar: this.data.userInfo.avatar,
      author_id: this.data.datum.article.author_id
    }, "", function (t) {
      if (1 == t.state) {
        var a = e;
        wx.requestPayment({
          timeStamp: t.timeStamp,
          nonceStr: t.nonceStr,
          package: t.package,
          signType: "MD5",
          paySign: t.paySign,
          success: function (t) {
            _function.hint(3, "打赏成功^_^!", "温馨提示！", function (t) {
              a.setData({
                shang: !a.data.shang
              });
            }), _function.request("entry/wxapp/Detail", {
              id: a.data.id,
              types: "shang"
            }, "", function (t) {
              a.setData({
                shang_num: t
              });
            }, this);
          },
          fail: function (t) {
            _function.hint(3, "打赏失败^_^!", "网络提示", function (t) {
              a.setData({
                shang: !a.data.shang
              });
            });
          }
        });
      } else _function.hint(3, "网络错误，请稍后重试—_—!", "温馨提示！", function (t) {
        e.setData({
          shang: !e.data.shang
        });
      });
    }, this);
  },
  formSubmit: function (t) {
    var a = this, e = t.detail.value.content, i = t.detail.formId;
    if ("" == e) return _function.hint(3, "对不起，请输入留言内容^_^!", "温馨提示", function (t) { }),
      !1;
    _function.request("entry/wxapp/Message", {
      msgsh: app.globalData.msgsh,
      id: this.data.id,
      content: e,
      openid: this.data.userInfo.openid,
      uid: this.data.userInfo.id,
      nickname: this.data.userInfo.nickname,
      avatar: this.data.userInfo.avatar,
      formId: i
    }, "", function (t) {
      1 == t ? _function.hint(3, "评论成功^_^!", "温馨提示！", function (t) {
        a.setData({
          tk: !a.data.tk
        }), a.onPullDownRefresh();
      }) : _function.hint(3, "网络错误，请稍后评论—_—!", "温馨提示！", function (t) {
        a.setData({
          tk: !a.data.tk
        });
      });
    }, this);
  },
  index: function () {
    wx.redirectTo({
      url: "../index/index"
    });
  },
  report_tan: function () {
    this.setData({
      report_tan: !this.data.report_tan,
      radio_value: 0
    });
  },
  report: function (t) {
    this.setData({
      radio_value: t.detail.value
    });
  },
  report_submit: function (t) {
    var a = this, e = t.detail.value.radio_content;
    if (0 == this.data.radio_value) return _function.hint(1, "请选择建议类型", 2e3), !1;
    _function.request("entry/wxapp/Report", {
      radio_content: e,
      types: this.data.radio_value,
      a_id: this.data.id,
      u_id: this.data.userInfo.id,
      nickname: this.data.userInfo.nickname,
      avatar: this.data.userInfo.avatar
    }, "", function (t) {
      a.report_tan(), _function.hint(3, "建议成功，我们会尽快核实处理您的建议内容！", "温馨提示！", function (t) { });
    }, this, "POST");
  },
  onShareAppMessage: function () {
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
  iosread: function () {
    this.setData({
      iosRead: !this.data.iosRead
    });
  },
  ocposter: function (t) {
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
      success: function (t) {
        wx.setNavigationBarTitle({
          title: "文章海报"
        }), a.setData({
          rpx: t.windowWidth / 375,
          none: "1",
          posterView: !a.data.posterView
        }), setTimeout(function () {
          a.getDetailPos();
        }, 1e3);
      },
      fail: function () {
        wx.hideLoading(), setTimeout(function () {
          wx.showToast({
            title: "亲！出错了,请重试",
            icon: "none",
            duration: 1800,
            complete: function (t) {
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
  getDetailPos: function (t) {
    var i = this;
    wx.showLoading({
      title: "资源下载中..."
    }), setTimeout(function () {
      _function.request("entry/wxapp/getArtDetPoster", {
        art_id: i.data.id,
        uid: i.data.userInfo.id
      }, "", function (a) {
        if (1 == a.code) {
          var e = [];
          e.url = i.data.datum.article.thumb;
          var t = e.url.split(":");
          "http" == t[0] && (e.url = "https:" + t[1]), wx.downloadFile({
            url: e.url,
            success: function (t) {
              200 === t.statusCode ? (wx.getImageInfo({
                src: e.url,
                success: function (t) {
                  e.scale = t.height / t.width;
                },
                fail: function (t) {
                  e.scale = 1;
                }
              }), e.tmpPath = t.tempFilePath) : e.tmpPath = "";
            },
            fail: function (t) {
              e.tmpPath = "";
            },
            complete: function (t) {
              wx.showLoading({
                title: "海报生成中..."
              }), setTimeout(function () {
                i.createPosterImg(a, e);
              }, 800);
            }
          });
        } else wx.hideLoading(), setTimeout(function () {
          return _function.hint(3, "对不起," + a.message, 请使用右上角转发操作, "温馨提示", function (t) { }),
            !1;
        }, 500);
      }, i);
    }, 1e3);
  },
  createPosterImg: function (C, R) {
    var K = this, N = K.data.datum.article, j = K.data.windowWidth / 2 * K.data.rpx, O = K.data.windowHeight / 2 * K.data.rpx, W = wx.createCanvasContext("artPosterImg");
    wx.getImageInfo({
      src: C.po_img,
      success: function (t) {
        W.fillStyle = "#FFFFFF", W.fillRect(0, 0, j, O), W.setFontSize(16), W.setFillStyle("#333333");
        var a = Math.floor(.05 * O) + 20, e = Math.floor(.07 * j), i = a - Math.floor(.02 * O) - 33, n = Math.floor(.18 * j), o = .1 * O;
        W.drawImage("../../../resource/images/artposter/zhuangshi.png", e, i, n, o);
        var s = N.title;
        W.measureText(s).width >= j - .5 * j && (s = s.substr(0, 10) + " ..."), W.fillText(s, e, a),
          W.setFontSize(11), W.setFillStyle("#333333");
        var r = a + 30, u = N.ccate1 ? "/" + N.ccate1 : "", d = N.author + " " + N.pcate1 + u;
        W.measureText(d).width >= .5 * j && (d = N.author, W.measureText(d).width >= .5 * j && (d = N.pcate1 + "/" + N.ccate1),
          W.measureText(d).width >= .5 * j && (d = "")), W.fillText(d, e, r), W.fillText(N.createtime, .65 * j, r);
        var c, l = r + 15;
        W.setFontSize(14);
        var p = Math.floor(.73 * j), f = e, h = l, g = f + p, m = h + Math.floor(4 * p / 16);
        if (m > Math.floor(.4 * O) && (m = Math.floor(.4 * O)), W.setFillStyle("#e9e9e9"),
          W.fillRect(f + 4, h + 4, g + 6, m + 4), "" != R.tmpPath ? W.drawImage(R.tmpPath, f, h, g, m) : (W.setFillStyle("#a6a6a6"),
            W.fillRect(f, h, g, m)), 3 == N.types || 4 == N.types) {
          W.setFillStyle("rgba(0,0,0,0.6)"), W.fillRect(f, h, g, m);
          var y = f + (g - f) / 2 - 12, _ = h + (m - h) / 2 + 25;
          W.drawImage("../../../resource/images/artposter/bofang.png", y, _, .14 * j, .14 * j);
        }
        c = l + m + 45;
        W.drawImage("../../../resource/images/artposter/dou_1.png", f, c - 25, .05 * j, .03 * O),
          W.drawImage("../../../resource/images/artposter/dou_2.png", g + 6, Math.floor(.78 * O) - 27, .05 * j, .03 * O),
          W.setFontSize(12), W.setFillStyle("#333333");
        var w = N.description.replace(/<[^>]+>/g, ""), x = Math.floor(.86 * j) - Math.floor(.12 * j), P = w.split("");
        P[0] = "       " + P[0];
        for (var v = "", S = [], I = 0; I < P.length; I++) W.measureText(v).width < x ? v += P[I] : (I-- ,
          S.push(v), v = "");
        S.push(v);
        if (10 < S.length) {
          for (var T = S.slice(0, 10), D = T[9], b = "", k = [], M = 0; M < D.length && W.measureText(b).width < x; M++) b += D[M];
          k.push(b);
          var A = k[0] + "...";
          T.splice(9, 1, A), S = T;
        }
        if (c -= 10, 2 != N.types) {
          if ("" != N.description && "undefined" != N.description && N.description.indexOf("<img") < 0 && N.description.indexOf("<video") < 0) {
            for (var z = [], B = [], L = 0; L < S.length; L++) z[L] = c + 14 * (L + 1), z[L] = 0 == L ? z[L] : z[L] + 5 * L,
              B.push(S[L]), parseInt(z[L]) > parseInt(Math.floor(.78 * O) - 30) && B.pop();
            B[B.length - 1] = B[B.length - 1] + "...", z = z.slice(0, [B.length]);
            for (var F = 0; F < B.length; F++) F == B.length - 1 && (B[F] = B[F].substr(0, 13) + "..."),
              W.fillText(B[F], Math.floor(.1 * j), z[F]);
          }
        } else W.fillText("", Math.floor(.1 * j), c + 16);
        e = 0, i = Math.floor(.78 * O), n = j, o = O - i;
        W.drawImage("../../../resource/images/artposter/buttom_bg.png", e, i, n, o);
        var q = t.path;
        e = Math.floor(.68 * j), i = Math.floor(.8 * O), n = Math.floor(.25 * j), o = .15 * O;
        W.drawImage(q, e, i, n, o), W.setFillStyle("#f2f2f2");
        e = Math.floor(.65 * j), i = Math.floor(.82 * O), n = Math.floor(.25 * j), o = .15 * O;
        var V = C.dg_article_title;
        W.setFontSize(16);
        var U = i + o / 3 + 10;
        W.fillText(V, Math.floor(.07 * j), U), W.draw(!0, setTimeout(function () {
          K.cPosImg();
        }, 1e3));
      },
      fail: function (t) {
        wx.hideLoading(), wx.showModal({
          title: "温馨提示",
          content: "出错了！请重试!",
          complete: function (t) {
            return K.setData({
              posterView: !K.data.posterView,
              none: 0
            }), !1;
          }
        });
      }
    });
  },
  cPosImg: function () {
    var a = this;
    wx.showLoading({
      title: "路径生成中..."
    }), setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: "artPosterImg",
        success: function (t) {
          wx.showToast({
            title: "海报创建成功！",
            icon: "success",
            duration: 1e3
          }), setTimeout(function () {
            a.setData({
              posterLinshiPath: t.tempFilePath,
              posSucc: !0
            });
          }, 1e3);
        },
        fail: function (t) {
          wx.hideLoading(), setTimeout(function () {
            wx.showModal({
              title: "温馨提示",
              content: "对不起，海报临时路径生成失败，不能下载，请重试",
              complete: function (t) {
                return a.setData({
                  posterView: !a.data.posterView,
                  none: 0
                }), !1;
              }
            });
          }, 500);
        }
      });
    }, 800);
  },
  yulanposter: function (t) {
    var a = this.data.posterLinshiPath, e = [];
    e[0] = a, wx.previewImage({
      current: a,
      urls: e,
      fail: function (t) {
        wx.showToast({
          title: "出错了！",
          icon: "none",
          duration: 1500
        });
      }
    });
  },
  isSaveToAblum: function () {
    var a = this;
    wx.getSetting({
      success: function (t) {
        t.authSetting["scope.writePhotosAlbum"] ? a.savePosImgToAblum() : wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: function () {
            a.savePosImgToAblum();
          },
          fail: function () {
            wx.showModal({
              title: "温馨提示",
              content: "前往个人中心,授权'保存到相册'权限后重试",
              complete: function (t) {
                return a.setData({
                  posterView: !a.data.posterView,
                  none: 0
                }), !1;
              }
            });
          }
        });
      }
    });
  },
  savePosImgToAblum: function () {
    var a = this, t = a.data.posterLinshiPath;
    wx.saveImageToPhotosAlbum({
      filePath: t,
      success: function (t) {
        wx.showToast({
          title: "保存成功，请在相册中查看",
          icon: "none",
          duration: 1800,
          complete: function (t) {
            return a.setData({
              posterView: !a.data.posterView,
              none: 0
            }), !1;
          }
        });
      },
      fail: function (t) {
        wx.showToast({
          title: "保存失败,请重试",
          icon: "none",
          duration: 1800,
          complete: function (t) {
            return a.setData({
              posterView: !a.data.posterView,
              none: 0
            }), !1;
          }
        });
      }
    });
  }
});