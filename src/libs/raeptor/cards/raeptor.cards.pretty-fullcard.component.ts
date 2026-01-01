import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { copyURLToClipboard } from '@raeptor/popups/raeptor.popups.component';

@Component({
  selector: 'raeptor-cards-pretty-fullcard',
  templateUrl: './raeptor.cards.pretty-fullcard.component.html',
  styleUrl: './raeptor.cards.pretty-fullcard.component.scss',
  imports: [NgIf, TranslateModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
})
export class RaeptorCardsPrettyFullCardComponent {
  copyURLToClipboard = copyURLToClipboard;
  @Input('image') image: string = '';
  @Input('image-alt') imageAlt: string = '';
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('link') link: string = '';
  @Input('custom-content') customContent: boolean = false;
}
  