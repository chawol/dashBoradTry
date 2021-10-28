import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'

const sence = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const render = new THREE.WebGL1Renderer();

render.setSize(innerWidth, innerHeight);
render.setPixelRatio(devicePixelRatio);

document.body.appendChild(render.domElement);
camera.position.z = 5
const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const planeMatrail = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMatrail);
sence.add(planeMesh);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1)
sence.add(light);
new OrbitControls(camera, render.domElement)

const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 10,
    heightSegments: 10,
  }
}
gui.add(world.plane, 'width', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'height', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'widthSegments', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'heightSegments', 1, 20).onChange(generatePlane)

function generatePlane() {
  const {plane} = world
  planeMesh.geometry.dispose();
  planeMesh.geometry =
    new THREE.PlaneGeometry(plane.width, plane.height, plane.widthSegments, plane.heightSegments)
  const {array} = planeMesh.geometry.attributes.position
  for (let i = 0; i < array.length; i++) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i + 2] = z + Math.random();
  }
}


function animate() {
  requestAnimationFrame(animate)
  render.render(sence, camera)
}

animate();

