import { initBufferFromArray, VBO } from "../feather.webgl.buffers.core";
import { initShaderProgram } from "../feather.webgl.shaders.core";
import { stringFromURL } from "@feather/utils/feather.utils.fileio";
import { FeatherWebGLObjectsBase } from "../objects/feather.webgl.objects.base";
import { mat4 } from "gl-matrix";

export class FeatherWebGLRendererBasic {

  protected lastTime : number = 0;
  public gl : WebGLRenderingContext = null!;
  public projectionMatrix : mat4 = mat4.create();
  public viewMatrix : mat4 = mat4.create();
  protected renderList : Array<FeatherWebGLObjectsBase> = [];

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

  public pushObject(object : FeatherWebGLObjectsBase) : void {
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
    this.renderList.forEach((object) => {
      object.update(this);
    });
    this.renderer();
    requestAnimationFrame(this.update.bind(this));
  }


  public onMouseMove(event : MouseEvent) : void {
    this.renderList.forEach((object) => {
      object.onMouseMove(this, event);
    });
  }
}