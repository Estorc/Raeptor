import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HostBinding } from '@angular/core';
import { RaeptorSlidesContainerComponent } from './raeptor.slides.container.component';
import * as RaeptorTypes from '@raeptor/raeptor.types';

@Component({
  selector: 'raeptor-slides-container-horizontal',
  imports: [NgFor],
  templateUrl: './raeptor.slides.container.component.html',
  styleUrl: './raeptor.slides.container.component.scss'
})
export class RaeptorSlidesContainerHorizontalComponent extends RaeptorSlidesContainerComponent {
  @HostBinding('class.raeptor-slides-container-horizontal') addInternalClass = true;
  protected override vertical : boolean = false;
  override onPassiveWheel(velocity : RaeptorTypes.Vector2) {
    this.zone.run(() => {
      if (this.isFocused && Math.abs(velocity[0]) > Math.abs(velocity[1])) {
        this.pendingFrames = 0;
        this.slideProgress += velocity[0] / 1000.0;
        this.scroll.call(this);
      }
    });
  };
}
  