function parallax() {
	var s = document.getElementById("floater");
  var yPos = 0 - window.pageYOffset/15;	
  $('body').css('background-position-y', -0 - yPos + "%")
  
  //alert(yPos);
}



function phoneMenu() {
	let phoneMenuList = document.getElementById('phoneMenuList');
	if ($(phoneMenuList).css('visibility') == 'visible') {
		
		$(phoneMenuList).css('visibility', 'hidden')
		$(phoneMenuList).css('opacity', '0');
		$(phoneMenuList).css('transform', 'scale(1,0) translate(0, -100%)');
	
	} else {
		
		$(phoneMenuList).css('visibility', 'visible')
		$(phoneMenuList).css('opacity', '1');
		$(phoneMenuList).css('transform', 'scale(1,1) translate(0, 0)');
		
	}
}


window.addEventListener('click', function(e){   
  if (document.getElementById('phoneMenu').contains(e.target)){

  } else {
    $(phoneMenuList).css('visibility', 'hidden')
	$(phoneMenuList).css('opacity', '0');
	$(phoneMenuList).css('transform', 'scale(1,0) translate(0, -100%)');
  }
});




// Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
function scrollFunc() {
  // Set a variable for our button element.
  const scrollToTopButton = document.getElementById('js-top');
  // Get the current scroll value
  let y = window.scrollY;
  
  // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
  if (y > 0) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

window.addEventListener("scroll", function(){ 
  scrollFunc();
	parallax();	
});

function scrollToTop() {
  // Let's set a variable for the number of pixels we are from the top of the document.
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  
  // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
  // We'll also animate that scroll with requestAnimationFrame:
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    // ScrollTo takes an x and a y coordinate.
    // Increase the '10' value to get a smoother/slower scroll!
    window.scrollTo(0, c - c / 10);
  }
};
