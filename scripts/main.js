
// Declare main variables

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x111111 );
var camera
const renderer = new THREE.WebGLRenderer();
var timer;
var points = [];
var text;
var charId;
var freeList = [];


function init() { // Initializing the scene
	
	windowChangeAsked = false;
	cameraReset(); // Reset camera position
	timer = 0;
	text = '';
	charId = 0;
	
	document.getElementById('topBar').style.opacity = 1;
	document.getElementById('indexFooter').style.opacity = 1;
	
	for (i=0;i<6;i++) {
		let point = new THREE.Vector3( // Generate a point in a random position in the window
			Math.random()*20-10, 
			Math.random()*10-5, 
			Math.random()*10-10
		);
		point.velocity = 0.02;
		point.direction = Math.random()*Math.PI*2;
		point.duration = i%3*(180/3);
		points.push(point);
		point = null;
	}

	renderer.setSize( window.innerWidth, window.innerHeight ); // Make Three.js Canvas take all window
	renderer.setPixelRatio(window.devicePixelRatio);
	
	document.getElementById("page").appendChild( renderer.domElement ); // Add Three.js Canvas to the html <body>
	
}


init();


const ui = document.createElement('canvas');
var loopBreak = false;
ui.id     = "User Interface";
ui.width  = 1920;
ui.height = 1920;
ui.style.position = "absolute";
const ctx = ui.getContext("2d");

var codeTxt = ""

var client = new XMLHttpRequest();
client.open('GET', '/scripts/main.js');
client.onreadystatechange = function() {
  codeTxt = client.responseText;
}
client.send();

const uiTex = new THREE.CanvasTexture(ui);
const geometry = new THREE.PlaneGeometry( 0.4, 0.4 );
const material = new THREE.MeshBasicMaterial({
    map: uiTex,
  })
const UI = new THREE.Mesh( geometry, material );
UI.position.z = camera.position.z-0.1;
UI.material.transparent = true;
UI.material.opacity = 1;
scene.add( UI );

const cube = createCubeArmature(1,1,1,0xffffff);
scene.add(cube);







function loopBegin() { // Executed at the begin of each frames
	
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / 60);
	timer += 1;
	
}

function loopStep() { // Executed each frames

	ctx.clearRect(0, 0, ui.width, ui.height);
	
	
	let lines = text.split('\n');
	if (lines.length < 38) {
		if (charId < codeTxt.length) {
			text += codeTxt[charId];
		}
		charId += 1;
	}
	
	ctx.fillStyle = "white";
	ctx.font = '16px Noto Sans Mono';
	let lineheight = 15;
	
	for (let i = 0; i<Math.min(lines.length,38); i++)
		ctx.fillText(lines[i], ui.width/2-650, i*lineheight+ui.height/2-300);
	ctx.clearRect(800, 0, ui.width, ui.height);
	
	uiTex.needsUpdate = true;
	
	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;
	
	for (let pointA of points) {
		
		if (pointA.duration <= 0) {
			
			pointA.set(Math.random()*20-10, Math.random()*10-5, Math.random()*10-10);
			pointA.direction = Math.random()*Math.PI*2;
			pointA.duration = 180;
			
		}
		
		pointA.x += Math.cos(pointA.direction)*pointA.velocity;
		pointA.y += Math.sin(pointA.direction)*pointA.velocity;
		pointA.duration -= 1;
	
		for (const pointB of points.filter(item => pointA !== item && getDistance(pointA,item) < 5)){
			
			if (freeList.length > 0) {
				
				freeList[0].geometry.setFromPoints([pointA,pointB]);
				freeList[0].material.opacity = 0.5;
				freeList[0].material.transparent = true
				freeList[0].action = lineAction;
				scene.add(freeList[0]);
				freeList.splice(0,1)
				
			} else {
				
				let line = createLine(pointA,pointB,0xffffff);
				line.material.opacity = 0.5;
				line.material.transparent = true
				line.action = lineAction;
				scene.add(line);
				
			}
		
		}
		
	}
	
	for (let item of scene.children) {
		
		if (item.action) {
			item.action(item);
		}
		
	};
	
}

function loopEnd() { // Executed at the end of each frames
	
	let cubeBlur = createCubeArmature(1,1,1,0xffffff);
	cubeBlur.rotation.x = cube.rotation.x;
	cubeBlur.rotation.y = cube.rotation.y;
	cubeBlur.material.transparent = true;
	
	cubeBlur.action = cubeBlurAction;
	
	scene.add(cubeBlur);
	
	
	let operand = typeof t === 'undefined' ? 0 : t;
	document.getElementById('homeText').style.opacity = (Math.sin(timer/50)+1)/2-operand*2;
	if (windowChangeAsked) {
		camera.position.z = easeInSine(t, 3, -2.8, 1);
		t += 0.015;
		t = Math.min(t,1)
		document.getElementById('topBar').style.opacity -= 0.05;
		document.getElementById('indexFooter').style.opacity -= 0.05;
		if (t > 0.8) {
			UI.position.z = camera.position.z-0.1;
			UI.material.opacity += 0.05;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, ui.width, ui.height);
			if (UI.material.opacity >= 1) { 
				window.open("Museum","_self");
				loopBreak = true;
			}
		} else {
			UI.position.z = camera.position.z-0.1;
			UI.scale.x += 0.01;
			UI.scale.y += 0.01;
			UI.material.opacity -= 0.02;
		}
	}
	
	renderer.render(scene, camera);
	
}


function animate() { // The main loop

	if (!loopBreak) {
		loopBegin();
		loopStep();
		loopEnd();
	}

};


onload = (event) => {

	document.body.style.animation = 'appear 1s ease-in-out';
	document.body.style.opacity = 1;

}

animate();
