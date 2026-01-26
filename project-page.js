/*************************************************
 * MOBILE MENU TOGGLE
 *************************************************/
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.querySelector('.navbar');

function toggleMenu() {
    const isActive = mobileMenu.classList.contains('active');

    if (isActive) {
        // Closing
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        navbar.classList.remove('menu-active');
        document.body.classList.remove('menu-open');
    } else {
        // Opening
        mobileMenu.classList.add('active');
        menuBtn.classList.add('active');
        navbar.classList.add('menu-active');
        document.body.classList.add('menu-open');
    }
}

menuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        navbar.classList.remove('menu-active');
        document.body.classList.remove('menu-open');
    });
});

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
});

/*************************************************
 * PROJECT PAGE ANIMATIONS
 *************************************************/
gsap.registerPlugin(ScrollTrigger);

// Animate hero title on load
window.addEventListener('load', () => {
  gsap.to('.project-hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
  });

  // Animate project info
  gsap.from('.project-info', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.project-info',
      start: 'top 80%'
    }
  });

  // Animate feature items
  gsap.from('.feature-item', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 80%'
    }
  });

  // Animate spec cards
  gsap.from('.spec-card', {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.specs-grid',
      start: 'top 80%'
    }
  });
});
