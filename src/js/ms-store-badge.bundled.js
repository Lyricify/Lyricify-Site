// noinspection all

var t = function (t, i, e, n) {
    return new (e || (e = Promise))((function (o, s) {
        function r(t) {
            try {
                h(n.next(t))
            } catch (t) {
                s(t)
            }
        }

        function a(t) {
            try {
                h(n.throw(t))
            } catch (t) {
                s(t)
            }
        }

        function h(t) {
            var i;
            t.done ? o(t.value) : (i = t.value, i instanceof e ? i : new e((function (t) {
                t(i)
            }))).then(r, a)
        }

        h((n = n.apply(t, i || [])).next())
    }))
};

function i(i, e) {
    return t(this, arguments, void 0, (function* (i, e, n = {}, o) {
        const s = "psi_f_svc", r = {
            method: "GET",
            headers: {
                Origin: "https://apps.microsoft.com",
                Referer: document.URL,
                "Access-Control-Request-Method": "GET",
                "X-Correlation-Id": crypto.randomUUID(),
                "Content-Type": "application/octet-stream"
            },
            cache: "no-cache",
            params: new URLSearchParams(o)
        }, a = Object.assign(Object.assign({}, r), n);
        let h = null;
        try {
            h = yield fetch(`${o}`, a)
        } catch (t) {
            window.location.href = `ms-windows-store://pdp/?productid=${i}&ocid=${s}na`
        }
        (null == h ? void 0 : h.ok) ? function (i) {
            t(this, void 0, void 0, (function* () {
                const t = i.headers.get("Content-Disposition");
                let n = `${e} Installer.exe`;
                if (t) {
                    const i = null == t ? void 0 : t.match(/filename\*=UTF-8''([\w%]*)/i);
                    i && i[1] && (n = i[1])
                }
                const o = yield i.blob(), s = URL.createObjectURL(o), r = document.createElement("a");
                r.href = s, r.download = decodeURIComponent(n), r.style.display = "none", document.body.appendChild(r);
                try {
                    r.click(), yield new Promise((t => setTimeout(t, 1e3)))
                } catch (t) {
                } finally {
                    URL.revokeObjectURL(s), document.body.removeChild(r)
                }
            }))
        }(h) : function (e) {
            t(this, void 0, void 0, (function* () {
                const t = null == e ? void 0 : e.status;
                window.location.href = `ms-windows-store://pdp/?productid=${i}&ocid=${s}${t}`
            }))
        }(h)
    }))
}

