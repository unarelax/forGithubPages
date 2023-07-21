import * as THREE from "three";
import * as THREEx from "./node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js";

function main() {
  const canvas = document.getElementById("canvas1");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas });

  const arjs = new THREEx.LocationBased(scene, camera);
  const cam = new THREEx.WebcamRenderer(renderer);

  const geom = new THREE.BoxGeometry(50, 50, 50);
  const mtl = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const box = new THREE.Mesh(geom, mtl);

  // Create the device orientation tracker
  const deviceOrientationControls = new THREEx.DeviceOrientationControls(camera);

  // Change this to a location close to you (e.g. 0.001 degrees of latitude north of you)
  arjs.add(box, 120.191, 30.151);

  arjs.startGps();

  requestAnimationFrame(render);

  function render() {
    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      const aspect = canvas.clientWidth / canvas.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }

    // Update the scene using the latest sensor readings
    deviceOrientationControls.update();

    cam.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  //   arjs.add(box, -0.72, 51.051);

  // //   arjs.fakeGps(-0.72, 51.05);
  //   arjs.startGps();

  //   const rotationStep = THREE.MathUtils.degToRad(2);

  //   let mousedown = false,
  //     lastX = 0;

  //   window.addEventListener("mousedown", (e) => {
  //     mousedown = true;
  //   });

  //   window.addEventListener("mouseup", (e) => {
  //     mousedown = false;
  //   });

  //   window.addEventListener("mousemove", (e) => {
  //     if (!mousedown) return;
  //     if (e.clientX < lastX) {
  //       camera.rotation.y -= rotationStep;
  //       if (camera.rotation.y < 0) {
  //         camera.rotation.y += 2 * Math.PI;
  //       }
  //     } else if (e.clientX > lastX) {
  //       camera.rotation.y += rotationStep;
  //       if (camera.rotation.y > 2 * Math.PI) {
  //         camera.rotation.y -= 2 * Math.PI;
  //       }
  //     }
  //     lastX = e.clientX;
  //   });

  //   requestAnimationFrame(render);

  //   function render() {
  //     if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
  //       renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  //       const aspect = canvas.clientWidth / canvas.clientHeight;
  //       camera.aspect = aspect;
  //       camera.updateProjectionMatrix();
  //     }
  //     cam.update();
  //     renderer.render(scene, camera);
  //     requestAnimationFrame(render);
  //   }
}

main();
