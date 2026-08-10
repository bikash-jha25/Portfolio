import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    num: "01",
    name: "Mumzworld AI Comparator",
    category: "Full Stack · AI",
    tools: "React.js, Node.js, Express.js, Groq AI",
    desc: "AI-powered product comparison platform with structured JSON validation and modular backend REST APIs.",
    image: "/images/project_mumzworld.png",
    live: "",
    github: "https://github.com/bikash-jha25/mumzworld-ai-comparator",
  },
  {
    num: "02",
    name: "DevTube",
    category: "Frontend · Platform",
    tools: "React.js, Redux Toolkit, REST APIs",
    desc: "Responsive dev-learning platform. Reduced API calls by 70% with debouncing & LRU caching. Deployed on Vercel.",
    image: "/images/project_devtube.png",
    live: "https://dev-tube-two.vercel.app/",
    github: "https://github.com/bikash-jha25/DevTube",
  },
  {
    num: "03",
    name: "NetflixGPT",
    category: "Full Stack · AI",
    tools: "React.js, Firebase, TMDB API, JWT",
    desc: "AI-powered movie recommendation app with JWT auth, Gemini AI integration, and Firebase Hosting.",
    image: "/images/project_netflixgpt.png",
    live: "https://netflix-gpt-phi-mocha.vercel.app/",
    github: "https://github.com/bikash-jha25/NetflixGPT",
  },
];

const Work = () => {
  useGSAP(() => {
    // Horizontal scroll only on desktop (>768px); mobile uses normal vertical flow
    if (window.innerWidth <= 768) return;

    let timeline: gsap.core.Timeline;
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const container = document.querySelector(".work-container");
      if (!box.length || !container || !box[0].parentElement) return;
      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding || "0") / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    const rafId = requestAnimationFrame(() => {
      setTranslateX();

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.num}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools &amp; features</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "8px", opacity: 0.7, fontSize: "13px" }}>
                  {project.desc}
                </p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.live || project.github}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
