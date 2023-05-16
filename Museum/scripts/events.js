addEventListener('resize', (event) => {});

onresize = (event) => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setPixelRatio(window.devicePixelRatio);
	
	ui.width  = window.innerWidth;
	ui.height = window.innerHeight;
	UI.scale.set(window.innerWidth/750, window.innerHeight/750, 1)
};



document.addEventListener('keydown', ({ code }) => 
{ 



	switch (code) {
		
		case 'ArrowUp':
		case 'KeyW':
			arrows[0] = true;
			haveMove = true;
		break;
		
		case 'ArrowDown':
		case 'KeyS':
			arrows[1] = true;
			haveMove = true;
		break;
		
		case 'ArrowRight':
		case 'KeyD':
			arrows[2] = true;
			haveMove = true;
		break;
		
		case 'ArrowLeft':
		case 'KeyA':
			arrows[3] = true;
			haveMove = true;
		break;
		
		case 'Space':
			warp = link !== null;
			haveMove = true;
		break;
		
		case 'KeyR':
			placer.rotation.y += Math.PI/2
		break;
		
	}

});



document.addEventListener('keyup', ({ code }) => 
{ 


	switch (code) {
		
		case 'ArrowUp':
		case 'KeyW':
			arrows[0] = false;
		break;
		
		case 'ArrowDown':
		case 'KeyS':
			arrows[1] = false;
		break;
		
		case 'ArrowRight':
		case 'KeyD':
			arrows[2] = false;
		break;
		
		case 'ArrowLeft':
		case 'KeyA':
			arrows[3] = false;
		break;
		
	}


});