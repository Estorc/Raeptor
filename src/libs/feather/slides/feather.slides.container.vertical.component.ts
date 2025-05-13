import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HostBinding } from '@angular/core';
import { FeatherSlidesContainerComponent } from './feather.slides.container.component';
import * as FeatherTypes from '@feather/feather.types';
import { FeatherOverlayContainerComponent } from '@feather/overlay/feather.overlay.container.component';

@Component({
  selector: 'feather-slides-container-vertical',
  imports: [NgFor, FeatherOverlayContainerComponent],
  templateUrl: './feather.slides.container.component.html',
  styleUrl: './feather.slides.container.component.scss'
})
export class FeatherSlidesContainerVerticalComponent extends FeatherSlidesContainerComponent {
  @HostBinding('class.feather-slides-container-vertical') addInternalClass = true;
  protected override vertical : boolean = true;
  override onPassiveWheel(velocity : FeatherTypes.Vector2) {
    this.zone.run(() => {
      if (this.isFocused && Math.abs(velocity[1]) > Math.abs(velocity[0])) {
        this.pendingFrames = 0;
        this.slideProgress += velocity[1] / 1000.0;
        super.scroll.call(this);
      }
    });
  };
}
  