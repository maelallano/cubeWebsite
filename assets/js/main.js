var cube = document.querySelector('.cube')
var wrapper = document.querySelector('.wrapper')
var face = document.querySelectorAll('.face')
var goUp = document.querySelectorAll('.goUp')
var goBottom = document.querySelectorAll('.goBottom')
var goRight = document.querySelectorAll('.goRight')
var goLeft = document.querySelectorAll('.goLeft')
var more = document.querySelector('.more')

var x = 0
var y = 0
const speed = 90
var check = 0
var currentFace = 'front'
const vw = window.innerWidth
const vh = window.innerHeight
const transZTopBot = 0.5 * vw - 0.5 * vh
var transCubeZTopBot = -0.5 * vw + 0.5 * vh

face[2].style.transform = 'rotateX(90deg) translateZ(' + (0.5*vw) + 'px)';
face[3].style.transform = 'rotateX(-90deg) translateZ(' + (1*vh - 0.5*vw) + 'px)';

more.addEventListener('click', function() {
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(' + (transCubeZTopBot + vw - vh) + 'px) translateY(-50vh)';
});

const transitionOpacity = () => {
	for (var i = 0; i < face.length; i++) {
		face[i].classList.add('faceOpacity');
	}

	setTimeout(function() {
		for (var i = 0; i < face.length; i++) {
			face[i].classList.remove('faceOpacity');
		}
	}, 1400);

}

const toFrontFace = () => {
	currentFace = 'front'
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(-50vw)'
}

const toTopFace = () => {
	x -= speed
	currentFace = 'top'
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(' + transCubeZTopBot + 'px) translateY(50vh)'
}

const toBottomFace = () => {
	x += speed
	currentFace = 'bottom'
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(' + transCubeZTopBot + 'px) translateY(-50vh)'
}

const toLeftFace = () => {
	y += speed
	currentFace = 'left'
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(0vw) translateX(50vw)'
}

const toRightFace = () => {
	y -= speed
	currentFace = 'right'
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(0vw) translateX(-50vw)'
}

const upFct = () => {
	if (currentFace === 'bottom') {
		x -= speed
		toFrontFace()
	} else if (currentFace !== 'top') {
		if (currentFace === 'right') {
			y += speed
		}
		if (currentFace === 'left') {
			y -= speed
		}
		toTopFace()
	}
}


const downFct = () => {
	if (currentFace === 'top') {
		x += speed
		toFrontFace()
	} else if (currentFace !== 'bottom') {
		if (currentFace === 'right') {
			y += speed
		}
		if (currentFace === 'left') {
			y -= speed
		}
		toBottomFace()
	}
}


const leftFct = () => {
	if (currentFace === 'right') {
		y += speed
		toFrontFace()
	} else if (currentFace !== 'left') {
		if (currentFace === 'bottom') {
			x -= speed
		}
		if (currentFace === 'top') {
			x += speed
		}
		toLeftFace()
	}
}


const rightFct = () => {
	if (currentFace === 'left') {
		y -= speed
		toFrontFace()
	} else if (currentFace !== 'right') {
		if (currentFace === 'bottom') {
			x -= speed
		}
		if (currentFace === 'top') {
			x += speed
		}
		toRightFace()
	}
}

for (var i = 0; i < goUp.length; i++) {
	goUp[i].addEventListener('click', function() {
		upFct()
	})
	goBottom[i].addEventListener('click', function() {
		downFct()
	})
	goRight[i].addEventListener('click', function() {
		rightFct()
	})
	goLeft[i].addEventListener('click', function() {
		leftFct()
	})
}

window.addEventListener('keydown', function(e) {
	if (e.keyCode === 38) {
		upFct()
		transitionOpacity()
	}
  	if (e.keyCode === 40) {
  		downFct()
		transitionOpacity()
  	}
  	if (e.keyCode === 39) {
  		rightFct()
		transitionOpacity()
  	}
  	if (e.keyCode === 37) {
  		leftFct()
		transitionOpacity()
  	}
})

/* -------------- mobile swipe ------------------- */

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            rightFct();
        } else {
            /* right swipe */
            leftFct();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            downFct();
        } else { 
            /* down swipe */
            upFct();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};