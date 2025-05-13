document.addEventListener("DOMContentLoaded", () => {
	if (document.getElementsByClassName("starry-sky").length) starrySkyUpdate();
});

class Star {
	constructor(x, y, radius, speed) {
		this._x = x;
		this._y = y;
		this._radius = radius;
		this._speed = speed;
	}

	destroy() {
		this._parent.objects = this._parent.objects.filter(item => item !== this);
	};

	moveTowardPoint(x, y) {
		let xVel = ((x - this._x)/60)*this._speed;
		let yVel = ((y - this._y)/100)*this._speed;
		this._x += xVel;
		this._y += yVel;
		this._radius += (0-this._radius)/40;
		if (this._radius < 0.5) this.destroy();
	}
	
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true); // Cercle extérieur
		ctx.fill();
	}
}

function starrySkyUpdate() {
	[...document.getElementsByClassName("starry-sky")].forEach(canvas => {
		if (canvas.width !== canvas.offsetWidth) canvas.width = canvas.offsetWidth;
		if (canvas.height !== canvas.offsetHeight) canvas.height = canvas.offsetHeight;

		const ctx = canvas.getContext('2d');

		if (!canvas.objects) {
			canvas.objects = [];
		}
		while (canvas.objects.length < Math.random()*500) {
			const object = new Star(Math.round(Math.random())*(canvas.width - Math.random()*50), Math.random()*(canvas.height<<1) - (canvas.height>>1), Math.random()*5+5, Math.random());
			canvas.objects.push(object);
			object._parent = canvas;
		}
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "rgba(0,0,0,0.4)";
		ctx.rect(0, 0,canvas.width, canvas.height);
		ctx.fill();
		ctx.fillStyle = "white";
		canvas.objects.forEach(obj => {
			obj.moveTowardPoint(canvas.offsetWidth>>1, canvas.offsetHeight>>1);
			obj.draw(ctx);
		})

	})
	requestAnimationFrame(starrySkyUpdate);
}