import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x101010)

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
camera.position.z = 18;
camera.position.y = 12;
camera.lookAt(0,0, 0)
scene.add(camera)

/**
 * Textures
 */
// Here we place all the Materials and textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('matcap/10.png');
const ellipseMatcapTexture = textureLoader.load('matcap/3.png');

/*
* Lights
*/
// Ambient light for realistic shadows
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 2;
scene.add(ambientLight);

// Directional Lights
const directionalLight = new THREE.DirectionalLight(0x00fffc, 3);
directionalLight.position.set(1, 1.5, 1);
directionalLight.castShadow=true;
scene.add(directionalLight);
// Directional Light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)

/**
 * Fonts
 */
const fontMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const textGroup = new THREE.Group();
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const size = 0.7;
        const H = new THREE.TextBufferGeometry('H', {
            font: font,
            size: size,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        })
        const I = new THREE.TextBufferGeometry('i', {
            font: font,
            size: size,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        })
        H.center();
        I.center();
        const hT = new THREE.Mesh(H, fontMaterial);
        const iT = new THREE.Mesh(I, fontMaterial);
        hT.position.set(-0.3, 0, 0);
        iT.position.set(0.3, -0.5, 0);
        hT.rotation.set(-Math.PI / 7, Math.PI / 4.5, Math.PI / 6)
        textGroup.add(hT);
        textGroup.add(iT);
    }
)
textGroup.rotation.set(-Math.PI / 7, Math.PI / 9, Math.PI / 4);
textGroup.scale.set(1.5, 1.5, 1.5)
scene.add(textGroup);


/**
 * Elliptical Curve
 */
const ellipseMaterial = new THREE.MeshMatcapMaterial({ matcap: ellipseMatcapTexture });
const ellipseGeometry1 = new THREE.TorusBufferGeometry(3, 0.005, 100, 200);
const ellipseGeometry2 = new THREE.TorusBufferGeometry(4, 0.005, 100, 200);
const ellipseGeometry3 = new THREE.TorusBufferGeometry(6, 0.005, 100, 200);
const ellipseGeometry4 = new THREE.TorusBufferGeometry(7, 0.005, 100, 200);
const ellipseGeometry5 = new THREE.TorusBufferGeometry(8, 0.005, 100, 200);
const ellipseGeometry6 = new THREE.TorusBufferGeometry(9.6, 0.005, 100, 200);
const ellipseGeometry7 = new THREE.TorusBufferGeometry(10, 0.005, 100, 200);
const ellipseGeometry8 = new THREE.TorusBufferGeometry(11, 0.005, 100, 200);
const ellipseGeometry9 = new THREE.TorusBufferGeometry(11.6, 0.005, 100, 200);
///////////////////////////////////////////////////////////////////////
const ellipse1 = new THREE.Mesh(ellipseGeometry1, ellipseMaterial)
const ellipse2 = new THREE.Mesh(ellipseGeometry2, ellipseMaterial)
const ellipse3 = new THREE.Mesh(ellipseGeometry3, ellipseMaterial)
const ellipse4 = new THREE.Mesh(ellipseGeometry4, ellipseMaterial)
const ellipse5 = new THREE.Mesh(ellipseGeometry5, ellipseMaterial)
const ellipse6 = new THREE.Mesh(ellipseGeometry6, ellipseMaterial)
const ellipse7 = new THREE.Mesh(ellipseGeometry7, ellipseMaterial)
const ellipse8 = new THREE.Mesh(ellipseGeometry8, ellipseMaterial)
const ellipse9 = new THREE.Mesh(ellipseGeometry9, ellipseMaterial)
////////////////////////////////////////////////////////////////////
// 1
ellipse1.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 2
ellipse2.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 3
ellipse3.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 4
ellipse4.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 5
ellipse5.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 6
ellipse6.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 7
ellipse7.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 8
ellipse8.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
// 9
ellipse9.rotation.set(9*(Math.PI/18), -Math.PI/12, 0)
///////////////////////////////////////////////////////////////////
scene.add(ellipse1);
scene.add(ellipse2);
scene.add(ellipse3);
scene.add(ellipse4);
scene.add(ellipse5);
scene.add(ellipse6);
scene.add(ellipse7);
scene.add(ellipse8);
scene.add(ellipse9);


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
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = false

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    textGroup.rotation.z = 0.15 * elapsedTime
    textGroup.rotation.y = 0.15 * elapsedTime

    // Update controls
    // controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()