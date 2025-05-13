import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'feather-f3d-cube',
  templateUrl: './feather.f3d.cube.component.html',
  styleUrl: './feather.f3d.cube.component.scss',
})
export class FeatherF3DCubeComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @ViewChild('cube', { static: true}) cubeRef!: ElementRef;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.update();
    }
  }

  update() {
    [...this.cubeRef.nativeElement.getElementsByClassName("f3d-cube-face")].forEach(item => {
      let rect = item.getBoundingClientRect();
      let surface = rect.width * rect.height;
      let opacity = (surface>>9)/694;
      (item as HTMLElement).style.setProperty('opacity', opacity.toString());
    })
    requestAnimationFrame(this.update.bind(this));
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {

    let cube = document.getElementsByClassName("f3d-cube")[0];
    let sign;
    let audio = new Audio(`assets/audio/${Math.random() < 0.5 ? "3dcubeBack" : "3dcubeMove"}.wav`);
    audio.volume = 0.1;
    switch (e.key) {
      case 'ArrowUp':
        audio.play();
        (cube as HTMLElement).style.setProperty('--rotateX', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))-90}deg`);
      break;

      case 'ArrowDown':
        audio.play();
        (cube as HTMLElement).style.setProperty('--rotateX', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))+90}deg`);
      break;

      case 'ArrowRight':
        audio.play();
        sign = (((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/180)<<0)%2) ? -1 : 1;
        if (((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/90)%2)) {
          (cube as HTMLElement).style.setProperty('--rotateZ', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateZ'))-90*sign}deg`);
        } else {
          (cube as HTMLElement).style.setProperty('--rotateY', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateY'))-90*sign}deg`);
        }
      break;

      case 'ArrowLeft':
        audio.play();
        sign = ((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/180)<<0)%2 ? -1 : 1;
        if (((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/90)%2)) {
          (cube as HTMLElement).style.setProperty('--rotateZ', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateZ'))+90*sign}deg`);
        } else {
          (cube as HTMLElement).style.setProperty('--rotateY', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateY'))+90*sign}deg`);
        }
      break;
    }
    
  }
}