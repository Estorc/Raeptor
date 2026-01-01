import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


const langs = ['en', 'fr'];
@Component({
  selector: 'raeptor-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule, TranslateModule],
})
export class HeaderComponent {
  constructor(private translate: TranslateService) {}

  switchLanguage() {
    const currentLang = this.translate.currentLang;
    const currentIndex = langs.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % langs.length;
    const nextLang = langs[nextIndex];
    this.translate.use(nextLang);
  }
}
