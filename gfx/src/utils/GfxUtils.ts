import { Texture } from "three";

const RAD2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;

export function createTextureFromFile (file:File, handler:Function=null) {
	if(file.type.indexOf("image") === -1) console.warn("File is not an Image!");
	let reader  = new FileReader();
	let img = new Image();
	reader.addEventListener("load", function () {
		img.onload = () => {
			const tex = new Texture(img);
			handler(tex);
		}
		img.src = reader.result.toString();
	}, false);
	reader.readAsDataURL(file);
}

/**
 * Get perspective's FOV at a given depth
 * @param z Perspective's depth (usually camera.position.z)
 * @param viewportHeight Viewport's Height (default: window.innerHeight)
 * @returns FOV in degrees
 */
export function perspectiveFov(z:number, viewportHeight:number=window.innerHeight): number{
	return 2 * Math.atan(viewportHeight * .5 / z) * RAD2DEG;
}

/**
 * Get viewport's height at any given depth. 
 * @param fov camera's FOV
 * @param depth distance to camera. usually object.z - cam.z
 * @returns height of frustum
 */
export function frustumHeight(fov:number, depth:number): number {
	return 2 * (depth * Math.tan((fov * .5) * DEG2RAD));
}

export type Size = {
	width:number,
	height:number
}

/**
 * Gets a rect's ratio
 * @param size size of rect. Note: A Vector2 of THREE should work since it implements this type
 * @returns ratio of rect
 */
export function getRatio(size:Size): number {
	return size.width / size.height;
}

/**
 * Gets Window size
 * @returns Window's size
 */
export function getWindowSize(): Size {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	}
}

/**
 * Returns Texture Size (width x height)
 * @param texture Input texture
 * @returns texture's Size
 */
export function getTextureSize(texture:Texture): Size {
	return texture.image;
}

/**
 * Calculates the ratio of a given texture
 * @param texture imput texture
 * @returns texture's ratio
 */
export function getTextureRatio(texture:Texture): number {
	return getRatio(texture.image);
}

/**
 * Returns a scale factor to fit a given rect into viewport.
 * @param rect size of the rect (possible a plane with an image)
 * @param viewport size of viewport (usually window)
 * @returns scale factor you need to apply
 */
export function fitRectToViewport (rect:Size, viewport:Size=getWindowSize()): number {
	const vratio = getRatio(viewport);
	const ratio = getRatio(rect);

	if(ratio > vratio) {
		return viewport.height / rect.height;
	}

	return viewport.width / rect.width;
}