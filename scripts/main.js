class Matrix {
	
	constructor(height,width,values) {
		
		this.width = width;
		this.height = height;
		this.array = new Array(height)
		.fill(0)
		.map((row, i) => new Array(width)
		.fill(0)
		.map((col, j) => values[i*width+j]));
		
	}
	
	
	mult(matrix) {

		return (this.width == matrix.height) ? new Matrix(this.height,matrix.width,this.array
		.map((rowB,i) => new Array(matrix.width)
		.fill(0)
		.map((colB,j) => new Array(this.width)
		.fill(0).reduce((a,b,c) => a + this.array[i][c]*matrix.array[c][j], 0) )))
		: NaN;
	}
	
	add(matrix) {

		return (this.width == matrix.width && this.height == matrix.height) ? new Matrix(this.height,matrix.width,this.array
		.map((row, i) => row
		.map((col, j) => col+matrix.array[i][j])))
		: NaN;
		
	}
	
	sub(matrix) {
		
		return (this.width == matrix.width && this.height == matrix.height) ? new Matrix(this.height,matrix.width,this.array
		.map((row, i) => row
		.map((col, j) => col-matrix.array[i][j])))
		: NaN;
		
	}
	
	
}

class Camera {
	
	constructor(x,y,z,rotx,roty,rotz) {
		
		this.pos = {x:x,y:y,z:z};
		this.rot = {x:rotx,y:roty,z:rotz};
		
	}
	
	
}

class Plane {
	
	constructor(x,y,z,rotx,roty,rotz) {
		
		this.pos = {x:x,y:y,z:z};
		this.rot = {x:rotx,y:roty,z:rotz};
		
	}
	
	set(x,y,z,rotx,roty,rotz) {
		this.pos = {x:x,y:y,z:z};
		this.rot = {x:rotx,y:roty,z:rotz};
	}
	
	
}

class Point {
	
	constructor(x,y,z) {
		
		this.pos = {x:x,y:y,z:z};
		this.vel = {x:0,y:0,z:0};
		this.links = [];
		this.hasMove = false;
		
	}
	
	
	update() {
		
		this.applyVelocity();
		
	}
	
	applyVelocity() {
		
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.pos.z += this.vel.z;
		
	}
	
	
	get2DProjection(camera,plane) {
		/*
		const ma = new Matrix(3,3,
		[1,0,0,
		0,Math.cos(camera.rot.x),Math.sin(camera.rot.x),
		0,-Math.sin(camera.rot.x),Math.cos(camera.rot.x)]);
		
		const mb = new Matrix(3,3,
		[Math.cos(camera.rot.y),0,-Math.sin(camera.rot.y),
		0,1,0,
		Math.sin(camera.rot.y),0,Math.cos(camera.rot.y)]);
		
		const mc = new Matrix(3,3,
		[Math.cos(camera.rot.z),Math.sin(camera.rot.z),0,
		-Math.sin(camera.rot.z),Math.cos(camera.rot.z),0,
		0,0,1]);
		
		const md = new Matrix(3,1,[this.pos.x,this.pos.y,this.pos.z]);
		
		const me = new Matrix(3,1,[camera.pos.x,camera.pos.y,camera.pos.z]);
		
		const mf = ma.mult(mb.mult(mc.mult(md.sub(me))))
		
		if (mf.array[2] < 0) return 0;
		
		return {x:plane.pos.z/mf.array[2]*mf.array[0]+plane.pos.x,
				 y:plane.pos.z/mf.array[2]*mf.array[1]+plane.pos.y}
		*/
		
		this.hasMove = false;
		
		const d = {
			x:Math.cos(camera.rot.y)*(Math.sin(camera.rot.z)*(this.pos.y-camera.pos.y)+Math.cos(camera.rot.z)*(this.pos.x-camera.pos.x)) - Math.sin(camera.rot.y)*(this.pos.z-camera.pos.z),
			y:Math.sin(camera.rot.x)*(Math.cos(camera.rot.y)*(this.pos.z-camera.pos.z)+Math.sin(camera.rot.y)*(Math.sin(camera.rot.z)*(this.pos.y-camera.pos.y)+Math.cos(camera.rot.z)*(this.pos.x-camera.pos.x))) + Math.cos(camera.rot.x)*(Math.cos(camera.rot.z)*(this.pos.y-camera.pos.y)-Math.sin(camera.rot.z)*(this.pos.x-camera.pos.x)),
			z:Math.cos(camera.rot.x)*(Math.cos(camera.rot.y)*(this.pos.z-camera.pos.z)+Math.sin(camera.rot.y)*(Math.sin(camera.rot.z)*(this.pos.y-camera.pos.y)+Math.cos(camera.rot.z)*(this.pos.x-camera.pos.x))) - Math.sin(camera.rot.x)*(Math.cos(camera.rot.z)*(this.pos.y-camera.pos.y)-Math.sin(camera.rot.z)*(this.pos.x-camera.pos.x))
		};
		
		if (d.z < 0) return 0;
		
		return {x:plane.pos.z/d.z*d.x+plane.pos.x,
				 y:plane.pos.z/d.z*d.y+plane.pos.y,
				 z:d.z};
		
	}
	
	
	repulseFromPoint(p,distance) {
		
		this.pos.x = p.pos.x+((this.pos.x-p.pos.x)*(1+distance));
		this.pos.y = p.pos.y+((this.pos.y-p.pos.y)*(1+distance));
		this.pos.z = p.pos.z+((this.pos.z-p.pos.z)*(1+distance));
		
	}
	
}


