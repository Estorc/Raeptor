
// Declare main variables

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var arrows = [false,false,false,false];
const SPEED = 2;
const ANGLE_SPEED = 20;
var walk = 0;
var placer;
var lastX;
var step = 0;
camera.position.z = 1;
camera.rotation.y = Math.PI;
var light = [];
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
var startCube;
var museum;
var museumTex;
var UI;
var link = null;
var warp = false;

var paintings = []
var paintingsContent = [
{image:"images/FluidSimulation.png",link:"../2DFluidSimulation",text:"“2D Fluid Simulation”\n~ 2023 - Estorc ~\n\nAppuyez sur Espace pour explorer.",posx:7.75,posy:3.25,posz:59,rot:Math.PI},
{image:"images/SoftBodySimulation.png",link:"../3DSoftBody",text:"“3D Soft Body Simulation”\n~ 2022 - Estorc ~\n\nAppuyez sur Espace pour explorer.",posx:51.75,posy:3.25,posz:59,rot:Math.PI},
{image:"images/exit.png",link:"../",text:"Appuyez sur Espace pour quitter la vue interactive.",posx:85,posy:3.25,posz:-170,rot:Math.PI/2}]




const ui = document.createElement('canvas');
ui.id     = "User Interface";
ui.width  = window.innerWidth;
ui.height = window.innerHeight;
ui.style.position = "absolute";
var ctx = ui.getContext("2d");



function init() { // Initializing the scene
	
	renderer.setSize(window.innerWidth,window.innerHeight ); // Make Three.js Canvas take all window
	document.body.appendChild( renderer.domElement ); // Add Three.js Canvas to the html <body>
	
	let pgeometry = new THREE.PlaneGeometry( 32.25, 26.25 );
	let pmaterial = new THREE.MeshBasicMaterial( {color: 0xccffaa, side: THREE.DoubleSide} );
	placer = new THREE.Mesh( pgeometry, pmaterial );
	//scene.add(placer)


	light[0] = new THREE.PointLight(0xffffff,0.9, 300)
	light[0].position.set(285, 10, -18)
	scene.add(light[0])

	light[1] = new THREE.PointLight(0xffffff,0.9, 300)
	light[1].position.set(-234, 10, -24)
	scene.add(light[1])
	
	
	light[2] = new THREE.PointLight(0xffffff,0.9, 300)
	light[2].position.set(29, 10, 49)
	scene.add(light[2])
	
	light[3] = new THREE.PointLight(0xffffff,0.9, 300)
	light[3].position.set(33, 10, -86)
	scene.add(light[3])
	
	
	light[4] = new THREE.PointLight(0xffffff,0.9, 300)
	light[4].position.set(124, 10, -175)
	scene.add(light[4])
	
	
	light[5] = new THREE.PointLight(0xffffff,0.9, 300)
	light[5].position.set(120, 10, 154)
	scene.add(light[5])
	
	light[6] = new THREE.PointLight(0xffffff,0.9, 300)
	light[6].position.set(-63, 10, 159)
	scene.add(light[6])
	
	light[7] = new THREE.PointLight(0xffffff,0.9, 300)
	light[7].position.set(141, 10, -14)
	scene.add(light[7])
	
	light[8] = new THREE.PointLight(0xffffff,0.9, 300)
	light[8].position.set(-52, 10, -14)
	scene.add(light[8])
	camera.position.y = 0;
	
	// instantiate a loader
	const texLoader = new THREE.MTLLoader();


	texLoader.load(
		// resource URL
		'3d/project.mtl',
		// called when resource is loaded
		function ( materials ) {

			materials.preload()
			
			museumTex = materials;
			Object.entries(museumTex.materials).forEach(item => {item[1].opacity = 0; item[1].transparent = true})
			
			const loader = new THREE.OBJLoader();
			// load a resource
			loader.setMaterials(materials)
			loader.load(
				// resource URL
				'3d/project.obj',
				// called when resource is loaded
				function ( object ) {
			
					object.position.y = - 20;
					museum = object;
					scene.add( museum );
					startCube = createCubeArmature(15,15,15,0xffffff)
					startCube.position.y = 0;
					startCube.material.transparent = true;
					startCube.material.opacity = 0;
					scene.add(startCube)

				},
				// called when loading is in progresses
				function ( xhr ) {

					console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

				},
				// called when loading has errors
				function ( error ) {

					console.log( 'An error happened' );

				}
			);
			

		}
	);
	
	
	
	for (item of paintingsContent) {
		let geometry = new THREE.PlaneGeometry( 32.25, 26.25 );
		let map = new THREE.TextureLoader().load( item.image );
		let material = new THREE.MeshBasicMaterial( {map: map, side: THREE.FrontSide} );
		paintings.push(new THREE.Mesh( geometry, material ));
		let id = paintings.length-1
		paintings[id].text = item.text;
		paintings[id].link = item.link;
		paintings[id].position.x = item.posx;
		paintings[id].position.y = item.posy;
		paintings[id].position.z = item.posz;
		paintings[id].rotation.y = item.rot;
		paintings[id].material.transparent = true;
		paintings[id].material.opacity = 0;
		scene.add( paintings[id] );
	}

	const uiTex = new THREE.CanvasTexture(ui);
	const material = new THREE.SpriteMaterial( { map: uiTex,transparent: true, opacity: 0 } );

	UI = new THREE.Sprite( material );
	UI.scale.set(window.innerWidth/750, window.innerHeight/750, 1)
	scene.add( UI );

	

	
}



