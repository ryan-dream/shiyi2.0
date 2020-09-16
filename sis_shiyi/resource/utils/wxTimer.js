function GetRTime(e, t) {
    var o = new Date(e), a = new Date(), i = o.getTime() - a.getTime(), s = 0, n = 0, m = 0, u = 0;
    0 <= i ? (s = Math.floor(i / 1e3 / 60 / 60 / 24), n = Math.floor(i / 1e3 / 60 / 60 % 24), 
    m = Math.floor(i / 1e3 / 60 % 60), u = Math.floor(i / 1e3 % 60), t.setData({
        goods_tuan_status: !0,
        shengTime: s + "天" + n + "时" + m + "分" + u + "秒后结束"
    }), setTimeout(function() {
        GetRTime(e, t);
    }, 1e3)) : t.setData({
        goods_tuan_status: !1,
        shengTime: "已结束"
    });
}

function DaojishiTime() {}

module.exports = {
    GetRTime: GetRTime
};