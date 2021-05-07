#version 100
precision highp float;

#include <depth>

uniform sampler2D tDepth;
uniform sampler2D tInput;
uniform sampler2D tBlur;
uniform bool debug;
varying vec2 vUv;

uniform float aperture;
uniform float focalDistance;

void main () {
	float depth = smoothstep(0., 1., readDepth (tDepth, vUv));
	vec3 noBlur = texture2D(tInput, vUv).rgb;
	vec3 blur = texture2D(tBlur, vUv).rgb;

	float distanceToCamera = mix(cameraNear, cameraFar, depth);

	float CoC = distance(distanceToCamera, focalDistance);
	float st = smoothstep(0.0, aperture, CoC);

	vec3 color = mix(noBlur, blur, st);
	
	if(debug) {
		gl_FragColor = vec4(vec3(depth), 1.0);
	}
	else {
		gl_FragColor = vec4(color, 1.0);
	}
}