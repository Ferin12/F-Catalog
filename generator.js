!function() {
    var t, e, n;
    !function(i) {
        function o(t, e) {
            return y.call(t, e)
        }
        function r(t, e) {
            var n, i, o, r, l, s, a, c, u, d, p, f = e && e.split("/"), h = b.map, m = h && h["*"] || {};
            if (t && "." === t.charAt(0))
                if (e) {
                    for (t = t.split("/"), l = t.length - 1, b.nodeIdCompat && Y.test(t[l]) && (t[l] = t[l].replace(Y, "")), t = f.slice(0, f.length - 1).concat(t), u = 0; u < t.length; u += 1)
                        if (p = t[u], "." === p)
                            t.splice(u, 1), u -= 1;
                        else if (".." === p) {
                            if (1 === u && (".." === t[2] || ".." === t[0]))
                                break;
                                u > 0 && (t.splice(u - 1, 2), u -= 2)
                        }
                        t = t.join("/")
                } else 
                    0 === t.indexOf("./") && (t = t.substring(2));
            if ((f || m) && h) {
                for (n = t.split("/"), u = n.length; u > 0; u -= 1) {
                    if (i = n.slice(0, u).join("/"), f)
                        for (d = f.length; d > 0; d -= 1)
                            if (o = h[f.slice(0, d).join("/")], o && (o = o[i])) {
                                r = o, s = u;
                                break
                            }
                    if (r)
                        break;
                    !a && m && m[i] && (a = m[i], c = u)
                }
                !r && a && (r = a, s = c), r && (n.splice(0, s, r), t = n.join("/"))
            }
            return t
        }
        function l(t, e) {
            return function() {
                var n = x.call(arguments, 0);
                return "string" != typeof n[0] && 1 === n.length && n.push(null), f.apply(i, n.concat([t, e]))
            }
        }
        function s(t) {
            return function(e) {
                return r(e, t)
            }
        }
        function a(t) {
            return function(e) {
                v[t] = e
            }
        }
        function c(t) {
            if (o(g, t)) {
                var e = g[t];
                delete g[t], w[t]=!0, p.apply(i, e)
            }
            if (!o(v, t)&&!o(w, t))
                throw new Error("No " + t);
            return v[t]
        }
        function u(t) {
            var e, n = t ? t.indexOf("!"): - 1;
            return n>-1 && (e = t.substring(0, n), t = t.substring(n + 1, t.length)), [e, t]
        }
        function d(t) {
            return function() {
                return b && b.config && b.config[t] || {}
            }
        }
        var p, f, h, m, v = {}, g = {}, b = {}, w = {}, y = Object.prototype.hasOwnProperty, x = [].slice, Y = /\.js$/;
        h = function(t, e) {
            var n, i = u(t), o = i[0];
            return t = i[1], o && (o = r(o, e), n = c(o)), o ? t = n && n.normalize ? n.normalize(t, s(e)) : r(t, e) : (t = r(t, e), i = u(t), o = i[0], t = i[1], o && (n = c(o))), {
                f: o ? o + "!" + t: t,
                n: t,
                pr: o,
                p: n
            }
        }, m = {
            require: function(t) {
                return l(t)
            },
            exports: function(t) {
                var e = v[t];
                return "undefined" != typeof e ? e : v[t] = {}
            },
            module: function(t) {
                return {
                    id: t,
                    uri: "",
                    exports: v[t],
                    config: d(t)
                }
            }
        }, p = function(t, e, n, r) {
            var s, u, d, p, f, b, y = [], x = typeof n;
            if (r = r || t, "undefined" === x || "function" === x) {
                for (e=!e.length && n.length ? ["require", "exports", "module"] : e, f = 0; f < e.length; f += 1)
                    if (p = h(e[f], r), u = p.f, "require" === u)
                        y[f] = m.require(t);
                    else if ("exports" === u)
                        y[f] = m.exports(t), b=!0;
                    else if ("module" === u)
                        s = y[f] = m.module(t);
                    else if (o(v, u) || o(g, u) || o(w, u))
                        y[f] = c(u);
                    else {
                        if (!p.p)
                            throw new Error(t + " missing " + u);
                            p.p.load(p.n, l(r, !0), a(u), {}), y[f] = v[u]
                    }
                d = n ? n.apply(v[t], y) : void 0, t && (s && s.exports !== i && s.exports !== v[t] ? v[t] = s.exports : d === i && b || (v[t] = d))
            } else 
                t && (v[t] = n)
        }, t = e = f = function(t, e, n, o, r) {
            if ("string" == typeof t)
                return m[t] ? m[t](e) : c(h(t, e).f);
            if (!t.splice) {
                if (b = t, b.deps && f(b.deps, b.callback), !e)
                    return;
                e.splice ? (t = e, e = n, n = null) : t = i
            }
            return e = e || function() {}, "function" == typeof n && (n = o, o = r), o ? p(i, t, e, n) : setTimeout(function() {
                p(i, t, e, n)
            }, 4), f
        }, f.config = function(t) {
            return f(t)
        }, t._defined = v, n = function(t, e, n) {
            if ("string" != typeof t)
                throw new Error("See almond README: incorrect module build, no module name");
            e.splice || (n = e, e = []), o(v, t) || o(g, t) || (g[t] = [t, e, n])
        }, n.amd = {
            jQuery: !0
        }
    }(), n("amd", function() {}), n("jq", ["utils"], function(t) {
        return function(t, e, n, i, o, r, l, s, a, c, u, d) {
            return d = function(t, e) {
                return new d.i(t, e)
            }, d.i = function(i, o) {
                n.push.apply(this, i ? i.nodeType || i == t ? [i] : "" + i === i ? /</.test(i) ? ((s = e.createElement(o || "q")).innerHTML = i, s.children) : (o && d(o)[0] || e).querySelectorAll(i) : /f/.test(typeof i) ? /c/.test(e.readyState) ? i() : d(e).on("DOMContentLoaded", i) : i : n)
            }, d.i[u = "prototype"] = (d.extend = function(t) {
                for (c = arguments, s = 1; s < c.length; s++)
                    if (u = c[s])
                        for (a in u)
                            t[a] = u[a];
                return t
            })(d.fn = d[u] = n, {
                on: function(t, e) {
                    return t = t.split(i), this.map(function(n) {
                        (i[s = t[0] + (n.b$ = n.b$||++o)] = i[s] || []).push([e, t[1]]), n["add" + r](t[0], e)
                    }), this
                },
                off: function(t, e) {
                    return t = t.split(i), u = "remove" + r, this.map(function(n) {
                        if (c = i[t[0] + n.b$], s = c && c.length)
                            for (; a = c[--s];)
                                e && e != a[0] || t[1] && t[1] != a[1] || (n[u](t[0], a[0]), c.splice(s, 1));
                        else 
                            !t[1] && n[u](t[0], e)
                    }), this
                },
                is: function(t) {
                    return s = this[0], (s.matches || s["webkit" + l] || s["moz" + l] || s["ms" + l]).call(s, t)
                }
            }), d.fn.attr = function(t, e) {
                return void 0 == e ? this[0].getAttribute(t) : (this[0].setAttribute(t, e), this)
            }, d.fn.removeAttr = function(t) {
                return t && this[0].removeAttribute(t), this
            }, d.fn.append = function(t) {
                return this[0].appendChild(t[0]), this
            }, d.fn.preppend = function(t) {
                return this[0].insertBefore(t[0], this[0].firstElementChild), this
            }, d.fn.appendTo = function(t) {
                return t.append(this)
            }, d.fn.preppendTo = function(t) {
                return t.preppend(this)
            }, d.fn.after = function(t) {
                return t[0].parentNode.insertBefore(this[0], t[0].nextSibling), this
            }, d.fn.remove = function() {
                this[0].parentNode.removeChild(this[0])
            }, d.fn.html = function(t) {
                return void 0 == t ? this[0].innerHTML : (this[0].innerHTML = t, this)
            }, d.fn.text = function(t) {
                return void 0 === t ? this[0].textContent || this[0].innerText : (this[0].textContent ? this[0].textContent = t : this[0].innerText = t, this)
            }, d.fn.val = function(t) {
                return void 0 == t ? this[0].value : (this[0].value = t, this)
            }, d.fn.addClass = function(t) {
                return this.forEach(function(e) {
                    var n = e.classList;
                    n.add.apply(n, t.split(/\s/))
                }), this
            }, d.fn.removeClass = function(t) {
                return this.forEach(function(e) {
                    var n = e.classList;
                    n.remove.apply(n, t.split(/\s/))
                }), this
            }, d.fn.css = function(t, e) {
                this.forEach(function(n) {
                    n.style[t] = e
                })
            }, d.ajaxJSON = function(t, e, n) {
                return d.ajax({
                    url: t,
                    method: n ? n: "GET",
                    success: function(t) {
                        e(JSON.parse(t))
                    },
                    error: function(t) {
                        e(!1, t)
                    }
                })
            }, d.ajax = function(t) {
                t = d.extend({
                    url: "",
                    method: "GET",
                    headers: [],
                    data: "",
                    success: function() {},
                    error: function() {}
                }, t);
                var e = new XMLHttpRequest;
                e.open(t.method, t.url, !0);
                for (var n, i = 0; i < t.headers.length; i++)
                    n = t.headers[i].split(":"), e.setRequestHeader(n[0], n[1]);
                return e.onload = function() {
                    e.status >= 200 && e.status < 400 ? t.success(e.responseText, e) : t.error(e)
                }, e.onerror = function() {
                    t.error(e)
                }, "string" != typeof t.data && (t.data = JSON.stringify(t.data)), e.send(t.data), e
            }, d
        }(window, document, [], /\.(.+)/, 0, "EventListener", "MatchesSelector")
    }), n("utils", ["./jq"], function(t) {
        function e() {
            for (var t, n = {}, i = 0; i < arguments.length; i++) {
                t = arguments[i];
                for (var o in t)
                    t.hasOwnProperty(o) && (void 0 != n[o] && "object" == typeof t[o] ? n[o] = e(n[o], t[o]) : n[o] = t[o])
            }
            return n
        }
        function n(t) {
            return function(i) {
                var o = function(n) {
                    return new t(e(i || {}, n || {}))
                };
                return o.extend = n(o), o
            }
        }
        function i() {
            var e = t("script[data-email-generator-api-key]");
            return e.length > 0 ? e.attr("data-email-generator-api-key") : null
        }
        function o(t, e) {
            for (var n in t)
                t.hasOwnProperty(n) ? e(t[n], n) : !1
        }
        return n.extend = function(t) {
            for (var e in t)
                this[e] = t[e];
            return this
        }, {
            extend: e,
            extendInline: t.extend,
            extendable: n,
            getApiKey: i,
            each: o
        }
    }), n("cookie", [], function() {
        return {
            get: function(t) {
                var e = document.cookie.match(new RegExp("(?:^|; )" + t.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
                return e ? decodeURIComponent(e[1]) : void 0
            },
            set: function(t, e, n) {
                n = n || {};
                var i = n.expires;
                if ("number" == typeof i && i) {
                    var o = new Date;
                    o.setTime(o.getTime() + 86400*30*1000 + 1e3 * i), i = n.expires = o
                }
                n.path = '/';
                var now = new Date;
                now.setTime(now.getTime() + 30 * 86400 * 1000);
                now && now.toUTCString && (n.expires = now.toUTCString()), e = encodeURIComponent(e);
                var r = t + "=" + e;
                for (var l in n) {
                    r += "; " + l;
                    var s = n[l];
                    s!==!0 && (r += "=" + s)
                }
                r += ";path=/";
                document.cookie = r;
            }
        }
    }), n("urlRules", [], function() {
        function t(t) {
            var e = {
                contains: function(e) {
                    return t.indexOf(e)>-1
                },
                exactlyMatching: function(e) {
                    return t === e
                },
                endWith: function(e) {
                    return new RegExp("(.+)" + e).test(t)
                },
                startWith: function(e) {
                    return new RegExp(e + "(.+)").test(t)
                },
                regExp: function(e) {
                    return new RegExp(e).test(t)
                }
            };
            this.needShowForm = function(t) {
                if (!t || 0 == t.length)
                    return !0;
                for (var n=!1, i=!1, o=!1, r = 0; r < t.length; r++) {
                    var l = t[r], s = e[l.urlRule](l.urlValue);
                    s && "hideOn" == l.action && (i=!0), s && "showOnly" == l.action && (n=!0), "showOnly" == l.action && (o=!0)
                }
                return i?!1 : o&&!n?!1 : !0
            }
        }
        return t
    }), n("api", ["jq", "utils"], function(t, e) {
        function n(t, e) {
            return {
                subscription: function(n, i) {
                    var o = new XMLHttpRequest;
                    o.open("POST", "https://forms.dashamail.ru/subscribe.php?list_id=" + e, !0), o.setRequestHeader("Content-Type", "application/json"), o.onreadystatechange = function() {
                        4 == o.readyState && i(o.status >= 200 && o.status < 300 ? {
                            status: "ok",
                            message: "Спасибо! Для подтверждения Вашего адреса электронной почты перейдите по ссылке в письме, которое вскоре появится в Вашем почтовом ящике."
                        } : 409 === o.status ? {
                            status: "error",
                            message: "Вы уже подписаны на эту рассылку."
                        } : 408 === o.status ? {
                            status: "error",
                            message: "У нашего клиента достигнут лимит по количеству активных подписчиков на тарифном плане."
                        } : {
                            status: "error",
                            message: "Извините, произошла ошибка."
                        })
                        if (o.readyState ==4 && o.status == 299 && o.responseText != ''){
	                        window.location = o.responseText;
                        }
                    }, o.send(JSON.stringify(n))
                }            }
        }
        return n
    }), n("components/component", ["utils"], function(t) {
        var e = function() {
            return {
                extend: t.extendable.extend
            }
        }();
        return {
            create: function(n) {
                return n.prototype = e, n.extend = t.extendable(n), n
            }
        }
    }), n("components/form", ["./component", "../api", "cookie"], function(t, e, n) {
        function i(t) {
            this.onInitialize = function() {}, this.onConstructorInitialize = function() {}, this.startSending = function() {}, this.stopSending = function() {}, this.extend(t), this.template = new this.templateClass;
            var i = this, o = new e(t.baseApiUrl, t.apiKey), r=!1;
            this.sendForm = function(t, e) {
                if (r!==!0)
                    if (r=!0, this.startSending(this.template), this.template.validateFields(!0)) {
                        var n = this.template.getFieldsValues();
                        o.subscription(n, function(e) {
                            r=!1, i.stopSending(i.template), t && t(e)
                        })
                    } else 
                        r=!1, i.stopSending(i.template), e && e({
                            status: "errorValidation"
                        })
            }, this.closeForm = function() {
                this.template.getElement().remove(), this.hide()
            }, this.hide = function() {
                n.set("SubscriptionWidget_" + this.apiKey, "hidden")
            }, t.settings.constructorMode && t.settings.constructorMode===!0 ? this.onConstructorInitialize(this.template, t) : this.onInitialize(this.template, t)
        }
        return t.create(i)
    }), n("components/inputs/input", ["utils", "jq"], function(t, e) {
        function n(n) {
            var i = this;
            if (this.template = n.template ? n.template : "", this.value = n.value || null, this.label = n.label || "", this.placeholder = n.placeholder || "", this.fieldMergeId = n.fieldMergeId, this.errorMessages = t.extend({
                required: "Это поле не может быть пустым"
            }, n.defaultErrors || {}, n.errorMessages || {}), this.showLabel = n.showLabel ||!1, this.showMessages = n.showMessages ||!1, this.backlightInput = n.backlightInput ||!1, this.extend(n), this.beforeRender(), this.$ = this.createHTML(n.$context, this.template), this.setValue = function(t) {
                var e = this.value;
                this.value = t, this.onChangedValue(t, e)
            }, this.getValue = function() {
                return this.value
            }, this.$input = this.$label = this.$message = null, n.valueSelector && (this.$input = e(n.valueSelector, this.$), this.$input.on("keyup", function() {
                i.setValue(e(this).val()), i.clearErrors(), i.validate(!0)
            }), this.$input.on("change", function() {
                e(this).val() != i.getValue() && (i.setValue(e(this).val()), i.clearErrors(), i.validate(!0))
            }), this.$input.attr("placeholder", this.placeholder), this.$input.attr("name", "merge_"+this.fieldMergeId)), n.labelSelector)
                if (this.$label = e(n.labelSelector, this.$), this.showLabel) {
                    var o = "" != this.label ? this.label: this.fieldName;
                    var r = '';
                    if (this.required===!0) {r = '*';}
                    this.$label.text(o+r)
                } else 
                    this.$label.css("display", "none");
            n.messageSelector && (this.$message = e(n.messageSelector, this.$)), this.onInitialize(this.$)
        }
        return n.prototype = {
            extend: t.extendable.extend,
            createHTML: function(t, n) {
                var i = e(n);
                return t.append(i), i
            },
            onInitialize: function(t) {},
            beforeRender: function() {},
            onChangedValue: function(t) {},
            validate: function(t) {
                try {
                    var e = this.getValue(), n = e ? e.trim().length: 0;
                    if (this.required===!0 && (1 > n || e=='Не выбрано' || e=='Not selected'))
                        throw new this.validationErrorException(this.errorMessages.required);
                    this.onValidate && this.onValidate(this.getValue())
                } catch (i) {
                    return t && t===!0 && this.error(i.getMessage()), !1
                }
                return !0
            },
            error: function(t) {
                this.$input && this.$input.addClass("m365-input-error"), this.$message && this.$message.text(t)
            },
            clearErrors: function() {
                this.$input && this.$input.removeClass("m365-input-error"), this.$message && this.$message.text("")
            },
            validationErrorException: function(t) {
                this.getMessage = function() {
                    return t
                }
            }
        }, n.extend = t.extendable(n), {
            createInput: function(t) {
                return n.extend(t)
            }
        }
    }), n("components/inputs/text", ["utils", "jq", "./input"], function(t, e, n) {
        return n.createInput({
            template: '<div class="m365-form-group">                       <label class="m365-input-label"></label>                       <input type="text" class="m365-input-text" />                       <div class="m365-input-message"></div>                   </div>',
            valueSelector: ".m365-input-text",
            labelSelector: ".m365-input-label",
            messageSelector: ".m365-input-message",
            createHTML: function(t, n) {
                var i = e(n);
                switch (t.append(i), this.fieldType) {
                case"email":
                    e(".m365-input-text", i).attr("type", "email");
                    break;
                case"integer":
                    e(".m365-input-text", i).attr("type", "number");
                    break;
                case"decimal":
                    e(".m365-input-text", i).attr("type", "number"), e(".m365-input-text", i).attr("step", "any");
                    break;
                case"url":
                    e(".m365-input-text", i).attr("type", "url");
                    break;
                case"date":
                    e(".m365-input-text", i).attr("type", "date")
                }
                return i
            }
        })
    }), n("components/inputs/integer", ["utils", "./text"], function(t, e) {
        return e.extend({
            onInitialize: function(t) {},
            onValidate: function(t) {}
        })
    }), n("components/inputs/email", ["utils", "./text"], function(t, e) {
        return e.extend({
            defaultErrors: {
                wrong: "Недопустимый адрес"
            },
            onValidate: function(t) {
                var e = /^\S+@\S+\.\S+$/;
                if (!e.test(t))
                    throw new this.validationErrorException(this.errorMessages.wrong)
            }
        })
    }), n("components/inputs/decimal", ["utils", "./text"], function(t, e) {
        return e.extend({
            defaultErrors: {},
            onValidate: function(t) {}
        })
    }), n("components/inputs/url", ["utils", "./text"], function(t, e) {
        return e.extend({
            defaultErrors: {
                wrong: "Неверный формат URL"
            },
            onValidate: function(t) {
                var e = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
                if (!e.test(t))
                    throw new this.validationErrorException(this.errorMessages.wrong)
            }
        })
    }), n("components/inputs/date", ["utils", "./text"], function(t, e) {
        return e.extend({
            onInitialize: function(t) {},
            defaultErrors: {
                wrong: "Неверный формат даты (ДД.ММ.ГГГГ)"
            },
            onValidate: function(e) {
                var t = /(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d/;
                if (!t.test(e))
                    throw new this.validationErrorException(this.errorMessages.wrong)
            }
        })
    }), n("components/inputs/radio", ["utils", "jq", "./input"], function(t, e, n) {
        return n.createInput({
            template: '<div class="m365-form-group">                       <label class="m365-input-label"></label>                       <div class="f-radio-items"></div>                       <div class="m365-input-message"></div>                   </div>',
            labelSelector: ".m365-input-label",
            messageSelector: ".m365-input-message",
            createHTML: function(n, i) {
                var o = e(i);
                n.append(o);
                var r = e(".m365-radio-items", o), l = this;
                return t.each(this.items, function(t) {
                    var n = "m365-radio-" + l.fieldMergeId + Math.floor(1e5 * Math.random()), i = e('<div class="m365-radio-item">                            <label for="' + n + '">                                <input type="radio" id="' + n + '" name="' + "merge_"+l.fieldMergeId + '" value="' + t.value + '"/>' + t.text + "                            </label>                       </div>");
                    t.value == l.value && e("input", i).attr("checked", "checked"), i.appendTo(r)
                }), e("input[type=radio]", o).on("click", function() {
                    var t = e(this).attr("value");
                    l.setValue(t)
                }), o
            }
        })
    }), n("components/inputs/radioBool", ["utils", "./radio"], function(t, e) {
        return e.extend({
            onValidate: function(t) {},
            beforeRender: function() {
                this.required===!0 ? this.items = [{
                    text: this.trueText,
                    value: "true"
                }, {
                    text: this.falseText,
                    value: "false"
                }
                ] : this.items = [{
                    text: this.undefinedText,
                    value: "null"
                }, {
                    text: this.trueText,
                    value: "true"
                }, {
                    text: this.falseText,
                    value: "false"
                }
                ], void 0 == this.value && (this.value = "null")
            },
            onInitialize: function(t) {}
        })
    }), n("components/inputs/select", ["utils", "jq", "./input"], function(t, e, n) {
        return n.createInput({
            template: '<div class="m365-form-group">                       <label class="m365-input-label"></label>                       <div class="m365-select-items-container">                           <select class="m365-select-items">                           </select>                       </div>                       <div class="m365-input-message"></div>                  </div>',
            labelSelector: ".m365-input-label",
            messageSelector: ".m365-input-message",
            createHTML: function(n, i) {
                var o = e(i);
                n.append(o);
                var r = e(".m365-select-items", o);
                this.$select = r;
                var l = this;
                var h = 0;
                return t.each(this.fieldItems, function(t) {
                    var n = e('<option value="' + t.value + '">' + t.text + "</option>");
                    (t.value == l.value || h == 0) && n.attr("selected", "selected"), n.appendTo(r);
                    if (h == 0){l.value = t.value;}
                    h++;
                }), e("select.m365-select-items", o).on("change", function() {
                    var t = e(this).val();
                    l.setValue(t)
                }), o
            }
        })
    }), n("components/inputs/selectBool", ["utils", "./select"], function(t, e) {
        return e.extend({
            onValidate: function(t) {},
            beforeRender: function() {
                this.required===!0 ? this.items = [{
                    text: this.trueText,
                    value: "true"
                }, {
                    text: this.falseText,
                    value: "false"
                }
                ] : this.items = [{
                    text: this.undefinedText,
                    value: "null"
                }, {
                    text: this.trueText,
                    value: "true"
                }, {
                    text: this.falseText,
                    value: "false"
                }
                ], void 0 == this.value && (this.value = "null")
            }
        })
    }), n("components/inputs/inputs", ["utils", "./text", "./integer", "./email", "./decimal", "./url", "./date", "./radio", "./radioBool", "./select", "./selectBool"], function(t, e, n, i, o, r, l, s, a, c, u) {
        var d = {
            text: e,
            integer: n,
            email: i,
            decimal: o,
            url: r,
            date: l,
            radio: s,
            radioBool: a,
            select: c,
            selectBool: u
        };
        return {
            create: function(e, n) {
                var i = this.getFieldClassByType(e.fieldType);
                return new i(t.extend(e, {
                    $context: n
                }))
            },
            getFieldClassByType: function(t) {
                return d[t]
            }
        }
    }), n("components/template", ["./component", "jq", "utils", "./inputs/inputs"], function(t, e, n, i) {
        function o(t) {
            function o(t) {
                var e = {};
                t.backgroundColor && (e.backgroundColor = t.backgroundColor), t.submitButtonBackgroundColor && (e.submitButtonBackgroundColor = t.submitButtonBackgroundColor), t.submitButtonColor && (e.submitButtonColor = t.submitButtonColor), t.textColor && (e.textColor = t.textColor), t.inputsLabelColor && (e.inputsLabelColor = t.inputsLabelColor), t.inputsTextColor && (e.inputsTextColor = t.inputsTextColor), s.setBackground(e), s.setContentStyles(e)
            }
            var r, l = {}, s = this;
            this.createElement = function() {
                return r = e(t.templateHtml)
            }, this.getElement = function() {
                return r
            }, this.getContainer = function() {
                if (this.settings.elementId) {
                    var t = e("#" + this.settings.elementId);
                    return t.length || (t = e("body")), t
                }
                return e("body")
            }, this.setData = function(t) {
                for (var n, r = this.getElement(), s = e(".m365-form-groups", r), a = e(".m365-form-content", r), c = 0; c < t.fields.length; c++)
                    n = t.fields[c], l["merge_"+n.fieldMergeId] = i.create(n, s);
                o(t), this.settings = t, t.title ? e(".m365-title", a).text(t.title) : e(".m365-title", a)[0].style.display = "none", t.description ? e(".m365-description", a).html(t.description) : e(".m365-description", a)[0].style.display = "none", t.subscribeButtonText && e(".m365-btn.m365-subscribe", a).attr("value", t.subscribeButtonText), t.fz152 ? e(".m365-fz152-policy", r).attr("href",t.fz152) : e(".m365-fz152", r)[0].style.display = "none", t.fz152 ? e(".m365-fz152-policy", r)[0].style.color = t.submitButtonBackgroundColor : void(0), this.onSetData && this.onSetData(t)
            }, this.setBackground = function(t) {
                var e = this.getElement();
                t.backgroundColor && e.css("background", t.backgroundColor)
            }, this.setContentStyles = function(t) {
                var n = this.getElement();
                t.submitButtonBackgroundColor && e(".m365-btn", n).css("background", t.submitButtonBackgroundColor), t.submitButtonColor && e(".m365-btn", n).css("color", t.submitButtonColor), t.textColor && (e(".m365-title", n).css("color", t.textColor), e(".m365-description", n).css("color", t.textColor), e(".m365-form-groups .m365-radio-items", n).css("color", t.textColor)), t.inputsLabelColor && e(".m365-input-label", n).css("color", t.inputsLabelColor), t.inputsTextColor && (e(".m365-form-groups .m365-input-text", n).css("color", t.inputsTextColor), e(".m365-form-groups .m365-select-items", n).css("color", t.inputsTextColor))
            }, this.validateFields = function(t) {
                var e=!0;
                return n.each(l, function(n) {
                    n.validate(t) || (e=!1)
                }), e
            }, this.getFieldsValues = function() {
                var t = {};
                return n.each(l, function(e, n) {
                    t[n] = e.getValue()
                }), t
            }, this.showSuccess = function(t, e) {
                var n = this.settings.successDescription || t || "", i = this.settings.successTitle || e || "";
                return this._showMessage(n, i)
            }, this.showError = function(t, e) {
                var n = t || "", i = e || "";
                return this._showMessage(n, i)
            }, this._showMessage = function(t, n) {
                var i = this.getElement(), o = e(".m365-form-message", i);
                n ? e(".m365-title", o).text(n) : e(".m365-title", o).css("display", "none"), t ? e(".m365-description", o).html(t) : e(".m365-description", o).css("display", "none"), i.addClass("m365-done")
            }, this.extend(t)
        }
        return t.create(o)
    }), n("widgets/popup", ["jq", "../api", "../components/form", "../components/template"], function(t, e, n, i) {
        var o = '    <div class="m365-popup"><noindex>         <div class="m365-form-content">     <div class="m365-logo-container"></div>       <div class="m365-title"></div>            <div class="m365-description"></div>            <div class="m365-form-groups"></div>            <div class="m365-btn-container">                <input type="submit" class="m365-btn m365-subscribe" value="">            </div>            <div class="m365-form-message">                <div class="m365-title"></div>                <div class="m365-description"></div>            </div>            <div class="m365-close-icon"></div><div class="m365-fz152">Нажимая на кнопку, вы даете согласие на обработку своих персональных данных согласно 152-ФЗ. <a href="#" class="m365-fz152-policy" target="_blank">Подробнее</a></div>         </div>        <div class="m365-popup-overlay"></div>    </noindex></div>', r = i.extend({
            templateHtml: o,
            onSetData: function(e) {
                var n = this.getElement();
                n.appendTo(this.getContainer());
                var i = e.logotypeUrl;
                if (i && (i = i.trim()), i) {
                    var r = t(".m365-logo-container", n);
                    if (r.css("display", "block"), o[i]) {
                        var l = o[i];
                        l.style.width = "100%", l.style.maxWidth = l.width + "px", e.maxWidthByLogotype===!0 && n.css("max-width", l.width + 40 + "px"), r[0].appendChild(l)/* , n.addClass("m365-popup-showed")*/
                    } else {
                        var l = new Image;
                        l.onload = function() {
                            this.style.width = "100%", this.style.maxWidth = this.width + "px", e.maxWidthByLogotype===!0 && n.css("max-width", this.width + 40 + "px"), r[0].appendChild(this)/* , n.addClass("m365-popup-showed")*/
                        }, l.onerror = function() {
                            r[0].appendChild(this)/* , n.addClass("m365-popup-showed")*/
                        }, l.src = i, o[i] = l
                    }
                } /*else 
                     , n.addClass("m365-popup-showed")*/
            },
            setBackground: function(e) {
                var n = this.getElement();
                e.backgroundColor && (t(".m365-form-content", n).css("background", e.backgroundColor), t(".m365-form-message", n).css("background", e.backgroundColor))
            }
        }), l = n.extend({
            templateClass: r,
            onInitialize: function(e, n) {
                function i(t) {
	                setTimeout('Прошло 30 секунд',t);
                    setTimeout(function() {
                        o()
                    }, t)
                }
                function o() {
                    s=!0, r.addClass("m365-popup-showed"), r.css("margin-top", window.scrollY + "px"), t("html,body").css("overflow-y","hidden")
                }
                var r = e.createElement(), l = this;
                e.setData(n.settings);
                var s=!1;
                n.settings.showOnExit && n.settings.showOnExit===!0 && t(document).on("mouseout.windowout", function(e) {
                    if (!s) {
                        var n = e ? e: window.event, i = n.relatedTarget || n.toElement;
                        i && "HTML" != i.nodeName || (t(document).off("mouseout.windowout"), o())
                    }
                }), n.settings.showOnPageLoad && n.settings.showOnPageLoad===!0 && i(1e3 * ((n.settings.loadingDelay || 0) + 1) - 1e3), t(".m365-btn.m365-subscribe", r).on("click", function(t) {
                    t.stopImmediatePropagation(), l.sendForm(function(t) {
                        "ok" == t.status ? e.showSuccess(t.message) : e.showError(t.message)
                    })
                }), t(".m365-close-icon", r).on("click", function() {
                    l.closeForm(), t("html,body").css("overflow-y","auto")
                })
            },
            onConstructorInitialize: function(e, n) {
                var i = e.createElement(), o = this;
                e.setData(n.settings), t(".m365-btn.m365-subscribe", i).on("click", function(t) {
                    t.stopImmediatePropagation(), o.sendForm(function(t) {
                        "ok" == t.status ? e.showSuccess(t.message) : e.showError(t.message)
                    })
                })
            },
            startSending: function(e) {
                var n = e.getElement();
                t(".m365-btn.m365-subscribe", n).attr("disabled", "disabled")
            },
            stopSending: function(e) {
                var n = e.getElement();
                t(".m365-btn.m365-subscribe", n).removeAttr("disabled")
            }
        });
        return l
    }), n("widgets/index", ["cookie", "../urlRules", "./popup"], function(t, e, r) {
        function l() {
            this.add = function(t) {
                return this.push(t), this
            }
        }
        l.prototype = Array.prototype;
        var s = new e(window.location.href);
        return {
            Widget: {
                popup: r
            },
            createByConfig: function(t, e) {
                var n, i = new l;
                for (var o in t)
                    t.hasOwnProperty(o) && (t[o].apiKey = o, t[o].baseApiUrl = e, n = this.createBySettings(t[o]), n && i.add(n));
                return i
            },
            createBySettings: function(e) {
                if (/MSIE [6-9]\.0/.test(navigator.userAgent))
                    throw new Error("m365generator: this browser is not supported. Use IE10 or higher");
                if (!e.settings.constructorMode) {
                    var n = t.get("SubscriptionWidget_" + e.apiKey);
                    if(e.formType != 'popup')
                    	return null;
                    if (n && "hidden" == n)
                        return null;
                    if (!s.needShowForm(e.settings.displayRules))
                        return null
                }
                return this.createByType(e.formType, e)
            },
            createByType: function(t, e) {
                if (!this.Widget[t])
                    throw new Error("m365generator: wrong widget type (" + t + ")");
                return new this.Widget[t](e)
            }
        }
    }), e(["./utils", "./jq", "./cookie", "widgets/index"], function(t, e, n, i) {
        function o(t) {
            var n = "https://forms.dashamail.ru/json.php?p="+ t;
            e.ajaxJSON(n, function(t) {
                var e = a.split("/"), n = e[0] + "//" + e[2];
                i.createByConfig(t, n)
            })
        }
        function r(t) {
            alert(t)
        }
        var l = e("script[data-email-generator-site-id]"), s = l.length > 0 ? l.attr("data-email-generator-site-id"): null, a = l.attr("src"), c = a.substr(0, a.lastIndexOf("/") + 1);
        if (l.length > 1){
	        s = '';
	        l.forEach(function(script){
				src_arr = script.src.split('/');
				s += [script.getAttribute('data-email-generator-site-id')]+ '%' +src_arr[src_arr.length-2] + '^';
	        });
        }
        if (s) {
            var u = c + "dm.css", d = l.attr("data-version");
            d && (u = c + "dm-0.1.css?"+d), e('<link rel="stylesheet" href="https://formscdn.dashamail.com/dm-0.2.css" />').appendTo(e("head")), o(s)
        } else 
            r("There is not site id")
    }), n("main", function() {}), function o(t, n, i) {
        function r(s, a) {
            if (!n[s]) {
                if (!t[s]) {
                    var c = "function" == typeof e && e;
                    if (!a && c)
                        return c(s, !0);
                    if (l)
                        return l(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var d = n[s] = {
                    exports: {}
                };
                t[s][0].call(d.exports, function(e) {
                    var n = t[s][1][e];
                    return r(n ? n : e)
                }, d, d.exports, o, t, n, i)
            }
            return n[s].exports
        }
        for (var l = "function" == typeof e && e, s = 0; s < i.length; s++)
            r(i[s]);
        return r
    }({
        1: [function(t, e, i) {
            var o = t("../main");
            "function" == typeof n && n.amd ? n("perfectScrollbar", o) : (window.PerfectScrollbar = o, "undefined" == typeof window.Ps && (window.Ps = o))
        }, {
            "../main": 7
        }
        ],
        2: [function(t, e, n) {
            function i(t, e) {
                var n = t.className.split(" ");
                n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
            }
            function o(t, e) {
                var n = t.className.split(" "), i = n.indexOf(e);
                i >= 0 && n.splice(i, 1), t.className = n.join(" ")
            }
            n.add = function(t, e) {
                t.classList ? t.classList.add(e) : i(t, e)
            }, n.remove = function(t, e) {
                t.classList ? t.classList.remove(e) : o(t, e)
            }, n.list = function(t) {
                return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
            }
        }, {}
        ],
        3: [function(t, e, n) {
            function i(t, e) {
                return window.getComputedStyle(t)[e]
            }
            function o(t, e, n) {
                return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
            }
            function r(t, e) {
                for (var n in e) {
                    var i = e[n];
                    "number" == typeof i && (i = i.toString() + "px"), t.style[n] = i
                }
                return t
            }
            var l = {};
            l.e = function(t, e) {
                var n = document.createElement(t);
                return n.className = e, n
            }, l.appendTo = function(t, e) {
                return e.appendChild(t), t
            }, l.css = function(t, e, n) {
                return "object" == typeof e ? r(t, e) : "undefined" == typeof n ? i(t, e) : o(t, e, n)
            }, l.matches = function(t, e) {
                return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
            }, l.remove = function(t) {
                "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
            }, l.queryChildren = function(t, e) {
                return Array.prototype.filter.call(t.childNodes, function(t) {
                    return l.matches(t, e)
                })
            }, e.exports = l
        }, {}
        ],
        4: [function(t, e, n) {
            var i = function(t) {
                this.element = t, this.events = {}
            };
            i.prototype.bind = function(t, e) {
                "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
            }, i.prototype.unbind = function(t, e) {
                var n = "undefined" != typeof e;
                this.events[t] = this.events[t].filter(function(i) {
                    return n && i !== e?!0 : (this.element.removeEventListener(t, i, !1), !1)
                }, this)
            }, i.prototype.unbindAll = function() {
                for (var t in this.events)
                    this.unbind(t)
            };
            var o = function() {
                this.eventElements = []
            };
            o.prototype.eventElement = function(t) {
                var e = this.eventElements.filter(function(e) {
                    return e.element === t
                })[0];
                return "undefined" == typeof e && (e = new i(t), this.eventElements.push(e)), e
            }, o.prototype.bind = function(t, e, n) {
                this.eventElement(t).bind(e, n)
            }, o.prototype.unbind = function(t, e, n) {
                this.eventElement(t).unbind(e, n)
            }, o.prototype.unbindAll = function() {
                for (var t = 0; t < this.eventElements.length; t++)
                    this.eventElements[t].unbindAll()
            }, o.prototype.once = function(t, e, n) {
                var i = this.eventElement(t), o = function(t) {
                    i.unbind(e, o), n(t)
                };
                i.bind(e, o)
            }, e.exports = o
        }, {}
        ],
        5: [function(t, e, n) {
            e.exports = function() {
                function t() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }
                return function() {
                    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
                }
            }()
        }, {}
        ],
        6: [function(t, e, n) {
            var i = t("./class"), o = t("./dom"), r = n.toInt = function(t) {
                return parseInt(t, 10) || 0
            }, l = n.clone = function(t) {
                if (null === t)
                    return null;
                if (t.constructor === Array)
                    return t.map(l);
                if ("object" == typeof t) {
                    var e = {};
                    for (var n in t)
                        e[n] = l(t[n]);
                    return e
                }
                return t
            };
            n.extend = function(t, e) {
                var n = l(t);
                for (var i in e)
                    n[i] = l(e[i]);
                return n
            }, n.isEditable = function(t) {
                return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
            }, n.removePsClasses = function(t) {
                for (var e = i.list(t), n = 0; n < e.length; n++) {
                    var o = e[n];
                    0 === o.indexOf("ps-") && i.remove(t, o)
                }
            }, n.outerWidth = function(t) {
                return r(o.css(t, "width")) + r(o.css(t, "paddingLeft")) + r(o.css(t, "paddingRight")) + r(o.css(t, "borderLeftWidth")) + r(o.css(t, "borderRightWidth"))
            }, n.startScrolling = function(t, e) {
                i.add(t, "ps-in-scrolling"), "undefined" != typeof e ? i.add(t, "ps-" + e) : (i.add(t, "ps-x"), i.add(t, "ps-y"))
            }, n.stopScrolling = function(t, e) {
                i.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? i.remove(t, "ps-" + e) : (i.remove(t, "ps-x"), i.remove(t, "ps-y"))
            }, n.env = {
                isWebKit: "WebkitAppearance"in document.documentElement.style,
                supportsTouch: "ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, {
            "./class": 2,
            "./dom": 3
        }
        ],
        7: [function(t, e, n) {
            var i = t("./plugin/destroy"), o = t("./plugin/initialize"), r = t("./plugin/update");
            e.exports = {
                initialize: o,
                update: r,
                destroy: i
            }
        }, {
            "./plugin/destroy": 9,
            "./plugin/initialize": 17,
            "./plugin/update": 21
        }
        ],
        8: [function(t, e, n) {
            e.exports = {
                handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                stopPropagationOnClick: !0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipePropagation: !0,
                useBothWheelAxes: !1,
                wheelPropagation: !1,
                wheelSpeed: 1,
                theme: "default"
            }
        }, {}
        ],
        9: [function(t, e, n) {
            var i = t("../lib/helper"), o = t("../lib/dom"), r = t("./instances");
            e.exports = function(t) {
                var e = r.get(t);
                e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), i.removePsClasses(t), r.remove(t))
            }
        }, {
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18
        }
        ],
        10: [function(t, e, n) {
            function i(t, e) {
                function n(t) {
                    return t.getBoundingClientRect()
                }
                var i = function(t) {
                    t.stopPropagation()
                };
                e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarY, "click", i), e.event.bind(e.scrollbarYRail, "click", function(i) {
                    var r = o.toInt(e.scrollbarYHeight / 2), a = e.railYRatio * (i.pageY - window.pageYOffset - n(e.scrollbarYRail).top - r), c = e.railYRatio * (e.railYHeight - e.scrollbarYHeight), u = a / c;
                    0 > u ? u = 0 : u > 1 && (u = 1), s(t, "top", (e.contentHeight - e.containerHeight) * u), l(t), i.stopPropagation()
                }), e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarX, "click", i), e.event.bind(e.scrollbarXRail, "click", function(i) {
                    var r = o.toInt(e.scrollbarXWidth / 2), a = e.railXRatio * (i.pageX - window.pageXOffset - n(e.scrollbarXRail).left - r), c = e.railXRatio * (e.railXWidth - e.scrollbarXWidth), u = a / c;
                    0 > u ? u = 0 : u > 1 && (u = 1), s(t, "left", (e.contentWidth - e.containerWidth) * u - e.negativeScrollAdjustment), l(t), i.stopPropagation()
                })
            }
            var o = t("../../lib/helper"), r = t("../instances"), l = t("../update-geometry"), s = t("../update-scroll");
            e.exports = function(t) {
                var e = r.get(t);
                i(t, e)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }
        ],
        11: [function(t, e, n) {
            function i(t, e) {
                function n(n) {
                    var o = i + n * e.railXRatio, l = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                    0 > o ? e.scrollbarXLeft = 0 : o > l ? e.scrollbarXLeft = l : e.scrollbarXLeft = o;
                    var s = r.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                    c(t, "left", s)
                }
                var i = null, o = null, s = function(e) {
                    n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault()
                }, u = function() {
                    r.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
                e.event.bind(e.scrollbarX, "mousedown", function(n) {
                    o = n.pageX, i = r.toInt(l.css(e.scrollbarX, "left")) * e.railXRatio, r.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
                })
            }
            function o(t, e) {
                function n(n) {
                    var o = i + n * e.railYRatio, l = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                    0 > o ? e.scrollbarYTop = 0 : o > l ? e.scrollbarYTop = l : e.scrollbarYTop = o;
                    var s = r.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                    c(t, "top", s)
                }
                var i = null, o = null, s = function(e) {
                    n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault()
                }, u = function() {
                    r.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
                e.event.bind(e.scrollbarY, "mousedown", function(n) {
                    o = n.pageY, i = r.toInt(l.css(e.scrollbarY, "top")) * e.railYRatio, r.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
                })
            }
            var r = t("../../lib/helper"), l = t("../../lib/dom"), s = t("../instances"), a = t("../update-geometry"), c = t("../update-scroll");
            e.exports = function(t) {
                var e = s.get(t);
                i(t, e), o(t, e)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }
        ],
        12: [function(t, e, n) {
            function i(t, e) {
                function n(n, i) {
                    var o = t.scrollTop;
                    if (0 === n) {
                        if (!e.scrollbarYActive)
                            return !1;
                        if (0 === o && i > 0 || o >= e.contentHeight - e.containerHeight && 0 > i)
                            return !e.settings.wheelPropagation
                    }
                    var r = t.scrollLeft;
                    if (0 === i) {
                        if (!e.scrollbarXActive)
                            return !1;
                        if (0 === r && 0 > n || r >= e.contentWidth - e.containerWidth && n > 0)
                            return !e.settings.wheelPropagation
                    }
                    return !0
                }
                var i=!1;
                e.event.bind(t, "mouseenter", function() {
                    i=!0
                }), e.event.bind(t, "mouseleave", function() {
                    i=!1
                });
                var l=!1;
                e.event.bind(e.ownerDocument, "keydown", function(c) {
                    if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                        var u = r.matches(e.scrollbarX, ":focus") || r.matches(e.scrollbarY, ":focus");
                        if (i || u) {
                            var d = document.activeElement ? document.activeElement: e.ownerDocument.activeElement;
                            if (d) {
                                if ("IFRAME" === d.tagName)
                                    d = d.contentDocument.activeElement;
                                else 
                                    for (; d.shadowRoot;)
                                        d = d.shadowRoot.activeElement;
                                if (o.isEditable(d))
                                    return 
                            }
                            var p = 0, f = 0;
                            switch (c.which) {
                            case 37:
                                p =- 30;
                                break;
                            case 38:
                                f = 30;
                                break;
                            case 39:
                                p = 30;
                                break;
                            case 40:
                                f =- 30;
                                break;
                            case 33:
                                f = 90;
                                break;
                            case 32:
                                f = c.shiftKey ? 90 : - 90;
                                break;
                            case 34:
                                f =- 90;
                                break;
                            case 35:
                                f = c.ctrlKey?-e.contentHeight : - e.containerHeight;
                                break;
                            case 36:
                                f = c.ctrlKey ? t.scrollTop : e.containerHeight;
                                break;
                            default:
                                return 
                            }
                            a(t, "top", t.scrollTop - f), a(t, "left", t.scrollLeft + p), s(t), l = n(p, f), l && c.preventDefault()
                        }
                    }
                })
            }
            var o = t("../../lib/helper"), r = t("../../lib/dom"), l = t("../instances"), s = t("../update-geometry"), a = t("../update-scroll");
            e.exports = function(t) {
                var e = l.get(t);
                i(t, e)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }
        ],
        13: [function(t, e, n) {
            function i(t, e) {
                function n(n, i) {
                    var o = t.scrollTop;
                    if (0 === n) {
                        if (!e.scrollbarYActive)
                            return !1;
                        if (0 === o && i > 0 || o >= e.contentHeight - e.containerHeight && 0 > i)
                            return !e.settings.wheelPropagation
                    }
                    var r = t.scrollLeft;
                    if (0 === i) {
                        if (!e.scrollbarXActive)
                            return !1;
                        if (0 === r && 0 > n || r >= e.contentWidth - e.containerWidth && n > 0)
                            return !e.settings.wheelPropagation
                    }
                    return !0
                }
                function i(t) {
                    var e = t.deltaX, n =- 1 * t.deltaY;
                    return ("undefined" == typeof e || "undefined" == typeof n) && (e =- 1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e*=10, n*=10), e !== e && n !== n && (e = 0, n = t.wheelDelta), [e, n]
                }
                function o(e, n) {
                    var i = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                    if (i) {
                        if ("TEXTAREA" !== i.tagName&&!window.getComputedStyle(i).overflow.match(/(scroll|auto)/))
                            return !1;
                        var o = i.scrollHeight - i.clientHeight;
                        if (o > 0&&!(0 === i.scrollTop && n > 0 || i.scrollTop === o && 0 > n))
                            return !0;
                        var r = i.scrollLeft - i.clientWidth;
                        if (r > 0&&!(0 === i.scrollLeft && 0 > e || i.scrollLeft === r && e > 0))
                            return !0
                    }
                    return !1
                }
                function s(s) {
                    var c = i(s), u = c[0], d = c[1];
                    o(u, d) || (a=!1, e.settings.useBothWheelAxes ? e.scrollbarYActive&&!e.scrollbarXActive ? (d ? l(t, "top", t.scrollTop - d * e.settings.wheelSpeed) : l(t, "top", t.scrollTop + u * e.settings.wheelSpeed), a=!0) : e.scrollbarXActive&&!e.scrollbarYActive && (u ? l(t, "left", t.scrollLeft + u * e.settings.wheelSpeed) : l(t, "left", t.scrollLeft - d * e.settings.wheelSpeed), a=!0) : (l(t, "top", t.scrollTop - d * e.settings.wheelSpeed), l(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), r(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()))
                }
                var a=!1;
                "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
            }
            var o = t("../instances"), r = t("../update-geometry"), l = t("../update-scroll");
            e.exports = function(t) {
                var e = o.get(t);
                i(t, e)
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }
        ],
        14: [function(t, e, n) {
            function i(t, e) {
                e.event.bind(t, "scroll", function() {
                    r(t)
                })
            }
            var o = t("../instances"), r = t("../update-geometry");
            e.exports = function(t) {
                var e = o.get(t);
                i(t, e)
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19
        }
        ],
        15: [function(t, e, n) {
            function i(t, e) {
                function n() {
                    var t = window.getSelection ? window.getSelection(): document.getSelection ? document.getSelection(): "";
                    return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
                }
                function i() {
                    c || (c = setInterval(function() {
                        return r.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), void l(t)) : void clearInterval(c)
                    }, 50))
                }
                function a() {
                    c && (clearInterval(c), c = null), o.stopScrolling(t)
                }
                var c = null, u = {
                    top: 0,
                    left: 0
                }, d=!1;
                e.event.bind(e.ownerDocument, "selectionchange", function() {
                    t.contains(n()) ? d=!0 : (d=!1, a())
                }), e.event.bind(window, "mouseup", function() {
                    d && (d=!1, a())
                }), e.event.bind(window, "mousemove", function(e) {
                    if (d) {
                        var n = {
                            x: e.pageX,
                            y: e.pageY
                        }, r = {
                            left: t.offsetLeft,
                            right: t.offsetLeft + t.offsetWidth,
                            top: t.offsetTop,
                            bottom: t.offsetTop + t.offsetHeight
                        };
                        n.x < r.left + 3 ? (u.left =- 5, o.startScrolling(t, "x")) : n.x > r.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < r.top + 3 ? (r.top + 3 - n.y < 5 ? u.top =- 5 : u.top =- 20, o.startScrolling(t, "y")) : n.y > r.bottom - 3 ? (n.y - r.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : i()
                    }
                })
            }
            var o = t("../../lib/helper"), r = t("../instances"), l = t("../update-geometry"), s = t("../update-scroll");
            e.exports = function(t) {
                var e = r.get(t);
                i(t, e)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }
        ],
        16: [function(t, e, n) {
            function i(t, e, n, i) {
                function o(n, i) {
                    var o = t.scrollTop, r = t.scrollLeft, l = Math.abs(n), s = Math.abs(i);
                    if (s > l) {
                        if (0 > i && o === e.contentHeight - e.containerHeight || i > 0 && 0 === o)
                            return !e.settings.swipePropagation
                    } else if (l > s && (0 > n && r === e.contentWidth - e.containerWidth || n > 0 && 0 === r))
                        return !e.settings.swipePropagation;
                    return !0
                }
                function a(e, n) {
                    s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), l(t)
                }
                function c() {
                    y=!0
                }
                function u() {
                    y=!1
                }
                function d(t) {
                    return t.targetTouches ? t.targetTouches[0] : t
                }
                function p(t) {
                    return t.targetTouches && 1 === t.targetTouches.length?!0 : t.pointerType && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE?!0 : !1
                }
                function f(t) {
                    if (p(t)) {
                        x=!0;
                        var e = d(t);
                        v.pageX = e.pageX, v.pageY = e.pageY, g = (new Date).getTime(), null !== w && clearInterval(w), t.stopPropagation()
                    }
                }
                function h(t) {
                    if (!x && e.settings.swipePropagation && f(t), !y && x && p(t)) {
                        var n = d(t), i = {
                            pageX: n.pageX,
                            pageY: n.pageY
                        }, r = i.pageX - v.pageX, l = i.pageY - v.pageY;
                        a(r, l), v = i;
                        var s = (new Date).getTime(), c = s - g;
                        c > 0 && (b.x = r / c, b.y = l / c, g = s), o(r, l) && (t.stopPropagation(), t.preventDefault())
                    }
                }
                function m() {
                    !y && x && (x=!1, clearInterval(w), w = setInterval(function() {
                        return r.get(t) ? Math.abs(b.x) < .01 && Math.abs(b.y) < .01 ? void clearInterval(w) : (a(30 * b.x, 30 * b.y), b.x*=.8, void(b.y*=.8)) : void clearInterval(w)
                    }, 10))
                }
                var v = {}, g = 0, b = {}, w = null, y=!1, x=!1;
                n && (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", m)), i && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", m)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", m)))
            }
            var o = t("../../lib/helper"), r = t("../instances"), l = t("../update-geometry"), s = t("../update-scroll");
            e.exports = function(t) {
                if (o.env.supportsTouch || o.env.supportsIePointer) {
                    var e = r.get(t);
                    i(t, e, o.env.supportsTouch, o.env.supportsIePointer)
                }
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }
        ],
        17: [function(t, e, n) {
            var i = t("../lib/helper"), o = t("../lib/class"), r = t("./instances"), l = t("./update-geometry"), s = {
                "click-rail": t("./handler/click-rail"),
                "drag-scrollbar": t("./handler/drag-scrollbar"),
                keyboard: t("./handler/keyboard"),
                wheel: t("./handler/mouse-wheel"),
                touch: t("./handler/touch"),
                selection: t("./handler/selection")
            }, a = t("./handler/native-scroll");
            e.exports = function(t, e) {
                e = "object" == typeof e ? e : {}, o.add(t, "ps-container");
                var n = r.add(t);
                n.settings = i.extend(n.settings, e), o.add(t, "ps-theme-" + n.settings.theme), n.settings.handlers.forEach(function(e) {
                    s[e](t)
                }), a(t), l(t)
            }
        }, {
            "../lib/class": 2,
            "../lib/helper": 6,
            "./handler/click-rail": 10,
            "./handler/drag-scrollbar": 11,
            "./handler/keyboard": 12,
            "./handler/mouse-wheel": 13,
            "./handler/native-scroll": 14,
            "./handler/selection": 15,
            "./handler/touch": 16,
            "./instances": 18,
            "./update-geometry": 19
        }
        ],
        18: [function(t, e, n) {
            function i(t) {
                function e() {
                    a.add(t, "ps-focus")
                }
                function n() {
                    a.remove(t, "ps-focus")
                }
                var i = this;
                i.settings = s.clone(c), i.containerWidth = null, i.containerHeight = null, i.contentWidth = null, i.contentHeight = null, i.isRtl = "rtl" === u.css(t, "direction"), i.isNegativeScroll = function() {
                    var e = t.scrollLeft, n = null;
                    return t.scrollLeft =- 1, n = t.scrollLeft < 0, t.scrollLeft = e, n
                }(), i.negativeScrollAdjustment = i.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, i.event = new d, i.ownerDocument = t.ownerDocument || document, i.scrollbarXRail = u.appendTo(u.e("div", "ps-scrollbar-x-rail"), t), i.scrollbarX = u.appendTo(u.e("div", "ps-scrollbar-x"), i.scrollbarXRail), i.scrollbarX.setAttribute("tabindex", 0), i.event.bind(i.scrollbarX, "focus", e), i.event.bind(i.scrollbarX, "blur", n), i.scrollbarXActive = null, i.scrollbarXWidth = null, i.scrollbarXLeft = null, i.scrollbarXBottom = s.toInt(u.css(i.scrollbarXRail, "bottom")), i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom, i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : s.toInt(u.css(i.scrollbarXRail, "top")), i.railBorderXWidth = s.toInt(u.css(i.scrollbarXRail, "borderLeftWidth")) + s.toInt(u.css(i.scrollbarXRail, "borderRightWidth")), u.css(i.scrollbarXRail, "display", "block"), i.railXMarginWidth = s.toInt(u.css(i.scrollbarXRail, "marginLeft")) + s.toInt(u.css(i.scrollbarXRail, "marginRight")), u.css(i.scrollbarXRail, "display", ""), i.railXWidth = null, i.railXRatio = null, i.scrollbarYRail = u.appendTo(u.e("div", "ps-scrollbar-y-rail"), t), i.scrollbarY = u.appendTo(u.e("div", "ps-scrollbar-y"), i.scrollbarYRail), i.scrollbarY.setAttribute("tabindex", 0), i.event.bind(i.scrollbarY, "focus", e), i.event.bind(i.scrollbarY, "blur", n), i.scrollbarYActive = null, i.scrollbarYHeight = null, i.scrollbarYTop = null, i.scrollbarYRight = s.toInt(u.css(i.scrollbarYRail, "right")), i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight, i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : s.toInt(u.css(i.scrollbarYRail, "left")), i.scrollbarYOuterWidth = i.isRtl ? s.outerWidth(i.scrollbarY) : null, i.railBorderYWidth = s.toInt(u.css(i.scrollbarYRail, "borderTopWidth")) + s.toInt(u.css(i.scrollbarYRail, "borderBottomWidth")), u.css(i.scrollbarYRail, "display", "block"), i.railYMarginHeight = s.toInt(u.css(i.scrollbarYRail, "marginTop")) + s.toInt(u.css(i.scrollbarYRail, "marginBottom")), u.css(i.scrollbarYRail, "display", ""), i.railYHeight = null, i.railYRatio = null
            }
            function o(t) {
                return t.getAttribute("data-ps-id")
            }
            function r(t, e) {
                t.setAttribute("data-ps-id", e)
            }
            function l(t) {
                t.removeAttribute("data-ps-id")
            }
            var s = t("../lib/helper"), a = t("../lib/class"), c = t("./default-setting"), u = t("../lib/dom"), d = t("../lib/event-manager"), p = t("../lib/guid"), f = {};
            n.add = function(t) {
                var e = p();
                return r(t, e), f[e] = new i(t), f[e]
            }, n.remove = function(t) {
                delete f[o(t)], l(t)
            }, n.get = function(t) {
                return f[o(t)]
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/event-manager": 4,
            "../lib/guid": 5,
            "../lib/helper": 6,
            "./default-setting": 8
        }
        ],
        19: [function(t, e, n) {
            function i(t, e) {
                return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
            }
            function o(t, e) {
                var n = {
                    width: e.railXWidth
                };
                e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, s.css(e.scrollbarXRail, n);
                var i = {
                    top: t.scrollTop,
                    height: e.railYHeight
                };
                e.isScrollbarYUsingRight ? e.isRtl ? i.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : i.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? i.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : i.left = e.scrollbarYLeft + t.scrollLeft, s.css(e.scrollbarYRail, i), s.css(e.scrollbarX, {
                    left: e.scrollbarXLeft,
                    width: e.scrollbarXWidth - e.railBorderXWidth
                }), s.css(e.scrollbarY, {
                    top: e.scrollbarYTop,
                    height: e.scrollbarYHeight - e.railBorderYWidth
                })
            }
            var r = t("../lib/helper"), l = t("../lib/class"), s = t("../lib/dom"), a = t("./instances"), c = t("./update-scroll");
            e.exports = function(t) {
                var e = a.get(t);
                e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
                var n;
                t.contains(e.scrollbarXRail) || (n = s.queryChildren(t, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function(t) {
                    s.remove(t)
                }), s.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = s.queryChildren(t, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function(t) {
                    s.remove(t)
                }), s.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive=!0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = i(e, r.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = r.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive=!1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive=!0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = i(e, r.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = r.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive=!1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), e.scrollbarXActive ? l.add(t, "ps-active-x") : (l.remove(t, "ps-active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, c(t, "left", 0)), e.scrollbarYActive ? l.add(t, "ps-active-y") : (l.remove(t, "ps-active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0))
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18,
            "./update-scroll": 20
        }
        ],
        20: [function(t, e, n) {
            var i, o, r = t("./instances"), l = document.createEvent("Event"), s = document.createEvent("Event"), a = document.createEvent("Event"), c = document.createEvent("Event"), u = document.createEvent("Event"), d = document.createEvent("Event"), p = document.createEvent("Event"), f = document.createEvent("Event"), h = document.createEvent("Event"), m = document.createEvent("Event");
            l.initEvent("ps-scroll-up", !0, !0), s.initEvent("ps-scroll-down", !0, !0), a.initEvent("ps-scroll-left", !0, !0), c.initEvent("ps-scroll-right", !0, !0), u.initEvent("ps-scroll-y", !0, !0), d.initEvent("ps-scroll-x", !0, !0), p.initEvent("ps-x-reach-start", !0, !0), f.initEvent("ps-x-reach-end", !0, !0), h.initEvent("ps-y-reach-start", !0, !0), m.initEvent("ps-y-reach-end", !0, !0), e.exports = function(t, e, n) {
                if ("undefined" == typeof t)
                    throw "You must provide an element to the update-scroll function";
                if ("undefined" == typeof e)
                    throw "You must provide an axis to the update-scroll function";
                if ("undefined" == typeof n)
                    throw "You must provide a value to the update-scroll function";
                "top" === e && 0 >= n && (t.scrollTop = n = 0, t.dispatchEvent(h)), "left" === e && 0 >= n && (t.scrollLeft = n = 0, t.dispatchEvent(p));
                var v = r.get(t);
                "top" === e && n >= v.contentHeight - v.containerHeight && (n = v.contentHeight - v.containerHeight, n - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(m)), "left" === e && n >= v.contentWidth - v.containerWidth && (n = v.contentWidth - v.containerWidth, n - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(f)), i || (i = t.scrollTop), o || (o = t.scrollLeft), "top" === e && i > n && t.dispatchEvent(l), "top" === e && n > i && t.dispatchEvent(s), "left" === e && o > n && t.dispatchEvent(a), "left" === e && n > o && t.dispatchEvent(c), "top" === e && (t.scrollTop = i = n, t.dispatchEvent(u)), "left" === e && (t.scrollLeft = o = n, t.dispatchEvent(d))
            }
        }, {
            "./instances": 18
        }
        ],
        21: [function(t, e, n) {
            var i = t("../lib/helper"), o = t("../lib/dom"), r = t("./instances"), l = t("./update-geometry"), s = t("./update-scroll");
            e.exports = function(t) {
                var e = r.get(t);
                e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = i.toInt(o.css(e.scrollbarXRail, "marginLeft")) + i.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = i.toInt(o.css(e.scrollbarYRail, "marginTop")) + i.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), l(t), s(t, "top", t.scrollTop), s(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""))
            }
        }, {
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18,
            "./update-geometry": 19,
            "./update-scroll": 20
        }
        ]
    }, {}, [1]), e(["amd", "perfectScrollbar"])
}();