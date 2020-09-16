var app = getApp(), util = require("../../../resource/js/util.js"), $ = require("../../../resource/utils/underscore"), WxParse = require("../../../resource/wxParse/wxParse.js"), _function = require("../../../resource/function/function.js");

Page({
    data: {
        cardCur: 0,
        cardCur1: 0,
        datum: [],
        uid: 0,
        tk: !1,
        title: "",
        is_pay: !1,
        nav: [],
        music: 0,
        wxapp_article_newtitle: "",
        wxapp_article_hottitle: "",
        wxapp_serialize_newtitle: "",
        ios: ""
    },
    onLoad: function(t) {
        console.log("--e---index---:", t), _function.getMobleInfo(), this.setData({
            ios: app.globalData.MobileSystem
        }), _function.system(this, 1);
        var e = decodeURIComponent(t.scene);
        if (console.log("scene: ", e), -1 != e.indexOf("&")) {
            var a = e.split("&");
            wx.setStorageSync("fxid", a[0]), wx.setStorageSync("fx_pay_type", "scene"), wx.reLaunch({
                url: "/sis_shiyi/pages/newcms/detail/index?id=" + a[1] + "&fxid=" + a[0] + "&fxtype=fx"
            });
        }
        "undefined" != e ? (wx.setStorageSync("fxid", e), wx.setStorageSync("fx_pay_type", "scene")) : t.fxid && t.fxtype && (wx.setStorageSync("fxid", t.fxid), 
        wx.setStorageSync("fx_pay_type", "share")), this.getDatum();
        var i = wx.getStorageSync("music");
        this.setData({
            music: i
        });
    },
    onPullDownRefresh: function() {
        this.getDatum(), wx.stopPullDownRefresh();
    },
    getDatum: function() {
        var a = this;
        _function.request("entry/wxapp/Index", {}, "", function(t) {
            if (app.globalData.msgsh = t.modules.msgsh, app.globalData.artsh = t.modules.artsh, 
            app.globalData.vipCon = t.modules.vipCon, console.log(t), a.setData({
                datum: t
            }), t.modules) {
                wx.setStorageSync("is_pay", t.modules.is_pay);
                var e = wx.getStorageSync("is_pay");
                a.setData({
                    is_pay: 1 == e
                }), a.setData({
                    wxapp_article_newtitle: t.modules.wxapp_article_newtitle
                }), a.setData({
                    wxapp_article_hottitle: t.modules.wxapp_article_hottitle
                }), a.setData({
                    wxapp_serialize_newtitle: t.modules.wxapp_serialize_newtitle
                });
            }
        }, this, "POST");
    },
    swiper: function(t) {
        var e = t.currentTarget.dataset.appid, a = t.currentTarget.dataset.urlone.indexOf("http");
        if (e) return wx.navigateToMiniProgram({
            appId: e,
            path: t.currentTarget.dataset.url
        }), !1;
        wx.getStorageSync("userInfo") || _function.getUserinfo(this), -1 == a ? wx.navigateTo({
            url: t.currentTarget.dataset.urlone
        }) : wx.navigateTo({
            url: "../outside/index?url=" + t.currentTarget.dataset.urlone
        });
    },
    detail: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.authorid, i = t.currentTarget.dataset.url, r = t.currentTarget.dataset.type;
        "music" == r && (e = wx.getStorageSync("music"));
        var n = wx.getStorageSync("userInfo");
        n ? (this.setData({
            uid: n.id
        }), this.detailTwo(e, i, r, n.id, a)) : _function.getUserinfo(this);
    },
    detailTwo: function(e, a, t, i, r) {
        if (2 == t) wx.navigateTo({
            url: a + "?id=" + e
        }); else {
            var n = wx.getStorageSync("userInfo");
            _function.request("entry/wxapp/Judge", {
                uid: i,
                id: e
            }, "", function(t) {
                0 == t && n.author != r ? _function.hint(3, "抱歉,该文章仅限指定分组用户阅览^_^!", "温馨提示", function(t) {}) : wx.navigateTo({
                    url: a + "?id=" + e
                });
            }, this);
        }
    },
    more: function(t) {
        var e = t.currentTarget.dataset.types, a = t.currentTarget.dataset.url, i = t.currentTarget.dataset.appid, r = t.currentTarget.dataset.path, n = wx.getStorageSync("userInfo");
        if (i) return wx.navigateToMiniProgram({
            appId: i,
            path: r,
            success: function(t) {
                console.log("打开成功");
            }
        }), !1;
        n ? a || i ? wx.navigateTo({
            url: a
        }) : wx.navigateTo({
            url: "../art_list/index?types=" + e
        }) : _function.getUserinfo(this);
    },
    formSubmit: function(t) {
        var e = t.detail.value.title;
        if ("" == e) return _function.hint(3, "请输入关键词^_^!", "温馨提示", function(t) {}), !1;
        wx.navigateTo({
            url: "../search/index?title=" + e + "&type=1"
        }), this.setData({
            title: ""
        });
    },
    onShareAppMessage: function() {
        var t = wx.getStorageSync("share_title");
        return 0 != this.data.uid ? {
            title: t,
            path: "sis_shiyi/pages/newcms/index/index?fxid=" + this.data.uid + "&fxtype=fx"
        } : {
            title: t,
            path: "sis_shiyi/pages/newcms/index/index"
        };
    },

  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
      // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
});