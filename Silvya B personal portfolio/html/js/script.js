// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Check if elements exist before proceeding
if (hamburger && navLinks) {
    function toggleMenu() {
        // Toggle the show class on nav-links
        navLinks.classList.toggle('show');
        
        // Toggle the active class on hamburger
        hamburger.classList.toggle('active');
        
        // Toggle the menu-open class on body
        body.classList.toggle('menu-open');
        
        // Animate menu items
        const menuItems = navLinks.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            if (navLinks.classList.contains('show')) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            }
        });
        
        // Adjust hero section position when menu is open
        const hero = document.querySelector('.hero');
        if (hero) {
            if (navLinks.classList.contains('show')) {
                hero.style.marginTop = navLinks.offsetHeight + 'px';
            } else {
                hero.style.marginTop = '0';
            }
        }
    }

    // Event handler functions
    const handleHamburgerClick = (e) => {
        e.stopPropagation();
        toggleMenu();
    };

    const handleDocumentClick = (e) => {
        if (navLinks.classList.contains('show') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    };

    const handleResize = () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
            toggleMenu();
        }
    };

    // Add event listeners
    hamburger.addEventListener('click', handleHamburgerClick);
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('resize', handleResize);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    // Ensure menu is closed when page loads on mobile
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Reset menu items
            const menuItems = navLinks.querySelectorAll('li');
            menuItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            });
            
            // Reset hero section position
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.marginTop = '0';
            }
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
        
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
}

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const showError = (input, message) => {
        clearError(input); // Clear any existing error first
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    };

    const clearError = (input) => {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    };

    const validateInput = (input) => {
        const value = input.value.trim();
        
        if (!value) {
            showError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'email' && !isValidEmail(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        
        if (input.id === 'message' && value.length < 10) {
            showError(input, 'Message must be at least 10 characters long');
            return false;
        }
        
        clearError(input);
        return true;
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // Validate all inputs
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Here you would typically send the form data to a server
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitButton.textContent = 'Message Sent!';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        } catch (error) {
            console.error('Form submission error:', error);
            submitButton.textContent = 'Error Sending Message';
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        }
    });

    // Add real-time validation
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
}

// Intersection Observer for Fade-in Animations
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Project Image Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.project-overlay');
        overlay.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.project-overlay');
        overlay.style.opacity = '0';
    });
}); 
// Particle System
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
        
        const baseColor = '155, 107, 158';
        this.color = `rgba(${baseColor}, ${this.opacity})`;
        this.shineColor = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        this.glowSize = this.size * 1.5;
    }

    update(mouseX, mouseY) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouseX && mouseY) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                this.x -= Math.cos(angle) * force * 1;
                this.y -= Math.sin(angle) * force * 1;
            }
        }

        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;

        this.pulseOffset += this.pulseSpeed;
        this.currentOpacity = this.opacity * (0.5 + Math.sin(this.pulseOffset) * 0.5);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `, ${this.currentOpacity * 0.2})`);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `, ${this.currentOpacity})`);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
            this.x - this.size * 0.3,
            this.y - this.size * 0.3,
            this.size * 0.4,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = this.shineColor.replace(')', `, ${this.currentOpacity * 0.3})`);
        ctx.fill();
    }
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = null;
let mouseY = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initParticles() {
    const particleCount = Math.floor((canvas.width * canvas.height) / 4000);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.sort((a, b) => a.size - b.size);
    
    particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
});

resizeCanvas();
initParticles();
animate();

// Section-specific particle system
class SectionParticle {
    constructor(canvas, section) {
        this.canvas = canvas;
        this.section = section;
        this.reset();
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
        
        // Colors based on section
        const colors = {
            project: ['248, 229, 229', '255, 192, 203', '255, 240, 245'],
            contact: ['248, 229, 229', '255, 228, 225', '255, 240, 245']
        };
        
        const sectionType = section.classList.contains('project-particles') ? 'project' : 'contact';
        const colorPalette = colors[sectionType];
        const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        this.color = `rgba(${baseColor}, ${this.opacity})`;
        this.shineColor = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        this.glowSize = this.size * 1.5;
    }

    reset() {
        const rect = this.section.getBoundingClientRect();
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }

    update(mouseX, mouseY) {
        const rect = this.section.getBoundingClientRect();
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        if (mouseX && mouseY) {
            const dx = mouseX - (rect.left + this.x);
            const dy = mouseY - (rect.top + this.y);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100;
                this.x -= Math.cos(angle) * force * 1;
                this.y -= Math.sin(angle) * force * 1;
            }
        }

        // Bounce off section boundaries
        if (this.x < 0 || this.x > rect.width) this.speedX *= -1;
        if (this.y < 0 || this.y > rect.height) this.speedY *= -1;

        // Update pulse
        this.pulseOffset += this.pulseSpeed;
        this.currentOpacity = this.opacity * (0.5 + Math.sin(this.pulseOffset) * 0.5);
    }

    draw(ctx) {
        // Draw glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `, ${this.currentOpacity * 0.2})`);
        ctx.fill();

        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `, ${this.currentOpacity})`);
        ctx.fill();

        // Draw shine
        ctx.beginPath();
        ctx.arc(
            this.x - this.size * 0.3,
            this.y - this.size * 0.3,
            this.size * 0.4,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = this.shineColor.replace(')', `, ${this.currentOpacity * 0.3})`);
        ctx.fill();
    }
}

// Initialize section-specific particle systems
const sections = document.querySelectorAll('.particle-container');
const particleSystems = new Map();

sections.forEach(section => {
    const canvas = section;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = null;
    let mouseY = null;

    function resizeCanvas() {
        const rect = section.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    function initParticles() {
        const rect = section.parentElement.getBoundingClientRect();
        const particleCount = Math.floor((rect.width * rect.height) / 4000);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new SectionParticle(canvas, section));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.sort((a, b) => a.size - b.size);
        
        particles.forEach(particle => {
            particle.update(mouseX, mouseY);
            particle.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    // Event Listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    window.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        } else {
            mouseX = null;
            mouseY = null;
        }
    });

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    particleSystems.set(section, { particles, resizeCanvas, initParticles });
});

// Existing GSAP animations
// ... existing GSAP code ...