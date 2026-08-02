import { SplitText } from "./splitTextHelper";
import gsap from "gsap";
import { smoother } from "../Navbar";
import { setAllTimeline } from "./GsapScroll";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Initialise section scroll timelines
  setAllTimeline();

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  startRoleRotator();
}

function startRoleRotator() {
  const wordDev = document.querySelector(".word-dev");
  const wordEng = document.querySelector(".word-eng");
  if (!wordDev || !wordEng) return;

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

  tl.to(wordDev, {
    y: "-100%",
    opacity: 0,
    duration: 0.8,
    ease: "power3.inOut",
    delay: 2.5,
  })
    .fromTo(
      wordEng,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.8, ease: "power3.inOut" },
      "-=0.8"
    )
    .to(wordEng, {
      y: "-100%",
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      delay: 2.5,
    })
    .fromTo(
      wordDev,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.8, ease: "power3.inOut" },
      "-=0.8"
    );
}
