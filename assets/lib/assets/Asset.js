import io from "../io";
export default class Asset {
    constructor(url, binary = false) {
        this.url = url;
        this.binary = binary;
        this.content = null;
        this._failed = false;
        this._loaded = false;
    }
    get loaded() {
        return this._loaded;
    }
    get failed() {
        return this._failed;
    }
    load(callback) {
        if (this.loaded)
            return;
        const onError = (res) => {
            this._failed = true;
            console.warn("Failed loading Asset", res.status);
        };
        if (!this.binary) {
            return io.load(this.url, (res) => {
                this.content = res;
                this._loaded = true;
                if (callback != undefined)
                    callback();
            }, onError);
        }
        io.loadBinary(this.url, (res) => {
            this.content = res;
            this._loaded = true;
            if (callback != undefined)
                callback();
        }, onError);
    }
    destroy() {
        this.content = null;
    }
}
