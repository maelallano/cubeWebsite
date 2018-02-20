var cube = document.querySelector('.cube')
var wrapper = document.querySelector('.wrapper')
var face = document.querySelectorAll('.face')
var goUp = document.querySelectorAll('.goUp')
var goBottom = document.querySelectorAll('.goBottom')
var goRight = document.querySelectorAll('.goRight')
var goLeft = document.querySelectorAll('.goLeft')
var contactMe = document.querySelector('.contactMe')
// var more = document.querySelector('.more')

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

// more.addEventListener('click', function() {
//     cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(' + (transCubeZTopBot + vw - vh) + 'px) translateY(-50vh)';
// });

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
    cube.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(-50vw)'
}

const toBackFace = (y) => {
	currentFace = 'back'
    cube.style.transform = 'rotateX(0deg) rotateY(' + y + 'deg) translateZ(50vw)'
}

const toTopFace = () => {
	// x -= speed
	y = 0
	currentFace = 'top'
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(' + (vw/100) + 'px) translateY(50vh)'
}

const toBottomFace = () => {
	// x += speed
	y = 0
	currentFace = 'bottom'
    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(' + (vw/100) + 'px) translateY(-50vh)'
}

const toLeftFace = () => {
	y += speed
	if (currentFace === 'back') {
		cube.style.transform = 'rotateX(0deg) rotateY(90deg) translateZ(0vw) translateX(-50vw)'
		y = -90
		x = 0
		setTimeout(function() {
			cube.style.transform = 'rotateX(0deg) rotateY(-90deg) translateZ(0vw) translateX(-50vw)'
		}, 1)
		currentFace = 'right'
		return;
	} else {
		currentFace = 'left'
	    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(0vw) translateX(50vw)'
	}
}

const toRightFace = () => {
	y -= speed
	if (currentFace === 'back') {
		cube.style.transform = 'rotateX(0deg) rotateY(90deg) translateZ(0vw) translateX(50vw)'
		cube.classList.add('spin')
		y = 90
		x = 0
		setTimeout(function() {
			cube.classList.remove('spin')
		}, 1400)
		currentFace = 'left'
		return;
	} else {
		currentFace = 'right'
	    cube.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) translateZ(0vw) translateX(-50vw)'
	}
}

const upFct = () => {
	if (currentFace === 'top') {
		toBackFace(-180)
	} else if (currentFace === 'bottom') {
		x = 0
		toFrontFace()
	} else {
		if (currentFace === 'right') {
			y += speed
		}
		if (currentFace === 'left') {
			y -= speed
		}
		x = -90
		toTopFace()
	}
}


const downFct = () => {
	if (currentFace === 'bottom') {
		toBackFace(180)
	} else if (currentFace === 'top') {
		x = 0
		toFrontFace()
	} else {
		if (currentFace === 'right') {
			y += speed
		}
		if (currentFace === 'left') {
			y -= speed
		}
		x = 90
		toBottomFace()
	}
}


const leftFct = () => {
	if (currentFace === 'back') {
		toLeftFace()
		return;
	}
	if (currentFace === 'left') {
		toBackFace(-180)
	} else if (currentFace === 'right') {
		y += speed
		toFrontFace()
	} else {
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
	if (currentFace === 'back') {
		toRightFace()
		return;
	}
	if (currentFace === 'right') {
		toBackFace(180)
	} else if (currentFace === 'left') {
		y -= speed
		toFrontFace()
	} else {
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

contactMe.addEventListener('click', function() {
	leftFct();
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

// what's in the box ??

var container;
var camera, scene, renderer;
var mesh, lightMesh, geometry;
var spheres = [];
var directionalLight, pointLight;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
init();
animate();
function init() {
	container = document.createElement( 'div' );
	container.classList.add('canvasDiv');
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.z = 3200;
	scene = new THREE.Scene();
	var spotLight = new THREE.SpotLight( 0xffffff, 2, 200, 1.05 );
	spotLight.position.set( 0, 0, 0 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );
	scene.background = new THREE.CubeTextureLoader()
		.setPath( 'assets/textures/' )
		.load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );
	var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background } );
	for ( var i = 0; i < 500; i ++ ) {
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = Math.random() * 10000 - 5000;
		mesh.position.y = Math.random() * 10000 - 5000;
		mesh.position.z = Math.random() * 10000 - 5000;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
		scene.add( mesh );
		spheres.push( mesh );
	}
	//
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) * 10;
	mouseY = ( event.clientY - windowHalfY ) * 10;
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	var timer = 0.0001 * Date.now();
	for ( var i = 0, il = spheres.length; i < il; i ++ ) {
		var sphere = spheres[ i ];
		sphere.position.x = 5000 * Math.cos( timer + i );
		sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
	}
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}

var canvasDiv = document.querySelector('.canvasDiv');

var canvasBtn = document.createElement('button');
canvasBtn.classList.add('canvasBtn');
canvasBtn.textContent = 'Go back';

canvasDiv.appendChild(canvasBtn);

var whatInTheBoxBtn = document.querySelector('.whatInTheBoxBtn');

canvasDiv.classList.toggle('hidden');

whatInTheBoxBtn.addEventListener('click', function() {
	canvasDiv.classList.toggle('hidden');
	wrapper.classList.toggle('hidden');
})

canvasBtn.addEventListener('click', function() {
	canvasDiv.classList.toggle('hidden');
	wrapper.classList.toggle('hidden');
})



















