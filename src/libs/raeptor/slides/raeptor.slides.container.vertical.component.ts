import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HostBinding } from '@angular/core';
import { RaeptorSlidesContainerComponent } from './raeptor.slides.container.component';
import * as RaeptorTypes from '@raeptor/raeptor.types';

@Component({
  selector: 'raeptor-slides-container-vertical',
  imports: [NgFor],
  templateUrl: './raeptor.slides.container.component.html',
  styleUrl: './raeptor.slides.container.component.scss'
})
export class RaeptorSlidesContainerVerticalComponent extends RaeptorSlidesContainerComponent {
  @HostBinding('class.raeptor-slides-container-vertical') addInternalClass = true;
  protected override vertical : boolean = true;
  override onPassiveWheel(velocity : RaeptorTypes.Vector2) {
    this.zone.run(() => {
      if (this.isFocused && Math.abs(velocity[1]) > Math.abs(velocity[0])) {
        this.pendingFrames = 0;
        this.slideProgress += velocity[1] / 1000.0;
        super.scroll.call(this);
      }
    });
  };
}
  