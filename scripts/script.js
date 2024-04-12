createPopUp = function(text) {

	let popup = document.createElement('div');
	popup.classList.add("popup");
	popup.innerHTML = `<p>${text}</p>`
	popup.addEventListener("animationend", (e) => {
		e.currentTarget.remove();
	}, false);
	document.body.appendChild(popup);

}

copyToClipboard = function(text) {

	createPopUp("Le texte a été copié dans le presse-papier !");
	navigator.clipboard.writeText(text);

}

copyURLToClipboard = function(url) {

	console.log(this);
	createPopUp("Le lien a été copié dans le presse-papier !");

	if (url === 'play-button') {

		navigator.clipboard.writeText(this.parentNode.children[0].href);

	} else {

		navigator.clipboard.writeText(url);

	}

}


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

/*addEventListener("scroll", function() {
	
	for (let item of fixedBackgroundElems) {
		let rect = item.getBoundingClientRect();
		item.style['background-position-y'] = `calc(50% - ${rect.y/1.5}px)`;
		item.style['background-position-x'] = `calc(50% - ${rect.x/1.5}px`;
	};
	
});*/


function updateIfSlideJS() {
	let bodyRect = document.body.getBoundingClientRect();
	for (let item of fixedBackgroundElems) {
		let rect = item.getBoundingClientRect();
		item.style['background-position-y'] = `calc(50% - ${((rect.y-bodyRect.y)-scrollY)/1.5}px)`;
		item.style['background-position-x'] = `calc(50% - ${rect.x/1.5}px)`;
	};
	window.requestAnimationFrame(updateIfSlideJS);
};


if (typeof ScrollXEventSlideJS !== 'undefined') updateIfSlideJS();