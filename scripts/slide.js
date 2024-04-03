const ScrollXEventSlideJS = new Event('slidejs-scrollX');
const ScrollXEndEventSlideJS = new Event('slidejs-scrollXEnd');

let PointerStyle = {borderColor: "grey",transform: "none"};
let PointerActiveStyle = {borderColor: "white",transform: "scale(1.5)"};


let horizontalSlides;
let slides = [];
let slideId = -1;
let lastSlideId = 1;
let isScrolling;
let SlideJSpauseSlide;
let slideTarget = {x:0,y:0};

function clamp(a,b,c) {
	
	return Math.max(a,Math.min(b,c))
	
}

function createSlideBody() {
	
	const slideBody = document.getElementById("slidejs-body");
	
	slideBody.style.position = 'relative';
	slideBody.style.top = '2000px';
	slideBody.style.paddingBottom = '2000px';
	const slidePointerRect = document.createElement("div");
	slidePointerRect.style.zIndex = 0.5;
	slidePointerRect.style.width = "50px";
	slidePointerRect.style.display = "flex";
	slidePointerRect.style['flex-direction'] = "column";
	slidePointerRect.style.gap = "10px";
	slidePointerRect.style['justify-content'] = "center";
	slidePointerRect.style.position = "fixed";
	slidePointerRect.style.right = 0;
	slidePointerRect.style.top = 0;
	slidePointerRect.style.bottom = 0;
	let slideBodyDIVS = [... slideBody.children].filter(a => a.nodeName === 'DIV');
	for (let i = 0; i < slideBodyDIVS.length; i++) {
		
		const slidePointerPoint = document.createElement("a");
		slidePointerPoint.href = `javascript:changeSlide("smooth", ${i})`
		slidePointerPoint.id = `slidejs-body-pointer-${i}`
		slidePointerPoint.style.position = "relative";
		slidePointerPoint.style.margin = "0 auto";
		slidePointerPoint.style.height = 0;
		slidePointerPoint.style.width = 0;
		slidePointerPoint.style['border-radius'] = "20px";
		slidePointerPoint.style.border = "5px solid grey";
		slidePointerPoint.style.transition = "0.5s ease-in-out";
		slidePointerRect.appendChild(slidePointerPoint);
		slides.push(slideBodyDIVS[i]);
		
	};
	
	slideBody.appendChild(slidePointerRect);
	slides = slides.filter(a => a.nodeName === 'DIV');
	
}

function createHorizontalSlides() {
	
	horizontalSlides = Array.prototype.slice.call(document.getElementsByClassName("slidejs-horizontal"));

	for (let i = 0; i < horizontalSlides.length; i++) {

		let item = horizontalSlides[i];
		
		let parent = item.parentNode;
		let wrapper = document.createElement('div');

		parent.replaceChild(wrapper, item);
		wrapper.appendChild(item);
		
		const slidePointerRect = document.createElement("div");
		slidePointerRect.style.zIndex = 0.5;
		slidePointerRect.style.height = "50px";
		slidePointerRect.style.display = "flex";
		slidePointerRect.style.gap = "10px";
		slidePointerRect.style['justify-content'] = "center";
		slidePointerRect.style.position = "absolute";
		slidePointerRect.style.bottom = 0;
		slidePointerRect.style.left = 0;
		slidePointerRect.style.right = 0;
		
		item.style.position = 'relative';
		item.style.display = "flex";
		item.style.width = `${item.children.length}00%`;
		item.style.height = "100dvh";
		item.style.transform = "translateX(0px)";
		item.style.overflow = "hidden";
		item.setAttribute("slideLength",item.children.length);
		item.setAttribute("slideId", 0);
		for (let j = 0; j < item.children.length; j++) {
			let a = item.children[j];
			const slidePointerPoint = document.createElement("a");
			slidePointerPoint.href = `javascript:changeHSlide(${i}, ${j})`
			slidePointerPoint.id = `slidejs-hslide${i}-pointer-${j}`
			slidePointerPoint.style.position = "relative";
			slidePointerPoint.style.margin = "auto 0";
			slidePointerPoint.style.height = 0;
			slidePointerPoint.style.width = 0;
			slidePointerPoint.style['border-radius'] = "20px";
			slidePointerPoint.style.border = "5px solid grey";
			slidePointerPoint.style.transition = "0.5s ease-in-out";
			if (j === 0) Object.assign(slidePointerPoint.style, PointerActiveStyle);
			slidePointerRect.appendChild(slidePointerPoint);
			if (a.nodeName === 'DIV') {
				a.style.height = "100%";
				a.style.width = "100%";
			}
		};
		wrapper.appendChild(slidePointerRect);
	};
	
}

