import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HostBinding } from '@angular/core';
import { FeatherSlidesContainerComponent } from './feather.slides.container.component';
import * as FeatherTypes from '@feather/feather.types';
import { FeatherOverlayContainerComponent } from '@feather/overlay/feather.overlay.container.component';

@Component({
  selector: 'feather-slides-container-horizontal',
  imports: [NgFor, FeatherOverlayContainerComponent],
  templateUrl: './feather.slides.container.component.html',
  styleUrl: './feather.slides.container.component.scss'
})
export class FeatherSlidesContainerHorizontalComponent extends FeatherSlidesContainerComponent {
  @HostBinding('class.feather-slides-container-horizontal') addInternalClass = true;
  protected override vertical : boolean = false;
  override onPassiveWheel(velocity : FeatherTypes.Vector2) {
    this.zone.run(() => {
      if (this.isFocused && Math.abs(velocity[0]) > Math.abs(velocity[1])) {
        this.pendingFrames = 0;
        this.slideProgress += velocity[0] / 1000.0;
        this.scroll.call(this);
      }
    });
  };
}
  