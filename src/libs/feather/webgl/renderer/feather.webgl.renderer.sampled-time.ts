import { initBufferFromArray, VBO } from "../feather.webgl.buffers.core";
import { initShaderProgram } from "../feather.webgl.shaders.core";
import { stringFromURL } from "@feather/utils/feather.utils.fileio";
import { FeatherWebGLObjectsBase } from "../objects/feather.webgl.objects.base";
import { mat4 } from "gl-matrix";
import { FeatherWebGLRendererBasic } from "./feather.webgl.renderer.basic";
import { reduce } from "rxjs";

export class FeatherWebGLRendererSampledTime extends FeatherWebGLRendererBasic {
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