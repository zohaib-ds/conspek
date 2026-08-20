import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    video: "/videos/hero-01.mp4",
    image: "/media/hero-01.jpg",
    eyebrow: "INTEGRATED INDUSTRIAL ENGINEERING",
    title: "ENGINEERING THE SYSTEMS BEHIND INDUSTRY."
  },
  {
    video: "/videos/hero-02.mp4",
    image: "/media/hero-02.jpg",
    eyebrow: "MECHANICAL ENGINEERING",
    title: "PRECISION THAT KEEPS PROCESSES MOVING."
  },
  {
    video: "/videos/hero-03.mp4",
    image: "/media/hero-03.jpg",
    eyebrow: "ELECTRICAL & INSTRUMENTATION",
    title: "CONTROL EVERY CRITICAL SIGNAL."
  },
  {
    video: "/videos/hero-04.mp4",
    image: "/media/hero-04.jpg",
    eyebrow: "EPC PROJECT DELIVERY",
    title: "FROM BLUEPRINT TO OPERATION."
  }
];

const engineeringSections = [
  {
    number: "01",
    video: "/videos/video-01.mp4",
    image: "/media/video-01.jpg",
    eyebrow: "ELECTRICAL & INSTRUMENTATION",
    title: "POWERING THE SYSTEM.",
    text: "Electrical distribution, instrumentation, PLC, SCADA, MCC, control panels and commissioning — engineered as one reliable industrial system.",
    button: "EXPLORE ELECTRICAL"
  },
  {
    number: "02",
    video: "/videos/video-02.mp4",
    image: "/media/video-02.jpg",
    eyebrow: "MECHANICAL ENGINEERING",
    title: "BUILT AROUND PERFORMANCE.",
    text: "Piping, pumps, rotating equipment, fabrication, HVAC and mechanical systems designed for demanding industrial environments.",
    button: "EXPLORE MECHANICAL"
  },
  {
    number: "03",
    video: "/videos/video-03.mp4",
    image: "/media/video-03.jpg",
    eyebrow: "EPC CONTRACTS",
    title: "FROM CONCEPT TO COMMISSIONING.",
    text: "Engineering, procurement, construction, installation, testing and handover through a single integrated delivery model.",
    button: "EXPLORE EPC"
  },
  {
    number: "04",
    video: "/videos/video-04.mp4",
    image: "/media/video-04.jpg",
    eyebrow: "DIGITAL & INDUSTRIAL TECHNOLOGY",
    title: "CONNECTING THE OPERATION.",
    text: "Industrial software, data systems and digital tools that connect people, machines and decisions.",
    button: "EXPLORE DIGITAL"
  }
];

const industries = [
  ["01", "Oil & Gas"],
  ["02", "Power & Water"],
  ["03", "Chemical Plants"],
  ["04", "Pharmaceuticals"],
  ["05", "Food Processing"],
  ["06", "Solar Plants"]
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    ["Services", "#services"],
    ["Industries", "#industries"],
    ["About", "#about"],
    ["Contact", "#contact"]
  ];

  return (
    <header
      className={
        scrolled
          ? "floating-nav floating-nav-scrolled"
          : "floating-nav"
      }
    >
      <a
        className="floating-logo"
        href="#top"
        onClick={() => setOpen(false)}
      >
        CONSPEK<span>/</span>
      </a>

      <nav className={open ? "floating-links open" : "floating-links"}>
        {links.map((item) => (
          <a
            key={item[0]}
            href={item[1]}
            onClick={() => setOpen(false)}
          >
            {item[0]}
          </a>
        ))}
      </nav>

      <a
        className="floating-cta"
        href="#contact"
      >
        START A PROJECT
        <ArrowUpRight size={13} />
      </a>

      <button
        className="floating-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </header>
  );
}

