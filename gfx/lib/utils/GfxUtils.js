"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fitRectToViewport = exports.getTextureRatio = exports.getTextureSize = exports.getWindowSize = exports.getRatio = exports.frustumHeight = exports.perspectiveFov = exports.createTextureFromFile = void 0;
const three_1 = require("three");
const DEG2RAD = 180 / Math.PI;
const RAD2DEG = Math.PI / 180;
function createTextureFromFile(file, handler = null) {
    if (file.type.indexOf("image") === -1)
        console.warn("File is not an Image!");
    let reader = new FileReader();
    let img = new Image();
    reader.addEventListener("load", function () {
        img.onload = () => {
            const tex = new three_1.Texture(img);
            handler(tex);
        };
        img.src = reader.result.toString();
    }, false);
    reader.readAsDataURL(file);
}
exports.createTextureFromFile = createTextureFromFile;
function perspectiveFov(z, viewportHeight = window.innerHeight) {
    return 2 * Math.atan(viewportHeight * .5 / z) * DEG2RAD;
}
exports.perspectiveFov = perspectiveFov;
function frustumHeight(fov, depth) {
    return 2 * (depth * Math.tan((fov * .5) * RAD2DEG));
}
exports.frustumHeight = frustumHeight;
function getRatio(size) {
    return size.width / size.height;
}
exports.getRatio = getRatio;
function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}
exports.getWindowSize = getWindowSize;
function getTextureSize(texture) {
    return texture.image;
}
exports.getTextureSize = getTextureSize;
function getTextureRatio(texture) {
    return getRatio(texture.image);
}
exports.getTextureRatio = getTextureRatio;
function fitRectToViewport(rect, viewport = getWindowSize()) {
    const vratio = getRatio(viewport);
    const ratio = getRatio(rect);
    if (ratio > vratio) {
        return viewport.height / rect.height;
    }
    return viewport.width / rect.width;
}
exports.fitRectToViewport = fitRectToViewport;
