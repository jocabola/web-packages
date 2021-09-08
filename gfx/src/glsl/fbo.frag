#version 100
precision lowp float;

uniform sampler2D tInput;
uniform float opacity;

varying vec2 vUv;

void main() {
	gl_FragColor = texture2D(tInput, vUv) * opacity;
}