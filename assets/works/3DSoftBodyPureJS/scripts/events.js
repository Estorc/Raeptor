let input = [0,0,0,0,0,0,0];
let mouse = [0,0];
let locked = 0;



document.addEventListener("pointerlockchange", () => {
  locked = document.pointerLockElement;
});


document.addEventListener("mousemove", (event) => {
	
	mouse[0] = event.movementX*!!locked;
	mouse[1] = event.movementY*!!locked;
	
});



document.addEventListener('keydown', ({ code }) => 
{ 



	switch (code) {
		
		case 'ArrowUp':
		case 'KeyW':
			input[0] = true;
			haveMove = true;
		break;
		
		case 'ArrowDown':
		case 'KeyS':
			input[1] = true;
			haveMove = true;
		break;
		
		case 'ArrowRight':
		case 'KeyD':
			input[2] = true;
			haveMove = true;
		break;
		
		case 'ArrowLeft':
		case 'KeyA':
			input[3] = true;
			haveMove = true;
		break;
		
		case 'Space':
			input[4] = true;
			haveMove = true;
		break;
		
		case 'KeyX':
			input[5] = true;
			haveMove = true;
		break;
		
		case 'Shift':
			input[6] = true;
		break;
		
		case 'KeyV':
			input[7] = true;
			haveMove = true;
		break;
		
	}

});



document.addEventListener('keyup', ({ code }) => 
{ 


	switch (code) {
		
		case 'ArrowUp':
		case 'KeyW':
			input[0] = false;
		break;
		
		case 'ArrowDown':
		case 'KeyS':
			input[1] = false;
		break;
		
		case 'ArrowRight':
		case 'KeyD':
			input[2] = false;
		break;
		
		case 'ArrowLeft':
		case 'KeyA':
			input[3] = false;
		break;
		
		case 'Space':
			input[4] = false;
		break;
		
		case 'KeyX':
			input[5] = false;
		break;
		
		case 'Shift':
			input[6] = false;
		break;
	
		case 'KeyV':
			input[7] = false;
		break;
		
	}


});