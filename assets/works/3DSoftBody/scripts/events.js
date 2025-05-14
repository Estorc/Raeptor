addEventListener('resize', (event) => {});

onresize = (event) => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setPixelRatio(window.devicePixelRatio);
};