import { Texture } from "three";

export default class GfxUtils {
	static createTextureFromFile (file:File, handler:Function=null) {
		if(file.type.indexOf("image") === -1) console.warn("File is not an Image!")
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
}