class Segment {
	
	constructor(p1,p2) {
		
		this.points = [p1,p2];
		this.length = Math.sqrt( Math.pow(p1.pos.x-p2.pos.x,2) + Math.pow(p1.pos.y-p2.pos.y,2) + Math.pow(p1.pos.z-p2.pos.z,2) )

		p1.links.push({p:p2,s:this});
		p2.links.push({p:p1,s:this});

	}
	
	get2DProjection(camera,plane) {
		
		return [this.points[0].get2DProjection(camera,plane),
				this.points[1].get2DProjection(camera,plane)];
		
	}
	
	draw(ctx,camera,plane) {
		
		ctx.beginPath();
		this.trace(ctx,camera,plane);
		ctx.stroke();
		
	}
	
	trace(ctx,camera,plane) {
		
		let pos = this.get2DProjection(camera,plane);
		ctx.moveTo(pos[1].x, pos[1].y);
		ctx.lineTo(pos[0].x, pos[0].y);
		return pos[0].z

	}
	
	traceFace(ctx,camera,plane) {
		
		let pos = this.get2DProjection(camera,plane);
		if (ctx.initTrace) {
			let startingPos = this.points.findIndex(a => !ctx.nextSegment.points.includes(a));
			ctx.moveTo(pos[startingPos].x, pos[startingPos].y);
			ctx.lastPos = this.points[startingPos];
			ctx.initTrace = false;
		}
		if (ctx.lastPos == this.points[0]) {
			ctx.lineTo(pos[1].x, pos[1].y);
			ctx.lastPos = this.points[1];
			return pos[1].z
		}
		ctx.lineTo(pos[0].x, pos[0].y);
		ctx.lastPos = this.points[0];
		return pos[0].z

	}
	
	applyGravity() {
		
		this.points.forEach(item => {
			
			if (!item.hasMove) {
				
				
				item.pos.y += 0.05;
				
				if (item.pos.y > 10) {
					
					item.pos.y = 10;
					
				}
				
				
			}
			
			item.hasMove = true;
			
		})
		
	}
	
}



class Face {
	
	constructor(s1,s2,s3) {
		
		this.segments = [s1,s2,s3];
		
	}
	
	trace(ctx,camera,plane) {
		
		ctx.initTrace = true;
		this.cameraDistance = 0;
		ctx.nextSegment = this.segments[1];
		this.segments.forEach((item) => {this.cameraDistance+=item.traceFace(ctx,camera,plane)},this)
		this.cameraDistance /= 3;
		return this.cameraDistance;
		
	}
	
