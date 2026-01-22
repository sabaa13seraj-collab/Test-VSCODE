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
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
  infinite: false,
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

  // ❗ VERY IMPORTANT - Debounced refresh for better performance
  ScrollTrigger.refresh();
});

// Optimize ScrollTrigger defaults for better performance
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
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

/*************************************************
 * CARDS SECTION - OPTIMIZED FOR PERFORMANCE
 * - Uses only transform properties (no width/gap)
 * - GPU-accelerated with force3D
 * - Reduced scrub value for better responsiveness
 *************************************************/
const cards = gsap.utils.toArray(".card");
const container = document.querySelector(".cards");

if (container && cards.length > 0) {
  // Force GPU acceleration
  gsap.set(container, { force3D: true });
  gsap.set(cards, { force3D: true });

  const cardsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".cards-section",
      start: "top top",
      end: "+=100vh",
      scrub: 0.5,
      pin: ".sticky-wrapper",
      anticipatePin: 1,
      fastScrollEnd: true,
      preventOverlaps: true
    }
  });

  cardsTimeline
    .fromTo(container,
      { yPercent: 100, scale: 1 },
      { yPercent: 0, scale: 0.85, ease: "none" },
      0
    )
    .to(cards, {
      rotationY: 180,
      stagger: { each: 0.05 },
      ease: "none"
    }, 0.5);
}

/*************************************************
 * FAQ ACCORDION
 *************************************************/
const faqHeader = document.querySelector('.faq-header');
const faqItems = document.querySelectorAll('.faq-item');

// Batch animate FAQ section for better performance
if (faqHeader && faqItems.length > 0) {
  const faqTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".faq-section",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true
    }
  });

  faqTimeline
    .from(faqHeader, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(faqItems, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");
}

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');

  // Set initial state with GPU acceleration
  gsap.set(answer, {
    height: 0,
    opacity: 0,
    force3D: true
  });

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all other items with smooth animation
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');

        gsap.to(otherAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });

        gsap.to(otherIcon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut"
        });

        otherItem.classList.remove('active');
      }
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add('active');

      gsap.to(answer, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        force3D: true
      });

      gsap.to(icon, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
        force3D: true
      });
    } else {
      item.classList.remove('active');

      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        force3D: true
      });

      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
        force3D: true
      });
    }
  });
});

/*************************************************
 * FOOTER ANIMATIONS
 *************************************************/
const footerBrand = document.querySelector('.footer-brand');
const footerColumns = document.querySelectorAll('.footer-column');
const footerBottom = document.querySelector('.footer-bottom');

// Batch animate footer for better performance
if (footerBrand && footerColumns.length > 0 && footerBottom) {
  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "top 85%",
      toggleActions: "play none none none",
      once: true
    }
  });

  footerTimeline
    .from(footerBrand, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(footerColumns, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5")
    .from(footerBottom, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");
}

// Social icons hover handled by CSS for better performance

/*************************************************
 * SERVICE DETAIL PAGE NAVIGATION
 *************************************************/
const clickableSections = document.querySelectorAll('.clickable-section');

// Add click event listeners to all clickable sections
clickableSections.forEach(section => {
  section.addEventListener('click', () => {
    const serviceType = section.getAttribute('data-service');
    window.location.href = `service-detail.html?service=${serviceType}`;
  });
});
