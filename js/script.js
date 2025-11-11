// ==================== //
// Premium Restaurant Website JavaScript
// Cinar Grill - Interactive Features
// ==================== //

// ==================== //
// Initialize GSAP & ScrollTrigger
// ==================== //

gsap.registerPlugin(ScrollTrigger);

// ==================== //
// Mobile Menu Toggle
// ==================== //

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');

    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==================== //
// Navbar Scroll Effect
// ==================== //

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==================== //
// Smooth Scrolling
// ==================== //

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== //
// Active Menu Link Highlighting
// ==================== //

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== //
// Hero Scroll Indicator
// ==================== //

const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ==================== //
// Animated Counter for Stats
// ==================== //

const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// ==================== //
// Menu Filter Functionality
// ==================== //

const filterBtns = document.querySelectorAll('.filter-btn');
const menuCategories = document.querySelectorAll('.menu-category');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        menuCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');

            if (filter === 'all' || filter === categoryType) {
                gsap.to(category, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    display: 'block'
                });
            } else {
                gsap.to(category, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    display: 'none'
                });
            }
        });
    });
});

// ==================== //
// Gallery Filter Functionality
// ==================== //

const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');

            if (filter === 'all' || filter === itemCategory) {
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    delay: index * 0.1,
                    display: 'block'
                });
            } else {
                gsap.to(item, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    display: 'none'
                });
            }
        });
    });
});

// ==================== //
// Testimonials Slider
// ==================== //

const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const testimonialDots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialItems.forEach(item => {
        item.classList.remove('active');
    });

    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show selected testimonial
    testimonialItems[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

if (testimonialNext) {
    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    });
}

if (testimonialPrev) {
    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentTestimonial);
    });
}

// Dots navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-play testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Pause auto-play on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
}

// ==================== //
// Forms Handling
// ==================== //

// Reservation Form
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);

        console.log('Reservation submitted:', data);

        // Show success message
        alert(`Vielen Dank für Ihre Reservierung, ${data.name}!\n\nWir haben Ihre Anfrage für ${data.guests} Person(en) am ${data.date} um ${data.time} Uhr erhalten.\n\nSie erhalten in Kürze eine Bestätigungs-E-Mail an ${data.email}.`);

        // Reset form
        reservationForm.reset();
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Contact form submitted:', data);

        // Show success message
        alert('Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.');

        // Reset form
        contactForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(newsletterForm);
        const email = formData.get('newsletter-email');

        console.log('Newsletter subscription:', email);

        // Show success message
        alert(`Vielen Dank für Ihr Interesse!\n\nSie wurden erfolgreich für unseren Newsletter angemeldet.\n\nEine Bestätigungs-E-Mail wurde an ${email} gesendet.`);

        // Reset form
        newsletterForm.reset();
    });
}

// ==================== //
// Scroll to Top Button
// ==================== //

const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== //
// GSAP Scroll Animations
// ==================== //

// Fade in sections on scroll
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate section headers
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.querySelector('h2'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: header,
            start: 'top 80%'
        }
    });

    gsap.from(header.querySelector('.divider'), {
        width: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
            trigger: header,
            start: 'top 80%'
        }
    });
});

// Animate menu items
gsap.utils.toArray('.menu-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        x: -50,
        duration: 0.6,
        delay: index * 0.05,
        scrollTrigger: {
            trigger: item,
            start: 'top 90%'
        }
    });
});

// Animate gallery items
gsap.utils.toArray('.gallery-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: item,
            start: 'top 90%'
        }
    });
});

// Animate team members
gsap.utils.toArray('.team-member').forEach((member, index) => {
    gsap.from(member, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: member,
            start: 'top 85%'
        }
    });
});

// Animate about features
gsap.utils.toArray('.about-feature-item').forEach((feature, index) => {
    gsap.from(feature, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: feature,
            start: 'top 85%'
        }
    });
});

// Animate hero features
gsap.utils.toArray('.hero-feature').forEach((feature, index) => {
    gsap.from(feature, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.2 + 1,
        ease: 'back.out(1.7)'
    });
});