	getCamDistance(cam) {
	
		return this.cameraDistance;
	
	}
	
}




class Mesh {
	
	constructor() {
		
		this.segments = [...arguments];
		this.createPoints();
		this.createFaces();
		this.cameraDistance = 0;


	}
	
	update() {
		
		applyVelocity();
		points.forEach(item => item.update());
		
	}
	
	applyVelocity() {
		
		//
		
	}
	
	createPoints() {
		
		this.points = [... new Set(this.segments.flatMap(a => a.points))];
		this.points.forEach((item) => {
			
			item.others = this.points.filter(a => a!=item).map(a => {return {p:a,l:Math.sqrt( Math.pow(item.pos.x-a.pos.x,2) + Math.pow(item.pos.y-a.pos.y,2) + Math.pow(item.pos.z-a.pos.z,2) )}});
			
		},this);
		
	}
	
	createFaces() {
		
		this.faces = [];
		for (let item of this.segments) {
			
			item.points[0]
			let segmentsA = this.segments.filter(a => a!=item && a.points.includes(item.points[0]));
			let segmentsB = this.segments.filter(a => a!=item && a.points.includes(item.points[1]));
			
			let segmentsC = segmentsA.concat(segmentsB);
			let segmentsD = [];
			segmentsC.forEach(itemB => {
				
				let pair = segmentsC.find(a => a!=itemB && a.points.includes(itemB.points.find(b=>b!=item.points[0]&&b!=item.points[1])));
				segmentsD.push([itemB,pair]);
				
			})
			
			for (let itemB of segmentsD) {
				if (itemB[0] && itemB[1] && !this.faces.some(a => a.segments.includes(item) && a.segments.includes(itemB[0]) && a.segments.includes(itemB[1]))) {
					this.faces.push(new Face(item,itemB[0],itemB[1]));
				}
			}
			
		}
		
	}
	
	rotate(x,y,z) {
		
		this.rot.x += x;
		this.rot.y += y;
		this.rot.z += z;
		
		let cosa = Math.cos(this.rot.z);
		let sina = Math.sin(this.rot.z);

		let cosb = Math.cos(this.rot.x);
		let sinb = Math.sin(this.rot.x);

		let cosc = Math.cos(this.rot.y);
		let sinc = Math.sin(this.rot.y);

		let Axx = cosa*cosb;
		let Axy = cosa*sinb*sinc - sina*cosc;
		let Axz = cosa*sinb*cosc + sina*sinc;

		let Ayx = sina*cosb;
		let Ayy = sina*sinb*sinc + cosa*cosc;
		let Ayz = sina*sinb*cosc - cosa*sinc;

		let Azx = -sinb;
		let Azy = cosb*sinc;
		let Azz = cosb*cosc;
		
		for (let item of this.points) {
			
			if (!item.oPos) item.oPos = {...item.pos};
			
			let px = item.oPos.x-this.pos.x;
			let py = item.oPos.y-this.pos.y;
			let pz = item.oPos.z-this.pos.z;
			
			item.pos.x = Axx*px + Axy*py + Axz*pz + this.pos.x;
			item.pos.y = Ayx*px + Ayy*py + Ayz*pz + this.pos.y;
			item.pos.z = Azx*px + Azy*py + Azz*pz + this.pos.z;
			
		}
		
	}
	
	get2DProjection(camera,plane) {
		
		return this.segments.map(segment => segment.get2DProjection(camera,plane));
		
	}
	
	draw(ctx,camera,plane,color) {
		
		ctx.beginPath();
		this.trace(ctx,camera,plane);
		ctx.stroke();
		
	}
	
