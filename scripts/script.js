returnHome = function (item) {
	
	
		document.body.style.animation = 'disappear 1s ease-in-out';
		document.body.style.opacity = 0;
		
		document.body.addEventListener("animationend", () => {
			window.open(".","_self")
		});
	
	
}

const imageBackgroundElems = document.getElementsByClassName("image-background");
const fixedBackgroundElems = document.getElementsByClassName("fixed-background");

addEventListener("load", function() {
	
	for (let i = 0; i < imageBackgroundElems.length; i++) {
		let item = imageBackgroundElems[i];
		item.style.backgroundImage = `url(${item.getAttribute('bg-image')})`
	};
	
});

addEventListener("scroll", function() {
	
	for (let item of fixedBackgroundElems) {
		let rect = item.getBoundingClientRect();
		item.style['background-position-y'] = `calc(50% - ${rect.y/1.5}px)`;
		item.style['background-position-x'] = `calc(50% - ${rect.x/1.5}px`;
	};
	
});


function updateIfSlideJS() {
	for (let item of fixedBackgroundElems) {
		let rect = item.getBoundingClientRect();
		item.style['background-position-y'] = `calc(50% - $(rect.y/1.5}px)`;
		item.style['background-position-x'] = `calc(50% - ${rect.x/1.5}px)`;
	};
	window.requestAnimationFrame(updateIfSlideJS);
};


if (ScrollXEventSlideJS) updateIfSlideJS();