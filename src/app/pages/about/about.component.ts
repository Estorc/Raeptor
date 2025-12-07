import { Component } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { Title } from '@angular/platform-browser';
import { RaeptorMiscBackgroundEffectsStarrySkyComponent } from "../../../libs/raeptor/misc/background-effects/starry-sky/raeptor.misc.background-effects.starry-sky.component";
import { RaeptorF3DCubeComponent } from "../../../libs/raeptor/f3d/cube/raeptor.f3d.cube.component";


@Component({
  imports: [RaeptorMiscBackgroundEffectsStarrySkyComponent, RaeptorF3DCubeComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class AboutComponent {
  constructor(public titleService: TitleService, private title: Title) {
    this.title.setTitle(`Home - ${this.titleService.getTitle()}`);
  }
}
