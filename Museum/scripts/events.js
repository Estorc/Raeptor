addEventListener('resize', (event) => {});

onresize = (event) => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	
	ui.width  = window.innerWidth;
	ui.height = window.innerHeight;
	UI.scale.set(window.innerWidth/750, window.innerHeight/750, 1)
};



document.addEventListener('keydown', ({ code }) => 
{ 



	switch (code) {
		
		case 'ArrowUp':
			arrows[0] = true;
		break;
		
		case 'ArrowDown':
			arrows[1] = true;
		break;
		
		case 'ArrowRight':
			arrows[2] = true;
		break;
		
		case 'ArrowLeft':
			arrows[3] = true;
		break;
		
		case 'Space':
			warp = link !== null;
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
			arrows[0] = false;
		break;
		
		case 'ArrowDown':
			arrows[1] = false;
		break;
		
		case 'ArrowRight':
			arrows[2] = false;
		break;
		
		case 'ArrowLeft':
			arrows[3] = false;
		break;
		
	}


});