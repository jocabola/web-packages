import Asset from "./assets/Asset";

export default class AssetsBundle {
	assets:Array<Asset> = [];

	constructor() {}

	add(asset:Asset) {
		this.assets.push(asset);
	}

	/**
	 * 
	 * @param onLoaded Callback to be called when all assets are loaded
	 * @param onProgress Callback for loading progress. Receives float between 0 and 1.
	 */
	loadAll(onLoaded:Function=null, onProgress:Function=null) {
		for (const a of this.assets) {
			a.load();
		}

		if(onLoaded != null || onProgress != null) {
			const prog = () => {
				if(this.loaded) {
					onProgress(1);
					return onLoaded();
				}
				if(onProgress != null) onProgress(this.getProgress());
				window.setTimeout(prog, 100/3);
			}

			prog();
		}
	}

	load(i:number) {
		if (i < this.assets.length && !this.assets[i].loaded) this.assets[i].load();
		else console.warn('Asset out of range or already loaded');
	}

	getProgress():number {
		let p = 0;
		let k = 0;

		for (let a of this.assets) {
			if (a.loaded) {
				k++;
				p += 1 / this.assets.length;
			}
		}

		if (k === this.assets.length) p = 1;

		return p;
	}

	get(i:number):Asset|null {
		if(i<0||i>this.assets.length-1) return null;
		return this.assets[i];
	}

	getByURL(url:string):Asset|null {
		for (let i = 0; i < this.assets.length; i++) {
			if (this.assets[i].url == url) return this.assets[i];
		}

		return null;
	}

	getIndexByURL(url:string):number {
		for (let i = 0; i < this.assets.length; i++) {
			if (this.assets[i].url == url) return i;
		}

		return -1;
	}

	destroy() {
		for (let i = 0; i < this.assets.length; i++) {
			this.assets[i].destroy();
		}

		this.assets.splice(0,this.assets.length);
	}

	get failed():boolean {
		for (let a of this.assets) {
			if (a.failed) return true;
		}

		return false;
	}

	get loaded():boolean {
		for (let a of this.assets) {
			if (a.failed||!a.loaded) return false;
		}

		return true;
	}
}