addEventListener("load", function(){
	
	createSlideBody();
	createHorizontalSlides();
	changeSlide();
	updateSlideJS();
	setTimeout(() => {
		changeSlide("instant")
		isScrolling = false;
	}, 10);
	
});

function slideScrollTo(options) {
	slideTarget.y = options.top || slideTarget.y;
	slideTarget.x = options.left || slideTarget.x;
	if (options.behavior === 'instant') {
		scrollTo({ top: options.top, left: options.left, behavior: 'instant' });
	}
}

function changeSlide(mode, forceId) {
	
	if (forceId === slideId) return 0;
	slideId = forceId+1 || slideId+1; // Go refaire avec un slide instant smooth custom
	let behavior = mode || 'smooth';
	slideId--;
	slideId = clamp(0,slideId,slides.length-1);
	if (lastSlideId === slideId) return 0;
	if (mode !== 'smooth') {
		if (getComputedStyle(slides[slideId]).position.toLowerCase() === 'sticky') {
			if (!slideId) {
				slideScrollTo({ top: 2000, left:0, behavior: behavior });
			} else {
				slideScrollTo({ top: slideTarget.y+slides[slideId-1].getBoundingClientRect().bottom, left:0, behavior: behavior });
			}
		} else {
			slideScrollTo({
				top: (lastSlideId < slideId || slides[slideId].getBoundingClientRect().top > 0) ? slideTarget.y+slides[slideId].getBoundingClientRect().top : slideTarget.y+slides[slideId].getBoundingClientRect().bottom-window.innerHeight, 
				left:0, behavior: behavior });
		}
	}
	const lastPointer = document.getElementById(`slidejs-body-pointer-${lastSlideId}`);
	const pointer = document.getElementById(`slidejs-body-pointer-${slideId}`);
	
	Object.assign(lastPointer.style, PointerStyle);
	Object.assign(pointer.style, PointerActiveStyle);
	
	lastSlideId = slideId;
	
}

function changeHSlide(i, forceId) {
	
	let item = horizontalSlides[i];
	let lastId = item.getAttribute('slideId');
	if (forceId == item.getAttribute('slideId')) return 0;
	if (forceId+1) item.setAttribute('slideId', forceId);
	if (!isScrolling && !forceId+1) {
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
	
	const lastPointer = document.getElementById(`slidejs-hslide${i}-pointer-${lastId}`);
	const pointer = document.getElementById(`slidejs-hslide${i}-pointer-${item.getAttribute('slideId')}`);
	
	Object.assign(lastPointer.style, PointerStyle);
	Object.assign(pointer.style, PointerActiveStyle);
	
	item.state = 0;
	item.active = false;
	item.style.transition = "transform 0.5s ease-in-out";
	item.style.transform = `translateX(${-(item.getAttribute('slideId')/item.getAttribute('slideLength'))*100}%)`;
	
	item.dispatchEvent(ScrollXEndEventSlideJS);
	
}

function scrollUp(delta) {
	let rect = slides[slideId].getBoundingClientRect();
	if (rect.top - delta > 0) {
		slideId--;
		changeSlide();
	} else {
		slideScrollTo({ top: slideTarget.y+(delta || -20), left:0});
	}
	
}

function scrollDown(delta) {
	
	let rect = slides[slideId].getBoundingClientRect();
	if (rect.height + rect.top - delta < window.innerHeight) {
		slideId++;
		changeSlide();
	} else {
		slideScrollTo({ top: slideTarget.y+(delta || 20), left:0});
	}
	
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
			item.lastX = rect.x;
		} else {
			selectedHSlide[id] = null;
		}
	}
	lastScrollPos = {x:window.scrollX,y:window.scrollY};
	
}

