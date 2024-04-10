function Radian2Vector(rad) {
	
	return {x:Math.cos(rad),y:Math.sin(rad)}
	
}


function distanceBetweenPoints(x1,y1,x2,y2) {
	
	return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2))
	
}

function directionBetweenPoints(x1,y1,x2,y2) {
	
	return Math.atan2(y2 - y1, x2 - x1);
	
}


class Degree {
	
	constructor(deg,type) {
		
		this.value = deg;
		this.type = typeof type === 'undefined' ? 'rad':type;
		
	}
	
	
	swapType() {
		
		if (this.type === 'deg') {
			this.value *= Math.PI/180
			this.type = 'rad';
			return this.value
		}
		
		if (this.type === 'rad') {
			this.value *= 180/Math.PI
			this.type = 'deg';
			return this.value
		}
		
	}
	
	
	getType() {
		
		return this.type
		
	}
	
	getValue() {
		
		return this.value
		
	}
	
	isRad() {
		
		return this.getType() === 'rad';
		
	}
	
	isDeg () {
		
		return this.getType() === 'deg';
		
	}
	
	
}


class Particle {

	constructor(x,y,radius,dir,velocity,gravity,friction,mass) {
		
		this.x = x;
		this.y = y;
		this.lastX = 0;
		this.lastY = 0;
		this.velocity = velocity;
		
		let _dir = dir;
		if (_dir.isDeg()) {_dir.swapType()}
		this.direction = Radian2Vector(_dir.value);
		
		this.radius = radius;
		this.gravity = gravity || 0;
		this.friction = friction || 0;
		this.mass = mass || 0;
		
	}
	
	
	distanceBetweenPoints(x2,y2) {
	
		this.distance = distanceBetweenPoints(this.x,this.y,x2,y2);
		return this.distance;
		
	}
	
	appliedGravity() {
		
		this.direction.y += Math.sin(screenAngle)*this.gravity;
		this.direction.x += Math.cos(screenAngle)*this.gravity;
		
	}
	
	appliedFriction() {
		
		this.direction.x *= this.friction;
		this.direction.y *= this.friction;
		
	}
	
	appliedVelocity() {
		
		this.x += this.direction.x * this.velocity * delta;
		this.y += this.direction.y * this.velocity * delta;
		
	}
	
