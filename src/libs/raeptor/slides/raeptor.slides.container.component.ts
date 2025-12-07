import { Component, HostBinding, Injector, Optional, Renderer2 } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgZone, ContentChildren, HostListener, ElementRef, QueryList, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { RaeptorSlidesSlideComponent } from './raeptor.slides.slide.component';
import { RaeptorF3DCoreContainerComponent } from '@raeptor/f3d/raeptor.f3d.core.container.component';
import * as RaeptorTypes from '@raeptor/raeptor.types';

@Component({
  imports: [NgFor],
  templateUrl: './raeptor.slides.container.component.html',
  styleUrl: './raeptor.slides.container.component.scss',
})
export class RaeptorSlidesContainerComponent implements AfterViewInit {
  constructor(private injector: Injector, protected zone : NgZone, private renderer : Renderer2, protected cdr : ChangeDetectorRef, protected elementRef : ElementRef) {}
  @ContentChildren(RaeptorSlidesSlideComponent, { descendants: false }) slides!: QueryList<RaeptorSlidesSlideComponent>;
  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  private d3dScene : RaeptorF3DCoreContainerComponent | null = null;
  protected vertical : boolean = false;
  protected isFocused : boolean = false;
  protected position : RaeptorTypes.Vector3 = [0, 0, 0];
  protected scrollPosition : RaeptorTypes.Vector3 = [0, 0, 0];
  protected animationActive: boolean = false;
  protected slideIndex : number = 0;
  protected slideProgress : number = 0;
  protected pendingFrames : number = 0;
  protected rect : DOMRect | null = null;

  private mousePosition : RaeptorTypes.Vector2 = [0, 0];

  ngOnInit() {
    this.d3dScene = this.injector.get(RaeptorF3DCoreContainerComponent, null);
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.content.nativeElement, 'transform', `translate3d(0px, 0px, 0px)`);

    setTimeout(() => {
      if (this.d3dScene) this.renderer.setStyle(this.d3dScene?.nativeElement, 'perspective', 'none');
      if (this.content.nativeElement && this.content.nativeElement.getBoundingClientRect)
        this.rect = this.content.nativeElement.getBoundingClientRect();
      if (this.d3dScene) this.renderer.removeStyle(this.d3dScene?.nativeElement, 'perspective');
    });

    this.zone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        let lastTouchX : number = 0;
        let lastTouchY : number = 0;
        window.addEventListener('mousemove', (e) => {
          this.mousePosition[0] = e.clientX;
          this.mousePosition[1] = e.clientY;
          this.checkFocus();
        }, { passive: true });
        window.addEventListener('wheel', (e) => {
          this.onPassiveWheel.call(this, [e.deltaX * 1.2, e.deltaY * 1.2]);
        }, { passive: true });
        window.addEventListener('touchstart', (e) => {
          const touch = e.touches[0];

          this.mousePosition[0] = touch.clientX;
          this.mousePosition[1] = touch.clientY;
          this.checkFocus();
          lastTouchX = touch.clientX;
          lastTouchY = touch.clientY;
        }, { passive: true });
        window.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp')
            this.onPassiveWheel.call(this, [
              (e.key === 'ArrowLeft' ? -1000 : 0) + (e.key === 'ArrowRight' ? 1000 : 0), 
              (e.key === 'ArrowUp' ? 0 : 1000) + (e.key === 'ArrowDown' ? 0 : -1000)
            ]);
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          const deltaX = touch.clientX - lastTouchX;
          const deltaY = touch.clientY - lastTouchY;

          lastTouchX = touch.clientX;
          lastTouchY = touch.clientY;