	drawFaces(ctx,camera,plane) {
		
		this.cameraDistance = 0;
		this.faces.sort((a,b) => b.getCamDistance(camera) - a.getCamDistance(camera));
		this.faces.forEach((item) => {
			ctx.fillStyle = `rgb(${ctx.backColor.red+ctx.paintColor.red/item.cameraDistance},${ctx.backColor.green+ctx.paintColor.green/item.cameraDistance},${ctx.backColor.blue+ctx.paintColor.blue/item.cameraDistance})`;
			ctx.beginPath();
			this.cameraDistance += item.trace(ctx,camera,plane);
			ctx.fill();
		},this);
		this.cameraDistance /= this.faces.length;
		
	}
	
	trace(ctx,camera,plane) {
		
		this.segments.forEach((item) => {item.trace(ctx,camera,plane)})
		
	}
	
	traceFaces(ctx,camera,plane) {
		
		this.faces.forEach((item) => item.trace(ctx,camera,plane))
		
	}
	
	applyGravity() {
		
		this.segments.forEach((item) => item.applyGravity());
		
	};
	
	applyRigidity() {
		
		this.points.forEach((item) => {
			
			item.others.forEach((itemB) => {
				let length = Math.sqrt( Math.pow(item.pos.x-itemB.p.pos.x,2) + Math.pow(item.pos.y-itemB.p.pos.y,2) + Math.pow(item.pos.z-itemB.p.pos.z,2) );
				item.repulseFromPoint(itemB.p,((itemB.l-length)/item.others.length));
				//itemB.p.repulseFromPoint(item,((itemB.l-length)/8));
				
			})
		
		});
		
	}
	
}


class MeshEx extends Mesh {
	
	constructor() {
		
		super();
		this.pos = this.segments.reduce((a,b,c) => {return {
			x:(a.x+b.points[0].pos.x+b.points[1].pos.x)/(2+!c),
			y:(a.y+b.points[0].pos.y+b.points[1].pos.y)/(2+!c),
			z:(a.z+b.points[0].pos.z+b.points[1].pos.z)/(2+!c)
		}}, {x:0,y:0,z:0});
		this.rot = {x:0,y:0,z:0};
		this.scale = {width:1,height:1,depth:1};
		this.opacity = 1;

	}
	
}



class Cube extends MeshEx {
	
	constructor(x,y,z,width,height,depth,rx,ry,rz,subdivision) {
		
		super();
		let p = [
		new Point(x-width/2,y-height/2,z-depth/2),
		new Point(x-width/2,y+height/2,z-depth/2),
		new Point(x+width/2,y+height/2,z-depth/2),
		new Point(x+width/2,y-height/2,z-depth/2),
		new Point(x-width/2,y-height/2,z+depth/2),
		new Point(x-width/2,y+height/2,z+depth/2),
		new Point(x+width/2,y+height/2,z+depth/2),
		new Point(x+width/2,y-height/2,z+depth/2)
		]
		this.segments = [
		new Segment(p[0],p[1]),
		new Segment(p[1],p[2]),
		
		new Segment(p[2],p[3]),
		new Segment(p[3],p[0]),
		
		
		
		new Segment(p[0],p[4]),
		
		new Segment(p[1],p[5]),
		
		new Segment(p[2],p[6]),
		
		new Segment(p[3],p[7]),
		
		
		
		new Segment(p[4],p[5]),
		new Segment(p[5],p[6]),
		
		new Segment(p[6],p[7]),
		new Segment(p[7],p[4]),
		
		
		];
		
		
		this.pos = {x:x,y:y,z:z};
		this.scale = {width:width,height:height,depth:depth};
		this.createPoints();
		this.createFaces();
		this.rotate(rx,ry,rz);

	}
	
}


class FakeTesseract extends MeshEx {
	
