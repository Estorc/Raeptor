import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';



class Star {

  public _parent : FeatherMiscBackgroundEffectsStarrySkyComponent;
  public _x : number;
  public _y : number;
  public _radius : number;
  public _speed : number;

	constructor(x : number, y : number, radius : number, speed : number) {
		this._x = x;
		this._y = y;
		this._radius = radius;
		this._speed = speed;
    this._parent = null!;
	}

	destroy() : void {
		this._parent.stars = this._parent.stars.filter(item => item !== this);
	};

	moveTowardPoint(x : number, y : number) : void {
		let xVel = ((x - this._x)/60)*this._speed;
		let yVel = ((y - this._y)/100)*this._speed;
		this._x += xVel;
		this._y += yVel;
		this._radius += (0-this._radius)/40;
		if (this._radius < 0.5) this.destroy();
	}
	
	draw(ctx : CanvasRenderingContext2D) : void {
		ctx.beginPath();
		ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true); // Cercle extérieur
		ctx.fill();
	}
}


@Component({
  selector: 'feather-misc-tesseract-background-effects-starry-sky',
  templateUrl: './feather.misc.background-effects.starry-sky.component.html',
  styleUrl: './feather.misc.background-effects.starry-sky.component.scss',
})
export class FeatherMiscBackgroundEffectsStarrySkyComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  stars : Star[] = [];


  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas : HTMLCanvasElement = this.canvasRef.nativeElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.render(ctx);
      }
    }
  }

  render(ctx : CanvasRenderingContext2D) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
		while (this.stars.length < Math.random()*500) {
			const star = new Star(Math.round(Math.random())*(ctx.canvas.width - Math.random()*50), Math.random()*(ctx.canvas.height<<1) - (ctx.canvas.height>>1), Math.random()*5+5, Math.random());
			this.stars.push(star);
			star._parent = this;
		}
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "rgba(0,0,0,0.4)";
		ctx.rect(0, 0,ctx.canvas.width, ctx.canvas.height);
		ctx.fill();
		ctx.fillStyle = "white";
		this.stars.forEach(obj => {
			obj.moveTowardPoint(ctx.canvas.offsetWidth>>1, ctx.canvas.offsetHeight>>1);
			obj.draw(ctx);
		})
    requestAnimationFrame(this.render.bind(this, ctx));
  }

}
  