import { FeatherWebGLProgram } from "../feather.webgl.program";
import { FeatherWebGLRendererBasic } from "../renderer/feather.webgl.renderer.basic";
import { FeatherWebGLObjectsBase } from "./feather.webgl.objects.base";
import { mat4, vec3, vec4 } from "gl-matrix";

export class FeatherWebGLObjectsBase4D extends FeatherWebGLObjectsBase {
    private position : vec3 = [0, 0, 0];
    private rotation : mat4 = mat4.create();
    private scale : vec3 = [1, 1, 1];

    constructor(gl : WebGLRenderingContext, vsSourceURL : string = '/assets/shaders/feather.shader.4d.fancy-wireframe.vs', fsSourceURL : string = '/assets/shaders/feather.shader.4d.fancy-wireframe.fs') {
        super(gl, vsSourceURL, fsSourceURL);
    }

    override update(renderer : FeatherWebGLRendererBasic) : void {
        // Update the model matrix
    }

    public override render(renderer : FeatherWebGLRendererBasic) : void {

        super.render(renderer);
        if (!this.program.use(renderer.gl)) return;

        // Set the model matrix
        const modelMatrix = this.getModelMatrix();
        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        if (this.vbo) {
            // Bind the VBO
            this.program.setAttribPointer(renderer.gl, this.vbo.position, "aVertexPosition", 4);
            this.program.setAttribPointer(renderer.gl, this.vbo.normal, "aVertexNormal", 3);
            this.program.setAttribPointer(renderer.gl, this.vbo.barycentric, "aVertexBarycentric", 3);
            this.program.setAttribPointer(renderer.gl, this.vbo.uv, "aVertexUV", 2);
        }

        // Set the uniform matrices
        this.program.setUniformMat4(renderer.gl, "uProjectionMatrix", renderer.projectionMatrix);
        this.program.setUniformMat4(renderer.gl, "uViewMatrix", renderer.viewMatrix);
        this.program.setUniformMat4(renderer.gl, "uModelMatrix", modelMatrix);
        this.program.setUniformMat4(renderer.gl, "uNormalMatrix", normalMatrix);
        this.program.setUniformVec3(renderer.gl, "uColor", vec3.fromValues(0.7, 0.7, 0.7));
        this.program.setUniformFloat(renderer.gl, "uAlpha", 1.0);
        this.program.setUniformFloat(renderer.gl, "uTime", renderer.getTime()/2.0);

        this.children.forEach((child) => {
            child.render(renderer);
        });

        renderer.gl.enable(renderer.gl.BLEND);
        renderer.gl.blendFunc(renderer.gl.SRC_ALPHA, renderer.gl.ONE_MINUS_SRC_ALPHA);
        renderer.gl.drawArrays(renderer.gl.TRIANGLES, 0, this.vbo.count);
    }

    getModelMatrix() {
        const modelMatrix = mat4.create();
        mat4.translate(modelMatrix, modelMatrix, this.position);
        mat4.multiply(modelMatrix, modelMatrix, this.rotation);
        mat4.scale(modelMatrix, modelMatrix, this.scale);
        return modelMatrix;
    };

    setPosition(position: vec3) {
        this.position = position;
    };
    setRotation(rotation: mat4) {
        this.rotation = rotation;
    };
    setScale(scale: vec3) {
        this.scale = scale;
    };

    getPosition() {
        return this.position;
    };
    getRotation() {
        return this.rotation;
    };
    getScale() {
        return this.scale;
    };
}