import { Component } from '@angular/core';
import { FeatherSlidesContainerVerticalComponent } from '@feather/slides/feather.slides.container.vertical.component';
import { FeatherSlidesContainerHorizontalComponent } from "../../../libs/feather/slides/feather.slides.container.horizontal.component";
import { FeatherSlidesSlideComponent } from "../../../libs/feather/slides/feather.slides.slide.component";
import { TitleService } from '../../services/title/title.service';
import { Title } from '@angular/platform-browser';
import { FeatherF3DCoreContainerComponent } from "../../../libs/feather/f3d/feather.f3d.core.container.component";
import { NgFor, NgIf } from '@angular/common';
import { FeatherCardsPrettyFullCardComponent } from "../../../libs/feather/cards/feather.cards.pretty-fullcard.component";
import { FeatherMiscTesseractComponent } from '@feather/misc/tesseract/feather.misc.tesseract.component';


@Component({
  imports: [FeatherSlidesContainerVerticalComponent, FeatherSlidesSlideComponent, FeatherSlidesContainerHorizontalComponent, FeatherF3DCoreContainerComponent, NgFor, NgIf, FeatherCardsPrettyFullCardComponent, FeatherMiscTesseractComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  constructor(public titleService: TitleService, private title: Title) {
    this.title.setTitle(`Home - ${this.titleService.getTitle()}`);
  }
}
