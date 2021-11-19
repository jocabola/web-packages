import { Geo } from "./core";

/**
 * Creates a Mesh Line along a path
 * represented by an array of x,y,z values
 */
export class MeshLine implements Geo {
	positions: Float32Array;
	indices: Uint16Array;

	constructor(points:Array<number>|Float32Array, lineWidth:number=1) {
		if(!points.length) {
			console.warn("Array is Empty");
			return;
		}
		this.setGeometry(points, lineWidth);
	}

	private setGeometry(pts:Array<number>|Float32Array, lineWidth:number=1) {

	}
}