	constructor(x,y,z,width,height,depth,rx,ry,rz,subdivision) {
		
		super();
		let p = [
		new Point(x-width/2,y-height/2,z-depth/2),
		new Point(x-width/2,y+height/2,z-depth/2),
		new Point(x+width/2,y+height/2,z-depth/2),
		new Point(x+width/2,y-height/2,z-depth/2),
		new Point(x-width/2,y-height/2,z+depth/2),
		new Point(x-width/2,y+height/2,z+depth/2),
		new Point(x+width/2,y+height/2,z+depth/2),
		new Point(x+width/2,y-height/2,z+depth/2),
		new Point(x-width/4,y-height/4,z-depth/4),
		new Point(x-width/4,y+height/4,z-depth/4),
		new Point(x+width/4,y+height/4,z-depth/4),
		new Point(x+width/4,y-height/4,z-depth/4),
		new Point(x-width/4,y-height/4,z+depth/4),
		new Point(x-width/4,y+height/4,z+depth/4),
		new Point(x+width/4,y+height/4,z+depth/4),
		new Point(x+width/4,y-height/4,z+depth/4)
		]
		this.segments = [
		new Segment(p[0],p[1]),
		new Segment(p[1],p[2]),
		
		new Segment(p[2],p[3]),
		new Segment(p[3],p[0]),
		
		
		
		new Segment(p[0],p[4]),
		
		new Segment(p[1],p[5]),
		
		new Segment(p[2],p[6]),
		
		new Segment(p[3],p[7]),
		
		
		
		new Segment(p[4],p[5]),
		new Segment(p[5],p[6]),
		
		new Segment(p[6],p[7]),
		new Segment(p[7],p[4]),
		
		
		
		
		
		
		new Segment(p[0+8],p[1+8]),
		new Segment(p[1+8],p[2+8]),
		
		new Segment(p[2+8],p[3+8]),
		new Segment(p[3+8],p[0+8]),
		
		
		
		new Segment(p[0+8],p[4+8]),
		
		new Segment(p[1+8],p[5+8]),
		
		new Segment(p[2+8],p[6+8]),
		
		new Segment(p[3+8],p[7+8]),
		
		
		
		new Segment(p[4+8],p[5+8]),
		new Segment(p[5+8],p[6+8]),
		
		new Segment(p[6+8],p[7+8]),
		new Segment(p[7+8],p[4+8]),
		
		
		new Segment(p[0],p[8]),
		new Segment(p[1],p[9]),
		new Segment(p[2],p[10]),
		new Segment(p[3],p[11]),
		new Segment(p[4],p[12]),
		new Segment(p[5],p[13]),
		new Segment(p[6],p[14]),
		new Segment(p[7],p[15]),
		];
		
		
		this.pos = {x:x,y:y,z:z};
		this.scale = {width:width,height:height,depth:depth};
		this.createPoints();
		this.createFaces();
		this.rotate(rx,ry,rz);

	}
	
}

class CubeTrianguled extends MeshEx {
	
