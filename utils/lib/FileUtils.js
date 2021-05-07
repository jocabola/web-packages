"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileUtils = (function () {
    function FileUtils() {
    }
    Object.defineProperty(FileUtils, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    FileUtils.addFileDropHandler = function (el, dropHandler, overHandler) {
        el.addEventListener("dragover", function (ev) {
            ev.preventDefault();
            if (overHandler !== undefined)
                overHandler(ev);
        });
        el.addEventListener("drop", function (ev) {
            ev.preventDefault();
            if (ev.dataTransfer != null && ev.dataTransfer.items) {
                var files = [];
                for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                    if (ev.dataTransfer.items[i].kind === 'file') {
                        var file = ev.dataTransfer.items[i].getAsFile();
                        files.push(file);
                    }
                }
                dropHandler(files);
            }
            else {
                dropHandler(ev.dataTransfer != null && ev.dataTransfer.files);
            }
        });
    };
    return FileUtils;
}());
exports.default = FileUtils;
var FileUtilsInstance = FileUtils.Instance;
