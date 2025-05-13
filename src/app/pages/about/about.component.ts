import { Component } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { Title } from '@angular/platform-browser';
import { FeatherMiscBackgroundEffectsStarrySkyComponent } from "../../../libs/feather/misc/background-effects/starry-sky/feather.misc.background-effects.starry-sky.component";
import { FeatherF3DCubeComponent } from "../../../libs/feather/f3d/cube/feather.f3d.cube.component";


@Component({
  imports: [FeatherMiscBackgroundEffectsStarrySkyComponent, FeatherF3DCubeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class AboutComponent {
  constructor(public titleService: TitleService, private title: Title) {
    this.title.setTitle(`Home - ${this.titleService.getTitle()}`);
  }
}
