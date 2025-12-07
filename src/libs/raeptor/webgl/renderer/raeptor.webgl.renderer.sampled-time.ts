import { initBufferFromArray, VBO } from "../raeptor.webgl.buffers.core";
import { initShaderProgram } from "../raeptor.webgl.shaders.core";
import { stringFromURL } from "@raeptor/utils/raeptor.utils.fileio";
import { RaeptorWebGLObjectsBase } from "../objects/raeptor.webgl.objects.base";
import { mat4 } from "gl-matrix";
import { RaeptorWebGLRendererBasic } from "./raeptor.webgl.renderer.basic";
import { reduce } from "rxjs";

export class RaeptorWebGLRendererSampledTime extends RaeptorWebGLRendererBasic {
  public time : number = 0;
  private performanceSamples : Array<number> = [];
  private performanceApprox : number = 0.0;

  public override getTime() : number {
    return this.time / 1000;
  }

  protected override renderer() : void {
    if (typeof this.time !== 'undefined') {
      const deltaTime = performance.now() - this.lastTime;
      if (!this.performanceApprox || deltaTime - this.performanceApprox < 1.0) {
        this.performanceSamples.push(deltaTime);
      }
      if (this.performanceSamples.length > 100) {
        this.performanceSamples.shift();
      }
      this.performanceApprox = this.performanceSamples.reduce((a, b) => a + b) / this.performanceSamples.length;
      this.time += this.performanceApprox;
    }
    super.renderer();
  }

}