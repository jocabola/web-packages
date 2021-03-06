/**
 * Cached Curve containes an array of cached points
 * Of an arbitrary THREEjs Curve class.
 * It is meant to be used for animation to reduce calculations
 * on getPoint(t) in every frame
 */


import { Curve, Vector3 } from "three";
import MathUtils from "./MathUtils";
 
 const TMP:Vector3 = new Vector3();
 
 export class CachedCurve {
     private nPoints:number;
     points:Array<Vector3>;
     private curve:Curve<Vector3>;
 
     constructor(curve:Curve<Vector3>, nPoints:number=100) {
         this.points = curve.getPoints(nPoints);
         this.curve = curve;
         this.nPoints = this.points.length
     }
 
     getPoint(t:number, target:Vector3=null):Vector3 {
         const T = t * (this.nPoints-1);
         const k1 = ~~(T);
         const k2 = k1 != T ? Math.min(this.nPoints-1, Math.ceil(T)) : k1;
         if (k1 === k2) {
             if(target != null) return target.copy(this.points[k1]);
             return this.points[k1];
         }

         const fract = MathUtils.fract(T);
         if(target != null) return target.copy(this.points[k1]).lerp(this.points[k2], fract);
         return TMP.copy(this.points[k1]).lerp(this.points[k2], fract);
     }
 }