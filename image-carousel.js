$(document).ready(theMain);


var currentSlide = 0;
var	$carouselContainer;
var	$carouselWindow;
var $slider;

/////////functions:

function createSlider(){
	$carouselContainer = $('#carouselContainer');
	$carouselWindow = $('#carouselWindow');
	$carouselWindow.append('<div class="slider slide01"></div>');

	var carouselHeight = $carouselWindow.css('height');
	$slider = $carouselWindow.find('.slider');

	// put up images
	$slider.append('<img src="img/Alhambra.jpg" alt="slider image" height="200" width="500">');
	$slider.append('<img src="img/Chihuahua_copper_canyon.jpg" alt="slider image" height="200" width="500">');	
	$slider.append('<img src="img/Nankoweap.jpg" alt="slider image" height="200" width="500">');
	$slider.append('<img src="img/norway_atlantic_ocean_road.jpg" alt="slider image" height="200" width="500">');
	$slider.append('<img src="img/Stonehenge.jpg" alt="slider image" height="200" width="500">');
	$slider.append('<img src="img/Volcano_pichincha_rucu_quito_ecuador.jpg" alt="slider image" height="200" width="500">');
	// set height and width of the image slider div
	$slider.css({
		'height':carouselHeight,
		'width':6*500
	});
	// append buttons and navigation
	$carouselContainer.append('<button type="button" class="backwardButton">prev</button><button type="button" class="forwardButton">next</button><div class="navDots"></div>');

	// append circles
	$navDots = $('.navDots');
	for (i=0; i<6; i++){ 
		$navDots.append('<div class="circle"></div>');
	};
	$circles = $navDots.find('.circle');
};	

function slideForward(){
	currentSlide++;
	if (currentSlide > 5){
		currentSlide = 0;
	}
	updateClasses();
}
function slideBackward(){
	currentSlide--;
	if (currentSlide < 0){
		currentSlide = 5;
	}
	updateClasses();
}
function updateClasses(){
	updateSlideClass();
	updateCircleClass();	
}
function updateSlideClass(){
	var oldClass = $slider.attr('class').split(' ')[1];
	var newClass = 'slide0' + currentSlide;

	// jQueryUI 
	$slider.switchClass(oldClass, newClass, 300, 'swing');
}

function updateCircleClass(){
	$circles.removeClass('currentCircle');
	$($circles[currentSlide]).addClass('currentCircle');
}

// Main function
function theMain(){

	// initialize the slider in the carousel
	createSlider();
	updateClasses();

	// change slide every interval
	var autoChangeSlide = setInterval(slideForward, 4000); 

	// change slide when a forward or backward button is clicked
	$carouselContainer.on('click', 'button', function(){		
		// check if an animation is already running
		if($carouselContainer.find(':animated').length > 0){
			return;
		}		
		// stop auto changing slides
		clearInterval(autoChangeSlide); 
		// check if forward or backward button is pressed
		forwardOrBackward = $(this).attr('class');
		if (forwardOrBackward === 'backwardButton'){
			slideBackward();
		}else{
			slideForward();
		}
		autoChangeSlide = setInterval(slideForward, 4000); 
	});

	// change slide when a navigation circle is clicked
	$navDots.on('click', '.circle', function(){
		// check if an animation is already running
		if($carouselContainer.find(':animated').length > 0){
			return;
		}		
		// stop auto changing slides
		clearInterval(autoChangeSlide); 
		// set current slide to the circle that was clicked
		currentSlide = $circles.index($(this));
		updateClasses();
		autoChangeSlide = setInterval(slideForward, 2000); 
	});
};
