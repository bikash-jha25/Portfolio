import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

let resizeDebounceTimer: number | undefined;

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;
  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  // Keep pixel ratio in sync to prevent warping after resize
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(width, height);
  camera.aspect = width / (height || 1);
  camera.updateProjectionMatrix();

  clearTimeout(resizeDebounceTimer);
  resizeDebounceTimer = window.setTimeout(() => {
    const workTrigger = ScrollTrigger.getById("work");
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger !== workTrigger) {
        trigger.kill();
      }
    });
    setCharTimeline(character, camera);
    setAllTimeline();
    ScrollTrigger.refresh();
  }, 200);
}
