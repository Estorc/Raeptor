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

mat4 rotateXY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(
        c,   s,   0.0,  0.0,
        -s,   c,   0.0,  0.0,
        0.0, 0.0,  1.0,  0.0,
        0.0, 0.0,  0.0,  1.0
    );
}

mat4 rotateXZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(
        c,   0.0,  s,   0.0,
        0.0, 1.0,  0.0, 0.0,
        -s,   0.0,  c,   0.0,
        0.0, 0.0,  0.0, 1.0
    );
}

mat4 rotateXW(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(
        c,   0.0,  0.0,  s,
        0.0, 1.0,  0.0,  0.0,
        0.0, 0.0,  1.0,  0.0,
        -s,   0.0,  0.0,  c
    );
}

mat4 rotateYZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(
        1.0,  0.0,  0.0, 0.0,
        0.0,  c,    s,   0.0,
        0.0, -s,    c,   0.0,
        0.0,  0.0,  0.0, 1.0
    );
}

mat4 rotateYW(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(
        1.0,  0.0,  0.0,  0.0,
        0.0,  c,    0.0,  s,
        0.0,  0.0,  1.0,  0.0,
        0.0, -s,    0.0,  c
    );
}

mat4 rotateZW(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(
        1.0,  0.0,  0.0,  0.0,
        0.0,  1.0,  0.0,  0.0,
        0.0,  0.0,  c,    s,
        0.0,  0.0, -s,    c
    );
}

mat4 rotate4D(float angleXY, float angleXZ, float angleXW, float angleYZ, float angleYW, float angleZW) {
    mat4 rotationXY = rotateXY(angleXY);
    mat4 rotationXZ = rotateXZ(angleXZ);
    mat4 rotationXW = rotateXW(angleXW);
    mat4 rotationYZ = rotateYZ(angleYZ);
    mat4 rotationYW = rotateYW(angleYW);
    mat4 rotationZW = rotateZW(angleZW);
    
    // Combine all rotations in order
    return rotationZW * rotationYW * rotationYZ * rotationXW * rotationXZ * rotationXY;
}

void main() {
    vBary = aVertexBarycentric;
    mat4 modelMatrix4D = rotate4D(uTime, uTime, uTime, uTime, uTime, uTime);
    vec4 transformed = modelMatrix4D * aVertexPosition;
    float w = 2.5; // distance of observer in W
    vec3 projected = transformed.xyz / (w - transformed.w);
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(projected, 1.0);
}