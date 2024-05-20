document.addEventListener('keydown', (e) => {

	let frontCube = document.getElementsByClassName("d3d-cube-front")[0];

	switch (e.key) {
		case 'ArrowUp':
			frontCube.classList.remove('d3d-cube-front');
			frontCube.classList.add('d3d-cube-top');
		break;

		case 'ArrowDown':

		break;

		case 'ArrowRight':

		break;

		case 'ArrowLeft':

		break;

		default:
		break;
	}

});