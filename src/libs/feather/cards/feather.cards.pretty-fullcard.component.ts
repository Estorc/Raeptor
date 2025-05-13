import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'feather-cards-pretty-fullcard',
  templateUrl: './feather.cards.pretty-fullcard.component.html',
  styleUrl: './feather.cards.pretty-fullcard.component.scss',
  imports: [NgIf],
  encapsulation: ViewEncapsulation.None,
})
export class FeatherCardsPrettyFullCardComponent {
  @Input('image') image: string = '';
  @Input('image-alt') imageAlt: string = '';
  @Input('title') title: string = '';
  @Input('description') description: string = '';
  @Input('link') link: string = '';
  @Input('custom-content') customContent: boolean = false;
}
  