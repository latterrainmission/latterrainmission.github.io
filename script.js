document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Scroll animation for sections
  const sections = document.querySelectorAll('.section, .content-section');
  
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Only remove if you want sections to hide when scrolling away
          entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Wave animation for hero title
  const title = document.querySelector('.hero-content h1');
  if (title) {
    const text = title.textContent;
    title.innerHTML = '';
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${i * 0.08}s`;
      title.appendChild(span);
    });
  }

  // Responsive navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      document.querySelector('.nav-links').classList.toggle('active');
    });

    // Close navigation on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.remove('active');
      });
    });
  }

  // Back to top button functionality
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Show back to top button on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
  }

  // Dark mode toggle functionality
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      this.classList.toggle('active');
      const mode = document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';
      console.log(`Switched to ${mode}`);
    });

    // Initialize dark mode based on user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
      darkModeToggle.classList.add('active');
    }
  }

  // Initialize tooltips
  document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseover', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.innerText = tooltipText;
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    });

    element.addEventListener('mouseout', function() {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });

  // Scroll tracking for navigation highlights
  const navLinks = document.querySelectorAll('.nav-links a');
  if (navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      const fromTop = window.scrollY;
      navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section) {
          if (
            section.offsetTop <= fromTop + 100 &&
            section.offsetTop + section.offsetHeight > fromTop + 100
          ) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }
});