function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(function () {
    function move(event) {
      if (!dot.current || !ring.current) return;

      gsap.to(dot.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.05,
        overwrite: true
      });

      gsap.to(ring.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.25,
        overwrite: true
      });
    }

    window.addEventListener("mousemove", move);

    return function () {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div className="cursor-d" ref={dot} />
      <div className="cursor-r" ref={ring} />
    </>
  );
}

function Video(props) {
  const src = props.src;
  const image = props.image;
  const className = props.className || "";
  const hero = props.hero || false;

  return (
    <div
      className={"video " + className}
      style={{
        backgroundImage: "url(" + image + ")"
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload={hero ? "auto" : "none"}
        poster={image}
        src={src}
      />

      <div className="grain" />
    </div>
  );
}

function LazyVideo(props) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "800px 0px"
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="video"
      style={{
        backgroundImage: "url(" + props.image + ")"
      }}
    >
      {loaded && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={props.image}
          src={props.src}
        />
      )}

      <div className="grain" />
    </div>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  function changeSlide(next) {
    if (next === current || transitioning) return;

    setTransitioning(true);

    window.setTimeout(function () {
      setCurrent(next);
      setTransitioning(false);
    }, 650);
  }

  useEffect(function () {
    const timer = window.setInterval(function () {
      const next = (current + 1) % heroSlides.length;
      changeSlide(next);
    }, 6500);

    return function () {
      window.clearInterval(timer);
    };
  }, [current, transitioning]);

  const slide = heroSlides[current];

  return (
    <section className="hero" id="top">
      <Video src={slide.video} image={slide.image} />

      <div className="hero-shade" />

      <div className={"tiles " + (transitioning ? "flip" : "")}>
        {Array.from({ length: 10 }).map(function (_, index) {
          return <i key={index} style={{ "--i": index }} />;
        })}
      </div>

      <div className="hero-copy">
        <div className="eyebrow">
          <b />
          {slide.eyebrow}
        </div>

        <h1 key={current}>{slide.title}</h1>

        <p>
          Integrated engineering, procurement and construction
          solutions for complex industrial environments.
        </p>

        <a className="button" href="#services">
          Explore capabilities
          <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="hero-bottom">
        <span>CONSPEK / 0{current + 1}</span>

        <div className="dots">
          {heroSlides.map(function (_, index) {
            return (
              <button
                key={index}
                className={index === current ? "on" : ""}
                onClick={function () { changeSlide(index); }}
                aria-label={"Hero slide " + (index + 1)}
              />
            );
          })}
        </div>

        <span className="scroll-label">
          <ArrowDown size={13} />
          SCROLL
        </span>
      </div>
    </section>
  );
}
function Intro() {
  const statsRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const counters = statsRef.current.querySelectorAll(".count");

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target"));
      const suffix = counter.getAttribute("data-suffix") || "";

      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2.2,
        delay: 0.2,
        ease: "power2.out",

        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          once: true
        },

        onUpdate: () => {
          counter.textContent =
            Math.floor(obj.value) + suffix;
        },

        onComplete: () => {
          counter.textContent = target + suffix;
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === statsRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="intro section">

      <div className="label">
        01 / CONSPEK
      </div>

      <div className="intro-grid">

        <h2>
          THE ENGINEERING
          <br />
          <em>BEHIND THE OPERATION.</em>
        </h2>

        <div>

          <p className="big">
            We design the systems that make industry work.
          </p>

          <p>
            CONSPEK brings electrical, instrumentation, mechanical,
            EPC and digital capabilities together around dependable
            industrial performance.
          </p>

          <a
            className="line-link"
            href="#services"
          >
            Discover our capabilities
            <ArrowUpRight size={15} />
          </a>

        </div>

      </div>

      <div
        className="stats"
        ref={statsRef}
      >

        <div>
          <strong
            className="count"
            data-target="25"
            data-suffix="+"
          >
            0
          </strong>

          <small>
            YEARS EXPERIENCE
          </small>
        </div>

        <div>
          <strong
            className="count"
            data-target="6"
            data-suffix=""
          >
            0
          </strong>

          <small>
            CORE INDUSTRIES
          </small>
        </div>

        <div>
          <strong
            className="count"
            data-target="360"
            data-suffix="°"
          >
            0
          </strong>

          <small>
            END-TO-END DELIVERY
          </small>
        </div>

      </div>

    </section>
  );
}
function FeatureBand() {
  return (
    <section className="feature-band">
      
      <div className="feature-text">
        <div className="label">02 / THE PROCESS</div>

        <h2>
          WATCH
          <br />
          <em>ENGINEERING MOVE.</em>
        </h2>

        <p>
          Real systems. Real processes. A closer look at
          the environments our engineering is built for.
        </p>
      </div>

      <div className="band-word">
        CONSPEK
      </div>

    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-title">
        <div>
          <div className="label">03 / CAPABILITIES</div>

          <h2>
            BUILT TO
            <br />
            <em>PERFORM.</em>
          </h2>
        </div>

        <p>
          Four core engineering disciplines,
          presented through a simple visual story.
        </p>
      </div>
    </section>
  );
}

