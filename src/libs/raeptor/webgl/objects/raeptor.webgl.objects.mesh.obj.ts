import { loadOBJ } from "@raeptor/misc/tesseract/raeptor.misc.tesseract.core";
import { RaeptorWebGLProgram } from "../raeptor.webgl.program";
import { RaeptorWebGLObjectsBase3D } from "./raeptor.webgl.objects.base.3d";

export class RaeptorWebGLObjectsMeshOBJ extends RaeptorWebGLObjectsBase3D {
    constructor(gl: WebGLRenderingContext, modelSource : string, vsSourceURL: string = '/assets/shaders/raeptor.shader.fancy-wireframe.vs', fsSourceURL : string = '/assets/shaders/raeptor.shader.fancy-wireframe.fs') {
        super(gl, vsSourceURL, fsSourceURL);
        loadOBJ(gl, this.vbo, modelSource);
    }
}