import { Texture } from "three";
export declare type FitType = 'cover' | 'contain';
export declare function createTextureFromFile(file: File, handler?: Function): void;
export declare function perspectiveFov(z: number, viewportHeight?: number): number;
export declare function frustumHeight(fov: number, depth: number): number;
export declare type Size = {
    width: number;
    height: number;
};
export declare function getRatio(size: Size): number;
export declare function getWindowSize(): Size;
export declare function getTextureSize(texture: Texture): Size;
export declare function getTextureRatio(texture: Texture): number;
export declare function fitRectToViewport(rect: Size, viewport?: Size, fit?: FitType): number;
export declare function getTextureViewportRect(texture: Texture, viewport?: Size, fit?: FitType): Size;
export declare function getSizeViewportRect(rect: Size, viewport?: Size, fit?: FitType): Size;
