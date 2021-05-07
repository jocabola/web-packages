import io from "../io";

export default class Asset {
	url:string;
	protected _loaded:boolean;
	protected _failed:boolean;
	content:any;
	protected binary:boolean;
	constructor (url:string, binary:boolean=false) {
		this.url = url;
		this.binary = binary;
		this.content = null;
		this._failed = false;
		this._loaded = false;
	}

	get loaded():boolean {
		return this._loaded;
	}

	get failed():boolean {
		return this._failed;
	}

	load( callback?:Function ) {
		if ( this.loaded ) return;
			// console.log( "loading", this.url );

		const onError = (res:XMLHttpRequest) => {
			this._failed = true;
			console.warn("Failed loading Asset", res.status);
		}

		if ( !this.binary ) {
			return io.load(this.url, (res:XMLHttpRequest) => {
				this.content = res;
				this._loaded = true;
				if ( callback != undefined ) callback();
			}, onError);
		}

		// if not loads binary
		io.loadBinary(this.url, (res:XMLHttpRequest) => {
			this.content = res;
			this._loaded = true;
			if (callback != undefined) callback();
		}, onError);
	}

	destroy () {
		this.content = null;
	}
}