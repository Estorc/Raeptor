addEventListener('resize', (event) => {});

onresize = (event) => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
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