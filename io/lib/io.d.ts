declare class ResponseParams {
    responseType: XMLHttpRequestResponseType;
}
export default class io {
    private static _instance;
    private constructor();
    static get Instance(): io;
    static load(url: string, callback?: Function, errorCallback?: Function, params?: ResponseParams): void;
    static loadBinary(url: string, callback?: Function, errorCallback?: Function): void;
    static fetchVimeo(url: string, callback: Function): void;
}
export {};
