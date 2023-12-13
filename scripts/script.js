returnHome = function (item) {
	
	
		document.body.style.animation = 'disappear 1s ease-in-out';
		document.body.style.opacity = 0;
		
		document.body.addEventListener("animationend", () => {
			window.open(".","_self")
		});
	
	
}