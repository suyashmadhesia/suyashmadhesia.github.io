import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000005)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Fullscreen
 */
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10;
camera.position.y = 1;
scene.add(camera)

/**
 * Textures
 */
// Here we place all the Materials and textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('matcap/8.png');
const cubeTexture = textureLoader.load('matcap/9.png');

const fontMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const cubeMaterial = new THREE.MeshMatcapMaterial({ matcap: cubeTexture });

/*
* Lights
*/
// Ambient light for realistic shadows
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

// Directional Lights
const directionalLight = new THREE.DirectionalLight(0x00fffc, 3);
directionalLight.position.set(1, 1.5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);
// Directional Light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)


// Array of Cubes
let cubes = []
const numberOfCubes = 30;
/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();
fontLoader.load('fonts/helvetiker_regular.typeface.json',
    (font) => {
        const size = sizes.width < 500 ? 0.2 : 0.4;
        const height = 0;
        const H = new THREE.TextBufferGeometry('Hi, I am SUYASH', {
            font: font,
            size: size,
            height: height,
            curveSegments: 12,
            bevelEnabled: false,
        })
        const D = new THREE.TextBufferGeometry('a Creative Developer', {
            font: font,
            size: size,
            height: height,
            curveSegments: 12,
            bevelEnabled: false,

        })
        H.center();
        D.center();
        const textH = new THREE.Mesh(H, fontMaterial);
        const textD = new THREE.Mesh(D, fontMaterial);
        textD.position.y = -size - 0.1;
        scene.add(textD);
        scene.add(textH);

        const cubeGeometry = new THREE.BoxBufferGeometry(0.4, 0.4, 0.4);
        // const positionx = []
        // const positiony = []
        // const positionz = []
        const A = Math.PI * 2 / numberOfCubes
        for (let i = 0; i < numberOfCubes; i++) {
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = Math.sin(i*A) * 5
            cube.position.y = Math.cos(i*A) * 5
            let z = (Math.random()-0.5) * 10;
            cube.position.z = z < 5 ? z+((Math.random()-0.5) * 10) : z;
            cube.rotation.x = Math.random() * Math.PI
            cube.rotation.y = Math.random() * Math.PI
            scene.add(cube);
            // positionx.push(cube.position.x)
            // positiony.push(cube.position.y)
            // positionz.push(cube.position.z)
            cubes.push(cube);
        }
        // console.log(positionx, positiony, positionz)
    }
)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = false
controls.enabled = false

const tick = () => {
    // const elapsedTime = clock.getElapsedTime()
    for (let i = 0; i < numberOfCubes; i++) {
        if (cubes[i]) {
            cubes[i].rotation.x += Math.random() * 0.01 - 0.008;
            cubes[i].rotation.y += Math.random() * 0.01 - 0.008;
        }
    }
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()