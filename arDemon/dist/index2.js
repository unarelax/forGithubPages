import * as THREE from 'three';
import * as THREEx from './node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

function main() {
    const canvas = document.getElementById('canvas1');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({canvas: canvas});

    const arjs = new THREEx.LocationBased(scene, camera);
    const cam = new THREEx.WebcamRenderer(renderer);

    const geom = new THREE.BoxGeometry(50, 50, 50);
    const mtl = new THREE.MeshBasicMaterial({color: 0xbbff6b});
    const box = new THREE.Mesh(geom, mtl);

    const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);
    
    arjs.add(box, 120.192, 30.152); 

    // Start the GPS
    arjs.startGps();
    // arjs.startGps(-0.72, 51.05);
    // arjs.fakeGps(120.192, 30.152);

    requestAnimationFrame(render);

    function render() {
        if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
            const aspect = canvas.clientWidth/canvas.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }
// Update the scene using the latest sensor readings
deviceOrientationControls.update();

cam.update();
renderer.render(scene, camera);
requestAnimationFrame(render);
    }
}

main();