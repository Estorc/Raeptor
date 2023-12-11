addEventListener('resize', (event) => {});

onresize = (event) => {
	let pageElem = document.getElementById("page");
	canvas.style.width = `${pageElem.clientWidth}px`;
	canvas.style.height = `${pageElem.innerHeight}px`;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	plane.set(canvas.width/2,canvas.height/2,300,0,0,0);
};

document.addEventListener('keydown', function(event) {
    if((event.keyCode == 32 || event.keyCode == 13) && !windowChangeAsked) {
		windowChangeAsked = true;
		t = 0;
    }
});