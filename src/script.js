import './style.css'
import * as THREE from 'three'

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
const matcapTexture = textureLoader.load('textures/matcap/9.png', (texture) => {
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
ambientLight.intensity = 0.5;
scene.add(ambientLight);

// Directional Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1.5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);
// Directional Light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)



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
    let randomY = 4 * 0.5 - Math.random() * 1.15 * 4.7
    let randomZ = (Math.random() - 0.5) * 4
    let rm = (Math.random() - 0.5) * 10
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
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * 4.7 * 1.15
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
