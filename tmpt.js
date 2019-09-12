"use strict";
(localstoreSerive = angular.module("mazii.service.localstore", [])).factory("localstoreServ", [function() {
    var e = {
        setItem: function(e, t) {
            localStorage.setItem(e, angular.toJson(t))
        },
        getItem: function(e) {
            var t = localStorage.getItem(e);
            return angular.fromJson(t)
        },
        deleteItem: function(e) {
            localStorage.removeItem(e)
        },
        clear: function() {
            localStorage.clear()
        }
    };
    return e
}]), (maziiServ = angular.module("mazii.service.note", [])).factory("noteServ", ["$rootScope", "$q", "$http", "$timeout", "$stateParams", "$state", "userServ", "cookieServ", "encryptionServ", function(s, e, i, l, t, n, c, r, o) {
    var a = {},
        u = null,
        d = null,
        m = null;

    function h() {
        d = s.categories
    }

    function g() {
        var e = JSON.stringify(u);
        localStorage.setItem("note", e)
    }

    function p() {
        var e = JSON.stringify(d);
        localStorage.setItem("categoryNote", e)
    }

    function f() {
        var e = JSON.stringify(m);
        localStorage.setItem("grammar", e)
    }
    return a.getNoteItem = function(e, t, n) {
        c.getNote(e, t).then(function(e) {
            n(e)
        })
    }, a.getCategory = function() {
        return null == d && h(), d
    }, a.pushCategory = function(e) {
        if (null != e && "" != e) {
            null == d && h();
            for (var t = -1, n = 0; n < d.length; n++)
                if (d[n].categoryName == e) {
                    t = n;
                    break
                } - 1 != t && d.splice(t, 1);
            var a = {};
            a.categoryName = e, a.date = new Date, null != s.user && c.addCategory(s.user.userId, e, a.date).then(function(e) {
                200 == e.status && (a.categoryId = e.cateId, d.push(a), p())
            })
        }
    }, a.pushGrammar = function(e, t, n, a) {
        if (null != e && "" != e && null != t && "" != t) {
            null == m && function() {
                if (null != m) return;
                var e = localStorage.getItem("grammar");
                null == (m = JSON.parse(e)) && (m = [])
            }();
            var i = -1;
            if (0 < m.length)
                for (var r = 0; r < m.length; r++)
                    if (m[r].category == e && m[r].idx == a) {
                        i = r;
                        break
                    } if (-1 != i) s.alert.notify = "Từ này đã có trong danh sách", $(".notify-current").fadeIn(200), l(function() {
                $(".notify-current").fadeOut(200)
            }, 2e3);
            else {
                var o = {};
                o.category = e, o.date = new Date, o.query = t, o.type = n, o.idx = a, null != s.user && c.addNote({
                    noteName: o.query,
                    noteMean: s.meanMyNote,
                    date: o.date,
                    categoryId: e,
                    type: n,
                    idx: a
                }).then(function(e) {
                    o.id = e.noteId, m.push(o), f()
                })
            }
        }
    }, a.pushNote = function(e, t, n, a) {
        if (null != e && "" != e && null != t && "" != t) {
            null == u && function() {
                if (null != u) return;
                var e = localStorage.getItem("note");
                null == (u = JSON.parse(e)) && (u = [])
            }();
            var i = -1;
            if (0 < u.length)
                for (var r = 0; r < u.length; r++)
                    if (u[r].category == e && u[r].query == t && u[r].type == n && u[r].mean == s.meanMyNote) {
                        i = r;
                        break
                    } if (-1 != i) s.alert.notify = "Từ này đã có trong danh sách", $(".notify-current").fadeIn(200), l(function() {
                $(".notify-current").fadeOut(200)
            }, 2e3);
            else {
                var o = {};
                o.category = e, o.date = new Date, o.query = t, o.mean = s.meanMyNote, o.type = n, null != s.user && c.addNote({
                    noteName: o.query,
                    noteMean: s.meanMyNote,
                    date: o.date,
                    categoryId: e,
                    type: n,
                    idx: a
                }).then(function(e) {
                    o.id = e.noteId, u.push(o), g()
                })
            }
        }
    }, a.removeCategory = function(e, n) {
        null != s.user && c.deleteCategory(s.user.userId, n).then(function() {
            for (var e = -1, t = 0; t < d.length; t++)
                if (d[t].categoryId == n) {
                    e = t;
                    break
                } - 1 != e && d.splice(e, 1)
        })
    }, a.removeNote = function(e) {
        if (null != s.user) return c.deleteNote(e)
    }, a.clearNote = function() {
        u = [], g()
    }, a.clearGrammar = function() {
        m = [], f()
    }, a.clearCategory = function() {
        d = [], p()
    }, a.getListActionUser = function(e, t, n) {
        var a = r.getCookie("tokenId");
        a = o.decode(a);
        i({
            url: "//api.mazii.net/api/action-report-of-user",
            method: "POST",
            data: {
                token: a,
                limit: e,
                page: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.getListWordUser = function(e, t, n) {
        var a = r.getCookie("tokenId");
        a = o.decode(a);
        i({
            url: "//api.mazii.net/api/list-word-of-user",
            method: "POST",
            data: {
                token: a,
                limit: e,
                page: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a
}]), (maziiServ = angular.module("mazii.service.history", [])).factory("historyServ", ["$rootScope", "$q", "$http", "$timeout", "$stateParams", "$state", "cookieServ", "encryptionServ", function(e, t, s, n, a, i, l, c) {
    var r = {},
        u = null;

    function d() {
        if (null != u) return u;
        var e = localStorage.getItem("history");
        return null == (u = JSON.parse(e)) && (u = []), u
    }

    function m() {
        var e = JSON.stringify(u);
        localStorage.setItem("history", e)
    }
    return r.get = function() {
        return null == u && d(), u
    }, r.push = function(e, t) {
        if (null != e && "" != e) {
            null == u && d();
            for (var n = -1, a = 0; a < u.length; a++)
                if (u[a].query == e && u[a].type == t) {
                    n = a;
                    break
                } - 1 != n && u.splice(n, 1);
            var i = 0;
            0 != u.length && (i = u[u.length - 1].id + 1);
            var r = {};
            r.date = new Date, r.query = e, r.type = t, r.id = i, u.push(r), m();
            var o = l.getCookie("tokenId");
            if (o = c.decode(o)) {
                s({
                    url: "//api.mazii.net/api/history/add",
                    method: "POST",
                    data: {
                        tokenId: o,
                        content: e,
                        type: t
                    }
                })
            }
        }
    }, r.remove = function(e) {
        for (var t = -1, n = 0; n < u.length; n++)
            if (u[n].id == e) {
                t = n;
                break
            } - 1 != t && u.splice(t, 1), m()
    }, r.clear = function() {
        u = [], m()
    }, r
}]);
var SERVER_ERROR_CODE = 302,
    SERVER_SUCCESS_CODE = 200,
    baseUrl = "//mazii.net/",
    baseUrl2 = "//api.mazii.net/";
(maziiServ = angular.module("mazii.service.search", ["mazii.service.util"])).factory("maziiServ", ["$rootScope", "$q", "$http", "$timeout", "$stateParams", "$state", "dictUtilSer", function(e, s, l, t, n, a, i) {
    function o(e, t, n, a) {
        var i = new XMLHttpRequest;
        i.open(e, t), i.setRequestHeader("Content-Type", "application/json"), i.onreadystatechange = function() {
            4 === this.readyState && null != this.responseText && null != a && a(JSON.parse(this.responseText))
        }, null != n ? i.send(JSON.stringify(n)) : i.send()
    }
    var c = baseUrl + "api/search/",
        u = baseUrl + "api/refer/",
        d = baseUrl + "api/smile/",
        m = baseUrl + "api/mazii/",
        h = baseUrl + "api/grammar/",
        g = baseUrl + "api/news/",
        p = baseUrl + "api/news/",
        f = baseUrl + "api/jlptgrammar/",
        v = baseUrl + "api/jlptkanji/",
        y = {},
        w = {
            search: function(e, t) {
                var i = "";
                "word" == e ? i = c + t + "/20/1" : "example" == e ? i = d + t : "kanji" == e ? i = m + t + "/10" : "grammar" == e ? i = u + t : "grammar_detail" == e && (i = h + t);
                var r = s.defer();
                return null != y[i] ? r.resolve(y[i]) : l.get(i).success(function(e, t, n, a) {
                    y[i] = e, r.resolve(e)
                }).error(function(e, t, n, a) {
                    r.reject(t)
                }), r.promise
            },
            searchGlobal: function(e, t, n) {
                var a = baseUrl + "api/search",
                    i = {};
                i = "example" == e ? {
                    dict: n,
                    type: e,
                    query: t
                } : "kanji" == e ? {
                    dict: n,
                    type: e,
                    query: t,
                    page: 1
                } : {
                    dict: n,
                    type: e,
                    query: t,
                    limit: 20,
                    page: 1
                };
                var r = a + JSON.stringify(i),
                    o = s.defer();
                return null != y[r] ? o.resolve(y[r]) : l.post(a, i).success(function(e, t, n, a) {
                    null != e ? (y[r] = e, o.resolve(e)) : o.resolve(null)
                }).error(function(e, t, n, a) {
                    o.reject(null)
                }), o.promise
            },
            googleTranslate: function(e, t, n) {
                var a = "//api.mazii.net/api/translate",
                    i = {
                        sl: t,
                        tl: n,
                        query: e
                    },
                    r = a + JSON.stringify(i),
                    o = s.defer();
                return null != y[r] ? o.resolve(y[r]) : l.post(a, i).success(function(e, t, n, a) {
                    null != e ? (y[r] = e, o.resolve(e)) : o.resolve(null)
                }).error(function(e, t, n, a) {
                    o.reject(null)
                }), o.promise
            },
            normalizeCloudQuery: function(e) {
                return i.isVietnamese(e) || i.isJapanese(e) && (e = e.replace(/\s| /g, "")), e
            },
            cloudTranslate: function(i, e, t) {
                var n = "https://cxl-services.appspot.com/proxy?url=",
                    a = "https://translation.googleapis.com/language/translate/v2/?q=" + w.normalizeCloudQuery(i) + "&source=" + e + "&target=" + t,
                    r = n += encodeURIComponent(a),
                    o = s.defer();
                return null != y[r] ? o.resolve(y[r]) : l.get(n).success(function(e, t, n, a) {
                    null != e ? ((y[r] = e) && (e.query = i), o.resolve(e)) : o.resolve(null)
                }).error(function(e, t, n, a) {
                    o.reject(null)
                }), o.promise
            },
            getHeadNews: function(e) {
                null == e && (e = 1);
                var i = s.defer(),
                    r = g + e + "/10";
                return null != y[r] ? i.resolve(y[r]) : l.get(r).success(function(e, t, n, a) {
                    y[r] = e.results, i.resolve(e.results)
                }).error(function(e, t, n, a) {
                    i.reject(null)
                }), i.promise
            },
            getDetailNews: function(e) {
                var i = p + e,
                    r = s.defer();
                return null != y[i] ? r.resolve(y[i]) : l.get(i).success(function(e, t, n, a) {
                    y[i] = e.result, r.resolve(e.result)
                }).error(function(e, t, n, a) {
                    r.reject(null)
                }), r.promise
            },
            queryGrammarJLPT: function(e, t) {
                var i = f + e + "/30/" + t,
                    r = s.defer();
                return null != y[i] ? r.resolve(y[i]) : l.get(i).success(function(e, t, n, a) {
                    e.status == SERVER_ERROR_CODE ? r.resolve(null) : (y[i] = e, r.resolve(e))
                }).error(function(e, t, n, a) {
                    r.reject(null)
                }), r.promise
            },
            queryKanjiJLPT: function(e, t) {
                var i = v + e + "/100/" + t,
                    r = s.defer();
                return null != y[i] ? r.resolve(y[i]) : l.get(i).success(function(e, t, n, a) {
                    e.status == SERVER_ERROR_CODE ? r.resolve(null) : (y[i] = e, r.resolve(e))
                }).error(function(e, t, n, a) {
                    r.reject(null)
                }), r.promise
            }
        };
    w.sendAltLog = function(e) {
        o("POST", "http://alt.mazii.net/ene/log", {
            entity_id: e
        })
    }, w.sendAltNewsLog = function(e) {
        o("POST", "http://alt.mazii.net/ene/news_log", {
            news_id: e
        })
    }, w.sendFeedback = function(e, t, n, a, i, r) {
        o("POST", "http://alt.mazii.net/ene/feedback", {
            entity_id: e,
            old_category_id: t,
            new_category_id: n,
            correct: a,
            sentence: i
        })
    }, w.searchJa = function(e) {
        var i = "//mazii.net/api/search_ja/" + e,
            r = s.defer();
        return null != y[i] ? r.resolve(y[i]) : l.get(i).success(function(e, t, n, a) {
            e.status == SERVER_ERROR_CODE ? r.resolve(null) : (y[i] = e, r.resolve(e))
        }).error(function(e, t, n, a) {
            r.reject(null)
        }), r.promise
    }, w.tokenizer = function(e) {
        var t = "//mazii.net/api/tokenizer";
        e = w.normalizeCloudQuery(e);
        var n = s.defer(),
            a = t + e;
        return null != y[a] ? n.resolve(y[a]) : l.post(t, {
            text: e
        }).then(function(e) {
            null != e && 200 == e.status && (y[a] = e.data, n.resolve(e.data))
        }), n.promise
    }, w.analyze = function(e) {
        if (null != e && "" != e) {
            var t = s.defer();
            return e = (e = e.replace(" ", "")).replace("　", ""), l.post("//mazii.net/api/kuromoji", {
                text: encodeURIComponent(e)
            }).then(function(e) {
                null != e && 200 == e.status && t.resolve(JSON.parse(e.data))
            }), t.promise
        }
    }, w.getGrammar = function(e, t, n, a, i) {
        var r = baseUrl + "api/search",
            o = {
                dict: "javi",
                type: "grammar",
                level: e,
                category: t,
                query: n,
                page: a,
                limit: 12
            },
            s = r + JSON.stringify(o);
        null == y[s] ? l({
            url: r,
            method: "POST",
            data: o
        }).then(function(e) {
            y[s] = e, i(e)
        }, function(e) {
            y[s] = e, i(e)
        }) : i(y[s])
    }, w.getDetailGrammar = function(e) {
        var t = baseUrl + "api/grammar/" + e,
            n = s.defer();
        return o("GET", t, null, function(e) {
            n.resolve(e)
        }), n.promise
    }, w.getWordOfDay = function() {
        var i = "//api.mazii.net/api/get-search-trend",
            r = s.defer();
        return null != y[i] ? r.resolve(y[i]) : l.get(i).success(function(e, t, n, a) {
            y[i] = e, r.resolve(e)
        }).error(function(e, t, n, a) {
            r.reject(null)
        }), r.promise
    }, w.getRandomBook = function() {
        var i = baseUrl2 + "api/rand-book",
            r = s.defer();
        return null != y[i] ? r.resolve(y[i]) : l.get(i).success(function(e, t, n, a) {
            y[i] = e, r.resolve(e)
        }).error(function(e, t, n, a) {
            r.reject(null)
        }), r.promise
    }, w.getKindBook = function() {
        var e = baseUrl2 + "api/kind-book",
            i = s.defer();
        return l.get(e).success(function(e, t, n, a) {
            i.resolve(e)
        }).error(function(e, t, n, a) {
            i.reject(null)
        }), i.promise
    }, w.getBookByKind = function(e, t, n, a) {
        var i = baseUrl2 + "api/get-book",
            r = {
                page: e,
                limit: t,
                kind: n
            },
            o = i + JSON.stringify(r);
        null == y[o] ? l({
            url: i,
            method: "POST",
            data: r
        }).then(function(e) {
            y[o] = e, a(e)
        }, function(e) {
            y[o] = e, a(e)
        }) : a(y[o])
    }, w.getBookBySearch = function(e, t, n, a) {
        l({
            url: baseUrl2 + "api/search-book",
            method: "POST",
            data: {
                page: e,
                limit: t,
                key: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, w.getTopVideoTrending = function(e, t, n) {
        var a = "//pikasmart.com/api/Songs/topVideoTrending?limit=" + e + "&skip=" + t;
        l.get(a).success(function(e) {
            n(e)
        })
    }, w.getGrammarNalys = function(e, t) {
        l({
            url: baseUrl + "api/gramanalys",
            method: "POST",
            data: {
                text: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    };
    var _ = null;
    return w.getRadicalByStrockCount = function(e) {
        if (null != _) return _.byRadicalStrock[e]
    }, w.getKanjisByRadical = function(e) {
        if (null == e || 0 == e.lenth) return [];
        for (var t = [], n = 0; n < e.length; n++)
            for (var a = e[n], i = _.byRadical[a], r = 0; r < i.length; r++) t.push(i[r]);
        var o = e.length,
            s = {};
        for (n = 0; n < t.length; n++) null == s[t[n]] && (s[t[n]] = 0), s[t[n]]++;
        var l = [],
            c = [];
        for (n = 0; n < t.length; n++) {
            s[i = t[n]] == o && -1 == c.indexOf(t[n]) && (c.push(t[n]), l.push({
                kanji: t[n],
                stroke: _.byKanjiStrokes[t[n]]
            }))
        }
        return l
    }, w.getRadicalWithRadical = function(e) {
        if (null == e || 0 == e.lenth) return [];
        for (var t = [], n = 0; n < e.length; n++)
            for (var a = e[n], i = _.byRadical[a], r = 0; r < i.length; r++) t.push(i[r]);
        var o = e.length,
            s = {};
        for (n = 0; n < t.length; n++) null == s[t[n]] && (s[t[n]] = 0), s[t[n]]++;
        var l = [];
        for (n = 0; n < t.length; n++) {
            s[i = t[n]] == o && l.push(t[n])
        }
        var c = [];
        for (n = 0; n < l.length; n++)
            for (i = _.byKanji[l[n]], r = 0; r < i.length; r++) - 1 == c.indexOf(i[r]) && -1 == e.indexOf(i[r]) && c.push(i[r]);
        return c
    }, w.getNewsByWord = function(e, t) {
        l({
            url: baseUrl + "api/news/search_news",
            method: "POST",
            data: {
                limit: 3,
                type: "easy",
                time: ".+",
                keyword: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, $.ajax({
        type: "GET",
        url: "db/radicalDict.json",
        success: function(e, t, n) {
            var a = null;
            a = "string" == typeof e ? JSON.parse(e) : e, _ = a
        },
        error: function(e, t, n) {}
    }), w
}]);
var dictUtilServices = angular.module("mazii.service.util", ["mazii.service.localstore"]);
dictUtilServices.factory("dictUtilSer", ["$q", "$http", "$timeout", "$state", "localstoreServ", "$rootScope", function(a, r, e, t, o, n) {
    var p = {},
        i = (new Array("à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ", "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ", "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ", "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ"), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"),
        s = [{
            number: "46",
            text: "A"
        }, {
            number: "31",
            text: "B"
        }, {
            number: "93",
            text: "C"
        }, {
            number: "24",
            text: "D"
        }, {
            number: "37",
            text: "E"
        }, {
            number: "84",
            text: "F"
        }, {
            number: "41",
            text: "G"
        }, {
            number: "71",
            text: "H"
        }, {
            number: "16",
            text: "I"
        }, {
            number: "49",
            text: "J"
        }, {
            number: "52",
            text: "K"
        }, {
            number: "59",
            text: "L"
        }, {
            number: "45",
            text: "M"
        }, {
            number: "96",
            text: "N"
        }, {
            number: "51",
            text: "O"
        }, {
            number: "36",
            text: "P"
        }, {
            number: "95",
            text: "Q"
        }, {
            number: "78",
            text: "R"
        }, {
            number: "74",
            text: "S"
        }, {
            number: "19",
            text: "T"
        }, {
            number: "54",
            text: "U"
        }, {
            number: "42",
            text: "V"
        }, {
            number: "68",
            text: "W"
        }, {
            number: "91",
            text: "X"
        }, {
            number: "62",
            text: "Y"
        }, {
            number: "65",
            text: "Z"
        }, {
            number: "38",
            text: "a"
        }, {
            number: "83",
            text: "b"
        }, {
            number: "88",
            text: "c"
        }, {
            number: "21",
            text: "d"
        }, {
            number: "77",
            text: "e"
        }, {
            number: "44",
            text: "f"
        }, {
            number: "66",
            text: "g"
        }, {
            number: "32",
            text: "h"
        }, {
            number: "56",
            text: "i"
        }, {
            number: "92",
            text: "j"
        }, {
            number: "48",
            text: "k"
        }, {
            number: "34",
            text: "l"
        }, {
            number: "23",
            text: "m"
        }, {
            number: "57",
            text: "n"
        }, {
            number: "69",
            text: "o"
        }, {
            number: "27",
            text: "p"
        }, {
            number: "28",
            text: "q"
        }, {
            number: "17",
            text: "r"
        }, {
            number: "81",
            text: "s"
        }, {
            number: "14",
            text: "t"
        }, {
            number: "67",
            text: "u"
        }, {
            number: "79",
            text: "v"
        }, {
            number: "82",
            text: "w"
        }, {
            number: "26",
            text: "x"
        }, {
            number: "86",
            text: "y"
        }, {
            number: "63",
            text: "z"
        }, {
            number: "18",
            text: "0"
        }, {
            number: "89",
            text: "1"
        }, {
            number: "87",
            text: "2"
        }, {
            number: "22",
            text: "3"
        }, {
            number: "35",
            text: "4"
        }, {
            number: "58",
            text: "5"
        }, {
            number: "13",
            text: "6"
        }, {
            number: "99",
            text: "7"
        }, {
            number: "64",
            text: "8"
        }, {
            number: "55",
            text: "9"
        }],
        l = {
            abbr: "từ viết tắt",
            adj: "tính từ",
            "adj-na": "tính từ đuôi な",
            "adj-no": "danh từ sở hữu cách thêm の",
            "adj-pn": "tính từ đứng trước danh từ",
            "adj-s": "tínhh từ đặc biệt",
            "adj-t": "tính từ đuổi tara",
            adv: "trạng từ",
            "adv-n": "danh từ làm phó từ",
            "adv-to": "trạng từ thêm と",
            arch: "từ cổ",
            ateji: "ký tự thay thế",
            aux: "trợ từ",
            "aux-v": "trợ động từ",
            "aux-adj": "tính từ phụ trợ",
            Buddh: "thuật ngữ phật giáo",
            chn: "ngôn ngữ trẻ em",
            col: "thân mật ngữ",
            comp: "thuật ngữ tin học",
            conj: "liên từ",
            derog: "xúc phạm ngữ",
            ek: "hán tự đặc trưng",
            exp: "cụm từ",
            fam: "từ ngữ thân thuộc",
            fem: "phụ nữ hay dùng",
            food: "thuật ngữ thực phẩm",
            geom: "thuật ngữ hình học",
            gikun: "gikun",
            gram: "thuộc về ngữ pháp",
            hon: "tôn kính ngữ",
            hum: "khiêm nhường ngữ",
            id: "thành ngữ",
            int: "thán từ",
            iK: "từ chứa kanji bất quy tắc",
            ik: "từ chứa kana bất quy tắc",
            io: "okurigana bất quy tắc",
            iv: "động từ bất quy tắc",
            kyb: "giọng Kyoto",
            ksb: "giọng Kansai",
            ktb: "giọng Kantou",
            ling: "thuật ngữ ngôn ngữ học",
            MA: "thuật ngữ nghệ thuật",
            male: "tiếng lóng của nam giới",
            math: "thuật ngữ toán học",
            mil: "thuật ngữ quân sự",
            "m-sl": "thuật ngữ truyện tranh",
            n: "danh từ",
            "n-adv": "danh từ làm phó từ",
            "n-pref": "danh từ làm tiền tố",
            "n-suf": "danh từ làm hậu tố",
            "n-t": "danh từ chỉ thời gian",
            neg: "thể phủ định",
            "neg-v": "động từ mang nghĩa phủ định",
            ng: "từ trung tính",
            obs: "từ cổ",
            obsc: "từ tối nghĩa",
            oK: "từ chứa kanji cổ",
            ok: "từ chứa kana cổ",
            osk: "Giọng Osaka",
            physics: "thuật ngữ vật lý",
            pol: "thể lịch sự",
            pref: "tiếp đầu ngữ",
            prt: "giới từ",
            qv: "tham khảo mục khác",
            rare: "từ hiếm gặp",
            sl: "tiếng lóng",
            suf: "hậu tố",
            tsb: "giọng Tosa",
            uK: "từ sử dụng kanji đứng một mình",
            uk: "từ sử dụng kana đứng một mình",
            v: "động từ",
            v1: "động từ nhóm 2",
            v5: "động từ nhóm 1",
            v5aru: "động từ nhóm 1 -aru",
            v5b: "động từ nhóm 1 -bu",
            v5g: "động từ nhóm 1 -ku",
            v5k: "động từ nhóm 1 -ku",
            "v5k-s": "động từ nhóm 1 -iku/yuku",
            v5m: "động từ nhóm 1 -mu",
            v5n: "động từ nhóm 1 -nu",
            v5r: "Động từ nhóm 1 -ru",
            "v5r-i": "Động từ nhóm 1 bất quy tắc -ru",
            v5s: "động từ nhóm 1 -su",
            v5t: "động từ nhóm 1 -tsu",
            v5u: "động từ nhóm 1 -u",
            "v5u-s": "động từ nhóm 1 -u (đặc biệt)",
            v5uru: "động từ nhóm 1 -uru",
            vi: "tự động từ",
            vk: "động từ kuru (đặc biệt)",
            vs: "danh từ hoặc giới từ làm trợ từ cho động từ suru",
            "vs-i": "động từ bất quy tắc -suru",
            vt: "tha động từ",
            vulg: "thuật ngữ thô tục",
            vz: "tha động từ",
            X: "thuật ngữ thô tục"
        },
        c = {
            "名詞": "Danh từ",
            "名詞-一般": "Danh từ chung",
            "名詞-固有名詞": "Danh từ riêng",
            "名詞-固有名詞-一般": "Danh từ riêng khác",
            "名詞-固有名詞-人名": "Tên người",
            "代名詞": "Đại từ",
            "副詞": "Trạng từ",
            "助動詞": "Trợ động từ",
            "助詞": "Trợ từ",
            "動詞": "Động từ",
            "形容詞": "Tính từ",
            "感動詞": "Thán từ",
            "接尾辞": "Tiếp vị từ",
            "接続詞": "Liên từ",
            "接頭辞": "Tiếp đầu ngữ",
            "空白": "Khoảng trống",
            "補助記号": "Ký hiệu bổ trợ",
            "記号": "Ký hiệu",
            "連体詞": "Liên thể từ"
        },
        u = "db/javifastdict.txt",
        d = "db/vijafastdict.txt",
        m = null,
        f = null,
        v = null,
        h = o.getItem("autocomplete");
    null == h && (h = !0), p.getMecabTag = function() {
        return c
    }, p.isVietnamese = function(e) {
        return 1 == checkS(e)
    }, p.capitaliseFirstLetter = function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }, p.isJapanese = function(e) {
        for (var t = e.length, n = 0; n < t; n++)
            if (p.isKanji(e.charAt(n)) || p.isHiragana(e.charAt(n)) || p.isKatakan(e.charAt(n))) return !0;
        return !1
    }, p.getKanjiChara = function(e) {
        if (null == e) return "";
        for (var t = "", n = e.length, a = 0; a < n; a++) p.isKanji(e.charAt(a)) && -1 == t.indexOf(e.charAt(a)) && (t += e.charAt(a));
        return t
    }, p.isRomanji = function(e) {
        var t = e.charCodeAt(0);
        return 32 <= t && t <= 126
    }, p.allHiragana = function(e) {
        for (var t = e.length, n = 0; n < t; n++)
            if (0 == isHiragana(e.charAt(n))) return !1;
        return !0
    }, p.isKanji = function(e) {
        if ("々" == e) return !0;
        var t = e.charCodeAt(0);
        return 19968 <= t && t <= 40895
    }, p.isHiragana = function(e) {
        var t = e.charCodeAt(0);
        return 12352 <= t && t <= 12447
    }, p.isKatakan = function(e) {
        var t = e.charCodeAt(0);
        return 12448 <= t && t <= 12543
    }, p.mergeKanjiAndHiragana = function(e, t) {
        if ("" == e || "" == t || null == e || null == t) return null;
        if (0 == p.isJapanese(e) || 0 == p.isJapanese(t)) return null;
        var n = new RegExp(" ", "g"); - 1 != e.indexOf(" ") && (e = e.replace(n, "")), -1 != t.indexOf(" ") && (t = t.replace(n, "")), n = new RegExp("　", "g"), -1 != e.indexOf("　") && (e = e.replace(n, "")), -1 != t.indexOf("　") && (t = t.replace(n, ""));
        for (var a = [], i = "", r = "", o = "", s = 0, l = 0; l < e.length; l++) {
            var c = e.charAt(l);
            if (p.isKanji(c) || p.isKatakan(c)) {
                if ("" == i && "" != r)(u = new Object).k = r, u.h = "", a.push(u), s += (r = "").length;
                i += c
            } else if ("" == i) r += c, s++;
            else {
                for (o = c; s < t.length;) {
                    if (p.getLengthHiragana(r) < i.length || t.charAt(s) != o) r += t.charAt(s);
                    else if (t.charAt(s) == o) {
                        (u = new Object).k = i, u.h = r, a.push(u), i = "", r = c, s++;
                        break
                    }
                    s++
                }
                if (s == t.length && "" != i)(u = new Object).k = i, u.h = r, a.push(u);
                if (s == t.length && l < e.length - 1) return null
            }
        }
        if ("" != i) {
            for (; s < t.length;) r += t.charAt(s), s++;
            (u = new Object).k = i, u.h = r, a.push(u)
        } else if ("" != r) {
            var u;
            (u = new Object).k = r, u.h = "", a.push(u)
        }
        return a
    }, p.getLengthHiragana = function(e) {
        if (null == e || 0 == e.length) return 0;
        for (var t = 0, n = 0; n < e.length; n++) {
            var a = e.charAt(n);
            "ん" != a && "ぁ" != a && "ぃ" != a && "ぇ" != a && "ぅ" != a && "ぉ" != a && "ゅ" != a && "ょ" != a && t++
        }
        return t
    }, p.removeJapaneseChar = function(e) {
        if (null == e) return "";
        for (var t = "", n = 0; n < e.length; n++) p.isJapanese(e[n]) || "～" == e[n] || "、" == e[n] || "　" == e[n] || ":" == e[n] || "：" == e[n] || "（" == e[n] || "。" == e[n] || "）" == e[n] || (t += e[n]);
        return t = t.trim()
    };
    for (var g = {
        vs: ["する", "した", "しない", "し", "して", "できる", "される", "させる", "すれば", "しろ", "しよう"],
        vk: ["くる", "きた", "きない", "き", "きて", "来られる", "来られる", "来させる", "くれば", "こい", "こよう"],
        v5u: ["う", "った", "わない", "い", "って", "える", "われる", "わせる", "えば", "え", "おう"],
        "v5u-s": ["う", "うた", "わない", "い", "うて", "える", "われる", "わせる", "えば", "え", "おう"],
        v5k: ["く", "いた", "かない", "き", "いて", "ける", "かれる", "かせる", "けば", "け", "こう"],
        "v5k-s": ["く", "った", "かない", "き", "って", "ける", "かれる", "かせる", "けば", "け", "こう"],
        v5g: ["ぐ", "いだ", "がない", "ぎ", "いで", "げる", "がれる", "がせる", "げば", "げ", "ごう"],
        v5s: ["す", "した", "さない", "し", "して", "せる", "される", "させる", "せば", "せ", "そう"],
        v5t: ["つ", "った", "たない", "ち", "って", "てる", "たれる", "たせる", "てば", "て", "とう"],
        v5n: ["ぬ", "んだ", "なない", "に", "んで", "ねる", "なれる", "なせる", "ねば", "ね", "のう"],
        v5b: ["ぶ", "んだ", "ばない", "び", "んで", "べる", "ばれる", "ばせる", "べば", "べ", "ぼう"],
        v5m: ["む", "んだ", "まない", "み", "んで", "める", "まれる", "ませる", "めば", "め", "もう"],
        v5r: ["る", "った", "らない", "り", "って", "れる", "られる", "らせる", "れば", "れ", "ろう"],
        "v5r-i": ["る", "った", "", "り", "って", "ありえる", "", "らせる", "れば", "れる", "ろう"],
        v5aru: ["る", "った", "らない", "い", "って", "りえる", "", "", "", "い", ""],
        v1: ["る", "た", "ない", "-", "て", "られる", "られる", "させる", "れば", "いろ", "よう"]
    }, y = [
        ["です", "ですた", "じゃありません", "であり", "", "", "", "", "", "", "でしょう"],
        ["ます", "ました", "", "", "まして", "", "", "", "", "", "ましょう"],
        ["する", "した", "しない", "し", "して", "", "される", "させる", "すれば", "しろ", "しよう"],
        ["来る", "きた", "こない", "き", "きて", "来られる", "来られる", "来させる", "くれば", "こい", "こよう"],
        ["きる", "きた", "こない", "き", "きて", "きられる", "きられる", "きさせる", "くれば", "こい", "こよう"],
        ["う", "った", "わない", "い", "って", "える", "われる", "わせる", "えば", "え", "おう"],
        ["く", "いた", "かない", "き", "いて", "ける", "かれる", "かせる", "けば", "け", "こう"],
        ["ぐ", "いだ", "がない", "ぎ", "いで", "げる", "がれる", "がせる", "げば", "げ", "ごう"],
        ["す", "した", "さない", "し", "して", "せる", "される", "させる", "せば", "せ", "そう"],
        ["つ", "った", "たない", "ち", "って", "てる", "たれる", "たせる", "てば", "て", "とう"],
        ["ぬ", "んだ", "なない", "に", "んで", "ねる", "なれる", "なせる", "ねば", "ね", "のう"],
        ["ぶ", "んだ", "ばない", "び", "んで", "べる", "ばれる", "ばせる", "べば", "べ", "ぼう"],
        ["む", "んだ", "まない", "み", "んで", "める", "まれる", "ませる", "めば", "め", "もう"],
        ["る", "った", "らない", "り", "って", "れる", "られる", "らせる", "れば", "れ", "ろう"],
        ["る", "った", "", "り", "って", "ありえる", "", "らせる", "れば", "れる", "ろう"],
        ["る", "った", "らない", "い", "って", "りえる", "", "", "", "い", ""],
        ["る", "た", "ない", "-", "て", "られる", "られる", "させる", "れば", "ろ", "よう"],
        ["い", "かった", "くない", "くて", "", "", "", "", "ければ", "", "かろう"]
    ], w = {}, _ = [], b = 0; b < y.length; b++) {
        for (var k = y[b], S = 1; S < k.length; S++)
            if ("" != k[S] && "-" != k[S]) {
                null == w[k[S]] && (w[k[S]] = []);
                var C = w[k[S]]; - 1 == C.indexOf(k[0]) && C.push(k[0])
            }
        "" != k[3] && "-" != k[3] && _.push(k[3])
    }
    return p.getBaseForm = function(e) {
        if (!e) return e;
        var t = "",
            n = e,
            a = !1;
        do {
            if (t = n, n = p.getBaseFormOneTime(t), 1 == p.isExistWord(n)) {
                t = n, a = !0;
                break
            }
        } while (n != t);
        return a || p.isExistWord(t) ? t : e
    }, p.getBaseFormOneTime = function(e) {
        if (!e) return e;
        var t = e.length,
            n = 4;
        if (t <= n && (n = t - 1), 0 == n) return e;
        for (var a = 0; a < y[1].length; a++) {
            if ("" != (c = y[1][a]) && "-" != c) {
                var i = c.length;
                if (-1 != e.indexOf(c, t - i)) {
                    if (-1 != e.indexOf("し" + c, t - (i + 1))) {
                        var r = new RegExp("し" + c + "$"),
                            o = (l = e.replace(r, "")) + "する",
                            s = l + "す";
                        return p.isExistWord(o) ? o : p.isExistWord(s) ? s : e
                    }
                    var l;
                    r = new RegExp(c + "$");
                    return 1 == (l = e.replace(r, "")).length || -1 == _.indexOf(l[l.length - 1]) ? l + "る" : p.getBaseFormOneTime(l)
                }
            }
        }
        for (a = 0; a < y[0].length; a++) {
            var c;
            if ("" != (c = y[0][a]) && "-" != c) {
                i = c.length;
                if (-1 != e.indexOf(c, t - i)) {
                    r = new RegExp(c + "$");
                    return e.replace(r, "")
                }
            }
        }
        for (var u = null, d = null, m = n; 0 <= m; m--) {
            var h = e.substr(t - m);
            if (null != w[h] && 0 != w[h].length) {
                u = w[h].slice(0), d = h;
                break
            }
        }
        if (null == u) return e;
        var g = new RegExp(d + "$", "g");
        for (m = 0; m < u.length; m++) u[m] = e.replace(g, u[m]);
        for (m = 0; m < u.length; m++)
            if (p.isExistWord(u[m])) return u[m];
        return e
    }, p.getDictBase = function(e) {
        if (null == e || "" == e) return e;
        for (var t in g)
            for (var n = g[t], a = 0; a < n[a]; a++) {
                var i = n[a];
                e.match(i + "$")
            }
    }, p.getConjugationTableOfVerb = function(e, t, n) {
        -1 != t.indexOf("「") && (t = (t = t.replace("「", "")).replace("」", ""));
        var a = g[n];
        if (null == a) return null;
        t = t.split(" ")[0], -1 == e.indexOf(a[0]) && (e += a[0], t += a[0]);
        var i = {
            base: {}
        };
        i.base.word = e + "/" + t, i.base.name = "Từ điển (辞書)", e == t && (i.base.word = e);
        var r = new RegExp(a[0] + "$");
        if (i.past = {}, i.past.word = e.replace(r, a[1]), i.past.name = "Quá khứ (た)", "" != a[2] ? (i.nagative = {}, i.nagative.word = e.replace(r, a[2])) : (i.nagative = {}, -1 != e.indexOf("する") ? i.nagative.word = e.replace("する", "しない") : -1 != e.indexOf("くる") && (i.nagative.word = e.replace("くる", "こない"))), i.nagative.name = "Phủ định (未然)", "" != a[3] && (i.polite = {}, "-" == a[3] ? i.polite.word = e.replace(r, "") + "ます" : i.polite.word = e.replace(r, a[3]) + "ます", i.polite.name = "Lịch sự (丁寧)"), "" != a[4] && (i.te = {}, i.te.word = e.replace(r, a[4]), i.te.name = "te (て)"), "" != a[5] && (i.potential = {}, i.potential.word = e.replace(r, a[5]), i.potential.name = "Khả năng (可能)"), "" != a[6] && (i.passive = {}, i.passive.word = e.replace(r, a[6]), i.passive.name = "Thụ động (受身)"), "" != a[7] && (i.causative = {}, i.causative.word = e.replace(r, a[7]), i.causative.name = "Sai khiến (使役)"), "" != a[6] && "" != a[7]) {
            var o = new RegExp(g.v1[0] + "$");
            i.cau_pass = {}, i.cau_pass.word = i.causative.word.replace(o, a[6]), i.cau_pass.name = "Sai khiến thụ động (使役受身)"
        }
        return "" != a[8] && (i.conditional = {}, i.conditional.word = e.replace(r, a[8]), i.conditional.name = "Điều kiện (条件)"), "" != a[9] && (i.imperative = {}, i.imperative.word = e.replace(r, a[9]), i.imperative.name = "Mệnh lệnh (命令)"), "" != a[10] && (i.volitional = {}, i.volitional.word = e.replace(r, a[10]), i.volitional.name = "Ý chí (意向)"), i.prohibition = {}, i.prohibition.word = e + "な", i.prohibition.name = "Cấm chỉ(禁止)", i
    }, p.convertKindToReadable = function(e) {
        var t = [];
        if (-1 != e.indexOf(",")) {
            t = e.split(",");
            for (var n = 0; n < t.length; n++) t[n] = t[n].trim()
        } else t.push(e);
        var a = "";
        for (n = 0; n < t.length; n++) l.hasOwnProperty(t[n]) ? a += l[t[n]] : a += t[n], n != t.length - 1 && (a += ", ");
        return a
    }, p.getHVOfKey = function(e) {
        if (null == e || 5 <= e.length) return "";
        if (null == m) return "";
        for (var t = "", n = 0; n < e.length; n++)
            if (p.isKanji(e[n])) {
                var a = m[e[n]];
                null != a && ("" != t && (t += " "), t += a.split(",")[0].split(";")[0])
            } return t
    }, p.sortHVDataByKeyWord = function(e, t) {
        for (var n = new Array, a = 0, i = 0; i < e.length; i++)
            for (var r = 0; r < t.length; r++)
                if (e[i] == t[r].kanji) {
                    for (var o = !1, s = 0; s < n.length; s++)
                        if (n[s].kanji == e[i]) {
                            o = !0;
                            break
                        } 0 == o && (n[a] = t[r], a++)
                } return n
    }, p.isExistWord = function(e) {
        if (!e) return !1;
        for (var t = f, n = null, a = (e.length, new RegExp('["\\s](' + e + ')["\\s]', "gi")); n = a.exec(t);) {
            if (n[1]) return !0
        }
        return !1
    }, p.realtimeSearch = function(e, t) {
        var n = f,
            a = !0;
        "vi" == e && (n = v, a = !1);
        var i = null,
            r = t.length,
            o = new RegExp('"([^"]*' + t + '[^"]*)"', "gi"),
            s = 0,
            l = [],
            c = 4;
        for (4 < r ? c = 16 : 6 < r && (c = 20); i = o.exec(n);) {
            var u = i[1],
                d = "";
            if (a) {
                for (var m = u.split(" "), h = (d = m[0], 0); h < m.length && -1 == d.indexOf(t);) d = m[++h];
                if (d.length - r > c) continue
            } else if ((d = u).length - r > c) continue;
            if (l.push(u), 150 <= (s += 1)) break
        }
        var g = [];
        for (s = 0; s < 30 && s < l.length; s++) g.push(l[s]);
        return g
    }, p.sortResultSuggest = function(e, t) {
        if (null == e) return null;
        for (var n = e.length, a = 0; a < n; a++)
            for (var i = a + 1; i < n; i++);
    }, p.convertStrToInt = function(e) {
        if (null == e) return 0;
        for (var t = 0, n = e.length - 1, a = 1; 0 <= n;) t += e.charCodeAt(n) * a, n--, a *= 10;
        return t
    }, p.generateSuggest = function(e, t) {
        if (null == e || 0 == e.length) return "";
        for (var n = '<div class="list">', a = {
            item: "",
            suggestClick: t
        }, i = 0; i < e.length; i++) a.item = e[i], n += $interpolate('<div class="item suggest" ng-click="suggestClick({{item}})"><span><b>{{ item.split(" ")[0] }}</b> {{ item.replace(item.split(" ")[0], "") }} </span></div>')(a);
        return n += "</div>"
    }, p.closePanel = function() {
        $(".menu-left").removeClass("open-menu-left"), $(".history-panel").removeClass("open-history-panel"), $(".setting-panel").removeClass("open-setting-panel"), $(".cover").css("display", "none"), $("body").css("overflow", "auto")
    }, p.showTitlePage = function() {
        $(".title-page").removeClass("hidden-title")
    }, p.hiddenTitlePage = function() {
        $(".title-page").addClass("hidden-title")
    }, p.checkExistNewlineinMessage = function(e) {
        return e.content.indexOf("\n")
    }, p.renderHtmlMessage = function(e) {
        return e.content.split("\n")
    }, p.renderHtmlMessagePrivate = function(e) {
        return e.message.split("\n")
    }, p.renderHtmlListMessage = function(e) {
        for (var t = e.length, n = 0; n < t; n++) {
            var a = p.renderHtmlMessage(e[n]);
            1 < a.length && (e[n].newLine = !0, e.content = a)
        }
        return e
    }, p.safeApply = function(e) {
        var t = e.$root.$$phase;
        "$apply" == t || "$digest" == t || e.$digest()
    }, p.getDataSurvay = function() {
        var i = a.defer();
        return r.get("db/survay.json").success(function(e, t, n, a) {
            return i.resolve(e)
        }).error(function(e, t, n, a) {
            return i.resolve(null)
        }), i.promise
    }, p.shuffleArray = function(e) {
        for (var t, n, a = e.length; a;) n = Math.floor(Math.random() * a--), t = e[a], e[a] = e[n], e[n] = t;
        return e
    }, p.getAffilate = function() {
        var n = a.defer();
        return r.get("db/affilate.json").then(function(e) {
            var t = e.data,
                a = [],
                i = (new Date).getTime();
            t.forEach(function(e) {
                var t = new Date(e.expired).getTime();
                if (i < t) {
                    var n = e.id;
                    o.getItem(n) || a.push(e)
                }
            }), n.resolve(a)
        }), n.promise
    }, p.getRegion = function() {
        var t = a.defer(),
            e = o.getItem("region");
        return e ? t.resolve(e) : r.get("//mazii.net/api/geoip").then(function(e) {
            t.resolve(e.data), null != e.data && o.setItem("region", e.data)
        }), t.promise
    }, p.getCurrentTime = function() {
        var e = new Date,
            t = e.getMonth() + 1;
        return e.getSeconds() + "/" + e.getMinutes() + "/" + e.getHours() + "/" + e.getDate() + "/" + t + "/" + e.getFullYear()
    }, p.paginationReportMean = function(e, t) {
        if (null == t) return [];
        var n = t.length,
            a = [],
            i = e * PAGINATION_REPORT_MEAN,
            r = i + PAGINATION_REPORT_MEAN,
            o = !1,
            s = !1;
        o = 0 != e, s = !(n <= (e + 1) * PAGINATION_REPORT_MEAN), n < r && (r = n);
        for (var l = i; l < r; l++) a.push(t[l]);
        return {
            result: a,
            showNextLast: s,
            showPreviousLast: o
        }
    }, p.generationIndexPagination = function(e) {
        if (null == e) return [];
        for (var t = [], n = e.length, a = Math.floor(n / PAGINATION_REPORT_MEAN), i = 0; i < a; i++) t.push(i + 1);
        return t
    }, p.showInformationUser = function() {
        setTimeout(function() {
            $(".btn-acount").addClass("not-hide")
        }, 200)
    }, p.randomString = function(e) {
        for (var t = "", n = 0; n < e; n++) t += i.charAt(Math.floor(Math.random() * i.length));
        return t
    }, p.encodeToken = function(e, t) {
        for (var n = "", a = p.randomNumber(10), i = t.substr(0, a) + e + t.substr(-(t.length - a)), r = i.length, o = 0; o < r; o++) {
            var s = i[o];
            n += p.renderNumberfromChar(s)
        }
        return n += a
    }, p.randomNumber = function(e) {
        return Math.floor(Math.random() * e + 1)
    }, p.renderNumberfromChar = function(e) {
        for (var t = s.length, n = 0; n < t; n++)
            if (s[n].text == e) return s[n].number;
        return ""
    }, p.beautifulString = function(e, t) {
        return e.length > t ? e.substring(0, t - 3) + "..." : e
    }, p.renderHtmlReport = function(e) {
        return e.split("\n")
    }, p.convertJptoHex = function(e) {
        if (null == e || "" == e) return ""; - 1 != e.indexOf("「") && (e = (e = e.replace(new RegExp("「", "g"), "")).replace(new RegExp("」", "g"), "")), e = e.trim();
        for (var t = "", n = 0; n < e.length; n++) t += ("0000" + e.charCodeAt(n).toString(16)).substr(-4), n != e.length - 1 && (t += "_");
        return t
    }, p.shuffleArray = function(e) {
        for (var t, n, a = JSON.parse(JSON.stringify(e)), i = a.length; i;) n = Math.floor(Math.random() * i--), t = a[i], a[i] = a[n], a[n] = t;
        return a
    }, null == m && $.ajax({
        type: "GET",
        url: "db/kanjimini.json",
        success: function(e, t, n) {
            var a = null;
            a = "string" == typeof e ? JSON.parse(e) : e;
            for (var i = {}, r = 0; r < a.length; r++) i[a[r].w] = a[r].h;
            m = i, 1 == h && null == f && $.ajax({
                type: "GET",
                url: u,
                success: function(e, t, n) {
                    f = e, null == v && $.ajax({
                        type: "GET",
                        url: d,
                        success: function(e, t, n) {
                            v = e
                        },
                        error: function(e, t, n) {}
                    })
                },
                error: function(e, t, n) {}
            })
        },
        error: function(e, t, n) {}
    }), p
}]);
var authServ = angular.module("mazii.service.auth", []);
authServ.factory("authServ", ["$rootScope", "$q", "$http", "$timeout", "$stateParams", "$state", function(n, e, t, a, i, r) {
    var o = {};

    function s() {
        var n = e.defer();
        return FB.api("/me", function(e) {
            var t = e.email;
            void 0 !== t && null != t && "" != t || (e.email = e.id + "@gmail.com"), n.resolve(e)
        }), n.promise
    }
    return o.loginFacebook = function() {
        var t = e.defer();
        return FB.login(function(e) {
            "connected" === e.status ? s().then(function(e) {
                t.resolve(e)
            }) : t.resolve(null)
        }), t.promise
    }, o.logoutFacebook = function() {
        FB.logout()
    }, o.init = function() {
        FB.getLoginStatus(function(e) {
            "connected" === e.status ? s().then(function(e) {
                var t = e.email;
                null != t && "" != t || (e.email = e.id + "@gmail.com"), n.user = e, n.$broadcast("loadFBDone")
            }) : n.$broadcast("loadFBDone")
        })
    }, o
}]);
var baseUrlApi = "//api.mazii.net/",
    userSerive = angular.module("mazii.service.user", []);
userSerive.factory("userServ", ["$http", "$q", "cookieServ", "$rootScope", "localstoreServ", "dictUtilSer", "encryptionServ", function(c, u, l, o, d, m, h) {
    var e = {
            init: function() {
                var t = u.defer(),
                    e = l.getCookie("tokenId");
                e = h.decode(e);
                var n = new Date,
                    a = (n.getTimezoneOffset(), n.getTime() - 6e4 * n.getTimezoneOffset());
                a = a.toString();
                var i = m.randomString(50),
                    r = m.encodeToken(e + a, i);
                if (null == e || "" == e) t.resolve(null);
                else {
                    var o = baseUrlApi + "api/init-login",
                        s = {
                            tokenId: r
                        };
                    c.post(o, s).success(function(e) {
                        t.resolve(e)
                    })
                }
                return t.promise
            },
            login: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/login",
                    i = {
                        email: e.trim(),
                        password: t.trim()
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            logout: function() {
                l.setCookie("tokenId", ""), d.deleteItem("note"), d.deleteItem("grammar"), d.deleteItem("categoryNote"), d.deleteItem("inforUser"), d.deleteItem("cron-job"), o.user = null
            },
            logoutAll: function() {
                var t = u.defer(),
                    e = o.user.email,
                    n = baseUrlApi + "api/logout";
                if (null != e) {
                    var a = {
                        email: e
                    };
                    return c.post(n, a).success(function(e) {
                        t.resolve(e)
                    }), t.promise
                }
            },
            register: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/register",
                    i = {
                        email: e.trim(),
                        password: t.trim()
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            loginWidth: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/loginWith",
                    i = {
                        provider: t,
                        accessToken: e
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            changePassword: function(e, t) {
                var n = u.defer();
                if (null == o.user || null == o.user.email) return n.resolve(!1), n.promise;
                var a = o.user.email,
                    i = baseUrlApi + "api/change-password",
                    r = {
                        passwordOld: e,
                        passwordNew: t,
                        email: a
                    };
                return c.post(i, r).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            resetPassword: function(e) {
                var t = u.defer(),
                    n = baseUrlApi + "api/reset-password",
                    a = {
                        email: e
                    };
                return c.post(n, a).success(function(e) {
                    t.resolve(e)
                }), t.promise
            },
            resetPasswordReally: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/reset-password-really",
                    i = {
                        email: e,
                        password: t
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            addMeanUser: function(e, t, n, a, i, r) {
                var o = u.defer(),
                    s = baseUrlApi + "api/add-mean",
                    l = {
                        userId: e,
                        mean: t,
                        wordId: n,
                        word: a,
                        type: i = i || "word",
                        dict: r = r || "javi"
                    };
                return c.post(s, l).success(function(e) {
                    o.resolve(e)
                }), o.promise
            },
            getMeanById: function(e, t, n) {
                var a = u.defer(),
                    i = baseUrlApi + "api/get-mean",
                    r = {
                        wordId: e,
                        type: t = t || "word",
                        dict: n = n || "javi"
                    };
                return c.post(i, r).success(function(e) {
                    a.resolve(e)
                }), a.promise
            },
            updateMeanUser: function(e, t, n, a) {
                var i = u.defer(),
                    r = baseUrlApi + "api/update-mean",
                    o = {
                        wordId: n,
                        userId: e,
                        mean: t,
                        word: a
                    };
                return c.post(r, o).success(function(e) {
                    i.resolve(e)
                }), i.promise
            },
            rateMean: function(e, t, n) {
                var a = u.defer(),
                    i = baseUrlApi + "api/rate-mean",
                    r = {
                        reportId: e,
                        userId: t,
                        type: n
                    };
                return c.post(i, r).success(function(e) {
                    a.resolve(e)
                }), a.promise
            },
            checkMean: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/check-mean",
                    i = {
                        wordId: e,
                        userId: t
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            deleteMean: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/delete-mean",
                    i = {
                        userId: e,
                        reportId: t
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            changeUsername: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/change-username",
                    i = {
                        email: e,
                        username: t
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            initGetRateMean: function() {
                var t = u.defer();
                if (null == o.user) return t.resolve([]), t.promise;
                var e = o.user.userId,
                    n = baseUrlApi + "api/get-rate",
                    a = {
                        userId: e
                    };
                return c.post(n, a).success(function(e) {
                    200 == e.status ? t.resolve(e.result) : t.resolve([])
                }), t.promise
            },
            changeDataRateinLocal: function(e, t) {
                var n = d.getItem("rateMean");
                if (null == n || 0 == n.length)(n = []).push(e);
                else {
                    var a = n.length,
                        i = !1;
                    "like" == e.type && 0 == t ? e.type = 1 : e.type = 0;
                    for (var r = 0; r < a; r++)
                        if (n[r].reportId == e.reportId) {
                            n[r] = e, i = !0;
                            break
                        } i || n.push(e)
                }
                d.setItem("rateMean", n)
            },
            activeButtonLike: function(e) {
                var t = e.length,
                    n = d.getItem("rateMean");
                null == n && (n = []);
                for (var a = n.length, i = [], r = 0; r < t; r++)
                    for (var o = 0; o < a; o++) n[o].reportId == e[r].reportId && i.push({
                        reportId: n[o].reportId,
                        type: n[o].type
                    });
                return i
            },
            getDataMyNote: function(e) {
                var t = u.defer(),
                    n = baseUrlApi + "api/get-mynote",
                    a = {
                        userId: e
                    };
                return c.post(n, a).success(function(e) {
                    t.resolve(e)
                }), t.promise
            },
            getCategory: function(e) {
                var t = u.defer();
                return a("GET", baseUrlApi + "api/get-category/" + e + "/100", null, function(e) {
                    t.resolve(e)
                }), t.promise
            },
            getNote: function(e, t) {
                var n = u.defer();
                return a("GET", baseUrlApi + "api/get-note/" + e + "/" + t + "/100", null, function(e) {
                    n.resolve(e)
                }), n.promise
            },
            addCategory: function(e, t, n) {
                var a = u.defer(),
                    i = baseUrlApi + "api/add-category",
                    r = {
                        userId: e,
                        date: n,
                        categoryName: t
                    };
                return c.post(i, r).success(function(e) {
                    a.resolve(e)
                }), a.promise
            },
            addNote: function(e) {
                var t = u.defer(),
                    n = baseUrlApi + "api/add-note";
                e.idx && "" != e.idx || (e.idx = "-1");
                var a = {
                    noteName: e.noteName,
                    noteMean: e.noteMean,
                    categoryId: e.categoryId,
                    type: e.type,
                    date: e.date,
                    idx: e.idx
                };
                return c.post(n, a).success(function(e) {
                    t.resolve(e)
                }), t.promise
            },
            deleteCategory: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/delete-category",
                    i = {
                        userId: e,
                        categoryId: t
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            deleteNote: function(e) {
                var t = u.defer(),
                    n = baseUrlApi + "api/delete-note",
                    a = {
                        noteId: e
                    };
                return c.post(n, a).success(function(e) {
                    t.resolve(e)
                }), t.promise
            },
            pushCategoryafterGetServer: function(e) {
                var t = e.length,
                    n = [];
                if (0 != t) {
                    for (var a = 0; a < t; a++) {
                        var i = e[a],
                            r = {
                                category: i.categoryName,
                                date: i.date,
                                categoryId: i.categoryId
                            };
                        n.push(r)
                    }
                    d.setItem("categoryNote", n)
                }
            },
            rememberFlash: function(e, t, n) {
                var a = u.defer(),
                    i = baseUrlApi + "api/remember-flash",
                    r = {
                        userId: e,
                        wordId: t,
                        type: n
                    };
                return c.post(i, r).success(function(e) {
                    a.resolve(e)
                }), a.promise
            },
            noRememberFlash: function(e, t, n) {
                var a = u.defer(),
                    i = baseUrlApi + "api/forget-flash",
                    r = {
                        userId: e,
                        wordId: t,
                        type: n
                    };
                return c.post(i, r).success(function(e) {
                    a.resolve(e)
                }), a.promise
            },
            getListRemember: function(e, t) {
                var n = u.defer(),
                    a = baseUrlApi + "api/get-flashcard",
                    i = {
                        userId: e,
                        type: t
                    };
                return c.post(a, i).success(function(e) {
                    n.resolve(e)
                }), n.promise
            },
            getNewMean: function(e) {
                var t = u.defer(),
                    n = baseUrlApi + "api/get-new",
                    a = {
                        skip: 10 * e,
                        take: 10
                    };
                return c.post(n, a).success(function(e) {
                    t.resolve(e)
                }), t.promise
            },
            pushNoteafterGetServer: function(e) {
                var t = e.length,
                    n = [],
                    a = [];
                if (0 != t) {
                    for (var i = 0; i < t; i++) {
                        var r = e[i];
                        if ("grammar_detail" == r.type) {
                            var o = {
                                date: r.date,
                                query: r.noteName,
                                mean: r.noteMean,
                                type: r.type,
                                id: r.noteId,
                                idx: r.idx,
                                category: r.cateId
                            };
                            a.push(o)
                        } else {
                            var s = {
                                date: r.date,
                                query: r.noteName,
                                mean: r.noteMean,
                                type: r.type,
                                id: r.noteId,
                                category: r.cateId
                            };
                            n.push(s)
                        }
                    }
                    d.setItem("note", n), d.setItem("grammar", a)
                }
            },
            addWord: function(e) {
                var t = u.defer(),
                    n = baseUrlApi + "api/add-word",
                    a = e;
                return c.post(n, a).success(function(e) {
                    t.resolve(e)
                }), t.promise
            }
        },
        a = function(e, t, n, a) {
            var i = new XMLHttpRequest;
            i.open(e, t);
            var r = l.getCookie("tokenId");
            r = h.decode(r), i.setRequestHeader("Content-Type", "application/json"), i.setRequestHeader("Authorization", r), i.onreadystatechange = function() {
                4 === this.readyState && null != this.responseText && null != a && a(JSON.parse(this.responseText))
            }, null != n ? i.send(JSON.stringify(n)) : i.send()
        };
    return e.agreeTerm = function(t) {
        var e = l.getCookie("tokenId");
        e = h.decode(e), c({
            url: baseUrlApi + "api/agreement",
            method: "POST",
            data: {
                token: e,
                action: 1
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, e
}]);
var localstoreSerive = angular.module("mazii.service.cookie", []),
    TIME_SAVE = 365;
localstoreSerive.factory("cookieServ", [function() {
    var e = {
        setCookie: function(e, t) {
            var n = new Date;
            n.setTime(n.getTime() + 24 * TIME_SAVE * 60 * 60 * 1e3);
            var a = "expires=" + n.toUTCString();
            document.cookie = e + "=" + t + "; " + a
        },
        getCookie: function(e) {
            for (var t = e + "=", n = document.cookie.split(";"), a = 0; a < n.length; a++) {
                for (var i = n[a];
                     " " == i.charAt(0);) i = i.substring(1);
                if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
            }
            return ""
        }
    };
    return e
}]);
var encryptionSerive = angular.module("mazii.service.encryption", []);
encryptionSerive.factory("encryptionServ", ["$crypto", function(t) {
    var e = {},
        n = "#$&AhcHkgh@0gfk!&1LK";
    return e.encode = function(e) {
        return t.encrypt(e, n)
    }, e.decode = function(e) {
        return t.decrypt(e, n)
    }, e
}]);
var spamServices = angular.module("mazii.service.spam", []);
spamServices.factory("filterSpamSer", ["$q", "$http", "$timeout", "$state", "localstoreServ", "$rootScope", function(e, t, n, a, i, r) {
    var o = {},
        s = ["con mẹ"],
        l = s.length;
    return o.filterSpamReport = function(e) {
        for (var t = 0; t < l; t++) {
            var n = s[t];
            if (-1 != e.indexOf(n)) return !0
        }
        return !1
    }, o
}]);
var categor = angular.module("mazii.service.category", []);
categor.factory("categoryServ", ["$rootScope", "$q", "$http", "$timeout", "$stateParams", "$state", function(e, t, n, a, i, r) {
    var o = {},
        s = [{
            id: -1,
            jp_name: "None",
            en_name: "None",
            vi_name: "Không thuộc chủ đề nào"
        }, {
            id: 1,
            jp_name: "名前_その他",
            en_name: "Name_Other",
            vi_name: "Tên (nói chung)"
        }, {
            id: 2,
            jp_name: "人名",
            en_name: "Person",
            vi_name: "Tên người"
        }, {
            id: 3,
            jp_name: "神名",
            en_name: "God",
            vi_name: "Thánh thần"
        }, {
            id: 4,
            jp_name: "組織名_その他",
            en_name: "Organization_Other",
            vi_name: "Tên tổ chức (nói chung)"
        }, {
            id: 5,
            jp_name: "国際組織名",
            en_name: "International_Organization",
            vi_name: "Tổ chức quốc tế"
        }, {
            id: 6,
            jp_name: "公演組織名",
            en_name: "Show_Organization",
            vi_name: "Đoàn nghệ thuật"
        }, {
            id: 7,
            jp_name: "家系名",
            en_name: "Family",
            vi_name: "Gia tộc"
        }, {
            id: 8,
            jp_name: "民族名_その他",
            en_name: "Ethnic_Group_Other",
            vi_name: "Dân tộc"
        }, {
            id: 9,
            jp_name: "国籍名",
            en_name: "Nationality",
            vi_name: "Quốc tịch"
        }, {
            id: 10,
            jp_name: "競技組織名_その他",
            en_name: "Sports_Organization_Other",
            vi_name: "Đội thể thao"
        }, {
            id: 11,
            jp_name: "プロ競技組織名",
            en_name: "Pro_Sports_Organization",
            vi_name: "Đội thể thao chuyên nghiệp"
        }, {
            id: 12,
            jp_name: "競技リーグ名",
            en_name: "Sports_League",
            vi_name: "Giải đấu thể thao"
        }, {
            id: 13,
            jp_name: "法人名_その他",
            en_name: "Corporation_Other",
            vi_name: "Pháp nhân"
        }, {
            id: 14,
            jp_name: "企業名",
            en_name: "Company",
            vi_name: "Công ty"
        }, {
            id: 15,
            jp_name: "企業グループ名",
            en_name: "Company_Group",
            vi_name: "Tập đoàn"
        }, {
            id: 16,
            jp_name: "政治的組織名_その他",
            en_name: "Political_Organization_Other",
            vi_name: "Tổ chức chính trị"
        }, {
            id: 17,
            jp_name: "政府組織名",
            en_name: "Government",
            vi_name: "Tổ chức chính phủ"
        }, {
            id: 18,
            jp_name: "政党名",
            en_name: "Political_Party",
            vi_name: "Chính đảng"
        }, {
            id: 19,
            jp_name: "内閣名",
            en_name: "Cabinet",
            vi_name: "Chính đảng"
        }, {
            id: 20,
            jp_name: "軍隊名",
            en_name: "Military",
            vi_name: "Quân đội"
        }, {
            id: 21,
            jp_name: "地名_その他",
            en_name: "Location_Other",
            vi_name: "Địa danh"
        }, {
            id: 22,
            jp_name: "温泉名",
            en_name: "Spa",
            vi_name: "Suối nước nóng"
        }, {
            id: 23,
            jp_name: "GPE_その他",
            en_name: "GPE_Other",
            vi_name: "Thực thể địa chính"
        }, {
            id: 24,
            jp_name: "市区町村名",
            en_name: "City",
            vi_name: "Quận huyện"
        }, {
            id: 25,
            jp_name: "郡名",
            en_name: "County",
            vi_name: "Làng"
        }, {
            id: 26,
            jp_name: "都道府県州名",
            en_name: "Province",
            vi_name: "Tỉnh thành"
        }, {
            id: 27,
            jp_name: "国名",
            en_name: "Country",
            vi_name: "Đất nước"
        }, {
            id: 28,
            jp_name: "地域名_その他",
            en_name: "Region_Other",
            vi_name: "Vùng miền"
        }, {
            id: 29,
            jp_name: "大陸地域名",
            en_name: "Continental_Region",
            vi_name: "Châu lục"
        }, {
            id: 30,
            jp_name: "国内地域名",
            en_name: "Domestic_Region",
            vi_name: "Vùng địa phương"
        }, {
            id: 31,
            jp_name: "地形名_その他",
            en_name: "Geological_Region_Other",
            vi_name: "Địa hình"
        }, {
            id: 32,
            jp_name: "山地名",
            en_name: "Mountain",
            vi_name: "Núi"
        }, {
            id: 33,
            jp_name: "島名",
            en_name: "Island",
            vi_name: "Đảo"
        }, {
            id: 34,
            jp_name: "河川名",
            en_name: "River",
            vi_name: "Sông ngòi"
        }, {
            id: 35,
            jp_name: "湖沼名",
            en_name: "Lake",
            vi_name: "Hồ"
        }, {
            id: 36,
            jp_name: "海洋名",
            en_name: "Sea",
            vi_name: "Biển"
        }, {
            id: 37,
            jp_name: "湾名",
            en_name: "Bay",
            vi_name: "Vịnh"
        }, {
            id: 38,
            jp_name: "天体名_その他",
            en_name: "Astral_Body_Other",
            vi_name: "Thiên thể"
        }, {
            id: 39,
            jp_name: "恒星名",
            en_name: "Star",
            vi_name: "Mặt trời (Sao)"
        }, {
            id: 40,
            jp_name: "惑星名",
            en_name: "Planet",
            vi_name: "Hành tinh"
        }, {
            id: 41,
            jp_name: "星座名",
            en_name: "Constellation",
            vi_name: "Chòm sao"
        }, {
            id: 42,
            jp_name: "アドレス_その他",
            en_name: "Address_Other",
            vi_name: "Địa chỉ"
        }, {
            id: 43,
            jp_name: "郵便住所",
            en_name: "Postal_Address",
            vi_name: "Địa chỉ bưu điện"
        }, {
            id: 44,
            jp_name: "電話番号",
            en_name: "Phone_Number",
            vi_name: "Số điện thoại"
        }, {
            id: 45,
            jp_name: "電子メイル",
            en_name: "Email",
            vi_name: "Địa chỉ email"
        }, {
            id: 46,
            jp_name: "URL",
            en_name: "URL",
            vi_name: "URL"
        }, {
            id: 47,
            jp_name: "施設名_その他",
            en_name: "Facility_Other",
            vi_name: "Kiến trúc"
        }, {
            id: 48,
            jp_name: "施設部分名",
            en_name: "Facility_Part",
            vi_name: "Bộ phận của kiến trúc"
        }, {
            id: 49,
            jp_name: "遺跡名_その他",
            en_name: "Archaeological_Place_Other",
            vi_name: "Di tích"
        }, {
            id: 50,
            jp_name: "古墳名",
            en_name: "Tumulus",
            vi_name: "Mộ cổ"
        }, {
            id: 51,
            jp_name: "GOE_その他",
            en_name: "GOE_Other",
            vi_name: "Thực thể hành chính"
        }, {
            id: 52,
            jp_name: "公共機関名",
            en_name: "Public_Institution",
            vi_name: "Cơ quan công cộng"
        }, {
            id: 53,
            jp_name: "学校名",
            en_name: "School",
            vi_name: "Trường học"
        }, {
            id: 54,
            jp_name: "研究機関名",
            en_name: "Research_Institute",
            vi_name: "Viện nghiên cứu"
        }, {
            id: 55,
            jp_name: "取引所名",
            en_name: "Market",
            vi_name: "Sở giao dịch, chợ"
        }, {
            id: 56,
            jp_name: "公園名",
            en_name: "Park",
            vi_name: "Công viên"
        }, {
            id: 57,
            jp_name: "競技施設名",
            en_name: "Sports_Facility",
            vi_name: "Nơi thi đấu thể thao"
        }, {
            id: 58,
            jp_name: "美術博物館名",
            en_name: "Museum",
            vi_name: "Bảo tàng"
        }, {
            id: 59,
            jp_name: "動植物園名",
            en_name: "Zoo",
            vi_name: "Sở thú, vườn cây"
        }, {
            id: 60,
            jp_name: "遊園施設名",
            en_name: "Amusement_Park",
            vi_name: "Công viên giải trí"
        }, {
            id: 61,
            jp_name: "劇場名",
            en_name: "Theater",
            vi_name: "Nhà hát"
        }, {
            id: 62,
            jp_name: "神社寺名",
            en_name: "Worship_Place",
            vi_name: "Nơi thờ cúng"
        }, {
            id: 63,
            jp_name: "停車場名",
            en_name: "Car_Stop",
            vi_name: "Bến xe"
        }, {
            id: 64,
            jp_name: "電車駅名",
            en_name: "Station",
            vi_name: "Ga tàu"
        }, {
            id: 65,
            jp_name: "空港名",
            en_name: "Airport",
            vi_name: "Sân bay"
        }, {
            id: 66,
            jp_name: "港名",
            en_name: "Port",
            vi_name: "Cảng"
        }, {
            id: 67,
            jp_name: "路線名_その他",
            en_name: "Line_Other",
            vi_name: "Tuyến đường"
        }, {
            id: 68,
            jp_name: "電車路線名",
            en_name: "Railroad",
            vi_name: "Đường sắt"
        }, {
            id: 69,
            jp_name: "道路名",
            en_name: "Road",
            vi_name: "Đường bộ"
        }, {
            id: 70,
            jp_name: "運河名",
            en_name: "Canal",
            vi_name: "Kênh đào"
        }, {
            id: 71,
            jp_name: "航路名",
            en_name: "Water_Route",
            vi_name: "Đường thuỷ"
        }, {
            id: 72,
            jp_name: "トンネル名",
            en_name: "Tunnel",
            vi_name: "Hầm đường bộ"
        }, {
            id: 73,
            jp_name: "橋名",
            en_name: "Bridge",
            vi_name: "Cầu"
        }, {
            id: 74,
            jp_name: "製品名_その他",
            en_name: "Product_Other",
            vi_name: "Sản phẩm"
        }, {
            id: 75,
            jp_name: "材料名",
            en_name: "Material",
            vi_name: "Chất liệu"
        }, {
            id: 76,
            jp_name: "衣類名",
            en_name: "Clothing",
            vi_name: "Quần áo"
        }, {
            id: 77,
            jp_name: "貨幣名",
            en_name: "Money_Form",
            vi_name: "Tiền tệ"
        }, {
            id: 78,
            jp_name: "医薬品名",
            en_name: "Drug",
            vi_name: "Thuốc men"
        }, {
            id: 79,
            jp_name: "武器名",
            en_name: "Weapon",
            vi_name: "Vũ khí"
        }, {
            id: 80,
            jp_name: "株名",
            en_name: "Stock",
            vi_name: "Cổ phiếu"
        }, {
            id: 81,
            jp_name: "賞名",
            en_name: "Award",
            vi_name: "Giải thưởng"
        }, {
            id: 82,
            jp_name: "勲章名",
            en_name: "Decoration",
            vi_name: "Huân huy chương"
        }, {
            id: 83,
            jp_name: "罪名",
            en_name: "Offense",
            vi_name: "Tội phạm"
        }, {
            id: 84,
            jp_name: "便名",
            en_name: "Service",
            vi_name: "Tên chuyến (tàu, xe, máy bay)"
        }, {
            id: 85,
            jp_name: "等級名",
            en_name: "Class",
            vi_name: "Tên đẳng cấp"
        }, {
            id: 86,
            jp_name: "キャラクター名",
            en_name: "Character",
            vi_name: "Nhân vật"
        }, {
            id: 87,
            jp_name: "識別番号",
            en_name: "ID_Number",
            vi_name: "Nhân vật"
        }, {
            id: 88,
            jp_name: "乗り物名_その他",
            en_name: "Vehicle_Other",
            vi_name: "Nhân vật"
        }, {
            id: 89,
            jp_name: "車名",
            en_name: "Car",
            vi_name: "Nhân vật"
        }, {
            id: 90,
            jp_name: "列車名",
            en_name: "Train",
            vi_name: "Đoàn tàu"
        }, {
            id: 91,
            jp_name: "飛行機名",
            en_name: "Aircraft",
            vi_name: "Máy bay"
        }, {
            id: 92,
            jp_name: "宇宙船名",
            en_name: "Spaceship",
            vi_name: "Tàu vũ trụ"
        }, {
            id: 93,
            jp_name: "船名",
            en_name: "Ship",
            vi_name: "Tàu thuyền"
        }, {
            id: 94,
            jp_name: "食べ物名_その他",
            en_name: "Food_Other",
            vi_name: "Thức ăn"
        }, {
            id: 95,
            jp_name: "料理名",
            en_name: "Dish",
            vi_name: "Món ăn"
        }, {
            id: 96,
            jp_name: "芸術作品名_その他",
            en_name: "Art_Other",
            vi_name: "Tác phẩm nghệ thuật"
        }, {
            id: 97,
            jp_name: "絵画名",
            en_name: "Picture",
            vi_name: "Tranh ảnh"
        }, {
            id: 98,
            jp_name: "番組名",
            en_name: "Broadcast_Program",
            vi_name: "Chương trình phát thanh, phát hình"
        }, {
            id: 99,
            jp_name: "映画名",
            en_name: "Movie",
            vi_name: "Phim ảnh"
        }, {
            id: 100,
            jp_name: "公演名",
            en_name: "Show",
            vi_name: "Buổi biểu diễn"
        }, {
            id: 101,
            jp_name: "音楽名",
            en_name: "Music",
            vi_name: "Tên bài hát, nhạc"
        }, {
            id: 102,
            jp_name: "文学名",
            en_name: "Book",
            vi_name: "Tên sách"
        }, {
            id: 103,
            jp_name: "出版物名_その他",
            en_name: "Printing_Other",
            vi_name: "Ấn phẩm"
        }, {
            id: 104,
            jp_name: "新聞名",
            en_name: "Newspaper",
            vi_name: "Báo chí"
        }, {
            id: 105,
            jp_name: "雑誌名",
            en_name: "Magazine",
            vi_name: "Tạp chí"
        }, {
            id: 106,
            jp_name: "主義方式名_その他",
            en_name: "Doctrine_Method_Other",
            vi_name: "Văn hoá - Tư tưởng - Chủ nghĩa"
        }, {
            id: 107,
            jp_name: "文化名",
            en_name: "Culture",
            vi_name: "Văn hoá"
        }, {
            id: 108,
            jp_name: "宗教名",
            en_name: "Religion",
            vi_name: "Tôn giáo"
        }, {
            id: 109,
            jp_name: "学問名",
            en_name: "Academic",
            vi_name: "Môn học"
        }, {
            id: 110,
            jp_name: "競技名",
            en_name: "Sport",
            vi_name: "Môn thể thao"
        }, {
            id: 111,
            jp_name: "流派名",
            en_name: "Style",
            vi_name: "Trường phái"
        }, {
            id: 112,
            jp_name: "運動名",
            en_name: "Movement",
            vi_name: "Phong trào"
        }, {
            id: 113,
            jp_name: "理論名",
            en_name: "Theory",
            vi_name: "Lý thuyết"
        }, {
            id: 114,
            jp_name: "政策計画名",
            en_name: "Plan",
            vi_name: "Kế hoạch, chính sách"
        }, {
            id: 115,
            jp_name: "規則名_その他",
            en_name: "Rule_Other",
            vi_name: "Luật, quyết định, quyết nghị"
        }, {
            id: 116,
            jp_name: "条約名",
            en_name: "Treaty",
            vi_name: "Điều ước"
        }, {
            id: 117,
            jp_name: "法令名",
            en_name: "Law",
            vi_name: "Luật, pháp lệnh"
        }, {
            id: 118,
            jp_name: "称号名_その他",
            en_name: "Title_Other",
            vi_name: "Danh xưng"
        }, {
            id: 119,
            jp_name: "地位職業名",
            en_name: "Position_Vocation",
            vi_name: "Địa vị"
        }, {
            id: 120,
            jp_name: "言語名_その他",
            en_name: "Language_Other",
            vi_name: "Ngôn ngữ, tiếng nói"
        }, {
            id: 121,
            jp_name: "国語名",
            en_name: "National_Language",
            vi_name: "Ngôn ngữ"
        }, {
            id: 122,
            jp_name: "単位名_その他",
            en_name: "Unit_Other",
            vi_name: "Đơn vị đo"
        }, {
            id: 123,
            jp_name: "通貨単位名",
            en_name: "Currency",
            vi_name: "Đơn vị tiền tệ"
        }, {
            id: 124,
            jp_name: "イベント名_その他",
            en_name: "Event_Other",
            vi_name: "Sự kiện - Hiện tượng"
        }, {
            id: 125,
            jp_name: "催し物名_その他",
            en_name: "Occasion_Other",
            vi_name: "Sự kiện"
        }, {
            id: 126,
            jp_name: "例祭名",
            en_name: "Religious_Festival",
            vi_name: "Lễ hội"
        }, {
            id: 127,
            jp_name: "競技会名",
            en_name: "Game",
            vi_name: "Trận đấu"
        }, {
            id: 128,
            jp_name: "会議名",
            en_name: "Conference",
            vi_name: "Hội nghị, hội thảo"
        }, {
            id: 129,
            jp_name: "事故事件名_その他",
            en_name: "Incident_Other",
            vi_name: "Tai nạn"
        }, {
            id: 130,
            jp_name: "戦争名",
            en_name: "War",
            vi_name: "Chiến tranh"
        }, {
            id: 131,
            jp_name: "自然現象名_その他",
            en_name: "Natural_Phenomenon_Other",
            vi_name: "Hiện tượng tự nhiên"
        }, {
            id: 132,
            jp_name: "自然災害名",
            en_name: "Natural_Disaster",
            vi_name: "Thiên tai"
        }, {
            id: 133,
            jp_name: "地震名",
            en_name: "Earthquake",
            vi_name: "Động đất"
        }, {
            id: 134,
            jp_name: "自然物名_その他",
            en_name: "Natural_Object_Other",
            vi_name: "Vật chất tự nhiên"
        }, {
            id: 135,
            jp_name: "元素名",
            en_name: "Element",
            vi_name: "Nguyên tố"
        }, {
            id: 136,
            jp_name: "化合物名",
            en_name: "Compound",
            vi_name: "Hợp chất"
        }, {
            id: 137,
            jp_name: "鉱物名",
            en_name: "Mineral",
            vi_name: "Khoáng sản"
        }, {
            id: 138,
            jp_name: "生物名_その他",
            en_name: "Living_Thing_Other",
            vi_name: "Sinh vật"
        }, {
            id: 139,
            jp_name: "真菌類名",
            en_name: "Fungus",
            vi_name: "Nấm"
        }, {
            id: 140,
            jp_name: "軟体動物_節足動物名",
            en_name: "Mollusk_Arthropod",
            vi_name: "Động vật thân mềm, chân khớp"
        }, {
            id: 141,
            jp_name: "昆虫類名",
            en_name: "Insect",
            vi_name: "Côn trùng"
        }, {
            id: 142,
            jp_name: "魚類名",
            en_name: "Fish",
            vi_name: "Cá"
        }, {
            id: 143,
            jp_name: "両生類名",
            en_name: "Amphibia",
            vi_name: "Động vật lưỡng sinh"
        }, {
            id: 144,
            jp_name: "爬虫類名",
            en_name: "Reptile",
            vi_name: "Bò sát"
        }, {
            id: 145,
            jp_name: "鳥類名",
            en_name: "Bird",
            vi_name: "Chim"
        }, {
            id: 146,
            jp_name: "哺乳類名",
            en_name: "Mammal",
            vi_name: "Động vật có vú (thú)"
        }, {
            id: 147,
            jp_name: "植物名",
            en_name: "Flora",
            vi_name: "Thực vật"
        }, {
            id: 148,
            jp_name: "生物部位名_その他",
            en_name: "Living_Thing_Part_Other",
            vi_name: "Cấu trúc của sự sống"
        }, {
            id: 149,
            jp_name: "動物部位名",
            en_name: "Animal_Part",
            vi_name: "Bộ phận cơ thể"
        }, {
            id: 150,
            jp_name: "植物部位名",
            en_name: "Flora_Part",
            vi_name: "Bộ phận của sinh vật"
        }, {
            id: 151,
            jp_name: "病気名_その他",
            en_name: "Disease_Other",
            vi_name: "Bệnh tật"
        }, {
            id: 152,
            jp_name: "動物病気名",
            en_name: "Animal_Disease",
            vi_name: "Bệnh động vật"
        }, {
            id: 153,
            jp_name: "色名_その他",
            en_name: "Color_Other",
            vi_name: "Màu sắc"
        }, {
            id: 154,
            jp_name: "自然色名",
            en_name: "Nature_Color",
            vi_name: "Màu tự nhiên"
        }, {
            id: 155,
            jp_name: "時間表現_その他",
            en_name: "Time_Top_Other",
            vi_name: "Thời gian - thời điểm"
        }, {
            id: 156,
            jp_name: "時間_その他",
            en_name: "Timex_Other",
            vi_name: "Thời điểm"
        }, {
            id: 157,
            jp_name: "時刻表現",
            en_name: "Time",
            vi_name: "Thời gian - thời khắc"
        }, {
            id: 158,
            jp_name: "日付表現",
            en_name: "Date",
            vi_name: "Ngày tháng"
        }, {
            id: 159,
            jp_name: "曜日表現",
            en_name: "Day_Of_Week",
            vi_name: "Ngày trong tuần"
        }, {
            id: 160,
            jp_name: "時代表現",
            en_name: "Era",
            vi_name: "Thời đại"
        }, {
            id: 161,
            jp_name: "期間_その他",
            en_name: "Periodx_Other",
            vi_name: "Thời kỳ"
        }, {
            id: 162,
            jp_name: "時刻期間",
            en_name: "Period_Time",
            vi_name: "Số thời gian"
        }, {
            id: 163,
            jp_name: "日数期間",
            en_name: "Period_Day",
            vi_name: "Số ngày"
        }, {
            id: 164,
            jp_name: "週数期間",
            en_name: "Period_Week",
            vi_name: "Số tuần"
        }, {
            id: 165,
            jp_name: "月数期間",
            en_name: "Period_Month",
            vi_name: "Số tháng"
        }, {
            id: 166,
            jp_name: "年数期間",
            en_name: "Period_Year",
            vi_name: "Số năm"
        }, {
            id: 167,
            jp_name: "数値表現_その他",
            en_name: "Numex_Other",
            vi_name: "Số liệu"
        }, {
            id: 168,
            jp_name: "金額表現",
            en_name: "Money",
            vi_name: "Số tiền"
        }, {
            id: 169,
            jp_name: "株指標",
            en_name: "Stock_Index",
            vi_name: "Chỉ số chứng khoán"
        }, {
            id: 170,
            jp_name: "ポイント",
            en_name: "Point",
            vi_name: "Điểm số"
        }, {
            id: 171,
            jp_name: "割合表現",
            en_name: "Percent",
            vi_name: "Số phần trăm"
        }, {
            id: 172,
            jp_name: "倍数表現",
            en_name: "Multiplication",
            vi_name: "Bội số"
        }, {
            id: 173,
            jp_name: "頻度表現",
            en_name: "Frequency",
            vi_name: "Tần số"
        }, {
            id: 174,
            jp_name: "年齢",
            en_name: "Age",
            vi_name: "Tuổi tác"
        }, {
            id: 175,
            jp_name: "学齢",
            en_name: "School_Age",
            vi_name: "Tuổi năm học"
        }, {
            id: 176,
            jp_name: "序数",
            en_name: "Ordinal_Number",
            vi_name: "Số thứ tự"
        }, {
            id: 177,
            jp_name: "順位表現",
            en_name: "Rank",
            vi_name: "Thứ hạng"
        }, {
            id: 178,
            jp_name: "緯度経度",
            en_name: "Latitude_Longitude",
            vi_name: "Kinh độ, vĩ độ"
        }, {
            id: 179,
            jp_name: "寸法表現_その他",
            en_name: "Measurement_Other",
            vi_name: "Đo lường"
        }, {
            id: 180,
            jp_name: "長さ",
            en_name: "Physical_Extent",
            vi_name: "Chiều dài"
        }, {
            id: 181,
            jp_name: "面積",
            en_name: "Space",
            vi_name: "Diện tích"
        }, {
            id: 182,
            jp_name: "体積",
            en_name: "Volume",
            vi_name: "Thể tích"
        }, {
            id: 183,
            jp_name: "重量",
            en_name: "Weight",
            vi_name: "Trọng lượng"
        }, {
            id: 184,
            jp_name: "速度",
            en_name: "Speed",
            vi_name: "Tốc độ"
        }, {
            id: 185,
            jp_name: "密度",
            en_name: "Intensity",
            vi_name: "Mật độ"
        }, {
            id: 186,
            jp_name: "温度",
            en_name: "Temperature",
            vi_name: "Nhiệt độ"
        }, {
            id: 187,
            jp_name: "カロリー",
            en_name: "Calorie",
            vi_name: "Kalo"
        }, {
            id: 188,
            jp_name: "震度",
            en_name: "Seismic_Intensity",
            vi_name: "Độ rung (động đất)"
        }, {
            id: 189,
            jp_name: "マグニチュード",
            en_name: "Seismic_Magnitude",
            vi_name: "Độ richter"
        }, {
            id: 190,
            jp_name: "個数_その他",
            en_name: "Countx_Other",
            vi_name: "Số lượng"
        }, {
            id: 191,
            jp_name: "人数",
            en_name: "N_Person",
            vi_name: "Số người"
        }, {
            id: 192,
            jp_name: "組織数",
            en_name: "N_Organization",
            vi_name: "Số tổ chức"
        }, {
            id: 193,
            jp_name: "場所数_その他",
            en_name: "N_Location_Other",
            vi_name: "Số nơi, số địa điểm"
        }, {
            id: 194,
            jp_name: "国数",
            en_name: "N_Country",
            vi_name: "Số quốc gia"
        }, {
            id: 195,
            jp_name: "施設数",
            en_name: "N_Facility",
            vi_name: "Số cơ sở"
        }, {
            id: 196,
            jp_name: "製品数",
            en_name: "N_Product",
            vi_name: "Số sản phẩm"
        }, {
            id: 197,
            jp_name: "イベント数",
            en_name: "N_Event",
            vi_name: "Số sự kiện"
        }, {
            id: 198,
            jp_name: "自然物数_その他",
            en_name: "N_Natural_Object_Other",
            vi_name: "Số vật tự nhiên"
        }, {
            id: 199,
            jp_name: "動物数",
            en_name: "N_Animal",
            vi_name: "Số con"
        }, {
            id: 200,
            jp_name: "植物数",
            en_name: "N_Flora",
            vi_name: "Số cây"
        }],
        l = function(e) {
            return e = (e = (e = (e = (e = (e = (e = (e = e.toLowerCase()).replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")).replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")).replace(/ì|í|ị|ỉ|ĩ/g, "i")).replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")).replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")).replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")).replace(/đ/g, "d")
        };
    return o.getIdCategory = function(e) {
        for (var t = null, n = 0; n < s.length; n++) {
            var a = s[n].en_name.toLowerCase(),
                i = e.toLowerCase();
            if (-1 != a.indexOf(i)) return t = s[n]
        }
        return t
    }, o.getAllCategory = function(e) {
        e(s)
    },
        function() {
            for (var e = 0; e < s.length; e++) {
                var t = l(s[e].vi_name);
                s[e].ten_khongdau = t
            }
        }(), o
}]), (maziiServ = angular.module("mazii.service.example", [])).factory("exampleServer", ["$rootScope", "$http", "$stateParams", "$state", "cookieServ", "encryptionServ", function(e, s, t, n, l, c) {
    var a = {},
        i = "//predata.mazii.net/",
        r = "//api.mazii.net/api/";
    a.getExampleCheck = function(e, t) {
        var n = i + "getSenAsk?idcurrent=" + e;
        s.get(n).success(function(e) {
            t(e)
        })
    }, a.addExampleRight = function(e, t) {
        s({
            url: "//predata.mazii.net/chooseRight",
            method: "POST",
            data: {
                id: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.addExampleWrong = function(e, t) {
        s({
            url: "//predata.mazii.net/chooseFalse",
            method: "POST",
            data: {
                id: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.addExampleUser = function(e, t, n, a) {
        s({
            url: "//predata.mazii.net/addAnswer",
            method: "POST",
            data: {
                id: e,
                mean: t,
                owner: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.getJob = function(t) {
        var e = l.getCookie("tokenId");
        e = c.decode(e);
        s({
            url: "//api.mazii.net/api/get-job",
            method: "POST",
            data: {
                tokenId: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.addMean = function(e, t, n, a) {
        var i = l.getCookie("tokenId");
        i = c.decode(i);
        s({
            url: "//api.mazii.net/api/c-add-mean",
            method: "POST",
            data: {
                tokenId: i,
                name: e,
                jobId: t,
                mean: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.actionReview = function(e, t, n, a) {
        var i = l.getCookie("tokenId");
        i = c.decode(i);
        s({
            url: "//api.mazii.net/api/action-review",
            method: "POST",
            data: {
                tokenId: i,
                jobId: e,
                name: t,
                meanId: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.unlockJob = function(e, t, n) {
        s({
            url: "//api.mazii.net/api/unlock-job",
            method: "POST",
            data: {
                name: e,
                jobId: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.getTopPoint = function(e, t) {
        if (e) n = r + "get-top-point/" + e;
        else var n = r + "get-top-point";
        s.get(n).success(function(e) {
            t(e)
        })
    }, a.getJobKey = function(e, t) {
        var n = l.getCookie("tokenId");
        n = c.decode(n);
        s({
            url: "//api.mazii.net/api/get-job-key",
            method: "POST",
            data: {
                tokenId: n,
                key: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.getProfile = function(e, t, n) {
        var a = l.getCookie("tokenId");
        a = c.decode(a);
        s({
            url: "//api.mazii.net/api/get-profile",
            method: "POST",
            data: {
                tokenId: a,
                userId: t,
                name: e
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.getProfileInfor = function(e, t, n) {
        var a = l.getCookie("tokenId");
        a = c.decode(a);
        s({
            url: "//api.mazii.net/api/get-profile",
            method: "POST",
            data: {
                tokenId: a,
                name: e,
                profileId: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.editProfile = function(e, t, n, a, i) {
        var r = l.getCookie("tokenId");
        r = c.decode(r);
        s({
            url: "//api.mazii.net/api/edit-profile",
            method: "POST",
            data: {
                tokenId: r,
                profileId: e,
                profile_name: t,
                field_change: n,
                value: a
            }
        }).then(function(e) {
            i(e)
        }, function(e) {
            i(e)
        })
    }, a.createProfileUser = function(e, t) {
        s({
            url: "//api.mazii.net/api/add-profile-user",
            method: "POST",
            data: e
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.editProfileUser = function(e, t) {
        s({
            url: "//api.mazii.net/api/edit-profile-user-all",
            method: "POST",
            data: e
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.createProfileCenter = function(e, t) {
        s({
            url: "//api.mazii.net/api/add-profile-center",
            method: "POST",
            data: e
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.editProfileCenter = function(e, t) {
        s({
            url: "//api.mazii.net/api/edit-profile-center-all",
            method: "POST",
            data: e
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.createProduct = function(e, t) {
        s({
            url: "//api.mazii.net/api/add-product",
            method: "POST",
            data: e
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.editProduct = function(e, t) {
        s({
            url: "//api.mazii.net/api/edit-product",
            method: "POST",
            data: e
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.deleteProduct = function(e, t, n) {
        var a = l.getCookie("tokenId");
        a = c.decode(a);
        s({
            url: "//api.mazii.net/api/delete-product",
            method: "POST",
            data: {
                tokenId: a,
                profileId: e,
                productId: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.getListCenter = function(e, t) {
        s({
            url: "//api.mazii.net/api/get-list-report-center",
            method: "POST",
            data: {
                type: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.checkProfile = function(e, t) {
        s({
            url: "//api.mazii.net/api/check-user",
            method: "POST",
            data: {
                userId: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.getHistoryAction = function(e, t, n, a) {
        var i = l.getCookie("tokenId");
        i = c.decode(i);
        s({
            url: "//api.mazii.net/api/get-history-action",
            method: "POST",
            data: {
                tokenId: i,
                page: t,
                limit: n,
                userId: e,
                action: "view"
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.postAvatar = function(e, t, n) {
        var a = l.getCookie("tokenId");
        a = c.decode(a);
        s({
            url: "//api.mazii.net/api/up-base64",
            method: "POST",
            data: {
                tokenId: a,
                type: e,
                link: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.getSentenceDict = function(t) {
        var e = l.getCookie("tokenId");
        e = c.decode(e);
        s({
            url: "//api.mazii.net/api/dict",
            method: "POST",
            data: {
                token: e,
                limit: 50
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.answerSentenceDict = function(e, t, n, a, i, r) {
        var o = l.getCookie("tokenId");
        o = c.decode(o);
        s({
            url: "//api.mazii.net/api/dict/review",
            method: "POST",
            data: {
                token: o,
                wordId: e,
                review: t,
                answer: n,
                translate: a,
                type: i
            }
        }).then(function(e) {
            r(e)
        }, function(e) {
            r(e)
        })
    }, a.getRankDict = function(t) {
        s({
            url: "//api.mazii.net/api/dict/rank",
            method: "GET"
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.getHistoryDict = function(t) {
        var e = l.getCookie("tokenId");
        e = c.decode(e);
        s({
            url: "//api.mazii.net/api/dict/history",
            method: "POST",
            data: {
                token: e,
                limit: 100,
                page: 1
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.cronJobDict = function(t) {
        s({
            url: "//api.mazii.net/api/dict/cron",
            method: "GET"
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    };
    var o = null;
    return a.getExamDict = function(e) {
        var t = Math.floor(4 * Math.random());
        e(o[t])
    }, null == o && $.ajax({
        type: "GET",
        url: "db/exam.json",
        success: function(e, t, n) {
            var a = null;
            a = "string" == typeof e ? JSON.parse(e) : e, o = a
        },
        error: function(e, t, n) {}
    }), a.allowUserDict = function(t) {
        var e = l.getCookie("tokenId");
        e = c.decode(e);
        s({
            url: "//api.mazii.net/api/dict/register",
            method: "POST",
            data: {
                token: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a
}]);
var maziiServ, BASE_URL = "//jlpt.mazii.net/api/";
(maziiServ = angular.module("mazii.service.test", [])).factory("TestServer", ["$rootScope", "$http", "$stateParams", "$state", function(e, t, n, a) {
    var i = {},
        r = "Bearer P9sWf88kPCnNZYkCdBALnsBXBEwZghc4";
    return i.getListByLevel = function(e) {
        return t({
            method: "GET",
            url: BASE_URL + "test-list?type=jlpt&level=" + e + "&descending=1",
            headers: {
                Authorization: r
            }
        }).then(function(e) {
            return null == e ? null : e.data
        }, function(e) {
            return null
        })
    }, i.getTestById = function(e) {
        return t({
            method: "GET",
            url: BASE_URL + "test/" + e,
            headers: {
                Authorization: r
            }
        }).then(function(e) {
            return null == e ? null : e.data
        }, function(e) {
            return console.log(e), null
        })
    }, i
}]), (maziiServ = angular.module("mazii.service.translateNews", [])).factory("TranslateNewsServ", ["$rootScope", "$http", "$stateParams", "$state", function(e, l, t, n) {
    var a = {
        getTranslateforId: function(e, t, n, a) {
            var i = "//api.mazii.net/ej/api/news/" + e + "/" + t + "/" + n;
            l.get(i).success(function(e) {
                a(e)
            }).error(function(e) {
                a({
                    statuscode: 404,
                    messenger: "not found! "
                })
            })
        },
        addNewTranslate: function(e, t, n, a, i, r) {
            i = i || "Anonymous";
            var o = JSON.stringify(a),
                s = "//api.mazii.net/ej/api/addnews?uuid=" + e + "&id=" + t + "&contrycode=" + n + "&username=" + i + "&content=" + encodeURIComponent(o);
            l.post(s).success(function(e) {
                r(e)
            })
        },
        VoteTranslate: function(e, t, n, a, i) {
            var r = "//api.mazii.net/ej/api/ratting?uuid=" + t + "&&rate=" + a + "&&news_id=" + e + "&createid=" + n;
            l.post(r).success(function(e) {
                i(e)
            })
        }
    };
    return a
}]), (maziiServ = angular.module("mazii.service.community", [])).factory("communityServer", ["$rootScope", "$http", "$stateParams", "$state", "cookieServ", "encryptionServ", function(e, o, t, n, s, l) {
    var a = {},
        c = "//api.mazii.net/api/social/";
    return a.getAllMember = function(t) {
        o.get("//api.mazii.net/api/social/all-member").success(function(e) {
            t(e)
        })
    }, a.getPost = function(e, t, n) {
        var a = s.getCookie("tokenId");
        a = l.decode(a);
        o({
            url: "//api.mazii.net/api/social/get-post",
            method: "POST",
            data: a ? {
                page: e,
                limit: t,
                token: a
            } : {
                page: e,
                limit: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.addPost = function(e, t, n, a) {
        var i = s.getCookie("tokenId");
        i = l.decode(i);
        o({
            url: "//api.mazii.net/api/social/add-post",
            method: "POST",
            data: {
                token: i,
                post: e,
                category: t,
                title: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.getPostNoAnswer = function(e, t, n) {
        var a = s.getCookie("tokenId");
        a = l.decode(a);
        o({
            url: "//api.mazii.net/api/social/post-no-answer",
            method: "POST",
            data: a ? {
                page: e,
                limit: t,
                token: a
            } : {
                page: e,
                limit: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.searchPost = function(e, t) {
        var n = s.getCookie("tokenId");
        n = l.decode(n);
        o({
            url: "//api.mazii.net/api/social/search-post",
            method: "POST",
            data: {
                key: e,
                page: 1,
                limit: 24
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.getPostWidthId = function(e, t) {
        var n = s.getCookie("tokenId");
        n = l.decode(n);
        o({
            url: "//api.mazii.net/api/social/post-with-id",
            method: "POST",
            data: n ? {
                id: e,
                token: n
            } : {
                id: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.addComment = function(e, t, n) {
        var a = s.getCookie("tokenId");
        a = l.decode(a);
        o({
            url: "//api.mazii.net/api/social/add-comment",
            method: "POST",
            data: {
                token: a,
                comment: e,
                postId: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.addParComment = function(e, t, n) {
        var a = s.getCookie("tokenId");
        a = l.decode(a);
        o({
            url: "//api.mazii.net/api/social/add-par-comment",
            method: "POST",
            data: {
                token: a,
                content: e,
                commentId: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.getNotify = function(t) {
        var e = s.getCookie("tokenId");
        e = l.decode(e);
        o({
            url: "//api.mazii.net/api/social/get-notify",
            method: "POST",
            data: {
                token: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.getRank = function(t) {
        o.get("//api.mazii.net/api/social/rank").success(function(e) {
            t(e)
        })
    }, a.getRankByKey = function(e, t) {
        var n = c + "rank/" + e;
        o.get(n).success(function(e) {
            t(e)
        })
    }, a.viewNotify = function(e, t) {
        var n = s.getCookie("tokenId");
        n = l.decode(n);
        o({
            url: "//api.mazii.net/api/social/view-notify",
            method: "POST",
            data: {
                token: n,
                id: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.votePost = function(e, t, n, a) {
        var i = s.getCookie("tokenId");
        i = l.decode(i);
        o({
            url: "//api.mazii.net/api/social/like",
            method: "POST",
            data: {
                token: i,
                id: e,
                action: t,
                type: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.unVotePost = function(e, t, n, a) {
        var i = s.getCookie("tokenId");
        i = l.decode(i);
        o({
            url: "//api.mazii.net/api/social/unlike",
            method: "POST",
            data: {
                token: i,
                id: e,
                action: t,
                type: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.followPost = function(e, t, n) {
        var a = s.getCookie("tokenId");
        a = l.decode(a);
        o({
            url: "//api.mazii.net/api/social/follow",
            method: "POST",
            data: {
                token: a,
                type: t,
                followId: e
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.unFollowPost = function(e, t, n) {
        var a = s.getCookie("tokenId");
        a = l.decode(a);
        o({
            url: "//api.mazii.net/api/social/unfollow",
            method: "POST",
            data: {
                token: a,
                type: t,
                followId: e
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.updatePost = function(e, t, n, a) {
        var i, r = s.getCookie("tokenId");
        r = l.decode(r), 1 == n ? i = c + "edit-post" : 2 == n ? i = c + "edit-comment" : 3 == n && (i = c + "edit-par-comment"), o({
            url: i,
            method: "POST",
            data: {
                token: r,
                id: e,
                content: t
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.updateMyPost = function(e, t, n, a, i) {
        var r = s.getCookie("tokenId");
        r = l.decode(r);
        o({
            url: "//api.mazii.net/api/social/edit-post",
            method: "POST",
            data: {
                token: r,
                id: e,
                content: t,
                category: n,
                title: a
            }
        }).then(function(e) {
            i(e)
        }, function(e) {
            i(e)
        })
    }, a.deletePost = function(e, t, n) {
        var a, i = s.getCookie("tokenId");
        i = l.decode(i), 1 == t ? a = c + "delete-post" : 2 == t ? a = c + "delete-comment" : 3 == t && (a = c + "delete-par-comment"), o({
            url: a,
            method: "POST",
            data: {
                token: i,
                id: e
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.postOfUser = function(t) {
        var e = s.getCookie("tokenId");
        e = l.decode(e);
        o({
            url: "//api.mazii.net/api/social/post-for-user",
            method: "POST",
            data: {
                token: e,
                page: 1,
                limit: 12
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.getListPostNew = function(t) {
        o.get("//api.mazii.net/api/social/latest-post").success(function(e) {
            t(e)
        })
    }, a.getCommentById = function(e, t) {
        var n = s.getCookie("tokenId");
        n = l.decode(n);
        o({
            url: "//api.mazii.net/api/social/comment-for-post",
            method: "POST",
            data: n ? {
                id: e,
                token: n
            } : {
                id: e
            }
        }).then(function(e) {
            t(e)
        }, function(e) {
            t(e)
        })
    }, a.getCategory = function(t) {
        o.get("//api.mazii.net/api/social/get-category").success(function(e) {
            t(e)
        })
    }, a.getPostByCategory = function(e, t, n, a, i) {
        var r = s.getCookie("tokenId");
        r = l.decode(r);
        o({
            url: "//api.mazii.net/api/social/post-for-category",
            method: "POST",
            data: r ? {
                page: e,
                limit: t,
                category: n,
                type: a,
                token: r
            } : {
                page: e,
                limit: t,
                category: n,
                type: a
            }
        }).then(function(e) {
            i(e)
        }, function(e) {
            i(e)
        })
    }, a.followCategory = function(e, t, n) {
        var a = s.getCookie("tokenId");
        a = l.decode(a);
        o({
            url: "//api.mazii.net/api/social/user-category",
            method: "POST",
            data: {
                token: a,
                category: e,
                action: t
            }
        }).then(function(e) {
            n(e)
        }, function(e) {
            n(e)
        })
    }, a.getListPostOfUser = function(e, t, n, a) {
        var i = s.getCookie("tokenId");
        i = l.decode(i);
        o({
            url: "//api.mazii.net/api/social/list-post-of-user",
            method: "POST",
            data: i ? {
                page: t,
                limit: n,
                user: e,
                token: i
            } : {
                page: t,
                limit: n,
                user: e
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a.reportPost = function(e, t, n, a) {
        var i = s.getCookie("tokenId");
        i = l.decode(i);
        o({
            url: "//api.mazii.net/api/social/report",
            method: "POST",
            data: {
                token: i,
                id: e,
                type: t,
                reason: n
            }
        }).then(function(e) {
            a(e)
        }, function(e) {
            a(e)
        })
    }, a
}]);
var initSearchCtrl = !1,
    initJlptCtrl = !1,
    SHOW_NOTIFY_NEW_VERSION = !0,
    TIME_SHOW_SURVAY = 3e4,
    PAGINATION_REPORT_MEAN = 5,
    FLAG_MAZII_PLUGIN = "invalid",
    MAZII_PLUGIN_ID = "lkjffochdceoneajnigkbdddjdekhojj",
    HOME_PAGE_KEYWORDS = "từ điển nhật việt, tu dien nhat viet, tu dien tieng nhat, tu dien viet nhat, từ điển tiếng nhật, từ điển việt nhật, từ điển nhật việt online, từ điển tiếng nhật online, từ điển việt nhật online, từ điển tiếng nhật có phát âm, hoc tieng nhat, học tiếng nhật, mien phi, miễn phí, Từ điển, tu dien, tiếng nhật, tieng nhat, Tu dien Han Viet, Hán Việt, Nhat Anh, Nhat Nhat,tiếng Nhật,Ngu Phap tieng Nhat, Nhật, Việt, 漢字,日本語,tieng nhat, ngữ pháp tiếng nhật, ngu phap, học kanji, tập viết kanji, hán việt, han viet, kanji stroke, thứ tự viết, mazii, mazii.net, maji, mazil, JLPT, N1, N2, N3, N4, N5, tổng hợp, hoc tieng nhat online mien phi, học tiếng nhật online miễn phí, minano nihongo, mina no nihongo, japanese, dictionary, english, jisho, tangorin, mazzi,japanese dict, jdict, jedict, j-dict, dekiru",
    TRANSLATE_PAGE_KEYWORDS = "dịch việt nhật, dịch tiếng nhật, dịch nhật việt, dịch sang tiếng nhật, dịch tiếng nhật chuẩn, dịch tiếng việt sang tiếng nhật, dịch tiếng nhật sang tiếng việt, phần mềm dịch tiếng nhật, dịch tiếng nhật bằng hình ảnh, dịch tiếng nhật online, dịch tiếng nhật bằng camera, ứng dụng dịch tiếng nhật, dịch tiếng nhật máy giặt, ứng dụng dịch tiếng nhật bằng hình ảnh, dịch tiếng nhật trên tủ lạnh, dịch tiếng việt sang tiếng nhật bằng chữ hiragana, dịch tên tiếng việt sang tiếng nhật online, dịch tên tiếng việt sang tiếng nhật katakana, dịch tiếng việt sang tiếng nhật hiragana",
    JLPT_PAGE_KEYWORDS = "từ vựng n3, từ vựng n2, từ vựng n4 , từ vựng n5 , từ vựng n1, ngữ pháp n5, ngữ pháp n4, ngữ pháp n3, ngữ pháp n2, ngữ pháp n1, hán tự n5, hán tự n4, hán tự n3, hán tự n2, hán tự n1, hán tự 360, 1945 hán tự, 2000 hán tự, từ vựng n3 soumatome, từ vựng n3 mimi kara oboeru, từ vựng n2 mimi kara oboeru, từ vựng n3 pdf",
    JLPT_TEST_PAGE_KEYWORDS = "thi thử jlpt, đề thi thử jlpt n5, đề thi thử jlpt n4, đề thi thử jlpt n3, đề thi thử jlpt n2, đề thi thử jlpt n1, thi thử jlpt online",
    BOOK_PAGE_KEYWORDS = "sách tiếng nhật, sách học tiếng nhật, sách dạy tiếng nhật, sách tiếng nhật hay, sách học tiếng nhật cơ bản, mua sách tiếng nhật online, sách tự học tiếng nhật, sách học tiếng nhật cho người mới bắt đầu, bộ sách học tiếng nhật, sách bài tập tiếng nhật sơ cấp, sách tiếng nhật n1 - 5, sách tiếng nhật giá rẻ, sách học tiếng nhật bằng hình ảnh, sách luyện thi tiếng nhật, sách luyện nghe tiếng nhật sách học từ vựng tiếng nhật qua hình ảnh";
angular.module("mazii", ["ui.router", "mdo-angular-cryptography", "ui.bootstrap", "mazii.service.history", "mazii.service.note", "mazii.service.util", "mazii.service.search", "mazii.service.auth", "mazii.service.user", "mazii.service.cookie", "mazii.service.encryption", "mazii.service.spam", "mazii.service.category", "mazii.service.example", "mazii.service.test", "mazii.service.translateNews", "mazii.service.community", "ngAudio", "ngSanitize", "checklist-model", "ngImgCrop", "templates-main"]).config(["$stateProvider", "$urlRouterProvider", "$sceProvider", "$locationProvider", function(e, t, n, a) {
    a.hashPrefix("!"), t.otherwise("search"), t.when("/search?type&query", ["$match", "$stateParams", function(e, t) {
        return !!initSearchCtrl
    }]), t.when("/jlpt?type&level&page", ["$match", "$stateParams", function(e, t) {
        return !!initJlptCtrl
    }]), e.state("/", {
        url: "/",
        abstract: !0
    }).state("search", {
        url: "/search?dict&type&query",
        views: {
            main: {
                templateUrl: "views/search/main.html",
                controller: "SearchController"
            },
            right: {
                templateUrl: "views/search/right.html"
            }
        }
    }).state("news", {
        url: "/news?id",
        reloadOnSearch: !1,
        cache: !0,
        views: {
            main: {
                templateUrl: "views/news/main.html",
                controller: "NewsController"
            },
            right: {
                templateUrl: "views/news/right.html"
            },
            right2: {
                templateUrl: "views/news/right2.html"
            }
        }
    }).state("translate_news", {
        url: "/translate_news?id",
        reloadOnSearch: !1,
        views: {
            main: {
                templateUrl: "views/translate-news/main.html",
                controller: "TranslateNewsController"
            },
            right: {
                templateUrl: "views/translate-news/right.html"
            }
        }
    }).state("translate_user", {
        url: "/translate_user/:type",
        views: {
            main: {
                templateUrl: "views/translate-user/main.html",
                controller: "TranslateUserController"
            },
            right: {
                templateUrl: "views/translate-user/right.html"
            }
        }
    }).state("jlpt", {
        url: "/jlpt?type&level&page",
        views: {
            main: {
                templateUrl: "views/jlpt/main.html",
                controller: "JLPTController"
            },
            right: {
                templateUrl: "views/jlpt/right.html"
            }
        }
    }).state("note", {
        url: "/note",
        views: {
            main: {
                templateUrl: "views/note/main.html",
                controller: "NoteController"
            },
            right: {
                templateUrl: "views/note/right.html"
            }
        }
    }).state("write", {
        url: "/write",
        views: {
            main: {
                templateUrl: "views/write/main.html",
                controller: "WriteController"
            },
            right: {
                templateUrl: "views/write/right.html"
            }
        }
    }).state("select", {
        url: "/select",
        views: {
            main: {
                templateUrl: "views/select-test/main.html",
                controller: "SelectTestController"
            },
            right: {
                templateUrl: "views/select-test/right.html"
            }
        }
    }).state("test", {
        url: "/test/:id",
        views: {
            main: {
                templateUrl: "views/test/main.html",
                controller: "TestController"
            }
        }
    }).state("community", {
        url: "/community?id",
        views: {
            main: {
                templateUrl: "views/community/main.html",
                controller: "CommunityController"
            }
        }
    }).state("opendict", {
        url: "/opendict",
        views: {
            main: {
                templateUrl: "views/dict-extra/main.html",
                controller: "DictExtraController"
            }
        }
    }).state("bookstore", {
        url: "/bookstore",
        views: {
            main: {
                templateUrl: "views/bookstore/main.html",
                controller: "BookstoreController"
            }
        }
    }).state("profile-center", {
        url: "/profile-center",
        views: {
            main: {
                templateUrl: "views/profile-center/main.html",
                controller: "ProfileCenterController"
            }
        }
    }).state("infor-center", {
        url: "/infor-center/:id",
        views: {
            main: {
                templateUrl: "views/infor-center/main.html",
                controller: "InforCenterController"
            }
        }
    }).state("infor-user", {
        url: "/infor-user/:id/:name",
        views: {
            main: {
                templateUrl: "views/infor-user/main.html",
                controller: "InforUserController"
            }
        }
    }).state("help", {
        url: "/help",
        views: {
            main: {
                templateUrl: "views/help/main.html",
                controller: "HelpController"
            }
        }
    }).state("about", {
        url: "/about",
        views: {
            main: {
                templateUrl: "views/about/main.html",
                controller: "AboutController"
            }
        }
    }).state("term", {
        url: "/term",
        views: {
            main: {
                templateUrl: "views/term/main.html",
                controller: "TermController"
            }
        }
    }).state("sentence", {
        url: "/sentence",
        views: {
            main: {
                templateUrl: "views/sentence/main.html",
                controller: "SentenceController"
            },
            right: {
                templateUrl: "views/sentence/right.html"
            }
        }
    }).state("login", {
        url: "/login",
        views: {
            main: {
                templateUrl: "views/login/main.html",
                controller: "LoginController"
            },
            right: {
                templateUrl: "views/login/right.html"
            }
        }
    }).state("register", {
        url: "/register",
        views: {
            main: {
                templateUrl: "views/register/main.html",
                controller: "RegisterController"
            }
        }
    }).state("change-password", {
        url: "/change-password",
        views: {
            main: {
                templateUrl: "views/change-password/main.html",
                controller: "ChangePasswordController"
            },
            right: {
                templateUrl: "views/change-password/right.html"
            }
        }
    }).state("profile", {
        url: "/profile",
        views: {
            main: {
                templateUrl: "views/profile/main.html",
                controller: "ProfileController"
            }
        }
    }).state("reset-password", {
        url: "/reset-password/:key",
        views: {
            main: {
                templateUrl: "views/reset-password/main.html",
                controller: "ResetPasswordController"
            },
            right: {
                templateUrl: "views/reset-password/right.html"
            }
        }
    }).state("detail-grammar", {
        url: "/detail-grammar/:id",
        views: {
            main: {
                templateUrl: "views/detail-grammar/main.html",
                controller: "DetailGrammarController"
            }
        }
    }), n.enabled(!1)
}]).run(["$rootScope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "$stateParams", "$location", "authServ", "localstoreServ", "$http", "userServ", function(o, i, e, r, s, l, t, n, a, c, u, d) {
    var m, h, g, p;
    window.fbAsyncInit = function() {
        FB.init({
            appId: "1428630557429556",
            xfbml: !0,
            version: "v2.8"
        })
    }, m = document, h = "facebook-jssdk", p = m.getElementsByTagName("script")[0], m.getElementById(h) || ((g = m.createElement("script")).id = h, g.src = "//connect.facebook.net/en_US/sdk.js", p.parentNode.insertBefore(g, p)), o.initFlashcard = !1, d.init().then(function(e) {
        null != e && 200 == e.status ? (o.user = e.result, c.getItem("inforUser") || c.setItem("inforUser", e.result), o.$broadcast("login.success"), o.user && trackUser(o.user.userId)) : (o.user = null, c.deleteItem("rateMean"), c.deleteItem("inforUser"));
        s.showInformationUser()
    }), o.$on("login.success", function() {
        o.categories = [];
        var n = 0,
            a = function() {
                d.getCategory(n).then(function(e) {
                    if (null != e && 0 != e.length) {
                        for (var t = 0; t < e.length; t++) o.categories.push(e[t]);
                        100 == e.length ? (n++, a()) : o.$broadcast("load.category.success")
                    }
                })
            };
        a()
    }), o.getState = function(e) {
        var t, n = window.location.href,
            a = n.indexOf("#!/"),
            i = n.indexOf("?");
        return t = -1 != i ? n.slice(a + 3, i) : n.substr(a + 3, n.length), "select" != e ? t == e ? "active" : "translate_news" == t && "news" == e || "translate_user" == t && "news" == e ? "active" : "" : t == e || "test" == t && "select" == e ? "active2" : void 0
    };
    var f = c.getItem("showFurigana"),
        v = c.getItem("showSuggest");
    void 0 !== f && null != f || c.setItem("showFurigana", !0), void 0 !== v && null != v || c.setItem("showSuggest", !0), f ? $("#setting_css").remove() : $("head").append('<style id="setting_css">rt{display: none;}</style>'), o.$on("$stateChangeSuccess", function(e, t, n, a, i) {
        "search" == a.name && (initSearchCtrl = !1), "jlpt" == a.name && (initJlptCtrl = !1), "search" !== t.name ? o.enableInstantView = !0 : o.enableInstantView = !1, "" == a.name && "note" == t.name && (o.currentNoteRoute = !0), "" != a.name && a.name != t.name ? (o.doneReload = !1, setTimeout(function() {
            location.reload()
        }, 500)) : "" == a.name && (o.doneReload = !0), y()
    }), 1 == performance.navigation.type && (o.doneReload = !0), o.noResults = !1, o.examples = null, o.words = null, o.kanjis = null, o.grammars = null, o.tabSelected = 0, o.showLoading = !1, o.currentKanjiSelected = 0, o.showKanjiDraw = !1, o.showKanjiDrawTable = function() {
        o.showKanjiDraw = !o.showKanjiDraw
    }, o.$on("query", function(e, t) {
        null == t.query ? o.startQuery(t, !0) : (o.setTabByChar(t.type[0]), "grammarDetail" != t.type ? o.startQuery(t.query, !0, t.aux) : o.queryGrammarDetail(t.query)), $("#instant-search").modal()
    }), o.lang = "JA", o.changeLang = function() {
        "JA" == o.lang ? o.lang = "VI" : o.lang = "JA"
    }, o.queryGrammarDetail = function(e) {
        o.noResults = !1, o.examples = null, o.words = null, o.kanjis = null, o.grammars = null, o.grammarDetail = null, o.suggest = null, o.googleTranslate = null, r.search("grammar_detail", e).then(function(e) {
            o.titleInstantSearch = "Tra nhanh ngữ pháp: ", o.grammarDetail = e, o.noResults = !1
        })
    }, o.startQuery = function(i, e, t) {
        o.noResults = !1, o.examples = null, o.words = null, o.kanjis = null, o.grammars = null, o.grammarDetail = null, o.suggest = null, o.googleTranslate = null, o.wordAux = t, o.originQuery = null, o.baseFormWord = null;
        var n = !1;
        if (0 == s.isJapanese(i) && (s.isVietnamese(i) ? (i = i.toLowerCase(), n = !0) : (i[0] == i[0].toUpperCase() && 1 < i.length && i[1] == i[1].toLowerCase() && (i = i.toLowerCase()), i = wanakana.toKana(i))), 0 == o.tabSelected) {
            o.titleInstantSearch = "Tra nhanh từ vựng: " + i, l.push(i, "word", n ? "VI" : "JA");
            if (n && "vija", !n && 0 == s.isExistWord(i)) {
                var a = s.getBaseForm(i);
                a != i && (o.originQuery = i, o.baseFormWord = a, i = a)
            }
            r.search("word", i).then(function(e) {
                var t = "ja",
                    n = "vi";
                if (n = s.isJapanese(i) ? (t = "ja", "vi") : (t = "vi", "ja"), 200 == e.status) {
                    if (null != e.data)
                        for (var a = 0; a < e.data.length; a++)
                            if (e.data[a].word == i || e.data[a].phonetic == i) {
                                e.found = !0;
                                break
                            } if (0 == e.found) o.suggest = e.data, r.cloudTranslate(i, t, n).then(function(e) {
                        o.googleTranslate = e, null == o.$$phase && o.$apply()
                    });
                    else {
                        o.words = [], o.suggest = [];
                        for (a = 0; a < e.data.length; a++) e.data[a].word == i || e.data[a].phonetic == i ? o.words.push(e.data[a]) : o.suggest.push(e.data[a])
                    }
                    o.showLoading = !1
                } else o.words = null, o.showLoading = !1, r.cloudTranslate(i, t, n).then(function(e) {
                    o.googleTranslate = e, null == o.$$phase && o.$apply()
                })
            }, function(e) {
                o.words = null, o.showLoading = !1, o.noResults = !0, r.cloudTranslate(i, from, to).then(function(e) {
                    o.googleTranslate = e, null == o.$$phase && o.$apply()
                })
            }), r.search("kanji", i).then(function(e) {
                if (200 == e.status) {
                    if (s.isJapanese(i)) {
                        var t = s.getKanjiChara(i);
                        o.resultKanjis = s.sortHVDataByKeyWord(t, e.results)
                    } else o.resultKanjis = e.results;
                    o.noResultsKanjis = !1
                } else o.resultKanjis = null, o.noResultsKanjis = !0
            }, function(e) {
                o.resultKanjis = null, o.noResultsKanjis = !0
            })
        } else 1 == o.tabSelected ? (o.titleInstantSearch = "Tra nhanh hán tự : " + i, r.search("kanji", i).then(function(e) {
            if (o.currentKanjiSelected = 0, 200 == e.status) {
                var t = s.getKanjiChara(i);
                o.kanjis = s.sortHVDataByKeyWord(t, e.results), o.showLoading = !1, l.push(i, "kanji")
            } else o.kanjis = null, o.showLoading = !1, o.noResults = !0
        }, function(e) {
            o.kanjis = null, o.showLoading = !1, o.noResults = !0
        })) : 3 == o.tabSelected ? (o.titleInstantSearch = "Tra nhanh ngữ pháp: " + i, r.search("grammar", i).then(function(e) {
            200 == e.status ? (o.grammars = e.results, o.showLoading = !1, l.push(i, "grammar")) : (o.grammars = null, o.showLoading = !1, o.noResults = !0)
        }, function(e) {
            o.grammars = null, o.showLoading = !1, o.noResults = !0
        })) : 2 == o.tabSelected && r.search("example", i).then(function(e) {
            200 == e.status ? (o.examples = e.results, o.showLoading = !1, l.push(i, "example")) : (o.examples = null, o.showLoading = !1, o.noResults = !0)
        }, function(e) {
            o.examples = null, o.showLoading = !1, o.noResults = !0
        })
    }, o.changeKanjiShow = function(e) {
        o.currentKanjiSelected = e
    }, o.getCurrentKanji = function() {
        return o.kanjis[o.currentKanjiSelected]
    }, o.kanjiSeletectClass = function(e) {
        return o.currentKanjiSelected == e ? "selected" : ""
    }, o.getCurrentType = function() {
        switch (o.tabSelected) {
            case 0:
                return "w";
            case 1:
                return "k";
            case 2:
                return "s";
            case 3:
                return "g"
        }
        return "w"
    }, o.setTabByChar = function(e) {
        null == e || "" == e ? o.tabSelected = 0 : "w" == e ? o.tabSelected = 0 : "k" == e ? o.tabSelected = 1 : "e" == e ? o.tabSelected = 2 : "g" == e ? o.tabSelected = 3 : "s" == e && (o.tabSelected = 2)
    }, o.addWord = {}, o.addWord.show = function() {
        o.newword = {}, $("#add-word").modal()
    }, o.addWord.send = function(e) {
        null != e && null != e.word && "" != e.word && null != e.mean && "" != e.mean ? null != o.user ? (e.userId = o.user.userId, e.username = o.user.username, d.addWord(e).then(function(e) {
            o.showAlert("Cảm ơn bạn đã góp ý, chúng tôi sẽ cập nhật mục từ này sớm"), o.newword = {}
        }, function(e) {
            o.showAlert("Từ chưa được gửi đi, vui lòng thử lại.")
        })) : o.showAlert("Bạn cần đăng nhập để sử dụng tính năng này.") : o.showAlert("Hãy nhập vào từ và nghĩa")
    }, o.report = {}, o.alert = {}, o.report.send = function(e) {
        null == e || "" == e ? o.report.noComment = !0 : (null != o.report.id && null != o.report.type || ($("#reportModal").modal("hide"), o.showAlert("Báo lỗi không thành công, bạn hãy thử lại.")), (new(Parse.Object.extend("ReportWrong"))).save({
            entryId: o.report.id,
            type: o.report.type,
            comment: o.report.comment,
            entry: o.report.entry
        }, {
            success: function(e) {
                $("#reportModal").modal("hide"), o.showAlert("Cảm ơn bạn. Chúng tôi sẽ xem xét và sửa lại nội dung này.")
            },
            error: function(e, t) {
                $("#reportModal").modal("hide"), o.showAlert("Báo lỗi không thành công, bạn hãy thử lại.")
            }
        }))
    }, o.showAlert = function(e) {
        o.alert.message = e, $("#alertModal").modal()
    };
    var y = function() {
        var e = i.current.name,
            t = "",
            n = "",
            a = "";
        a = "search" == e || "write" == e || "term" == e ? (t = "col-lg-9 col-md-12 col-xs-12", n = "col-lg-3 col-md-12 col-xs-12", "") : "news" == e ? (t = "col-lg-6 col-md-6 col-xs-12", n = "col-lg-3 col-md-3 col-xs-12") : "register" == e || "profile" == e || "community" == e || "opendict" == e ? (t = "col-md-12 col-lg-12 col-xs-12", n = "") : "help" == e || "about" == e || "test" == e || "login" == e || "change-password" == e || "profile-center" == e || "infor-center" == e || "infor-user" == e || "detail-grammar" == e || "bookstore" == e ? (t = "col-md-12 col-lg-12 col-xs-12", n = "") : "jlpt" == e || "reset-password" == e ? (t = "col-md-9 col-xs-12", n = "col-md-3 col-lg-3", "") : "chat" == e || "sentence" == e ? (t = "col-md-9 col-xs-12", n = "col-md-3 col-xs-12", "") : "translate_news" == e || "translate_user" == e || "select" == e ? (t = "col-md-9 col-xs-12", n = "col-md-3 col-xs-12", "") : "note" == e ? (t = "col-md-9 col-lg-9 col-xs-12", n = "col-md-3 col-lg-3 col-xs-12", "") : (t = "col-md-6 col-lg-6 col-xs-12", n = "col-md-3 col-lg-3 col-xs-12"), $("#view1").attr("class", t), $("#view2").attr("class", n), $("#view3").attr("class", a)
    };
    o.$on("$stateChangeSuccess", function(e, t, n, a, i) {
        o.registerSuccess = !1, $(".notify-current").hide(100), "search" == t.name ? o.showButtonHistory = !0 : o.showButtonHistory = !1;
        var r = $('.menu-left li a[href="#' + t.name + '"]');
        $(".menu-left li").removeClass("menu-left-active"), r.parent().addClass("menu-left-active"), s.closePanel()
    }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? ($("#chat-module").html(""), $("#chat-module").addClass("removed")) : $("#chat-module").removeClass("removed"), $(".close-modal-jlpt").click(function() {
        $("#instant-search").modal("hide")
    }), $(".close-modal-report").click(function() {
        $("#reportModal").modal("hide")
    }), $(".close-modal-alert").click(function() {
        $("#alertModal").modal("hide")
    }), $(".close-delete-history-modal").click(function() {
        $("confirmDeleteHistoryModal").modal("hide")
    }), o.showChromeAds = !1, setTimeout(function() {
        $("body").searchit()
    }, 2e3), setTimeout(function() {
        if ("undefined" != typeof chrome) return void 0 !== chrome.runtime ? (FLAG_MAZII_PLUGIN = "ok", void setupCommunicateMaziiPlugin()) : void(FLAG_MAZII_PLUGIN = 0 < $(".selection_bubble_root").length ? "need_update" : "need_install");
        FLAG_MAZII_PLUGIN = "invalid"
    }, 2e3), o.seo = {
        description: "Bao gồm 300.000 mục từ, 8.000 chữ kanji và hơn 500 cấu trúc ngữ pháp. Tất cả đều được giải thích bằng tiếng Việt. Tổng hợp JLPT từ N5 đến N1 và nhiều công cụ khác. Học tiếng Nhật, đã có Mazii!!!",
        title: "Từ điển Nhật Việt Mazii"
    }, o.htmlReady = function() {
        o.$evalAsync(function() {
            setTimeout(function() {
                "function" == typeof window.callPhantom && window.callPhantom()
            }, 0)
        })
    }
}]).directive("ngEnter", function() {
    return function(t, e, n) {
        e.bind("keydown keypress", function(e) {
            13 === e.which && (t.$apply(function() {
                t.$eval(n.ngEnter)
            }), e.preventDefault())
        })
    }
}).directive("focusMe", ["$timeout", function(a) {
    return {
        link: function(e, t, n) {
            a(function() {
                t[0].focus()
            }, 500)
        }
    }
}]);
var maziiPluginPort = null,
    forwardRequestCallback = null;

function setupCommunicateMaziiPlugin() {
    (maziiPluginPort = chrome.runtime.connect(MAZII_PLUGIN_ID)).onMessage.addListener(function(e) {
        null != e.requestUrl && null != forwardRequestCallback && forwardRequestCallback(e.result)
    })
}

function forwardRequest(e, t) {
    null != maziiPluginPort && (forwardRequestCallback = t, maziiPluginPort.postMessage({
        request: "requestUrl",
        url: e
    }))
}
angular.module("mazii").directive("ngExample", function() {
    return {
        restrict: "E",
        templateUrl: "components/example/example-template.html",
        scope: {
            data: "=data",
            index: "@"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "maziiServ", function(e, t, n, a, i) {
            a.isJapanese(t.data.mean) ? (t.isJapanese = !1, t.mergeExample = a.mergeKanjiAndHiragana(t.data.mean, t.data.transcription)) : (t.isJapanese = !0, t.mergeExample = a.mergeKanjiAndHiragana(t.data.content, t.data.transcription))
        }]
    }
}), angular.module("mazii").directive("ngKanji", function() {
    return {
        restrict: "E",
        templateUrl: "components/kanji/kanji-template.html",
        scope: {
            data: "=data",
            lang: "=lang"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "$timeout", function(a, i, e, t, r) {
            i.collapse = !1, null != i.data && null != i.data.detail && (i.details = i.data.detail.split("##"));
            var n, o, s;
            i.getDetails = function() {
                return i.details = i.data.detail.split("##"), i.details
            }, i.getTitle = function() {
                i.title = "";
                for (var e = i.data.detail.split("##"), t = 0; t < e.length; t++)
                    for (var n = e[t], a = 0; a < n.length; a++)
                        if ("." == n[a]) {
                            i.title += n.substr(0, a + 1) + " ";
                            break
                        } return i.title
            }, i.search = function(e) {
                a.$broadcast("searchKanji", e)
            }, i.showCollapse = function() {
                1 == i.collapse ? $(".list-collapse").slideUp(100) : $(".list-collapse").slideDown(100), i.collapse = !i.collapse
            }, i.setQueryType = function(e, t, n) {
                null == a.user ? (a.alert.notify = "Đăng nhập để sử dụng tính năng", $(".notify-current").fadeIn(200), r(function() {
                    $(".notify-current").fadeOut(200)
                }, 1e3)) : ($("#myNote").modal("show"), a.meanMyNote = n, a.$broadcast("setQueryType", {
                    query: e,
                    type: t
                }))
            }, i.data && (n = i.data, o = null == n.kun ? null : n.kun.replace(/ /g, "&nbsp;&nbsp;&nbsp;&nbsp;"), s = null == n.on ? null : n.on.replace(/ /g, "&nbsp;&nbsp;&nbsp;&nbsp;"), i.data.kun = o, i.data.on = s)
        }]
    }
}), angular.module("mazii").directive("ngGrammar", function() {
    return {
        restrict: "E",
        templateUrl: "components/grammar/grammar-template.html",
        scope: {
            data: "=data",
            detail: "=detail"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "maziiServ", "$timeout", function(r, o, e, t, n, s) {
            var a = null,
                i = "";
            if (o.loadDetail = function() {
                null == o.detail && n.search("grammar_detail", o.data._id).then(function(e) {
                    o.detail = e.grammar
                })
            }, o.splitUtil = function(e, t) {
                if (null == e || "" == e) return null;
                for (var n = e.split(t), a = [], i = 0; i < n.length; i++) {
                    var r = n[i].trim();
                    "" != r && a.push(r)
                }
                return a
            }, o.removeJapaneseChar = function(e) {
                return t.removeJapaneseChar(e).trim()
            }, o.splitExplain = function(e) {
                return o.splitUtil(e, "☞")
            }, o.splitNote = function(e) {
                return o.splitUtil(e, "☞")
            }, o.setQueryGrammar = function(e, t, n, a) {
                var i = o.data.grammar;
                null == r.user ? (r.alert.notify = "Đăng nhập để sử dụng tính năng", $(".notify-current").fadeIn(200), s(function() {
                    $(".notify-current").fadeOut(200)
                }, 1e3)) : ($("#myNote").modal("show"), r.meanMyNote = a, r.$broadcast("setQueryGrammar", {
                    query: e,
                    type: t,
                    id: i.mobileId ? i.mobileId : -1
                }))
            }, o.$watch("data", function(e, t) {
                null != o.data.grammar ? (o.showDetailImediately = !0, o.detail = o.data.grammar, a = o.data.grammar.title.split("=>")) : (a = o.data.title.split("=>"), o.showDetailImediately = !1), 1 < a.length && (i = a[1].trim()), o.title = a[0].trim(), o.titleMean = i
            }), null != o.data.grammar) return o.showDetailImediately = !0, void(o.detail = o.data.grammar);
            o.showDetailImediately = !1, o.id = o.data._id.replace(/:/g, "_"), s(function() {
                null == r.user ? o.logined = !1 : o.logined = !0
            }, 200)
        }]
    }
}), angular.module("mazii").directive("ngKanjiResultSearchWord", function() {
    return {
        restrict: "E",
        templateUrl: "components/kanji-result-search-word/kanji-result-search-word-template.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function(t, i, e, n) {
            i.collapse = !1, null != i.data && null != i.data.detail && (i.details = i.data.detail.split("##")), i.getTitle = function() {
                i.title = "";
                for (var e = i.data.detail.split("##"), t = 0; t < e.length; t++)
                    for (var n = e[t], a = 0; a < n.length; a++)
                        if ("." == n[a]) {
                            i.title += n.substr(0, a + 1) + " ";
                            break
                        } return i.title
            }, i.search = function(e) {
                t.$broadcast("searchKanji", e)
            }, i.viewDetail = function(e) {
                t.$broadcast("searchKanji", e)
            }
        }]
    }
}), angular.module("mazii").directive("ngWord", function() {
    return {
        restrict: "E",
        templateUrl: "components/word/word-template.html",
        scope: {
            data: "=data",
            aux: "=aux",
            lang: "=lang"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "ngAudio", "userServ", "$timeout", "categoryServ", function(a, e, t, n, i, r, o, s) {
            if (e.aux) {
                var l = s.getIdCategory(e.aux.category);
                e.NameCategory = l.vi_name
            }
            e.id = 1e3 * Math.random(), e.show_mean_of_user = !1, e.showAlert = !1, e.indexPagination = 0;
            e.listRateReport = [];
            var c = e.data;
            e.isVietnamese = !1, "ja_vi" == c.label && (e.isVietnamese = !0);
            for (var u = 0; u < c.means.length; u++) {
                var d = c.means[u].kind;
                if (null != d && "" != d) {
                    var m = [];
                    if (-1 != d.indexOf(",")) {
                        m = d.split(",");
                        for (var h = 0; h < m.length; h++) m[h] = m[h].trim()
                    } else m.push(d);
                    for (h = 0; h < m.length; h++) {
                        var g = n.getConjugationTableOfVerb(c.word, c.phonetic, m[h]);
                        if (null != g) {
                            e.conjugationVerb = g;
                            break
                        }
                    }
                }
                if (null != e.conjugationVerb) break
            }
            e.setQueryType = function(e, t, n) {
                null == a.user ? (a.alert.notify = "Đăng nhập để sử dụng tính năng", $(".notify-current").fadeIn(200), o(function() {
                    $(".notify-current").fadeOut(200)
                }, 1e3)) : ($("#myNote").modal("show"), 0 < n.means.length ? a.meanMyNote = n.means[0].mean : a.meanMyNote = "", a.$broadcast("setQueryType", {
                    query: e,
                    type: t,
                    id: n.mobileId ? n.mobileId : -1
                }))
            };
            var p = "//data.mazii.net/audios/" + n.convertJptoHex(e.data.word).toUpperCase() + ".mp3";
            e.sound = i.load(p), e.playAudio = function() {
                e.sound.play()
            };
            var f = e.data.word;
            e.synsets = e.data.synsets, e.data.opposite_word && (e.oppositeWord = e.data.opposite_word), n.isJapanese(f) && (e.amHanViet = n.getHVOfKey(f)), e.data.kinds = {}, e.data.noKinds = [];
            for (u = 0; u < e.data.means.length; u++) {
                var v = e.data.means[u];
                null != v.kind && "" != v.kind ? (null == e.data.kinds[v.kind] && (e.data.kinds[v.kind] = []), e.data.kinds[v.kind].push(v)) : e.data.noKinds.push(v)
            }
            e.convertKindToReadable = function(e) {
                return null == e || "" == e ? "" : n.convertKindToReadable(e)
            }, e.capitaliseFirstLetter = function(e) {
                return "◆ " + n.capitaliseFirstLetter(e)
            }, e.searchThis = function(e, t) {
                a.$broadcast("query", {
                    type: "word",
                    query: e,
                    tag: "quick-search"
                })
            }
        }]
    }
}), angular.module("mazii").directive("ngSetting", function() {
    return {
        restrict: "E",
        templateUrl: "components/setting/setting-template.html",
        controller: ["$rootScope", "$scope", "$http", "localstoreServ", "$state", function(e, t, n, a, i) {
            t.furigana = a.getItem("showFurigana"), t.suggest = a.getItem("showSuggest");

            function r() {
                a.getItem("showFurigana") ? $("#setting_css").remove() : $("head").append('<style id="setting_css">rt{display: none;}</style>')
            }
            r(), t.showFurigana = function() {
                a.setItem("showFurigana", t.furigana), t.$emit("changeShowFurigana", t.furigana), r()
            }, t.showSuggestSearch = function() {
                a.setItem("showSuggest", t.suggest), t.$emit("chaneShowSuggest", t.suggest)
            }, t.$on("changeSettingFurigana", function() {
                t.furigana = a.getItem("showFurigana")
            })
        }]
    }
}), angular.module("mazii").directive("ngKanjiRecognize", function() {
    return {
        restrict: "E",
        templateUrl: "components/kanji-recognize/kanji-recognize-template.html",
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function(n, e, i, t) {
            setTimeout(function() {
                var t = new KanjiWriter({
                    canvasId: "draw-canvas",
                    colorDraw: "black",
                    lineWidthDraw: 4,
                    resultId: "#draw-kanji-result",
                    clearButtonId: "#draw-clear",
                    backButtonId: "#draw-back",
                    classResult: "draw-kanji-suggest",
                    resultClickCallback: function() {
                        var e = $(this).text();
                        null != e && "" != e && ($("#draw-clear").trigger("click"), n.$broadcast("insertQueryText", e), 1 == e.length && function(e, t, n) {
                            var a = {
                                sample: e,
                                input: t,
                                output: n
                            };
                            i.post("//api.mazii.net/api/kanji-collection", a).then(function(e, t) {})
                        }(e, t.latestInks, t.latestResponse))
                    }
                })
            }, 100)
        }]
    }
}), angular.module("mazii").directive("ngKanjiDraw", function() {
    return {
        restrict: "E",
        templateUrl: "components/kanji-draw/kanji-draw-template.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function(e, n, t, a) {
            n.draw = function() {
                $("#image-holder").dmak(n.data, {
                    skipLoad: !1,
                    autoplay: !0,
                    height: 250,
                    width: 250,
                    viewBox: {
                        x: 0,
                        y: 0,
                        w: 125,
                        h: 125
                    },
                    step: .01,
                    stroke: {
                        animated: {
                            drawing: !0,
                            erasing: !0
                        },
                        order: {
                            visible: !0,
                            attr: {
                                "font-size": "8",
                                fill: "#33B5E5"
                            }
                        },
                        attr: {
                            active: "#CC0000",
                            stroke: "random",
                            "stroke-width": 3,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                        }
                    },
                    grid: {
                        show: !0,
                        attr: {
                            stroke: "#CCCCCC",
                            "stroke-width": .5,
                            "stroke-dasharray": "--"
                        }
                    }
                })
            }, n.resetDrawKanjiStroke = function() {
                var e = $("#image-holder");
                e.html(""), e.data("plugin_dmak") && (e.dmak("reset"), e.data("plugin_dmak", null)), n.draw()
            }, n.$watch("data", function(e, t) {
                e != t && n.resetDrawKanjiStroke()
            }), n.resetDrawKanjiStroke()
        }]
    }
}), angular.module("mazii").directive("ngHistory", function() {
    return {
        restrict: "E",
        templateUrl: "components/history/history-template.html",
        controller: ["$rootScope", "$scope", "$http", "historyServ", "$state", "localstoreServ", "dictUtilSer", function(n, e, t, a, i, r, o) {
            e.history = a.get(), e.search = function(e, t) {
                o.closePanel(), n.$broadcast("query", {
                    type: e,
                    query: t,
                    tag: "quick-search"
                })
            }, e.getTime = function(e) {
                return new Date(e).toDateString()
            }, e.deleteHistory = function() {
                $("#confirmDeleteHistoryModal").modal("show")
            }, $(".deleteHistory").click(function() {
                a.clear(), e.history = a.get(), $("#confirmDeleteHistoryModal").modal("hide")
            })
        }]
    }
}), angular.module("mazii").directive("ngNote", function() {
    return {
        restrict: "E",
        replace: !0,
        templateUrl: "components/notes/note-template.html",
        controller: ["$rootScope", "$scope", "$http", "noteServ", "$state", "dictUtilSer", function(n, a, e, i, t, r) {
            a.note = [], a.state = !1, a.showMore = !1;
            var o = 0;
            a.search = function(e, t) {
                n.$broadcast("query", {
                    type: e,
                    query: t
                })
            }, a.deleteNote = function(n) {
                i.removeNote(n).then(function() {
                    for (var e = -1, t = 0; t < a.note.length; t++)
                        if (a.note[t].id == n) {
                            e = t;
                            break
                        } - 1 != e && (a.note.splice(e, 1), r.safeApply(a))
                })
            }, a.getDeleteState = function() {
                return a.state ? "" : "hidden-note-delete"
            }, a.showEditNote = function() {
                0 == a.state ? a.state = !0 : a.state = !1
            };

            function s(e, t) {
                i.getNoteItem(e, t, function(e) {
                    a.note = a.note.concat(e), 100 == e.length && (a.showMore = !0), r.safeApply(a)
                })
            }
            a.$on("getNoteItem", function(e, t) {
                "" == t.cate ? a.note = [] : (o = 0, a.note = [], s(t.cate, o))
            }), a.getTime = function(e) {
                return new Date(e).toDateString()
            }, a.loadMore = function() {
                a.showMore = !1, o++, s(a.note[0].categoryId, o)
            }
        }]
    }
}), angular.module("mazii").directive("ngNoteContent", function() {
    return {
        restrict: "E",
        replace: !0,
        templateUrl: "components/notes/note-content-template.html",
        controller: ["$rootScope", "$scope", "$http", "noteServ", "$state", function(e, n, t, a, i) {
            n.category = a.getCategory(), n.cate = "", n.query = "", n.type = "", n.grammarID = "", n.saveNoteMe = function(e) {
                "" != n.grammarID ? a.pushGrammar(e, n.query, n.type, n.grammarID) : "" != n.query && "" != n.type && a.pushNote(e, n.query, n.type, n.idx), n.cate = "", n.query = "", n.type = "", n.grammarID = "", $("#myNote").modal("hide")
            }, n.$on("setQueryTypeFromCategory", function(e, t) {
                setTimeout(function() {
                    "" == t.query && null == t.query || (n.query = t.query), "" == t.type && null == t.type || (n.type = t.type)
                }, 500)
            }), n.$on("setQueryType", function(e, t) {
                "" == t.query && null == t.query || (n.query = t.query), "" == t.type && null == t.type || (n.type = t.type), "" == t.id && null == t.id || (n.idx = t.id)
            }), n.$on("setQueryGrammar", function(e, t) {
                "" == t.query && null == t.query || (n.query = t.query), "" == t.type && null == t.type || (n.type = t.type), "" == t.id && null == t.id || (n.grammarID = t.id)
            }), n.getTime = function(e) {
                return new Date(e).toDateString()
            }, n.showMyCategoryModal = function() {
                $("#myCategory").modal("show"), $("#myNote").modal("hide")
            }, n.closeModal = function() {
                $("#myNote").modal("hide")
            }
        }]
    }
}), angular.module("mazii").directive("ngCategory", function() {
    return {
        restrict: "E",
        replace: !0,
        templateUrl: "components/notes/category-template.html",
        controller: ["$rootScope", "$scope", "$http", "noteServ", "$state", "userServ", function(e, n, t, a, i, r) {
            n.nameCategory = "", n.cate = "", n.query = "", n.type = "", n.grammarID = "", n.saveCategory = function() {
                "" != n.nameCategory && a.pushCategory(n.nameCategory), "" != n.query && "" != n.type && ($("#myCategory").modal("hide"), $("#myNote").modal("show"), e.$broadcast("setQueryTypeFromCategory", {
                    query: n.query,
                    type: n.type
                })), n.nameCategory = "", n.cate = "", n.query = "", n.type = "", $("#myCategory").modal("hide")
            }, n.$on("setQueryType", function(e, t) {
                "" == t.query && null == t.query || (n.query = t.query), "" == t.type && null == t.type || (n.type = t.type)
            }), n.$on("setQueryGrammar", function(e, t) {
                "" == t.query && null == t.query || (n.query = t.query), "" == t.type && null == t.type || (n.type = t.type), "" == t.id && null == t.id || (n.grammarID = t.id)
            }), n.$on("set", function(e, t) {
                "" == t.query && null == t.query || (n.query = t.query), "" == t.type && null == t.type || (n.type = t.type)
            })
        }]
    }
}), angular.module("mazii").directive("ngNewsother", function() {
    return {
        restrict: "E",
        templateUrl: "components/news/newsother-template.html",
        controller: ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "$stateParams", "$location", "localstoreServ", function(n, a, e, t, i, r, o, s, l, c) {
            a.clickID = -1;
            var u;
            u = c.getItem("list-news"), a.lastestNews = u, a.changeDetailNews = function(e, t) {
                if (t.stopImmediatePropagation(), a.clickID == e) return !1;
                a.clickID = e, $(".news-link>a").removeClass("news_active"), $(".news-link>#" + e).addClass("news_active"), n.$broadcast("changeDetailNews", {
                    id: e
                }), -1 == d.indexOf(e) && (d.push(e), localStorage.setItem("news_read", JSON.stringify(d))), l.search("id", e)
            }, a.getNewsReadClass = function(e) {
                return a.clickID == e ? "news_active" : -1 != d.indexOf(e) ? "news_read" : ""
            };
            var d = JSON.parse(localStorage.getItem("news_read"));
            null == d && (d = [])
        }]
    }
}), angular.module("mazii").directive("ngVerbConjugtion", function() {
    return {
        restrict: "E",
        scope: {
            data: "=data"
        },
        templateUrl: "components/verb-conjugtion/verb-conjugtion-template.html",
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function(e, t, n, a) {}]
    }
}), angular.module("mazii").directive("ngGoogleTranslate", function() {
    return {
        restrict: "E",
        scope: {
            data: "=data",
            aux: "=aux"
        },
        templateUrl: "components/google-translate/google-translate-template.html",
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "categoryServ", function(e, t, n, a, i) {
            var r = t.data;
            if (null != r) {
                t.text = "";
                for (var o = r.data.translations, s = 0; s < o.length; s++) t.text += o[s].translatedText
            }
        }]
    }
}), angular.module("mazii").directive("ngSynonyms", function() {
    return {
        restrict: "E",
        scope: {
            data: "=data"
        },
        templateUrl: "components/synonyms/synonyms-template.html",
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", function(n, e, t, a) {
            e.synsets = e.data, e.searchThis = function(e, t) {
                n.$broadcast("query", {
                    type: "word",
                    query: e,
                    tag: "quick-search"
                }), t.stopImmediatePropagation(), t.preventDefault()
            }
        }]
    }
}), angular.module("mazii").directive("ngReport", function() {
    return {
        restrict: "E",
        templateUrl: "components/report/report-template.html",
        scope: {
            data: "=data",
            type: "@"
        },
        controller: ["$rootScope", "$scope", "$http", function(a, i, e) {
            i.showReportDialog = function() {
                var e = i.type,
                    t = "",
                    n = "";
                "grammar" == e ? (t = i.data._id, n = i.data.title) : "kanji" == e ? (t = i.data._id, n = i.data.kanji) : "word" == e ? (t = i.data._id, n = i.data.word) : "grammarDetail" == e && (e = "grammar", t = i.data._id, n = i.data.title), a.report.type = e, a.report.entry = n, a.report.id = t, a.report.comment = "", $("#reportModal").modal({
                    backdrop: "static"
                })
            }
        }]
    }
}), angular.module("mazii").directive("setFocus", function() {
    return {
        scope: {
            setFocus: "="
        },
        link: function(e, t) {
            e.setFocus && (t[0].style.background = "blue")
        }
    }
}), angular.module("mazii").directive("ngFooter", function() {
    return {
        restrict: "E",
        templateUrl: "components/footer/footer-template.html"
    }
}), angular.module("mazii").directive("ngNotify", function() {
    return {
        restrict: "E",
        templateUrl: "components/notify/notify-template.html"
    }
}), angular.module("mazii").directive("ngAffilate", function() {
    return {
        restrict: "E",
        templateUrl: "components/affilate/affilate-template.html",
        controller: ["$rootScope", "$scope", "dictUtilSer", "localstoreServ", "$state", "exampleServer", function(i, r, e, n, a, t) {
            r.adv = null;
            r.noneData = !1, r.showWeek = !0, r.showMonth = !1, r.showAll = !1, r.showCenter = function(e) {
                switch (e) {
                    case "week":
                        r.showWeek = !0, r.showMonth = !1, r.showAll = !1, o("week"), $(".affilate-screen .sl").removeClass("active"), $(".affilate-screen .sl1").addClass("active");
                        break;
                    case "month":
                        r.showWeek = !1, r.showMonth = !0, r.showAll = !1, o("month"), $(".affilate-screen .sl").removeClass("active"), $(".affilate-screen .sl2").addClass("active");
                        break;
                    case "all":
                        r.showWeek = !1, r.showMonth = !1, r.showAll = !0, o("total"), $(".affilate-screen .sl").removeClass("active"), $(".affilate-screen .sl3").addClass("active")
                }
            };
            var o = function(e) {
                r.listCenter = {}, r.noneData = !1, t.getListCenter(e, function(e) {
                    e.data && 302 == e.data.status && (r.noneData = !0), e.data && 200 == e.data.status && (r.listCenter = e.data.result)
                })
            };
            o("week");

            function s() {
                var e = "*";
                i.region && (e = i.region.region_code);
                for (var t = i.affilate, n = 0; n < t.length; n++) {
                    var a = t[n];
                    if ("*" == a.region || -1 != a.region.indexOf(e)) {
                        r.adv = a;
                        break
                    }
                }
            }
            r.goProfileCenter = function(e, t) {
                e == n.getItem("idUser") ? a.go("profile-center") : window.open(a.href("infor-center", {
                    id: e
                }, "_blank"))
            }, r.clickToAds = function(e) {
                null != e && null != e.id && (n.setItem(e.id, "ok"), sendGA("affiliate", "click", e.id))
            }, r.$on("finish_get_affilate", function(e) {
                r.listAffilate = i.affilate, null != i.affilate && s()
            }), null != i.affilate && s()
        }]
    }
}), angular.module("mazii").directive("ngFeedback", function() {
    return {
        restrict: "E",
        templateUrl: "components/feedback/feedback-template.html",
        scope: {
            data: "=data",
            type: "@type"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "ngAudio", "userServ", "$timeout", "filterSpamSer", "exampleServer", "localstoreServ", "$state", "cookieServ", "encryptionServ", function(o, s, e, l, t, c, u, r, i, n, d, a, m) {
            var h = !1,
                g = [];
            s.showAlert = !1, s.indexPagination = 0, s.listRateReport = [], s.user = o.user;

            function p() {
                w = s.data.lang ? s.data.lang : "javi", s.listReport = [], s.showMeanofUser(s.data.id), setTimeout(function() {
                    $("#model-web-" + s.data.id).val("")
                }, 300)
            }
            var f, v = s.type,
                y = [],
                w = "javi",
                _ = n.getItem("idUser");
            s.$watch("data", function(e, t) {
                e != t && p()
            }), s.reportMean = function(t, e) {
                var n = $("#model-web-" + t).val();
                if (s.showAlert = !1, r.filterSpamReport(n)) s.showAlert = !0, s.messageAlert = "Góp ý này chứa các ký tự spam", s.faIcon = "fa-exclamation-triangle";
                else if ($("#add-mean-" + t).addClass("button-disabled"), null == n || "" == n) $("#add-mean-" + t).removeClass("button-disabled"), s.noReportModel = !0;
                else {
                    s.noReportModel = !1;
                    var a = o.user.userId;
                    c.addMeanUser(a, n, t, e, v, w).then(function(e) {
                        200 == e.status ? ($("#add-mean-" + t).removeClass("button-disabled"), s.messageAlert = "Thêm thành công góp ý", s.faIcon = "fa-check", null == s.listReport && (s.listReport = []), e.result.username = o.user.username, e.result.mean = l.renderHtmlReport(e.result.mean), s.listReport.push(e.result), s.noReport = !1, h = !1, s.showReport(t, e.result), $("#model-web-" + t).val(""), ++s.numberReport) : (302 == e.status ? s.messageAlert = "Xin lỗi, đã xảy ra sự cố" : s.messageAlert = "Góp ý này không tồn tại", s.faIcon = "fa-exclamation-triangle"), s.showAlert = !0
                    })
                }
            }, s.showReport = function(e, t) {
                if ((h = !h) && null != e && null != t)
                    if (null != o.user) {
                        s.notLogin = !1;
                        for (var n = 0; n < t.length; n++) {
                            var a = t[n];
                            if (a.userId == o.user.userId) return $("#model-web-" + e).val(a.mean), void(s.reportedMean = !0)
                        }
                        s.reportedMean = !1
                    } else s.notLogin = !0
            }, s.updateMean = function(a, e) {
                var t = $("#model-web-" + a).val();
                if (s.showAlert = !1, r.filterSpamReport(t)) s.showAlert = !0, s.messageAlert = "Góp ý này chứa các ký tự spam", s.faIcon = "fa-exclamation-triangle";
                else {
                    if ($("#update-mean-" + a).addClass("button-disabled"), null == o.user) return;
                    if (null == t || "" == t) s.noReportModel = !0, $("#update-mean-" + a).removeClass("button-disabled");
                    else {
                        s.noReportModel = !1;
                        var i = o.user.userId;
                        c.updateMeanUser(i, t, a, e).then(function(e) {
                            if (304 == e.status) s.messageAlert = "Góp ý này không tồn tại", s.faIcon = "fa-exclamation-triangle";
                            else if (302 == e.status) s.messageAlert = "Xin lỗi, đã xảy ra sự cố", s.faIcon = "fa-exclamation-triangle";
                            else if (s.messageAlert = "Chỉnh sửa góp ý thành công", s.faIcon = "fa-check", null != s.listReport)
                                for (var t = s.listReport.length, n = 0; n < t; n++)
                                    if (s.listReport[n].wordId == a && s.listReport[n].userId == i) {
                                        s.listReport[n].mean = l.renderHtmlReport(e.result.mean);
                                        break
                                    } s.showAlert = !0
                        })
                    }
                }
            }, s.rateMean = function(n, a) {
                $("#user-like").addClass("button-disabled"), null != n && null != o.user || (o.alert.notify = "like" == a ? "Bạn cần đăng nhập để like" : "Bạn cần đăng nhập để bỏ like", $(".notify-current").fadeIn(200), u(function() {
                    $(".notify-current").fadeOut(200)
                }, 2e3));
                var i = 0,
                    e = o.user.userId;
                c.rateMean(n, e, a).then(function(e) {
                    if ($("#user-like").removeClass("button-disabled"), 200 == e.status) {
                        "like" == a ? e.delete ? (i = 1, $(".like-" + n).removeClass("active-like")) : ($(".like-" + n).addClass("active-like"), $(".dislike-" + n).removeClass("active-like")) : e.delete ? (i = 1, $(".dislike-" + n).removeClass("active-like")) : ($(".dislike-" + n).addClass("active-like"), $(".like-" + n).removeClass("active-like"));
                        for (var t = 0; t < s.listReport.length; t++) s.listReport[t].reportId == n && (s.listReport[t].like = e.result.like, s.listReport[t].dislike = e.result.dislike);
                        c.changeDataRateinLocal({
                            reportId: e.result.reportId,
                            type: a
                        }, i)
                    }
                })
            }, s.showMeanofUser = function(n) {
                if ($("#formReport-" + n).css("display", "block"), y["id" + n]) s.listReport = y["id" + n];
                else {
                    if (s.showAlert = !1, s.listIndex = [], s.indexPagination = 0, $("#show-report-" + n).addClass("button-disabled"), null == n) return;
                    c.getMeanById(n, v, w).then(function(e) {
                        if (s.showReport(n, e.result), u(function() {
                            $(".pagination-web li  a").css("color", "#4876FF"), $("#page-1 a").css("color", "red")
                        }, 2), $("#show-report-" + n).removeClass("button-disabled"), 304 == e.status || 0 == e.result.length) s.noReport = !0, s.numberReport = 0;
                        else if (s.noReport = !1, s.numberReport = e.result.length, e.result = s.renderNewLineReport(e.result), e.result.length <= PAGINATION_REPORT_MEAN) s.listReport = e.result, y["id" + n] = e.result, b();
                        else {
                            g = e.result, s.indexPagination = 0;
                            var t = l.paginationReportMean(s.indexPagination, g);
                            s.listReport = t.result, y["id" + n] = e.result, s.showButtonPaginationPreviousLast = t.showPreviousLast, s.showButtonPaginationNextLast = t.showNextLast, s.listIndex = l.generationIndexPagination(e.result), b()
                        }
                    })
                }
            }, s.nextPagination = function() {
                if (!(null == g || 0 == g.length || (s.indexPagination + 1) * PAGINATION_REPORT_MEAN >= g.length)) {
                    s.indexPagination++;
                    var e = l.paginationReportMean(s.indexPagination, g);
                    s.listReport = e.result, s.showButtonPaginationPreviousLast = e.showPreviousLast, s.showButtonPaginationNextLast = e.showNextLast, b(), u(function() {
                        $(".pagination-web li  a").css("color", "#4876FF"), $("#page-" + (s.indexPagination + 1) + " a").css("color", "red")
                    }, 2)
                }
            }, s.nextPaginationLast = function() {
                if (null != g && 0 != g.length) {
                    s.indexPagination = Math.floor(g.length / PAGINATION_REPORT_MEAN - 1);
                    var e = l.paginationReportMean(s.indexPagination, g);
                    s.listReport = e.result, s.showButtonPaginationPreviousLast = e.showPreviousLast, s.showButtonPaginationNextLast = e.showNextLast, b(), u(function() {
                        $(".pagination-web li  a").css("color", "#4876FF"), $("#page-" + (s.indexPagination + 1) + " a").css("color", "red")
                    }, 2)
                }
            }, s.previousPagination = function() {
                if (null != g && 0 != g.length && 0 != s.indexPagination) {
                    s.indexPagination--;
                    var e = l.paginationReportMean(s.indexPagination, g);
                    s.listReport = e.result, s.showButtonPaginationPreviousLast = e.showPreviousLast, s.showButtonPaginationNextLast = e.showNextLast, b(), u(function() {
                        $(".pagination-web li  a").css("color", "#4876FF"), $("#page-" + (s.indexPagination + 1) + " a").css("color", "red")
                    }, 2)
                }
            }, s.previousPaginationLast = function() {
                if (null != g && 0 != g.length) {
                    s.indexPagination = 0;
                    var e = l.paginationReportMean(s.indexPagination, g);
                    s.listReport = e.result, s.showButtonPaginationPreviousLast = e.showPreviousLast, s.showButtonPaginationNextLast = e.showNextLast, b(), u(function() {
                        $(".pagination-web li  a").css("color", "#4876FF"), $("#page-1 a").css("color", "red")
                    }, 2)
                }
            }, s.changePagination = function(e) {
                s.indexPagination = e - 1;
                var t = l.paginationReportMean(s.indexPagination, g);
                s.listReport = t.result, s.showButtonPaginationPreviousLast = t.showPreviousLast, s.showButtonPaginationNextLast = t.showNextLast, b(), u(function() {
                    $(".pagination-web li  a").css("color", "#4876FF"), $("#page-" + e + " a").css("color", "red")
                }, 2)
            };
            var b = function() {
                var t = c.activeButtonLike(s.listReport);
                setTimeout(function() {
                    for (var e = 0; e < t.length; e++) 1 == t[e].type ? $(".like-" + t[e].reportId).addClass("active-like") : $(".dislike-" + t[e].reportId).addClass("active-like")
                }, 100)
            };
            s.addOrUpdate = function(e, t, n, a) {
                13 == a.keyCode && (a.shiftKey || (n ? s.updateMean(e, t) : s.reportMean(e, t), a.preventDefault()))
            }, s.renderNewLineReport = function(e) {
                for (var t = [], n = e.length, a = 0; a < n; a++) {
                    var i = e[a],
                        r = i.mean,
                        o = l.renderHtmlReport(r);
                    o.length < 1 || (i.mean = o), t.push(i)
                }
                return t
            }, s.deleteMeanOfUser = function(e, r) {
                f = e, $("#confirmDeleteMeanOfUser").modal("show"), $(".deleteMeanOfUser").click(function() {
                    null == o.user || null == f ? (o.alert.notify = "Bạn chưa đăng nhập", $(".notify-current").fadeIn(200), u(function() {
                        $(".notify-current").fadeOut(200)
                    }, 2e3)) : c.deleteMean(o.user.userId, f).then(function(e) {
                        if (200 == e.status) {
                            $("#model-web-" + r).val("");
                            for (var t = s.listReport.length, n = g.length, a = 0; a < t; a++) {
                                s.listReport[a].reportId == f && s.listReport.splice(a, 1)
                            }
                            for (var i = 0; i < n; i++) {
                                g[i].reportId == f && g.splice(i, 1)
                            }
                            s.showAlert = !1, s.reportedMean = !1, $("#confirmDeleteMeanOfUser").modal("hide"), --s.numberReport
                        }
                    })
                })
            }, s.goInforUser = function(n, a) {
                i.checkProfile(n, function(e) {
                    if (200 == e.data.status) {
                        var t = e.data.result;
                        "center" == t ? n == _ ? d.go("profile-center") : window.open(d.href("infor-center", {
                            id: n
                        }), "_blank") : "user" == t && (n == _ ? d.go("profile") : window.open(d.href("infor-user", {
                            id: n,
                            name: a
                        }), "_blank"))
                    }
                })
            }, null == o.user ? s.notLogin = !0 : s.notLogin = !1, u(function() {
                p()
            }, 200)
        }]
    }
}), angular.module("mazii").directive("ngFlashcard", function() {
    return {
        restrict: "E",
        templateUrl: "components/flashcard/flashcard-template.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "maziiServ", "userServ", "$timeout", function(r, o, e, t, n, s, a) {
            var i, l;
            o.i = 0;
            var c = [],
                u = [],
                d = [],
                m = [],
                h = [],
                g = [],
                p = "all";
            o.title = "hán tự", o.typeShow = "all", o.showEmpty = !1, o.listFlashcard = [];
            o.flip = function(e) {
                $(".card-" + e).toggleClass("flipped")
            }, o.remembered = function(e) {
                for (var t = 0; t < u.length; t++) {
                    if ("all" != o.typeShow) {
                        if ("remember" == o.typeShow) {
                            $("#no-remember").removeClass("button-disabled"), $("#no-remember").removeClass("btn-primary"), $("#remembered").addClass("button-disabled"), $("#remembered").addClass("btn-primary");
                            break
                        }
                        $("#remembered").removeClass("button-disabled"), $("#remembered").removeClass("btn-primary"), $("#no-remember").addClass("button-disabled"), $("#no-remember").addClass("btn-primary");
                        break
                    }
                    if (u[t].id == e && 1 == u[t].status) {
                        $("#no-remember").removeClass("button-disabled"), $("#no-remember").removeClass("btn-primary"), $("#remembered").addClass("button-disabled"), $("#remembered").addClass("btn-primary");
                        break
                    }
                    $("#remembered").removeClass("button-disabled"), $("#remembered").removeClass("btn-primary"), $("#no-remember").addClass("button-disabled"), $("#no-remember").addClass("btn-primary")
                }
            }, o.next = function() {
                o.remembered(u[++o.i].id)
            }, o.prev = function() {
                o.remembered(u[--o.i].id)
            }, o.showExampleKanji = function(e) {
                var t = "";
                return 25 < e.length ? (t = e.substr(0, 25), t += "...") : t = e, t
            }, o.getBeautyTitleGrammar = function(e) {
                return null == e ? null : e.split("=>")[0]
            }, o.showExampleGrammar = function(e) {
                return -1 != e.indexOf("=>") ? e.substr(e.indexOf("=>") + 2, e.length - 1) : e
            }, o.seclectToShow = function(e) {
                if (p != e)
                    if ($("#jlpt .item-flashcard").removeClass("active"), p = e, o.listFlashcard = [], o.i = 0, "all" == (o.typeShow = e)) o.listFlashcard = m, setTimeout(function() {
                        $(".item-active-" + o.listFlashcard[0].id).addClass("active")
                    }, 100), o.sizeOfListFlashcard = m.length, 0 == o.sizeOfListFlashcard && (o.showEmpty = !0), o.remembered(u[0].id);
                    else if ("remember" == e) h = [], m.forEach(function(e, t) {
                        1 == e.status && h.push(e), t == m.length - 1 && (o.listFlashcard = h, setTimeout(function() {
                            $(".item-active-" + o.listFlashcard[0].id).addClass("active")
                        }, 100), o.sizeOfListFlashcard = h.length, 0 == o.sizeOfListFlashcard && (o.showEmpty = !0), o.remembered(u[0].id))
                    }.bind(this));
                    else if ("notRemember" == e) {
                        g = [];
                        for (var t = 0; t < m.length; t++) m[t].status && 0 != m[t].status || g.push(m[t]);
                        o.listFlashcard = g, setTimeout(function() {
                            $(".item-active-" + o.listFlashcard[0].id).addClass("active")
                        }, 100), o.sizeOfListFlashcard = g.length, 0 == o.sizeOfListFlashcard && (o.showEmpty = !0), o.remembered(u[0].id)
                    }
            }, o.clickRemember = function() {
                if (null != r.user) {
                    var i = $(".active .flash-id").val(),
                        e = r.user.userId,
                        t = r.typeJLPT;
                    s.rememberFlash(e, i, t).then(function(e) {
                        if (200 == e.status) {
                            for (var t = m.length, n = 0; n < t; n++) {
                                var a = m[n];
                                if (i == a.id) {
                                    m[n].status = 1;
                                    break
                                }
                            }
                            $("#no-remember").removeClass("button-disabled"), $("#no-remember").removeClass("btn-primary"), $("#remembered").addClass("button-disabled"), $("#remembered").addClass("btn-primary")
                        } else console.log("thất bại")
                    })
                }
            }, o.clickNoRemember = function() {
                if (null != r.user) {
                    var i = $(".active .flash-id").val(),
                        e = r.user.userId,
                        t = r.typeJLPT;
                    s.noRememberFlash(e, i, t).then(function(e) {
                        if (200 == e.status) {
                            for (var t = m.length, n = 0; n < t; n++) {
                                var a = m[n];
                                if (i == a.id) {
                                    m[n].status = null;
                                    break
                                }
                            }
                            $("#remembered").removeClass("button-disabled"), $("#remembered").removeClass("btn-primary"), $("#no-remember").addClass("button-disabled"), $("#no-remember").addClass("btn-primary")
                        } else console.log("thất bại")
                    })
                }
            }, o.activeFlashcard = function(e) {
                return 0 == e ? "active" : ""
            }, o.$on("modalFlashcard", function() {
                ! function() {
                    o.typeShow = "all", i = r.typeJLPT, u = [], c = [];
                    var e = (c = r.listJLPT).length;
                    if ("kanji" == i) {
                        o.title = "hán tự";
                        for (var t = 0; t < e; t++) {
                            var n = {
                                id: (a = c[t]).id,
                                front: a.value.kanji,
                                after: {
                                    kun: a.value.kun,
                                    on: a.value.on,
                                    mean: a.value.mean,
                                    examples: a.value.examples
                                }
                            };
                            u.push(n)
                        }
                    } else if ("word" == i) {
                        if (o.title = "từ vựng", null != c)
                            for (t = 0; t < e; t++) {
                                n = {
                                    id: (a = c[t]).id,
                                    front: a.word,
                                    after: {
                                        phonetic: a.phonetic,
                                        mean: a.mean
                                    }
                                };
                                u.push(n)
                            }
                    } else {
                        o.title = "ngữ pháp";
                        for (t = 0; t < e; t++) {
                            var a;
                            n = {
                                id: (a = c[t]).id,
                                front: a.value.title,
                                after: a.value.title
                            };
                            u.push(n)
                        }
                    }
                    m = u, o.listFlashcard = u, setTimeout(function() {
                        $(".item-active-" + m[0].id).addClass("active")
                    }, 100), o.sizeOfListFlashcard = e, null != r.user && (l = r.user.userId), s.getListRemember(l, i).then(function(e) {
                        if (200 == e.status) {
                            for (var t = (d = e.result).length, n = 0; n < t; n++)
                                for (var a = d[n], i = 0; i < t; i++) {
                                    var r = u[i];
                                    if (a.wordId == r.id) {
                                        u[i].status = 1;
                                        break
                                    }
                                }
                            o.remembered(u[0].id)
                        }
                    })
                }()
            })
        }]
    }
}), angular.module("mazii").directive("ngNewreport", function() {
    return {
        restrict: "E",
        templateUrl: "components/newreport/newreport-template.html",
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "maziiServ", "userServ", "$timeout", "$state", "localstoreServ", "exampleServer", "cookieServ", "encryptionServ", function(a, i, e, t, n, r, o, s, l, c, u, d) {
            var m = 0,
                h = 0,
                g = [],
                p = null,
                f = l.getItem("idUser");
            i.valNext = "Xem tiếp", i.listNewMean = [], i.nextSkip = function() {
                ++m, v()
            }, i.convertTime = function(e) {
                try {
                    var t = e.split(" ")[0].split("-"),
                        n = e.split(" ")[1].split(":"),
                        a = new Date(t[0], t[1] - 1, t[2], n[0], n[1], n[2]),
                        i = 60 * a.getTimezoneOffset() * 1e3;
                    new Date(a.getTime() - i);
                    return a.toISOString()
                } catch (e) {
                    return ""
                }
            }, i.$on("$destroy", function() {
                null != p && clearInterval(p)
            });
            var v = function() {
                r.getNewMean(m).then(function(e) {
                    if (0 != e.count && (h = e.count), 200 == e.status)
                        for (var t = (g = e.result).length, n = 0; n < t; n++) i.listNewMean.push(g[n]);
                    h <= 10 * (m + 1) && (i.valNext = "Hết...", $(".box-notify-mean .next").addClass("button-disabled")), setTimeout(function() {
                        $("p span.user").timeago()
                    }, 500)
                })
            };
            i.directToFeedback = function(e, t) {
                t.stopImmediatePropagation(), t.preventDefault();
                var n = {
                    query: e.word,
                    type: e.type_data,
                    tag: "report-mean"
                };
                "grammar" == n.type && (n.query = e.wordId, n.type = "grammarDetail"), a.$broadcast("query", n), sendGA("static", "report_mean", e.word)
            }, i.goInforUser = function(n, a) {
                c.checkProfile(n, function(e) {
                    if (200 == e.data.status) {
                        var t = e.data.result;
                        "center" == t ? f == n ? s.go("profile-center") : window.open(s.href("infor-center", {
                            id: n
                        }), "_blank") : "user" == t && (f == n ? s.go("profile") : window.open(s.href("infor-user", {
                            id: n,
                            name: a
                        }), "_blank"))
                    }
                })
            }, v(), p = setInterval(function() {
                r.getNewMean(0).then(function(e) {
                    m = 0, i.valNext = "Xem tiếp", $(".box-notify-mean .next").removeClass("button-disabled"), 200 == e.status && (i.listNewMean = e.result), h <= 10 * (m + 1) && (i.valNext = "Hết...", $(".box-notify-mean .next").addClass("button-disabled")), setTimeout(function() {
                        $("p span.user").timeago()
                    }, 100)
                })
            }, 18e5)
        }]
    }
}), angular.module("mazii").directive("ngEmailhole", function() {
    return {
        restrict: "E",
        templateUrl: "components/emailhole/emailhole-template.html",
        controller: ["$rootScope", "$scope", "dictUtilSer", "$timeout", "localstoreServ", function(n, a, e, t, i) {
            a.msgErr = null, a.registered = !1, a.sending = !1, a.noRegister = function() {
                i.setItem("emailhole_news_songngu", !0), n.showEmailHole = !1, sendGA("emailhole", "news", "reject")
            }, a.register = function(e, t) {
                null == e && (e = ""), null == t && (t = ""), e = e.trim(), t = t.trim(), "" != e ? 0 != function(e) {
                    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
                }(e) ? "" != t ? 1 != a.sending && (a.sending = !0, i.setItem("emailhole_news_songngu", !0), n.showEmailHole = !1, sendGA("emailhole", "news", "registered")) : a.msgErr = "Bạn hãy nhập vào tên" : a.msgErr = "Email không đúng định dạng" : a.msgErr = "Bạn hãy nhập vào email"
            }
        }]
    }
}), angular.module("mazii").directive("ngMaziiQa", function() {
    return {
        restrict: "E",
        scope: {
            count: "=count"
        },
        templateUrl: "components/mazii-qa/mazii-qa-directive.html",
        controller: ["$rootScope", "$scope", "$http", "communityServer", function(e, t, n, a) {
            t.gotoQa = function(e) {
                sendGA("static", "qa", e)
            };
            var i = {};
            t.convertData = function(e) {
                return i[e] ? i[e] : e ? (t = function(e) {
                    return e ? e.replace(/\\t/g, "&nbsp").replace(/\\r/g, "").replace(/\\n/g, "</br>") : ""
                }(t = function(e) {
                    var t = document.createElement("div");
                    return t.innerHTML = e, t.textContent || t.innerText || ""
                }(e))) && 65 < t.length ? (i[e] = t.substr(0, 64) + "...", t.substr(0, 64) + "...") : i[e] = t : void 0;
                var t
            }, setTimeout(function() {
                a.getListPostNew(function(e) {
                    t.dataNoLogin = e
                })
            }, 200)
        }]
    }
}), angular.module("mazii").directive("ngCheckCategory", function() {
    return {
        restrict: "E",
        templateUrl: "components/check-category/check-category.html",
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "maziiServ", "userServ", "$timeout", "categoryServ", function(n, o, e, t, a, i, r, s) {
            var l = {};
            o.Indata = [], o.names = [], o.showHome = !0, o.showFeedback = !1;

            function c() {
                localStorage.getItem("dataNew") && (l = JSON.parse(localStorage.getItem("dataNew"))), 0 < l.length ? (o.notShow = !0, o.showCategory = !1, d(l), o.notNull = !0) : o.notNull = !1
            }
            o.feedback = function(e) {
                if ($(".thankForFeedback").hide(), e)
                    if (0 < l.length) {
                        var t = u(l[l.length - 1].example);
                        a.sendFeedback(l[l.length - 1].entity_id, l[l.length - 1].category_id, null, 1, t, function(e) {}), l.splice(l.length - 1, 1), localStorage.setItem("dataNew", JSON.stringify(l)), o.showFeedback = !1, o.thankForFeedback = !0, o.showHome = !1, setTimeout(function() {
                            $(".thankForFeedback").fadeOut()
                        }, 1e3), r(function() {
                            o.thankForFeedback = !1, o.showHome = !0
                        }, 1e3), n.$broadcast("reloadData"), c()
                    } else n.$broadcast("removeData"), localStorage.removeItem("dataNew");
                else o.showCategory = !1, o.Indata.feed = null, o.notShow = !0, o.showHome = !1, o.showFeedback = !0, s.getAllCategory(function(e) {
                    for (var t = 0; t < e.length; t++) o.names[t] = e[t]
                })
            }, o.$on("addNewData", function(e, t) {
                o.notNull = !0, o.showHome = !0, o.showFeedback = !1, d(l = t)
            }), o.selectCategory = function(e) {
                o.Indata.id = e.id, o.Indata.feed = e.vi_name, o.newCategory = e.vi_name, o.showCategory = !0, o.notShow = !1
            }, o.$on("reloadDataCategory", function() {
                c()
            }), o.sendFeedback = function(e) {
                if ("send" == e) {
                    if (0 < l.length && o.showCategory) {
                        var t = u(o.exampleCategory);
                        a.sendFeedback(l[l.length - 1].entity_id, l[l.length - 1].category_id, o.Indata.id, 0, t, function(e) {}), l.splice(l.length - 1, 1), localStorage.setItem("dataNew", JSON.stringify(l)), d(l), o.showFeedback = !1, o.thankForFeedback = !0, setTimeout(function() {
                            o.thankForFeedback = !1, $(".thankForFeedback").fadeOut()
                        }, 1e3), r(function() {
                            o.showHome = !0
                        }, 1e3), n.$broadcast("reloadData")
                    } else if (l.length <= 0 && (o.notNull = !1), !o.showCategory) {
                        t = u(o.exampleCategory);
                        a.sendFeedback(l[l.length - 1].entity_id, l[l.length - 1].category_id, -1, 0, t, function(e) {}), l.splice(l.length - 1, 1), localStorage.setItem("dataNew", JSON.stringify(l)), d(l), o.showFeedback = !1, o.thankForFeedback = !0, setTimeout(function() {
                            o.thankForFeedback = !1, $(".thankForFeedback").fadeOut()
                        }, 1e3), r(function() {
                            o.showHome = !0
                        }, 1e3), n.$broadcast("reloadData")
                    }
                } else o.showHome = !0, o.showFeedback = !1
            };
            var u = function(e) {
                var t = e.replace(/<rt>.*?<\/rt>/g, "");
                return t = (t = t.replace(/<.*?>/g, "")).replace(/\n/g, "")
            };
            o.removeCategory = function() {
                o.Indata.feed = null, o.notShow = !0, o.showCategory = !1
            };
            var d = function(e) {
                    if (0 < e.length) {
                        var t = e[e.length - 1];
                        o.wordCategory = t.text, o.category = t.category_vi_name, m(t.example)
                    }
                },
                m = function(e) {
                    var t = e,
                        n = o.wordCategory,
                        a = t.indexOf(n),
                        i = n.length,
                        r = t.slice(0, a) + '<span class="bg-color">' + t.slice(a, a + i) + "</span>" + t.slice(a + i, t.length);
                    o.exampleCategory = r
                };
            c()
        }]
    }
}), angular.module("mazii").directive("ngCheckCategoryModal", function() {
    return {
        restrict: "E",
        templateUrl: "components/check-category/feedback-category-modal.html",
        controller: ["$rootScope", "$scope", "maziiServ", "categoryServ", function(o, r, s, l) {
            var a;
            r.names = [], r.Indata = [];
            var i, c, u = null;
            r.Correct = !0, r.ShowChange = !0, r.modalfeedback = !0;

            function e() {
                c = c = JSON.parse(localStorage.getItem("dataNew"));
                for (var e = r.thankForFba = !1, t = 0; t < c.length; t++)
                    if (r.aux.entity == c[t].text) {
                        e = !0;
                        break
                    } e || (r.modalfeedback = !1)
            }
            r.$on("reloadData", function() {
                e()
            }), r.checkCorrect = function(e) {
                switch (e) {
                    case "correct":
                        i = l.getIdCategory(r.aux.category).id;
                        var t = null;
                        if (c)
                            for (var n = 0; n < c.length; n++)
                                if (r.aux.entity == c[n].text) {
                                    t = c[n].example;
                                    break
                                } a = {
                        id_entity: r.aux.id,
                        id_category: i,
                        id_newCategory: null,
                        correct: 1,
                        sentence: t
                    }, r.showAddCategory = !1;
                        break;
                    case "Incorrect":
                        a = null, l.getAllCategory(function(e) {
                            for (var t = 0; t < e.length; t++) r.names[t] = e[t]
                        }), r.ShowChange = !1, r.showAddCategory = !0
                }
            }, r.sendSubmit = function() {
                if (r.ShowChange = !1, null != a) {
                    for (var e = 0; e < c.length; e++)
                        if (a.id_entity == c[e].entity_id) {
                            c.splice(e, 1), localStorage.setItem("dataNew", JSON.stringify(c));
                            break
                        } d(a.id_entity, a.id_category, a.newCategory, a.correct, a.sentence), o.$broadcast("reloadData"), r.thankForFba = !0, r.showAddCategory = !1, $("#feedback-modal").fadeOut(4e3), setTimeout(function() {
                        r.modalfeedback = !1
                    }, 3e3), r.ShowChange = !1
                }
            }, r.sendFeedBack = function(e, t) {
                switch (e) {
                    case "send":
                        var n;
                        if (r.showCategory) {
                            n = l.getIdCategory(t.category).id;
                            for (var a = "", i = 0; i < c.length; i++)
                                if (c[i].entity_id == t.id) {
                                    a = c[i].example, c[i] = c[i + 1], c.pop(), localStorage.setItem("dataNew", JSON.stringify(c));
                                    break
                                } d(t.id, n, u, 0, a)
                        } else {
                            n = l.getIdCategory(t.category).id;
                            for (a = "", i = 0; i < c.length; i++)
                                if (c[i].entity_id == t.id) {
                                    a = c[i].example, c[i] = c[i + 1], c.pop(), localStorage.setItem("dataNew", JSON.stringify(c));
                                    break
                                } d(t.id, n, -1, 0, a)
                        }
                        r.thankForFba = !0, r.showAddCategory = !1, $("#feedback-modal").fadeOut(4e3), setTimeout(function() {
                            r.modalfeedback = !1
                        }, 3e3), r.ShowChange = !1;
                        break;
                    case "cancel":
                        r.ShowChange = !0, r.showAddCategory = !1
                }
            };
            var d = function(e, t, n, a, i) {
                var r = i.replace(/<rt>.*?<\/rt>/g, "");
                r = r.replace(/\n/g, ""), localStorage.setItem("dataNew", JSON.stringify(c)), o.$broadcast("reloadDataCategory"), s.sendFeedback(e, t, n, a, r)
            };
            r.removeCategory = function() {
                r.showCategory = !1
            }, r.selectCategory = function(e) {
                r.showCategory = !0, r.newCategory = e.vi_name, r.Indata.feed = null, u = l.getIdCategory(e.en_name).id
            }, e()
        }]
    }
}), angular.module("mazii").directive("ngWordJa", function() {
    return {
        restrict: "E",
        templateUrl: "components/word-ja/word-ja.html",
        scope: {
            data: "=data",
            aux: "=aux"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "ngAudio", "userServ", "$timeout", "categoryServ", "maziiServ", function(a, i, e, t, n, r, o, s, l) {
            i.dt = [];
            var c = null;

            function u(e) {
                for (var t = [
                    ["amp", "&"],
                    ["apos", "'"],
                    ["#x27", "'"],
                    ["#x2F", "/"],
                    ["#39", "'"],
                    ["#47", "/"],
                    ["lt", "<"],
                    ["gt", ">"],
                    ["nbsp", " "],
                    ["quot", '"']
                ], n = 0, a = t.length; n < a; ++n) e = e.replace(new RegExp("&" + t[n][0] + ";", "g"), t[n][1]);
                return e
            }
            i.dataWordJa = [], i.data && l.searchJa(i.data.toString()).then(function(e) {
                if (e && e.found && 1 == e.found)
                    for (var t = 0; t < e.data.length; t++) {
                        if ((e.data[t].word == i.data || e.data[t].phonetic == i.data) && e.data[t].means && (c = e.data[t].means)) {
                            for (var n = (c = c.toString()).split("\n"), a = 0; a < n.length; a++) n[a] = u(n[a]);
                            e.data[t].means = n, i.dataWordJa.push(e.data[t])
                        }
                        c = null
                    }
            }), i.setQueryType = function(e, t, n) {
                null == a.user ? (a.alert.notify = "Đăng nhập để sử dụng tính năng", $(".notify-current").fadeIn(200), o(function() {
                    $(".notify-current").fadeOut(200)
                }, 1e3)) : ($("#myNote").modal("show"), 0 < n.means.length ? a.meanMyNote = n.means.toString() : a.meanMyNote = "", a.$broadcast("setQueryType", {
                    query: e,
                    type: t
                }))
            }
        }]
    }
}), angular.module("mazii").directive("ngCheckExample", function() {
    return {
        restrict: "E",
        templateUrl: "components/check-example/check-example-directive.html",
        scope: {
            data: "=query"
        },
        controller: ["$rootScope", "$scope", "exampleServer", "localstoreServ", "$timeout", "dictUtilSer", function(e, a, i, t, n, r) {
            a.ex = {
                review: []
            }, a.noti = "";
            a.viewTrans = !1, a.$on("$destroy", function() {
                if (a.dataSentence && 200 == a.dataSentence.status) {
                    var e, t, n = a.dataSentence;
                    t = "translate" == n.type ? (e = n.name, n.job.sen_id) : (e = n.job.name, n.job.jobId), i.unlockJob(e, t, function(e) {})
                }
            });

            function o() {
                a.viewTrans = !1, a.ex = {}, a.dataSentence = null, a.data ? i.getJobKey(a.data, function(e) {
                    e.data && 200 == e.data.status && (a.dataSentence = s(e.data), sendGA("com-tran", "search-inline", "load"))
                }) : i.getJob(function(e) {
                    e.data && 200 == e.data.status && (a.dataSentence = s(e.data), sendGA("com-tran", "search-page", "load"))
                })
            }
            a.sendTrans = function(e, t) {
                var n = a.ex.mean;
                n ? 0 == Check(n) ? (a.setColor = "red", a.noti = "Xin vui lòng nhập đúng bản dịch !") : i.addMean(e, t, n, function(e) {
                    200 == e.status && (a.setColor = "blue", a.noti = "Đã gửi", setTimeout(function() {
                        a.noti = "", a.mean = "", o()
                    }, 1e3), a.data ? sendGA("com-tran", "search-inline", "translate") : sendGA("com-tran", "search-page", "translate"))
                }) : (a.setColor = "red", a.noti = "Xin vui lòng nhập bản dịch !")
            }, a.nextTrans = function(e, t) {
                a.noti = "", i.unlockJob(e, t, function(e) {
                    200 == e.status && o()
                })
            }, a.sendReview = function(e, t) {
                var n = a.ex.review;
                0 < n.length ? 1 < n.length && -1 != n.indexOf("0") ? (a.setColor = "red", a.noti = "Xin vui lòng chọn đúng bản duyệt!") : i.actionReview(t, e, n, function(e) {
                    200 == e.status && (a.setColor = "blue", a.noti = "Đã gửi", setTimeout(function() {
                        a.noti = "", o()
                    }, 1e3)), a.data ? sendGA("com-tran", "search-inline", "review") : sendGA("com-tran", "search-page", "review")
                }) : (a.setColor = "red", a.noti = "Xin vui lòng duyệt trước khi gửi")
            };
            var s = function(e) {
                return null == e || e.job && e.job.transcription && e.job.transcription != e.job.sentence && (e.job.furigana = r.mergeKanjiAndHiragana(e.job.sentence, e.job.transcription)), e
            };
            a.viewTranslate = function() {
                a.viewTrans = !0
            }, o()
        }]
    }
}), angular.module("mazii").directive("ngRules", function() {
    return {
        restrict: "E",
        templateUrl: "components/modal-rules/rules.html",
        controller: ["$rootScope", "$scope", function(e, t) {
            t.closeModal = function() {
                $("#modal-rules").modal("hide")
            }
        }]
    }
}), angular.module("mazii").directive("ngOtherTranslate", function() {
    return {
        restrict: "E",
        templateUrl: "components/other-translate/other-translate.html",
        controller: ["$rootScope", "$scope", "$http", "$state", "TranslateNewsServ", "$stateParams", "localstoreServ", "$timeout", "$location", function(n, a, e, t, i, r, o, s, l) {
            var c = o.getItem("idUser"),
                u = !0,
                d = t.current.name;
            a.stateName = d;
            var m, h = o.getItem("idTransClick");
            a.$on("changeVote", function() {
                g()
            }), a.$on("changeDetailNews", function(e, t) {
                u = !0, i.getTranslateforId(t.id, "vi", c, function(e) {
                    if (e && 200 == e.statusCode && 0 < e.data.length) {
                        a.nameTranslate = e.data;
                        for (var t = 0; t < a.nameTranslate.length; t++)
                            if (a.nameTranslate[t].uuid == c) {
                                u = !1;
                                break
                            }
                    } else a.nameTranslate = "";
                    "news" != d && s(function() {
                        $(".box-item").removeClass("trans-active"), $(".box-item.box-" + h).addClass("trans-active")
                    }, 300), n.$broadcast("statusAddNew", u)
                })
            });
            var g = function() {
                if (m = o.getItem("currentNews")) var e = m._id;
                i.getTranslateforId(e, "vi", c, function(e) {
                    if (e && 200 == e.statusCode && 0 < e.data.length) {
                        a.nameTranslate = e.data;
                        for (var t = 0; t < a.nameTranslate.length; t++)
                            if (a.nameTranslate[t].uuid == c) {
                                u = !1;
                                break
                            }
                    }
                    n.$broadcast("statusAddNew", u)
                }), "news" != d && s(function() {
                    $(".box-item").removeClass("trans-active"), $(".box-item.box-" + h).addClass("trans-active")
                }, 300)
            };
            a.gotoTranslateUser = function(e) {
                o.setItem("idTransClick", e.id), e.uuid == c ? t.go("translate_user", {
                    type: "edit"
                }) : "translate_news" == d ? ($(".box-item").removeClass("trans-active"), $(".box-item.box-" + e.id).addClass("trans-active"), n.$broadcast("changeTranstNews", e.id)) : t.go("translate_news", {
                    id: e.id
                })
            }, a.backPage = function() {
                t.go("news", {
                    id: m._id
                })
            }, s(function() {
                g()
            }, 300)
        }]
    }
}), angular.module("mazii").directive("ngFiles", ["$parse", function(i) {
    return {
        link: function(n, e, t) {
            var a = i(t.ngFiles);
            e.on("change", function(e) {
                if (a(n, {
                    $files: e.target.files
                }), n.fileinput = e.target.files[0], -1 != n.fileinput.type.indexOf("image")) {
                    var t = new FileReader;
                    t.onload = function(e) {
                        n.$apply(function() {
                            n.filepreview = e.target.result
                        })
                    }, t.readAsDataURL(n.fileinput)
                }
            })
        }
    }
}]), angular.module("mazii").directive("ngImp", function() {
    return {
        restrict: "E",
        templateUrl: "components/install-mazii-plugin/imp-template.html",
        scope: {
            data: "@data"
        },
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "$timeout", function(e, t, n, a, i) {
            t.show = !1;
            var r = "",
                o = "";
            setTimeout(function() {
                "invalid" == FLAG_MAZII_PLUGIN ? (r = "Trình duyệt của bạn không hỗ trợ tính năng dịch, vui lòng sử dụng chrome hoặc cốc cốc", o = "none", "directive" == t.data ? t.show = !1 : t.show = !0) : "need_update" == FLAG_MAZII_PLUGIN ? (r = "Bạn cần cập nhật tiện ích Mazii mới nhất để sử dụng tính năng dịch", o = "Cập nhật", t.show = !0) : "need_install" == FLAG_MAZII_PLUGIN ? (r = "directive" == t.data ? "Cài đặt tiện ích Mazii để tra cứu trên mọi website" : "Bạn cần cài đặt tiện ích Mazii để sử dụng tính năng dịch", o = "Cài đặt", t.show = !0) : "ok" == FLAG_MAZII_PLUGIN && (o = "none", t.show = !1), t.message = r, t.action = o, a.safeApply(t)
            }, 3e3), t.clickAction = function() {
                "Cài đặt" != t.action && "Cập nhật" != t.action || window.open("https://chrome.google.com/webstore/detail/japanese-dictionary-mazii/lkjffochdceoneajnigkbdddjdekhojj", "_blank")
            }
        }]
    }
}), angular.module("mazii").directive("ngGrammarExtra", function() {
    return {
        restrict: "E",
        templateUrl: "components/grammar-extra/grammar-extra-template.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "$state", "localstoreServ", "maziiServ", "$stateParams", "dictUtilSer", function(t, i, e, n, r, a, o) {
            var s = 1;
            i.showSelect = !1, i.slLevel = "Tất cả", i.slWord = "Tất cả";
            var l, c = "",
                u = "";
            i.showMore = !0;
            var d, m = i.data;
            i.numPages = 1, i.numPerPage = 12, i.maxSize = 5, i.noneData = !1, null == m && (m = "");
            var h = n.getItem("grammar-search");
            h && ("" == h.level ? (c = "", i.slLevel = "Tất cả") : (c = h.level, i.slLevel = c), "" == h.word ? (u = "", i.slWord = "Tất cả") : (u = h.word, i.slWord = u), m = h.query), i.$watch("data", function(e, t) {
                e != t && g(c, u, m = e, s)
            });
            var g = function(e, t, n, a) {
                i.noneData = !1, i.listGrammar = null, r.getGrammar(e, t, n, a, function(e) {
                    200 == e.data.status && (l = e.data, d = l.results, i.listGrammar = d, i.numOfPages()), null == i.listGrammar && (i.noneData = !0)
                })
            };
            i.goDetail = function(e) {
                t.$broadcast("query", {
                    type: "grammarDetail",
                    query: e
                })
            }, i.showFilter = function() {
                i.showSelect = !i.showSelect, setTimeout(function() {
                    $(".select-level .sl-item").removeClass("active-item"), $(".select-level .sl-item-" + c).addClass("active-item")
                }, 100);
                for (var e = 0; e < i.listCategory.length; e++)
                    if (u == i.listCategory[e]) return void setTimeout(function() {
                        $(".item-word div").removeClass("active-item"), $(".item-word .item-" + e).addClass("active-item")
                    }, 200)
            }, i.selectLevel = function(e) {
                s = 1, i.showSelect = !1, i.slLevel = "" == e ? "Tất cả" : e, g(c = e, u, m, s)
            }, i.selectWord = function(e) {
                s = 1, i.showSelect = !1, i.slWord = "" == e ? "Tất cả" : e, g(c, u = e, m, s)
            }, i.onSelectPage = function(e) {
                i.numPages = e.page, 1 != e && g(c, u, m, e.page)
            }, i.numOfPages = function() {
                if (l) return Math.ceil(l.total / i.numPerPage)
            }, i.colorLevel = function(e) {
                return e
            }, i.cvKanji = function(e) {
                var t = e.indexOf("=>");
                return e.substr(0, t)
            }, i.cvMean = function(e) {
                var t = e.indexOf("=>");
                return e.substr(t + 2, e.length)
            }, i.convertCate = function(e) {
                return e && 20 < e.length ? e.slice(0, 19) + "..." : e
            }, i.listLevel = ["N5", "N4", "N3", "N2", "N1"], i.listCategory = ["Đối chiếu", "Xếp hàng, liệt kê", "Diễn tả", "Tình huống, trường hợp", "Phương tiện, phương pháp", "Biểu thị bằng ví dụ", "Nguyên nhân, lý do", "Cương vị, quan điểm", "Trạng thái", "Nhấn mạnh", "Khả năng", "Vô can", "Điều không ăn khớp với dự đoán", "Bất biến", "Suy đoán", "Liên quan, tương ứng", "Kết luận", "Ngoài dự đoán", "Nhấn mạnh về mức độ", "Ngạc nhiên", "Quả quyết (quyết định dứt khoát)", "Trạng thái kết quả", "Được lợi", "Liên tục", "Kết quả", "Điều kiện (điều kiện giả định)", "Diễn ra kế tiếp", "Thông qua, trải qua", "Lặp lại, thói quen", "Hạn định", "Đánh giá", "Mệnh lệnh, định nghĩa", "Cho phép", "Mệnh lệnh", "Cấm chỉ", "Cách nói mào đầu", "Mục đích, mục tiêu", "Hoàn tất", "Đề nghị", "Chia động từ", "Nửa chừng", "Tỉ dụ, ví von", "Khoảng thời gian ngắn", "Thêm vào", "Chỉ trích", "Nhấn mạnh nghia phủ định", "Đính chính", "Kỳ vọng", "Cần thiết, nghĩa vụ", "So sánh", "Căn cứ, cơ sở", "Chuyển đề tài câu chuyện", "Khuynh hướng", "Nghe nói", "Dự định", "Đồng thời", "Yêu cầu", "Tình hình", "Điều kiện (điều kiện cần)", "Điều kiện giả định", "Mời rủ, khuyên bảo", "Phạm vi", "Mức vươn tới", "Thời điểm", "Quyết tâm, quyết định", "Đề tài câu chuyện", "Tỉ lệ, song song", "Phương hướng", "Xác nhận", "Sửa đổi", "Giải thích", "Ví dụ cực đoan", "Mơ hồ", "vị trí, cách thức, nguyên nhân", "Thời điểm, phương hướng", "Điểm xuất phát, điểm nhận", "Số lượng", "Bắt buộc", "Danh từ hóa", "Đương nhiên", "Liệt kê", "Giới hạn, cực hạn", "Quan hệ trước sau", "Cảm thán", "Phát ngôn", "Quan hệ nfguyên nhân, trước sau", "Quyết định", "Thời gian", "Mức độ", "Nhượng bộ", "Tôn kính, khiêm nhường", "Khuyên bảo", "Nguồn tin", "Chấp thuận, đồng ý", "Điểm xuất phát và điểm kết thúc", "Hối hận", "Nhấn mạnh nghĩa phủ định", "Tương phản", "Cưỡng chế", "Bổ nghĩa", "Điều kiện (điều kiện tổng quát)", "Nghi vấn", "Mức nhiều ít về số lượng", "Tiêu chuẩn", "Khuyến cáo, cảnh cáo", "Trợ từ", "Nguyện vọng", "Tuyển chọn", "Miêu tả", "Tính từ hóa", "Từ chối", "Suy luận", "Kế hoạch, quy tắc", "Đúng như dự đoán", "Cảm giác", "Tính tương tự", "Điều không khớp với dự đoán", "Ý chí, ý hướng", "Tình cảm", "Ý muốn", "Phủ định trong quá khứ", "Điều kiện (điều kiện trái với sự thực)", "Coi như", "Ngoại lệ", "Mức nhiều ít về lượng", "Khả năng, sở thích", "Điều kiện (điều kiện đủ)", "Thay đổi cách nói", "Mức cực đoan", "Quan hệ không gian", "Tiền đề", "Thành tựu", "Địa điểm", "Kèm theo", "Điểm xuất phát", "Cấp (so sánh) cao nhất", "Khinh thường", "Hành động", "Tỷ lệ", "Biểu hiện bằng ví dụ", "Kỳ hạn", "Giá trị", "Nhấn mạnh vào mức độ", "Ý định", "Miêu tả, giải thích", "Mong muốn", "Hành động, trạng thái", "Tương tụ, mức độ", "Mời, đề nghị", "Thời điểm trong tương lai", "Ngay sau khi...", "Yêu cầu cho phép", "Quan hệ về mặt thời gian", "Thời điểm, trình tự thời gian", "Hoàn thành", "Số lượng đại khái", "Đặc điểm", "Quá khứ, trạng thái", "Mục tiêu, mục đích", "Tỷ lệ thuận", "Trách móc", "So sánh, Tương phản", "Ngay trước khi...", "Thời gian, không gian", "Thời điểm", "Kinh nghiệm", "Mục đích, danh từ hóa", "Phán đoán", "Tỷ lệ, song song", "Lập luận (khẳng định một cách gián tiếp)", "Nhiều ít về mức độ", "Hành động, nỗ lực", "Cách thức", "Bị động", "Cho đi", "Thời điểm, tình huống", "Điều kiện trái với sự thực", "Điều kiện (điều kiện cần)", "Đồng hành", "Tần suất", "Mời rủ", "Giao tiếp khéo léo", "Sai khiến", "Điều kiện", "Yêu cầu, đề nghị", "Nguyên nhân, quan hệ thời gian", "Trạng thái, tương phản", "Quan điểm, cách thức", "Trạng thái, hành động", "Quá trình", "Nhắc nhở", "Phủ định"], g(c, u, m, s)
        }]
    }
}), angular.module("mazii").directive("ngWordDay", function() {
    return {
        restrict: "E",
        templateUrl: "components/word-day/word-day-template.html",
        controller: ["$rootScope", "$scope", "$http", "dictUtilSer", "ngAudio", "userServ", "$timeout", "categoryServ", "maziiServ", function(t, n, e, a, i, r, o, s, l) {
            var c = [];
            var u = {};
            n.playAudio = function(e) {
                if (null == u[e]) {
                    var t = "//data.mazii.net/audios/" + a.convertJptoHex(e).toUpperCase() + ".mp3";
                    u[e] = i.load(t)
                }
                u[e].play()
            }, l.getWordOfDay().then(function(e) {
                c = function(e) {
                    if (null == e) return [];
                    for (var t = [], n = 0; n < e.length; n++) "word" == e[n].type && e[n].means && t.push(e[n]);
                    return t
                }(e), n.data = function(e, t) {
                    return a.shuffleArray(e).slice(0, t)
                }(c, 3), a.safeApply(n)
            }, function(e) {
                console.log(e)
            }), n.searchWord = function(e) {
                t.$broadcast("query", {
                    type: "word",
                    query: e.content,
                    tag: "quick-search"
                }), sendGA("static", "word-of-day", e.content)
            }
        }]
    }
}), angular.module("mazii").directive("ngBookStore", function() {
    return {
        restrict: "E",
        templateUrl: "components/book-store/bookstore-directive.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "maziiServ", function(e, t, n) {
            t.percentSale = function(e, t) {
                var n = 0;
                if (e && t) return n = (a(e) - a(t)) / a(e) * 100, Math.round(n)
            };
            var a = function(e) {
                var t = e.indexOf("đ");
                if (-1 != t) var n = e.substr(0, t - 1);
                return parseInt(n)
            };
            t.tracking = function(e) {
                sendGA("book-store", "home-page", e.name)
            }, n.getRandomBook().then(function(e) {
                e.results && 0 < e.results.length && (t.listBook = e.results)
            })
        }]
    }
}), angular.module("mazii").directive("ngVideoJapan", function() {
    return {
        restrict: "E",
        templateUrl: "components/video-japan/video-japan-directive.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "maziiServ", function(e, t, n) {
            t.tracking = function(e) {
                sendGA("static", "video-pika", e)
            }, n.getTopVideoTrending(4, 1, function(e) {
                null == e.Err && (t.listVideo = e.Song)
            })
        }]
    }
}), angular.module("mazii").directive("ngGrammarNalys", function() {
    return {
        restrict: "E",
        templateUrl: "components/grammarnalys/grammarnalys-template.html",
        scope: {
            data: "=data"
        },
        controller: ["$scope", "$rootScope", "maziiServ", function(t, n, a) {
            function i(e) {
                a.getGrammarNalys(e, function(e) {
                    200 == e.data.status && (t.listGrammar = e.data.grammars)
                })
            }
            t.goDetail = function(e) {
                n.$broadcast("query", {
                    type: "grammarDetail",
                    query: e
                })
            }, t.$watch("data", function(e, t) {
                e != t && 0 < e.length && i(e)
            }), t.data && 5 < t.data.length && i(t.data)
        }]
    }
}), angular.module("mazii").directive("ngRadicals", function() {
    return {
        restrict: "E",
        templateUrl: "components/radicals/radicals-template.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "$http", "maziiServ", function(t, r, e, o) {
            var a = "",
                i = [],
                s = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "17"],
                l = [],
                c = [],
                u = [];
            r.$watch("data", function() {
                null != r.data && (a = r.data)
            }), r.$on("clear-text-search", function() {
                a = ""
            });
            r.getActive = function(e) {
                return c && 0 < c.length ? -1 != c.indexOf(e) ? "" : "no-active" : ""
            };
            var d = "";
            r.selectRadical = function(e) {
                if (0 == d.length) d = e, $(".directive-radical .txt-" + e).addClass("txt-active");
                else {
                    var t = 0,
                        n = d.indexOf(e); - 1 != n && (d = d.slice(0, n) + d.slice(n + 1, d.length), t = 1, $(".directive-radical .txt-" + e).removeClass("txt-active")), 0 == t && (d += e, $(".directive-radical .txt-" + e).addClass("txt-active"))
                }
                u = o.getKanjisByRadical(d), l = [];
                for (var a = 0; a < u.length; a++) {
                    var i = u[a];
                    null == l[i.stroke] && (l[i.stroke] = []), l[i.stroke].push(i)
                }
                r.dataKanji = l, c = o.getRadicalWithRadical(d)
            }, r.selectKanji = function(e) {
                a += e, t.$broadcast("fill-text-search", a)
            }, r.refreshRadical = function() {
                l = [], r.dataKanji = l, d = "", c = [], u = [], $(".directive-radical .txt-radical").removeClass("txt-active")
            },
                function() {
                    if (a || (l = [], r.dataKanji = [], c = [], d = "", $(".box-quick-kanji .txt-radical").removeClass("txt-active")), 0 == i.length) {
                        for (var e = 0; e < s.length; e++) {
                            var t = s[e],
                                n = {
                                    stroke: t,
                                    radicals: o.getRadicalByStrockCount(t)
                                };
                            i.push(n)
                        }
                        r.radicalByStroke = i
                    }
                }()
        }]
    }
}), angular.module("mazii").directive("ngNewsSearch", function() {
    return {
        restrict: "E",
        templateUrl: "components/news-search/news-search-template.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "maziiServ", function(o, s, t) {
            var n = {};
            s.showDetailNews = function(e) {
                t.getDetailNews(e.id).then(function(e) {
                    n = e, s.detailNews = n, s.titleNews = a(n.title), s.contentNews = a(n.content.textbody), s.textMoreNews = a(n.content.textmore)
                }), setTimeout(function() {
                    $(".main-news-body p>*").addClass("displayNews")
                }, 500)
            }, s.closeModal = function() {
                $("#modal-detail-news").modal("hide")
            };
            var a = function(e) {
                var t = ">" + s.data || "> " + s.data;
                return e.replace(new RegExp(t, "g"), '><span style="color:blue;">' + s.data + "</span>")
            };
            $(document).on("click", "a.dicWin", function(e) {
                var t = "";
                if ("" != (t = (t = e.currentTarget.innerHTML.replace(/<rt>.*?<\/rt>/g, "")).replace(/<.*?>/g, ""))) {
                    var n = $(e.currentTarget).attr("altid");
                    if (null != n && "" != n) {
                        n = parseInt(n);
                        var a = null,
                            i = s.detailNews.def;
                        if (null != i)
                            for (var r = 0; r < i.length; r++) i[r].id == n && (a = i[r]);
                        null != a && a.entity != t && (t = a.entity), o.$broadcast("query", {
                            type: "word",
                            query: t,
                            aux: a,
                            tag: "quick-search"
                        })
                    } else o.$broadcast("query", {
                        type: "word",
                        query: t,
                        tag: "quick-search"
                    })
                }
            }), t.getNewsByWord(s.data, function(e) {
                200 == e.data.status && (s.listNews = e.data.results)
            })
        }]
    }
}), angular.module("mazii").controller("SearchController", ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "$stateParams", "$location", "localstoreServ", "ngAudio", "$window", "$http", function(s, l, e, a, c, u, r, t, o, i, n, d, m) {
    var h = !(initSearchCtrl = !0);
    l.examples = null, l.words = null, l.kanjis = null, l.grammars = null, l.suggest = null, l.googleTranslate = null, s.title = "Tìm kiếm", l.noResultsKanjis = !0, l.tabSelected = 0, l.showLoading = !1, l.currentKanjiSelected = 0, l.noResults = !1, l.startSearch = !1, l.showReportBox = [], l.dt = [], l.showCommunity = !1, l.typePhone = "ios", l.showGrammarNalys = !1, l.noneDataJaen = !1, l.dictSearch = "javi";
    var g, p = l.showDictRadical = !1,
        f = "",
        v = 0,
        y = "javi",
        w = [],
        _ = !1,
        b = i.getItem("showSuggest"),
        k = i.getItem("grammar-search");
    if (k) var S = k.tab;

    function C(e) {
        $("#site-title").html("Bộ hán tự " + e.kanji + " - " + e.mean + " | Từ điển Nhật Việt Mazii"), $(".site-name").html("Bộ hán tự " + e.kanji + " - " + e.mean + " | Từ điển Nhật Việt Mazii"), $(".site-title").attr("content", "Bộ hán tự " + e.kanji + " - " + e.mean + " | Từ điển Nhật Việt Mazii");
        var t = "Âm kun: " + e.kun + ", âm on: " + e.on + ". Ý nghĩa: " + e.detail;
        $(".site-desc").attr("content", t), $("#site-url").attr("content", window.location.href), $("#site-keyword").attr("content", HOME_PAGE_KEYWORDS)
    }
    v = i.getItem("download"), l.downloadApp = 3 != v, l.$on("listExNull", function() {
        l.displayDirect = !1
    }), l.$on("login.success", function() {
        O()
    }), l.showKanjiDrawTable = function() {
        p = !p, l.showDictRadical && (l.showDictRadical = !1), 0 == p && "" != (f = $("#search-text-box").val()) && l.startQuery(f)
    }, l.queryNotNull = function() {
        return null != f && "" != f
    }, l.getCurrentQuery = function() {
        return f
    }, l.isShowKanjiDraw = function() {
        return p
    }, l.inputEnter = function() {
        "" != (f = $("#search-text-box").val()) && l.startQuery(f)
    }, l.$on("query", function(e, t) {
        if (null != t && "quick-search" != t.tag && "report-mean" != t.tag)
            if (null == t.query) f = t, l.startQuery(t, !0);
            else {
                if ("grammarDetail" == t.type) return;
                f = t.query, l.setTabByChar(t.type[0]), l.startQuery(f, !0)
            }
    }), l.filter = function(e) {
        if (b) {
            var t = e.query ? e.query : e,
                n = null;
            if (u.isJapanese(t)) n = u.realtimeSearch("ja", t);
            else if (u.isVietnamese(t)) n = u.realtimeSearch("vi", t);
            else {
                1 < t.length && t[0] == t[0].toUpperCase() && t[1] == t[1].toLowerCase() && (t = t.toLowerCase());
                var a = wanakana.toKana(t);
                (n = u.realtimeSearch("ja", a)).splice(0, 0, t)
            }
            return n
        }
        return []
    }, l.$on("insertQueryText", function(e, t) {
        if (null != t && "" != t) {
            var n = $("#search-text-box").val();
            n += t, $("#search-text-box").val(n)
        }
    }), l.clearQuery = function() {
        $("#search-text-box").val(""), f = "", l.suggestSen = [], l.grammars = null, l.words = null, l.kanjis = null, l.examples = null, l.suggest = null, l.noResults = !1, l.startSearch = !1, l.noResultsKanjis = !0, l.googleTranslate = !1, l.query = "", l.tokens = null, s.$broadcast("clear-text-search"), e.go("search", {
            notify: !1
        }), setTimeout(function() {
            $("#search-text-box").focus()
        }, 10)
    }, l.changePlaceHolder = function() {
        var e = "";
        switch (l.tabSelected) {
            case 0:
                e = "日本, nihon, Nhật Bản";
                break;
            case 1:
                e = "公, công";
                break;
            case 2:
                e = "優しい, yasashii, tốt bụng";
                break;
            case 3:
                e = "のに, để"
        }
        $("#search-text-box").attr("placeholder", e)
    }, l.getTypeButtonClass = function(e) {
        return e == l.tabSelected ? "btn-primary" : "btn-default"
    }, l.changeTypeSearch = function(e, t) {
        if (3 != e && i.deleteItem("grammar-search"), l.dictSearch = 5 == e ? y = "jaen" : y = "javi", e != l.tabSelected) {
            l.tabSelected = e, 1 == p && (p = !1), $(".search-input-container button").removeClass("tab-active"), $("#tab" + e).addClass("tab-active");
            var n = "";
            switch (e) {
                case 0:
                    n = "日本, nihon, Nhật Bản", g = "word";
                    break;
                case 1:
                    n = "公, công", g = "kanji";
                    break;
                case 2:
                    n = "優しい, yasashii, tốt bụng", g = "example";
                    break;
                case 3:
                    n = "のに, để", g = "grammar";
                    break;
                case 5:
                    n = "日本, nihon, Japan", g = "word"
            }
            $("#search-text-box").attr("placeholder", n), 1 != t && (f = $("#search-text-box").val()) && "" != f && l.startQuery(f)
        }
    };
    var T = null;
    l.enterInput = function(n) {
        T = null != n && "" != n ? (null != T && clearTimeout(T), 1 < n.length && n[0] == n[0].toUpperCase() && n[1] == n[1].toLowerCase() && (n = n.toLowerCase()), setTimeout(function() {
            var e = {
                type: g,
                query: n
            };
            l.suggestSen = l.filter(e), 1 != l.tabSelected || u.isJapanese(n) || (l.suggestSen = []), new R("search-text-box", "list-suggest-history");
            var t = $(".search-box-range").width();
            $(".list-suggest-history").css("width", t), $("#list-suggest-history").show(), l.$$phase || s.$$phase || l.$digest()
        }, 400)) : (l.suggestSen = [], $("#list-suggest-history").hide(), clearTimeout(T), null)
    }, l.suggestClick = function(e) {
        u.isJapanese(e) ? l.startQuery(e.split(" ")[0], !0) : l.startQuery(e, !0)
    }, l.getPosOfTokenizer = function(e) {
        return e ? e.replace(new RegExp(/\,\*/, "g"), "") : e
    }, l.searchToken = function(e) {
        s.$broadcast("query", {
            type: "word",
            query: e,
            from: "token"
        })
    };

    function I(o) {
        c.searchGlobal("word", o, y).then(function(e) {
            var t = "ja",
                n = "vi";
            if (n = u.isJapanese(o) ? (t = "ja", "jaen" == y ? "en" : "vi") : (t = "jaen" == y ? "en" : "vi", "ja"), null == e) {
                var a = 0;
                return a++, _ || (l.showGrammarNalys = !0, c.tokenizer(o).then(function(e) {
                    var t = null;
                    e && (t = e.tokens), 1 == t.length && t[0].base == o && (t = null), l.tokens = t, u.safeApply(l), 0 == --a && s.htmlReady()
                })), l.words = null, u.showLoading(!1), a++, void c.cloudTranslate(o, t, n, function(e) {
                    null == e && (l.noResults = !0), l.googleTranslate = e, u.safeApply(l), 0 == --a && s.htmlReady()
                })
            }
            if (200 == e.status) {
                if (null != e.data)
                    for (var i = 0; i < e.data.length; i++)
                        if (e.data[i].word == o || e.data[i].phonetic == o) {
                            e.found = !0, l.showGrammarNalys = !1;
                            break
                        } if (0 == e.found) {
                    l.suggest = e.data;
                    var r = [];
                    _ || (l.showGrammarNalys = !0, c.tokenizer(o).then(function(e) {
                        var t = null;
                        e && (t = e.tokens), 1 == t.length && t[0].base == o && (t = null), l.tokens = t;
                        for (var n = 0; n < t.length; n++) t[n].word = l.getTokenFurigana(t[n]), r[n] = t[n];
                        u.safeApply(l)
                    })), c.cloudTranslate(o, t, n).then(function(e) {
                        l.googleTranslate = e, l.googleTranslate.furigana = r, null == l.$$phase && l.$apply()
                    })
                } else {
                    l.words = [], l.suggest = [];
                    for (i = 0; i < e.data.length; i++) e.data[i].word == o || e.data[i].phonetic == o ? l.words.push(e.data[i]) : l.suggest.push(e.data[i]);
                    "jaen" == y && x(o)
                }
                l.showLoading = !1,
                    function(e, t) {
                        var n = e;
                        if (null != t && 0 < t.length) {
                            var a = t[0];
                            if (null == a) return;
                            var i = "",
                                r = a.phonetic;
                            r = null == r ? "" : " 「" + r + "」 ";
                            for (var o = 0; o < a.means.length; o++) "" != i && (i += ", "), i += a.means[o].mean;
                            n = a.word + r + ": " + i;
                            var s = "Mục từ: " + a.word + r + ". Nghĩa: " + i;
                            $(".site-desc").attr("content", s), $("#site-title").html(n + " | Nghĩa của từ " + a.word + r + " | " + a.word + r + " とは"), $(".site-name").html(n + " | Nghĩa của từ " + a.word + r + " | " + a.word + r + " とは"), $(".site-title").attr("content", n + " | Nghĩa của từ " + a.word + r + " | " + a.word + r + " とは"), $("#site-url").attr("content", window.location.href), $("#site-keyword").attr("content", HOME_PAGE_KEYWORDS)
                        }
                    }(o, l.words), s.htmlReady()
            } else l.words = null, l.showLoading = !1, "ja" == t && "vi" == n && (l.showGrammarNalys = !0), c.cloudTranslate(o, t, n).then(function(e) {
                l.googleTranslate = e, null == l.$$phase && l.$apply()
            }), 0 == _ && c.tokenizer(o).then(function(e) {
                var t = null;
                e && (t = e.tokens), 1 == t.length && t[0].base == o && (t = null), l.tokens = t, u.safeApply(l), s.htmlReady()
            })
        }, function(e) {
            l.words = null, l.showLoading = !1, l.noResults = !0, "ja" == from && "vi" == to && (l.showGrammarNalys = !0), c.cloudTranslate(o, from, to).then(function(e) {
                s.googleTranslate = e, null == s.$$phase && s.$apply()
            })
        })
    }
    var x = function(t) {
        var n = t + "-" + y;
        w[n] ? (l.examples = w[n], l.showLoading = !1) : c.searchGlobal("example", t, y).then(function(e) {
            200 == e.status ? (l.examples = e.results, w[n] = l.examples, l.showLoading = !1, r.push(t, "example", l.lang)) : (l.examples = null, l.showLoading = !1, l.noResults = !0), s.htmlReady()
        }, function(e) {
            l.examples = null, l.showLoading = !1, l.noResults = !0, s.htmlReady()
        })
    };
    s.originQuery = null, l.startQuery = function(n, e) {
        if (l.showDictRadical = !1, $("#list-suggest-history").hide(), d.scrollTo(0, 0), l.startSearch = !0, s.$broadcast("unlockTrans"), null != T && clearTimeout(T), p = !1, l.showServerContent = !1, f = n, l.noResults = !1, l.examples = null, l.words = null, l.kanjis = null, l.grammars = null, l.suggest = null, l.googleTranslate = null, l.lang = "JA", l.tokens = null, l.originQuery = null, l.showLoading = !0, l.dataWordJa = [], 5 != l.tabSelected ? l.dictSearch = "javi" : l.dictSearch = "jaen", 1 == l.tabSelected && (e = !0), _ = !1, 0 == u.isJapanese(n) && (u.isVietnamese(n) || null != e ? (n = n.toLowerCase(), _ = !0, l.lang = "VI", 5 != l.tabSelected && (l.dictSearch = "vija")) : (1 < n.length && n[0] == n[0].toUpperCase() && n[1] == n[1].toLowerCase() && (n = n.toLowerCase()), n = wanakana.toKana(n))), f = n, $("#search-text-box").val(f), l.query = n, 0 == l.tabSelected) {
            r.push(n, "word", l.lang);
            if ("VI" != l.lang && !_ || "vija", !_ && 0 == u.isExistWord(n)) {
                var t = u.getBaseForm(n);
                t != n && (l.originQuery = n, l.baseFormWord = t, n = t)
            }
            I(n), c.searchGlobal("kanji", n, y).then(function(e) {
                if (200 == e.status) {
                    if (u.isJapanese(n)) {
                        var t = u.getKanjiChara(n);
                        l.resultKanjis = u.sortHVDataByKeyWord(t, e.results)
                    } else l.resultKanjis = e.results;
                    l.noResultsKanjis = !1
                } else l.resultKanjis = null, l.noResultsKanjis = !0
            }, function(e) {
                l.resultKanjis = null, l.noResultsKanjis = !0
            }), sendGA("search", "word", n)
        } else if (1 == l.tabSelected) {
            l.suggestKanji = [], !u.getKanjiChara(n) && u.isJapanese(n) ? (l.noResults = !0, l.kanjis = null, l.suggestKanji = l.filter(n), l.showLoading = !1) : c.search("kanji", n).then(function(e) {
                if (l.currentKanjiSelected = 0, 200 == e.status) {
                    if (u.isJapanese(n)) {
                        var t = u.getKanjiChara(n);
                        l.kanjis = u.sortHVDataByKeyWord(t, e.results), null != l.kanjis && 0 < l.kanjis.length && (C(l.kanjis[0]), s.htmlReady())
                    } else l.kanjis = e.results, null != l.kanjis && 0 < l.kanjis.length && (C(l.kanjis[0]), s.htmlReady());
                    l.showLoading = !1, r.push(n, "kanji", l.lang)
                } else l.kanjis = null, l.showLoading = !1, l.noResults = !0;
                s.htmlReady()
            }, function(e) {
                l.kanjis = null, l.showLoading = !1, l.noResults = !0, s.htmlReady()
            }), sendGA("search", "kanji", n)
        } else 3 == l.tabSelected ? (l.currentQuery = n, sendGA("search", "grammar", n)) : 2 == l.tabSelected ? (x(n), sendGA("search", "example", n)) : 5 == l.tabSelected && (l.resultKanjis = null, u.isJapanese(n) ? (l.noneDataJaen = !1, I(n)) : l.noneDataJaen = !0, sendGA("search", "jaen", n));
        if (l.suggestSen = [], 0 == h) {
            var a = "/search?dict=" + y + "&type=" + l.getCurrentType() + "&query=" + n;
            o.url(a), o.replace();
            var i = o.absUrl();
            i = i.replace(encodeURIComponent(n), n), d.history.pushState(null, "Search", i)
        }
    }, l.getTokenFurigana = function(e) {
        var t = e.surface;
        if (u.isKanji(t)) {
            var n = wanakana.toHiragana(e.reading);
            return null != n ? "<ruby><rb>" + t + "</rb><rt>" + n + "</rt></ruby>" : t
        }
        return t
    }, l.changeKanjiShow = function(e) {
        l.currentKanjiSelected = e
    }, l.getCurrentKanji = function() {
        return l.kanjis[l.currentKanjiSelected]
    }, l.kanjiSeletectClass = function(e) {
        return l.currentKanjiSelected == e ? "selected" : ""
    }, l.getCurrentType = function() {
        switch (l.tabSelected) {
            case 0:
                return "w";
            case 1:
                return "k";
            case 2:
                return "s";
            case 3:
                return "g"
        }
        return "w"
    }, l.setTabByChar = function(e, t) {
        var n = 0;
        null == e || "" == e ? n = S || 0 : "w" == e ? n = "jaen" == t ? 5 : 0 : "k" == e ? n = 1 : "e" == e ? n = 2 : "g" == e ? n = 3 : "s" == e && (n = 2), l.changeTypeSearch(n, !0)
    };
    var j = t.type,
        P = t.query,
        N = t.dict;
    l.setTabByChar(j, N), null != P && "" != P ? (f = P, l.startQuery(P)) : f = "", l.$on("searchKanji", function(e, t) {
        l.changeTypeSearch(1, !0), l.startQuery(t)
    }), l.showServerContent = !1, $("#search-text-box").on("input", function() {
        var e = $("#search-text-box").val();
        e = e.trim(), f = e, l.enterInput(e)
    }), l.showHistoryPanel = function() {
        $(".history-panel").addClass("open-history-panel"), $(".cover").css("display", "block"), $("body").css("overflow", "hidden")
    }, l.showDetailSuggest = function(e) {
        $(".icon_" + e).addClass("hiden"), $(".detail_" + e).removeClass("hiden"), $("." + e).addClass("hiden"), $("#feedback-suggest-" + e).removeClass("hiden"), l.showReportBox[e] = !0
    }, l.convertKindToReadable = function(e) {
        return null == e || "" == e ? "" : u.convertKindToReadable(e)
    }, l.playAudio = function(e) {
        var t = "//data.mazii.net/audios/" + u.convertJptoHex(e).toUpperCase() + ".mp3";
        l.sound = n.load(t), l.sound.play()
    }, s.$on("chaneShowSuggest", function(e) {
        b = i.getItem("showSuggest")
    }), l.setQueryType = function(e, t, n) {
        null == s.user ? (s.alert.notify = "Đăng nhập để sử dụng tính năng", $(".notify-current").fadeIn(200), a(function() {
            $(".notify-current").fadeOut(200)
        }, 1e3)) : ($("#myNote").modal("show"), 0 < n.means.length ? s.meanMyNote = n.means[0].mean : s.meanMyNote = "", s.$broadcast("setQueryType", {
            query: e,
            type: t
        }))
    }, l.translate = function() {
        "" != l.text && (console.log(l.text), s.$broadcast("query", {
            type: "word",
            query: l.text,
            tag: "quick-search"
        }), $(".box-search").css("display", "none"))
    }, s.showAllMean = !1, l.$on("$locationChangeSuccess", function(e, t, n, a, i) {
        var r = t.match(/type=(.)&query=(.+)/i);
        if (null != r && 3 == r.length) {
            var o = r[1],
                s = decodeURIComponent(r[2]);
            s != f ? (h = !0, l.setTabByChar(o), l.startQuery(s, null)) : h = !1
        }
    }), $(document).on("mousemove", function(e) {
        l.x = e.pageX, l.y = e.pageY
    });
    var A = 100,
        R = function(e, t) {
            var n = this;
            this.textbox = document.getElementById(e), this.div = document.getElementById(t), this.list = this.div.getElementsByTagName("div"), this.pointer = null, this.textbox.onkeydown = function(e) {
                switch ((e = e || window.event).keyCode) {
                    case 38:
                        n.selectDiv(-1);
                        break;
                    case 40:
                        n.selectDiv(1)
                }
            }, this.selectDiv = function(e) {
                if (1 < this.pointer && (40 == window.event.keyCode ? (document.getElementById("list-suggest-history").scrollTop = A, A += 40) : 38 == window.event.keyCode && (A -= 40, document.getElementById("list-suggest-history").scrollTop = A)), 0 == this.pointer && (document.getElementById("list-suggest-history").scrollTop = 0), null !== this.pointer && 0 <= this.pointer + e && this.pointer + e < this.list.length) {
                    this.list[this.pointer].className = "suggest-item", this.pointer += e, this.list[this.pointer].className = "active-suggest", n = (n = this.list[this.pointer].innerHTML).substring(56, n.length);
                    for (var t = 0; t < n.length; t++)
                        if ("<" == n[t]) {
                            n = n.substring(0, t);
                            break
                        } this.textbox.value = n
                }
                if (null === this.pointer) {
                    var n;
                    this.pointer = 0, A = 20, this.list[this.pointer].className = "active-suggest", n = (n = this.list[this.pointer].innerHTML).substring(56, n.length);
                    for (t = 0; t < n.length; t++)
                        if ("<" == n[t]) {
                            n = n.substring(0, t);
                            break
                        } this.textbox.value = n
                }
            }
        };
    l.trackJoinCom = function() {
        i.setItem("invite-comunity-home-page", !0), sendGA("join", "invite-comunity-home-page")
    }, l.track = function(e, t) {
        sendGA("search", e, t)
    }, l.noJoinCom = function() {
        i.setItem("invite-comunity-home-page", "no-com"), l.displayDirect = !1, l.showNotifynewVersion = SHOW_NOTIFY_NEW_VERSION
    };
    var O = function() {
        setTimeout(function() {
            if (null == s.user) l.displayDirect = !1, l.showNotifynewVersion = SHOW_NOTIFY_NEW_VERSION;
            else {
                var e = i.getItem("invite-comunity-home-page");
                if (1 == e) l.showNotifynewVersion = SHOW_NOTIFY_NEW_VERSION, l.showCommunity = !0;
                else if ("no-com" == e) l.displayDirect = !1, l.showCommunity = !1, l.showNotifynewVersion = SHOW_NOTIFY_NEW_VERSION;
                else {
                    l.showCommunity = !1;
                    var t = r.get();
                    console.log("history length: " + t.length), t && 10 < t.length ? (l.displayDirect = !0, l.showNotifynewVersion = !1) : (l.showNotifynewVersion = SHOW_NOTIFY_NEW_VERSION, l.displayDirect = !1)
                }
            }
            u.safeApply(l)
        }, 1e3)
    };
    O(), l.searchDictRadical = function() {
        l.showDictRadical = !l.showDictRadical, p = p && !1, l.suggestSen = [], l.grammars = null, l.words = null, l.kanjis = null, l.examples = null, l.suggest = null, l.startSearch = !0, l.noResultsKanjis = !0, l.googleTranslate = !1
    }, l.$on("fill-text-search", function(e, t) {
        f = t, $("#search-text-box").val(t)
    }), l.convertKanji = function(e) {
        if (!e || null == e) return e;
        var t = e.indexOf(" ");
        return e.slice(0, t)
    }, l.convertKanjiHira = function(e) {
        if (!e || null == e) return e;
        var t = e.length,
            n = e.indexOf(" ");
        return e.slice(n + 1, t)
    }, l.closeDownload = function() {
        l.downloadApp = !1, v++, i.setItem("download", v)
    };
    var D = window.navigator.platform;
    l.typePhone = "iPhone" == D || "iPad" == D || "MacIntel" == D ? "ios" : "android", setTimeout(function() {
        $("#input-1").rating({
            min: 0,
            max: 5,
            step: .1,
            stars: 5
        })
    }, 500), $("body").removeClass("hidden"), u.showTitlePage(), sendGA("pageview", "search")
}]), angular.module("mazii").controller("NewsController", ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$stateParams", "$location", "categoryServ", function(c, o, t, e, i, n, a, r, s, l, u) {
    var d = s.id;
    o.showVideo = !1, c.hasListHeader = !1;
    c.title = "Đọc báo";
    var m = [];
    localStorage.getItem("dataNew") && (m = localStorage.getItem("dataNew")), window.btnBack = !0, $(document).mouseover(function() {
        window.btnBack = !0
    }), $(document).mouseleave(function() {
        window.btnBack = !1
    }), o.$watch(function() {
        return location.hash
    }, function(e) {
        if (!window.btnBack) {
            var t = e.indexOf("id=");
            if (-1 != t) {
                var n = e.substr(t + 3, e.length);
                i.getDetailNews(n).then(function(e) {
                    o.currentNews = e, r.setItem("currentNews", e), o.showVideo = !1
                })
            }
        }
    }), c.$on("statusAddNew", function(e, t) {
        o.addNews = t
    }), o.$on("changeDetailNews", function(e, t) {
        i.getDetailNews(t.id).then(function(e) {
            o.currentNews = e, r.setItem("currentNews", e), o.showVideo = !1, -1 == g.indexOf(e._id) && (g.push(e._id), localStorage.setItem("news_read", JSON.stringify(g)), h(e)), l.search("id", e._id)
        }), setTimeout(function() {
            $("audio").mediaelementplayer()
        }, 500)
    }), o.$on("removeData", function() {
        m = [], localStorage.removeItem("dataNew")
    });
    var h = function(e) {
        var t = e.content.textmore.replace(/<rt>.*?<\/rt>/g, "");
        t = t.replace(/<.*?>/g, "");
        var n = e.content.textbody.replace(/<rt>.*?<\/rt>/g, "");
        n = (n = (n = n.replace(/<.*?>/g, "")).concat(n, t)).split("。"), "string" == typeof m && (m = JSON.parse(m));
        var a, i, r = {};
        if (e.def) {
            for (var o = 0; o < e.def.length; o++)
                for (var s = 0; s < n.length; s++)
                    if (-1 != n[s].indexOf(e.def[o].entity)) {
                        var l = u.getIdCategory(e.def[o].category);
                        if (null == l) continue;
                        a = l.id, i = l.vi_name, r = {
                            entity_id: e.def[o].id,
                            category_id: a,
                            text: e.def[o].entity,
                            example: n[s],
                            category: e.def[o].category,
                            category_vi_name: i
                        }, m.push(r);
                        break
                    } c.$broadcast("addNewData", m), localStorage.setItem("dataNew", JSON.stringify(m))
        }
    };
    o.playVideo = function() {
        o.showVideo = !0
    }, o.getNewsReadClass = function(e) {
        return -1 != g.indexOf(e) ? "news_read" : ""
    }, o.checkLink = function(e) {
        if (-1 != e.indexOf("http")) return e;
        for (var t = o.currentNews.link, n = 0, a = t.length - 1; 0 <= a; a--)
            if ("/" == t[a]) {
                n = a;
                break
            } return (t = t.substring(0, n + 1)) + e
    }, o.getVideo = function() {
        return o.isMobile() ? '<video class="movie-news-sm movie-news-md" controls>                     <source src="https://nhkmovs-i.akamaihd.net/i/news/' + o.currentNews.content.video + '/master.m3u8" type="video/mp4">                     Your browser does not support the video tag.                     </video>' : '<object type="application/x-shockwave-flash" data="https://www3.nhk.or.jp/news/player5.swf" class="movie-news-sm movie-news-md" id="news_image_div3" style="visibility: visible;">             <param name="allowScriptAccess" value="sameDomain">             <param name="allowFullScreen" value="true">             <param name="wmode" value="direct">             <param name="quality" value="high">             <param name="bgcolor" value="#000000">             <param name="flashvars" value="fms=rtmp://flv.nhk.or.jp/ondemand/flv/news/&amp;movie=' + o.currentNews.content.video + '"></object>'
    }, o.getAudio = function() {
        if (o.currentNews && o.currentNews.content.audio) {
            var e = o.currentNews.content.audio;
            return -1 != e.indexOf(".mp3") ? (-1 == e.indexOf("http://") && (e = "http://www3.nhk.or.jp/news/easy/" + e.replace(".mp3", "") + "/" + e), '<audio id="nolAudio_html5_api" width="100%" controls><source src="' + e + '" type="audio/mpeg"></audio>') : '<audio id="nolAudio_html5_api" width="100%" controls><source src="' + (e = "https://nhks-vh.akamaihd.net/i/news/easy/" + o.currentNews.content.audio + "/master.m3u8") + '" type="application/x-mpegURL"></audio>'
        }
    }, o.videoAvailable = function() {
        if ("undefined" != typeof device && navigator.connection.type == Connection.NONE) return !1;
        var e = o.currentNews.content.video;
        return null != e && "" != e
    }, o.audioAvailable = function() {
        if ("undefined" != typeof device && navigator.connection.type == Connection.NONE) return !1;
        var e = o.currentNews.content.audio;
        return null != e && "" != e
    }, o.imageAvailable = function() {
        if ("undefined" != typeof device && navigator.connection.type == Connection.NONE) return !1;
        var e = o.currentNews.content.image;
        return null != e && "" != e
    }, o.isMobile = function() {
        return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, i.getHeadNews().then(function(e) {
        o.lastestNews = e, c.hasListHeader = !0, r.setItem("list-news", e);
        var a = e[0].value.id;
        null != d && (a = d), i.getDetailNews(a).then(function(e) {
            o.currentNews = e, r.setItem("currentNews", e), l.search("id", a);
            var t = localStorage.getItem("dtTmp");
            if (t)
                for (var n = 0; n < t.length; n++) t[n].id == e._id && (t.push({
                    id: e._id
                }), localStorage.setItem("dtTmp", e._id), h(e));
            else localStorage.setItem("dtTmp", e._id), h(e)
        })
    });
    var g = JSON.parse(localStorage.getItem("news_read"));
    null == g && (g = []), $(document).on("click", "a.dicWin", function(e) {
        var t = "";
        if ("" != (t = (t = e.currentTarget.innerHTML.replace(/<rt>.*?<\/rt>/g, "")).replace(/<.*?>/g, ""))) {
            var n = $(e.currentTarget).attr("altid");
            if (null != n && "" != n) {
                n = parseInt(n);
                var a = null,
                    i = o.currentNews.def;
                if (null != i)
                    for (var r = 0; r < i.length; r++) i[r].id == n && (a = i[r]);
                null != a && a.entity != t && (t = a.entity), c.$broadcast("query", {
                    type: "word",
                    query: t,
                    aux: a
                })
            } else c.$broadcast("query", {
                type: "word",
                query: t
            })
        }
    }), o.translate = function() {
        o.text || (c.$broadcast("query", {
            type: "word",
            query: o.text
        }), $(".box-search").css("display", "none"))
    }, $(document).on("mousemove", function(e) {
        o.x = e.pageX, o.y = e.pageY
    });
    c.$on("changeShowFurigana", function(e) {
        ! function() {
            var e = r.getItem("showFurigana");
            null != e && 0 == e ? $("head").append('<style id="setting_css">rt{display: none;}</style>') : $("#setting_css").remove()
        }()
    }), o.TranslateNews = function(e) {
        t.go("translate_user", {
            type: e
        })
    }, o.statusFurigana = function() {
        var e = !r.getItem("showFurigana");
        r.setItem("showFurigana", e), o.$emit("changeSettingFurigana", e), null != e && 0 == e ? $("head").append('<style id="setting_css">rt{display: none;}</style>') : $("head").append('<style id="setting_css">rt{display: block;}</style>')
    }, setTimeout(function() {
        $("audio").mediaelementplayer()
    }, 500), o.$on("$destroy", function(e, t) {
        $(document).off("mouseover"), $(document).off("mouseleave")
    }), n.showTitlePage(), sendGA("pageview", "news")
}]), angular.module("mazii").controller("JLPTController", ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", "$stateParams", "$location", "$window", function(a, u, e, t, i, n, r, o, s, l, c, d) {
    initJlptCtrl = !0;
    var m = {
        word: 60,
        kanji: 100,
        grammar: 30
    };
    u.level = 5, u.checkFisrt = !1, u.type = "kanji", a.typeJLPT = "kanji", u.page = 0, u.length = 0, u.firstlength = 0, a.title = "JLPT", a.listJLPT = [], u.inforJlpt = o.getItem("inforJLPT");
    var h = l.type,
        g = l.level,
        p = l.page;
    if ("word" == h || "kanji" == h || "grammar" == h) {
        if (g) try {
            g = parseInt(g)
        } catch (e) {
            g = 5
        } else g = 5;
        if (p) try {
            p = parseInt(p)
        } catch (e) {
            p = 0
        } else p = 0;
        null == u.inforJlpt && (u.inforJlpt = {}), null != u.inforJlpt && (u.inforJlpt.type = h, u.inforJlpt.page = p, u.inforJlpt.level = g, u.inforJlpt.length = p * m[h], u.inforJlpt.firstlength = m[h])
    }
    null != u.inforJlpt && (u.level = u.inforJlpt.level, u.type = u.inforJlpt.type, u.page = u.inforJlpt.page, u.length = u.inforJlpt.length, u.firstlength = u.inforJlpt.firstlength), u.$on("$locationChangeSuccess", function(e, t, n, a, i) {
        var r = t.match(/type=(.+)&level=(.)/i);
        if (null != r && 3 == r.length) {
            var o = r[1],
                s = r[2];
            if ("word" == o || "kanji" == o || "grammar" == o) {
                try {
                    s = parseInt(s)
                } catch (e) {
                    s = 5
                }
                var l = t.match(/page=(.*)/i),
                    c = 0;
                if (null != l && 2 == l.length) try {
                    c = parseInt(l[1])
                } catch (e) {}
                o == u.type && s == u.level && c == u.page || (u.type = o, u.level = s, u.page = c, u.length = c * m[o], u.firstlength = m[o], u.query())
            }
        }
    }), u.selectType = function(e) {
        u.length = 0, u.type = e, u.page = 0, u.query()
    }, u.changeShowhanViet = function() {
        if (null == a.showhanViet) {
            var e = o.getItem("showhanViet");
            u.showhanViet = null == e || e
        } else u.showhanViet = a.showhanViet
    }, u.selectLevel = function(e) {
        u.length = 0, u.level = e, u.page = 0, u.query()
    }, u.getBeautyTitleGrammar = function(e) {
        return null == e ? null : e.split("=>")[0]
    }, u.getBeautyDescGrammar = function(e) {
        if (null == e) return e;
        if (null == e.value || null == e.value.usages || 0 == e.value.usages.length) return null;
        var t = e.value.usages[0].mean;
        if (null != t && (t = t.replace(":", "").replace("：", "")), null == (t = n.removeJapaneseChar(t)) || "" == t) try {
            t = e.value.title.split("=>")[1]
        } catch (e) {}
        return t
    };
    var f = !(u.query = function() {
            a.initFlashcard = !0, u.checkFisrt || null == !u.inforJlpt && (u.type = u.inforJlpt.type, u.level = u.inforJlpt.level, u.page = u.inforJlpt.page), "grammar" == u.type ? i.queryGrammarJLPT(u.level, u.page).then(function(e) {
                u.list = e.results, a.listJLPT = e.results, a.typeJLPT = "grammar", a.htmlReady()
            }) : "kanji" == u.type ? i.queryKanjiJLPT(u.level, u.page).then(function(e) {
                u.list = e.results, a.listJLPT = e.results, a.typeJLPT = "kanji", a.htmlReady()
            }) : s.get("db/jlpt/word" + u.level + ".json").success(function(e) {
                u.list = [];
                for (var t = 60 * u.page; t < 60 * u.page + 60; t++) null != e[t] && u.list.push(e[t]);
                a.listJLPT = u.list, a.typeJLPT = "word", a.htmlReady()
            }), u.checkFisrt = !0;
            var e = {
                type: u.type,
                level: u.level,
                page: u.page,
                length: u.length,
                firstlength: u.firstlength
            };
            o.setItem("inforJLPT", e), u.$applyAsync();
            var t = "/jlpt?type=" + u.type + "&level=" + u.level + "&page=" + u.page;
            c.url(t), c.replace();
            var n = c.absUrl();
            d.history.pushState(null, "Search", n),
                function() {
                    var e, t = "từ vựng";
                    "kanji" == u.type ? t = "hán tự" : "grammar" == u.type && (t = "ngữ pháp");
                    e = "Tổng hợp bộ " + t + " theo trình độ JLPT N" + u.level + " - Trang " + (u.page + 1) + " | Từ điển Nhật Việt Mazii", $("#site-title").html(e), $(".site-name").html(e), $(".site-title").attr("content", e), $(".site-desc").attr("content", "Bộ từ vựng, hán tự, ngữ pháp được tổng hợp và phân cấp theo trình độ JLPT từ N5 đến N1. Phần này là phần không thể thiếu để giúp các bạn ôn tập khi thi lấy chứng chỉ JLPT."), $("#site-url").attr("content", window.location.href), $("#site-keyword").attr("content", JLPT_PAGE_KEYWORDS)
                }()
        }),
        v = !1;
    u.getPreState = function() {
        return 0 == u.page ? (f = !1, "btn-disable") : (f = !0, "")
    }, u.getNextState = function() {
        return null == u.list ? (v = !0, "") : "kanji" == u.type && u.list.length < 100 ? (v = !1, "btn-disable") : "grammar" == u.type && u.list.length < 30 ? (v = !1, "btn-disable") : "word" == u.type && u.list.length < 60 ? (v = !1, "btn-disable") : (v = !0, "")
    }, u.getLinkPre = function() {
        var e = u.page;
        return 0 < e ? (e--, "/#!/jlpt?type=" + u.type + "&level=" + u.level + "&page=" + e) : ""
    }, u.getLinkNext = function() {
        return u.list.length < m[u.type] ? "" : "/#!/jlpt?type=" + u.type + "&level=" + u.level + "&page=" + (u.page + 1)
    }, u.prePage = function(e) {
        e.stopImmediatePropagation(), e.preventDefault(), 0 != f && (u.page--, u.page < 0 && (u.page = 0), "grammar" != u.type && "word" != u.type || (u.length = u.length - u.firstlength), u.query())
    }, u.nextPage = function(e) {
        e.stopImmediatePropagation(), e.preventDefault(), 0 != v && (u.page++, "grammar" != u.type && "word" != u.type || (u.firstlength = u.list.length, u.length += u.list.length), u.query())
    }, u.showModalFlashcard = function() {
        null != a.user ? ($("#modalFlashcard").modal("show"), a.$broadcast("modalFlashcard")) : $("#petition-login").modal("show")
    }, u.showKanji = function(e, t) {
        a.$broadcast("query", {
            type: "kanji",
            query: e
        }), t.stopImmediatePropagation(), t.preventDefault()
    }, u.showGrammar = function(e) {
        a.$broadcast("query", {
            type: "grammarDetail",
            query: e
        }), event.stopImmediatePropagation(), event.preventDefault()
    }, u.showWord = function(e, t) {
        a.$broadcast("query", {
            type: "word",
            query: e
        }), t.stopImmediatePropagation(), t.preventDefault()
    }, u.query(), u.changeShowhanViet(), u.$on("showhanViet", function(e) {
        u.changeShowhanViet()
    }), n.showTitlePage(), sendGA("pageview", "jlpt")
}]), angular.module("mazii").controller("NoteController", ["$rootScope", "$scope", "$state", "$timeout", "noteServ", "$stateParams", "$location", "dictUtilSer", "localstoreServ", function(n, a, e, t, i, r, o, s, l) {
    var c, u;
    a.category = i.getCategory(), a.state = !1, a.activeItem = null, a.loadDone = !1, n.title = "Từ của tôi", a.moreView = !1, a.loadReport = !0;

    function d() {
        null == n.user ? a.logined = !1 : a.logined = !0, a.loadDone = !0, a.category && 0 < a.category.length && setTimeout(function() {
            $(".note-item").removeClass("seleted-note"), $(".note-item-" + a.category[0].categoryId).addClass("seleted-note"), a.getNoteItem(a.category[0].categoryId)
        }, 200)
    }
    var m, h, g, p, f = 1,
        v = [],
        y = [];
    if (a.getNoteItem = function(e) {
        $(".note-item").removeClass("seleted-note"), $(".note-item-" + e).addClass("seleted-note"), n.$broadcast("getNoteItem", {
            cate: e
        })
    }, a.deleteCategory = function(e, t) {
        i.removeCategory(e, t)
    }, a.getTime = function(e) {
        return new Date(e).toDateString()
    }, a.getDeleteState = function() {
        return a.state ? "" : "hidden-note-delete"
    }, a.showEdit = function() {
        $(".category-delete").toggleClass("hidden-note-delete"), 0 == a.state ? a.state = !0 : a.state = !1
    }, a.goLogin = function() {
        l.setItem("stateLogin", {
            state: "note"
        })
    }, n.currentNoteRoute) {
        var w = new Date;
        u = w.getTime(), c = setInterval(function() {
            var e = new Date;
            6e3 < e.getTime() - u && clearInterval(), d(), null != n.user && clearInterval(c)
        }, 100)
    } else d();
    n.$on("load.category.success", function() {
        a.category = i.getCategory(), setTimeout(function() {
            $(".note-item").removeClass("seleted-note"), $(".note-item-" + a.category[0].categoryId).addClass("seleted-note")
        }, 200)
    });

    function _(e, t) {
        i.getListActionUser(e, t, function(e) {
            if (a.loadReport = !0, 200 == e.status && (m = e.data, p = m.total, m.word_like && 0 < m.word_like.length)) {
                for (var t = 0; t < m.word_like.length; t++) v.push(m.word_like[t]);
                (a.listLike = v).length < p ? a.moreView = !0 : a.moreView = !1
            }
        })
    }

    function b(e, t) {
        i.getListWordUser(e, t, function(e) {
            if (a.loadReport = !0, 200 == e.status && (h = e.data, g = h.total, h.word && 0 < h.word.length)) {
                for (var t = 0; t < h.word.length; t++) y.push(h.word[t]);
                y.length < g ? a.moreView = !0 : a.moreView = !1, a.listReport = y
            }
        })
    }
    a.showTab = "note", a.chooseTab = function(e) {
        switch (a.showTab = e, $(".item-select").removeClass("note-active"), $(".item-select.item-" + e).addClass("note-active"), f = 1, a.moreView = !1, a.loadReport = !1, e) {
            case "note":
                a.category && 0 < a.category.length && setTimeout(function() {
                    $(".note-item").removeClass("seleted-note"), $(".note-item-" + a.category[0].categoryId).addClass("seleted-note"), a.getNoteItem(a.category[0].categoryId)
                }, 100);
                break;
            case "report":
                h ? (a.loadReport = !0, a.listReport && a.listReport.length < g && (a.moreView = !0)) : b(12, f);
                break;
            case "like":
                m ? (a.loadReport = !0, a.listLike && a.listLike.length < p && (a.moreView = !0)) : _(12, f)
        }
    }, a.showMore = function(e) {
        f++, "like" == e ? _(12, f) : "report" == e && b(12, f)
    }, a.search = function(e, t) {
        n.$broadcast("query", {
            type: e,
            query: t
        })
    }, s.showTitlePage(), sendGA("pageview", "myword")
}]), angular.module("mazii").controller("HelpController", ["$rootScope", "dictUtilSer", function(e, t) {
    e.title = "Trợ giúp", "undefined" == typeof FB || FB.XFBML.parse(), $("#forward-to-chat").click(function(e) {
        document.getElementById("facebook-chat").scrollIntoView(), e.preventDefault()
    }), t.showTitlePage(), sendGA("pageview", "help")
}]), angular.module("mazii").controller("HeaderController", ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "userServ", "localstoreServ", "exampleServer", "cookieServ", "encryptionServ", "$window", "communityServer", function(t, n, a, i, e, r, o, s, l, c, u, d, m, h) {
    var g, p, f = {};
    n.showChat = !1, n.showNotify = !1, n.newNoti = 0, n.loadChat = function() {
        n.showChat = !0, $("#chat-module").removeClass("hide-chat"), setTimeout(function() {
            ! function() {
                var e = document,
                    t = e.getElementById("tlkio"),
                    n = t.getAttribute("data-env") || "production",
                    a = t.getAttribute("data-channel"),
                    i = t.getAttribute("data-theme"),
                    r = t.getAttribute("data-custom-css"),
                    o = t.getAttribute("data-nickname"),
                    s = e.createElement("iframe"),
                    l = "//embed.tlk.io/" + a,
                    c = [];
                "dev" == n && (l = "http://embed.lvh.me:3000/" + a), r && r.length && c.push("custom_css_path=" + r), o && o.length && c.push("nickname=" + o), i && i.length && c.push("theme=" + i), c.length && (l += "?" + c.join("&")), s.setAttribute("src", l), s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("frameborder", "0"), s.setAttribute("style", "margin-bottom: -8px;");
                var u = t.getAttribute("style");
                t.setAttribute("style", "overflow: auto; -webkit-overflow-scrolling: touch;" + u), t.textContent = "", t.appendChild(s)
            }()
        }, 200)
    }, n.hideChat = function() {
        n.showChat = !1, $("#chat-module").addClass("hide-chat")
    }, n.showMenuLeft = function() {
        m.scroll(0, 0), $(".menu-left").addClass("open-menu-left"), $(".cover").css("display", "block")
    }, t.$on("$stateChangeSuccess", function(e, t, n, a, i) {
        g = t.name
    }), n.goToState = function(e) {
        r.closePanel()
    }, n.closePanel = function() {
        r.closePanel()
    }, n.showHistory = function() {
        $(".history-panel").addClass("open-history-panel"), $(".cover").css("display", "block"), $("body").css("overflow", "hidden")
    }, n.showSetting = function() {
        $(".setting-panel").addClass("open-setting-panel"), $(".cover").css("display", "block"), $("body").css("overflow", "hidden")
    }, t.logout = function() {
        s.logout(), r.showInformationUser(), a.go("search"), location.reload()
    }, n.showNotiVideo = function() {
        sendGA("feature", "learn_video")
    }, t.convertEmail = function(e) {
        return 20 < e.length ? e.substring(0, e.length - 8) + "..." : e
    }, t.logoutAll = function() {
        s.logoutAll().then(function(e) {
            200 == e.status ? (s.logout(), r.showInformationUser(), i(function() {
                a.go("search")
            }, 2e3)) : (t.alert.notify = "Có lỗi trong quá trình đăng xuất", $(".notify-current").fadeIn(200), i(function() {
                $(".notify-current").fadeOut(200)
            }, 2e3))
        })
    }, t.resetPasswordClick = function(e) {
        s.resetPassword(e).then(function(e) {
            304 == e.status ? t.alert.notify = "Tài khoản email này không tồn tại." : 302 == e.status ? ($("#resetPassword").modal("hide"), t.alert.notify = "Có lỗi trong quá trình xử lý.") : 306 == e.status ? t.alert.notify = "Tài khoản này đã được yêu cầu cấp lại mật khẩu. Vui lòng kiểm tra lại email của bạn." : ($("#resetPassword").modal("hide"), t.alert.notify = "Hãy kiểm tra tài khoản email của bạn để cấp lại mật khẩu."), $(".notify-current").fadeIn(200), i(function() {
                $(".notify-current").fadeOut(200)
            }, 2e3)
        })
    }, n.goLogin = function() {
        r.closePanel(), $("#petition-login").modal("hide"), l.setItem("stateLogin", {
            state: "search"
        })
    }, n.goInforAccount = function() {
        c.checkProfile(p, function(e) {
            var t = e.data.result;
            "center" == t ? a.go("profile-center") : "user" == t && a.go("profile")
        })
    };

    function v() {
        h.getNotify(function(e) {
            200 == e.status && (f = e.data.results, n.listNotify = f, n.newNoti = e.data.new), setTimeout(function() {
                $(".box-bell").css("display", "block")
            }, 500)
        })
    }
    n.showNotiCommunity = function(e) {
        n.showNotify = !n.showNotify
    }, n.statusNotify = function(e) {
        return e.view ? "color-read" : "no-read"
    }, n.goDetailNotify = function(e) {
        $(".box-notify").css("display", "none"), "community" != g && a.go("community"), 0 == e.view && h.viewNotify(e.post_or_user_id, function(e) {
            200 == e.status && v()
        }), t.$broadcast("goDetailNotify", e.post_or_user_id)
    }, n.goToProfile = function() {
        $(".box-notify").css("display", "none"), a.go("profile")
    }, $(document).mouseup(function(e) {
        var t = $(".box-notify");
        t.is(e.target) || 0 !== t.has(e.target).length || (n.showNotify = !1, r.safeApply(n))
    });
    var y = {
        epochs: [{
            key: "year",
            title: "năm"
        }, {
            key: "month",
            title: "tháng"
        }, {
            key: "day",
            title: "ngày"
        }, {
            key: "hour",
            title: "giờ"
        }, {
            key: "minute",
            title: "phút"
        }],
        year: 31536e3,
        month: 2592e3,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    n.timeAgo = function(e) {
        if (e) {
            var t = e.split(" ")[0].split("-"),
                n = e.split(" ")[1].split(":"),
                a = new Date(t[0], t[1] - 1, t[2], n[0], n[1], n[2]),
                i = function(e) {
                    for (var t, n, a, i = 0; i < y.epochs.length; i++)
                        if (t = y.epochs[i].key, a = y.epochs[i].title, 1 <= (n = Math.floor(e / y[t]))) return {
                            interval: n,
                            timeVi: a
                        }
                }(Math.floor((new Date - new Date(a)) / 1e3));
            return i ? i.interval + " " + i.timeVi : "vừa xong"
        }
    };

    function w() {
        s.init().then(function(e) {
            null != e && 200 == e.status ? t.user = e.result : t.user = null, r.showInformationUser()
        })
    }
    t.$on("login.success", function() {
        w(), p = l.getItem("idUser"), v()
    }), t.$on("updateUser", function() {
        w()
    })
}]), angular.module("mazii").controller("WriteController", ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "$stateParams", "$location", function(e, a, t, n, i, r, o, s, l) {
    a.form = {}, a.showDrawKanji = !1, e.title = "Tập viết";
    a.searchKanji = function() {
        ! function() {
            var n = a.form.kanji;
            i.search("kanji", n).then(function(e) {
                if (a.currentKanjiSelected = 0, 200 == e.status) {
                    if (r.isJapanese(n)) {
                        var t = r.getKanjiChara(n);
                        a.kanjis = r.sortHVDataByKeyWord(t, e.results), a.data = a.kanjis[0]
                    } else a.kanjis = e.results, a.data = a.kanjis[0];
                    a.showDrawKanji = !0, a.showResultNull = !1
                } else a.showResultNull = !0
            })
        }()
    }, r.showTitlePage(), sendGA("pageview", "draw")
}]), angular.module("mazii").controller("AboutController", ["$rootScope", "dictUtilSer", function(e, t) {
    e.title = "Về Mazii", t.showTitlePage(), sendGA("pageview", "about")
}]);
var app, SERVER_ADRESS = "http://crazyjapanese.com:8989";
angular.module("mazii").controller("ChatController", ["$rootScope", "$scope", "$state", "localstoreServ", "authServ", "maziiServ", "dictUtilSer", function(t, o, e, n, a, i, s) {
    o.tab_1 = "menu-active", o.tabActive = 1, o.user = t.user;
    var r = t.user;
    o.listMessage = [], o.listUser = [], o.listmessageReceive = [], o.listMessagePrivate = [], o.countMessage = 0, o.newMessage = !1, o.formChat = {}, o.loadDone = !1, o.tabScreen = 0;
    o.titleBar = "Nhóm chung";

    function l() {
        d.emit("get-list-message-private-in-public", r), d.emit("get-list-data")
    }

    function c() {
        $(".chat-public .list-message").animate({
            scrollTop: 1e4
        }, 500)
    }

    function u() {
        r = t.user, o.user = t.user, void 0 === r || null == r || "" == r ? o.showLogin = !0 : (o.showLogin = !1, d.emit("reset-socket-user", r), l())
    }
    var d = io.connect(SERVER_ADRESS),
        m = [],
        h = 0,
        g = 0,
        p = 0;
    null != t.user ? (u(), o.loadDone = !0) : (o.loadDone = !0, o.showLogin = !1), o.changeTab = function(e) {
        1 == (o.tabActive = e) ? (o.tab_1 = "menu-active", o.tab_2 = o.tab_3 = "", o.tabScreen = 0, $(".main-chat .list-message li.list-group-item").removeClass("group-jlpt-active"), $(".main-chat .list-message .group-0" + e).addClass("group-jlpt-active"), o.titleBar = "Nhóm chung") : 2 == e ? (o.tab_2 = "menu-active", o.tab_1 = o.tab_3 = "", o.titleBar = "Danh sách tin nhắn", o.newMessage = !1) : (o.tab_3 = "menu-active", o.tab_2 = o.tab_1 = "", o.titleBar = "Danh sách người dùng", o.tabScreen = 7, $(".chat-list-user").scroll(function() {
            var e = $(".chat-list-user").scrollTop();
            0 < e && e < 20 && (++p, d.emit("load-more-user", p))
        }))
    }, o.changeScreen = function(e) {
        switch (o.tabScreen = e, h = 0, $(".main-chat .list-message li.list-group-item").removeClass("group-jlpt-active"), $(".main-chat .list-message .group-" + e).addClass("group-jlpt-active"), d.emit("get-list-message-jltp", e), e) {
            case 0:
                o.titleBar = "Nhóm chung";
                break;
            default:
                o.titleBar = "Nhóm nhóm JLPT " + e
        }
    }, o.loginFacebook = function() {
        a.loginFacebook().then(function(e) {
            null != e && d.emit("user-join-public", e)
        })
    }, o.logoutFacebook = function() {
        a.logoutFacebook(), r = o.user = t.user = null, u(), f(), s.safeApply(o)
    };
    var f = function() {
        o.tab_1 = "menu-active", o.tabActive = 1, o.listMessage = [], o.listUser = [], o.listmessageReceive = [], o.listMessagePrivate = [], o.countMessage = 0, o.newMessage = !1;
        o.tabScreen = 0
    };
    d.on("reset-socket-success", function(e) {
        r = e, t.user = r, o.user = r
    }), d.on("login-success", function(e) {
        t.user = e, o.user = e, r = e, l(), o.showLogin = !1, s.safeApply(o)
    }), d.on("get-list-message", function(e) {
        var t = e.length;
        o.listMessage = [];
        for (var n = 0; n < t; n++) {
            var a = e[n].index;
            if (1 < s.renderHtmlMessage(e[n]).length) var i = s.renderHtmlMessage(e[n]),
                r = {
                    _id: e[n]._id,
                    username: e[n].username,
                    index: a,
                    message: i,
                    date_send: e[n].date_send,
                    userId: e[n].userId,
                    newLine: !0
                };
            else r = {
                _id: e[n]._id,
                username: e[n].username,
                message: e[n].content,
                index: a,
                date_send: e[n].date_send,
                userId: e[n].userId,
                newLine: !1
            };
            o.listMessage.unshift(r)
        }
        s.safeApply(o), 0 != a && $("#list-message-" + a).scroll(function() {
            var e = $("#list-message-" + a).scrollTop();
            0 < e && e < 20 && (++h, d.emit("load-more-message-jlpt", {
                index: a,
                indexMessage: h
            }))
        }), c()
    }), d.on("get-list-user", function(e) {
        var t = e.length;
        o.listUser = [];
        for (var n = 0; n < t; n++) {
            var a = e[n];
            null != r && a.fbId == r.fbId || o.listUser.push(a)
        }
        s.safeApply(o)
    }), d.on("add-user-public", function(e) {
        null != r && e._id == r._id || (o.listUser.push(e), s.safeApply(o))
    }), d.on("receive-message-public", function(e) {
        if (1 < s.renderHtmlMessage(e).length) {
            var t = s.renderHtmlMessage(e),
                n = {
                    _id: e._id,
                    username: e.username,
                    index: e.index,
                    message: t,
                    date_send: e.date_send,
                    userId: e.userId,
                    newLine: !0
                };
            o.listMessage.push(n)
        } else {
            n = {
                _id: e._id,
                username: e.username,
                message: e.content,
                index: e.index,
                date_send: e.date_send,
                userId: e.userId,
                newLine: !1
            };
            o.listMessage.push(n)
        }
        c(), s.safeApply(o)
    }), o.formChat.sendChat = function(e) {
        v(e)
    }, o.formChat.enterChat = function(e, t) {
        13 == e.keyCode && (e.shiftKey || (v(t), e.preventDefault()))
    };
    var v = function(e) {
        var t;
        if (null != (t = (t = $("#enter-chat-message-" + e).val()).trim()) && "" != t)
            if (null == r || "" == r) o.loginFacebook();
            else {
                var n = {
                    user: o.user,
                    message: t,
                    index: e
                };
                d.emit("send-message-public", n), $("#enter-chat-message-" + e).val("")
            }
    };
    d.on("receive-list-message-private-in-public", function(e) {
        if (0 == (n = o.listmessageReceive.length)) o.listmessageReceive.push(e), m.push(e.your_id);
        else
            for (var t = 0; t < n; t++)
                if (-1 == m.indexOf(e.your_id)) m.push(e.your_id), o.listmessageReceive.push(e), o.newMessage = !0;
                else {
                    for (var n = o.listmessageReceive.length, a = 0, i = 0; i < n; i++) {
                        o.listmessageReceive[t].your_id == e.your_id && (o.listmessageReceive[i] = e, a++)
                    }
                    0 == a && (0 == e.status && 1 == e.flag && (o.newMessage = !0), o.listmessageReceive.push(e))
                } for (t = 0; t < o.listmessageReceive.length; t++)(o.newMessage = 0) == o.listmessageReceive[t].status && o.newMessage;
        s.safeApply(o)
    }), o.redirectChatPrivate = function(e) {
        o.userReceive = {
            _id: e._id,
            username: e.username
        }, o.titleBar = "Chat với " + e.username, o.newMessage = !1, o.tabScreen = 6;
        o.user, o.userReceive;
        d.emit("contruct-chat-private", {
            userReceive: o.userReceive,
            userSend: o.user
        }), d.on("read-message-private", {
            userReceive: o.userReceive,
            userSend: o.user
        }), g = 0, s.safeApply(o)
    }, o.redirectChatPrivatetoDetailUser = function(e) {
        if (e.userId != o.user._id) {
            var t = {
                _id: e.userId,
                username: e.username
            };
            o.redirectChatPrivate(t)
        }
    }, o.redirectChatPrivatetoListMessage = function(e) {
        var t = {
            _id: e.your_id,
            username: e.your_username
        };
        o.redirectChatPrivate(t), 0 == e.status && (o.newMessage = !1)
    }, o.formChat.sendChatPrivate = function() {
        y()
    }, o.formChat.enterChatPrivate = function(e) {
        13 == e.keyCode && (e.shiftKey || (y(), e.preventDefault()))
    };
    var y = function() {
        var e = $("#enter-chat-message-6").val();
        if (null != (e = e.trim()) && "" != e) {
            var t = {
                userSend: o.user,
                userReceive: o.userReceive,
                message: e
            };
            d.emit("send-message-private", t), $("#enter-chat-message-6").val().replace(/\n/g, ""), $("#enter-chat-message-6").val("")
        }
    };
    d.on("get-more-message", function(e) {
        if (null != e && 0 != e.length) {
            $(".list-message-0").scrollTop(50);
            for (var t = e.length, n = 0; n < t; n++) {
                e[n];
                if (1 < s.renderHtmlMessage(e[n]).length) var a = s.renderHtmlMessage(e[n]),
                    i = {
                        _id: e[n]._id,
                        username: e[n].username,
                        index: e[n].index,
                        message: a,
                        date_send: e[n].date_send,
                        userId: e[n].userId,
                        newLine: !0
                    };
                else i = {
                    _id: e[n]._id,
                    username: e[n].username,
                    message: e[n].content,
                    index: e[n].index,
                    date_send: e[n].date_send,
                    userId: e[n].userId,
                    newLine: !1
                };
                o.listMessage.unshift(i)
            }
            s.safeApply(o)
        }
    }), d.on("get-more-user", function(e) {
        if (null != e && 0 != e.length) {
            for (var t = e.length, n = 0; n < t; n++) o.listUser.unshift(e[n]);
            s.safeApply(o)
        }
    }), d.on("receive-load-more-message-private", function(e) {
        if (0 != e.length) {
            $(".list-message-private").animate({
                scrollTop: 100
            }, 500);
            for (var t = e.length, n = 0; n < t; n++) {
                var a = e[n];
                o.listMessagePrivate.unshift(a)
            }
            s.safeApply(o)
        }
    }), d.on("receive-message-pravite", function(e) {
        1 < s.renderHtmlMessagePrivate(e).length ? (e.newLine = !0, e.message = s.renderHtmlMessagePrivate(e)) : e.newLine = !1, o.listMessagePrivate.push(e), $(".list-message-private").animate({
            scrollTop: 1e4
        }, 500);
        for (var t = o.listmessageReceive.length, n = 0, a = 0; a < t; a++) {
            o.listmessageReceive[a].your_username == e.your_username && (o.listmessageReceive[a] = e, n++)
        }
        0 == n && o.listmessageReceive.push(e), 0 == e.status && 1 == e.flag && (o.newMessage = !0), s.safeApply(o)
    }), d.on("receive-list-chat-private", function(e) {
        e.reverse(), o.listMessagePrivate = e, s.safeApply(o), $(".list-message-private").animate({
            scrollTop: 1e4
        }, 500), $("#list-message-6").scroll(function() {
            var e = $("#list-message-6").scrollTop();
            0 < e && e < 20 && (++g, d.emit("load-more-message-private", {
                userReceive: o.userReceive,
                userSend: o.user,
                index: g
            }))
        })
    }), o.$on("loadFBDone", function() {
        u(), o.loadDone = !0, s.safeApply(o)
    }), setTimeout(function() {
        $("#list-message-0").scroll(function() {
            var e = $("#list-message-0").scrollTop();
            0 < e && e < 20 && (++h, d.emit("load-more-message", h))
        })
    }, 2e3), o.showDetailUser = function(e) {
        $(".detail-user-" + e).slideDown(100)
    }, $("*").click(function(e) {
        $(e.target);
        $(e.target).is(".avatar") || $(".detail-user").slideUp(100)
    }), o.translateMessage = function(e, n) {
        "object" == typeof e && (e = (e = e.toString()).replace(/,/g, " "));
        var t = $(".text-" + n + " > .trans");
        0 == t.length && null != !t && (s.isJapanese(e) ? i.googleTranslate(e, "ja", "vi").then(function(e) {
            var t = e.sentences[0].trans;
            t = '<p class="trans">' + t + "</p>", $(".text-" + n).append(t)
        }) : i.googleTranslate(e, "vi", "ja").then(function(e) {
            var t = e.sentences[0].trans;
            t = '<p class="trans">' + t + "</p>", $(".text-" + n).append(t)
        }))
    }, sendGA("pageview", "chat")
}]), angular.module("mazii").controller("TermController", ["$rootScope", function(e) {
    e.title = "Điều khoản sử dụng", sendGA("pageview", "term")
}]), angular.module("mazii").controller("SentenceController", ["$rootScope", "$scope", "$state", "$timeout", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", function(e, o, t, n, a, i, r, s, l) {
    var c, u = "ja",
        d = "vi",
        m = [];
    o.placeholderJa = "こんにちは", o.placeholderVi = "Xin chào các bạn", o.phonetic = "Minasan, kon'nichiwa", e.title = "Dịch", o.langFrom = u, o.changeLanguage = function(e) {
        $(".btn-choice-sentence").removeClass("active-language"), 0 == e ? ($(".btn-javi").addClass("active-language"), u = "ja", d = "vi", o.placeholderJa = "こんにちは", o.placeholderVi = "Xin chào các bạn", o.langFrom = "ja") : ($(".btn-vija").addClass("active-language"), u = "vi", d = "ja", o.placeholderVi = "こんにちは", o.placeholderJa = "Xin chào các bạn", o.langFrom = "vi")
    }, o.translateGoogle = function() {
        var e = $("#input-hide").html($("#input-sentence").val().replace(/\n/g, "<br/>"))[0].innerHTML;
        "" != e && null != e && (m = [], o.meanSentence = "", console.log(e), a.cloudTranslate(e, u, d).then(function(e) {
            o.to = "", c = e.data.translations, console.log(c), o.text = "";
            for (var t = 0; t < c.length; t++) o.to += c[t].translatedText;
            "vi" == u ? (o.phonetic = "", a.tokenizer(o.to).then(function(e) {
                if (o.transCoppy = e.input, e && e.tokens && 0 < e.tokens.length) {
                    for (var t = e.tokens.length, n = ["<", ">", "><"], a = 0; a < t; a++) {
                        for (var i = e.tokens[a], r = 0; r < n.length; r++) i.surface == n[r] ? i.surface = "" : "br" == i.surface && (i.surface = "<br/>");
                        m[a] = o.getTokenFurigana(e.tokens[a])
                    }
                    console.log("arr"), console.log(m), o.arrFurigana = m, setTimeout(function() {
                        $(".sentence-screen .box-result-trans:has(br)").addClass("custom-br")
                    }, 10)
                }
            })) : (o.arrFurigana = "", o.meanSentence = o.to, o.transCoppy = function(e) {
                var t = document.createElement("div");
                return t.innerHTML = e, t.textContent || t.innerText || ""
            }(o.to), o.phonetic = "")
        }))
    }, o.translate = function() {
        "" != o.text && (e.$broadcast("query", {
            type: "word",
            query: o.text,
            tag: "quick-search"
        }), $(".box-search").css("display", "none"))
    }, o.delete = function() {
        "" != o.from && null != o.from && (o.from = "", o.to = "", o.phonetic = "", o.arrFurigana = "", o.meanSentence = "", o.transCoppy = "", m = [])
    }, o.getTokenFurigana = function(e) {
        var t = e.surface;
        if (i.isKanji(t)) {
            var n = wanakana.toHiragana(e.reading);
            return null != n ? "<ruby><rb>" + t + "</rb><rt>" + n + "</rt></ruby>" : t
        }
        return t
    }, $(document).on("mousemove", function(e) {
        o.x = e.pageX, o.y = e.pageY
    }), $("#site-title").html("Dịch Việt Nhật - Nhật Việt Mazii"), $(".site-name").html("Dịch Việt Nhật - Nhật Việt Mazii"), $(".site-title").attr("content", "Dịch Việt Nhật - Nhật Việt Mazii"), $("#site-url").attr("content", window.location.href), $("#site-keyword").attr("content", TRANSLATE_PAGE_KEYWORDS), e.htmlReady(), i.showTitlePage(), sendGA("pageview", "sentence")
}]), angular.module("mazii").controller("LoginController", ["$rootScope", "$scope", "$state", "userServ", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", "$timeout", "cookieServ", "encryptionServ", "exampleServer", function(a, i, r, o, e, s, t, l, n, c, u, d, m) {
    var h;
    i.title = "Đăng nhập";
    var g = 0;
    i.loadDone = !1;
    i.notify = "", i.isLogin = !1, i.login = function(e, t) {
        $(".btn-login").addClass("button-disabled"), o.login(e, t).then(function(e) {
            $(".btn-login").removeClass("button-disabled"), p(e), s.showInformationUser()
        })
    };
    var p = function(e) {
        if (302 == e.status) i.isLogin = !0, i.notify = "Tài khoản chưa được kích hoạt";
        else if (304 == e.status) i.isLogin = !0, i.notify = "Tài khoản hoặc mật khẩu không đúng";
        else {
            if (a.user = e.result, i.isLogin = !1, a.alert.notify = "Đăng nhập thành công", $(".notify-current").fadeIn(200), 200 == e.status) {
                var t = e.result.userId;
                l.setItem("idUser", t), l.setItem("inforUser", e.result), setTimeout(function() {
                    o.init().then(function(e) {
                        200 == e.status && (!e.result.profile || e.result.profile && 0 == e.result.profile.info) && (g = 1, window.location.href = "#!/profile?edit")
                    })
                }, 1e3), 0 == g && c(function() {
                    (h = l.getItem("stateLogin")) ? "community" == h.state && h.param1 ? window.location.href = "#!/community?" + h.param1 : h.param1 && !h.param2 ? r.go(h.state, {
                        id: h.param1
                    }) : h.param2 ? r.go(h.state, {
                        id: h.param1,
                        name: h.param2
                    }) : r.go(h.state): r.go("search")
                }, 1e3), a.user && trackUser(a.user.userId)
            }
            var n = e.result.tokenId;
            n = d.encode(n), u.setCookie("tokenId", n), o.initGetRateMean().then(function(e) {
                l.setItem("rateMean", e)
            }), a.$broadcast("login.success")
        }
    };
    i.loginWith = function(n) {
        if ("facebook" == n) FB.login(function(e) {
            "connected" === e.status && o.loginWidth(e.authResponse.accessToken, n).then(function(e) {
                p(e), s.showInformationUser()
            })
        }, {
            scope: "public_profile,email"
        });
        else if ("google" == n) {
            if (null == f) return;
            f.signIn().then(function(e) {
                var t = e.Zi.access_token;
                t && o.loginWidth(t, n).then(function(e) {
                    p(e), s.showInformationUser()
                })
            })
        }
    }, i.resetPassword = function() {
        $("#resetPassword").modal("show")
    }, i.checkChar = function(e) {
        var t = ["'", "#", " "];
        if (null != e)
            for (var n = e.length, a = 0; a < n; a++)
                if (-1 != t.indexOf(e[a])) return !1;
        return !0
    };
    var f = null;
    c(function() {
        l.getItem("inforUser") ? r.go("search") : i.loadDone = !0
    }, 200), c(function() {
        gapi.load("auth2", function() {
            f = gapi.auth2.init({
                client_id: "1018328292119-dj2muil1f9dn4ehs56vml3366haol4ks.apps.googleusercontent.com",
                cookiepolicy: "single_host_origin"
            })
        })
    }, 1e3), sendGA("pageview", "login")
}]), angular.module("mazii").controller("RegisterController", ["$rootScope", "$scope", "$state", "userServ", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", "$timeout", "encryptionServ", "cookieServ", function(a, i, e, r, t, o, n, s, l, c, u, d) {
    i.title = "Đăng ký", a.registerSuccess = !1, i.isPasswordEqual = function(e, t) {
        return e == t
    }, i.register = function(e, t, n) {
        $(".btn-register").addClass("button-disabled"), t == n && r.register(e, t).then(function(e) {
            $(".btn-register").removeClass("button-disabled"), 304 == e.status ? a.alert.notify = "Tài khoản email đã được đăng ký" : 302 == e.status ? a.alert.notify = "Có lỗi trong quá trình đăng ký" : 200 == e.status && (a.registerSuccess = !0), 200 != e.status && ($(".notify-current").fadeIn(200), c(function() {
                $(".notify-current").fadeOut(200)
            }, 2e3))
        })
    }, i.loginWith = function(n) {
        if ("facebook" == n) FB.login(function(e) {
            "connected" === e.status && r.loginWidth(e.authResponse.accessToken, n).then(function(e) {
                m(e), o.showInformationUser()
            })
        }, {
            scope: "public_profile,email"
        });
        else if ("google" == n) {
            if (null == h) return;
            h.signIn().then(function(e) {
                var t = e.Zi.access_token;
                t && r.loginWidth(t, n).then(function(e) {
                    m(e), o.showInformationUser()
                })
            })
        }
    };
    var m = function(e) {
        if (302 == e.status) i.isLogin = !0, i.notify = "Tài khoản chưa được kích hoạt";
        else if (304 == e.status) i.isLogin = !0, i.notify = "Tài khoản hoặc mật khẩu không đúng";
        else {
            if (a.user = e.result, i.isLogin = !1, a.alert.notify = "Đăng nhập thành công", $(".notify-current").fadeIn(200), 200 == e.status) {
                var t = e.result.userId;
                s.setItem("idUser", t), s.setItem("inforUser", e.result), c(function() {
                    window.location.href = "#!/profile?edit"
                }, 1e3)
            }
            var n = e.result.tokenId;
            n = u.encode(n), d.setCookie("tokenId", n), r.initGetRateMean().then(function(e) {
                s.setItem("rateMean", e)
            }), a.$broadcast("login.success")
        }
    };
    i.checkChar = function(e) {
        var t = ["'", "#", " "];
        if (null != e)
            for (var n = e.length, a = 0; a < n; a++)
                if (-1 != t.indexOf(e[a])) return !1;
        return !0
    };
    var h = null;
    c(function() {
        gapi.load("auth2", function() {
            h = gapi.auth2.init({
                client_id: "1018328292119-dj2muil1f9dn4ehs56vml3366haol4ks.apps.googleusercontent.com",
                cookiepolicy: "single_host_origin"
            })
        })
    }, 1e3), sendGA("pageview", "register")
}]), angular.module("mazii").controller("ProfileController", ["$rootScope", "$filter", "$scope", "$state", "userServ", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", "$timeout", "cookieServ", "encryptionServ", "exampleServer", function(r, e, o, t, a, n, i, s, l, c, u, d, m, h) {
    var g, p;
    o.title = "Thông tin", o.updateUsername = !0, o.showAlert = !1, o.hasEdit = !1, o.viewMore = !0, o.noneData = !1, o.loadDone = !1, o.inforUser = {}, o.editNameUser = !1, o.selectDate = {}, o.selectDateCard = {}, o.showGuardian = !1;
    var f, v, y = {},
        w = !1,
        _ = [],
        b = [],
        k = [],
        S = [],
        C = (new Date).getFullYear(); - 1 != window.location.href.indexOf("edit") && (o.hasEdit = !0), o.privateUser = {
        birthday: "1",
        sex: "1",
        facebook: "1",
        email: "1",
        phone: "1",
        address: "1",
        job: "1",
        introduction: "1",
        card_id: "2",
        card_address: "2",
        card_date: "2",
        guardian: "2",
        guardian_card: "2"
    };
    var T = d.getCookie("tokenId");
    T = m.decode(T);
    var I = l.getItem("idUser");
    o.changeUser = {};
    var x = l.getItem("inforUser");
    x ? o.username = x.username : t.go("login"), r.$on("changeImageOk", function() {
        j()
    });
    var j = function() {
        f = Math.floor(100 * Math.random()), o.loadDone = !1;
        for (var e = 1; e < 32; e++) _.push(e);
        o.dayOfUser = _;
        for (e = 1; e < 13; e++) b.push(e);
        o.monthOfUser = b;
        for (e = 2030; 1920 < e; e--) k.push(e);
        o.yearOfUser = k, o.selectDate = {
            year: 2018,
            month: 1,
            day: 1
        }, o.selectDateCard = {
            year: 2018,
            month: 1,
            day: 1
        };
        h.getProfile("user", I, function(e) {
            if (304 == e.data.status && (o.noneData = !0), 200 == e.data.status)
                if (o.loadDone = !0, o.noneData = !1, e.data.result.profile) {
                    o.privateUser = {};
                    var t = e.data.result.total;
                    o.inforUser = t, o.publicUser = e.data.result.public, t && ("" != o.selectDate && (o.selectDate.year = parseInt(t.birthday.slice(0, 4)), o.selectDate.month = parseInt(t.birthday.slice(5, 7)), o.selectDate.day = parseInt(t.birthday.slice(8, 10))), "" != o.selectDateCard && t.card_date && (o.selectDateCard.year = parseInt(t.card_date.slice(0, 4)), o.selectDateCard.month = parseInt(t.card_date.slice(5, 7)), o.selectDateCard.day = parseInt(t.card_date.slice(8, 10))), $.each(t, function(e, t) {
                        o.privateUser[e] = "2"
                    }), $.each(o.publicUser, function(e, t) {
                        o.privateUser[e] = "1"
                    })), "" == t.name && "" == t.address && "0000-00-00" == t.birthday && "" == t.email && "" == t.facebook && "" == t.introduction && "" == t.phone && "" == t.job && "0" == t.sex ? o.noneData = !0 : o.noneData = !1
                } else o.noneData = !0
        })
    };
    o.editName = function() {
        o.editNameUser = !0
    }, o.saveName = function(t) {
        x && a.changeUsername(x.email, t).then(function(e) {
            console.log(e), 200 == e.status && (r.user = e.result, o.username = t, o.editNameUser = !1, l.setItem("inforUser", e.result))
        })
    }, o.showInforUser = !0, o.showActUser = !1, o.showSecurity = !1, o.showTab = function(e) {
        switch (e) {
            case "inforUser":
                o.showInforUser = !0, o.showActUser = !1, o.showSecurity = !1, $(".profile-center .select").removeClass("active"), $(".profile-center .tab1").addClass("active");
                break;
            case "actUser":
                o.showInforUser = !1, o.showActUser = !0, o.showSecurity = !1, P(1, 10), $(".profile-center .select").removeClass("active"), $(".profile-center .tab2").addClass("active");
                break;
            case "security":
                o.showInforUser = !1, o.showActUser = !1, o.showSecurity = !0, $(".profile-center .select").removeClass("active"), $(".profile-center .tab3").addClass("active")
        }
    };
    var P = function(e, t) {
        h.getHistoryAction(I, e, t, function(e) {
            200 == e.data.status && (o.listHistory = e.data.result)
        })
    };
    o.moreHistory = function() {
        o.viewMore = !1, P(1, 20)
    }, o.directToReport = function(e, t) {
        t.stopImmediatePropagation(), t.preventDefault();
        var n = {
            query: e,
            type: "word",
            tag: "report-mean"
        };
        r.$broadcast("query", n)
    }, o.detailTrans = function(e) {
        o.dataDetail = e, r.$broadcast("detailTrans", e)
    }, o.saveInforUser = function() {
        S = [], w = !0;
        var e, t, n, a, i = o.inforUser;
        $.each(o.privateUser, function(e, t) {
            "2" == t && -1 == S.indexOf(e) && S.push(e)
        }), e = o.selectDate.day.toString(), t = o.selectDate.month.toString(), 1 == e.length && (e = "0" + e), 1 == t.length && (t = "0" + o.selectDate.month), g = o.selectDate.year.toString() + "-" + t + "-" + e, n = o.selectDateCard.day.toString(), a = o.selectDateCard.month.toString(), 1 == n.length && (n = "0" + n), 1 == a.length && (a = "0" + a), p = o.selectDateCard.year.toString() + "-" + a + "-" + n, i && i.email && o.checkEmail(i.email) || i && i.phone && o.validatePhone(i.phone) || (i && i.profile_id ? (y = {
            tokenId: T,
            name: i && i.name ? i.name : "",
            image: i && i.image ? i.image : "",
            address: i && i.address ? i.address : "",
            phone: i && i.phone ? i.phone : "",
            email: i && i.email ? i.email : "",
            facebook: i && i.facebook ? i.facebook : "",
            job: i && i.job ? i.job : "",
            introduction: i && i.introduction ? i.introduction : "",
            birthday: g,
            sex: i && i.sex ? i.sex : "0",
            level: "0",
            profileId: i.profile_id,
            private: S,
            card_id: i && i.card_id ? i.card_id : "",
            card_address: i && i.card_address ? i.card_address : "",
            card_date: p,
            guardian: i && i.guardian ? i.guardian : "",
            guardian_card: i && i.guardian_card ? i.guardian_card : ""
        }, h.editProfileUser(y, function(e) {
            200 == e.data.status && (j(), o.hasEdit = !1, o.noneData = !1, r.$broadcast("updateUser"))
        })) : (y = {
            tokenId: T,
            name: i && i.name ? i.name : "",
            image: i && i.image ? i.image : "",
            address: i && i.address ? i.address : "",
            phone: i && i.phone ? i.phone : "",
            email: i && i.email ? i.email : "",
            facebook: i && i.facebook ? i.facebook : "",
            job: i && i.job ? i.job : "",
            introduction: i && i.introduction ? i.introduction : "",
            birthday: g,
            sex: i && i.sex ? i.sex : "0",
            level: "0",
            private: S,
            card_id: i && i.card_id ? i.card_id : "",
            card_address: i && i.card_address ? i.card_address : "",
            card_date: p,
            guardian: i && i.guardian ? i.guardian : "",
            guardian_card: i && i.guardian_card ? i.guardian_card : ""
        }, h.createProfileUser(y, function(e) {
            200 == e.data.status && (r.$broadcast("updateUser"), o.hasEdit = !1, o.noneData = !1)
        })))
    }, o.cancelInforUser = function() {
        o.hasEdit = !1
    }, o.clickEdit = function() {
        o.hasEdit = !0
    }, o.changePasswordSucess = !1, o.isPasswordEqual = function(e, t) {
        return e == t
    }, o.isChangePassword = !1, o.changePassword = function(e, t, n) {
        $(".btn-change-password").addClass("button-disabled"), t == n && a.changePassword(e, t).then(function(e) {
            $(".btn-change-password").removeClass("button-disabled"), 304 == e.status ? o.isChangePassword = !0 : o.changePasswordSucess = !0
        })
    }, o.postAvatar = function(e) {
        2097152 < e[0].size ? swal("Ảnh vượt quá kích cỡ cho phép") : setTimeout(function() {
            $("#modal-crop-avatar").modal("show")
        }, 1e3)
    }, o.changeYear = function(e) {
        v = parseInt(C) - parseInt(e), o.showGuardian = v < 14
    }, o.checkChar = function(e) {
        var t = ["'", "#"];
        if (null != e)
            for (var n = e.length, a = 0; a < n; a++)
                if (-1 != t.indexOf(e[a])) return !1;
        return !0
    }, o.checkEmail = function(e) {
        if (w) return !(!e || null == e || "" == e) && -1 == e.indexOf("@")
    }, o.validatePhone = function(e) {
        if (w) {
            if (e && null != e && "" != e) return !/^(0|[+]84)[1-9][0-9]{8,9}$/.test(e)
        }
    }, o.checkEmpty = function(e) {
        if (w) return !e || null == e || "" == e
    }, o.convertDate = function(e) {
        var t = {};
        return e && (t.year = e.slice(0, 4), t.month = e.slice(5, 7), t.day = e.slice(8, 10)), t.day + "-" + t.month + "-" + t.year
    }, o.renderImage = function(e) {
        return e + "?v=" + f
    }, u(function() {
        j()
    }, 100), sendGA("pageview", "profile")
}]), angular.module("mazii").controller("ChangePasswordController", ["$rootScope", "$scope", "$state", "userServ", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", "$timeout", "cookieServ", function(e, a, t, i, n, r, o, s, l, c, u) {
    a.title = "Đổi mật khẩu", a.changePasswordSucess = !1, a.isPasswordEqual = function(e, t) {
        return e == t
    }, a.isChangePassword = !1, a.changePassword = function(e, t, n) {
        $(".btn-change-password").addClass("button-disabled"), t == n && i.changePassword(e, t).then(function(e) {
            $(".btn-change-password").removeClass("button-disabled"), 304 == e.status ? a.isChangePassword = !0 : a.changePasswordSucess = !0
        })
    }, a.checkChar = function(e) {
        var t = ["'", "#"];
        if (null != e)
            for (var n = e.length, a = 0; a < n; a++)
                if (-1 != t.indexOf(e[a])) return !1;
        return !0
    }, sendGA("pageview", "change-password")
}]), angular.module("mazii").controller("ResetPasswordController", ["$rootScope", "$scope", "$state", "userServ", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", "$timeout", "cookieServ", function(a, i, e, r, t, n, o, s, l, c, u) {
    i.title = "Cấp lại mật khẩu", i.isPasswordEqual = !0, i.resetPassword = function(e, t, n) {
        $(".btn-reset-password").addClass("button-disabled"), t == n ? (i.isPasswordEqual = !0, r.resetPasswordReally(e, t).then(function(e) {
            $(".btn-reset-password").removeClass("button-disabled"), 304 == e.status ? a.alert.notify = "Hãy kiểm tra email xác nhận cấp lại mật khẩu" : a.alert.notify = "Bạn đã thay đổi mật khẩu thành công", $(".notify-current").fadeIn(200), c(function() {
                $(".notify-current").fadeOut(200)
            }, 2e3)
        })) : i.isPasswordEqual = !1
    }, i.checkChar = function(e) {
        var t = ["'", "#"];
        if (null != e)
            for (var n = e.length, a = 0; a < n; a++)
                if (-1 != t.indexOf(e[a])) return !1;
        return !0
    }, sendGA("pageview", "reset-password")
}]), (app = angular.module("mazii")).controller("TestController", ["$scope", "$state", "$stateParams", "localstoreServ", "TestServer", "$interval", "$timeout", "$window", "$rootScope", function(g, e, t, p, n, c, a, i, r) {
    var f = t.id;
    g.result = !1, g.showAnswer = !1, g.date = new Date;
    var u = null,
        d = 0,
        m = null;
    g.saveTest = !1, r.title = "Thi thử", g.showTab = "0", g.nameLevel = p.getItem("level");
    var h = function(e) {
        return null == e ? null : e.replace(/</g, "<ruby>").replace(/\(/g, "<rt>").replace(/\)>/g, "</rt></ruby>").replace(/{/g, "<u>").replace(/}/g, "</u>")
    };

    function o(e, t, n) {
        return n = n || "0", (e += "").length >= t ? e : new Array(t - e.length + 1).join(n) + e
    }
    var v = function() {
        var e = Math.floor(d / 60),
            t = d % 60;
        g.timeTest = o(e, 2) + ":" + o(t, 2), d--
    };
    g.showPart = function(e) {
        i.scrollTo(0, 0), $(".cont-name").removeClass("cont-active"), $(".cont-name").addClass("cont-no-active"), $(".cont-" + e).removeClass("cont-no-active"), $(".cont-" + e).addClass("cont-active"), g.showTab = e
    };
    var s, l;
    g.showAnswerJlptTest = function() {
        ! function() {
            for (var e = g.questPart, t = g.listPart.parts, n = [], a = 0; a < e.length; a++) {
                n[a] = 0;
                var i = e[a].questions;
                if (null != i)
                    for (var r = 0; r < i.length; r++) {
                        var o = i[r];
                        if (null != o.subQuestions)
                            for (var s = 0; s < o.subQuestions.length; s++) {
                                var l = o.subQuestions[s];
                                null != l.uAnswer && (0, String(l.uAnswer) == String(l.correctAnswer) && n[a]++)
                            }
                        null != o.uAnswer && (0, String(o.uAnswer) == String(o.correctAnswer) && n[a]++)
                    }
            }
            var c = 0,
                u = [],
                d = !0;
            for (a = 0; a < t.length; a++) {
                var m = t[a],
                    h = Math.floor(m.max_score / m.total * n[a]);
                c += h, (u[a] = h) < m.min_score && (d = !1)
            }
            d && c < g.listPart.pass_score && (d = !1), g.resultTest = {
                passExam: d,
                scorePart: u,
                totalScore: c
            }, p.setItem("score_" + f, g.resultTest)
        }(), g.result = !0, i.scrollTo(0, 0), c.cancel(u), u = null, p.deleteItem(f)
    }, g.showAnswerResult = function() {
        g.result = !1, g.showAnswer = !0, i.scrollTo(0, 0), a(function() {
            g.showPart("0")
        }, 100)
    }, g.choiceAnswer = function(e, t) {
        return 0 == g.showAnswer || null == e.uAnswer || t != parseInt(e.uAnswer) ? "" : String(e.uAnswer) == String(e.correctAnswer) ? "choice-right" : "choice-false"
    }, g.saveJlptTest = function() {
        var e = g.showTab,
            t = i.scrollY,
            n = {
                remainTime: d,
                testObject: m,
                tab: e,
                location: t
            };
        p.setItem(f, n), g.saveTest = !0, a(function() {
            g.saveTest = !1
        }, 2e3)
    }, g.openKoseiPage = function() {
        window.open("http://nhatngukosei.com/", "_system")
    }, g.convertQuestion = function(e) {
        return -1 != e.indexOf("../../") ? e.replace("../../", "http://jlpt.mazii.net/") : e
    }, (s = p.getItem(f)) ? (g.showTab = s.tab, g.listPart = s.testObject.meta, g.questPart = s.testObject.parts, g.nameTest = s.testObject.name, g.location = s.location, i.scrollTo(0, g.location), m = s.testObject, d = s.remainTime, u = c(v, 1e3)) : n.getTestById(f).then(function(e) {
        if ((m = e) || e.meta) {
            if (e.parts && 0 < e.parts.length)
                for (var t = 0; t < e.parts.length; t++) {
                    var n = e.parts[t].questions;
                    if (null != n)
                        for (var a = 0; a < n.length; a++) {
                            var i = n[a];
                            if (null != i.subQuestions)
                                for (var r = 0; r < i.subQuestions.length; r++) {
                                    var o, s = i.subQuestions[r];
                                    if (s.question = h(s.question), null != (o = s.answers) && null != o[0])
                                        for (var l = 0; l < o.length; l++) o[l] = h(o[l]);
                                    else null != s.correctAnswer && (s.answers = ["1", "2", "3", "4"])
                                }
                            if (null != (o = i.answers) && null != o[0])
                                for (l = 0; l < o.length; l++) o[l] = h(o[l]);
                            else null != i.correctAnswer && (i.answers = ["1", "2", "3", "4"])
                        }
                }
            g.listPart = e.meta, g.questPart = e.parts, g.nameTest = e.name, d = 60 * e.meta.time, u = c(v, 1e3)
        }
    }), a(function() {
        $(".cont-" + g.showTab).removeClass("cont-no-active"), $(".cont-" + g.showTab).addClass("cont-active")
    }, 2e3), l = "Thi thử JLPT Online | Từ điển Nhật Việt Mazii", $("#site-title").html(l), $(".site-name").html(l), $(".site-title").attr("content", l), $(".site-desc").attr("content", "Tổng hợp các bộ đề thi thử JLPT N5, JLPT N4, JLPT N3, JLPT N2, JLPT N1"), $("#site-url").attr("content", window.location.href), $("#site-keyword").attr("content", JLPT_TEST_PAGE_KEYWORDS), r.htmlReady(), sendGA("pageview", "JLPT Test")
}]), (app = angular.module("mazii")).controller("SelectTestController", ["$scope", "$state", "localstoreServ", "TestServer", "$timeout", "$window", "$rootScope", "dictUtilSer", function(r, t, o, n, a, e, i, s) {
    r.data = [{
        level: "n5",
        title: "JLPT N5",
        desc: "Beginning for you!"
    }, {
        level: "n4",
        title: "JLPT N4",
        desc: "Basic Japanese!"
    }, {
        level: "n3",
        title: "JLPT N3",
        desc: "Welcome to Japan!"
    }, {
        level: "n2",
        title: "JLPT N2",
        desc: "You'r professional!"
    }, {
        level: "n1",
        title: "JLPT N1",
        desc: "Hello senpai!"
    }], r.requireMore = !1, i.title = "Thi thử";
    r.selectLevel = function(e, t) {
        r.requireMore = !1, o.setItem("level", t), $(".level").addClass("no-active"), $(".level").removeClass("active"), $(".level-" + e).removeClass("no-active"), $(".level-" + e).addClass("active"), n.getListByLevel(e).then(function(e) {
            r.listSubject = e.data;
            for (var t = 0; t < r.listSubject.length; t++) {
                var n = r.listSubject[t].id,
                    a = o.getItem(n);
                a && (r.listSubject[t].testing = a);
                var i = o.getItem("score_" + n);
                r.listSubject[t].lastScore = i
            }
        })
    }, r.beginTest = function(e) {
        "-1" == e ? (r.requireMore = !0, a(function() {
            r.requireMore = !1
        }, 2e3)) : (o.deleteItem("score_" + e), t.go("test", {
            id: e
        }))
    }, r.goLogin = function() {
        o.setItem("stateLogin", {
            state: "select"
        })
    }, setTimeout(function() {
        ! function() {
            e.scrollTo(0, 0);
            r.selectLevel("n5", "JLPT N5")
        }(), s.showTitlePage()
    }, 1)
}]), angular.module("mazii").controller("TranslateNewsController", ["$rootScope", "$scope", "$state", "$timeout", "TranslateNewsServ", "dictUtilSer", "$stateParams", "localstoreServ", "$location", "$window", function(r, o, t, e, s, n, a, i, l, c) {
    var u = a.id,
        d = i.getItem("idUser"),
        m = [],
        h = 0;
    r.$on("changeTranstNews", function(e, t) {
        u = t, f(), l.search("id", u)
    });
    var g = i.getItem("currentNews");
    if (g) var p = g._id;
    (m = []).push({
        origin: g.title
    });
    var f = function() {
        s.getTranslateforId(p, "vi", d, function(e) {
            if (e && 200 == e.statusCode && 0 < e.data.length) {
                o.listTranslate = e.data;
                for (var t = 0; t < o.listTranslate.length; t++)
                    if (o.listTranslate[t].id == u) {
                        var n = o.listTranslate[t];
                        o.transCurrent = n, o.transCurrent.status ? 1 == o.transCurrent.status ? (o.statusLike = "liked", o.statusDislike = "unliked") : (2 == o.transCurrent.status ? o.statusDislike = "liked" : o.statusDislike = "unliked", o.statusLike = "unliked") : (o.transCurrent.status = 0, o.statusDislike = "unliked", o.statusLike = "unliked");
                        var a = o.listTranslate[t].content.slice(3);
                        a = (a = a.split('","')).sort();
                        for (var i = 0; i < m.length; i++) a[i] && (a[i] = a[i].slice(4)), m[i].translate = a[i];
                        m[m.length - 1].translate && (m[m.length - 1].translate = m[m.length - 1].translate.slice(0, m[m.length - 1].translate.length - 3))
                    }
            }
        }), o.lines = m
    };
    o.gotoTranslateUser = function(e) {
        t.go("translate_news", {
            id: e
        })
    }, o.voteTranslate = function(e) {
        var t = o.transCurrent,
            n = 0,
            a = t.news_id,
            i = t.uuid;
        h = t.status, "like" == e ? 0 == h || -1 == h || -2 == h ? v(n = 1, a, d, i, n) : 1 == h ? v(1, a, d, i, n = 2) : 2 == h && s.VoteTranslate(a, d, i, -2, function(e) {
            200 == e.statusCode && (v(n = 1, a, d, i, n), o.transCurrent.news_dislike -= 1)
        }) : 0 == h || -1 == h || -2 == h ? v(2, a, d, i, n = -1) : 2 == h ? v(2, a, d, i, n = -2) : 1 == h && s.VoteTranslate(a, d, i, 2, function(e) {
            200 == e.statusCode && (v(2, a, d, i, n = -1), o.transCurrent.news_like -= 1)
        })
    };
    var v = function(e, t, n, a, i) {
        1 == e ? s.VoteTranslate(t, n, a, i, function(e) {
            200 == e.statusCode && (1 == i ? (o.transCurrent.news_like += 1, o.transCurrent.status = 1, o.statusLike = "liked", o.statusDislike = "unliked") : (o.transCurrent.news_like -= 1, o.transCurrent.status = 0, o.statusLike = "unliked"), r.$broadcast("changeVote"))
        }) : 2 == e && s.VoteTranslate(t, n, a, i, function(e) {
            200 == e.statusCode && (-1 == i ? (o.transCurrent.news_dislike += 1, o.transCurrent.status = 2, o.statusDislike = "liked", o.statusLike = "unliked") : (o.transCurrent.status = 0, o.transCurrent.news_dislike -= 1, o.statusDislike = "unliked"), r.$broadcast("changeVote"))
        })
    };
    o.goLogin = function() {
        i.setItem("stateLogin", {
            state: "news"
        })
    },
        function() {
            if (c.scrollTo(0, 0), null != g.content) {
                if (null != g.content.textbody)
                    for (var e = g.content.textbody.split("。"), t = 0; t < e.length; t++) {
                        var n = /(<([^>]+)>)/gi,
                            a = (r = e[t].trim()).replace(n, "").trim();
                        "" != r && "" != a && m.push({
                            origin: r
                        })
                    }
                if (null != g.content.textmore) {
                    var i = g.content.textmore.split("。");
                    for (t = 0; t < i.length; t++) {
                        var r;
                        n = /(<([^>]+)>)/gi, a = (r = i[t].trim()).replace(n, "").trim();
                        "" != r && "" != a && m.push({
                            origin: r
                        })
                    }
                }
                for (t = 0; t < m.length; t++) m[t].translate = "";
                f()
            }
        }()
}]), angular.module("mazii").controller("TranslateUserController", ["$rootScope", "$scope", "$state", "$timeout", "TranslateNewsServ", "dictUtilSer", "$stateParams", "localstoreServ", "$window", function(e, o, t, r, s, n, a, i, l) {
    var c = t.params.type;
    o.dataTranslate = [], o.noti = "";
    var u = i.getItem("idUser");
    o.requireLogin = !1;
    var d = i.getItem("currentNews");
    if (d) var m = d._id;
    var h = [];
    h.push({
        origin: d.title
    });
    o.saveTranslate = function(e) {
        for (var t = 0; t < o.lines.length; t++)
            if (null == o.lines[t].translate && (o.lines[t].translate = ""), "" == o.lines[t].translate) return o.noti = "Hãy nhập nội dung của dòng " + (t + 1), void r(function() {
                o.noti = ""
            }, 3e3);
        for (var n = {}, a = 0; a < o.lines.length; a++) {
            i = (i = (i = o.lines[a].translate).replace(/'/g, "\\'")).replace(/"/g, '"'), n[a] = i
        }
        var i = n;
        s.addNewTranslate(u, m, "vi", i, e, function(e) {
            "200" == e.statusCode && (o.noti = "Đã lưu bản dịch !")
        })
    }, o.goLogin = function() {
        i.setItem("stateLogin", {
            state: "news"
        })
    },
        function() {
            if (l.scrollTo(0, 0), null != d.content) {
                if (null != d.content.textbody)
                    for (var e = d.content.textbody.split("。"), t = 0; t < e.length; t++) {
                        var n = /(<([^>]+)>)/gi,
                            a = (r = e[t].trim()).replace(n, "").trim();
                        "" != r && "" != a && h.push({
                            origin: r
                        })
                    }
                if (null != d.content.textmore) {
                    var i = d.content.textmore.split("。");
                    for (t = 0; t < i.length; t++) {
                        var r;
                        n = /(<([^>]+)>)/gi, a = (r = i[t].trim()).replace(n, "").trim();
                        "" != r && "" != a && h.push({
                            origin: r
                        })
                    }
                }
                for (t = 0; t < h.length; t++) h[t].translate = "";
                "edit" == c && s.getTranslateforId(m, "vi", u, function(e) {
                    if (e && 200 == e.statusCode && 0 < e.data.length) {
                        o.listTranslate = e.data;
                        for (var t = 0; t < o.listTranslate.length; t++)
                            if (o.listTranslate[t].uuid == u) {
                                o.listTranslate[t];
                                var n = o.listTranslate[t].content,
                                    a = JSON.parse(n);
                                for (var i in a) h[i].translate = a[i]
                            }
                    }
                }), o.lines = h
            }
        }();
    var g = i.getItem("inforUser");
    o.requireLogin = !g
}]), angular.module("mazii").controller("CommunityController", ["$rootScope", "$scope", "$state", "localstoreServ", "exampleServer", "dictUtilSer", "$window", "communityServer", "$stateParams", function(i, l, e, t, n, o, a, c, r) {
    var s, u, d, m, h, g = 1,
        p = 6,
        f = {},
        v = [],
        y = {},
        w = 1,
        _ = 0,
        b = [],
        k = {};
    l.dataPost = {}, l.checkFollow = {}, l.showResultSearch = !1, l.showView = !1, l.showFull = !1, l.showDetailQuest = !1, l.myQuestion = !0, l.showListMobile = !1, i.title = "Cộng đồng", l.loadDone = !1, l.listComment = [], l.listCmt = [], l.loadEffect = !0, l.inforErrSpam = "", l.typeCategory = "all", l.ofUser = !1, a.scrollTo(0, 0), window.innerDocClick = !0, l.loadDoneDetail = !1, l.dataReport = {}, $(document).mouseover(function() {
        window.innerDocClick = !0
    }), $(document).mouseleave(function() {
        window.innerDocClick = !1
    }), l.$watch(function() {
        return location.hash
    }, function(e) {
        var t = e.indexOf("category="),
            n = e.indexOf("profile="),
            a = e.indexOf("detail=");
        "#!/community" == e ? (l.showDetailQuest = !1, l.typeCategory = "all", h = d = u = "", setTimeout(function() {
            $(".screen-community .item-cate").removeClass("cate-active"), $(".screen-community .item-cate-all").addClass("cate-active")
        }, 200)) : -1 != t ? (h = u = "", d = e.substr(t + 9, e.length), setTimeout(function() {
            $(".screen-community .item-cate").removeClass("cate-active"), $(".screen-community .item-cate-" + d).addClass("cate-active")
        }, 300), l.showDetailQuest = !1, l.typeCategory = d) : -1 != n ? (d = u = "", h = e.substr(n + 8, e.length)) : -1 != a ? (l.showDetailQuest = !0, u = e.substr(a + 7, e.length), h = d = "") : (h = d = u = "", setTimeout(function() {
            $(".screen-community .item-cate-all").addClass("cate-active")
        }, 200)), window.innerDocClick || C()
    });
    var S = t.getItem("idUser");
    S ? l.userId = S : setTimeout(function() {
        i.user && (S = i.user.userId, l.userId = S)
    }, 500);
    var C = function() {
            l.listDataPost = [], v = [], g = 1, u ? (l.detailQuest = [], l.goToQuest(u)) : d ? (l.typeCategory = d, U(g, d, 1)) : h ? L(h, g, 24) : P(g, 24)
        },
        T = function() {
            c.getCategory(function(e) {
                l.loadEffect = !1, e && (l.listCategory = e, i.htmlReady())
            })
        },
        I = function(e, t) {
            c.getPostNoAnswer(e, t, function(e) {
                200 == e.status && (f = e.data.posts, (l.listPostNoAnswer = f).length < e.data.total ? l.showView = !0 : l.showView = !1, i.htmlReady())
            })
        },
        x = 1;
    l.viewMoreQuest = function() {
        I(1, p = 6 * ++x)
    }, l.searchQuest = function(e) {
        l.showResultSearch = !!e || !l.showResultSearch, c.searchPost(l.dataPost.search, function(e) {
            200 == e.status ? (l.listSearchQuest = e.data.results, i.htmlReady()) : 302 == e.status && (l.listSearchQuest = [])
        })
    };
    var j = 0;
    l.goToQuest = function(e) {
        var t;
        if (t = e.post_id ? e.post_id : e.id ? e.id : e, l.showListMobile = !1, l.showResultSearch = !1, h = null, 0 == j) {
            j = 1;
            var n = "";
            setTimeout(function() {
                (n = "#editor-comment-" + t) && A(n, "")
            }, 1e3)
        }
        $(".item-cate").removeClass("cate-active"), $(".list-quest a").removeClass("quest-active"), $(".quest-" + t).addClass("quest-active"), l.showDetailQuest = !0, a.scrollTo(0, 0), c.getPostWidthId(t, function(e) {
            l.loadDoneDetail = !0, 200 == e.status ? (l.detailQuest = e.data, F(e.data.title, e.data.content), i.htmlReady()) : l.detailQuest = null
        })
    }, l.goListPost = function() {
        l.showListMobile = !1, j = 0, M = 1, h = null, $(".item-cate").removeClass("cate-active"), $(".item-cate.item-cate-all").addClass("cate-active"), "all" == l.typeCategory && !l.showDetailQuest && l.myQuestion || (l.showDetailQuest = !1, l.typeCategory = "all", $(".list-quest a").removeClass("quest-active"), v = [], P(g, 24))
    };
    var P = function(e, t) {
        c.getPost(e, t, function(e) {
            if (l.loadEffect = !1, 200 == e.status) {
                y = e.data;
                for (var t = 0; t < y.posts.length; t++) v.push(y.posts[t]), F(y.posts[t].title, y.posts[t].content);
                l.listDataPost = v
            }
            setTimeout(function() {
                _ = 1
            }, 3e3), i.htmlReady()
        })
    };
    l.$on("postDone", function() {
        v = [], l.myQuestion ? P(g, 24) : (l.listMyQuestion("me"), l.myQuestion = !1), I(1, p)
    }), l.showFullContent = function(e, t) {
        l.loadEffect = !1, "1" == t ? ($(".hide-content-" + e).css("display", "none"), $(".show-content-" + e).css("display", "block")) : "2" == t ? ($(".hide-cmt-" + e).css("display", "none"), $(".show-cmt-" + e).css("display", "block")) : ($(".hide-partCm-" + e).css("display", "none"), $(".show-partCm-" + e).css("display", "block"))
    }, l.addComment = function(e, t, n, a, i) {
        var r, o;
        if (t.send = !0, "level1" == e) {
            var s;
            if (s = t.post_id ? t.post_id : t.id, o = (o = z(r = $("#editor-comment-" + t.id + " .ql-editor").html())).trim(), !r || 0 == o.length) return void(t.send = !1);
            c.addComment(r, s, function(e) {
                t.send = !1, -2 == e.data.status ? t.spam = !0 : (t.spam = !1, "detail" == a ? l.goToQuest(s) : (v = [], D(t)), $("#editor-comment-" + t.id + " .ql-editor").html(""))
            })
        } else if ("level2" == e) {
            if (o = (o = z(r = $("#editor-cmt-" + t.id + " .ql-editor").html())).trim(), !r || 0 == o.length) return;
            c.addParComment(r, t.id, function(e) {
                -2 == e.data.status ? t.spam = !0 : (t.spam = !1, "detail" == a ? l.goToQuest(i.id) : (v = [], t.showComment = !1, D(i)), r = $("#editor-cmt-" + t.id + " .ql-editor").html(""))
            })
        }
    };
    var N = !(l.allowRepComment = function(e) {
        if (i.user)
            if (e.showComment) e.showComment = !1;
            else {
                e.showComment = !0;
                var t;
                t = "#editor-cmt-" + e.id, setTimeout(function() {
                    A(t, "")
                }, 1)
            }
    });
    l.showEdit = function(e, t) {
        N ? (N = !1, 1 == t ? $(".box-edit.edit-" + e).css("display", "none") : 2 == t ? $(".box-edit-cmt.edit-" + e).css("display", "none") : $(".box-edit-part.edit-" + e).css("display", "none")) : (N = !0, 1 == t ? $(".box-edit.edit-" + e).css("display", "block") : 2 == t ? $(".box-edit-cmt.edit-" + e).css("display", "block") : $(".box-edit-part.edit-" + e).css("display", "block"))
    };
    var A = function(e, t) {
        new Quill(e, {
            theme: "snow",
            modules: {
                toolbar: {
                    container: [
                        ["image"],
                        ["bold", "italic", "underline"],
                        [{
                            header: [1, 2, 3, 4, 5, 6, !1]
                        }],
                        [{
                            align: []
                        }],
                        ["link"]
                    ],
                    handlers: {
                        image: function() {
                            var e = this.quill.getSelection(),
                                t = 0;
                            e && (t = e.index);
                            var n = prompt("What is the image URL");
                            this.quill.insertEmbed(t, "image", n, Quill.sources.USER)
                        }
                    }
                }
            }
        });
        t && $(e + " .ql-editor").html(t)
    };
    l.editPost = function(e, t) {
        if (1 == t) i.$broadcast("edit-my-post", e);
        else {
            if (2 == t ? $(".box-edit-cmt.edit-" + e.id).css("display", "none") : $(".box-edit-part.edit-" + e.id).css("display", "none"), e.showEdit) return void(e.showEdit = !1);
            e.showEdit = !0, e.lastContent = e.content;
            var n = "";
            n = 2 == t ? "#editor-comment-" + e.id : "#editor-partComment-" + e.id, setTimeout(function() {
                A(n, e.content)
            }, 1)
        }
    }, l.btnCancel = function(e) {
        e.content = e.lastContent, e.lastContent = null, e.showEdit = !1
    }, l.updatePost = function(t, e) {
        var n;
        n = t.post_id && 1 == e ? t.post_id : t.id;
        var a = "";
        a = 1 == e ? "#editor-post-" + t.id : 2 == e ? "#editor-comment-" + t.id : "#editor-partComment-" + t.id, t.content = $(a + " .ql-editor").html(), c.updatePost(n, t.content, e, function(e) {
            -2 == e.data.status ? t.spam = !0 : t.spam = !1, t.showEdit = !1
        })
    }, l.deletePost = function(e, t, n) {
        var a;
        e.showEdit = !1, a = e.post_id && 1 == t ? e.post_id : e.id, 1 == t ? $(".box-edit.edit-" + e.id).css("display", "none") : $(".box-edit-cmt.edit-" + e.id).css("display", "none"), c.deletePost(a, t, function(e) {
            200 == e.status && (l.showDetailQuest = !1, v = [], n ? l.goToQuest(a) : ($(".list-quest a").removeClass("quest-active"), l.myQuestion ? "all" != l.typeCategory ? U(g, d, m) : P(g, 24) : (l.listMyQuestion("me"), l.myQuestion = !1)), f = null, I(1, p))
        })
    }, l.checkColorFollow = function(e) {
        return e && 0 != (e && e.length) ? "color-active" : "color-noActive"
    }, l.followPost = function(e) {
        var t;
        t = t ? e.post_id : e.id, i.user && null != i.user && (0 == e.follows_post.length ? (e.total_follow++, e.follows_post = [{
            type: "post"
        }], c.followPost(t, "post", function(e) {})) : (e.total_follow--, e.follows_post = [], c.unFollowPost(t, "post", function(e) {})))
    }, l.checkColorVote = function(e, t) {
        return null == t ? "color-noActive" : 1 == t.action || 1 == t ? "like" == e ? "color-active" : "color-noActive" : "like" == e ? "color-noActive" : "color-active"
    }, l.votePost = function(e, t, n) {
        var a;
        i.user && null != i.user && (1 == n ? (a = t.post_id ? t.post_id : t.id, "like" == e && (null == t.like_post ? (t.liked++, t.like_post = {
            action: 1
        }, c.votePost(a, 1, 1, function(e) {})) : 1 == t.like_post.action && (0 < t.liked && t.liked--, t.like_post = null, c.unVotePost(a, 1, 1, function(e) {})))) : 2 == n ? "like" == e && (null == t.like_comment ? (t.liked++, t.like_comment = {
            action: 1
        }, c.votePost(t.id, 1, 2, function(e) {})) : 1 == t.like_comment.action && (0 < t.liked && t.liked--, t.like_comment = null, c.unVotePost(t.id, 1, 2, function(e) {}))) : "like" == e && (null == t.like_par_comment ? (t.liked++, t.like_par_comment = {
            action: 1
        }, c.votePost(t.id, 1, 3, function(e) {})) : 1 == t.like_par_comment.action && (0 < t.liked && t.liked--, t.like_par_comment = null, c.unVotePost(t.id, 1, 3, function(e) {}))))
    }, l.reportPost = function(e, t) {
        i.user && null != i.user && (l.dataReport = {
            data: e,
            level: t
        })
    };

    function R() {
        $(document).ready(function() {
            s = $(".box-main").innerHeight()
        })
    }
    setTimeout(function() {
        R()
    }, 1e3), l.$on("goDetailNotify", function(e, t) {
        l.detailQuest = null, j = 0, l.loadDoneDetail = !1, l.goToQuest(t)
    });
    var O = function(e) {
        c.getRankByKey(e, function(e) {
            l.listRank = e, i.htmlReady()
        })
    };
    l.showTabRank = function(e, t) {
        $(".select-time div").removeClass("sl-active"), $(t.currentTarget).addClass("sl-active"), O("tab1" == e ? "week" : "tab2" == e ? "month" : "year")
    }, l.listMyQuestion = function(e) {
        j = 0, a.scrollTo(0, 0), $(".list-quest a").removeClass("quest-active"), l.myQuestion = !l.myQuestion, v = [], y = {}, l.typeCategory = "all", $(".screen-community .item-cate").removeClass("cate-active"), l.showListMobile = !1, l.showDetailQuest = !1, "me" == e ? (l.loadEffect = !1, i.user ? c.postOfUser(function(e) {
            if (200 == e.status) {
                y = e.data;
                for (var t = 0; t < y.posts.length; t++) v.push(y.posts[t]);
                l.listDataPost = v, i.htmlReady()
            }
        }) : l.listDataPost = v) : (v = [], $(".screen-community .item-cate-all").addClass("cate-active"), P(g, 24))
    }, l.btnShowMobile = function() {
        l.showListMobile = !l.showListMobile
    }, l.goLogin = function(e) {
        "detail" == e ? t.setItem("stateLogin", {
            state: "community",
            param1: u
        }) : t.setItem("stateLogin", {
            state: "community"
        })
    };
    var D = function(t) {
        c.getCommentById(t.post_id || t.id, function(e) {
            l.loadEffect = !1, 200 == e.status && (t.comments = e.data.comments, t.showComment = !0, o.safeApply(l), i.htmlReady())
        })
    };
    l.viewComment = function(e) {
        if (e.showComment) e.showComment = !1;
        else {
            e.showComment = !0;
            var t;
            t = "#editor-comment-" + e.id, setTimeout(function() {
                A(t, "")
            }, 1), D(e)
        }
    };
    var U = function(e, t, n) {
            l.loadEffect = !1, d = t, c.getPostByCategory(e, 24, t, n, function(e) {
                if (200 == e.status) {
                    y = e.data, k = y, l.detailCategory = e.data.category;
                    for (var t = 0; t < y.posts.length; t++) v.push(y.posts[t]);
                    b = v, l.listDataPost = v, i.htmlReady()
                }
            })
        },
        M = 0;
    l.goPostByCategory = function(e, t) {
        a.scrollTo(0, 0), j = 0, l.showListMobile = !1, l.myQuestion || (l.myQuestion = !0), $(".list-quest a").removeClass("quest-active"), $(".item-cate").removeClass("cate-active"), $(".item-cate-" + e.id).addClass("cate-active"), $(".detailCate-item").removeClass("cate-item-active"), $(".detailCate-item-" + t).addClass("cate-item-active"), l.showDetailQuest = !1, g = 1, v = [], y = {}, l.listDataPost = [], m != t || l.typeCategory != e.id ? (l.loadEffect = !0, m = t, l.typeCategory = e.id, U(g, e.id, t), M = 1) : (l.detailCategory = e, y = k, l.listDataPost = b)
    }, l.setCategoryId = function() {
        1 == M && (M = 0, i.$broadcast("change-type-category"))
    }, l.followCategory = function(e) {
        var t;
        i.user && null != i.user && (null == e.user_follow ? (t = 1, e.user_follow = {
            category_id: e.id
        }, e.follow++) : (t = -1, e.follow--, e.user_follow = null), c.followCategory(e.id, t, function(e) {}))
    };
    var L = function(e, t, n) {
        c.getListPostOfUser(e, t, n, function(e) {
            if (l.loadEffect = !1, 200 == e.status) {
                y = e.data;
                for (var t = 0; t < y.posts.length; t++) v.push(y.posts[t]);
                l.listDataPost = v, i.htmlReady()
            }
        })
    };
    l.goToPostUser = function(e) {
        h != e && (h = e, g = 1, v = [], y = [], l.listDataPost = [], l.typeCategory = "all", $(".item-cate").removeClass("cate-active"), $(".item-cate.item-cate-all").addClass("cate-active"), $(".list-quest a").removeClass("quest-active"), l.showDetailQuest = !1, l.ofUser = !0, l.myQuestion = !1, j = 0, a.scrollTo(0, 0), L(e, g, 24))
    };

    function E(e) {
        if (e) return e.replace(/\\t/g, "&nbsp").replace(/\\r/g, "").replace(/\\n/g, "</br>")
    }

    function z(e) {
        var t = document.createElement("div");
        return t.innerHTML = e, t.textContent || t.innerText || ""
    }
    l.convertQuestion = function(e, t) {
        var n, a;
        if (e) return -1 != (a = e.indexOf("\\r\\n")) && a < 50 ? "<span>" + t + "</span>." + e.substr(0, a) : (n = (n = z(e)) && E(n)) && 55 < n.length ? "<span>" + t + "</span>." + n.substr(0, 54) + "..." : "<span>" + t + "</span>." + n
    }, l.convertHasTag = function(e) {
        if (e) {
            var t, n = (e = E(e)).indexOf("#");
            if (-1 != e.indexOf("href=") && (e = e.replace("href=", "target='_blank' href=")), -1 != e.indexOf("[img]") && (e = (e = e.replace("[img]", "<img ng-src='")).replace("[/img]", "'/></br>")), -1 == n || "!" == e.charAt(n + 1) && "/" == e.charAt(n + 1) && "&" == e.charAt(n - 1)) return e;
            for (var a = n; a < e.length; a++)
                if ("" == e[a]) return t = e.slice(n, a), e.replace(t, "<span style='color: #4d81ed;'>" + t + "</span>");
            return e.replace(e, "<span style='color: #4d81ed;'>" + e + "</span>")
        }
    }, l.convertContentPost = function(e) {
        var t;
        return (t = l.convertHasTag(e)) && 300 < t.length ? t.substr(0, 299) + "..." : t
    };
    var q = {
        epochs: [{
            key: "year",
            title: "năm"
        }, {
            key: "month",
            title: "tháng"
        }, {
            key: "day",
            title: "ngày"
        }, {
            key: "hour",
            title: "giờ"
        }, {
            key: "minute",
            title: "phút"
        }],
        year: 31536e3,
        month: 2592e3,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    function F(e, t) {
        var n;
        e = z(e), t = z(t), e && 0 < e.length && (n = (n = e.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")).split(" ").join(",")), $("#site-title").html(e + " | Cộng đồng hỏi đáp Mazii"), $(".site-name").html(e + " | Cộng đồng hỏi đáp Mazii"), $(".site-title").attr("content", t), $(".site-desc").attr("content", t), $("#site-url").attr("content", window.location.href), n ? $("#site-keyword").attr("content", HOME_PAGE_KEYWORDS + "," + n) : $("#site-keyword").attr("content", HOME_PAGE_KEYWORDS)
    }
    l.timeAgo = function(e) {
        if (e) {
            var t = e.split(" ")[0].split("-"),
                n = e.split(" ")[1].split(":"),
                a = new Date(t[0], t[1] - 1, t[2], n[0], n[1], n[2]),
                i = function(e) {
                    for (var t, n, a, i = 0; i < q.epochs.length; i++)
                        if (t = q.epochs[i].key, a = q.epochs[i].title, 1 <= (n = Math.floor(e / q[t]))) return {
                            interval: n,
                            timeVi: a
                        }
                }(Math.floor((new Date - new Date(a)) / 1e3));
            return i ? i.interval + " " + i.timeVi : "vừa xong"
        }
    }, l.$on("$destroy", function(e, t) {
        $(document).off("mouseup"), $(window).off("scroll"), $(document).off("mouseover"), $(document).off("mouseleave")
    }), $(document).mouseup(function(e) {
        var t = $(".box-edit"),
            n = $(".box-edit-cmt"),
            a = $(".box-edit-part"),
            i = $(".result-search"),
            r = $(".box-list-mobile");
        t.is(e.target) || 0 !== t.has(e.target).length || (N = !1, t.hide()), n.is(e.target) || 0 !== n.has(e.target).length || (N = !1, n.hide()), a.is(e.target) || 0 !== a.has(e.target).length || (N = !1, a.hide()), r.is(e.target) || 0 !== r.has(e.target).length || (l.showListMobile = !1, o.safeApply(l)), i.is(e.target) || 0 !== i.has(e.target).length || (l.showResultSearch = !1, o.safeApply(l))
    }), $(window).scroll(function() {
        var e = $(window).scrollTop();
        if (450, y && y.posts && 0 != y.posts.length && !l.showDetailQuest) {
            R();
            var t = s - e;
            t < 0 || 1 == _ && t < 450 && v.length < y.total && (l.loadEffect = !0, _ = 0, w++, "all" == l.typeCategory ? l.ofUser ? L(h, g * w, 24) : P(g * w, 24) : U(g * w, d, m))
        }
    }), setTimeout(function() {
        i.user && i.user.profile && (l.inforUser = i.user.profile), C(), I(1, p), O("week"), T(), l.loadDone = !0, o.showTitlePage()
    }, 10), sendGA("pageview", "community")
}]), angular.module("mazii").controller("ComRightController", ["$rootScope", "$scope", "$state", "localstoreServ", "exampleServer", "cookieServ", "encryptionServ", function(e, n, i, t, r, a, o) {
    var s = t.getItem("idUser");
    n.goInforUser = function(n, a) {
        r.checkProfile(n, function(e) {
            if (200 == e.data.status) {
                var t = e.data.result;
                "center" == t ? n == s ? i.go("profile-center") : window.open(i.href("infor-center", {
                    id: n
                }), "_blank") : "user" == t && (n == s ? i.go("profile") : window.open(i.href("infor-user", {
                    id: n,
                    name: a
                }), "_blank"))
            }
        })
    }, null == e.user ? n.logined = !1 : (n.logined = !0, r.getTopPoint(50, function(e) {
        if (200 == e.status) {
            var t = e.result;
            t && 0 < t.length ? (n.showTop = !0, n.listTop = t) : n.showTop = !1
        }
    }))
}]), angular.module("mazii").controller("ProfileCenterController", ["$rootScope", "$scope", "$state", "exampleServer", "cookieServ", "encryptionServ", "userServ", "localstoreServ", function(a, i, e, n, t, r, o, s) {
    i.editInfor = !1, i.inforCenter = {}, i.editNameCenter = !1;
    var l = {};
    i.inforProduct = {};
    var c = {};
    i.requireInfor = !1, i.viewMore = !0, i.loadDone = !1, i.noneData = !1, i.privateCenter = {
        website: "1",
        facebook: "1",
        email: "1",
        phone: "1",
        address: "1",
        introduction: "1"
    };
    var u = [];
    i.txtErr = "", a.$on("changeImageOk", function() {
        p()
    });
    var d = s.getItem("idUser"),
        m = t.getCookie("tokenId");
    m = r.decode(m);
    var h, g = !1;
    i.showRecomment = !0, i.showProduce = !1, i.showActivity = !1, i.showSecurity = !1, i.txtBtn = "Thêm", i.showTab = function(e) {
        switch (e) {
            case "recomment":
                i.showRecomment = !0, i.showProduce = !1, i.showActivity = !1, i.showSecurity = !1, $(".profile-center .select").removeClass("active"), $(".profile-center .select1").addClass("active");
                break;
            case "produce":
                i.showRecomment = !1, i.showProduce = !0, i.showActivity = !1, i.showSecurity = !1, g = !1, $(".profile-center .select").removeClass("active"), $(".profile-center .select2").addClass("active");
                break;
            case "activity":
                i.showRecomment = !1, i.showProduce = !1, i.showActivity = !0, i.showSecurity = !1, f(1, 10), $(".profile-center .select").removeClass("active"), $(".profile-center .select3").addClass("active");
                break;
            case "security":
                i.showRecomment = !1, i.showProduce = !1, i.showActivity = !1, i.showSecurity = !0, $(".profile-center .select").removeClass("active"), $(".profile-center .select4").addClass("active")
        }
    };
    var p = function() {
            h = Math.floor(100 * Math.random()), g = !1, i.inforProduct = {}, i.loadDone = !1;
            n.getProfile("center", d, function(e) {
                200 == e.data.status && (i.loadDone = !0, e.data.result.profile ? (i.noneData = !1, i.inforCenter = e.data.result.center.total, i.inforPublic = e.data.result.center.public, i.dataInforProduct = e.data.result.product, $.each(i.inforCenter, function(e, t) {
                    i.privateCenter[e] = "2"
                }), $.each(i.inforPublic, function(e, t) {
                    i.privateCenter[e] = "1"
                }), "" == i.inforCenter.website && "" == i.inforCenter.facebook && "" == i.inforCenter.email && "" == i.inforCenter.phone && "" == i.inforCenter.address && "" == i.inforCenter.introduction ? i.noneData = !0 : i.noneData = !1) : i.noneData = !0)
            })
        },
        f = function(e, t) {
            n.getHistoryAction(d, e, t, function(e) {
                200 == e.data.status && (i.listHistory = e.data.result)
            })
        };
    i.moreHistory = function() {
        i.viewMore = !1, f(1, 20)
    }, i.clickEdit = function() {
        i.editInfor = !0
    }, i.saveInforCenter = function() {
        $.each(i.privateCenter, function(e, t) {
            "2" == t && -1 == u.indexOf(e) && u.push(e)
        }), g = !0;
        var e = i.inforCenter;
        i.checkEmail(e.email) || i.checkChar(e.email) && i.checkChar(e.name) && (i.validatePhone(e.phone) || (e.profile_id ? (l = {
            tokenId: m,
            name: e.name ? e.name : "",
            image: e.image ? e.image : "",
            address: e.address,
            phone: e.phone ? e.phone : "",
            email: e.email ? e.email : "",
            facebook: e.facebook ? e.facebook : "",
            website: e.website ? e.website : "",
            introduction: e.introduction ? e.introduction : "",
            profileId: e.profile_id,
            private: u
        }, n.editProfileCenter(l, function(e) {
            i.editInfor = !1, i.noneData = !1
        })) : (l = {
            tokenId: m,
            name: e.name ? e.name : "",
            image: e.image ? e.image : "",
            address: e.address,
            phone: e.phone ? e.phone : "",
            email: e.email ? e.email : "",
            facebook: e.facebook ? e.facebook : "",
            website: e.website ? e.website : "",
            introduction: e.introduction ? e.introduction : "",
            private: u
        }, n.createProfileCenter(l, function(e) {
            i.editInfor = !1, i.noneData = !1
        }))))
    }, i.cancelInforCenter = function() {
        i.editInfor = !1
    }, i.editName = function() {
        i.editNameCenter = !0
    }, i.saveName = function() {
        if (i.editNameCenter = !1, i.inforCenter.profile_id) {
            var e = i.inforCenter.profile_id,
                t = i.inforCenter.name;
            n.editProfile(e, "center", "name", t, function(e) {
                i.editInfor = !1
            })
        } else l = {
            tokenId: m,
            name: i.inforCenter.name,
            image: "",
            address: "",
            phone: "",
            email: "",
            facebook: "",
            website: "",
            introduction: "",
            private: u
        }, n.createProfileCenter(l, function(e) {
            i.editInfor = !1
        })
    }, i.addProduct = function() {
        g = !0;
        var e = i.inforProduct;
        i.checkEmpty(e.name) || i.checkEmpty(e.price) || i.checkEmpty(e.link) || i.checkNumber(e.price) || (e.productId ? (c = {
            tokenId: m,
            name: e.name,
            profileId: i.inforCenter.profile_id,
            price: e.price,
            link: e.link,
            productId: e.productId
        }, n.editProduct(c, function(e) {
            200 == e.data.status && p()
        })) : (c = {
            tokenId: m,
            name: e.name,
            price: e.price,
            link: e.link
        }, n.createProduct(c, function(e) {
            302 == e.data.status && (i.txtErr = "Tên khoá học bị trùng. Vui lòng nhập tên khác !"), 200 == e.data.status && (i.txtErr = "", p())
        })))
    }, i.editProduct = function(e) {
        i.txtBtn = "Cập nhật", i.inforProduct = {
            name: e.product_name,
            price: e.price,
            link: e.link,
            productId: e.product_id
        }
    }, i.deleteProduct = function(t) {
        swal({
            text: "Bạn có chắc chắn muốn xoá khoá học này không?",
            buttons: !0,
            dangerMode: !0
        }).then(function(e) {
            e ? n.deleteProduct(i.inforCenter.profile_id, t.product_id, function(e) {
                200 == e.data.status && p()
            }) : console.log("cancel")
        })
    }, i.directToReport = function(e, t) {
        t.stopImmediatePropagation(), t.preventDefault();
        var n = {
            query: e,
            type: "word",
            tag: "report-mean"
        };
        a.$broadcast("query", n)
    }, i.detailTrans = function(e) {
        i.dataDetail = e, a.$broadcast("detailTrans", e)
    }, i.changePasswordSucess = !1, i.isPasswordEqual = function(e, t) {
        return e == t
    }, i.isChangePassword = !1, i.changePassword = function(e, t, n) {
        $(".btn-change-password").addClass("button-disabled"), t == n && o.changePassword(e, t).then(function(e) {
            $(".btn-change-password").removeClass("button-disabled"), 304 == e.status ? i.isChangePassword = !0 : i.changePasswordSucess = !0
        })
    }, i.postAvatar = function(e) {
        2097152 < e[0].size ? swal("Ảnh vượt quá kích cỡ cho phép") : setTimeout(function() {
            $("#modal-crop-avatar").modal("show")
        }, 1e3)
    }, setTimeout(function() {
        null != a.user && p()
    }, 1e3), i.checkChar = function(e) {
        var t = ["'", "#"];
        if (null != e)
            for (var n = e.length, a = 0; a < n; a++)
                if (-1 != t.indexOf(e[a])) return !1;
        return !0
    }, i.checkEmpty = function(e) {
        if (g) return !e || null == e || "" == e
    }, i.checkEmail = function(e) {
        if (g) return null == e || -1 == e.indexOf("@")
    }, i.validatePhone = function(e) {
        if (g) {
            return !/^(0|[+]84)[1-9][0-9]{8,9}$/.test(e)
        }
    }, i.checkNumber = function(e) {
        if (g) {
            return !/^[0-9]+$/.test(e)
        }
    }, i.renderImage = function(e) {
        return e + "?v=" + h
    }
}]), angular.module("mazii").controller("InforCenterController", ["$rootScope", "$scope", "$state", "exampleServer", "cookieServ", "encryptionServ", "$stateParams", "localstoreServ", "$sce", function(a, n, e, i, t, r, o, s, l) {
    n.editInfor = !1, n.inforCenter = {}, n.editNameCenter = !1;
    n.viewMore = !0, n.noneHist = !1, n.loadDone = !1, n.trackId = null, n.urlTrack = "";
    var c = o.id;
    n.showRecomment = !0, n.showProduce = !1, n.showActivity = !1, n.showTab = function(e) {
        switch (e) {
            case "recomment":
                n.showRecomment = !0, n.showProduce = !1, n.showActivity = !1, $(".profile-center .select").removeClass("active"), $(".profile-center .select1").addClass("active");
                break;
            case "produce":
                n.showRecomment = !1, n.showProduce = !0, n.showActivity = !1, $(".profile-center .select").removeClass("active"), $(".profile-center .select2").addClass("active");
                break;
            case "activity":
                n.showRecomment = !1, n.showProduce = !1, n.showActivity = !0, d(1, 10), $(".profile-center .select").removeClass("active"), $(".profile-center .select3").addClass("active")
        }
    };

    function u() {
        n.loadDone = !1, null == a.user && (s.setItem("stateLogin", {
            state: "infor-center",
            param1: c
        }), e.go("login")), i.getProfile("view", c, function(e) {
            200 == e.data.status && (n.loadDone = !0, n.inforCenter = e.data.result.center.public, n.dataInforProduct = e.data.result.product, n.trackId = n.inforCenter.trackId, null != n.trackId && (n.urlTrack = l.trustAsResourceUrl("https://www.googletagmanager.com/gtag/js?id=" + n.trackId), function(e) {
                function t() {
                    dataLayer.push(arguments)
                }
                window.dataLayer = window.dataLayer || [], t("js", new Date), t("config", e)
            }(n.trackId)))
        })
    }
    var d = function(e, t) {
        i.getHistoryAction(c, e, t, function(e) {
            404 == e.data.status && (n.noneHist = !0, n.viewMore = !1), 200 == e.data.status && (n.listHistory = e.data.result)
        })
    };
    n.moreHistory = function() {
        n.viewMore = !1, d(1, 20)
    }, n.directToReport = function(e, t) {
        t.stopImmediatePropagation(), t.preventDefault();
        var n = {
            query: e,
            type: "word",
            tag: "report-mean"
        };
        a.$broadcast("query", n)
    }, n.detailTrans = function(e) {
        n.dataDetail = e, a.$broadcast("detailTrans", e)
    }, setTimeout(function() {
        u()
    }, 2e3)
}]), angular.module("mazii").controller("InforUserController", ["$rootScope", "$filter", "$scope", "$state", "userServ", "maziiServ", "dictUtilSer", "historyServ", "localstoreServ", "$http", "$timeout", "cookieServ", "encryptionServ", "exampleServer", "$stateParams", "$window", function(a, e, n, t, i, r, o, s, l, c, u, d, m, h, g, p) {
    n.title = "Thông tin User", n.viewMore = !0;
    var f = g.id;
    n.nameUser = g.name, n.noneHist = !1, n.loadDone = !1, p.scrollTo(0, 0);
    n.showInforUser = !0, n.showActUser = !1, n.showTab = function(e) {
        switch (e) {
            case "inforUser":
                n.showInforUser = !0, n.showActUser = !1, n.showSecurity = !1, $(".profile-center .select").removeClass("active"), $(".profile-center .tab1").addClass("active");
                break;
            case "actUser":
                n.showInforUser = !1, n.showActUser = !0, n.showSecurity = !1, v(1, 10), $(".profile-center .select").removeClass("active"), $(".profile-center .tab2").addClass("active")
        }
    };
    var v = function(e, t) {
        h.getHistoryAction(f, e, t, function(e) {
            404 == e.data.status && (n.noneHist = !0, n.viewMore = !1), 200 == e.data.status && (n.listHistory = e.data.result)
        })
    };
    n.moreHistory = function() {
        n.viewMore = !1, v(1, 20)
    }, n.directToReport = function(e, t) {
        t.stopImmediatePropagation(), t.preventDefault();
        var n = {
            query: e,
            type: "word",
            tag: "report-mean"
        };
        a.$broadcast("query", n)
    }, n.detailTrans = function(e) {
        n.dataDetail = e, a.$broadcast("detailTrans", e)
    }, n.convertDate = function(e) {
        var t = {};
        return e && (t.year = e.slice(0, 4), t.month = e.slice(5, 7), t.day = e.slice(8, 10)), t.day + "-" + t.month + "-" + t.year
    }, u(function() {
        ! function() {
            n.loadDone = !1, null == a.user && (l.setItem("stateLogin", {
                state: "infor-user",
                param1: f,
                param2: n.nameUser
            }), t.go("login"));
            h.getProfile("view", f, function(e) {
                200 == e.data.status && (n.loadDone = !0, n.inforUser = e.data.result.public)
            })
        }()
    }, 2e3), sendGA("pageview", "profile")
}]), angular.module("mazii").directive("ngDetailTranslate", function() {
    return {
        restrict: "E",
        templateUrl: "views/modal/detail-translate-modal/main.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "$http", "$timeout", "$state", function(e, t, n, a, i) {
            t.detail = {}, t.closeModal = function() {
                $("#detail-trans-modal").modal("hide")
            }, t.$on("detailTrans", function() {
                setTimeout(function() {
                    t.detail = t.data, t.$apply()
                }, 500)
            }), t.goCommunity = function() {
                $("#detail-trans-modal").modal("hide"), setTimeout(function() {
                    i.go("community")
                }, 1e3)
            }
        }]
    }
}), angular.module("mazii").directive("ngCropAvatar", function() {
    return {
        restrict: "E",
        templateUrl: "views/modal/crop-image/main.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "localstoreServ", "exampleServer", function(t, n, e, a) {
            var i, r;
            n.closeModal = function() {
                $("#modal-crop-avatar").modal("hide")
            }, n.myImage = "", n.myCroppedImage = "";

            function o(e) {
                i = e.currentTarget.files[0];
                var t = new FileReader;
                t.onload = function(t) {
                    n.$apply(function(e) {
                        e.myImage = t.target.result
                    })
                }, t.readAsDataURL(i)
            }
            setTimeout(function() {
                angular.element(document.querySelector(".fileInput-avatar")).on("change", o)
            }, 5e3), n.chooseOk = function(e) {
                n.data && n.data.profile_id ? (r = "update", a.postAvatar(r, e, function(e) {
                    200 == e.status && (200 == e.data.status ? t.$broadcast("changeImageOk") : swal("Đã có lỗi xảy ra, hãy thử lại sau"))
                })) : (r = "new", a.postAvatar(r, e, function(e) {
                    200 == e.status && (200 == e.data.status ? t.$broadcast("changeImageOk") : swal("Đã có lỗi xảy ra, hãy thử lại sau"))
                })), $("#modal-crop-avatar").modal("hide")
            }
        }]
    }
}), angular.module("mazii").controller("DetailGrammarController", ["$rootScope", "$scope", "$state", "$stateParams", "maziiServ", "localstoreServ", "dictUtilSer", "$window", function(a, t, e, n, i, r, o, s) {
    var l, c = n.id;
    s.scroll(0, 0);

    function u(e) {
        i.getDetailGrammar(e).then(function(e) {
            200 == e.status && (t.inforGrammar = e.grammar, t.detailGrammar = e.grammar.usages, function(e) {
                var t = "[Ngữ pháp] ";
                e && e.level && (t = "[Ngữ pháp " + e.level + "] "), $("#site-title").html(t + e.title + "| " + e.title + " とは"), $(".site-name").html(t + e.title + "| " + e.title + " とは"), $(".site-title").attr("content", t + e.title + "| " + e.title + " とは");
                var n = "";
                if (e.usages)
                    for (var a = 0; a < e.usages.length; a++) {
                        n += "Cấu trúc: ";
                        var i = e.usages[a];
                        i.synopsis && (n += i.synopsis), i.mean && (n += " ---------- ", n += "Ý nghĩa: " + i.mean), i.explain && (n += ". ", n += i.explain)
                    }
                $(".site-desc").attr("content", n), $("#site-url").attr("content", window.location.href), $("#site-keyword").attr("content", HOME_PAGE_KEYWORDS)
            }(e.grammar), o.safeApply(t), a.htmlReady())
        })
    }
    t.goGramNext = function(e) {
        u(c = e)
    }, t.colorLevel = function(e) {
        return e
    };
    var d = r.getItem("grammar-search");
    l = d ? d.query : "", t.goBack = function() {
        e.go("search", {
            type: "g",
            query: l
        })
    }, t.setQueryGrammar = function(e, t, n) {
        null == a.user ? swal("Đăng nhập để sử dụng tính năng") : ($("#myNote").modal("show"), a.meanMyNote = n, a.$broadcast("setQueryGrammar", {
            query: e,
            type: t,
            id: c
        }))
    }, t.cvKanji = function(e) {
        var t = e.indexOf("=>");
        return e.substr(0, t)
    }, t.cvMean = function(e) {
        var t = e.indexOf("=>");
        return e.substr(t + 2, e.length)
    }, t.convertCate = function(e) {
        return e && 20 < e.length ? e.slice(0, 19) + "..." : e
    }, u(c)
}]), angular.module("mazii").controller("DictExtraController", ["$rootScope", "$scope", "$state", "exampleServer", "dictUtilSer", "localstoreServ", "$interval", "$window", function(e, o, a, i, s, r, l, t) {
    o.chooseErr = !1, e.title = "Từ điển mở", o.dataSentence = {}, o.showTab = "week", o.loadDoneData = !1, o.isMemberDict = !1, o.showAnswer = !1, o.startExam = !1;
    var c, u = [],
        n = [],
        d = [],
        m = 0,
        h = null,
        g = 300,
        p = r.getItem("inforUser");
    o.inforUser = p, t.scrollTo(0, 0);

    function f() {
        t.scrollTo(0, 0), i.getSentenceDict(function(e) {
            if (o.loadDoneData = !0, m = 0, 200 == e.status) {
                var t = e.data,
                    n = 0;
                if (t.translate && 0 < t.translate.length) {
                    t.translate = s.shuffleArray(t.translate), n = 2 < t.translate.length ? 2 : t.translate.length;
                    for (var a = 0; a < n; a++) u.translate || (u.translate = []), u.translate.push(w(t.translate[a]))
                }
                var i = 5 - n;
                if (t.words && 0 < t.words.length) {
                    t.words = s.shuffleArray(t.words), t.words.length < i && (i = t.words.length);
                    for (var r = 0; r < i; r++) u.words || (u.words = []), u.words.push(w(t.words[r]))
                }
                o.dataDict = u
            }
        })
    }

    function v() {
        i.getRankDict(function(e) {
            200 == e.status && (n = e.data, o.dataRank = n)
        })
    }

    function y() {
        i.getHistoryDict(function(e) {
            if (200 == e.status) {
                var t = e.data;
                if (!(o.listHistory = t) || 0 == t.length) return void(o.dataHistory = null);
                for (var n = 0; n < t.length; n++) 1 == t[n].status && (d.correct || (d.correct = []), d.correct.push(t[n]));
                o.dataHistory = d
            } else o.dataHistory = null
        })
    }
    o.showSuggest = function(e) {
        e.suggest = !0
    }, o.sendAnswer = function(t, e) {
        if ("trans" == e) {
            if (!t.myTrans) return;
            i.answerSentenceDict(t.id, 0, null, t.myTrans, "word", function(e) {
                setTimeout(function() {
                    $(".box-main .question-" + t.id).fadeOut()
                }, 100), 5 == ++m && f()
            })
        } else if ("word" == e) {
            if (0 == t.arrTrans.length) return;
            i.answerSentenceDict(t.id, 0, t.arrTrans, "", "trans", function(e) {
                setTimeout(function() {
                    $(".box-main .question-" + t.id).fadeOut()
                }, 100), 5 == ++m && f()
            })
        }
    }, o.changeQuest = function() {
        u = [], o.dataDict = [], f()
    }, o.showTabRank = function(e, t) {
        $(".select-time div").removeClass("sl-active"), $(t.currentTarget).addClass("sl-active"), o.showTab = e
    };
    var w = function(e) {
        return null == e || e.phonetic && e.phonetic != e.word && (e.furigana = s.mergeKanjiAndHiragana(e.word, e.phonetic)), e
    };

    function _(e, t, n) {
        return n = n || "0", (e += "").length >= t ? e : new Array(t - e.length + 1).join(n) + e
    }
    o.startTest = function() {
        o.startExam = !0, o.isMemberDict = !1, i.getExamDict(function(e) {
            c = e, o.dataQuestExam = c, h = l(b, 1e3)
        })
    }, o.resultTest = function() {
        if (!o.showAnswer) {
            l.cancel(h), h = null, o.showAnswer = !0;
            for (var e = 0, t = c.data, n = 0; n < t.length; n++) null != t[n].uAnswer && String(parseInt(t[n].uAnswer)) == String(t[n].anCorrect) && e++;
            4 < (o.numberRight = e) ? swal({
                title: "Kết quả",
                text: "Bạn đã trả lời đúng " + e + "/10 câu hỏi. Chúc mừng bạn đã trở thành thành viên chính thức của Cộng đồng mở ^^ ! ",
                className: "swal-dict-extra"
            }).then(function(e) {
                o.isMemberDict = !0, p.dict_register = 1, i.allowUserDict(function(e) {}), r.setItem("inforUser", p), f(), v(), y()
            }) : swal({
                title: "Kết quả",
                text: "Bạn đã trả lời đúng " + e + "/10 câu hỏi. Xin lỗi, bạn chưa đủ điều kiện để tham gia vào Cộng đồng mở. Hãy quay lại trong thời gian sắp tới nhé !",
                className: "swal-dict-extra"
            }).then(function(e) {
                a.go("search")
            })
        }
    }, o.choiceAnswer = function(e, t) {
        return 0 == o.showAnswer || null == e.uAnswer || t != parseInt(e.uAnswer) ? "" : String(parseInt(e.uAnswer)) == String(e.anCorrect) ? "choice-right" : "choice-false"
    };
    var b = function() {
        var e = Math.floor(g / 60),
            t = g % 60;
        o.timeTest = _(e, 2) + ":" + _(t, 2), 0 == --g && (o.timeTest = 0, o.resultTest())
    };
    p && 1 == p.dict_register && (o.isMemberDict = !0, f(), v(), y())
}]), angular.module("mazii").directive("ngPostQuest", function() {
    return {
        restrict: "E",
        templateUrl: "views/modal/post-quest/main.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "communityServer", "localstoreServ", function(a, i, r, e) {
            i.notify = "", i.statusPost = "Đăng tin", i.addMyPost = !0;
            var o, s, l = "";
            i.$on("change-type-category", function() {
                ! function() {
                    var e = window.location.href,
                        t = e.indexOf("category=");
                    if (-1 != t) {
                        o = e.substr(t + 9, e.length);
                        for (var n = 0; n < i.data.length; n++) o == i.data[n].id && (i.selectCategory = i.data[n])
                    } else i.selectCategory = ""
                }()
            }), i.$on("edit-my-post", function(e, t) {
                for (var n = 0; n < i.data.length; n++) t.category.category_id == i.data[n].id && (i.selectCategory = i.data[n]);
                i.inputTitle = t.title, $("#quest-post .ql-editor").html(t.content), s = t.id, i.statusPost = "Cập nhật", i.addMyPost = !1
            }), setTimeout(function() {
                $(".content-cate.content-cate-2").addClass("active")
            }, 300), i.closeModal = function() {
                i.notify = "", i.inputTitle = "", i.addMyPost = !0, i.statusPost = "Đăng tin", $("#quest-post .ql-editor").html(""), $("#modal-post-quest").modal("hide")
            };
            var c = !0;
            i.postQuest = function(e) {
                if (i.selectCategory) {
                    if (o = i.selectCategory.id, 0 != c) {
                        var t = $("#quest-post .ql-editor").html();
                        i.notify = "";
                        var n = function(e) {
                            var t = document.createElement("div");
                            return t.innerHTML = e, t.textContent || t.innerText || null
                        }(t);
                        if (n = n.trim(), !t || !n || 0 == n.length) return i.notify = "Hãy nhập câu hỏi của bạn", i.statusPost = "add" == e ? "Đăng tin" : "Cập nhật", void(c = !0);
                        l = i.inputTitle, i.statusPost = "Đang xử lý", "add" == e ? r.addPost(t, o, l, function(e) {
                            i.statusPost = "Đăng tin", c = !0, -2 == e.data.status ? (i.notify = 'Câu hỏi chứa nội dung không phù hợp ! Bạn vui lòng kiểm tra lại ở phần "Câu hỏi của bạn" !', setTimeout(function() {
                                a.$broadcast("postDone"), i.closeModal()
                            }, 1e3)) : (a.$broadcast("postDone"), i.closeModal()), i.contentQuest = ""
                        }) : "update" == e && r.updateMyPost(s, t, o, l, function(e) {
                            i.statusPost = "Cập nhật", c = !0, -2 == e.data.status ? (i.notify = 'Câu hỏi chứa nội dung không phù hợp ! Bạn vui lòng kiểm tra lại ở phần "Câu hỏi của bạn" !', setTimeout(function() {
                                a.$broadcast("postDone"), i.closeModal()
                            }, 1e3)) : (a.$broadcast("postDone"), i.closeModal()), i.contentQuest = ""
                        })
                    }
                } else i.notify = "Hãy chọn chủ để cho câu hỏi"
            }
        }]
    }
}), angular.module("mazii").directive("ngReportPost", function() {
    return {
        restrict: "E",
        templateUrl: "views/modal/report-post/main.html",
        scope: {
            data: "=data"
        },
        controller: ["$rootScope", "$scope", "communityServer", function(e, n, t) {
            var a = {};
            n.notify = "", n.$watch("data", function(e, t) {
                e != t && (n.notify = "", a = e)
            }), n.sendReport = function(e) {
                if (n.notify = "", !e) return n.notify = "Hãy điền lý do báo cáo bài viết", void(n.colorNotify = "txt-err");
                t.reportPost(a.data.id, a.level, e, function(e) {
                    200 == e.status && (n.notify = "Báo cáo bài viết thành công !", n.colorNotify = "txt-success"), setTimeout(function() {
                        n.reason = "", $("#modal-report-post").modal("hide")
                    }, 1500)
                })
            }, n.closeModal = function() {
                $("#modal-report-post").modal("hide")
            }
        }]
    }
});