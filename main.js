
import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';

const inputcolor = document.querySelector('#input-color')     

const scene = new THREE.Scene();
	
			//scene.background = new THREE.Color('white')
			const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

		camera.position.set(0,3,6);
			
			const controls = new OrbitControls( camera, renderer.domElement );
			console.log(controls)
			controls.enableDamping = true
			controls.maxPolarAngle = Math.PI /2.1
			controls.minDistance = 3;
			controls.maxDistance = 9

			const textureloader = new THREE.TextureLoader()
			let texture = textureloader.load('https://images.unsplash.com/photo-1663970206579-c157cba7edda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80')
            scene.background = texture

			const material = new THREE.ShaderMaterial( {color: 'red'} );

let obj
let carmaterial;

 const loader = new GLTFLoader()
loader.load('car.glb', (gltf) =>{

 scene.add(gltf.scene)

  scene.traverse((child)=>{
     
	 if(child.isMesh){
		child.castShadow = true
		child.receiveShadow = true
	 }

      if(child.material && child.material.name == 'body_color'){
		carmaterial = child.material
	  }
  })


 inputcolor.addEventListener('input', (e) =>{
	carmaterial.color.set(new THREE.Color(e.target.value))
 })


})

			const light = new THREE.AmbientLight( 0x404040,2.5 ); // soft white light
scene.add( light );
const spotLight = new THREE.SpotLight( 'white',4 );
spotLight.position.set( 5, 5, 2 );
scene.add(spotLight)
spotLight.penumbra = 1
spotLight.angle = Math.PI/2.2

spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024; // default
spotLight.shadow.mapSize.height = 1024; // default
spotLight.shadow.camera.near = 0.1; // default
spotLight.shadow.camera.far = 500; // default


let time = 0
let radius = 3

			function animate() {
				requestAnimationFrame( animate );

           time += 0.03

	

				controls.update();

                //    obj.position.x = Math.sin(time) * 2
				//    obj.position.z = Math.cos(time)* 2
				//    obj.position.y = Math.cos(time / 1.5) * 0.5 + 0.5
				renderer.render( scene, camera );
			};

			animate();
			