// Parallax effect for hero
gsap.to('.hero-video-placeholder', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Animate stats
gsap.utils.toArray('.stat-item').forEach((stat, index) => {
    gsap.from(stat, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: stat,
            start: 'top 85%'
        }
    });
});

// Animate chef section
gsap.from('.chef-image', {
    opacity: 0,
    x: -50,
    duration: 1,
    scrollTrigger: {
        trigger: '.chef-main',
        start: 'top 70%'
    }
});

gsap.from('.chef-info', {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
        trigger: '.chef-main',
        start: 'top 70%'
    }
});

// Animate contact info items
gsap.utils.toArray('.info-item').forEach((item, index) => {
    gsap.from(item, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: item,
            start: 'top 90%'
        }
    });
});

// Animate footer sections
gsap.utils.toArray('.footer-section').forEach((section, index) => {
    gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%'
        }
    });
});

// ==================== //
// Image Lazy Loading Effect
// ==================== //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            imageObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all placeholder images
document.querySelectorAll('.placeholder-img').forEach(img => {
    imageObserver.observe(img);
});

// ==================== //
// Form Input Animations
// ==================== //

const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ==================== //
// Button Ripple Effect
// ==================== //

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
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

// ==================== //
// Reservation Date/Time Validation
// ==================== //

const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

if (dateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
}

if (timeInput) {
    // Validate opening hours (11:00 - 22:00)
    timeInput.addEventListener('change', function() {
        const time = this.value;
        const [hours, minutes] = time.split(':').map(Number);

        if (hours < 11 || hours >= 22) {
            alert('Bitte wählen Sie eine Zeit zwischen 11:00 und 22:00 Uhr.');
            this.value = '';
        }
    });
}

// ==================== //
// Console Welcome Message
// ==================== //

console.log(
    '%c🔥 Willkommen bei Cinar Grill! 🔥',
    'background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); color: #1a1a1a; font-size: 24px; font-weight: bold; padding: 20px; border-radius: 10px; text-align: center;'
);

console.log(
    '%cPremium Restaurant Website\nEntwickelt mit modernsten Web-Technologien',
    'color: #D4AF37; font-size: 14px; font-weight: bold; padding: 10px;'
);

console.log(
    '%c✨ Features:\n• GSAP Scroll Animations\n• Interactive Menu Filters\n• Responsive Design\n• Premium UI/UX\n• Optimized Performance',
    'color: #888; font-size: 12px; padding: 5px; line-height: 1.8;'
);

// ==================== //
// Performance Monitoring
// ==================== //

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c⚡ Page loaded in ${Math.round(loadTime)}ms`, 'color: #D4AF37; font-weight: bold;');

    // Log page performance metrics
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log(`%c📊 Navigation Timing:`, 'color: #D4AF37; font-weight: bold;');
                    console.log(`DNS Lookup: ${Math.round(entry.domainLookupEnd - entry.domainLookupStart)}ms`);
                    console.log(`TCP Connection: ${Math.round(entry.connectEnd - entry.connectStart)}ms`);
                    console.log(`Request Time: ${Math.round(entry.responseStart - entry.requestStart)}ms`);
                    console.log(`Response Time: ${Math.round(entry.responseEnd - entry.responseStart)}ms`);
                    console.log(`DOM Processing: ${Math.round(entry.domComplete - entry.domInteractive)}ms`);
                }
            }
        });

        observer.observe({ entryTypes: ['navigation'] });
    }
});

// ==================== //
// Error Handling
// ==================== //

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ==================== //
// Accessibility Enhancements
// ==================== //

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Arrow keys for testimonial navigation
    if (testimonialSlider) {
        if (e.key === 'ArrowLeft') {
            currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        } else if (e.key === 'ArrowRight') {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }
    }
});

// ==================== //
// Preload Critical Resources
// ==================== //

const preloadImages = () => {
    // Preload hero images if they exist
    const heroImage = document.querySelector('.hero-video-placeholder');
    if (heroImage) {
        // Image preloading logic can be added here
    }
};

// Call preload on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// ==================== //
// Update Year in Footer
// ==================== //

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear && footerYear.textContent.includes('2024')) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}
