import { loadHOBJ } from "@feather/misc/tesseract/feather.misc.tesseract.core";
import { FeatherWebGLProgram } from "../feather.webgl.program";
import { FeatherWebGLObjectsBase4D } from "./feather.webgl.objects.base.4d";

export class FeatherWebGLObjectsHyperMeshHOBJ extends FeatherWebGLObjectsBase4D {
    constructor(gl: WebGLRenderingContext, modelSource : string, vsSourceURL : string = '/assets/shaders/feather.shader.4d.fancy-wireframe.vs', fsSourceURL : string = '/assets/shaders/feather.shader.4d.fancy-wireframe.fs') {
        super(gl, vsSourceURL, fsSourceURL);
        loadHOBJ(gl, this.vbo, modelSource);
    }
}