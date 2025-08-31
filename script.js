// Modern JavaScript for FACE Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    initializeMobileMenu();
    initializeNavbarScroll();
    initializeTypingEffect();
    initializeAnimations();

    // Initialize page-specific live backgrounds
    if (document.getElementById('live-background')) {
        initializeHomepageBackground();
    }
    const subtleBackgroundPages = ['about-background', 'events-background', 'team-background', 'contact-background', 'credits-background'];
    subtleBackgroundPages.forEach(id => {
        if (document.getElementById(id)) {
            initializeSubtleBackground(id);
        }
    });
});

// Digital Rain background for the homepage (slowed down)
function initializeHomepageBackground() {
    const canvas = document.getElementById('live-background');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let columns;
    let drops;
    const fontSize = 16;
    const characters = '01{}[]()<>/*|&=?!:;,.^%$_';

    // Time-based animation control for speed
    const fps = 16; // Increased from 8 to 16 for a faster effect
    const fpsInterval = 1000 / fps;
    let then = 0;

    const setup = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        then = Date.now();
        animate();
    };

    const draw = () => {
        // Slower fade by reducing the alpha value
        ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(0, 191, 255, 0.7)'; // Themed color
        ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const now = Date.now();
        const elapsed = now - then;

        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            draw();
        }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setup, 250);
    });

    setup();
}


// "Fluid Light" background for secondary pages
function initializeSubtleBackground(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // A pure, soft white for the blob
    const blobColor = 'rgba(255, 255, 255, 0.8)';

    let orbs = [];
    const numOrbs = 5; // More, medium-sized orbs
    const baseSpeed = 0.5; // A bit more movement

    class Orb {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Medium radius for a balanced, fluid feel
            this.radius = Math.random() * 100 + 100; // Radius between 100 and 200
            this.vx = (Math.random() - 0.5) * baseSpeed;
            this.vy = (Math.random() - 0.5) * baseSpeed;
            this.color = blobColor;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Make them bounce off the walls gently
            if (this.x - this.radius < 0) {
                this.x = this.radius;
                this.vx *= -1;
            }
            if (this.x + this.radius > canvas.width) {
                this.x = canvas.width - this.radius;
                this.vx *= -1;
            }
            if (this.y - this.radius < 0) {
                this.y = this.radius;
                this.vy *= -1;
            }
            if (this.y + this.radius > canvas.height) {
                this.y = canvas.height - this.radius;
                this.vy *= -1;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const setup = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        orbs = [];
        for (let i = 0; i < numOrbs; i++) {
            orbs.push(new Orb());
        }
        
        animate();
    };

    const animate = () => {
        // Use the primary dark background color
        ctx.fillStyle = 'rgb(10, 10, 26)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Adjusted blur for medium orbs
        ctx.filter = 'blur(60px) contrast(20)';

        orbs.forEach(orb => {
            orb.update();
            orb.draw();
        });

        // Reset filter to not affect other elements if canvas isn't full screen
        ctx.filter = 'none';

        animationFrameId = requestAnimationFrame(animate);
    };

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setup, 250);
    });

    setup();
}


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
                heroTitle.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
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
        
        const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
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
    handleScroll();
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

    const elementsToAnimate = document.querySelectorAll('.card, .section-header');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}