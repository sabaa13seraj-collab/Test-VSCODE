const serviceData = {
  drone: {
    title: "Drone Solutions",
    description: "Advanced aerial surveillance and monitoring systems equipped with cutting-edge technology for security, reconnaissance, and data collection operations.",
    image: "url('https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800')",
    features: [
      "4K Ultra HD Camera",
      "Real-time Video Streaming",
      "GPS Navigation & Waypoint Planning",
      "Obstacle Avoidance System",
      "Long Flight Duration (45+ minutes)",
      "Thermal Imaging Capability"
    ],
    specs: {
      "Range": "10 km",
      "Max Speed": "72 km/h",
      "Weight": "2.5 kg",
      "Camera": "4K 60fps"
    }
  },
  camera: {
    title: "Surveillance Camera Systems",
    description: "Professional-grade surveillance camera systems with advanced AI-powered analytics, facial recognition, and 24/7 monitoring capabilities for comprehensive security coverage.",
    image: "url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800')",
    features: [
      "AI-Powered Object Detection",
      "Facial Recognition Technology",
      "Night Vision & Infrared",
      "360° Pan-Tilt-Zoom",
      "Cloud Storage Integration",
      "Motion Detection Alerts"
    ],
    specs: {
      "Resolution": "4K Ultra HD",
      "Storage": "Cloud + Local",
      "Field of View": "360°",
      "Night Vision": "Up to 50m"
    }
  },
  "mobile-robotics": {
    title: "Mobile Robotics",
    description: "Autonomous mobile robots designed for security patrols, inspection tasks, and hazardous environment operations with advanced navigation and sensing capabilities.",
    image: "url('https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800')",
    features: [
      "Autonomous Navigation",
      "360° Environmental Sensing",
      "Obstacle Avoidance AI",
      "Remote Control Capability",
      "Multi-Terrain Operation",
      "Real-time Data Transmission"
    ],
    specs: {
      "Speed": "15 km/h",
      "Battery Life": "8 hours",
      "Payload": "50 kg",
      "Sensors": "LiDAR + Camera"
    }
  },
  it: {
    title: "Information Technology Solutions",
    description: "Comprehensive IT infrastructure and software solutions including network security, cloud computing, system integration, and enterprise application development for modern businesses.",
    image: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800')",
    features: [
      "Cloud Infrastructure Management",
      "Enterprise Software Development",
      "Network Architecture Design",
      "Database Management Systems",
      "System Integration Services",
      "24/7 Technical Support"
    ],
    specs: {
      "Deployment": "Cloud/On-Premise",
      "Scalability": "Enterprise-Grade",
      "Support": "24/7",
      "Uptime": "99.9%"
    }
  },
  cybersecurity: {
    title: "Cybersecurity Solutions",
    description: "Advanced cybersecurity services protecting your digital assets with threat detection, vulnerability assessment, penetration testing, and comprehensive security audits.",
    image: "url('https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800')",
    features: [
      "Threat Detection & Prevention",
      "Penetration Testing",
      "Security Audits & Compliance",
      "Firewall & Intrusion Detection",
      "Data Encryption Services",
      "Incident Response Team"
    ],
    specs: {
      "Protection": "Multi-layered",
      "Response Time": "< 15 min",
      "Compliance": "ISO 27001",
      "Coverage": "24/7"
    }
  }
};

// Get service type from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const serviceType = urlParams.get('service');

if (serviceType && serviceData[serviceType]) {
  const service = serviceData[serviceType];

  // Populate content
  document.getElementById('serviceTitle').textContent = service.title;
  document.getElementById('serviceDescription').textContent = service.description;
  document.getElementById('serviceImage').style.backgroundImage = service.image;

  // Populate features
  const featureList = document.getElementById('featureList');
  featureList.innerHTML = service.features.map(feature => `<li>${feature}</li>`).join('');

  // Populate specs
  const specsGrid = document.getElementById('specsGrid');
  specsGrid.innerHTML = Object.entries(service.specs)
    .map(([key, value]) => `<div><strong>${key}</strong><span>${value}</span></div>`)
    .join('');

  // Animate content on load
  window.addEventListener('load', () => {
    gsap.to('.detail-left', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.to('.detail-right', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.4
    });
  });
} else {
  // Redirect to home if no valid service
  window.location.href = 'index.html';
}

// Navbar toggle
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