function loopBegin() { // Executed at the begin of each frames

	ctx.clearRect(0, 0, ui.width, ui.height);
	
	if (museum && museumTex.materials['FLOOR'].opacity < 1) {
		
		arrows = [false,false,false,false];
		
	}
	
	if (startCube && startCube.material.opacity < 1 && museumTex.materials['FLOOR'].opacity < 1) {
		startCube.material.opacity += 0.05;
	} else if (museum && museumTex.materials['FLOOR'].opacity < 1) {
			
		camera.position.z -= 0.2;
		Object.entries(museumTex.materials).forEach(item => {item[1].opacity += 0.01})
		paintings.forEach((item) => item.material.opacity += 0.01)
	
	} else if (museum && museumTex.materials['FLOOR'].opacity >= 1) {
		Object.entries(museumTex.materials).forEach(item => {item[1].transparent = false})
		startCube.material.opacity -= 0.1;
	}
	  setTimeout(() => {
		requestAnimationFrame(animate);
	  }, 1000 / 60);
	
}

function loopStep() { // Executed each frames
	
	ctx.fillStyle = "rgba(0, 0, 0, .5)";
	ctx.fillRect(20, 20, ui.width-40, ui.height-40)
	
	let paintingsActive = paintings.filter((item) => Math.abs(camera.rotation.y % (2*Math.PI)-(Math.atan2(item.position.x - camera.position.x, item.position.z - camera.position.z ) + Math.PI)% (2*Math.PI)) < 0.5 && Math.sqrt(Math.pow(item.position.z-camera.position.z,2)+Math.pow(item.position.x-camera.position.x,2)) < 50)
	
	if (paintingsActive.length > 0) {
		
		let min = paintingsActive.sort((a, b) => Math.min(Math.sqrt(Math.pow(a.position.z-camera.position.z,2)+Math.pow(a.position.x-camera.position.x,2)), Math.sqrt(Math.pow(b.position.z-camera.position.z,2)+Math.pow(b.position.x-camera.position.x,2))))[0]
		
		ctx.fillStyle = "rgba(255, 255, 255, 255)";
		ctx.font = "48px serif";
		ctx.textAlign = "center";
		let text = min.text.split('\n');
		let y = -text.length*12;
		text.forEach((item) => {
			
			ctx.fillText(item, ui.width/2, ui.height/2+y);
			y += 48;
			
		})
		
		link = min.link;
		UI.material.opacity += 0.1;
		
		
	} else if (!warp) {
		
		link = null;
		UI.material.opacity -= 0.1;
		
	}
	
	UI.material.opacity = Math.max(0,Math.min(1,UI.material.opacity))
	
	
	for (item of light) {
		
		if (!item.step) {
			item.step = Math.random()*200-100
		}
		
		item.step += 1;
		item.distance += Math.sin(item.step/30)*3;
		
	}

	lastX = camera.position.x;


	if (!warp) {
		if (arrows[0] && !arrows[1]) {
			camera.position.x -= Math.sin(camera.rotation.y) * SPEED;
			camera.position.z -= Math.cos(camera.rotation.y) * SPEED;
			walk += 0.4;
			camera.position.y += Math.sin(walk)/4;
		}
		if (arrows[1] && !arrows[0]) {
			camera.position.x += Math.sin(camera.rotation.y) * SPEED;
			camera.position.z += Math.cos(camera.rotation.y) * SPEED;
			walk += 0.4;
			camera.position.y += Math.sin(walk)/4;
		}
		if (arrows[2]) {
			camera.rotation.y -= ANGLE_SPEED/(180*Math.PI);
		}
		if (arrows[3]) {
			camera.rotation.y += ANGLE_SPEED/(180*Math.PI);
		}
	
	
		// Define map limit
		
		camera.position.x = clamp(camera.position.x,-233,278)
		
		camera.position.z = clamp(camera.position.z,-171,156)
		
		
		
		if (lastX <= 155 && lastX >= 89 && (camera.position.z > 46 || camera.position.z < -80)) {
			
			camera.position.x = clamp(camera.position.x,89,155);
			
		}
		
		if (lastX <= -31 && lastX >= -92 && camera.position.z > 46) {
			
			camera.position.x = clamp(camera.position.x,-92,-31);
			
		}
		
		
		
		
		if ((camera.position.x < 89 && camera.position.x > -31) || camera.position.x < -92 || camera.position.x > 155) {

			camera.position.z = Math.min(camera.position.z,46);
			
		}
		
		if (camera.position.x < 89 || camera.position.x > 155) {
			
			camera.position.z = Math.max(camera.position.z,-80)
			
		}

	}
	
	
	
	
	//Place Placer
	
	placer.position.set(camera.position.x,3.25,camera.position.z);
	
	placer.position.x -= Math.sin(camera.rotation.y) * 50;
	placer.position.z -= Math.cos(camera.rotation.y) * 50;

	//console.log(placer.position.x, placer.position.z)
	
	
	for (let i=0;i<scene.children.length;i++) {
		
		if (scene.children[i].action) {
			scene.children[i] = scene.children[i].action(scene.children[i]);
		}
		
	};
	
	
	UI.position.set(camera.position.x,camera.position.y,camera.position.z);
	UI.position.x -= Math.sin(camera.rotation.y);
	UI.position.z -= Math.cos(camera.rotation.y);
	
	
	if (museum && museumTex.materials['FLOOR'].opacity < 1) { UI.position.y = 500 }
	
	scene.children = scene.children.filter(item => item != null);
	
}

function loopEnd() { // Executed at the end of each frames
	
	UI.material.map.needsUpdate = true;
	
	
	if (warp) {
		if (museumTex.materials['FLOOR'].opacity > 0) {
				
			camera.position.x -= Math.sin(camera.rotation.y) * 0.2;
			camera.position.z -= Math.cos(camera.rotation.y) * 0.2;
			UI.material.opacity -= 0.2;
			Object.entries(museumTex.materials).forEach(item => {item[1].transparent = true;item[1].opacity -= 0.01})
			paintings.forEach((item) => item.material.opacity -= 0.01)
		
		} else {
			window.open(link,"_self")
		}
	}
	
	
	renderer.render(scene, camera);
	
}


function animate() { // The main loop

	loopBegin();
	loopStep();
	loopEnd();

};



init();
animate();