export interface Geo {
	positions: Float32Array,
	indices: Uint16Array
}

export type Point = {
	x:number,
	y:number,
	z:number
}

export type Tri = {
	p0:Point,
	p1:Point,
	p2:Point
}

export type Quad = {
	p0:Point,
	p1:Point,
	p2:Point,
	p3:Point
}