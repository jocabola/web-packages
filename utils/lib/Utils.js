"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseParams = (function () {
    function ResponseParams() {
        this.responseType = "";
    }
    return ResponseParams;
}());
var Utils = (function () {
    function Utils() {
    }
    Object.defineProperty(Utils, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Utils.el = function (type, className, parent) {
        var e = document.createElement(type);
        if (className != undefined)
            e.className = className;
        if (parent != undefined)
            parent.appendChild(e);
        return e;
    };
    Utils.$ = function (type, className, parent) {
        return Utils.el(type, className, parent);
    };
    Utils.webgl = function () {
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return (gl != null && gl instanceof WebGLRenderingContext);
    };
    Utils.getDocumentHeight = function () {
        return document.body.clientHeight || window.innerHeight;
    };
    Utils.isMobile = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true; })(navigator.userAgent || navigator.vendor);
        return check;
    };
    Utils.isBrowser = function (vendor) {
        return navigator.userAgent.toLowerCase().indexOf(vendor.toLowerCase()) > -1;
    };
    Utils.isSafari = function () {
        return !Utils.isBrowser("Chrome") && Utils.isBrowser("Safari");
    };
    Utils.getAndroidVersion = function () {
        var ua = navigator.userAgent.toLowerCase();
        var match = ua.match(/android\s([0-9\.]*)/);
        return (match != null && match.length > 1) ? parseFloat(match[1]) : -1;
    };
    Utils.getIOSVersion = function () {
        if (Utils.isIphone() || Utils.isIpad()) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            if (v != null && v.length > 2) {
                var vf = parseFloat(parseInt(v[1], 10) + "." + parseInt(v[2], 10));
                return vf;
            }
            return -1;
        }
        return -1;
    };
    Utils.isIphone = function () {
        return !!navigator.userAgent.match(/iPhone/i);
    };
    Utils.isIpad = function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('ipad') > -1 || (ua.indexOf('macintosh') > -1 && 'ontouchend' in document);
    };
    Utils.isDesktop = function () {
        return !Utils.isIpad() && !Utils.isIphone() && Utils.getAndroidVersion() === -1;
    };
    Utils.isTouchDevice = function () {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    };
    Utils.hasGetUserMedia = function () {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };
    Utils.copyToClipboard = function (str) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(str);
        }
    };
    Utils.loadData = function (url, callback, params) {
        var r = new XMLHttpRequest();
        r.open("GET", url, true);
        if (params != undefined)
            r.responseType = params.responseType;
        r.onload = function () {
            if (callback != undefined)
                callback(r);
        };
        r.send();
    };
    Utils.pushState = function (state) {
        if (state.slug !== location.pathname) {
            history.pushState(state, state.title, state.slug);
            document.title = state.title;
        }
    };
    return Utils;
}());
exports.default = Utils;
var UtilsInstance = Utils.Instance;
