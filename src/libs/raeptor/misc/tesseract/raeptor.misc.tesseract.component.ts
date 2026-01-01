import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, Renderer2, ViewChild } from '@angular/core';
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
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { platform } from 'os';

@Component({
  selector: 'raeptor-misc-tesseract',
  imports: [TranslateModule],
  templateUrl: './raeptor.misc.tesseract.component.html',
  styleUrl: './raeptor.misc.tesseract.component.scss',
  standalone: true,
})
export class RaeptorMiscTesseractComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private el: ElementRef, private DOMRenderer: Renderer2, private router: Router) {}
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  @ViewChild('museumInstructions', { static: true }) private museumInstructionsRef!: ElementRef;
  @ViewChild('footer', { static: true }) private footerRef!: ElementRef;
  renderer : RaeptorWebGLRendererBasic = null!;
  controller: RaeptorWebGLObjectsBase = null!;

  public hideUI() {
    this.DOMRenderer.addClass(this.museumInstructionsRef.nativeElement, 'hidden');
    this.DOMRenderer.addClass(this.footerRef.nativeElement, 'hidden');
    const router = this.router;
    const el = this.el.nativeElement;
    const DOMRenderer = this.DOMRenderer;
    if (router)
    this.controller.update = function(renderer : RaeptorWebGLRendererBasic) {
      if (this['X'] === undefined && this['Y'] === undefined) {
        this['X'] = 0;
        this['Y'] = 0;
      };
      if (this['Z'] === undefined) {
        this['Z'] = 0;
      };
      if (this['TargetX'] !== undefined && this['TargetY'] !== undefined) {
        this['X'] += (0 - this['X']) * 0.2;
        this['Y'] += (0 - this['Y']) * 0.2;
        this['Z'] += (5 - this['Z']) * 0.01;
        DOMRenderer.setStyle(el, 'opacity', `${1 - this['Z']/5}`);
        mat4.identity(renderer.viewMatrix);
        mat4.rotate(renderer.viewMatrix, renderer.viewMatrix, this['X'], [0, 1, 0]);
        mat4.rotate(renderer.viewMatrix, renderer.viewMatrix, this['Y'], [1, 0, 0]);
        mat4.translate(renderer.viewMatrix, renderer.viewMatrix, [0, 0, this['Z']]);
        if (this['Z'] > 4.9) {
          router.navigateByUrl('/works/museum');
        }
      };
    };
  }

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

      this.controller = new RaeptorWebGLObjectsBase(this.renderer.gl);
      this.controller.onMouseMove = function(renderer : RaeptorWebGLRendererBasic, event : MouseEvent) {
        this['TargetX'] = (event.clientX - renderer.gl.canvas.width / 2) / 10000;
        this['TargetY'] = (event.clientY - renderer.gl.canvas.height / 2) / 10000;
      };
      this.controller.update = function(renderer : RaeptorWebGLRendererBasic) {
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

      this.renderer.pushObject(this.controller);


      const text = await stringFromURL('/assets/models/tesseract.hobj');
      const hobj = new RaeptorWebGLObjectsHyperMeshHOBJ(this.renderer.gl, text);

      const hobj_render = hobj.render.bind(hobj);
      const MAX_TRAILS = 10;
      hobj.render = function(renderer : RaeptorWebGLRendererBasic) {
        hobj_render(renderer);
        for (let i = 0; i < MAX_TRAILS; i++) {
          this.program.setUniformFloat(renderer.gl, "uTime", renderer.getTime()/2.0 - i * 0.01);
          this.program.setUniformFloat(renderer.gl, "uAlpha", (MAX_TRAILS - i)/MAX_TRAILS/2.0);
          renderer.gl.drawArrays(renderer.gl.TRIANGLES, 0, this.vbo.count);
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
  