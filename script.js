// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Current year for copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    // Create animated tech background elements
    createTechBackground();

    // Typewriter effect for rotating text
    const rotatingText = document.querySelector('.rotating-text');
    const phrases = ['AI Engineer.', 'ML Enthusiast.', 'UI/UX Designer.', 'Problem Solver.'];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isPaused = false;
    let typingSpeed = 100;

    function typeWriter() {
        const phrase = phrases[currentPhrase];
        
        if (isDeleting) {
            rotatingText.textContent = phrase.substring(0, currentChar - 1);
            currentChar--;
            typingSpeed = 50;
        } else {
            rotatingText.textContent = phrase.substring(0, currentChar + 1);
            currentChar++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentChar === phrase.length) {
            // Pause at the end of typing
            isDeleting = true;
            isPaused = true;
            typingSpeed = 1500; // Pause time
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            isPaused = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }

        setTimeout(typeWriter, isPaused ? typingSpeed : typingSpeed + Math.random() * 50);
    }

    // Start the typewriter effect
    typeWriter();

    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Theme toggler
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Default to dark mode for the tech futuristic theme
    if (!body.classList.contains('dark-mode')) {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="ph ph-moon-stars"></i>';
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="ph ph-moon-stars"></i>';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
        }
    });

    // Scroll events
    window.addEventListener('scroll', function() {
        // Header scroll effect
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight active nav item based on scroll position
        highlightNavOnScroll();
        
        // Reveal elements on scroll
        revealOnScroll();
        
        // Parallax effect for tech grid
        parallaxEffect();
    });

    // Parallax effect for tech elements
    function parallaxEffect() {
        const techGrids = document.querySelectorAll('.tech-grid');
        const scrollPos = window.scrollY;
        
        techGrids.forEach(grid => {
            const offset = grid.offsetTop;
            const speed = grid.classList.contains('right') ? 0.2 : 0.1;
            const yPos = (scrollPos - offset) * speed;
            
            if (grid.classList.contains('right')) {
                grid.style.transform = `translateY(${yPos}px)`;
            } else {
                grid.style.transform = `translateY(${-yPos}px)`;
            }
        });
    }

    // Function to highlight navigation items based on scroll position
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === currentSection) {
                item.classList.add('active');
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(contactForm);
            const formEntries = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formEntries);
            
            // Reset form and show success message
            contactForm.reset();
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    // Reveal elements on scroll with tech animation
    function revealOnScroll() {
        const elementsToReveal = document.querySelectorAll('.section-header, .about-content, .projects-grid, .contact-container');
        
        elementsToReveal.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Add neon glow to headers on reveal
                const headers = element.querySelectorAll('.neon-text');
                headers.forEach(header => {
                    header.style.textShadow = 'var(--neon-text-shadow)';
                });
            }
        });
    }

    // Initialize reveal on initial load
    setTimeout(revealOnScroll, 300);

    // Add initial styles for scroll reveal
    const elementsToReveal = document.querySelectorAll('.section-header, .about-content, .projects-grid, .contact-container');
    elementsToReveal.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Create tech background elements
    function createTechBackground() {
        // Generate random tech grid points for background ambiance
        const techLines = document.querySelector('.tech-lines');
        
        // Add additional tech lines for more futuristic ambiance
        for (let i = 0; i < 5; i++) {
            const techLine = document.createElement('div');
            techLine.className = 'tech-line';
            techLine.style.left = `${Math.random() * 100}%`;
            techLine.style.animation = `tech-line-pulse ${8 + Math.random() * 8}s infinite`;
            techLine.style.opacity = `${Math.random() * 0.2 + 0.1}`;
            techLines.appendChild(techLine);
        }
        
        // Create cyber particles
        createCyberParticles();
        
        // Create glitch effect on interval
        setInterval(triggerGlitchEffect, 5000);
    }
    
    // Create cyber particles
    function createCyberParticles() {
        const particlesContainer = document.querySelector('.cyber-particles');
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random initial position
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            
            // Random movement
            const xDistance = (Math.random() - 0.5) * 200;
            const yDistance = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--x-distance', `${xDistance}px`);
            particle.style.setProperty('--y-distance', `${yDistance}px`);
            
            // Random animation duration
            const duration = Math.random() * 10 + 5;
            particle.style.setProperty('--float-duration', `${duration}s`);
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Glitch effect function
    function triggerGlitchEffect() {
        const glitchElements = document.querySelectorAll('.tech-glitch, .neon-text');
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        
        if (randomElement) {
            randomElement.classList.add('glitching');
            setTimeout(() => {
                randomElement.classList.remove('glitching');
            }, 500);
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate tech corners on about section image
    const corners = document.querySelectorAll('.corner');
    setInterval(() => {
        corners.forEach(corner => {
            corner.style.boxShadow = `0 0 ${8 + Math.random() * 5}px var(--primary-glow)`;
        });
    }, 2000);

    // Dynamic Projects Loading
    loadProjects();

    // Project filtering with tech animations
    function setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectCards.forEach(card => {
                    // Get the categories array from the card's dataset
                    const cardCategories = JSON.parse(card.dataset.categories || '[]');
                    
                    // Animate the transition with tech effect
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                            }, 100);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // Load projects from JSON file
    async function loadProjects() {
        try {
            // Show loading indicator
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = `
                <div class="loading-projects">
                    <div class="loading-spinner"></div>
                    <p>Loading projects...</p>
                </div>
            `;
            
            // Load projects from JSON file
            const response = await fetch('assets/data/projects.json');
            
            // Check if the fetch was successful
            if (!response.ok) {
                throw new Error('Failed to load projects data');
            }
            
            const data = await response.json();
            
            // Clear loading indicator
            projectsContainer.innerHTML = '';
            
            // Render projects
            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                // Handle categories safely
                let categories = [];
                
                if (project.categories) {
                    // If categories is already an array
                    categories = Array.isArray(project.categories) ? project.categories : [project.categories];
                } else if (project.category) {
                    // Backward compatibility with projects that use 'category' instead of 'categories'
                    categories = [project.category];
                } else {
                    // Default category if none is specified
                    categories = ['other'];
                }
                
                // Store categories as a JSON string in the dataset for filtering
                projectCard.dataset.categories = JSON.stringify(categories);
                
                // Add category badges for display with safety checks
                const categoryBadges = categories.map(cat => {
                    // Ensure cat is a string and not null/undefined
                    if (cat && typeof cat === 'string') {
                        return `<span class="category-badge ${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`;
                    } else {
                        return '';
                    }
                }).join('');
                
                projectCard.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image || 'assets/placeholder.jpg'}" alt="${project.title || 'Project'}">
                        <div class="project-overlay">
                            <a href="${project.link || '#'}" class="view-project" target="_blank" rel="noopener noreferrer">View Project</a>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${project.title || 'Untitled Project'}</h3>
                        <div class="project-categories neon-text">
                            ${categoryBadges}
                        </div>
                        <p class="project-desc">${project.description || 'No description available'}</p>
                        <div class="project-tags">
                            ${(project.tags || []).map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="card-glow"></div>
                    <div class="card-data-points"></div>
                `;
                
                // Make the whole card clickable
                projectCard.addEventListener('click', function(e) {
                    // Don't trigger if clicking on the view project button (it handles its own navigation)
                    if (!e.target.classList.contains('view-project')) {
                        window.open(project.link || '#', '_blank', 'noopener noreferrer');
                    }
                });
                
                projectsContainer.appendChild(projectCard);
            });
            
            // Generate data points for project cards
            generateDataPoints();
            
            // Setup project card hover effects
            setupProjectCardEffects();
            
            // Setup project filters
            setupProjectFilters();
            
        } catch (error) {
            console.error('Error loading projects:', error);
            document.getElementById('projects-container').innerHTML = `
                <div class="error-container">
                    <div class="error-icon">
                        <i class="ph ph-warning"></i>
                    </div>
                    <h3 class="neon-text">Oops! Could not load projects</h3>
                    <p>There was a problem loading the project data. Please try again later.</p>
                    <button class="btn btn-primary neon-btn retry-btn">
                        <i class="ph ph-arrow-clockwise"></i> Retry
                    </button>
                </div>
            `;
            
            // Add retry functionality
            const retryBtn = document.querySelector('.retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', loadProjects);
            }
        }
    }

    // Generate data points for project cards
    function generateDataPoints() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const dataPointsContainer = card.querySelector('.card-data-points');
            
            for (let i = 0; i < 8; i++) {
                const point = document.createElement('div');
                point.className = 'data-point';
                
                // Random position
                point.style.left = `${Math.random() * 100}%`;
                point.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay
                point.style.animationDelay = `${Math.random() * 2}s`;
                
                dataPointsContainer.appendChild(point);
            }
        });
    }

    // Setup project card hover effects
    function setupProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add cursor pointer to show the card is clickable
            card.style.cursor = 'pointer';
            
            card.addEventListener('mouseenter', function() {
                this.querySelector('.card-glow').style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', function() {
                this.querySelector('.card-glow').style.opacity = '0';
            });
        });
    }

    // Last updated: 2025-04-04 12:30:22
    // User: LyesHADJAR
});

// Add this CSS for the loading spinner and other elements
document.head.insertAdjacentHTML('beforeend', `
<style>
.loading-projects {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 100%;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: var(--spacing-md);
    box-shadow: var(--neon-box-shadow);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.about-profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius-md);
    position: relative;
    z-index: 1;
}

.profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
    border-radius: var(--border-radius-lg);
}

/* Error styling */
.error-container {
    text-align: center;
    padding: var(--spacing-xl);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-md);
    background-color: rgba(35, 35, 45, 0.8);
    box-shadow: var(--box-shadow);
    max-width: 600px;
    margin: 0 auto;
    animation: fadeInUp 0.8s ease;
}

.error-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: var(--spacing-md);
    text-shadow: var(--neon-text-shadow);
}

.error-container h3 {
    margin-bottom: var(--spacing-sm);
}

.error-container p {
    margin-bottom: var(--spacing-md);
    color: var(--text-light);
}

.retry-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
}

.retry-btn i {
    font-size: 1.2em;
}

/* Category badges styling */
.category-badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: var(--border-radius-sm);
    font-size: 0.8rem;
    font-weight: 500;
    margin-right: 5px;
    margin-bottom: 8px;
    text-transform: capitalize;
    background: rgba(157, 0, 255, 0.15);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    box-shadow: 0 0 5px var(--primary-glow);
}

.category-badge.development {
    background: rgba(157, 0, 255, 0.15);
    border-color: var(--primary-color);
}

.category-badge.design {
    background: rgba(0, 200, 255, 0.15);
    border-color: #00c8ff;
    color: #00c8ff;
    box-shadow: 0 0 5px rgba(0, 200, 255, 0.5);
}

.project-categories {
    margin-bottom: var(--spacing-xs);
}
</style>
`);