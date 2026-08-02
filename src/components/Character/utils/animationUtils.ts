import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBoneNames } from "../../../data/boneData";

const setAnimations = (gltf: GLTF) => {
  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);

  let introAction: THREE.AnimationAction | null = null;
  let typingAction: THREE.AnimationAction | null = null;

  if (gltf.animations) {
    const introClip = gltf.animations.find(
      (clip) => clip.name === "introAnimation"
    );
    if (introClip) {
      introAction = mixer.clipAction(introClip);
      introAction.setLoop(THREE.LoopOnce, 1);
      introAction.clampWhenFinished = true;
      introAction.time = introClip.duration;
      introAction.play();
    }

    const typingClip = gltf.animations.find((clip) => clip.name === "typing");
    if (typingClip) {
      typingAction = mixer.clipAction(typingClip);
      typingAction.setLoop(THREE.LoopRepeat, Infinity);
      typingAction.timeScale = 1.2;
      typingAction.play();
    }

    const blinkClip = gltf.animations.find((clip) => clip.name === "Blink");
    if (blinkClip) {
      const blinkAction = mixer.clipAction(blinkClip);
      blinkAction.play();
    }

    const clipNames = ["key1", "key2", "key3", "key4", "key5", "key6"];
    clipNames.forEach((name) => {
      const clip = THREE.AnimationClip.findByName(gltf.animations, name);
      if (clip) {
        const action = mixer.clipAction(clip);
        action.play();
        action.timeScale = 1.2;
      }
    });
  }

  function startIntro() {
    if (typingAction) {
      typingAction.play();
    }
  }

  function hover(gltf: GLTF, hoverDiv: HTMLDivElement) {
    const eyeBrowUpAction = createBoneAction(
      gltf,
      mixer,
      "browup",
      eyebrowBoneNames
    );
    let isHovering = false;
    if (eyeBrowUpAction) {
      eyeBrowUpAction.setLoop(THREE.LoopOnce, 1);
      eyeBrowUpAction.clampWhenFinished = true;
      eyeBrowUpAction.enabled = true;
    }

    const onHoverFace = () => {
      if (eyeBrowUpAction && !isHovering) {
        isHovering = true;
        eyeBrowUpAction.reset();
        eyeBrowUpAction.enabled = true;
        eyeBrowUpAction.setEffectiveWeight(4);
        eyeBrowUpAction.fadeIn(0.3).play();
      }
    };

    const onLeaveFace = () => {
      if (eyeBrowUpAction && isHovering) {
        isHovering = false;
        eyeBrowUpAction.fadeOut(0.4);
      }
    };

    if (!hoverDiv) return () => {};
    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);

    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clip: string,
  boneNames: string[]
): THREE.AnimationAction | null => {
  const AnimationClip = THREE.AnimationClip.findByName(gltf.animations, clip);
  if (!AnimationClip) return null;

  const filteredTracks = AnimationClip.tracks.filter((track) =>
    boneNames.some((boneName) => track.name.includes(boneName))
  );

  const filteredClip = new THREE.AnimationClip(
    AnimationClip.name + "_filtered",
    AnimationClip.duration,
    filteredTracks
  );

  return mixer.clipAction(filteredClip);
};

export default setAnimations;
