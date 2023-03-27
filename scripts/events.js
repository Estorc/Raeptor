addEventListener('resize', (event) => {});

onresize = (event) => {
	renderer.setSize( window.innerWidth, window.innerHeight ); // Reset Camera on window resize
	cameraReset();
};

document.addEventListener('keydown', function(event) {
    if((event.keyCode == 32 || event.keyCode == 13) && !windowChangeAsked) {
		windowChangeAsked = true;
		t = 0;
    }
});