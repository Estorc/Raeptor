import { Component, HostListener, ViewChild } from '@angular/core';
import { RaeptorSlidesContainerVerticalComponent } from '@raeptor/slides/raeptor.slides.container.vertical.component';
import { RaeptorSlidesContainerHorizontalComponent } from "../../../libs/raeptor/slides/raeptor.slides.container.horizontal.component";
import { RaeptorSlidesSlideComponent } from "../../../libs/raeptor/slides/raeptor.slides.slide.component";
import { TitleService } from '../../services/title/title.service';
import { Title } from '@angular/platform-browser';
import { RaeptorF3DCoreContainerComponent } from "../../../libs/raeptor/f3d/raeptor.f3d.core.container.component";
import { NgFor, NgIf } from '@angular/common';
import { RaeptorCardsPrettyFullCardComponent } from "../../../libs/raeptor/cards/raeptor.cards.pretty-fullcard.component";
import { RaeptorMiscTesseractComponent } from '@raeptor/misc/tesseract/raeptor.misc.tesseract.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { copyURLToClipboard } from '@raeptor/popups/raeptor.popups.component';


@Component({
  imports: [
        RaeptorSlidesContainerVerticalComponent, RaeptorSlidesSlideComponent, RaeptorSlidesContainerHorizontalComponent,
        NgFor, NgIf,
        RaeptorCardsPrettyFullCardComponent, RaeptorMiscTesseractComponent,
        TranslateModule,
        MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  constructor(public titleService: TitleService, private title: Title) {
    this.title.setTitle(`Home - ${this.titleService.getTitle()}`);
  }
  @ViewChild('slideContainer') slideContainer!: RaeptorSlidesContainerVerticalComponent;
  @ViewChild('tesseract') tesseract!: RaeptorMiscTesseractComponent;

  copyURLToClipboard = copyURLToClipboard;

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    
    switch (e.key) {
      case " ": 
        this.slideContainer.selectSlide(0);
        this.slideContainer.hideNavigation();
        this.slideContainer.disable();
        this.tesseract.hideUI();
      break;
    }
    
  }

  protected cards = {
    raeptorcogs: [
      {
        title: 'home.slides.raeptorcogs.title',
        image: 'assets/images/raeptor-cogs-logo.png',
        imageAlt: 'RæptorCogs Logo',
        description: 'home.slides.raeptorcogs.description',
        link: 'https://github.com/Estorc/RaeptorCogs'
      }
    ],
    projects: [
      {
        title: 'home.slides.projects.ppg.title',
        image: 'assets/images/Genos.webp',
        imageAlt: 'Genos Artwork',
        description: 'home.slides.projects.ppg.description',
        link: './works/You-gonna-have-a-Genophobia/'
      }, 
      {
        title: 'home.slides.projects.kkong.title',
        image: 'assets/images/KingKong.webp',
        imageAlt: 'King Kong Artwork',
        description: 'home.slides.projects.kkong.description',
        link: './works/In-the-hall-of-the-King-Kong/'
      }, 
      {
        title: 'home.slides.projects.softBody3d.title',
        image: 'assets/images/SoftBodySimulation2.webp',
        imageAlt: 'Soft Body Simulation',
        description: 'home.slides.projects.softBody3d.description',
        link: './works/3DSoftBodyPureJS/'
      }, 
      {
        title: 'home.slides.projects.fluidSimulation.title',
        image: 'assets/images/FluidSimulation.webp',
        imageAlt: 'Fluid Simulation',
        description: 'home.slides.projects.fluidSimulation.description',
        link: './works/2DFluidSimulation/'
      }
    ],
    drawings: [
      {
        text: 'home.slides.drawings.challenge6months.text',
        image: 'assets/images/drawing-bg.webp',
        alt: ''
      },
      {
        text: 'home.slides.drawings.senkuOuterWilds.text',
        image: 'assets/images/drawings/Senku_Nomai.webp',
        alt: 'Senku x Outer Wilds Artwork'
      },
      {
        text: 'home.slides.drawings.solanumWilhelm.text',
        image: 'assets/images/drawings/SolanumxWilhelm.webp',
        alt: 'Solanum x Wilhelm Artwork'
      },
      {
        text: 'home.slides.drawings.nia1.text',
        image: 'assets/images/drawings/Nia_2_Couleur.webp',
        alt: 'Nia Artwork'
      },
      {
        text: 'home.slides.drawings.nia2.text',
        image: 'assets/images/drawings/Nia4.webp',
        alt: 'Nia Artwork'
      },
      {
        text: 'home.slides.drawings.kamina1.text',
        image: 'assets/images/drawings/Kamina_3.webp',
        alt: 'Kamina Artwork'
      },
      {
        text: 'home.slides.drawings.simonAntiSpiral.text',
        image: 'assets/images/drawings/Simon.webp',
        alt: 'Simon vs Anti-Spirale Artwork'
      },
      {
        text: 'home.slides.drawings.giovanni.text',
        image: 'assets/images/drawings/Giovanni2.webp',
        alt: 'Giovanni Artwork'
      },
      {
        text: 'home.slides.drawings.seele.text',
        image: 'assets/images/drawings/Seele7.webp',
        alt: 'Seele Artwork'
      },
      {
        text: 'home.slides.drawings.aponiaOri.text',
        image: 'assets/images/drawings/Aponia.webp',
        alt: 'Aponia x Ori Artwork'
      },
      {
        text: 'home.slides.drawings.yaeMiko.text',
        image: 'assets/images/drawings/Yae_Miko.webp',
        alt: 'Yae Miko Artwork'
      },
      {
        text: 'home.slides.drawings.honokaKosaka1.text',
        image: 'assets/images/drawings/Honoka_Kosaka_1.webp',
        alt: 'Honoka Kosaka Artwork'
      },
      {
        text: 'home.slides.drawings.honokaKosaka2.text',
        image: 'assets/images/drawings/Honoka_Kosaka_3.webp',
        alt: 'Honoka Kosaka Artwork'
      },
      {
        text: 'home.slides.drawings.kamina2.text',
        image: 'assets/images/drawings/Kamina_4.webp',
        alt: 'Kamina Artwork'
      },
      {
        text: 'home.slides.drawings.clara.text',
        image: 'assets/images/drawings/Clara2.webp',
        alt: 'Clara Artwork'
      },
      {
        text: 'home.slides.drawings.originalChar1.text',
        image: 'assets/images/drawings/Illustration2.webp',
        alt: 'Essai'
      },
      {
        text: 'home.slides.drawings.mari.text',
        image: 'assets/images/drawings/Mari.webp',
        alt: 'Mari Artwork'
      },
      {
        text: 'home.slides.drawings.nia3.text',
        image: 'assets/images/drawings/Nia10.webp',
        alt: 'Nia Artwork'
      },
      {
        text: 'home.slides.drawings.originalChar2.text',
        image: 'assets/images/drawings/Illustration5.webp',
        alt: 'Essai'
      },
      {
        text: 'home.slides.drawings.nia4.text',
        image: 'assets/images/drawings/Nia11.webp',
        alt: 'Nia Artwork'
      },
    ],
  };
}
