import { AfterViewInit, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'raeptor-f3d-core-container',
  templateUrl: './raeptor.f3d.core.container.component.html',
  styleUrl: './raeptor.f3d.core.container.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class RaeptorF3DCoreContainerComponent implements AfterViewInit {
  constructor(private elementRef : ElementRef) {}

  @Input('perspective') public perspective : number = 800;

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.perspective = `${this.perspective}px`;
  }
  

  public get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
  