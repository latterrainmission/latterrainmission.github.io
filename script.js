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

  // Sample data - Replace with Python backend data
  const eventsData = {
    "2024": {
      "June": {
        "15": [
          {
            title: "Youth Conference",
            time: "9:00 AM - 4:00 PM",
            venue: "Main Hall",
            description: "Annual youth gathering with workshops and worship"
          }
        ],
        "22": [
          {
            title: "Bible Study",
            time: "6:00 PM - 7:30 PM",
            venue: "Room 5",
            description: "Study of the Book of Romans"
          }
        ]
      },
      "July": {
        "7": [
          {
            title: "Sunday Service",
            time: "10:00 AM - 12:00 PM",
            venue: "Sanctuary",
            description: "Regular Sunday worship service"
          }
        ]
      }
    },
    "2025": {
      "January": {
        "12": [
          {
            title: "New Year Service",
            time: "10:00 AM - 1:00 PM",
            venue: "Sanctuary",
            description: "First service of the new year"
          }
        ]
      }
    }
  };

  // DOM Elements
  const views = {
    currentYear: document.getElementById('current-year-events'),
    yearCalendar: document.getElementById('year-calendar-view'),
    monthDetails: document.getElementById('month-details-view'),
    eventDetails: document.getElementById('event-details-view')
  };

  const yearDisplay = document.getElementById('displayed-year');
  const monthNameDisplay = document.getElementById('month-name');
  const eventTitle = document.getElementById('event-title');
  const eventDate = document.getElementById('event-date');
  const eventTime = document.getElementById('event-time');
  const eventVenue = document.getElementById('event-venue');
  const eventDescription = document.getElementById('event-description');

  let currentYear = new Date().getFullYear();
  let currentMonth = '';
  
  // Initialize
  renderCurrentYearEvents();
  renderYearCalendar(currentYear);

  // Event Listeners
  document.getElementById('show-calendar-btn').addEventListener('click', () => {
    switchView(views.currentYear, views.yearCalendar);
  });

  document.getElementById('prev-year').addEventListener('click', () => {
    currentYear--;
    renderYearCalendar(currentYear);
  });

  document.getElementById('next-year').addEventListener('click', () => {
    currentYear++;
    renderYearCalendar(currentYear);
  });

  document.getElementById('back-to-calendar').addEventListener('click', () => {
    switchView(views.monthDetails, views.yearCalendar);
  });

  document.getElementById('back-to-month').addEventListener('click', () => {
    switchView(views.eventDetails, views.monthDetails);
  });

  // Functions
  function switchView(fromView, toView) {
    fromView.classList.remove('active-view');
    setTimeout(() => {
      toView.classList.add('active-view');
    }, 300);
  }

  function renderCurrentYearEvents() {
    const eventsList = document.querySelector('.events-list');
    eventsList.innerHTML = '';
    
    const yearEvents = eventsData[currentYear] || {};
    let hasEvents = false;
    
    for (const month in yearEvents) {
      for (const day in yearEvents[month]) {
        yearEvents[month][day].forEach(event => {
          hasEvents = true;
          const eventElement = document.createElement('div');
          eventElement.className = 'event-item';
          eventElement.innerHTML = `
            <h4>${event.title}</h4>
            <p>${month} ${day}, ${currentYear} • ${event.time}</p>
            <p>${event.venue}</p>
          `;
          eventElement.addEventListener('click', () => {
            displayEventDetails(event, `${month} ${day}, ${currentYear}`);
            switchView(views.currentYear, views.eventDetails);
          });
          eventsList.appendChild(eventElement);
        });
      }
    }
    
    if (!hasEvents) {
      eventsList.innerHTML = '<p>No upcoming events scheduled for this year.</p>';
    }
  }

  function renderYearCalendar(year) {
    yearDisplay.textContent = year;
    const monthsGrid = document.querySelector('.months-grid');
    monthsGrid.innerHTML = '';
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    months.forEach(month => {
      const monthCell = document.createElement('div');
      monthCell.className = 'month-cell';
      monthCell.textContent = month;
      
      if (eventsData[year] && eventsData[year][month]) {
        monthCell.classList.add('has-events');
      }
      
      monthCell.addEventListener('click', () => {
        currentMonth = month;
        monthNameDisplay.textContent = `${month} ${year}`;
        renderMonthDetails(year, month);
        switchView(views.yearCalendar, views.monthDetails);
      });
      
      monthsGrid.appendChild(monthCell);
    });
  }

  function renderMonthDetails(year, month) {
    const daysGrid = document.querySelector('.days-grid');
    daysGrid.innerHTML = '';
    
    // Create day cells (simplified - would need proper date logic)
    for (let i = 1; i <= 31; i++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'day-cell';
      dayCell.textContent = i;
      
      if (eventsData[year] && eventsData[year][month] && eventsData[year][month][i]) {
        dayCell.classList.add('has-events');
        dayCell.addEventListener('click', () => {
          displayEventDetails(
            eventsData[year][month][i][0], 
            `${month} ${i}, ${year}`
          );
          switchView(views.monthDetails, views.eventDetails);
        });
      }
      
      daysGrid.appendChild(dayCell);
    }
  }

  function displayEventDetails(event, dateString) {
    eventTitle.textContent = event.title;
    eventDate.textContent = dateString;
    eventTime.textContent = event.time;
    eventVenue.textContent = event.venue;
    eventDescription.textContent = event.description;
  }




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