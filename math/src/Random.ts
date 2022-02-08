/*
 * Better Random number generator thanks to mersenne
 * https://www.npmjs.com/package/mersenne
 */

import mersenne from 'mersenne';

export default class Random {
	/*
	 * Keep constructor for backwards compatibility
	 * DEPRECATED
	 */
	constructor(seed:number=0) {
		mersenne.seed(seed);
	}

	/*
	 * Set generator's seed
	 */
	static seed (seed:number) {
		mersenne.seed(seed);
	}

	/*
	 * Returns number from 0 to 1
	 */
	static random():number {
		let N = 1000;
		return mersenne.rand(N) / (N - 1);
	}

	/*
	 * returns random integer from min to max
	 */
	static randi(min:number= 0, max:number=1):number {
		return Math.round(Random.randf(min, max));
	}
	
	/*
	 * returns random float from min to max
	 */
	static randf(min:number= 0, max:number=1):number {
		return min + (max - min) * Random.random();
	}

	/*
	 * returns a random hex color (int)
	 * use randc().toString(16) to get hex string
	 */
	static randc():number {
		return Random.random() * 0xFFFFFF << 0;
	}

	/**
	 * returns an array of shuffled indexes
	 */
	static randarrind(arr:Array<any>):Array<number> {
		const n = arr.length;
		const seq = Array.from(new Array(n),(val,index)=>index);
		return Random.randarr(seq);
	}

	/**
	* returns a shuffld array
	*/
	static randarr(arr:Array<any>):Array<any> {
		const n = arr.length;

		for(let i=n-1;i>0;i--) {
			const j = Random.randi(0,i);
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}
}