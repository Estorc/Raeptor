const horizontalSlides = document.getElementsByClassName("slidejs-horizontal");
let slides = [];
let slideId = 0;
let isScrolling;

function clamp(a,b,c) {
	
	return Math.max(a,Math.min(b,c))
	
}

addEventListener("load", function(){
	
	const slideBody = document.getElementById("slidejs-body");
	
	slideBody.style.position = 'relative';
	slideBody.style.top = '2000px';
	slideBody.style.paddingBottom = '2000px';
	slideBody.childNodes.forEach(item => {
		
		slides.push(item);
		
	})
	
	slides = slides.filter(a => a.nodeName === 'DIV');
	for (let i = 0; i < horizontalSlides.length; i++) {
		let item = horizontalSlides[i];
		item.style.position = 'relative';
		item.style.display = "flex";
		item.style.width = `${item.children.length}00%`;
		item.setAttribute("slideLength",item.children.length);
		item.setAttribute("slideId", 0);
		item.childNodes.forEach(a => {
			if (a.nodeName === 'DIV') {
				a.style.height = "100%";
				a.style.width = "100%";
			}
		})
	};
	changeSlide()
	setTimeout(() => {
		changeSlide("instant")
		isScrolling = false;
	}, 10);
	
});

function changeSlide(mode) {
	
	let behavior = mode || 'smooth';
	let lastSlideId = slideId;
	slideId = clamp(0,slideId,slides.length-1);
	if (lastSlideId === slideId) isScrolling = true;
	if (getComputedStyle(slides[slideId]).position.toLowerCase() === 'sticky') {
		if (!slideId) {
			scrollTo({ top: 2000, left:0, behavior: behavior });
		} else {
			scrollTo({ top: window.scrollY+slides[slideId-1].getBoundingClientRect().bottom, left:0, behavior: behavior });
		}
	} else {
		scrollTo({ top: window.scrollY+slides[slideId].getBoundingClientRect().top, left:0, behavior: behavior });
	}
	
}

function changeHSlide(item) {
	
	if (!isScrolling) {
		if (item.state == 1)
			item.setAttribute('slideId', eval(item.getAttribute('slideId'))+1);
			isScrolling = true;
		if (item.state == -1)
			item.setAttribute('slideId', eval(item.getAttribute('slideId'))-1);
			isScrolling = true;
		if (item.getAttribute('slideId') < 0) {
			item.setAttribute('slideId', 0);
			isScrolling = false;
		}
		if (item.getAttribute('slideLength') <= item.getAttribute('slideId')) {
			item.setAttribute('slideId', item.getAttribute('slideLength')-1);
			isScrolling = false;
		}
		if (isScrolling)
			setTimeout(() => {isScrolling = false}, 500);
	}
	item.state = 0;
	item.active = false;
	item.style.transform = `translateX(${-(item.getAttribute('slideId')/item.getAttribute('slideLength'))*100}%)`;
	item.style.transition = "transform 0.5s ease-in-out";
	
}

function scrollUp() {
	
	if (isScrolling) return 0;
	slideId--;
	changeSlide();
	
}

function scrollDown() {
	
	if (isScrolling) return 0;
	slideId++;
	changeSlide();
	
}

function touchStart(id, x, y) {
	
	touchesFirstPos[id] = {x:x,y:y};
	touchesLastPos[id] = {x:x,y:y};
	touchResult = -2;
	for (let item of horizontalSlides) {
		let rect = item.getBoundingClientRect();
		if (rect.top < y && rect.bottom > y && rect.left < x && rect.right > x) {
			selectedHSlide[id] = item;
			item.state = 0;
			item.style.transition = "none";
			item.style.transform = `translateX(${rect.x}px)`;
			item.lastX = rect.x;
		} else {
			selectedHSlide[id] = null;
		}
	}
	lastScrollPos = {x:window.scrollX,y:window.scrollY};
	
}

