returnHome = function (item) {
	
	
		document.body.style.animation = 'disappear 1s ease-in-out';
		document.body.style.opacity = 0;
		
		document.body.addEventListener("animationend", () => {
			window.open(".","_self")
		});
	
	
}

function focusElement() {
	
	if (!focusedElem) focusedElem = document.getElementById('page');

	let element = document.getElementById('page2');
	let position = element.getBoundingClientRect();

	// checking for partial visibility
	if(focusedElem != element && position.top < window.innerHeight && position.bottom >= 0) {
		element.scrollIntoView({ behavior: "smooth" });
	}
	if(position.top < 5 && position.top > -5) {
		focusedElem = element;
	}
	
	element = document.getElementById('page');

	// checking for partial visibility
	if(focusedElem != element && position.top > 20) {
		window.scrollTo({ top:0, behavior: "smooth" })
	}
	if (window.scrollY == 0) {
		focusedElem = element;
	}
	
}

let focusedElem;

addEventListener("load", function(){
	
	focusElement();
	
});

window.addEventListener("scrollend", function(){ 

	focusElement();

});
