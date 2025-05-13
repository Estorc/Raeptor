import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, ElementRef, Host, Inject, OnDestroy, PLATFORM_ID, QueryList, ViewChild } from '@angular/core';
import { hostname } from 'os';

@Component({
  selector: 'feather-overlay-container',
  templateUrl: './feather.overlay.container.component.html',
  styleUrl: './feather.overlay.container.component.scss',
})
export class FeatherOverlayContainerComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: any, private hostRef: ElementRef<HTMLElement>) {}
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef;
  private container!: HTMLElement;
  private observer!: ResizeObserver;
  
  public updateOverlayPosition() {
    if (isPlatformBrowser(this.platformId)) {
      const rect = this.hostRef.nativeElement.getBoundingClientRect();
      Object.assign(this.container.style, {
        position: 'fixed',
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        zIndex: '9999',
        pointerEvents: 'none',
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.container = document.createElement('div');
      this.updateOverlayPosition();
      this.observer = new ResizeObserver(this.updateOverlayPosition.bind(this));
      this.observer.observe(this.hostRef.nativeElement);
      window.addEventListener('resize', this.updateOverlayPosition.bind(this), { passive: true });
      window.addEventListener('scroll', this.updateOverlayPosition.bind(this), { passive: true });
      document.body.appendChild(this.container);
      
      (Array.from(this.wrapper.nativeElement.children) as Array<HTMLElement>).forEach((child) => {
        this.container.appendChild(child);
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer.disconnect();
      this.container.remove();
    }
  }
}
  