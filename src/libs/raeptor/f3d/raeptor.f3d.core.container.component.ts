import { Component, ElementRef, forwardRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'raeptor-f3d-core-container',
  templateUrl: './raeptor.f3d.core.container.component.html',
  styleUrl: './raeptor.f3d.core.container.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RaeptorF3DCoreContainerComponent {
  constructor(private elementRef : ElementRef) {}

  public get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
  