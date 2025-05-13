import { AfterViewInit, Component, ElementRef, Host, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { Title } from '@angular/platform-browser';



@Component({
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
  standalone: true,
})
export class WorksComponent implements AfterViewInit {
  constructor(public titleService: TitleService, private title: Title) {
    this.title.setTitle(`Home - ${this.titleService.getTitle()}`);
  }

  backDiv : HTMLElement | null = null;

  @ViewChild('activeWorkBlur') activeWorkBlurRef!: ElementRef<HTMLElement>;
  @ViewChildren('frameWork') frameWorks!: QueryList<ElementRef<HTMLElement>>;
  activeWorkBlur : HTMLElement = null!;

  ngAfterViewInit() {
    this.frameWorks.forEach((frameWork) => {
      frameWork.nativeElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
      frameWork.nativeElement.addEventListener('click', (e) => this.frameWorkOnClick(e));
      frameWork.nativeElement.addEventListener('animationend', (e) => this.onAnimationEnd(e));
    });
    this.activeWorkBlur = this.activeWorkBlurRef.nativeElement;
    this.activeWorkBlur.addEventListener('transitionend', (e) => this.onTransitionEnd(e));
  };
    
  onMouseMove(e : MouseEvent) {
    if (!e.currentTarget) return;
    const target = e.currentTarget as HTMLElement;
    target.style.setProperty('--mouseX', `${(e.offsetX/(target.clientWidth/2)-1)/1000}`);
    target.style.setProperty('--mouseY', `${(e.offsetY/(target.clientHeight/2)-1)/1000}`);
  }

  frameWorkOnClick(e : MouseEvent) {
    if (!e.currentTarget) return;
    const target = e.currentTarget as HTMLElement;
    if (!target.classList.contains("activeWork")) {
      this.activeWorkBlur.style.setProperty('display', 'block');
      this.activeWorkBlur.style.setProperty('opacity', '0');
      //this.activeWorkBlur.clientTop = this.activeWorkBlur.offsetTop;
      this.activeWorkBlur.style.setProperty('opacity', '1');
      let div = this.backDiv = target.cloneNode() as HTMLElement;
      const text = div.getElementsByClassName("text")[0] as HTMLElement;
      if (text) {
        text.style.setProperty('transition-delay', '1.2s');
        text.style.setProperty('transition-duration', '0.5s');
      }
      div.style.setProperty('animation', `1s disapearWork`);
      div.style.setProperty('width', `0`);
      div.style.setProperty('margin', `0`);
      target.style.setProperty('--originX', `${target.getBoundingClientRect().left}px`);
      target.style.setProperty('--originY', `${target.getBoundingClientRect().top}px`);
      target.style.setProperty('--scrollY', `${scrollY}`);
      target.parentElement?.insertBefore(div, target);
      target.classList.add("activeWork");
      target.classList.add("activeWorkDesc");
      target.style.setProperty('animation', `1s selectWorkMove, 1s selectWorkRotate`);
    }
  }

  onAnimationEnd(e : AnimationEvent) {
    if (!e.currentTarget) return;
    const target = e.currentTarget as HTMLElement;
    if (target.dataset['end'] === "true") {
      target.classList.remove("activeWork");
      target.style.removeProperty('width');
      target.style.removeProperty('margin');
      target.dataset['end'] = 'false';
      target.style.setProperty('animation', `0s`);
      this.backDiv?.remove();
    }
    target.style.setProperty('animation', `0s`);
  }

  onTransitionEnd(e : TransitionEvent) {
    if (!e.currentTarget) return;
    const target = e.currentTarget as HTMLElement;
    if (target.style.getPropertyValue("opacity") === "0") this.activeWorkBlur.style.setProperty('display', 'none');
  }

  @HostListener('window:click', ['$event'])
  onClick(e : MouseEvent) {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    for (const work of document.getElementsByClassName("activeWork") as HTMLCollectionOf<HTMLElement>) {
      if (!work.contains(target) || target.classList.contains("close-button")){
        work.style.setProperty('--originY', `${parseInt(work.style.getPropertyValue("--originY")) + (parseInt(work.style.getPropertyValue("--scrollY"))-scrollY)}px`);
        work.dataset['end'] = "true";
        work.classList.remove("activeWorkDesc");
        work.style.setProperty('animation', `1s reverse selectWorkMove, 1s reverse selectWorkRotate`);
        work.style.setProperty('width', `230px`);
        work.style.setProperty('margin', `2vw`);
        this.activeWorkBlur.style.setProperty('opacity', '0');
        const text = work.getElementsByClassName("text")[0] as HTMLElement;
        if (text) {
          text.style.setProperty('transition-delay', '0s');
          text.style.setProperty('transition-duration', '0.2s');
        }
        this.backDiv?.style.setProperty('animation', `1s reverse disapearWork`);
        this.backDiv?.style.setProperty('width', `230px`);
        this.backDiv?.style.setProperty('margin', `2vw`);
      }
    }
  }

}
