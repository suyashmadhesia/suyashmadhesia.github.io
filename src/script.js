import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GUI } from 'dat.gui'

// Canvas
const canvas = document.querySelector('canvas.webgl')
const fscreen = document.getElementById("full-screen")
const screenBody = document.getElementById("screen")
let fullScreen = false;

// Global Used in all values
let objects = []


// Scene
const scene = new THREE.Scene()

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
})

// Implement full screen

fscreen.addEventListener('click', () => {

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

// mouse move event of parallex effect
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5
})




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

/**
 * Textures
 */
// Here we place all the Materials and textures
const textureLoader = new THREE.TextureLoader()
const randomTexture = Math.floor(Math.random() * 9)
const matcapTexture = textureLoader.load(`textures/matcap/${randomTexture}.png`, (texture) => {
    textureLoaded1 = true
});

const randomObjectMaterial2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
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
ambientLight.intensity = 0.7;
scene.add(ambientLight);

// Directional Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1.5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);


// Helper
// Directional Light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)

// Axis Helper
const axesHelper = new THREE.AxesHelper( 1 );
scene.add( axesHelper );


// generating cubes for the background
const numberOfObjects = 25;
const cubeGeometry = new THREE.BoxBufferGeometry(0.22, 0.22, 0.22);
for (let i = 0; i < numberOfObjects; i++) {
    let randomX = (Math.random() - 0.5) * 10
    if (sizes.width < 700) {
        if (randomX > 3) {
            randomX = randomX - 2;
        }
        else if (randomX < 0 && randomX < -3) {
            randomX = randomX + 1;
        }
    }
    let randomY = 4 * 0.5 - Math.random() * 1.15 * 4
    let randomZ = (Math.random() - 0.5) * 4
    // let rm = (Math.random() - 0.5) * 10
    const cube = new THREE.Mesh(cubeGeometry, randomObjectMaterial2);
    objects.push(cube);
    cube.position.x = randomX
    cube.position.y = randomY
    cube.position.z = randomZ
    cube.rotation.x = Math.random() * Math.PI
    cube.rotation.y = Math.random() * Math.PI
    scene.add(cube);
}


/**
 * Particles
 */
// Geometry
const objectsDistance = 4
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)
for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = Math.random()
    positions[i * 3 + 1] = Math.random()
    positions[i * 3 + 2] = Math.random()
}
const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Position of the Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * 4 * 1.15
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
scene.add(particles)

/*
Debug UI renderer
*/

const gui = new GUI()

// Loading My models and Assets
const loader = new GLTFLoader();
loader.loadAsync('/models/flutter.gltf').then((gltf) => {
    const gltfGroup = new THREE.Group()
    const flutterFolderRotation = gui.addFolder('Flutter Rotation')
    const flutterFolderScale = gui.addFolder('Flutter Scale')
    const flutterFolderPosition = gui.addFolder('Flutter Position')
    gltfGroup.add(gltf.scene)
    gltfGroup.position.y = -3
    gltfGroup.scale.set(0.6, 0.6, 0.6)
    gltfGroup.rotation.x = Math.PI / 2
    gltfGroup.rotation.y = 0
    gltfGroup.rotation.z = 0
    flutterFolderRotation.add(gltfGroup.rotation, 'x', -Math.PI * 2, Math.PI * 2, Math.PI / 20)
    flutterFolderRotation.add(gltfGroup.rotation, 'y', -Math.PI * 2, Math.PI * 2, Math.PI / 20)
    flutterFolderRotation.add(gltfGroup.rotation, 'z',-Math.PI * 2, Math.PI * 2, Math.PI / 20)
    flutterFolderScale.add(gltfGroup.scale, 'x', 0, 10)
    flutterFolderScale.add(gltfGroup.scale, 'y', 0, 10)
    flutterFolderScale.add(gltfGroup.scale, 'z', 0, 10)
    flutterFolderPosition.add(gltfGroup.position, 'x', 0,100)
    flutterFolderPosition.add(gltfGroup.position, 'y', -100, 100)
    flutterFolderPosition.add(gltfGroup.position, 'z', 0, 100)
    scene.add(gltfGroup)
})



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

    if (textureLoaded1) {
        if (flag == 0) {
            cameraGroup.position.x = -5
            cameraGroup.position.y = 5
            flag = 1;
        }
        loadingHTML()
        textureLoaded1 = false;
    }

    // mouse hover parallex effect animation
    const parallaxX = cursor.x * 0.4
    const parallaxY = - cursor.y * 0.4
    camera.position.y = -scrollY / sizes.height * objectsDistance
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()