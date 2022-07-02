import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Global Used in all values
let objects = []
// const gui = new dat.GUI();
// Scene
const scene = new THREE.Scene()
// const aboutMeButton = document.getElementById('cv')
// const aboutMe = () => {
//     // Do something
//     console.log("hello");
// }
// aboutMeButton.addEventListener("click", aboutMe);

const loadingHTML = () => {
    const loadingHTML = document.getElementById("loading");
    const body = document.querySelector("body");
    loadingHTML.classList.add("view");
    body.classList.remove("body");
}
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/*
* Cursor
*/
const cursor = {}
cursor.x = 0
cursor.y = 0


/**
 * Scroll Constant
 */

let scrollY = window.scrollY
let currentSection = 0

/**
 * Listeners
 */

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)
    if (newSection != currentSection) {
        currentSection = newSection
    }

    // console.log(newSection)
})

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5
})

/**
 * Fullscreen 
 */
// implement some fun stuff with double click event
// window.addEventListener('dblclick', () => {
//     const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

//     if (!fullscreenElement) {
//         if (canvas.requestFullscreen) {
//             canvas.requestFullscreen()
//         }
//         else if (canvas.webkitRequestFullscreen) {
//             canvas.webkitRequestFullscreen()
//         }
//     }
//     else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen()
//         }
//         else if (document.webkitExitFullscreen) {
//             document.webkitExitFullscreen()
//         }
//     }

// })




/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
const cameraGroup = new THREE.Group()
camera.position.z = 6;
camera.position.x = 0;
camera.position.y = 0;
scene.add(camera)
cameraGroup.add(camera)
scene.add(cameraGroup)




let textureLoaded1 = false;
let textureLoaded2 = false;
/**
 * Textures
 */
// Here we place all the Materials and textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcap/9.png', (texture) => {
    textureLoaded1 = true
});
const cubeTexture = textureLoader.load('textures/matcap/10.png', (texture) => {
    textureLoaded2 = true;
});

const randomObjectMaterial2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const randomObjectMaterial = new THREE.MeshMatcapMaterial({ matcap: cubeTexture });
const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: true,
    size: 0.05
})




/*
* Lights
*/
// Ambient light for realistic shadows
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

// Directional Lights
const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
directionalLight.position.set(1, 1.5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);
// Directional Light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)




// Array of Cubes

const numberOfObjects = 20;
const cubeGeometry = new THREE.BoxBufferGeometry(0.22, 0.22, 0.22);
// const coneGeometry = new THREE.ConeBufferGeometry(0.2, 0.3, 32);
const A = Math.PI * 2 / numberOfObjects
for (let i = 0; i < numberOfObjects; i++) {
    // let randomG = Math.random() * 10;
    let randomX = (Math.random() - 0.5) * 10
    if (sizes.width < 700) {
        if (randomX > 3) {
            randomX = randomX - 2;
        }
        else if (randomX < 0 && randomX < -3) {
            randomX = randomX + 1;
        }
    }
    let randomY = 5 * 0.5 - Math.random() * 1.6 * 3
    let randomZ = (Math.random() - 0.5) * 4

    const cube = new THREE.Mesh(cubeGeometry, randomObjectMaterial2);
    objects.push(cube);
    cube.position.x = randomX
    cube.position.y = randomY
    cube.position.z = randomZ
    cube.rotation.x = Math.random() * Math.PI
    cube.rotation.y = Math.random() * Math.PI
    scene.add(cube);

    // else {
    //     const cone = new THREE.Mesh(coneGeometry, randomObjectMaterial);
    //     objects.push(cone);
    //     cone.position.x = randomX;
    //     cone.position.y = randomY;
    //     cone.position.z = randomZ
    //     cone.rotation.x = Math.random() * Math.PI
    //     cone.rotation.y = Math.random() * Math.PI
    //     scene.add(cone);
    // }
}


/**
 * Particles
 */
// Geometry
const objectsDistance = 4
const particlesCount = 300
const positions = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = Math.random()
    positions[i * 3 + 1] = Math.random()
    positions[i * 3 + 2] = Math.random()
}
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * 4.7 * 3
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
scene.add(particles)




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// document.body.appendChild(renderer.domElement);


// Controls
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = false
// controls.enabled = false


/**
 * Animate
 */
const clock = new THREE.Clock()
let flag = 0;
let previousTime = 0
const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    for (let i = 0; i < numberOfObjects; i++) {
        if (objects[i]) {
            objects[i].rotation.x += Math.PI / 180 * 0.2
            objects[i].rotation.y += Math.PI / 180 * 0.2
        }
    }

    if (textureLoaded1 && textureLoaded2) {
        if (flag == 0) {
            cameraGroup.position.x = -5
            cameraGroup.position.y = 5
            flag = 1;
        }
        loadingHTML()
        textureLoaded1 = false;
        textureLoaded2 = false;
    }

    const parallaxX = cursor.x * 0.4
    const parallaxY = - cursor.y * 0.4
    camera.position.y = -scrollY / sizes.height * objectsDistance
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
