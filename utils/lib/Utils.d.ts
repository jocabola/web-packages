declare class ResponseParams {
    responseType: XMLHttpRequestResponseType;
}
declare type StateObject = {
    slug: string;
    title: string;
};
export default class Utils {
    private static _instance;
    private constructor();
    static get Instance(): Utils;
    static el(type: string, className?: string, parent?: HTMLElement): HTMLElement;
    static $(type: string, className?: string, parent?: HTMLElement): HTMLElement;
    static webgl(): boolean;
    static getDocumentHeight(): number;
    static isMobile(): boolean;
    static isBrowser(vendor: string): boolean;
    static isSafari(): boolean;
    static getAndroidVersion(): number;
    static getIOSVersion(): number;
    static isIphone(): boolean;
    static isIpad(): boolean;
    static isDesktop(): boolean;
    static isTouchDevice(): boolean;
    static hasGetUserMedia(): boolean;
    static copyToClipboard(str: string): void;
    static loadData(url: string, callback?: Function, params?: ResponseParams): void;
    static pushState(state: StateObject): void;
}
export {};
