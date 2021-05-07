export default class FileUtils {
    private static _instance;
    private constructor();
    static get Instance(): FileUtils;
    static addFileDropHandler(el: HTMLElement, dropHandler: Function, overHandler?: Function): void;
}
