document.addEventListener('keydown', (e) => {

	let cube = document.getElementsByClassName("f3d-cube")[0];
	let sign;
	let audio = new Audio(`audio/${Math.random() < 0.5 ? "3dcubeBack" : "3dcubeMove"}.wav`);
	audio.volume = 0.1;
	switch (e.key) {
		case 'ArrowUp':
			audio.play();
			cube.style.setProperty('--rotateX', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))-90}deg`);
		break;

		case 'ArrowDown':
			audio.play();
			cube.style.setProperty('--rotateX', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))+90}deg`);
		break;

		case 'ArrowRight':
			audio.play();
			sign = (((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/180)<<0)%2) ? -1 : 1;
			if (((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/90)%2)) {
				cube.style.setProperty('--rotateZ', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateZ'))-90*sign}deg`);
			} else {
				cube.style.setProperty('--rotateY', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateY'))-90*sign}deg`);
			}
		break;

		case 'ArrowLeft':
			audio.play();
			sign = ((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/180)<<0)%2 ? -1 : 1;
			if (((parseInt(getComputedStyle(cube).getPropertyValue('--rotateX'))/90)%2)) {
				cube.style.setProperty('--rotateZ', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateZ'))+90*sign}deg`);
			} else {
				cube.style.setProperty('--rotateY', `${parseInt(getComputedStyle(cube).getPropertyValue('--rotateY'))+90*sign}deg`);
			}
		break;
	}
	let frontFace = document.getElementsByClassName("f3d-cube")[0];

});


function f3dUpdate() {
	[...document.getElementsByClassName("f3d-cube-face")].forEach(item => {
		let rect = item.getBoundingClientRect();
		let surface = rect.width * rect.height;
		let opacity = (surface>>9)/694;
		item.style.setProperty('opacity', opacity);
	})
	requestAnimationFrame(f3dUpdate);
}


requestAnimationFrame(f3dUpdate);