var e = function (t, i, e, n) {
    return new (e || (e = Promise))((function (o, s) {
        function r(t) {
            try {
                h(n.next(t))
            } catch (t) {
                s(t)
            }
        }

        function a(t) {
            try {
                h(n.throw(t))
            } catch (t) {
                s(t)
            }
        }

        function h(t) {
            var i;
            t.done ? o(t.value) : (i = t.value, i instanceof e ? i : new e((function (t) {
                t(i)
            }))).then(r, a)
        }

        h((n = n.apply(t, i || [])).next())
    }))
};
let n = !1;
var o, s, r, a, h, c, d, l, u, p = function (t, i, e, n) {
    return new (e || (e = Promise))((function (o, s) {
        function r(t) {
            try {
                h(n.next(t))
            } catch (t) {
                s(t)
            }
        }

        function a(t) {
            try {
                h(n.throw(t))
            } catch (t) {
                s(t)
            }
        }

        function h(t) {
            var i;
            t.done ? o(t.value) : (i = t.value, i instanceof e ? i : new e((function (t) {
                t(i)
            }))).then(r, a)
        }

        h((n = n.apply(t, i || [])).next())
    }))
}, f = function (t, i, e, n, o) {
    if ("m" === n) throw new TypeError("Private method is not writable");
    if ("a" === n && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof i ? t !== i || !o : !i.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === n ? o.call(t, e) : o ? o.value = e : i.set(t, e), e
}, m = function (t, i, e, n) {
    if ("a" === e && !n) throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof i ? t !== i || !n : !i.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === e ? n : "a" === e ? n.call(t) : n ? n.value : i.get(t)
};

class g extends HTMLElement {
    constructor() {
        super(), o.add(this), this.productId = "", this.productName = "", this.cid = "", this.size = "large", this.windowMode = "popup", this.theme = "dark", this.language = "", this.animation = "off", r.set(this, s.englishLanguage), a.set(this, "prod"), h.set(this, "dev" === m(this, a, "f") ? "iframe.html" : "https://get.microsoft.com/iframe.html"), c.set(this, "dev" === m(this, a, "f") ? "/images" : "https://get.microsoft.com/images"), d.set(this, {
            isWindows: !1,
            windowsVersion: null,
            isEdgeBrowser: !1
        }), l.set(this, !1), this.PSIDownloadUrl = "https://get.microsoft.com/installer/download/", this.throttleDownload = function (t, i) {
            return (...o) => e(this, void 0, void 0, (function* () {
                if (!n) {
                    n = !0;
                    try {
                        yield t(...o)
                    } finally {
                        setTimeout((() => n = !1), i)
                    }
                }
            }))
        }(i, 1500), this.imgPSIHandler = () => this.throttleDownload(this.productId, this.productName || "Microsoft Store Direct", void 0, this.getPSIUrl()), this.imgPDPHandler = t => this.launchApp(t), this.getPlatformDetails().then((t => f(this, d, t, "f"))), f(this, r, s.getSupportedLanguageFromCode(this.language), "f"), this.language = m(this, r, "f").code;
        const t = this.attachShadow({mode: "open"}), u = this.createStyle(), p = this.createHtml();
        t.appendChild(u), t.appendChild(p)
    }

    static get observedAttributes() {
        return ["productid", "productname", "cid", "window-mode", "theme", "size", "language", "animation"]
    }

    static getSupportedLanguageFromCode(t) {
        if (!t) return s.getSupportedLanguageFromUserAgent();
        const i = s.supportedLanguages.find((i => i.code === t.toLowerCase())) || s.supportedLanguages.find((i => i.code.substring(0, 3) === t.toLowerCase())) || s.supportedLanguages.find((i => i.code.substring(0, 2) === t.toLowerCase()));
        return i || s.englishLanguage
    }

    static getSupportedLanguageFromUserAgent() {
        const t = s.supportedLanguages.find((t => t.name === navigator.language));
        if (t) return t;
        if (navigator.languages) {
            var i = navigator.languages.map((t => s.supportedLanguages.find((i => i.code === t)))).find((t => !!t));
            if (i) return i
        }
        const e = navigator.language.indexOf("-");
        if (e > 0) {
            const t = navigator.language.substring(0, e), i = s.supportedLanguages.find((i => i.name === t));
            if (i) return i
        }
        return s.englishLanguage
    }

    static createSupportedLanguages() {
        let t = new Map;
        t.set("Afrikaans", "af-za"), t.set("Arabic", "ar-sa"), t.set("Belarusian", "be"), t.set("Bulgarian", "bg-bg"), t.set("Bengali", "bn"), t.set("Bosnian", "bs"), t.set("Catalan", "ca-es"), t.set("Czech", "cs-cz"), t.set("Welsh", "cy-gb"), t.set("Danish", "da-dk"), t.set("German", "de-de"), t.set("Greek", "el-gr"), t.set("English", "en-us"), t.set("Spanish", "es-es"), t.set("Estonian", "et-ee"), t.set("Persian", "fa-ir"), t.set("Finnish", "fi-fi"), t.set("Filipino", "fil"), t.set("French", "fr-ca"), t.set("Galician", "gl-es"), t.set("Hebrew", "he-il"), t.set("Hindi", "hi-in"), t.set("Croatian", "hr-hr"), t.set("Hungarian", "hu-hu"), t.set("Indonesian", "id-id"), t.set("Icelandic", "is-is"), t.set("Italian", "it-it"), t.set("Japanese", "ja-jp"), t.set("Georgian", "ka-ge"), t.set("Kazakh", "kk-kz"), t.set("Korean", "ko-kr"), t.set("Lithuanian", "lt-lt"), t.set("Latvian", "lv-lv"), t.set("Malay", "ms-my"), t.set("Norwegian", "nb-no"), t.set("Dutch", "nl-nl"), t.set("Polish", "pl-pl"), t.set("Portuguese_Brazil", "pt-br"), t.set("Portuguese_Portugal", "pt-pt"), t.set("Romanian", "ro-ro"), t.set("Russian", "ru-ru"), t.set("Slovak", "sk-sk"), t.set("Slovenian", "sl-si"), t.set("Serbian", "sr-cyrl-rs"), t.set("Swedish", "sv-se"), t.set("Swahili", "sw"), t.set("Thai", "th-th"), t.set("Turkish", "tr-tr"), t.set("Ukrainian", "uk-ua"), t.set("Vietnamese", "vi-vn"), t.set("Chinese_Simplified", "zh-cn"), t.set("Chinese_Traditional", "zh-tw");
        let i = [];
        for (let e of t.keys()) {
            let n = {
                name: e,
                imageLarge: {fileName: t.get(e).concat(" ").concat("dark.svg")},
                imageLargeLight: {fileName: t.get(e).concat(" ").concat("light.svg")},
                imageSmall: {fileName: e.concat("_S.png")},
                code: t.get(e) || ""
            };
            i.push(n)
        }
        return i
    }

    updateImageSrc() {
        var t;
        const i = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelector("img");
        i && (i.setAttribute("src", this.getImageSource()), i.className = this.getImageClass())
    }

    updateListeners() {
        var t;
        const i = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelector("img");
        null == i || i.removeEventListener("click", this.imgPDPHandler), null == i || i.removeEventListener("click", this.imgPSIHandler), "direct" === this.windowMode ? null == i || i.addEventListener("click", this.imgPSIHandler) : null == i || i.addEventListener("click", this.imgPDPHandler)
    }

    connectedCallback() {
    }

    attributeChangedCallback(t, i, e) {
        var n;
        "size" !== t || "large" !== e && "small" !== e || i === e ? "language" !== t || e === i || "string" != typeof e && e ? "productid" === t && e !== i && "string" == typeof e ? this.productId = e : "productname" === t && e !== i && "string" == typeof e ? this.productName = e : "cid" === t && e !== i && "string" == typeof e ? this.cid = e : "window-mode" !== t || "popup" !== e && "full" !== e && "direct" !== e || i === e ? "theme" !== t || "dark" != e && "light" !== e && "auto" !== e || i === e ? "animation" !== t || "on" !== e && "off" !== e || i === e || (this.animation = e, null === (n = this.shadowRoot) || void 0 === n || n.appendChild(this.createStyle())) : (this.theme = e, this.updateImageSrc()) : (this.windowMode = e, this.updateImageSrc(), this.updateListeners()) : (f(this, r, s.getSupportedLanguageFromCode(e), "f"), this.language = m(this, r, "f").code, this.updateImageSrc()) : (this.size = e, this.updateImageSrc())
    }

    createStyle() {
        var t = "";
        t = "on" === this.animation ? "\n      :host {\n        display: inline-block;\n        cursor: pointer;\n        height: fit-content;\n      }\n\n      iframe {\n        border: none;\n        width: 0px;\n        height: 0px;\n      }\n\n      img {\n        border-radius: 8px;\n        transition: 0.35s ease;\n      }\n      \n      img:hover {\n        transform: translate(0, -4px);\n        cursor: pointer;\n        box-shadow: 0 12px 40px 20px rgba(0, 0, 0, 0.05);\n      }\n\n      img.small {\n        max-height: 52px;\n      }\n\n      img.large {\n        max-height: 104px;\n        height: 864px;\n      }" : "\n      :host {\n        display: inline-block;\n        cursor: pointer;\n        height: fit-content;\n      }\n\n      iframe {\n        border: none;\n        width: 0px;\n        height: 0px;\n      }\n\n      img {\n        width: auto;\n        border-radius: 8px;\n      }\n\n      img.small {\n        max-height: 52px;\n      }\n\n      img.large {\n        max-height: 104px;\n        height: 864px;\n      }";
        const i = document.createElement("style");
        return i.textContent = t, i
    }

    createHtml() {
        const t = document.createElement("div");
        return t.appendChild(this.createImage()), t.appendChild(this.createIFrame()), t
    }

    getPlatformDetails() {
        return p(this, void 0, void 0, (function* () {
            const t = navigator;
            if (t.userAgentData && t.userAgentData.getHighEntropyValues) try {
                const i = yield t.userAgentData.getHighEntropyValues(["platform", "platformVersion"]),
                    e = "Windows" === i.platform;
                return {
                    isWindows: e,
                    windowsVersion: e ? parseFloat((null == i ? void 0 : i.platformVersion) || "") : null,
                    isEdgeBrowser: (t.userAgentData.brands || []).some((t => "Microsoft Edge" === t.brand))
                }
            } catch (t) {
            }
            const i = new RegExp(/.?Windows NT (\d+\.?\d?\.?\d?\.?\d?)/gi).exec(navigator.userAgent);
            return i && i.length >= 2 ? {
                isWindows: !0,
                windowsVersion: parseFloat(i[1]),
                isEdgeBrowser: !!navigator.userAgent.match("Edg/")
            } : {isWindows: !1, windowsVersion: null, isEdgeBrowser: !!navigator.userAgent.match("Edg/")}
        }))
    }

    createIFrame() {
        const t = document.createElement("iframe");
        return t.setAttribute("loading", "eager"), t.title = "Microsoft Store App Badge", t.src = m(this, h, "f"), t
    }

    createImage() {
        const t = document.createElement("img");
        return t.setAttribute("part", "img"), t.src = this.getImageSource(), t.className = this.getImageClass(), t.alt = "Microsoft Store app badge", "direct" === this.windowMode ? t.addEventListener("click", this.imgPSIHandler) : t.addEventListener("click", this.imgPDPHandler), t
    }

    getImageSource() {
        var t = null;
        if ("dark" === this.theme) t = "large" === this.size ? m(this, r, "f").imageLarge.fileName : m(this, r, "f").imageSmall.fileName; else if ("light" === this.theme) t = "large" === this.size ? m(this, r, "f").imageLargeLight.fileName : m(this, r, "f").imageSmall.fileName; else if ("auto" === this.theme) {
            t = window.matchMedia("(prefers-color-scheme:dark)").matches ? "large" === this.size ? m(this, r, "f").imageLargeLight.fileName : m(this, r, "f").imageSmall.fileName : "large" === this.size ? m(this, r, "f").imageLarge.fileName : m(this, r, "f").imageSmall.fileName
        }
        return `${m(this, c, "f")}/${t}`
    }

    getImageClass() {
        return "large" === this.size ? "large" : "small"
    }

    launchApp(t) {
        this.productId && (m(this, d, "f").isWindows && m(this, d, "f").isEdgeBrowser ? this.launchStoreAppPdpViaWhitelistedDomain() : m(this, d, "f").isWindows ? this.launchStoreAppPdp() : this.launchStoreWebPdp(t))
    }

    getPSIUrl() {
        return `${this.PSIDownloadUrl}${this.productId.toUpperCase()}?referrer=appbadge&source=${encodeURIComponent(window.location.hostname.toLowerCase())}`
    }

    launchStoreAppPdp() {
        const t = new URLSearchParams;
        if (t.append("productid", this.productId), t.append("referrer", "appbadge"), t.append("source", window.location.hostname.toLowerCase()), this.cid && t.append("cid", this.cid), "popup" === this.windowMode) {
            t.append("mode", "mini");
            const i = [Math.floor(window.screenLeft * window.devicePixelRatio), Math.floor(window.screenTop * window.devicePixelRatio), Math.floor(window.outerWidth * window.devicePixelRatio), Math.floor(window.outerHeight * window.devicePixelRatio)];
            t.append("pos", i.join(","))
        }
        location.href = "ms-windows-store://pdp/?" + t.toString()
    }

    launchStoreAppPdpViaWhitelistedDomain() {
        var t;
        const i = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelector("iframe");
        if (!m(this, l, "f") && i && i.contentWindow) {
            m(this, o, "m", u).call(this);
            const t = {
                message: "launch",
                productId: this.productId,
                cid: this.cid,
                windowMode: this.windowMode,
                source: window.location.hostname
            };
            i.contentWindow.postMessage(t, "*")
        } else this.launchStoreAppPdp()
    }

    launchStoreWebPdp(t) {
        var i = "";
        i = this.cid ? `https://apps.microsoft.com/store/detail/${this.productId}?cid=${encodeURIComponent(this.cid)}&referrer=appbadge&source=${encodeURIComponent(window.location.hostname.toLowerCase())}` : `https://apps.microsoft.com/store/detail/${this.productId}?referrer=appbadge&source=${encodeURIComponent(window.location.hostname.toLowerCase())}`, t.ctrlKey ? window.open(i, "_blank") : window.location.href = i
    }
}

s = g, r = new WeakMap, a = new WeakMap, h = new WeakMap, c = new WeakMap, d = new WeakMap, l = new WeakMap, o = new WeakSet, u = function () {
    const t = "securitypolicyviolation", i = i => {
        "frame-src" === i.violatedDirective && i.type === t && (f(this, l, !0, "f"), this.launchStoreAppPdp())
    };
    document.addEventListener(t, i, {once: !0}), setTimeout((() => document.removeEventListener(t, i)), 2e3)
}, g.englishLanguage = {
    name: "English",
    code: "en-us",
    imageSmall: {fileName: "English_S.png"},
    imageLarge: {fileName: "en-us dark.svg"},
    imageLargeLight: {fileName: "en-us light.svg"}
}, g.supportedLanguages = s.createSupportedLanguages(), customElements.define("ms-store-badge", g);
