import { Component } from '@angular/core';
import { RaeptorSlidesContainerVerticalComponent } from '@raeptor/slides/raeptor.slides.container.vertical.component';
import { RaeptorSlidesContainerHorizontalComponent } from "../../../libs/raeptor/slides/raeptor.slides.container.horizontal.component";
import { RaeptorSlidesSlideComponent } from "../../../libs/raeptor/slides/raeptor.slides.slide.component";
import { TitleService } from '../../services/title/title.service';
import { Title } from '@angular/platform-browser';
import { RaeptorF3DCoreContainerComponent } from "../../../libs/raeptor/f3d/raeptor.f3d.core.container.component";
import { NgFor, NgIf } from '@angular/common';
import { RaeptorCardsPrettyFullCardComponent } from "../../../libs/raeptor/cards/raeptor.cards.pretty-fullcard.component";
import { RaeptorMiscTesseractComponent } from '@raeptor/misc/tesseract/raeptor.misc.tesseract.component';


@Component({
  imports: [RaeptorSlidesContainerVerticalComponent, RaeptorSlidesSlideComponent, RaeptorSlidesContainerHorizontalComponent, RaeptorF3DCoreContainerComponent, NgFor, NgIf, RaeptorCardsPrettyFullCardComponent, RaeptorMiscTesseractComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  constructor(public titleService: TitleService, private title: Title) {
    this.title.setTitle(`Home - ${this.titleService.getTitle()}`);
  }
}
