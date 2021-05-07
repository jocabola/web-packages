/*
 * File Utils Class
 * Following Singleton TS pattern
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#private-and-protected-constructors
 * 
 */

export default class FileUtils {
	private static _instance: FileUtils;

	private constructor() {}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
	
	static addFileDropHandler(el:HTMLElement, dropHandler:Function, overHandler?:Function) {
		el.addEventListener("dragover", (ev:DragEvent) => {
			ev.preventDefault();
			if(overHandler !== undefined) overHandler(ev);
		});
		el.addEventListener("drop", (ev:DragEvent) => {
			ev.preventDefault();
			if (ev.dataTransfer != null && ev.dataTransfer.items) {
				const files = [];
				// Use DataTransferItemList interface to access the file(s)
				for (var i = 0; i < ev.dataTransfer.items.length; i++) {
					// If dropped items aren't files, reject them
					if (ev.dataTransfer.items[i].kind === 'file') {
						var file = ev.dataTransfer.items[i].getAsFile();
						files.push(file);
					}
				}
				dropHandler(files);
			} else {
				// Use DataTransfer interface to access the file(s)
				dropHandler(ev.dataTransfer != null && ev.dataTransfer.files);
			}
		});
	}
	
}

const FileUtilsInstance = FileUtils.Instance;