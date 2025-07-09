// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow =
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
  }
});

// Animated counters for stats
function animateCounter(element, start, end, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent =
      value + (end === 900 ? "+" : end === 3.55 ? ".55" : "+");

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Animate counters when stats section is visible
      if (entry.target.querySelector(".about-stats")) {
        const counters = entry.target.querySelectorAll(".stat h3");
        counters.forEach((counter, index) => {
          const values = [900, 3, 5]; // Hours, GPA, Projects
          setTimeout(() => {
            animateCounter(counter, 0, values[index], 2000);
          }, index * 200);
        });
      }
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add animation classes dynamically
const style = document.createElement("style");
style.textContent = `
    .skill-category,
    .project-card,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate .skill-category,
    .animate .project-card,
    .animate .contact-item {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate .skill-category:nth-child(1) { transition-delay: 0.1s; }
    .animate .skill-category:nth-child(2) { transition-delay: 0.2s; }
    .animate .skill-category:nth-child(3) { transition-delay: 0.3s; }
    .animate .skill-category:nth-child(4) { transition-delay: 0.4s; }
    
    .animate .project-card:nth-child(1) { transition-delay: 0.1s; }
    .animate .project-card:nth-child(2) { transition-delay: 0.2s; }
    .animate .project-card:nth-child(3) { transition-delay: 0.3s; }
    
    .animate .contact-item:nth-child(1) { transition-delay: 0.1s; }
    .animate .contact-item:nth-child(2) { transition-delay: 0.2s; }
    .animate .contact-item:nth-child(3) { transition-delay: 0.3s; }
    .animate .contact-item:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple form validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Show success message (in a real application, you would send this to a server)
  alert("Thank you for your message! I will get back to you soon.");

  // Reset form
  this.reset();
});

// Skill items hover effect
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Project cards tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) rotateX(5deg)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotateX(0deg)";
  });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 50);
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-card");

  parallaxElements.forEach((element) => {
    const speed = 0.3;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add CSS for loading animation
const loadingStyle = document.createElement("style");
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .hero-text {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 1s ease forwards;
        animation-delay: 0.5s;
    }
    
    .floating-card {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 1s ease forwards;
        animation-delay: 1s;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(loadingStyle);

// Add scroll-to-top button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll-to-top button
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add hover effects to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

console.log("Portfolio website loaded successfully! 🚀");
