import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { loadHOBJ, loadOBJ } from './feather.misc.tesseract.core'
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { FeatherWebGLRendererSampledTime } from '@feather/webgl/renderer/feather.webgl.renderer.sampled-time';
import { FeatherWebGLObjectsMeshOBJ } from '@feather/webgl/objects/feather.webgl.objects.mesh.obj';
import { FeatherWebGLObjectsHyperMeshHOBJ } from '@feather/webgl/objects/feather.webgl.objects.hypermesh.hobj';
import { FeatherWebGLObjectsBase } from '@feather/webgl/objects/feather.webgl.objects.base';
import { mat4 } from 'gl-matrix';
import { FeatherWebGLRendererBasic } from '@feather/webgl/renderer/feather.webgl.renderer.basic';
import { stringFromURL } from '@feather/utils/feather.utils.fileio';

@Component({
  selector: 'feather-misc-tesseract',
  templateUrl: './feather.misc.tesseract.component.html',
  styleUrl: './feather.misc.tesseract.component.scss'
})
export class FeatherMiscTesseractComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  renderer : FeatherWebGLRendererBasic = null!;

  loadOBJ(event : Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const text = reader.result as string;
      const obj = new FeatherWebGLObjectsMeshOBJ(this.renderer.gl, text);
      obj.setPosition([0, 0, -5]);
      this.renderer.pushObject(obj);
      console.log('OBJ file loaded: ', obj);
    };

    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
    };

    reader.readAsText(file);
  };

  loadHOBJ(event : Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const text = reader.result as string;
      const hobj = new FeatherWebGLObjectsHyperMeshHOBJ(this.renderer.gl, text);

      hobj.update = function(renderer : FeatherWebGLRendererBasic) {
        if (this['lastTimes'] === undefined) {
          this['lastTimes'] = [];
        }
        this['lastTimes'].unshift(renderer.getTime());
        if (this['lastTimes'].length > 10) {
          this['lastTimes'].pop();
        }
      }

      const hobj_render = hobj.render.bind(hobj);
      hobj.render = function(renderer : FeatherWebGLRendererBasic) {
        hobj_render(renderer);
        if (this['lastTimes'] !== undefined) {
          for (let i = 0; i < this['lastTimes'].length; i++) {
            const lastTime = this['lastTimes'][i];
            this.program.setUniformFloat(renderer.gl, 'uTime', lastTime/2.0);
            this.program.setUniformFloat(renderer.gl, "uAlpha", ((this['lastTimes'].length - i)/this['lastTimes'].length)/2.0);
            renderer.gl.drawArrays(renderer.gl.TRIANGLES, 0, this.vbo.count);
          }
        }
      }

      hobj.setPosition([0, 0, -5]);
      this.renderer.pushObject(hobj);
      console.log('HOBJ file loaded: ', hobj);
    };

    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
    };

    reader.readAsText(file);
  };

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas : HTMLCanvasElement = this.canvasRef.nativeElement;
      this.renderer = new FeatherWebGLRendererBasic(canvas);

      const controller = new FeatherWebGLObjectsBase(this.renderer.gl);
      controller.onMouseMove = function(renderer : FeatherWebGLRendererBasic, event : MouseEvent) {
        this['TargetX'] = (event.clientX - renderer.gl.canvas.width / 2) / 10000;
        this['TargetY'] = (event.clientY - renderer.gl.canvas.height / 2) / 10000;
      };
      controller.update = function(renderer : FeatherWebGLRendererBasic) {
        if (this['X'] === undefined && this['Y'] === undefined) {
          this['X'] = 0;
          this['Y'] = 0;
        };
        if (this['TargetX'] !== undefined && this['TargetY'] !== undefined) {
          this['X'] += (this['TargetX'] - this['X']) * 0.2;
          this['Y'] += (this['TargetY'] - this['Y']) * 0.2;
          mat4.identity(renderer.viewMatrix);
          mat4.rotate(renderer.viewMatrix, renderer.viewMatrix, this['X'], [0, 1, 0]);
          mat4.rotate(renderer.viewMatrix, renderer.viewMatrix, this['Y'], [1, 0, 0]);
        };
      };

      this.renderer.pushObject(controller);


      const text = await stringFromURL('/assets/models/tesseract.hobj');
      const hobj = new FeatherWebGLObjectsHyperMeshHOBJ(this.renderer.gl, text);

      hobj.update = function(renderer : FeatherWebGLRendererBasic) {
        if (this['lastTimes'] === undefined) {
          this['lastTimes'] = [];
        }
        this['lastTimes'].unshift(renderer.getTime());
        if (this['lastTimes'].length > 10) {
          this['lastTimes'].pop();
        }
      }

      const hobj_render = hobj.render.bind(hobj);
      hobj.render = function(renderer : FeatherWebGLRendererBasic) {
        hobj_render(renderer);
        if (this['lastTimes'] !== undefined) {
          for (let i = 0; i < this['lastTimes'].length; i++) {
            const lastTime = this['lastTimes'][i];
            this.program.setUniformFloat(renderer.gl, 'uTime', lastTime/2.0);
            this.program.setUniformFloat(renderer.gl, "uAlpha", ((this['lastTimes'].length - i)/this['lastTimes'].length)/2.0);
            renderer.gl.drawArrays(renderer.gl.TRIANGLES, 0, this.vbo.count);
          }
        }
      }

      hobj.setPosition([0, 0, -5]);
      this.renderer.pushObject(hobj);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.onMouseMove(event);
    }
  }
}
  