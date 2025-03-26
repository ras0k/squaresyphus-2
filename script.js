console.log('Initializing Three.js engine');

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube (our "rock")
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Set initial camera position using an offset (similar to Unity's CameraFollow)
const cameraOffset = new THREE.Vector3(0, 5, -10);
camera.position.copy(cube.position).add(cameraOffset);

// Setup keyboard input for movement
const keys = {};
window.addEventListener('keydown', (event) => { keys[event.code] = true; });
window.addEventListener('keyup', (event) => { keys[event.code] = false; });

// Movement speed
const speed = 0.1;

// Animation loop to update scene
function animate() {
  requestAnimationFrame(animate);

  // Input-driven movement (WASD or Arrow keys)
  if (keys['ArrowUp'] || keys['KeyW']) {
    cube.position.z -= speed;
  }
  if (keys['ArrowDown'] || keys['KeyS']) {
    cube.position.z += speed;
  }
  if (keys['ArrowLeft'] || keys['KeyA']) {
    cube.position.x -= speed;
  }
  if (keys['ArrowRight'] || keys['KeyD']) {
    cube.position.x += speed;
  }

  // Smooth camera follow using linear interpolation
  const desiredCameraPos = cube.position.clone().add(cameraOffset);
  camera.position.lerp(desiredCameraPos, 0.1);
  camera.lookAt(cube.position);

  renderer.render(scene, camera);
}

animate();

console.log('Three.js engine initialized. Cube and camera set up.');
