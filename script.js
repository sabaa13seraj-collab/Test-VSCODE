/*************************************************
 * NAVBAR TOGGLE
 *************************************************/
const navbar = document.querySelector(".navbar");
const bars = document.querySelector(".fa-bars");
const xmark = document.querySelector(".fa-xmark");
const humburgerMenu = document.querySelector(".humburger");

if (humburgerMenu) {
  humburgerMenu.addEventListener("click", () => {
    bars.classList.toggle("active");
    xmark.classList.toggle("active");
    navbar.classList.toggle("active");
  });
}

/*************************************************
 * GSAP + SCROLLTRIGGER
 *************************************************/
gsap.registerPlugin(ScrollTrigger);

/*************************************************
 * LENIS (MUST BE BEFORE ANIMATIONS)
 *************************************************/
const lenis = new Lenis({
  smooth: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 🔥 REQUIRED
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

/*************************************************
 * SPLIT TEXT ANIMATION (FIXED)
 *************************************************/
window.addEventListener("load", () => {
  const splitTypes = document.querySelectorAll(".big-h1");

  splitTypes.forEach((el) => {
    const split = new SplitType(el, { types: "chars" });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
      opacity: 0.2,
      stagger: 0.08,
      ease: "none",
    });
  });

  // ❗ VERY IMPORTANT
  ScrollTrigger.refresh();
});

/*************************************************
 * FADE-IN SECTIONS
 *************************************************/
const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

faders.forEach((el) => observer.observe(el));

gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".card");
const container = document.querySelector(".cards");

ScrollTrigger.create({
  trigger: ".cards-section",
  start: "top top",
  end: "+=100vh",
  scrub: true,
  pin: ".sticky-wrapper",

  onUpdate: self => {
    const p = self.progress;

    // Move cards upward from bottom (100vh) to center (0vh)
    const yPos = gsap.utils.interpolate(100, 0, p);
    gsap.set(container, {
      y: yPos + "vh"
    });

    // Shrink width as they move up
    gsap.set(container, {
      width: gsap.utils.interpolate(75, 60, Math.min(p * 2, 1)) + "%"
    });

    // Add gap between cards
    if (p > 0.3) {
      gsap.to(container, { gap: 20, duration: 0.3 });
    }

    // Flip cards
    if (p > 0.55) {
      gsap.to(cards, {
        rotationY: 180,
        stagger: 0.1,
        ease: "power3.out"
      });
    } else {
      gsap.to(cards, {
        rotationY: 0,
        stagger: -0.1,
        ease: "power3.out"
      });
    }
  }
});
