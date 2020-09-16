var _util = require("../util"), _DuoguanData = require("../data.js"), API = _DuoguanData.duoguan_host_api_url + "/index.php/addon/DuoguanShop/Region/getList.html?data=", selectArea = {
    addDot: function(e) {
        e instanceof Array && e.map(function(e) {
            return 4 < e.fullName.length ? e.fullNameDot = e.fullName.slice(0, 4) + "..." : e.fullNameDot = e.fullName, 
            e;
        });
    },
    load: function(a, e) {
        a.setData({
            isShow: !1,
            showDistrict: !0
        }), e && !e.showDistrict && a.setData({
            showDistrict: !1
        }), (0, _util.Promise)(wx.request, {
            url: API + "0",
            method: "GET"
        }).then(function(e) {
            var t = e.data.result[0];
            return selectArea.addDot(e.data.result), a.setData({
                proviceData: e.data.result,
                "selectedProvince.index": 0,
                "selectedProvince.code": t.code,
                "selectedProvince.fullName": t.fullName
            }), (0, _util.Promise)(wx.request, {
                url: API + t.code,
                method: "GET"
            });
        }).then(function(e) {
            var t = e.data.result[0];
            return selectArea.addDot(e.data.result), a.setData({
                cityData: e.data.result,
                "selectedCity.index": 0,
                "selectedCity.code": t.code,
                "selectedCity.fullName": t.fullName
            }), a.data.showDistrict ? (0, _util.Promise)(wx.request, {
                url: API + t.code,
                method: "GET"
            }) : void 0;
        }).then(function(e) {
            var t = e.data.result[0];
            selectArea.addDot(e.data.result), a.setData({
                districtData: e.data.result,
                "selectedDistrict.index": 0,
                "selectedDistrict.code": t.code,
                "selectedDistrict.fullName": t.fullName
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    tapProvince: function(e, t) {
        var a = e.currentTarget.dataset;
        (0, _util.Promise)(wx.request, {
            url: API + a.code,
            method: "GET"
        }).then(function(e) {
            if (e.data.result) return selectArea.addDot(e.data.result), t.setData({
                cityData: e.data.result,
                "selectedProvince.code": a.code,
                "selectedProvince.fullName": a.fullName,
                "selectedCity.code": e.data.result[0].code,
                "selectedCity.fullName": e.data.result[0].fullName
            }), t.data.showDistrict ? (0, _util.Promise)(wx.request, {
                url: API + e.data.result[0].code,
                method: "GET"
            }) : void t.setData({
                "selectedProvince.index": a.index,
                "selectedCity.index": 0
            });
            t.setData({
                cityData: [],
                "selectedProvince.code": a.code,
                "selectedProvince.fullName": a.fullName
            });
        }).then(function(e) {
            e.data.result ? (selectArea.addDot(e.data.result), t.setData({
                districtData: e.data.result,
                "selectedProvince.index": a.index,
                "selectedCity.index": 0,
                "selectedDistrict.index": 0,
                "selectedDistrict.code": e.data.result[0].code,
                "selectedDistrict.fullName": e.data.result[0].fullName
            })) : t.setData({
                districtData: [],
                "selectedProvince.index": a.index
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    tapCity: function(e, t) {
        var a = e.currentTarget.dataset;
        t.data.showDistrict ? (0, _util.Promise)(wx.request, {
            url: API + a.code,
            method: "GET"
        }).then(function(e) {
            e.data.result ? (selectArea.addDot(e.data.result), t.setData({
                districtData: e.data.result,
                "selectedCity.index": a.index,
                "selectedCity.code": a.code,
                "selectedCity.fullName": a.fullName,
                "selectedDistrict.index": 0,
                "selectedDistrict.code": e.data.result[0].code,
                "selectedDistrict.fullName": e.data.result[0].fullName
            })) : t.setData({
                districtData: [],
                "selectedCity.index": a.index,
                "selectedCity.code": a.code,
                "selectedCity.fullName": a.fullName,
                "selectedDistrict.index": 0,
                "selectedDistrict.code": "",
                "selectedDistrict.fullName": ""
            });
        }).catch(function(e) {
            console.log(e);
        }) : t.setData({
            "selectedCity.index": a.index,
            "selectedCity.code": a.code,
            "selectedCity.fullName": a.fullName
        });
    },
    tapDistrict: function(e, t) {
        var a = e.currentTarget.dataset;
        t.setData({
            "selectedDistrict.index": e.currentTarget.dataset.index,
            "selectedDistrict.code": a.code,
            "selectedDistrict.fullName": a.fullName
        });
    },
    confirm: function(e, t) {
        t.setData({
            address: t.data.showDistrict ? t.data.selectedProvince.fullName + " " + t.data.selectedCity.fullName + " " + t.data.selectedDistrict.fullName : t.data.selectedProvince.fullName + " " + t.data.selectedCity.fullName,
            isShow: !1,
            selectedCode: t.data.showDistrict ? t.data.selectedDistrict.code : t.data.selectedCity.code
        });
    },
    cancel: function(e) {
        e.setData({
            isShow: !1
        });
    },
    choosearea: function(e) {
        e.setData({
            isShow: !0
        });
    }
};

module.exports = {
    SA: selectArea
};