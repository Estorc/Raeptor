import { loadHOBJ } from "@raeptor/misc/tesseract/raeptor.misc.tesseract.core";
import { RaeptorWebGLProgram } from "../raeptor.webgl.program";
import { RaeptorWebGLObjectsBase4D } from "./raeptor.webgl.objects.base.4d";

export class RaeptorWebGLObjectsHyperMeshHOBJ extends RaeptorWebGLObjectsBase4D {
    constructor(gl: WebGLRenderingContext, modelSource : string, vsSourceURL : string = '/assets/shaders/raeptor.shader.4d.fancy-wireframe.vs', fsSourceURL : string = '/assets/shaders/raeptor.shader.4d.fancy-wireframe.fs') {
        super(gl, vsSourceURL, fsSourceURL);
        loadHOBJ(gl, this.vbo, modelSource);
    }
}