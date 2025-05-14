attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexUV;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
varying vec3 vBary;

void main() {
    //vNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
    vBary = aVertexUV;
    gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(aVertexPosition, 1.0);
}