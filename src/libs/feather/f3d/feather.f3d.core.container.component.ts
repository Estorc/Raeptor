import { Component, ElementRef, forwardRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'feather-f3d-core-container',
  templateUrl: './feather.f3d.core.container.component.html',
  styleUrl: './feather.f3d.core.container.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FeatherF3DCoreContainerComponent {
  constructor(private elementRef : ElementRef) {}

  public get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
  