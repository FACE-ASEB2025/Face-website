// Modern JavaScript for FACE Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    initializeMobileMenu();
    initializeNavbarScroll();
    initializeTypingEffect();
    initializeAnimations();

    // Initialize page-specific live backgrounds
    const homeCanvas = document.getElementById('home-background');
    const pageCanvas = document.getElementById('page-background');

    if (homeCanvas) {
        runDigitalRainAnimation(homeCanvas);
    } else if (pageCanvas) {
        runCircuitAnimation(pageCanvas);
    }
});


// "Digital Rain" background for the homepage
function runDigitalRainAnimation(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let columns;
    let drops;
    const fontSize = 16;
    const characters = '01{}[]()<>/*|&=?!:;,.^%$_';

    const fps = 20;
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
        
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        then = Date.now();
        animate();
    };

    const draw = () => {
        // Keep background fade subtle
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Brighter characters, no semi-transparency
        ctx.fillStyle = 'rgb(80, 200, 255)';
        ctx.font = `${fontSize}px 'Roboto Mono', monospace`;

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
    window.addEventListener('resize', setup);
    setup();
}


// "Binary Stream" background for secondary pages
function runCircuitAnimation(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    let animationFrameId;

    class BinaryParticle {
        constructor(w, h) {
            this.respawn(w, h);
        }

        respawn(w, h) {
            this.x = (Math.random() - 0.5) * w;
            this.y = (Math.random() - 0.5) * h;
            this.z = Math.random() * w;
            this.char = Math.random() > 0.5 ? '1' : '0';
            this.vz = Math.random() * 2 + 1;
        }
        
        update(w, h) {
            this.z -= this.vz;
            if (this.z < 1) {
                this.respawn(w, h);
            }
        }

        draw(ctx, w, h) {
            const fov = w * 0.5;
            const scale = fov / (fov + this.z);
            const sx = this.x * scale + w / 2;
            const sy = this.y * scale + h / 2;

            if (sx < 0 || sx > w || sy < 0 || sy > h) {
                return;
            }
            
            const fontSize = Math.max(1, scale * 20);
            const opacity = (1 - this.z / w) * 0.8;

            ctx.font = `${fontSize}px 'Roboto Mono', monospace`;
            ctx.fillStyle = `rgba(40, 80, 160, ${opacity})`;
            ctx.shadowColor = `rgba(40, 80, 160, 0.8)`;
            ctx.shadowBlur = 10;
            ctx.fillText(this.char, sx, sy);
        }
    }

    let particles = [];
    
    const setup = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        particles = [];
        const numParticles = Math.floor((canvas.width * canvas.height) / 5000);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new BinaryParticle(canvas.width, canvas.height));
        }

        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animate();
    };

    const drawBackgroundCircuit = (ctx, w, h) => {
        ctx.strokeStyle = "rgba(40, 80, 160, 0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let i=0; i < 20; i++) {
            const x1 = Math.random() * w;
            const y1 = Math.random() * h;
            const x2 = Math.random() * w;
            const y2 = Math.random() * h;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        }
        ctx.stroke();
    };

    const animate = () => {
        const w = canvas.width;
        const h = canvas.height;
        
        ctx.fillStyle = 'rgba(8, 20, 25, 0.25)'; // Dark teal with trail effect
        ctx.fillRect(0, 0, w, h);
        
        ctx.save();
        drawBackgroundCircuit(ctx, w, h);
        ctx.restore();

        ctx.save();
        particles.forEach(p => {
            p.update(w, h);
            p.draw(ctx, w, h);
        });
        ctx.restore();

        animationFrameId = requestAnimationFrame(animate);
    };
  
    window.addEventListener('resize', setup);
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

    const elementsToAnimate = document.querySelectorAll('.card, .section-header, .featured-event-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}