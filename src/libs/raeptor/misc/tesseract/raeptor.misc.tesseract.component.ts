import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { loadHOBJ, loadOBJ } from './raeptor.misc.tesseract.core'
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RaeptorWebGLRendererSampledTime } from '@raeptor/webgl/renderer/raeptor.webgl.renderer.sampled-time';
import { RaeptorWebGLObjectsMeshOBJ } from '@raeptor/webgl/objects/raeptor.webgl.objects.mesh.obj';
import { RaeptorWebGLObjectsHyperMeshHOBJ } from '@raeptor/webgl/objects/raeptor.webgl.objects.hypermesh.hobj';
import { RaeptorWebGLObjectsBase } from '@raeptor/webgl/objects/raeptor.webgl.objects.base';
import { mat4 } from 'gl-matrix';
import { RaeptorWebGLRendererBasic } from '@raeptor/webgl/renderer/raeptor.webgl.renderer.basic';
import { stringFromURL } from '@raeptor/utils/raeptor.utils.fileio';

@Component({
  selector: 'raeptor-misc-tesseract',
  templateUrl: './raeptor.misc.tesseract.component.html',
  styleUrl: './raeptor.misc.tesseract.component.scss'
})
export class RaeptorMiscTesseractComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  renderer : RaeptorWebGLRendererBasic = null!;

  loadOBJ(event : Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const text = reader.result as string;
      const obj = new RaeptorWebGLObjectsMeshOBJ(this.renderer.gl, text);
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
      const hobj = new RaeptorWebGLObjectsHyperMeshHOBJ(this.renderer.gl, text);

      hobj.update = function(renderer : RaeptorWebGLRendererBasic) {
        if (this['lastTimes'] === undefined) {
          this['lastTimes'] = [];
        }
        this['lastTimes'].unshift(renderer.getTime());
        if (this['lastTimes'].length > 10) {
          this['lastTimes'].pop();
        }
      }

      const hobj_render = hobj.render.bind(hobj);
      hobj.render = function(renderer : RaeptorWebGLRendererBasic) {
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
      this.renderer = new RaeptorWebGLRendererBasic(canvas);

      const controller = new RaeptorWebGLObjectsBase(this.renderer.gl);
      controller.onMouseMove = function(renderer : RaeptorWebGLRendererBasic, event : MouseEvent) {
        this['TargetX'] = (event.clientX - renderer.gl.canvas.width / 2) / 10000;
        this['TargetY'] = (event.clientY - renderer.gl.canvas.height / 2) / 10000;
      };
      controller.update = function(renderer : RaeptorWebGLRendererBasic) {
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
      const hobj = new RaeptorWebGLObjectsHyperMeshHOBJ(this.renderer.gl, text);

      hobj.update = function(renderer : RaeptorWebGLRendererBasic) {
        if (this['lastTimes'] === undefined) {
          this['lastTimes'] = [];
        }
        this['lastTimes'].unshift(renderer.getTime());
        if (this['lastTimes'].length > 10) {
          this['lastTimes'].pop();
        }
      }

      const hobj_render = hobj.render.bind(hobj);
      hobj.render = function(renderer : RaeptorWebGLRendererBasic) {
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

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.destroy();
    }
  };
}
  