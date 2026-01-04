/* Portfolio Script - Interactive animations and interactions */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // Reveal on Scroll Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll('.reveal-fade, .timeline-item, .edu-item, .stat');
  revealElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Skill bars animation on scroll
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.transition = 'width 1.2s ease-out';
          entry.target.style.width = width;
        }, 100);
        skillsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillFills.forEach(fill => {
    skillsObserver.observe(fill);
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
  });

  // Contact form validation and feedback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const inputs = this.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#e74c3c';
          setTimeout(() => {
            input.style.borderColor = '';
          }, 2000);
        }
      });

      if (isValid) {
        // Show success message
        const originalText = this.querySelector('button').textContent;
        this.querySelector('button').textContent = '✓ Message envoyé!';
        this.querySelector('button').style.background = '#27ae60';
        
        setTimeout(() => {
          this.reset();
          this.querySelector('button').textContent = originalText;
          this.querySelector('button').style.background = '';
        }, 2000);
      }
    });
  }

  // Animated counter for stats (optional enhancement)
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  }

  // Activate counters when stats section is visible
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const statNumbers = entry.target.querySelectorAll('.stat h4');
        statNumbers.forEach(stat => {
          const num = parseInt(stat.textContent);
          if (!isNaN(num)) {
            animateCounter(stat, num);
            entry.target.dataset.animated = 'true';
          }
        });
      }
    });
  }, observerOptions);

  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    statsObserver.observe(aboutSection);
  }

  // Parallax effect on scroll (subtle)
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero-visual');
    if (hero) {
      hero.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
  });

  // Active nav link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.style.color = 'var(--primary)';
      } else {
        link.style.color = '';
      }
    });
  });

  // Add initial animation delays to staggered elements
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    if (!item.style.animationDelay) {
      item.style.animationDelay = `${index * 0.1}s`;
    }
  });

  const eduItems = document.querySelectorAll('.edu-item');
  eduItems.forEach((item, index) => {
    if (!item.style.animationDelay) {
      item.style.animationDelay = `${index * 0.1}s`;
    }
  });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
  const nav = document.querySelector('.nav');
  if (window.innerWidth > 768 && nav) {
    nav.classList.remove('active');
  }
});
