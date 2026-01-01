import { Component, Injector, Renderer2 } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { RaeptorF3DCoreContainerComponent } from '@raeptor/f3d/raeptor.f3d.core.container.component';

@Component({
  selector: 'raeptor-slides-slide',
  templateUrl: './raeptor.slides.slide.component.html',
  styleUrl: './raeptor.slides.slide.component.scss'
})
export class RaeptorSlidesSlideComponent {
  constructor(private injector: Injector, private renderer : Renderer2, protected elementRef: ElementRef<HTMLElement>) {}
  private rect : DOMRect | null = null;

  ngAfterViewInit() {
    (this.elementRef.nativeElement as any).__ngComponent = this;
  }
  @HostBinding('class.raeptor-slides-slide') addInternalClass = true;
  @Input('x') public x : number = 0;
  @Input('y') public y : number = 0;
  @Input('z') public z : number = 0;

  @HostBinding('style.transform') get transform() {
    return `translate3d(${this.x}px, ${this.y}px, ${this.z}px)`;
  }
  @HostBinding('style.margin-right') get marginRight() {
    return `${this.x}px`;
  }
  @HostBinding('style.margin-bottom') get marginBottom() {
    return `${this.y}px`;
  }
  @HostBinding('attr.data-z') get dataZ() {
    return this.z;
  }

  public getRect() : DOMRect | null {
    return this.rect;
  }

  public setRect(rect : DOMRect) {
    this.rect = rect;
  }

  public get nativeElement() : HTMLElement {
    return this.elementRef.nativeElement;
  }
}
  