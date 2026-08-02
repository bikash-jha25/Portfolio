import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const smoother = {
  paused: (isPaused: boolean) => {
    if (lenisInstance) {
      if (isPaused) lenisInstance.stop();
      else lenisInstance.start();
    }
  },
  scrollTop: (value?: number) => {
    if (lenisInstance) {
      if (typeof value === "number") {
        lenisInstance.scrollTo(value, { immediate: true });
      }
      return lenisInstance.scroll;
    }
    return 0;
  },
  scrollTo: (target: any, _smooth?: boolean, _position?: string) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { duration: 1.2 });
    }
  },
};

const Navbar = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateFn);
    gsap.ticker.lagSmoothing(0);

    lenis.stop(); // Start paused like original initialFX

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const targetHref = element.getAttribute("data-href");
          if (targetHref) {
            lenis.scrollTo(targetHref, { duration: 1.2 });
          }
        }
      });
    });

    return () => {
      gsap.ticker.remove(updateFn);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/images/bj_logo.png" alt="Bikash Jha" className="navbar-logo" />
        </a>
        <a
          href="mailto:bikashjha25decem@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          bikashjha25decem@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