          this.onPassiveWheel.call(this, [-deltaX * 4.0, -deltaY * 2.0]);
        }, { passive: false });
      }
    });
  }

  private checkFocus() : void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.isFocused =
      this.mousePosition[0] >= rect.left &&
      this.mousePosition[0] <= rect.right &&
      this.mousePosition[1] >= rect.top &&
      this.mousePosition[1] <= rect.bottom;
  };

  protected selectSlide(i: number) {
    this.slideProgress = i;
    this.updateProgress();
    this.startScrollAnimation();
  }

  protected updateProgress() : void {
    this.slideProgress = Math.min(this.slides.length - 1, Math.max(0, this.slideProgress));
    let indexA : number = Math.floor(this.slideProgress);
    let indexB : number = Math.ceil(this.slideProgress);

    const slideA = this.slides.get(indexA);
    const slideB = this.slides.get(indexB);
    if (!slideA || !slideB) {
      console.error('Slide not found!');
      return;
    }

    //if (this.d3dScene) this.renderer.setStyle(this.d3dScene?.nativeElement, 'perspective', 'none');

    const rectA = slideA.getRect();
    if (!rectA) return;
    const rectB = slideB.getRect();
    if (!rectB) return;
    const contentRect = this.rect;
    if (!contentRect) return;

    //if (this.d3dScene) this.renderer.removeStyle(this.d3dScene?.nativeElement, 'perspective');

    const ZdataA : string | null = slideA.nativeElement.getAttribute('data-z');
    const ZdataB : string | null = slideB.nativeElement.getAttribute('data-z');

    const xA : number = rectA.left - contentRect.left;
    const yA : number = rectA.top - contentRect.top;
    const zA : number = ZdataA ? parseFloat(ZdataA) : 0;
    const xB : number = rectB.left - contentRect.left;
    const yB : number = rectB.top - contentRect.top;
    const zB : number = ZdataB ? parseFloat(ZdataB) : 0;

    if (indexA !== indexB) {

      const progressA : number = 1.0 - (this.slideProgress - indexA);
      const progressB : number = 1.0 - (indexB - this.slideProgress);

      this.position[0] = (xA * progressA + xB * progressB) << 0;
      this.position[1] = (yA * progressA + yB * progressB) << 0;
      this.position[2] = (zA * progressA + zB * progressB) << 0;

    } else {

      this.position[0] = xA << 0;
      this.position[1] = yA << 0;
      this.position[2] = zA << 0;

    }

    this.slideIndex = Math.round(this.slideProgress);
    this.cdr.detectChanges();
  }

  protected startScrollAnimation() : void {
    if (this.animationActive) return;
    requestAnimationFrame(this.animateScroll.bind(this));
  }

  protected animateScroll() : void {
    this.animationActive = true;
    this.scrollPosition[0] += (this.position[0] - this.scrollPosition[0]) / 16.0;
    this.scrollPosition[1] += (this.position[1] - this.scrollPosition[1]) / 16.0;
    this.scrollPosition[2] += (this.position[2] - this.scrollPosition[2]) / 16.0;

    this.pendingFrames++;
    if (this.pendingFrames > 10 && this.slideProgress !== Math.round(this.slideProgress)) {
      this.pendingFrames = 0;
      this.slideProgress = Math.round(this.slideProgress);
      this.scroll.call(this);
    }

    if (Math.abs(this.scrollPosition[0] - this.position[0]) < 10e-2 &&
        Math.abs(this.scrollPosition[1] - this.position[1]) < 10e-2 &&
        Math.abs(this.scrollPosition[2] - this.position[2]) < 10e-2) {
      this.scrollPosition[0] = this.position[0];
      this.scrollPosition[1] = this.position[1];
      this.animationActive = false;
      return;
    }
    this.renderer.setStyle(this.content.nativeElement, 'transform', `translate3d(${-this.scrollPosition[0]}px,${-this.scrollPosition[1]}px, ${-this.scrollPosition[2]}px)`);
    
    const scrollEvent = new Event('scroll', {
      bubbles: true,       // Allow event to bubble
      cancelable: true,    // Allow event to be cancelled
    });
    window.dispatchEvent(scrollEvent);
    const mouseEvent = new MouseEvent('mousemove', {
      bubbles: true,       // Allow event to bubble
      cancelable: true,    // Allow event to be cancelled
      clientX: this.mousePosition[0],
      clientY: this.mousePosition[1],
    });
    window.dispatchEvent(mouseEvent);
    requestAnimationFrame(this.animateScroll.bind(this));
  }
  
  protected onPassiveWheel(velocity : RaeptorTypes.Vector2) : void {
    //
  };

  protected scroll() : void {
    if (!this.content) console.error('Content element not found!');
    this.updateProgress.call(this);
    this.startScrollAnimation.call(this);
  }
}
  