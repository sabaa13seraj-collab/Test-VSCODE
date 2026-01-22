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

/*************************************************
 * FAQ ACCORDION
 *************************************************/
const faqHeader = document.querySelector('.faq-header');
const faqItems = document.querySelectorAll('.faq-item');

// Animate FAQ header on scroll
if (faqHeader) {
  gsap.from(faqHeader, {
    scrollTrigger: {
      trigger: faqHeader,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out"
  });
}

// Animate FAQ items on scroll
faqItems.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      end: "top 60%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out"
  });
});

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');

  // Set initial state
  gsap.set(answer, { height: 0, opacity: 0 });

  // Smooth hover effect
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
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
        duration: 0.5,
        ease: "power3.out"
      });

      // Animate the paragraph inside
      gsap.from(answer.querySelector('p'), {
        y: -10,
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power2.out"
      });

      gsap.to(icon, {
        rotation: 45,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    } else {
      item.classList.remove('active');

      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      });

      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut"
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

// Animate footer brand
if (footerBrand) {
  gsap.from(footerBrand, {
    scrollTrigger: {
      trigger: footerBrand,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: "power2.out"
  });
}

// Animate footer columns
footerColumns.forEach((column, index) => {
  gsap.from(column, {
    scrollTrigger: {
      trigger: column,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: index * 0.1,
    ease: "power2.out"
  });
});

// Animate footer bottom
if (footerBottom) {
  gsap.from(footerBottom, {
    scrollTrigger: {
      trigger: footerBottom,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out"
  });
}

// Animate social icons on hover
const socialIcons = document.querySelectorAll('.footer-social a');
socialIcons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    gsap.to(icon, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.5)"
    });
  });

  icon.addEventListener('mouseleave', () => {
    gsap.to(icon, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});
