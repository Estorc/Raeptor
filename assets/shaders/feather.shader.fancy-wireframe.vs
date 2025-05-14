attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexBarycentric;
attribute vec3 aVertexUV;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform float uTime;
varying vec3 vBary;

void main() {
    vBary = aVertexBarycentric;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aVertexPosition;
}