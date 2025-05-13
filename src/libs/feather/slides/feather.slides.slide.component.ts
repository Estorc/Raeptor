import { Component } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'feather-slides-slide',
  templateUrl: './feather.slides.slide.component.html',
  styleUrl: './feather.slides.slide.component.scss'
})
export class FeatherSlidesSlideComponent {
  constructor(protected elementRef: ElementRef) {}
  @HostBinding('class.feather-slides-slide') addInternalClass = true;
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

  public get nativeElement() : HTMLElement {
    return this.elementRef.nativeElement;
  }
}
  