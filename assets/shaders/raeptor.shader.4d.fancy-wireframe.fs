#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec3 uColor;
uniform float uAlpha;
varying vec3 vBary;

void main() {
    float thickness = 3.0;
    vec3 d = fwidth(vBary); // screen-space derivative for anti-aliasing
    vec3 edge = smoothstep(vec3(0.0), d * thickness, vBary);
    edge += (1.0 - distance(vBary, vec3(0.5, 0.5, 0.5))) * 1.5;
    float edgeAlpha = 1.0 - min(min(edge.x, 1.0), edge.z);

    //if (edgeAlpha < 0.01) discard;

    gl_FragColor = vec4(1.0, 1.0, 1.0, edgeAlpha) * vec4(uColor, uAlpha);
}