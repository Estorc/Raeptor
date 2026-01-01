import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';



class Star {

  public _parent : RaeptorMiscBackgroundEffectsStarrySkyComponent;
  public _startX : number;
  public _startY : number;
  public _startTime : number;
  public _x : number;
  public _y : number;
  public _startRadius : number;
  public _radius : number;
  public _speed : number;

	constructor(x : number, y : number, radius : number, speed : number, delay : number) {
		this._startX = x;
		this._startY = y;
		this._startTime = Date.now() + delay;
		this._x = x;
		this._y = y;
		this._startRadius = radius;
		this._radius = radius;
		this._speed = speed;
    this._parent = null!;
	}

	destroy() : void {
		this._parent.stars = this._parent.stars.filter(item => item !== this);
	};

	moveTowardPoint(x : number, y : number) : void {
		let xVel = ((x - this._startX)/60)*this._speed * ((Date.now()-this._startTime) / 10.0 + 1.0);
		let yVel = ((y - this._startY)/100)*this._speed * ((Date.now()-this._startTime) / 10.0 + 1.0);
		this._x = this._startX + xVel;
		this._y = this._startY + yVel;
		this._radius = (0-this._startRadius)/40 * ((Date.now()-this._startTime) / 10.0 + 1.0) + this._startRadius;
		if (this._radius < 0.5) this.destroy();
	}
	
	draw(ctx : CanvasRenderingContext2D) : void {
		ctx.beginPath();
		if (this._radius > 0)
			ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true); // Cercle extérieur
		ctx.fill();
	}
}


@Component({
  selector: 'raeptor-misc-background-effects-starry-sky',
  templateUrl: './raeptor.misc.background-effects.starry-sky.component.html',
  styleUrl: './raeptor.misc.background-effects.starry-sky.component.scss',
})
export class RaeptorMiscBackgroundEffectsStarrySkyComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  animationFrameId : number = 0;
  running : boolean = true;
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
	if (!this.running) return;
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
		while (this.stars.length < Math.random()*10000) {
			const x = Math.round(Math.random())*(ctx.canvas.width - Math.random()*50);
			const y = Math.random()*(ctx.canvas.height<<1) - (ctx.canvas.height>>1);
			const radius = Math.random()*5+5;
			const speed = Math.random()+0.5;
			for (let i = 0; i < 50; i++) {
				const star = new Star(x, y, radius, speed, i);
				this.stars.push(star);
				star._parent = this;
			}
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
    this.animationFrameId = requestAnimationFrame(this.render.bind(this, ctx));
  }

  ngOnDestroy() {
	if (!isPlatformBrowser(this.platformId)) return;
	this.running = false;
	cancelAnimationFrame(this.animationFrameId);
  };

}
  