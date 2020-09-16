var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

(function() {
    function n(a) {
        return function(n, t, r, e) {
            t = m(t, e, 4);
            var u = !j(n) && g.keys(n), i = (u || n).length, o = 0 < a ? 0 : i - 1;
            return arguments.length < 3 && (r = n[u ? u[o] : o], o += a), function(n, t, r, e, u, i) {
                for (;0 <= u && u < i; u += a) {
                    var o = e ? e[u] : u;
                    r = t(r, n[o], o, n);
                }
                return r;
            }(n, t, r, u, o, i);
        };
    }
    function t(i) {
        return function(n, t, r) {
            t = b(t, r);
            for (var e = null != n && n.length, u = 0 < i ? 0 : e - 1; 0 <= u && u < e; u += i) if (t(n[u], u, n)) return u;
            return -1;
        };
    }
    function e(n, t) {
        var r = S.length, e = n.constructor, u = g.isFunction(e) && e.prototype || o, i = "constructor";
        for (g.has(n, i) && !g.contains(t, i) && t.push(i); r--; ) (i = S[r]) in n && n[i] !== u[i] && !g.contains(t, i) && t.push(i);
    }
    var r = this || {}, u = r._, i = Array.prototype, o = Object.prototype, a = Function.prototype, c = i.push, f = i.slice, p = o.toString, l = o.hasOwnProperty, s = Array.isArray, h = Object.keys, v = a.bind, y = Object.create, d = function() {}, g = function n(t) {
        return t instanceof n ? t : this instanceof n ? void (this._wrapped = t) : new n(t);
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = g), 
    exports._ = g) : r._ = g, g.VERSION = "1.8.2";
    var m = function(u, i, n) {
        if (void 0 === i) return u;
        switch (null == n ? 3 : n) {
          case 1:
            return function(n) {
                return u.call(i, n);
            };

          case 2:
            return function(n, t) {
                return u.call(i, n, t);
            };

          case 3:
            return function(n, t, r) {
                return u.call(i, n, t, r);
            };

          case 4:
            return function(n, t, r, e) {
                return u.call(i, n, t, r, e);
            };
        }
        return function() {
            return u.apply(i, arguments);
        };
    }, b = function(n, t, r) {
        return null == n ? g.identity : g.isFunction(n) ? m(n, t, r) : g.isObject(n) ? g.matcher(n) : g.property(n);
    };
    g.iteratee = function(n, t) {
        return b(n, t, 1 / 0);
    };
    var _ = function(c, f) {
        return function(n) {
            var t = arguments.length;
            if (t < 2 || null == n) return n;
            for (var r = 1; r < t; r++) for (var e = arguments[r], u = c(e), i = u.length, o = 0; o < i; o++) {
                var a = u[o];
                f && void 0 !== n[a] || (n[a] = e[a]);
            }
            return n;
        };
    }, x = Math.pow(2, 53) - 1, j = function(n) {
        var t = n && n.length;
        return "number" == typeof t && 0 <= t && t <= x;
    };
    g.each = g.forEach = function(n, t, r) {
        var e, u;
        if (t = m(t, r), j(n)) for (e = 0, u = n.length; e < u; e++) t(n[e], e, n); else {
            var i = g.keys(n);
            for (e = 0, u = i.length; e < u; e++) t(n[i[e]], i[e], n);
        }
        return n;
    }, g.map = g.collect = function(n, t, r) {
        t = b(t, r);
        for (var e = !j(n) && g.keys(n), u = (e || n).length, i = Array(u), o = 0; o < u; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n);
        }
        return i;
    }, g.reduce = g.foldl = g.inject = n(1), g.reduceRight = g.foldr = n(-1), g.find = g.detect = function(n, t, r) {
        var e;
        return void 0 !== (e = j(n) ? g.findIndex(n, t, r) : g.findKey(n, t, r)) && -1 !== e ? n[e] : void 0;
    }, g.filter = g.select = function(n, e, t) {
        var u = [];
        return e = b(e, t), g.each(n, function(n, t, r) {
            e(n, t, r) && u.push(n);
        }), u;
    }, g.reject = function(n, t, r) {
        return g.filter(n, g.negate(b(t)), r);
    }, g.every = g.all = function(n, t, r) {
        t = b(t, r);
        for (var e = !j(n) && g.keys(n), u = (e || n).length, i = 0; i < u; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n)) return !1;
        }
        return !0;
    }, g.some = g.any = function(n, t, r) {
        t = b(t, r);
        for (var e = !j(n) && g.keys(n), u = (e || n).length, i = 0; i < u; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n)) return !0;
        }
        return !1;
    }, g.contains = g.includes = g.include = function(n, t, r) {
        return j(n) || (n = g.values(n)), 0 <= g.indexOf(n, t, "number" == typeof r && r);
    }, g.invoke = function(n, r) {
        var e = f.call(arguments, 2), u = g.isFunction(r);
        return g.map(n, function(n) {
            var t = u ? r : n[r];
            return null == t ? t : t.apply(n, e);
        });
    }, g.pluck = function(n, t) {
        return g.map(n, g.property(t));
    }, g.where = function(n, t) {
        return g.filter(n, g.matcher(t));
    }, g.findWhere = function(n, t) {
        return g.find(n, g.matcher(t));
    }, g.max = function(n, e, t) {
        var r, u, i = -1 / 0, o = -1 / 0;
        if (null == e && null != n) for (var a = 0, c = (n = j(n) ? n : g.values(n)).length; a < c; a++) r = n[a], 
        i < r && (i = r); else e = b(e, t), g.each(n, function(n, t, r) {
            u = e(n, t, r), (o < u || u === -1 / 0 && i === -1 / 0) && (i = n, o = u);
        });
        return i;
    }, g.min = function(n, e, t) {
        var r, u, i = 1 / 0, o = 1 / 0;
        if (null == e && null != n) for (var a = 0, c = (n = j(n) ? n : g.values(n)).length; a < c; a++) (r = n[a]) < i && (i = r); else e = b(e, t), 
        g.each(n, function(n, t, r) {
            ((u = e(n, t, r)) < o || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u);
        });
        return i;
    }, g.shuffle = function(n) {
        for (var t, r = j(n) ? n : g.values(n), e = r.length, u = Array(e), i = 0; i < e; i++) (t = g.random(0, i)) !== i && (u[i] = u[t]), 
        u[t] = r[i];
        return u;
    }, g.sample = function(n, t, r) {
        return null == t || r ? (j(n) || (n = g.values(n)), n[g.random(n.length - 1)]) : g.shuffle(n).slice(0, Math.max(0, t));
    }, g.sortBy = function(n, e, t) {
        return e = b(e, t), g.pluck(g.map(n, function(n, t, r) {
            return {
                value: n,
                index: t,
                criteria: e(n, t, r)
            };
        }).sort(function(n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (e < r || void 0 === r) return 1;
                if (r < e || void 0 === e) return -1;
            }
            return n.index - t.index;
        }), "value");
    };
    var w = function(o) {
        return function(e, u, n) {
            var i = {};
            return u = b(u, n), g.each(e, function(n, t) {
                var r = u(n, t, e);
                o(i, n, r);
            }), i;
        };
    };
    g.groupBy = w(function(n, t, r) {
        g.has(n, r) ? n[r].push(t) : n[r] = [ t ];
    }), g.indexBy = w(function(n, t, r) {
        n[r] = t;
    }), g.countBy = w(function(n, t, r) {
        g.has(n, r) ? n[r]++ : n[r] = 1;
    }), g.toArray = function(n) {
        return n ? g.isArray(n) ? f.call(n) : j(n) ? g.map(n, g.identity) : g.values(n) : [];
    }, g.size = function(n) {
        return null == n ? 0 : j(n) ? n.length : g.keys(n).length;
    }, g.partition = function(n, e, t) {
        e = b(e, t);
        var u = [], i = [];
        return g.each(n, function(n, t, r) {
            (e(n, t, r) ? u : i).push(n);
        }), [ u, i ];
    }, g.first = g.head = g.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : g.initial(n, n.length - t);
    }, g.initial = function(n, t, r) {
        return f.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)));
    }, g.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : g.rest(n, Math.max(0, n.length - t));
    }, g.rest = g.tail = g.drop = function(n, t, r) {
        return f.call(n, null == t || r ? 1 : t);
    }, g.compact = function(n) {
        return g.filter(n, g.identity);
    };
    var A = function n(t, r, e, u) {
        for (var i = [], o = 0, a = u || 0, c = t && t.length; a < c; a++) {
            var f = t[a];
            if (j(f) && (g.isArray(f) || g.isArguments(f))) {
                r || (f = n(f, r, e));
                var l = 0, s = f.length;
                for (i.length += s; l < s; ) i[o++] = f[l++];
            } else e || (i[o++] = f);
        }
        return i;
    };
    g.flatten = function(n, t) {
        return A(n, t, !1);
    }, g.without = function(n) {
        return g.difference(n, f.call(arguments, 1));
    }, g.uniq = g.unique = function(n, t, r, e) {
        if (null == n) return [];
        g.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = b(r, e));
        for (var u = [], i = [], o = 0, a = n.length; o < a; o++) {
            var c = n[o], f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? g.contains(i, f) || (i.push(f), u.push(c)) : g.contains(u, c) || u.push(c);
        }
        return u;
    }, g.union = function() {
        return g.uniq(A(arguments, !0, !0));
    }, g.intersection = function(n) {
        if (null == n) return [];
        for (var t = [], r = arguments.length, e = 0, u = n.length; e < u; e++) {
            var i = n[e];
            if (!g.contains(t, i)) {
                for (var o = 1; o < r && g.contains(arguments[o], i); o++) ;
                o === r && t.push(i);
            }
        }
        return t;
    }, g.difference = function(n) {
        var t = A(arguments, !0, !0, 1);
        return g.filter(n, function(n) {
            return !g.contains(t, n);
        });
    }, g.zip = function() {
        return g.unzip(arguments);
    }, g.unzip = function(n) {
        for (var t = n && g.max(n, "length").length || 0, r = Array(t), e = 0; e < t; e++) r[e] = g.pluck(n, e);
        return r;
    }, g.object = function(n, t) {
        for (var r = {}, e = 0, u = n && n.length; e < u; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r;
    }, g.indexOf = function(n, t, r) {
        var e = 0, u = n && n.length;
        if ("number" == typeof r) e = r < 0 ? Math.max(0, u + r) : r; else if (r && u) return n[e = g.sortedIndex(n, t)] === t ? e : -1;
        if (t != t) return g.findIndex(f.call(n, e), g.isNaN);
        for (;e < u; e++) if (n[e] === t) return e;
        return -1;
    }, g.lastIndexOf = function(n, t, r) {
        var e = n ? n.length : 0;
        if ("number" == typeof r && (e = r < 0 ? e + r + 1 : Math.min(e, r + 1)), t != t) return g.findLastIndex(f.call(n, 0, e), g.isNaN);
        for (;0 <= --e; ) if (n[e] === t) return e;
        return -1;
    }, g.findIndex = t(1), g.findLastIndex = t(-1), g.sortedIndex = function(n, t, r, e) {
        for (var u = (r = b(r, e, 1))(t), i = 0, o = n.length; i < o; ) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a;
        }
        return i;
    }, g.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; i < e; i++, 
        n += r) u[i] = n;
        return u;
    };
    var k = function(n, t, r, e, u) {
        if (!(e instanceof t)) return n.apply(r, u);
        var i = function(n) {
            if (!g.isObject(n)) return {};
            if (y) return y(n);
            d.prototype = n;
            var t = new d();
            return d.prototype = null, t;
        }(n.prototype), o = n.apply(i, u);
        return g.isObject(o) ? o : i;
    };
    g.bind = function(t, r) {
        if (v && t.bind === v) return v.apply(t, f.call(arguments, 1));
        if (!g.isFunction(t)) throw new TypeError("Bind must be called on a function");
        var e = f.call(arguments, 2);
        return function n() {
            return k(t, n, r, this, e.concat(f.call(arguments)));
        };
    }, g.partial = function(i) {
        var o = f.call(arguments, 1);
        return function n() {
            for (var t = 0, r = o.length, e = Array(r), u = 0; u < r; u++) e[u] = o[u] === g ? arguments[t++] : o[u];
            for (;t < arguments.length; ) e.push(arguments[t++]);
            return k(i, n, this, this, e);
        };
    }, g.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (e <= 1) throw new Error("bindAll must be passed function names");
        for (t = 1; t < e; t++) n[r = arguments[t]] = g.bind(n[r], n);
        return n;
    }, g.memoize = function(u, i) {
        var n = function n(t) {
            var r = n.cache, e = "" + (i ? i.apply(this, arguments) : t);
            return g.has(r, e) || (r[e] = u.apply(this, arguments)), r[e];
        };
        return n.cache = {}, n;
    }, g.delay = function(n, t) {
        var r = f.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r);
        }, t);
    }, g.defer = g.partial(g.delay, g, 1), g.throttle = function(r, e, u) {
        var i, o, a, c = null, f = 0;
        u || (u = {});
        var l = function() {
            f = !1 === u.leading ? 0 : g.now(), c = null, a = r.apply(i, o), c || (i = o = null);
        };
        return function() {
            var n = g.now();
            f || !1 !== u.leading || (f = n);
            var t = e - (n - f);
            return i = this, o = arguments, t <= 0 || e < t ? (c && (clearTimeout(c), c = null), 
            f = n, a = r.apply(i, o), c || (i = o = null)) : c || !1 === u.trailing || (c = setTimeout(l, t)), 
            a;
        };
    }, g.debounce = function(r, e, u) {
        var i, o, a, c, f, t = function n() {
            var t = g.now() - c;
            t < e && 0 <= t ? i = setTimeout(n, e - t) : (i = null, u || (f = r.apply(a, o), 
            i || (a = o = null)));
        };
        return function() {
            a = this, o = arguments, c = g.now();
            var n = u && !i;
            return i || (i = setTimeout(t, e)), n && (f = r.apply(a, o), a = o = null), f;
        };
    }, g.wrap = function(n, t) {
        return g.partial(t, n);
    }, g.negate = function(n) {
        return function() {
            return !n.apply(this, arguments);
        };
    }, g.compose = function() {
        var r = arguments, e = r.length - 1;
        return function() {
            for (var n = e, t = r[e].apply(this, arguments); n--; ) t = r[n].call(this, t);
            return t;
        };
    }, g.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0;
        };
    }, g.before = function(n, t) {
        var r;
        return function() {
            return 0 < --n && (r = t.apply(this, arguments)), n <= 1 && (t = null), r;
        };
    }, g.once = g.partial(g.before, 2);
    var O = !{
        toString: null
    }.propertyIsEnumerable("toString"), S = [ "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ];
    g.keys = function(n) {
        if (!g.isObject(n)) return [];
        if (h) return h(n);
        var t = [];
        for (var r in n) g.has(n, r) && t.push(r);
        return O && e(n, t), t;
    }, g.allKeys = function(n) {
        if (!g.isObject(n)) return [];
        var t = [];
        for (var r in n) t.push(r);
        return O && e(n, t), t;
    }, g.values = function(n) {
        for (var t = g.keys(n), r = t.length, e = Array(r), u = 0; u < r; u++) e[u] = n[t[u]];
        return e;
    }, g.mapObject = function(n, t, r) {
        t = b(t, r);
        for (var e, u = g.keys(n), i = u.length, o = {}, a = 0; a < i; a++) o[e = u[a]] = t(n[e], e, n);
        return o;
    }, g.pairs = function(n) {
        for (var t = g.keys(n), r = t.length, e = Array(r), u = 0; u < r; u++) e[u] = [ t[u], n[t[u]] ];
        return e;
    }, g.invert = function(n) {
        for (var t = {}, r = g.keys(n), e = 0, u = r.length; e < u; e++) t[n[r[e]]] = r[e];
        return t;
    }, g.functions = g.methods = function(n) {
        var t = [];
        for (var r in n) g.isFunction(n[r]) && t.push(r);
        return t.sort();
    }, g.extend = _(g.allKeys), g.extendOwn = g.assign = _(g.keys), g.findKey = function(n, t, r) {
        t = b(t, r);
        for (var e, u = g.keys(n), i = 0, o = u.length; i < o; i++) if (t(n[e = u[i]], e, n)) return e;
    }, g.pick = function(n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o) return i;
        g.isFunction(t) ? (u = g.allKeys(o), e = m(t, r)) : (u = A(arguments, !1, !1, 1), 
        e = function(n, t, r) {
            return t in r;
        }, o = Object(o));
        for (var a = 0, c = u.length; a < c; a++) {
            var f = u[a], l = o[f];
            e(l, f, o) && (i[f] = l);
        }
        return i;
    }, g.omit = function(n, t, r) {
        if (g.isFunction(t)) t = g.negate(t); else {
            var e = g.map(A(arguments, !1, !1, 1), String);
            t = function(n, t) {
                return !g.contains(e, t);
            };
        }
        return g.pick(n, t, r);
    }, g.defaults = _(g.allKeys, !0), g.clone = function(n) {
        return g.isObject(n) ? g.isArray(n) ? n.slice() : g.extend({}, n) : n;
    }, g.tap = function(n, t) {
        return t(n), n;
    }, g.isMatch = function(n, t) {
        var r = g.keys(t), e = r.length;
        if (null == n) return !e;
        for (var u = Object(n), i = 0; i < e; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u)) return !1;
        }
        return !0;
    };
    g.isEqual = function(n, t) {
        return function n(t, r, e, u) {
            if (t === r) return 0 !== t || 1 / t == 1 / r;
            if (null == t || null == r) return t === r;
            t instanceof g && (t = t._wrapped), r instanceof g && (r = r._wrapped);
            var i = p.call(t);
            if (i !== p.call(r)) return !1;
            switch (i) {
              case "[object RegExp]":
              case "[object String]":
                return "" + t == "" + r;

              case "[object Number]":
                return +t != +t ? +r != +r : 0 == +t ? 1 / +t == 1 / r : +t == +r;

              case "[object Date]":
              case "[object Boolean]":
                return +t == +r;
            }
            var o = "[object Array]" === i;
            if (!o) {
                if ("object" != (void 0 === t ? "undefined" : _typeof(t)) || "object" != (void 0 === r ? "undefined" : _typeof(r))) return !1;
                var a = t.constructor, c = r.constructor;
                if (a !== c && !(g.isFunction(a) && a instanceof a && g.isFunction(c) && c instanceof c) && "constructor" in t && "constructor" in r) return !1;
            }
            u = u || [];
            for (var f = (e = e || []).length; f--; ) if (e[f] === t) return u[f] === r;
            if (e.push(t), u.push(r), o) {
                if ((f = t.length) !== r.length) return !1;
                for (;f--; ) if (!n(t[f], r[f], e, u)) return !1;
            } else {
                var l, s = g.keys(t);
                if (f = s.length, g.keys(r).length !== f) return !1;
                for (;f--; ) if (l = s[f], !g.has(r, l) || !n(t[l], r[l], e, u)) return !1;
            }
            return e.pop(), u.pop(), !0;
        }(n, t);
    }, g.isEmpty = function(n) {
        return null == n || (j(n) && (g.isArray(n) || g.isString(n) || g.isArguments(n)) ? 0 === n.length : 0 === g.keys(n).length);
    }, g.isElement = function(n) {
        return !(!n || 1 !== n.nodeType);
    }, g.isArray = s || function(n) {
        return "[object Array]" === p.call(n);
    }, g.isObject = function(n) {
        var t = void 0 === n ? "undefined" : _typeof(n);
        return "function" === t || "object" === t && !!n;
    }, g.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(t) {
        g["is" + t] = function(n) {
            return p.call(n) === "[object " + t + "]";
        };
    }), g.isArguments(arguments) || (g.isArguments = function(n) {
        return g.has(n, "callee");
    }), "function" != typeof /./ && "object" != ("undefined" == typeof Int8Array ? "undefined" : _typeof(Int8Array)) && (g.isFunction = function(n) {
        return "function" == typeof n || !1;
    }), g.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n));
    }, g.isNaN = function(n) {
        return g.isNumber(n) && n !== +n;
    }, g.isBoolean = function(n) {
        return !0 === n || !1 === n || "[object Boolean]" === p.call(n);
    }, g.isNull = function(n) {
        return null === n;
    }, g.isUndefined = function(n) {
        return void 0 === n;
    }, g.has = function(n, t) {
        return null != n && l.call(n, t);
    }, g.noConflict = function() {
        return r._ = u, this;
    }, g.identity = function(n) {
        return n;
    }, g.constant = function(n) {
        return function() {
            return n;
        };
    }, g.noop = function() {}, g.property = function(t) {
        return function(n) {
            return null == n ? void 0 : n[t];
        };
    }, g.propertyOf = function(t) {
        return null == t ? function() {} : function(n) {
            return t[n];
        };
    }, g.matcher = g.matches = function(t) {
        return t = g.extendOwn({}, t), function(n) {
            return g.isMatch(n, t);
        };
    }, g.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = m(t, r, 1);
        for (var u = 0; u < n; u++) e[u] = t(u);
        return e;
    }, g.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
    }, g.now = Date.now || function() {
        return new Date().getTime();
    };
    var F = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, E = g.invert(F), I = function(t) {
        var r = function(n) {
            return t[n];
        }, n = "(?:" + g.keys(t).join("|") + ")", e = RegExp(n), u = RegExp(n, "g");
        return function(n) {
            return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, r) : n;
        };
    };
    g.escape = I(F), g.unescape = I(E), g.result = function(n, t, r) {
        var e = null == n ? void 0 : n[t];
        return void 0 === e && (e = r), g.isFunction(e) ? e.call(n) : e;
    };
    var M = 0;
    g.uniqueId = function(n) {
        var t = ++M + "";
        return n ? n + t : t;
    }, g.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var N = /(.)^/, B = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, T = /\\|'|\r|\n|\u2028|\u2029/g, R = function(n) {
        return "\\" + B[n];
    };
    g.template = function(i, n, t) {
        !n && t && (n = t), n = g.defaults({}, n, g.templateSettings);
        var r = RegExp([ (n.escape || N).source, (n.interpolate || N).source, (n.evaluate || N).source ].join("|") + "|$", "g"), o = 0, a = "__p+='";
        i.replace(r, function(n, t, r, e, u) {
            return a += i.slice(o, u).replace(T, R), o = u + n.length, t ? a += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'" : r ? a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : e && (a += "';\n" + e + "\n__p+='"), 
            n;
        }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            var e = new Function(n.variable || "obj", "_", a);
        } catch (n) {
            throw n.source = a, n;
        }
        var u = function(n) {
            return e.call(this, n, g);
        }, c = n.variable || "obj";
        return u.source = "function(" + c + "){\n" + a + "}", u;
    }, g.chain = function(n) {
        var t = g(n);
        return t._chain = !0, t;
    };
    var q = function(n, t) {
        return n._chain ? g(t).chain() : t;
    };
    g.mixin = function(r) {
        g.each(g.functions(r), function(n) {
            var t = g[n] = r[n];
            g.prototype[n] = function() {
                var n = [ this._wrapped ];
                return c.apply(n, arguments), q(this, t.apply(g, n));
            };
        });
    }, g.mixin(g), g.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(t) {
        var r = i[t];
        g.prototype[t] = function() {
            var n = this._wrapped;
            return r.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], 
            q(this, n);
        };
    }), g.each([ "concat", "join", "slice" ], function(n) {
        var t = i[n];
        g.prototype[n] = function() {
            return q(this, t.apply(this._wrapped, arguments));
        };
    }), g.prototype.value = function() {
        return this._wrapped;
    }, g.prototype.valueOf = g.prototype.toJSON = g.prototype.value, g.prototype.toString = function() {
        return "" + this._wrapped;
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return g;
    });
}).call(void 0);