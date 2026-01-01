import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { RaeptorF3DCubeComponent } from "../../../libs/raeptor/f3d/cube/raeptor.f3d.cube.component";
import { TranslateModule } from '@ngx-translate/core';
import { RaeptorF3DCubeFaceDirective } from '@raeptor/f3d/cube/raeptor.f3d.cube.face.directive';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { RaeptorServicesCursorPositionStyleVariable } from '@raeptor/services/global/raeptor.services.cursor.position.style.variable';
import { NgTemplateOutlet } from '@angular/common';
import { AboutCubeInstructionsDirective } from './about.cube.instructions.directive';
import { RaeptorCardsImageSimpleComponent } from '@raeptor/cards/raeptor.cards.image.simple.component';


@Component({
  imports: [
    RaeptorF3DCubeComponent, RaeptorF3DCubeFaceDirective, RaeptorCardsImageSimpleComponent,
    MatIconModule, MatTabsModule,
    NgTemplateOutlet, TranslateModule,
    AboutCubeInstructionsDirective
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class AboutComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef, matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public titleService: TitleService, private title: Title, private renderer: Renderer2) {
    matIconRegistry.addSvgIcon(
      'cpp',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/cpp.svg')
    );
    matIconRegistry.addSvgIcon(
      'godot',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/godot.svg')
    );
    matIconRegistry.addSvgIcon(
      'gamemaker',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/gamemaker.svg')
    );
    matIconRegistry.addSvgIcon(
      'rpgmaker',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/rpgMaker.svg')
    );
    matIconRegistry.addSvgIcon(
      'raeptorcogs',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/raeptorCogs.svg')
    );
    matIconRegistry.addSvgIcon(
      'vulkan',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/Vulkan_logo.svg')
    );
    matIconRegistry.addSvgIcon(
      'opengl',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/OpenGL_logo.svg')
    );
    matIconRegistry.addSvgIcon(
      'clang',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/Clang.svg')
    );
    this.title.setTitle(`Home - ${this.titleService.getTitle()}`);
  }
  @ViewChild('cubeInstructions') cubeInstructions!: ElementRef<HTMLDivElement>;
  @ViewChildren(AboutCubeInstructionsDirective) templatesQuery!: QueryList<AboutCubeInstructionsDirective>;
  templates!: { [key: string]: TemplateRef<any> };
  cubeInstructionsTemplate!: TemplateRef<any>;

  ngAfterViewInit() {
    this.templates = {};
    this.templatesQuery.forEach(tpl => {
      this.templates[tpl.key] = tpl.template;
    });
    this.cubeInstructionsTemplate = this.templates['default'];
    this.cdr.detectChanges();
  }

  expand(template: string) {
    this.cubeInstructionsTemplate = this.templates[template];
  }

  activeInstructions() {
    this.renderer.addClass(this.cubeInstructions.nativeElement, 'active');
  }
  desactiveInstructions() {
    this.renderer.removeClass(this.cubeInstructions.nativeElement, 'active');
  }
}