	constructor(x,y,z,width,height,depth,subdivision) {
		
		super();
		let p = [
		new Point(x-width/2,y-height/2,z-depth/2),
		new Point(x-width/2,y+height/2,z-depth/2),
		new Point(x+width/2,y+height/2,z-depth/2),
		new Point(x+width/2,y-height/2,z-depth/2),
		new Point(x-width/2,y-height/2,z+depth/2),
		new Point(x-width/2,y+height/2,z+depth/2),
		new Point(x+width/2,y+height/2,z+depth/2),
		new Point(x+width/2,y-height/2,z+depth/2)
		]
		this.segments = [
		new Segment(p[0],p[1]),
		new Segment(p[1],p[2]),
		
		new Segment(p[1],p[3]),
		
		new Segment(p[2],p[3]),
		new Segment(p[3],p[0]),
		
		
		
		new Segment(p[0],p[4]),
		new Segment(p[0],p[5]),
		
		new Segment(p[1],p[5]),
		new Segment(p[1],p[6]),
		
		new Segment(p[2],p[6]),
		new Segment(p[2],p[7]),
		
		new Segment(p[3],p[7]),
		new Segment(p[3],p[4]),
		
		
		
		new Segment(p[4],p[5]),
		new Segment(p[5],p[6]),
		
		new Segment(p[5],p[7]),
		
		new Segment(p[6],p[7]),
		new Segment(p[7],p[4]),
		
		
		];
		
		this.createFaces();

		for (let k = 0; k < subdivision; k++) {
			let newSegments = [];
			let newPoints = [];
			let length;
			for (const item of this.segments) {
				
				newPoints.push(new Point( (item.points[0].pos.x+item.points[1].pos.x)/2 , (item.points[0].pos.y+item.points[1].pos.y)/2 , (item.points[0].pos.z+item.points[1].pos.z)/2 ));

				newSegments.push(new Segment(item.points[0],newPoints[newPoints.length-1]));
				newSegments.push(new Segment(item.points[1],newPoints[newPoints.length-1]));

				this.faces.forEach((itemB) => {
					
					if (!itemB.points) itemB.points = [];
					
					
					if (itemB.segments.includes(item)) {
						
						itemB.segments.push(newSegments[newSegments.length-2]);
						itemB.segments.push(newSegments[newSegments.length-1]);
						itemB.points.push(newPoints[newPoints.length-1]);
					}
					
					
				})
				
				if (!length) length = Math.sqrt( Math.pow(item.points[0].pos.x - item.points[1].pos.x,2) + Math.pow(item.points[0].pos.y - item.points[1].pos.y,2) + Math.pow(item.points[0].pos.z - item.points[1].pos.z,2) );
				
			}
			
			for (let i = 0; i < newPoints.length; i++) {
				
				for (let j = i+1; j < newPoints.length; j++) {
					
					let a = newPoints[i];
					let b = newPoints[j];
					
					let tmpLength = Math.sqrt( Math.pow(a.pos.x - b.pos.x,2) + Math.pow(a.pos.y - b.pos.y,2) + Math.pow(a.pos.z - b.pos.z,2) )
						
					if (this.faces.some((item) => item.points.includes(a) && item.points.includes(b)) && tmpLength < length*0.6) {
						newSegments.push(new Segment(a,b));
						this.faces.find((item) => item.points.includes(a) && item.points.includes(b)).segments.push(newSegments[newSegments.length-1]);
					}
					
				}
				
			}
		
			this.segments = newSegments;
		}
		
		this.pos = {x:x,y:y,z:z};
		this.scale = {width:width,height:height,depth:depth};
		this.createPoints();
		this.createFaces();

	}
	
}


class Polyhedron extends MeshEx {
	
