import { mat3, mat4, vec3, vec4 } from "gl-matrix";
import { initShaderProgram } from "./feather.webgl.shaders.core";
import { stringFromURL } from "@feather/utils/feather.utils.fileio";
import { VBO } from "./feather.webgl.buffers.core";

export class FeatherWebGLProgram {

    protected program : WebGLProgram = null!;

    constructor(gl : WebGLRenderingContext, vsSourceURL : string, fsSouceURL : string) {
        this.initShader(gl, vsSourceURL, fsSouceURL);
    }

    async initShader(gl : WebGLRenderingContext, vsSourceURL : string, fsSouceURL : string) {
        const program = initShaderProgram(gl, await stringFromURL(vsSourceURL), await stringFromURL(fsSouceURL));
        if (!program) {
            alert("Unable to initialize the shader program.");
            return;
        }
        this.program = program;
    }

    private setUniform(gl : WebGLRenderingContext, name : string, value : any, func : Function) {
        if (!this.program) {
            console.error("Shader program is not initialized.");
            return;
        }
        const location = gl.getUniformLocation(this.program, name);
        if (location === -1) {
            console.error(`Uniform ${name} not found in shader program.`);
            return;
        }
        func.call(gl, location, value);
    }

    private setMatrixUniform(gl : WebGLRenderingContext, name : string, transpose : boolean, value : any, func : Function) {
        if (!this.program) {
            console.error("Shader program is not initialized.");
            return;
        }
        const location = gl.getUniformLocation(this.program, name);
        if (location === -1) {
            console.error(`Uniform ${name} not found in shader program.`);
            return;
        }
        func.call(gl, location, transpose, value);
    }

    public setUniformMat4(gl : WebGLRenderingContext, name : string, value : mat4) {
        this.setMatrixUniform(gl, name, false, value, gl.uniformMatrix4fv);
    }
    public setUniformMat3(gl : WebGLRenderingContext, name : string, value : mat3) {
        this.setMatrixUniform(gl, name, false, value, gl.uniformMatrix3fv);
    }
    public setUniformFloat(gl : WebGLRenderingContext, name : string, value : number) {
        this.setUniform(gl, name, value, gl.uniform1f);
    }
    public setUniformInt(gl : WebGLRenderingContext, name : string, value : number) {
        this.setUniform(gl, name, value, gl.uniform1i);
    }
    public setUniformVec3(gl : WebGLRenderingContext, name : string, value : vec3) {
        this.setUniform(gl, name, value, gl.uniform3fv);
    }
    public setUniformVec4(gl : WebGLRenderingContext, name : string, value : vec4) {
        this.setUniform(gl, name, value, gl.uniform4fv);
    }
    public setUniformTexture(gl : WebGLRenderingContext, name : string, value : number) {
        this.setUniform(gl, name, value, gl.uniform1i);
    }

    public setAttribPointer(gl : WebGLRenderingContext, buffer : WebGLBuffer | null | undefined, name : string, size : number, type : number = gl.FLOAT, normalized : boolean = false, stride : number = 0, offset : number = 0) {
        if (!this.program) {
            console.error("Shader program is not initialized.");
            return;
        }
        if (!buffer) {
            console.error(`Buffer for attribute ${name} is null or undefined.`);
            return;
        }
        const location = gl.getAttribLocation(this.program, name);
        if (location === -1) {
            //console.error(`Attribute ${name} not found in shader program.`);
            return;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        gl.enableVertexAttribArray(location);
    }

    public use(gl : WebGLRenderingContext) : WebGLProgram | null {
        if (!this.program) return null;
        gl.useProgram(this.program);
        return this.program;
    }

}