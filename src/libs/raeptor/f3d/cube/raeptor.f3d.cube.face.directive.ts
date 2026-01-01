import { NgIf } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'raeptor-f3d-cube-face',
  imports: [TranslateModule, NgIf],
  template: `
    <ng-template #faceTpl let-go="go">
      <div *ngIf="up"    (click)="go('up')"    class="f3d-cube-face-top">
          <h2>{{ (upLabel || up) | translate }}</h2>
      </div>

      <div *ngIf="left"  (click)="go('left')"  class="f3d-cube-face-left">
          <h2>{{ (leftLabel || left) | translate }}</h2>
      </div>

      <div *ngIf="right" (click)="go('right')" class="f3d-cube-face-right">
          <h2>{{ (rightLabel || right) | translate }}</h2>
      </div>

      <div *ngIf="down"  (click)="go('down')"  class="f3d-cube-face-bottom">
          <h2>{{ (downLabel || down) | translate }}</h2>
      </div>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class RaeptorF3DCubeFaceDirective {
  @Input('id') id!: string;
  @Input('up') up!: string;
  @Input('upLabel') upLabel!: string;
  @Input('right') right!: string;
  @Input('rightLabel') rightLabel!: string;
  @Input('left') left!: string;
  @Input('leftLabel') leftLabel!: string;
  @Input('down') down!: string;
  @Input('downLabel') downLabel!: string;

  @Input('callOnFocus') callOnFocus!: () => void;
  @Input('callOnLeave') callOnLeave!: () => void;

  @ViewChild('faceTpl', { static: true }) faceTpl!: TemplateRef<any>;
}