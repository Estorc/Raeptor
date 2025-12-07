import { initBufferFromArray, VBO } from "../raeptor.webgl.buffers.core";
import { initShaderProgram } from "../raeptor.webgl.shaders.core";
import { stringFromURL } from "@raeptor/utils/raeptor.utils.fileio";
import { RaeptorWebGLObjectsBase } from "../objects/raeptor.webgl.objects.base";
import { mat4 } from "gl-matrix";

export class RaeptorWebGLRendererBasic {

  protected lastTime : number = 0;
  public gl : WebGLRenderingContext = null!;
  public projectionMatrix : mat4 = mat4.create();
  public viewMatrix : mat4 = mat4.create();
  protected renderList : Array<RaeptorWebGLObjectsBase> = [];
  private animationFrameId : number = 0;
  private running : boolean = true;

  constructor(canvas : HTMLCanvasElement) {
    this.initWebGL(canvas);
  }

  private initWebGL(canvas : HTMLCanvasElement) : void {
    const gl : WebGLRenderingContext | null = canvas.getContext('webgl');
    if (gl === null) {
      alert(
        "Unable to initialize WebGL. Your browser or machine may not support it.",
      );
      return;
    }
    this.gl = gl;
    this.gl.getExtension('OES_standard_derivatives');
    this.update();
  }

  public pushObject(object : RaeptorWebGLObjectsBase) : void {
    this.renderList.push(object);
  };

  public getTime() : number {
    return performance.now() / 1000;
  }

  public getDeltaTime() : number {
    return this.getTime() - this.lastTime / 1000;
  }

  protected renderer() : void {
    this.gl.canvas.width = window.innerWidth;
    this.gl.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    const fieldOfView : number = (45 * Math.PI) / 180;
    const aspect : number = this.gl.canvas.width / this.gl.canvas.height;
    const zNear : number = 0.1;
    const zFar : number = 100.0;
    mat4.identity(this.projectionMatrix);
    mat4.perspective(this.projectionMatrix, fieldOfView, aspect, zNear, zFar);

    this.renderList.forEach((object) => {
      object.render(this);
    });
    this.lastTime = performance.now();
    
  }


  protected update() : void {
    if (!this.running) return;
    this.renderList.forEach((object) => {
      object.update(this);
    });
    this.renderer();
    this.animationFrameId = requestAnimationFrame(this.update.bind(this));
  }


  public onMouseMove(event : MouseEvent) : void {
    this.renderList.forEach((object) => {
      object.onMouseMove(this, event);
    });
  }

  public destroy() : void {
    this.running = false;
    cancelAnimationFrame(this.animationFrameId);
  }
}