	constructor(x,y,z,width,height,depth,subdivision) {
		
		super();
		let p = [
		new Point(x+Math.cos(0)*width,y,z+Math.sin(0)*width),
		new Point(x+Math.cos(2*(2*Math.PI)/3)*width,y,z+Math.sin(2*(2*Math.PI)/3)*width),
		new Point(x+Math.cos((2*Math.PI)/3)*width,y,z+Math.sin((2*Math.PI)/3)*width)
		]
		
		let _height = Math.sqrt( Math.pow( (p[0].pos.x+p[1].pos.x)/2 - p[2].pos.x ,2)+Math.pow( (p[0].pos.z+p[1].pos.z)/2 - p[2].pos.z ,2) )
		
		p[3] = new Point(x,y+_height,z)
		
		
		this.segments = [];
		let center;
		
		for (let i = 0; i < p.length; i++) {
			
			if (!center) center = new Point(p[i].pos.x,p[i].pos.y,p[i].pos.z);
			else {
				center.pos.x += p[i].pos.x;
				center.pos.y += p[i].pos.y;
				center.pos.z += p[i].pos.z;
			}
			
			for (let j = i+1; j < p.length; j++) {
				
				this.segments.push(new Segment(p[i],p[j]));
				
			}
			
		}
		center.pos.x /= 4;
		center.pos.y /= 4;
		center.pos.z /= 4;
		
		let radius = Math.sqrt(Math.pow(center.pos.x-p[0].pos.x,2)+Math.pow(center.pos.y-p[0].pos.y,2)+Math.pow(center.pos.z-p[0].pos.z,2));

		this.createFaces();

		for (let k = 0; k < subdivision; k++) {
			let newSegments = [];
			let newPoints = [];
			let length;
			for (const item of this.segments) {
				
				newPoints.push(new Point( (item.points[0].pos.x+item.points[1].pos.x)/2 , (item.points[0].pos.y+item.points[1].pos.y)/2 , (item.points[0].pos.z+item.points[1].pos.z)/2 ));

				newSegments.push(new Segment(item.points[0],newPoints[newPoints.length-1]));
				newSegments.push(new Segment(item.points[1],newPoints[newPoints.length-1]));

				this.faces.forEach((itemB) => {
					
					if (!itemB.points) itemB.points = [];
					
					
					if (itemB.segments.includes(item)) {
						
						itemB.segments.push(newSegments[newSegments.length-2]);
						itemB.segments.push(newSegments[newSegments.length-1]);
						itemB.points.push(newPoints[newPoints.length-1]);
					}
					
					
				})
				
				if (!length) length = Math.sqrt( Math.pow(item.points[0].pos.x - item.points[1].pos.x,2) + Math.pow(item.points[0].pos.y - item.points[1].pos.y,2) + Math.pow(item.points[0].pos.z - item.points[1].pos.z,2) );
				
			}
			
			for (let i = 0; i < newPoints.length; i++) {
				
				for (let j = i+1; j < newPoints.length; j++) {
					
					let a = newPoints[i];
					let b = newPoints[j];
					
					let tmpLength = Math.sqrt( Math.pow(a.pos.x - b.pos.x,2) + Math.pow(a.pos.y - b.pos.y,2) + Math.pow(a.pos.z - b.pos.z,2) )
						
					if (this.faces.some((item) => item.points.includes(a) && item.points.includes(b)) && tmpLength < length*0.6) {
						newSegments.push(new Segment(a,b));
						this.faces.find((item) => item.points.includes(a) && item.points.includes(b)).segments.push(newSegments[newSegments.length-1]);
					}
					
				}
				
			}
		
			this.segments = newSegments;
		}
		
		this.pos = {x:x,y:y,z:z};
		this.scale = {width:width,height:height,depth:depth};
		this.createFaces();
		this.points = [... new Set(this.segments.flatMap(a => a.points))];
		this.points.forEach((item) => {
			item.pos.x=center.pos.x-item.pos.x;
			item.pos.y=center.pos.y-item.pos.y;
			item.pos.z=center.pos.z-item.pos.z;
			
			let resizeFactor = radius/Math.sqrt(Math.pow(item.pos.x,2)+Math.pow(item.pos.y,2)+Math.pow(item.pos.z,2));
			
			item.pos.x=center.pos.x-item.pos.x*resizeFactor;
			item.pos.y=center.pos.y-item.pos.y*resizeFactor;
			item.pos.z=center.pos.z-item.pos.z*resizeFactor;
		})
		this.createPoints();

	}
	
}





const canvas = document.getElementById("three-js");
const ctx = canvas.getContext("2d");
canvas.style.display = `block`;
let pageElem = document.getElementById("page");
canvas.style.width = `${pageElem.clientWidth}px`;
canvas.style.height = `${pageElem.innerHeight}px`;
canvas.width = window.innerWidth*window.devicePixelRatio;
canvas.height = window.innerHeight*window.devicePixelRatio;
const camera = new Camera(0,0,-40,0,0,0);
const plane = new Plane(canvas.width/2,canvas.height/2,300,0,0,0);
let viewMode = 1;
let timer = 0;
let windowChangeAsked = false;
let loopBreak = false;


camera.dest = {x:0,y:0,z:0};
ctx.backColor = {red:20,green:20,blue:20};


const cubes = [];
const points = [];
const segmentsGhosts = [];
cubes.push(new FakeTesseract(0,0,0,30,30,30,0,0,0,0));

addEventListener("mousemove", (event) => {
	cameraT = 0;
	camera.dest.y = (event.clientX/canvas.width-0.5)/2;
	camera.dest.x = -(event.clientY/canvas.height-0.5)/2;
});

