
// Declare main variables

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let clock = new THREE.Clock();
var arrows = [false,false,false,false];
const SPEED = 2;
const ANGLE_SPEED = 20;
var walk = 0;
var placer;
var lastX;
var step = 0;
camera.position.z = 1;
var light = [];
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
var startCube;
var museum;
var delta;
var museumTex;



function init() { // Initializing the scene
	
	renderer.setSize(window.innerWidth,window.innerHeight ); // Make Three.js Canvas take all window
	document.body.appendChild( renderer.domElement ); // Add Three.js Canvas to the html <body>
	
	placer = createCubeArmature(1,50,1,0xffffff)
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
	camera.position.y = 5;
	
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
					startCube.position.y = 4;
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

	

	
}



function loopBegin() { // Executed at the begin of each frames
	
	if (museum && museumTex.materials['FLOOR'].opacity < 1) {
		
		arrows = [false,false,false,false];
		
	}
	
	if (startCube && startCube.material.opacity < 1 && museumTex.materials['FLOOR'].opacity < 1) {
		startCube.material.opacity += 0.05;
	} else if (museum && museumTex.materials['FLOOR'].opacity < 1) {
			
		camera.position.z += 0.2;
		Object.entries(museumTex.materials).forEach(item => {item[1].opacity += 0.01})
	
	} else if (museum && museumTex.materials['FLOOR'].opacity >= 1) {
		startCube.material.opacity -= 0.1;
	}
	if (delta>1) {
		
		setTimeout(() => {
		  requestAnimationFrame(animate);
		}, (delta-1));
		
	} else {
		
		requestAnimationFrame(animate);
		
	}
	
}

function loopStep() { // Executed each frames

	for (item of light) {
		
		if (!item.step) {
			item.step = Math.random()*200-100
		}
		
		item.step += 1;
		item.distance += Math.sin(item.step/30)*3;
		
	}

	lastX = camera.position.x;


	if (arrows[0] && !arrows[1]) {
		camera.position.x -= Math.sin(camera.rotation.y) * SPEED;
		camera.position.z -= Math.cos(camera.rotation.y) * SPEED;
		walk += 0.4;
		camera.position.y += Math.sin(walk)/4;
	}
	if (arrows[1] && !arrows[0]) {
		camera.position.x += Math.sin(camera.rotation.y) * SPEED;
		camera.position.z += Math.cos(camera.rotation.y) * SPEED;
		walk -= 0.4;
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

	
	
	
	
	//Place Placer
	
	placer.position.set(camera.position.x,placer.position.y,camera.position.z);
	
	placer.position.x -= Math.sin(camera.rotation.y) * 50;
	placer.position.z -= Math.cos(camera.rotation.y) * 50;

	console.log(placer.position.x, placer.position.z)
	
	
	for (let i=0;i<scene.children.length;i++) {
		
		if (scene.children[i].action) {
			scene.children[i] = scene.children[i].action(scene.children[i]);
		}
		
	};
	
	scene.children = scene.children.filter(item => item != null);
	
}

function loopEnd() { // Executed at the end of each frames
	
	renderer.render(scene, camera);
	
}


function animate() { // The main loop

	delta = 1/(clock.getDelta()*60);

	loopBegin();
	loopStep();
	loopEnd();

};



init();
animate();