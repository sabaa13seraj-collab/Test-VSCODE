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

/*************************************************
 * DRONE MODEL MOUSE FOLLOW
 *************************************************/
const droneModel = document.querySelector('.drone-model');
const droneContainer = document.querySelector('.project-3d-container');

if (droneModel && droneContainer) {
  let targetOrbitX = 0;
  let targetOrbitY = 90;
  let currentOrbitX = 0;
  let currentOrbitY = 90;
  let isAnimating = false;

  // Make drone follow mouse position
  window.addEventListener('mousemove', (e) => {
    // Calculate mouse position as percentage (-1 to 1)
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

    // Map to rotation angles for camera orbit
    targetOrbitX = mouseX * -50;
    targetOrbitY = 90 - mouseY * 10;

    // Animate drone position to follow mouse with GSAP
    gsap.to(droneContainer, {
      duration: 10,
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    // Start camera rotation animation loop if not already running
    if (!isAnimating) {
      isAnimating = true;
      animateDroneRotation();
    }
  });

  // Smooth animation loop for drone rotation
  function animateDroneRotation() {
    currentOrbitX += (targetOrbitX - currentOrbitX) * 0.1;
    currentOrbitY += (targetOrbitY - currentOrbitY) * 0.1;
    droneModel.cameraOrbit = `${currentOrbitX}deg ${currentOrbitY}deg 105%`;
    requestAnimationFrame(animateDroneRotation);
  }
}


/*************************************************
 * Mobile Robotics Model Scroll Animation
 *************************************************/
const roboticsContainer = document.querySelector('.robotics-3d-container');
const stickySection = document.querySelector('.sticky-section');

if (roboticsContainer && stickySection) {
  // Move model 500px to the right on scroll
  gsap.to('.robotics-3d-container', {
    x: 500,
    ease: 'none',
    scrollTrigger: {
      trigger: '.sticky-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: false,
      onLeave: () => {
        // Hide the model when leaving the sticky section
        gsap.to('.robotics-3d-container', { opacity: 0, duration: 0.3 });
      },
      onEnterBack: () => {
        // Show the model when scrolling back
        gsap.to('.robotics-3d-container', { opacity: 1, duration: 0.3 });
      }
    }
  });
}
