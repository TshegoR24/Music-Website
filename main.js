// Loading Screen
const loadingScreen = document.getElementById("loading-screen");

window.addEventListener("load", () => {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 1500);
});

// Navigation Menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Back to Top Button
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced ScrollReveal animations
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: "1000",
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".header__stats", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".genre__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".feature__image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".feature__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".feature__list li", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500,
});

// Enhanced Swiper configuration
const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Interactive genre cards
document.querySelectorAll('.genre__card').forEach(card => {
  card.addEventListener('click', function() {
    const genre = this.querySelector('h4').textContent;
    console.log(`Selected genre: ${genre}`);
    // Add your genre selection logic here
  });
});

// Feature cards interaction
document.querySelectorAll('.feature__card').forEach(card => {
  card.addEventListener('click', function() {
    const featureNumber = this.querySelector('span').textContent;
    const featureTitle = this.querySelector('h4').textContent;
    console.log(`Feature ${featureNumber}: ${featureTitle}`);
    // Add your feature interaction logic here
  });
});

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Performance optimization: Intersection Observer for lazy loading
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.genre__card, .feature__card, .client__card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('open');
    menuBtnIcon.setAttribute('class', 'ri-menu-line');
  }
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Analytics tracking (example)
function trackEvent(eventName, eventData = {}) {
  console.log(`Event: ${eventName}`, eventData);
  // Add your analytics tracking code here
}

// Track user interactions
document.addEventListener('click', (e) => {
  if (e.target.closest('.genre__card')) {
    const genre = e.target.closest('.genre__card').querySelector('h4').textContent;
    trackEvent('genre_selected', { genre });
  }
  
  if (e.target.closest('.btn')) {
    const buttonText = e.target.closest('.btn').textContent.trim();
    trackEvent('button_clicked', { button: buttonText });
  }
});

// Performance monitoring
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
  lastScrollTop = scrollTop;
  
  // Track scroll behavior
  if (scrollTop > 1000 && scrollDirection === 'down') {
    trackEvent('deep_scroll', { position: scrollTop });
  }
});

console.log('Musikalis website enhanced with improved functionality!');