	appliedCollision() {
		
		for (const k of particles.filter(item => item !== this && item.distanceBetweenPoints(this.x,this.y) < (this.radius + item.radius))) {
			let a = k.distance;
			let b = this.radius + k.radius

				
				let c = directionBetweenPoints(this.x,this.y,k.x,k.y);
				let d = directionBetweenPoints(k.x,k.y,this.x,this.y);
				
				this.x += Math.cos(c) * (a-b)/2;
				this.y += Math.sin(c) * (a-b)/2;
				
				k.x += Math.cos(d) * (a-b)/2;
				k.y += Math.sin(d) * (a-b)/2;
				
				if (Math.sin(screenAngle)*this.y + Math.cos(screenAngle)*this.x > Math.sin(screenAngle)*k.y + Math.cos(screenAngle)*k.x) {
					
					k.direction.y *= -Math.abs(Math.sin(screenAngle)) + 1 + Math.abs(Math.sin(screenAngle))*(Math.abs((Math.sin(screenAngle-Math.PI/2)*this.y + Math.cos(screenAngle-Math.PI/2)*this.x) - (Math.sin(screenAngle-Math.PI/2)*k.y + Math.cos(screenAngle-Math.PI/2)*k.x))/b);
					k.direction.x *= -Math.abs(Math.cos(screenAngle)) + 1 + Math.abs(Math.cos(screenAngle))*(Math.abs((Math.sin(screenAngle)*this.y + Math.cos(screenAngle)*this.x) - (Math.sin(screenAngle)*k.y + Math.cos(screenAngle)*k.x))/b);

					
				} else {
					
					this.direction.y *= -Math.abs(Math.sin(screenAngle)) + 1 + Math.abs(Math.sin(screenAngle))*(Math.abs((Math.sin(screenAngle-Math.PI/2)*this.y + Math.cos(screenAngle-Math.PI/2)*this.x) - (Math.sin(screenAngle-Math.PI/2)*k.y + Math.cos(screenAngle-Math.PI/2)*k.x))/b);
					this.direction.x *= -Math.abs(Math.cos(screenAngle)) + 1 + Math.abs(Math.cos(screenAngle))*(Math.abs((Math.sin(screenAngle)*this.y + Math.cos(screenAngle)*this.x) - (Math.sin(screenAngle)*k.y + Math.cos(screenAngle)*k.x))/b);
					
				}
				
				k.direction.x += Math.cos(screenAngle-Math.PI/2)*(((Math.sin(screenAngle-Math.PI/2)*k.y + Math.cos(screenAngle-Math.PI/2)*k.x) - (Math.sin(screenAngle-Math.PI/2)*this.y + Math.cos(screenAngle-Math.PI/2)*this.x))/(b*8));
				k.direction.y += Math.cos(screenAngle-Math.PI/2)*(((Math.sin(screenAngle-Math.PI/2)*k.y + Math.cos(screenAngle-Math.PI/2)*k.x) - (Math.sin(screenAngle-Math.PI/2)*this.y + Math.cos(screenAngle-Math.PI/2)*this.x))/(b*8));
				this.direction.x += Math.cos(screenAngle-Math.PI/2)*(((Math.sin(screenAngle-Math.PI/2)*this.y + Math.cos(screenAngle-Math.PI/2)*this.x) - (Math.sin(screenAngle-Math.PI/2)*k.y + Math.cos(screenAngle-Math.PI/2)*k.x))/(b*8));
				this.direction.y += Math.sin(screenAngle-Math.PI/2)*(((Math.sin(screenAngle-Math.PI/2)*this.y + Math.cos(screenAngle-Math.PI/2)*this.x) - (Math.sin(screenAngle-Math.PI/2)*k.y + Math.cos(screenAngle-Math.PI/2)*k.x))/(b*8));
				
				k.lastX = k.x;
				k.lastY = k.y;
				
				this.appliedFriction();
		}
		
	}
	
	
	appliedMouseAttraction() {
		
		let dir = directionBetweenPoints(mouseX,mouseY,this.x,this.y)
		let d = distanceBetweenPoints(this.x,this.y,mouseX,mouseY)/50;
		if (d < 3) {
			this.direction.x = -Math.cos(dir)*d
			this.direction.y = -Math.sin(dir)*d
		} else {
			this.direction.x -= Math.cos(dir)/(d*3)
			this.direction.y -= Math.sin(dir)/(d*3)
		}
		
	}
	
	appliedMouseExpulsion() {
		
		let dir = directionBetweenPoints(mouseX,mouseY,this.x,this.y)
		let d = distanceBetweenPoints(this.x,this.y,mouseX,mouseY)/50;
		if (d < 3) {
			this.direction.x = Math.cos(dir)/(d/3)
			this.direction.y = Math.sin(dir)/(d/3)
			this.collision = false;
		}
		
	}
	
	appliedMouseOldExpulsion() {
		
		let dir = directionBetweenPoints(mouseX,mouseY,this.x,this.y)
		let d = distanceBetweenPoints(this.x,this.y,mouseX,mouseY)/50;
		this.direction.x += Math.cos(dir)/d
		this.direction.y += Math.sin(dir)/d
		
	}
	
	update() {
		
		this.collision = true;
		this.lastX = this.x;
		this.lastY = this.y;
		this.appliedVelocity();
		this.appliedGravity();
		this.appliedFriction();
		if (clicked == 1) {this.appliedMouseAttraction()};
		if (clicked == 2) {this.appliedMouseOldExpulsion()};
		if (clicked == 3) {this.appliedMouseExpulsion()};
		if (this.collision) {this.appliedCollision()};
		
	}
	