function EngineeringVideoSection(props) {
  const item = props.item;
  const reverse = props.reverse;
  const sectionRef = useRef(null);

  useEffect(function () {
    if (!sectionRef.current) return;

    const animation = gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true
        }
      }
    );

    return function () {
      animation.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={"story " + (reverse ? "reverse" : "")}
      id={"service-" + item.number}
    >
      <div className="story-video">
        <LazyVideo
          src={item.video}
          image={item.image}
        />

        <div className="video-number">{item.number}</div>

        <div className="video-label">
          CONSPEK / ENGINEERING SYSTEM
        </div>
      </div>

      <div className="story-copy">
        <div className="label">
          {item.number} / {item.eyebrow}
        </div>

        <h2>{item.title}</h2>

        <p>{item.text}</p>

        <a className="line-link" href="#contact">
          {item.button}
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="industries section" id="industries">
      <div className="label">08 / INDUSTRIES</div>

      <div className="industry-head">
        <h2>
          WHERE WE
          <br />
          <em>OPERATE.</em>
        </h2>

        <p>
          From energy and process plants to food,
          pharma and renewable infrastructure.
        </p>
      </div>

      <div className="industry-grid">
        {industries.map(function (industry) {
          return (
            <div key={industry[1]}>
              <span>{industry[0]}</span>
              <b>{industry[1]}</b>
              <ArrowUpRight size={17} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  const steps = [
    "DISCOVER",
    "DESIGN",
    "ENGINEER",
    "BUILD",
    "COMMISSION"
  ];

  return (
    <section className="about section" id="about">
      <div className="label">09 / DELIVERY</div>

      <h2>
        FROM CONCEPT
        <br />
        <em>TO COMMISSIONING.</em>
      </h2>

      <div className="steps">
        {steps.map(function (step, index) {
          return (
            <div key={step}>
              <span>0{index + 1}</span>
              <b>{step}</b>
              <p>
                One accountable workflow built around
                safety, quality and operational readiness.
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="label">10 / NEXT</div>

      <h2>
        LET'S ENGINEER
        <br />
        <em>WHAT'S NEXT.</em>
      </h2>

      <p>
        Have a complex industrial requirement?
        Let's turn it into a system that works.
      </p>

      <a className="button" href="mailto:info@conspek.com">
        Start a project
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="logo">
        CONSPEK<span>/</span>
      </div>

      <div className="foot-links">
        <a href="#services">Services</a>
        <a href="#industries">Industries</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <small>
        © 2026 CONSPEK Engineering. All systems operational.
      </small>
    </footer>
  );
}

function App() {
  return (
    <>
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Intro />
        <FeatureBand />
        <Services />

        {engineeringSections.map(function (item, index) {
          return (
            <EngineeringVideoSection
              key={item.number}
              item={item}
              reverse={index % 2 === 1}
            />
          );
        })}

        <Industries />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
