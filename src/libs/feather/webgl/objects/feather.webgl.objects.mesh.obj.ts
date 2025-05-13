import { loadOBJ } from "@feather/misc/tesseract/feather.misc.tesseract.core";
import { FeatherWebGLProgram } from "../feather.webgl.program";
import { FeatherWebGLObjectsBase3D } from "./feather.webgl.objects.base.3d";

export class FeatherWebGLObjectsMeshOBJ extends FeatherWebGLObjectsBase3D {
    constructor(gl: WebGLRenderingContext, modelSource : string, vsSourceURL: string = '/assets/shaders/feather.shader.fancy-wireframe.vs', fsSourceURL : string = '/assets/shaders/feather.shader.fancy-wireframe.fs') {
        super(gl, vsSourceURL, fsSourceURL);
        loadOBJ(gl, this.vbo, modelSource);
    }
}