function update() {
	
	timer += 1;
	
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = `rgb(255,255,255)`;
	let tesseractGhost = new FakeTesseract(0,0,0,30,30,30,cubes[0].rot.x,cubes[0].rot.y,cubes[0].rot.z,0);
	tesseractGhost.opacity = 0.5;
	cubes.push(tesseractGhost);
	
	
	if (timer%10 == 0) {
		let velx = Math.random()*2-1;
		let point = new Point((velx>0)?32:-32,Math.random()*canvas.height-canvas.height/2,0,0,0,0,0,0,0,0)
		point.vel.x = velx;
		point.vel.y = Math.random()*2-1;
		point.lifeSpan = 0;
		points.push(point);
	}


	if (viewMode == 0) cubes.sort((a,b) => b.cameraDistance - a.cameraDistance);

	let segments = [];
	points.forEach((item, i) => {
		item.update();
		item.lifeSpan++;
		if (item.lifeSpan > 200) {
			points.splice(i,1);
			i--;
		}
		points.filter(a => a != item && (a.pos.x>0 && item.pos.x>0 || a.pos.x<0 && item.pos.x<0) && Math.sqrt(Math.pow(a.pos.x-item.pos.x,2)+Math.pow(a.pos.y-item.pos.y,2)) < 100).forEach(a => segments.push(new Segment(item,a)));
	});
	segments.forEach((item) => {
		let segmentGhost = new Segment(new Point(item.points[0].pos.x,item.points[0].pos.y,item.points[0].pos.z),new Point(item.points[1].pos.x,item.points[1].pos.y,item.points[1].pos.z));
		segmentGhost.opacity = 1;
		segmentsGhosts.push(segmentGhost);
		ctx.beginPath();
		item.trace(ctx,camera,plane);
		ctx.strokeStyle = `rgba(255,255,255,${item.opacity})`;
		ctx.stroke();
	});
	segmentsGhosts.forEach((item, i) => {
		item.opacity -= 0.05;
		if (item.opacity <= 0) {
			segmentsGhosts.splice(i,1);
			i--;
		}
		ctx.beginPath();
		item.trace(ctx,camera,plane);
		ctx.strokeStyle = `rgba(255,255,255,${item.opacity})`;
		ctx.stroke();
	});
	cubes.forEach((item, i) => {
		if (i <= 0) item.rotate(0.015,0,0.015);
		if (i > 0) item.opacity -= 0.025;
		if (item.opacity <= 0) {
			cubes.splice(i,1);
			i--;
		}
		//item.applyRigidity();
		//item.applyGravity();
		ctx.paintColor = item.color;
		ctx.beginPath();
		if (viewMode == 1) item.trace(ctx,camera,plane);
		if (viewMode == 0) item.drawFaces(ctx,camera,plane);
		ctx.strokeStyle = `rgba(255,255,255,${item.opacity})`;
		if (viewMode == 1) ctx.stroke();
	});
	
	
	let operand = typeof t === 'undefined' ? 0 : t;
	document.getElementById('museum-starting-text').style.opacity = (Math.sin(timer/50)+1)/2-operand*2;
	if (windowChangeAsked && !loopBreak) {
		camera.rot.y += (0-camera.rot.y)/20;
		camera.rot.x += (0-camera.rot.x)/20;
		camera.pos.z = easeInSine(t, -40, 40, 1);
		t += 0.015;
		t = Math.min(t,1)
		if (t > 0.8) {
			document.body.style.opacity -= 0.075;
			if (document.body.style.opacity <= 0) { 
				window.open("Museum","_self");
				loopBreak = true;
			}
		}
	} else {
		camera.rot.y += (camera.dest.y-camera.rot.y)/20;
		camera.rot.x += (camera.dest.x-camera.rot.x)/20;
	}
	
	
	requestAnimationFrame(update);
}

onload = (event) => {

	document.body.style.animation = 'appear 1s ease-in-out';
	document.body.style.opacity = 1;

}

update();