	draw() {
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius*1.5, 0, 2 * Math.PI);
		ctx.fill();
		
	}
	
	getX() {
		
		return this.x;
		
	}
	
	getY() {
		
		return this.y;
		
	}
	
	getRadius() {
		
		return this.radius;
		
	}
	
	bounceX(x) {
		
		this.x = x;
		this.direction.x = this.mass-this.direction.x;
		
	}
	
	bounceY(y) {
		
		this.y = y;
		this.direction.y = this.mass-this.direction.y;
		
	}
	
	
}




/*function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180], x, 'front to back'
  var y = event.gamma; // In degree in the range [-90,90], y, 'left to right'
  var z = event.alpha; // 0-360, z, compass orientation

  // coord 1: 0,0
  // coord 2: x,y
  // calculate the angle
  var rad = Math.atan2(y, x);
  var deg = rad * (180 / Math.PI);

  // take into account if phone is held sideways / in landscape mode
  var screenOrientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
  // 90, -90, or 0
  var angle = screenOrientation.angle || window.orientation || 0; 
  
  deg = z + angle; 

  screenAngle = deg*Math.PI/180+Math.PI/2;
}

window.addEventListener('deviceorientation', handleOrientation);*/



QUALITY = 8;
var canvas = document.getElementById("simulation");
var ctx = canvas.getContext("2d");
var particles = [];
var mouseX = 0;
var mouseY = 0;
var clicked = 0;
var lastCalledTime;
var fps;
var tries = 20;
var screenAngle = Math.PI/2;
onmousemove = function(e){mouseX = e.clientX; mouseY = e.clientY}

canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete


canvas.addEventListener('mousedown', event => {
	
   if( event.which == 2 ) {
      event.preventDefault();
   }
  clicked = event.which;
  
});

canvas.addEventListener('mouseup', event => {
	
  clicked = 0;
  
});



function init() {
	
	
}


function update() {
	
	let ratio = Math.ceil(window.devicePixelRatio);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.width = `${window.innerWidth}px`;
	canvas.style.height = `${window.innerHeight}px`;
    //canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
	
	if(!lastCalledTime) {
		lastCalledTime = Date.now();
		fps = 0;
	}
	delta = ((Date.now() - lastCalledTime)/1000)*60;
	lastCalledTime = Date.now();
	fps = 60/delta;
	
	
	let size = (1+Math.random())*QUALITY;
	if (fps >= 50 && tries > 0) {tries = 20; particles.push(new Particle(80,60,size,new Degree(0+Math.random()*10,'deg'),2+Math.random()*10,0.1,0.995,1))} else {tries -= 1} // x,y,radius,dir,velocity,gravity,friction,mass
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = `rgb(255,255,255)`;
	ctx.fillRect(0,0,canvas.width,canvas.height)
	
	let color = 0;
	for (const item of particles.sort((a,b) => b.y - a.y)) {
		
		color += 0.1;
		
		item.update();
		
		if (item.getY() + item.getRadius() > canvas.height) {
			item.bounceY(canvas.height - item.getRadius());
		}
		
		if (item.getY() - item.getRadius() < 0) {
			item.bounceY(0 + item.getRadius());
		}
		
		if (item.getX() + item.getRadius() > canvas.width) {
			item.bounceX(canvas.width - item.getRadius());
		}
		
		if (item.getX() - item.getRadius() < 0) {
			item.bounceX(0 + item.getRadius());
		
		}
		
		let speed = Math.abs(item.x-item.lastX) + Math.abs(item.y-item.lastY);
		ctx.fillStyle = `rgb(${(color+speed+5)}, ${(color+speed+20)}, ${(color+speed+50)})`;
		item.draw();
		
	}
	
	requestAnimationFrame(update);
}


init();
update();