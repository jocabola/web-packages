"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFileDropHandler = exports.downloadFile = void 0;
var downloadFile = function (cnt, filename) {
    var link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    var binary = typeof cnt != "string";
    var blob = binary ? new Blob([cnt]) : new Blob([cnt], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    document.body.removeChild(link);
};
exports.downloadFile = downloadFile;
var addFileDropHandler = function (el, dropHandler, overHandler, leaveHandler) {
    el.addEventListener("dragover", function (ev) {
        ev.preventDefault();
        if (overHandler !== undefined)
            overHandler(ev);
    });
    el.addEventListener("dragleave", function (ev) {
        ev.preventDefault();
        if (leaveHandler !== undefined)
            leaveHandler(ev);
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
exports.addFileDropHandler = addFileDropHandler;