function touchMove(id, x, y) {
	
	if (SlideJSpauseSlide) return 0;
	if (touchState == -1) {
		if (Math.abs((touchesFirstPos[id].x - x)) > Math.abs((touchesFirstPos[id].y - y)))
			touchState = 1;
		else
			touchState = 0;
	} else {
		document.body.style["user-select"] = "none";
		
		if (touchState && selectedHSlide[id]) {
			dispatchEvent(ScrollXEventSlideJS);
			selectedHSlide[id].style.transition = "none";
			selectedHSlide[id].active = true;
			touchResult = 0;
			selectedHSlide[id].state = 0;
			if (selectedHSlide[id]) selectedHSlide[id].style.transform = `translateX(${parseInt(selectedHSlide[id].lastX)+(x - touchesFirstPos[id].x)}px)`;
			slideScrollTo({ left: 0, behavior: "instant" });
			if ((x - touchesFirstPos[id].x < -window.innerWidth/2) || (x - touchesLastPos[id].x < -window.innerWidth/100))
				selectedHSlide[id].state = 1;
			else if ((x - touchesFirstPos[id].x > window.innerWidth/2) || (x - touchesLastPos[id].x > window.innerWidth/100))
				selectedHSlide[id].state = -1;
		} else {
			slideScrollTo({ top: lastScrollPos.y + (touchesFirstPos[id].y - y), behavior: "instant" });
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
		if (item && item.active)
			changeHSlide(horizontalSlides.indexOf(item));
	});
	if (touchResult === 0) {
		let rect = slides[slideId].getBoundingClientRect();
		if (rect.top + 20 > 0 || rect.height + rect.top - 20 < window.innerHeight) {
			changeSlide();
		}
	}
	if (touchResult === 1)
		slideId++;
		changeSlide();
	if (touchResult === -1)
		slideId--;
		changeSlide();
	if (touchState == 1) isScrolling = false;
	touchState = -2;
	
}




function updateSlideJS() {
	let bodyRect = document.body.getBoundingClientRect();
	let rect = slides[slideId].getBoundingClientRect();
	let topClamp = (rect.top - bodyRect.top);
	if (getComputedStyle(slides[slideId]).position.toLowerCase() === 'sticky')
		if (!slideId)
			topClamp = 2000;
		else
			topClamp = slideTarget.y+slides[slideId-1].getBoundingClientRect().bottom;
	slideTarget.y = clamp(topClamp, slideTarget.y, ((rect.bottom-window.innerHeight) - bodyRect.top));
	scrollTo({top: window.scrollY + (slideTarget.y-window.scrollY)/12, left: window.scrollX + (slideTarget.x-window.scrollX)/12, behavior:'instant'})
	window.requestAnimationFrame(updateSlideJS);
};






addEventListener("scrollend", function(){
	
	isScrolling = false;
	
});

window.addEventListener("wheel", (event) => { 
	if (event.deltaY < 0) {
		scrollUp(event.deltaY);
	} else {
		scrollDown(event.deltaY);
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
		scrollUp(-50);
	if (event.key === 'ArrowDown')
		scrollDown(50);
	
	if (slides[slideId].getElementsByClassName("slidejs-horizontal").length === 1) {
		let item = slides[slideId].getElementsByClassName("slidejs-horizontal")[0];
		if (event.key === 'ArrowRight') {
			item.state = 1;
			changeHSlide(horizontalSlides.indexOf(item));
		}
		if (event.key === 'ArrowLeft') {
			item.state = -1;
			changeHSlide(horizontalSlides.indexOf(item));
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
