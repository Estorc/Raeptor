const searchParams = new URLSearchParams(window.location.search);


onload = (event) => {
	
	if  (searchParams.get("origin") === "museum") {
			
		document.body.style.animation = 'appear 1s ease-in-out';
		document.body.style.opacity = 1;
			
	}

}


exitPage = function (item) {
	
	
	if  (searchParams.get("origin") === "museum") {
		
		document.body.style.animation = 'disappear 1s ease-in-out';
		document.body.style.opacity = 0;
		
		document.body.addEventListener("animationend", () => {
			window.open("../Museum","_self")
		});
		
	} else {
		
		window.open("../works","_self")
		
	}
	
	
}