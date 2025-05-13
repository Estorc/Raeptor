import { VBO } from "../feather.webgl.buffers.core";
import { FeatherWebGLProgram } from "../feather.webgl.program";
import { FeatherWebGLRendererBasic } from "../renderer/feather.webgl.renderer.basic";

export class FeatherWebGLObjectsBase {

    [key : string] : any;
    protected program : FeatherWebGLProgram = null!;
    protected vbo : VBO = {
        count: 0
    };
    protected children : Array<FeatherWebGLObjectsBase> = [];

    constructor(gl : WebGLRenderingContext, vsSourceURL : string = '/assets/shaders/feather.shader.basic.vs', fsSourceURL : string = '/assets/shaders/feather.shader.basic.fs') {
        this.program = new FeatherWebGLProgram(gl, vsSourceURL, fsSourceURL);
    }

    public render(renderer : FeatherWebGLRendererBasic) {
        // Implement render logic here
    }

    public update(renderer : FeatherWebGLRendererBasic) {
        // Implement update logic here
    }

    public onMouseMove(renderer : FeatherWebGLRendererBasic, event : MouseEvent) : void {
        // Implement mouse move logic here
    }

}