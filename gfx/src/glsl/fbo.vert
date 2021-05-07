#version 100

precision lowp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float time;

varying vec2 vUv;

void main () {
	vec3 pos = position;
	vUv = uv;
	vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
	gl_Position = projectionMatrix * mvPos;
}