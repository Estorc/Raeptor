import { VBO } from "../raeptor.webgl.buffers.core";
import { RaeptorWebGLProgram } from "../raeptor.webgl.program";
import { RaeptorWebGLRendererBasic } from "../renderer/raeptor.webgl.renderer.basic";

export class RaeptorWebGLObjectsBase {

    [key : string] : any;
    protected program : RaeptorWebGLProgram = null!;
    protected vbo : VBO = {
        count: 0
    };
    protected children : Array<RaeptorWebGLObjectsBase> = [];

    constructor(gl : WebGLRenderingContext, vsSourceURL : string = '/assets/shaders/raeptor.shader.basic.vs', fsSourceURL : string = '/assets/shaders/raeptor.shader.basic.fs') {
        this.program = new RaeptorWebGLProgram(gl, vsSourceURL, fsSourceURL);
    }

    public render(renderer : RaeptorWebGLRendererBasic) {
        // Implement render logic here
    }

    public update(renderer : RaeptorWebGLRendererBasic) {
        // Implement update logic here
    }

    public onMouseMove(renderer : RaeptorWebGLRendererBasic, event : MouseEvent) : void {
        // Implement mouse move logic here
    }

}