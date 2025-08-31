// Modern JavaScript for FACE Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeMobileMenu();
    initializeNavbarScroll();
    initializeTypingEffect();
    initializeCountdownTimer();
    initializeAnimations();
    initializeFormHandlers();
});

// Typing effect for hero title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = ['Workshops.', 'Hackathons.', 'Tech Talks.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentWord = words[wordIndex];
            let typeSpeed = isDeleting ? 60 : 120;

            if (isDeleting) {
                // Deleting effect
                heroTitle.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing effect
                heroTitle.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Handle word transitions
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeWriter, 1000);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

// Countdown timer for featured event
function initializeCountdownTimer() {
    const timerItems = {
        days: document.querySelector('.timer-item:nth-child(1) .timer-number'),
        hours: document.querySelector('.timer-item:nth-child(2) .timer-number'),
        minutes: document.querySelector('.timer-item:nth-child(3) .timer-number'),
    };
    
    if (timerItems.days && timerItems.hours && timerItems.minutes) {
        const targetDate = new Date('2025-01-18T00:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                timerItems.days.textContent = String(days).padStart(2, '0');
                timerItems.hours.textContent = String(hours).padStart(2, '0');
                timerItems.minutes.textContent = String(minutes).padStart(2, '0');
            } else {
                timerItems.days.textContent = '00';
                timerItems.hours.textContent = '00';
                timerItems.minutes.textContent = '00';
                clearInterval(countdownInterval);
            }
        }
        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 60000);
    }
}

// Animations on scroll
function initializeAnimations() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elementsToAnimate = document.querySelectorAll('.card, .timeline-content, .section-header');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Form handlers
function initializeFormHandlers() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (validateEmail(emailInput.value)) {
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}


// Utility functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}