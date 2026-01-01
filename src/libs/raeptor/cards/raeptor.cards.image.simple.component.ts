import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'raeptor-cards-image-simple',
  templateUrl: './raeptor.cards.image.simple.component.html',
  styleUrls: ['./raeptor.cards.image.simple.component.scss'],
  imports: [TranslateModule],
  encapsulation: ViewEncapsulation.None,
})
export class RaeptorCardsImageSimpleComponent {
  @Input('src') src: string = '';
  @Input('alt') alt: string = '';
  @Input('author') author: string = '';
  @Input('date') date: string = '';
  @Input('origin') origin: string = '';
}
  