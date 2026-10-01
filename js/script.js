const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// ========================================
// Neural Network Canvas
// ========================================
(function () {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const ACCENT = '0, 212, 184';
    const MAX_DIST = 160;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 14000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x:  Math.random() * canvas.width,
                y:  Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r:  Math.random() * 1.5 + 0.8,
            });
        }
    }

    let running = false;
    let heroVisible = true;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // update positions
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;

            // slight attraction toward mouse
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < 200) {
                p.vx += dx * 0.00012;
                p.vy += dy * 0.00012;
                // dampen velocity
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 1.2) { p.vx *= 0.95; p.vy *= 0.95; }
            }
        });

        // draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
                    ctx.lineWidth   = 0.8;
                    ctx.stroke();
                }
            }
        }

        // draw dots
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ACCENT}, 0.7)`;
            ctx.fill();
        });

        if (running) requestAnimationFrame(draw);
    }

    // Animate only while the hero is on screen and the tab is visible;
    // with reduced motion, draw a single still frame.
    function updateRunning() {
        const shouldRun = !prefersReducedMotion && heroVisible && !document.hidden;
        if (shouldRun && !running) {
            running = true;
            requestAnimationFrame(draw);
        } else if (!shouldRun) {
            running = false;
        }
    }

    resize();
    createParticles();
    draw();

    new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        updateRunning();
    }).observe(canvas);
    document.addEventListener('visibilitychange', updateRunning);

    window.addEventListener('resize', () => {
        resize();
        createParticles();
        if (!running) draw();
    });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
}());


// ========================================
// Navigation
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');

function setMenuOpen(open) {
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform  = open ? 'rotate(45deg) translate(5px, 6px)'   : '';
    spans[1].style.opacity    = open ? '0'                                    : '1';
    spans[2].style.transform  = open ? 'rotate(-45deg) translate(5px, -6px)' : '';
}

hamburger.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('active'));
});

navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenuOpen(false);
        hamburger.focus();
    }
});

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    });
});


// ========================================
// Active Nav Link on Scroll
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current    = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
});


// ========================================
// Scroll Reveal
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ========================================
// Project Card — click to link
// ========================================
document.querySelectorAll('.project-card').forEach(card => {
    const link = card.querySelector('.project-link');
    if (link) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', e => {
            if (!e.target.closest('.project-link')) link.click();
        });
    }
});


// ========================================
// Contact Form
// ========================================
// Submissions post to Formspree; the endpoint is the form's `action`.
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');
const submitBtn   = contactForm.querySelector('button[type="submit"]');

function setFormStatus(state, text) {
    formStatus.className   = state;
    formStatus.textContent = text;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setFormStatus('sending', '// Sending...');
    submitBtn.disabled = true;

    try {
        const res = await fetch(contactForm.action, {
            method:  'POST',
            body:    new FormData(contactForm),
            headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`Formspree responded ${res.status}`);

        setFormStatus('success', '// Message sent — I\'ll be in touch soon.');
        contactForm.reset();
        contactForm.querySelectorAll('input, textarea').forEach(el => { el.style.borderColor = ''; });
        setTimeout(() => setFormStatus('', ''), 5000);
    } catch {
        setFormStatus('error', '// Your message wasn\'t sent. Email me directly at lc4021@columbia.edu');
    } finally {
        submitBtn.disabled = false;
    }
});

// Inline validation feedback
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'rgba(251,113,133,0.5)';
        } else {
            input.style.borderColor = 'rgba(0,212,184,0.35)';
        }
    });
    input.addEventListener('focus', () => { input.style.borderColor = ''; });
});

const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    emailInput.style.borderColor = valid
        ? 'rgba(0,212,184,0.35)'
        : 'rgba(251,113,133,0.5)';
});


// ========================================
// Scroll progress bar
// ========================================
(function () {
    const bar = document.createElement('div');
    bar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
        background: var(--accent); width: 0%; transition: width 0.1s linear;
        pointer-events: none;
    `;
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        bar.style.width = (scrolled * 100) + '%';
    });
}());


// ========================================
// Footer Year
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const yr = document.getElementById('footer-year');
    if (yr) yr.textContent = new Date().getFullYear();
});


// ========================================
// Console greeting
// ========================================
console.log('%c LJC ', 'background:#00d4b8;color:#07070e;font-size:14px;font-weight:bold;padding:4px 8px;');
console.log('%c lc4021@columbia.edu ', 'color:#00d4b8;font-size:12px;');