function touchMove(id, x, y) {
	
	if (touchState == -1) {
		if (Math.abs((touchesFirstPos[id].x - x)) > Math.abs((touchesFirstPos[id].y - y)))
			touchState = 1;
		else
			touchState = 0;
	} else {
		document.body.style["user-select"] = "none";
		
		if (touchState && selectedHSlide[id]) {
			selectedHSlide[id].active = true;
			touchResult = 0;
			selectedHSlide[id].state = 0;
			if (selectedHSlide[id]) selectedHSlide[id].style.transform = `translateX(${parseInt(selectedHSlide[id].lastX)+(x - touchesFirstPos[id].x)}px)`;
			scrollTo({ left: 0, behavior: "instant" });
			if ((x - touchesFirstPos[id].x < -window.innerWidth/2) || (x - touchesLastPos[id].x < -window.innerWidth/100))
				selectedHSlide[id].state = 1;
			else if ((x - touchesFirstPos[id].x > window.innerWidth/2) || (x - touchesLastPos[id].x > window.innerWidth/100))
				selectedHSlide[id].state = -1;
		} else {
			scrollTo({ top: lastScrollPos.y + (touchesFirstPos[id].y - y), behavior: "instant" });
			touchResult = 0;
			if ((y - touchesFirstPos[id].y < -window.innerHeight/2) || (y - touchesLastPos[id].y < -window.innerHeight/100))
				touchResult = 1;
			else if ((y - touchesFirstPos[id].y > window.innerHeight/2) || (y - touchesLastPos[id].y > window.innerHeight/100))
				touchResult = -1;
		}
		touchesLastPos[id] = {x:x,y:y};
	}
	
}

function touchEnd() {
	
	document.body.style["user-select"] = "auto";
	selectedHSlide.forEach(item => {
		if (item && item.active) {
			changeHSlide(item);
		}
	});
	if (touchResult === 0)
		changeSlide();
	if (touchResult === 1)
		scrollDown();
	if (touchResult === -1)
		scrollUp();
	if (touchState == 1) isScrolling = false;
	touchState = -2;
	
}

addEventListener("scrollend", function(){
	
	isScrolling = false;
	
});

window.addEventListener("wheel", (event) => { 
	if (event.deltaY < 0) {
		scrollUp();
	} else {
		scrollDown();
	}
});

let touchesFirstPos = [];
let touchesLastPos = [];
let lastScrollPos = {x:0,y:0};
let touchResult;
let selectedHSlide = [];
let touchState = -2;

window.addEventListener("keydown", (event) => {
	if (event.key === 'ArrowUp')
		scrollUp();
	if (event.key === 'ArrowDown')
		scrollDown();
	
	if (slides[slideId].getElementsByClassName("slidejs-horizontal").length === 1) {
		let item = slides[slideId].getElementsByClassName("slidejs-horizontal")[0];
		if (event.key === 'ArrowRight') {
			item.state = 1;
			changeHSlide(item);
		}
		if (event.key === 'ArrowLeft') {
			item.state = -1;
			changeHSlide(item);
		}
	}
});

window.addEventListener("touchstart", (event) => {
	touchResult = 0;
	touchState = -1;
	for (let i = 0; i < event.touches.length; i++) {
		touchStart(i+1,event.touches[i].clientX,event.touches[i].clientY);
	};
});

window.addEventListener("touchmove", (event) => { 
	for (let i = 0; i < event.touches.length; i++) {
		touchMove(i+1,event.touches[i].clientX,event.touches[i].clientY);
	};
});

window.addEventListener("touchend", (event) => { 
	touchEnd();
});

window.addEventListener("mousedown", (event) => {
	touchResult = 0;
	touchState = -1;
	touchStart(0,event.clientX,event.clientY);
});

window.addEventListener("mousemove", (event) => { 
	if (touchState != -2) touchMove(0,event.clientX,event.clientY);
});

window.addEventListener("mouseup", (event) => { 
	touchEnd();
});

window.addEventListener("resize", (event) => { 
	changeSlide("instant");
	isScrolling = false;
});
