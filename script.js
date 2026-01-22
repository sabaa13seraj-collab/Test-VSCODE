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

/*************************************************
 * STICKY / PIN SECTION (FINAL FIXED)
 *************************************************/

// REQUIRED ELEMENTS
const stickyHeader = document.querySelector(".sticky-header");
const cardContainer = document.querySelector(".card-container");

let isGapAnimationCompleted = false;
let isFlipAnimationCompleted = false;

function initSticky() {
  // Kill old triggers
  ScrollTrigger.getAll().forEach((t) => t.kill());

  const mm = gsap.matchMedia();

  mm.add("(min-width: 370px)", () => {
    ScrollTrigger.create({
      trigger: ".sticky",
      scroller: document.body,
      start: "top top",
      end: () => "+=" + window.innerHeight * 2,
      pin: true,
      scrub: true,
      pinSpacing: true,

      onUpdate(self) {
        const progress = self.progress;

        /* ================= HEADER REVEAL ================= */
        if (progress >= 0.1 && progress <= 0.25) {
          const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);

          gsap.set(stickyHeader, {
            y: gsap.utils.mapRange(0, 1, 40, 0, headerProgress),
            opacity: gsap.utils.mapRange(0, 1, 0, 1, headerProgress),
          });
        } else if (progress < 0.1) {
          gsap.set(stickyHeader, { y: 40, opacity: 0 });
        } else {
          gsap.set(stickyHeader, { y: 0, opacity: 1 });
        }

        /* ================= CONTAINER WIDTH ================= */
        if (progress <= 0.25) {
          const width = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
          gsap.set(cardContainer, { width: `${width}%` });
        } else {
          gsap.set(cardContainer, { width: "80%" });
        }

        /* ================= GAP + RADIUS ================= */
        if (progress >= 0.35 && !isGapAnimationCompleted) {
          gsap.to(cardContainer, {
            gap: "20px",
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(["#card-1", "#card-2", "#card-3"], {
            borderRadius: "20px",
            duration: 0.5,
            ease: "power3.out",
          });

          isGapAnimationCompleted = true;
        }

        /* ================= FLIP CARDS ================= */
        if (progress >= 0.7 && !isFlipAnimationCompleted) {
          gsap.to(".card", {
            rotationY: 180,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: 0.1,
          });

          gsap.to(["#card-1", "#card-3"], {
            y: 30,
            rotationZ: (i) => [-15, 15][i],
            duration: 0.75,
            ease: "power3.inOut",
          });

          isFlipAnimationCompleted = true;
        }

        /* ================= RESET FLIP ================= */
        if (progress < 0.7 && isFlipAnimationCompleted) {
          gsap.to(".card", {
            rotationY: 0,
            duration: 0.75,
            ease: "power3.inOut",
            stagger: -0.1,
          });

          gsap.to(["#card-1", "#card-3"], {
            y: 0,
            rotationZ: 0,
            duration: 0.75,
            ease: "power3.inOut",
          });

          isFlipAnimationCompleted = false;
        }
      },
    });
  });
}

initSticky();

/*************************************************
 * RESIZE HANDLING
 *************************************************/
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
});
