webpackJsonp([0],{

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    /**
     * 注册浏览器的DOMContentLoaded事件
     * @param { Function } onready [必填]在DOMContentLoaded事件触发时需要执行的函数
     * @param { Object } config [可选]配置项
     */
    function ready(onready, config) {
        //浏览器检测相关对象，在此为节省代码未实现，实际使用时需要实现。
        var Browser = {};
        !!window.ActiveXObject || "ActiveXObject" in window ? Browser['ie'] = 1 : navigator.userAgent.indexOf("Firefox") > 0 ? (Browser['ff'] = 1, Browser['version'] = /firefox\/[\d.]+/gi.exec(navigator.userAgent)[0]) : '';
        //设置是否在FF下使用DOMContentLoaded（在FF2下的特定场景有Bug）
        var conf = { enableMozDOMReady: true };
        if (config) for (var p in config) {
            conf[p] = config[p];
        }var isReady = false;
        function doReady() {
            if (isReady) return;
            //确保onready只执行一次
            isReady = true;
            onready();
        }
        /*IE*/
        if (Browser.ie) {
            (function () {
                if (isReady) return;
                try {
                    document.documentElement.doScroll("left");
                } catch (error) {
                    setTimeout(arguments.callee, 0);
                    return;
                }
                doReady();
            })();
            window.attachEvent('onload', doReady);
        }
        /*Webkit*/
        else if (Browser.webkit && Browser.version < 525) {
                var foo = function foo() {
                    if (isReady) return;
                    if (/loaded|complete/.test(document.readyState)) doReady();else setTimeout(foo, 0);
                };
                foo();
                window.addEventListener('load', doReady, false);
            }
            /*FF Opera 高版webkit 其他*/
            else {
                    if (!Browser.ff || Browser.version != 2 || this.conf.enableMozDOMReady) {
                        var foo = function foo() {
                            document.removeEventListener("DOMContentLoaded", foo, false);
                            doReady();
                        };
                        document.addEventListener("DOMContentLoaded", foo, false);
                    }
                    window.addEventListener('load', doReady, false);
                }
    }
    return ready;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

});