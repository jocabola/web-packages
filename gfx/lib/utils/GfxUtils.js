import { Texture } from "three";
const RAD2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;
export function createTextureFromFile(file, handler = null) {
    if (file.type.indexOf("image") === -1)
        console.warn("File is not an Image!");
    let reader = new FileReader();
    let img = new Image();
    reader.addEventListener("load", function () {
        img.onload = () => {
            const tex = new Texture(img);
            handler(tex);
        };
        img.src = reader.result.toString();
    }, false);
    reader.readAsDataURL(file);
}
export function perspectiveFov(z, viewportHeight = window.innerHeight) {
    return 2 * Math.atan(viewportHeight * .5 / z) * RAD2DEG;
}
export function frustumHeight(fov, depth) {
    return 2 * (depth * Math.tan((fov * .5) * DEG2RAD));
}
export function getRatio(size) {
    return size.width / size.height;
}
export function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}
export function getTextureSize(texture) {
    return texture.image;
}
export function getTextureRatio(texture) {
    return getRatio(texture.image);
}
export function fitRectToViewport(rect, viewport = getWindowSize(), fit = 'cover') {
    const vratio = getRatio(viewport);
    const ratio = getRatio(rect);
    if (ratio > vratio) {
        return fit == 'cover' ? viewport.height / rect.height : viewport.width / rect.width;
    }
    return fit == 'cover' ? viewport.width / rect.width : viewport.height / rect.height;
}
export function getTextureViewportRect(texture, viewport = getWindowSize(), fit = 'cover') {
    const scl = fitRectToViewport(texture.image, viewport, fit);
    const tSize = texture.image;
    return {
        width: tSize.width * scl,
        height: tSize.height * scl
    };
}
export function getSizeViewportRect(rect, viewport = getWindowSize(), fit = 'cover') {
    const scl = fitRectToViewport(rect, viewport, fit);
    return {
        width: rect.width * scl,
        height: rect.height * scl
    };
}
