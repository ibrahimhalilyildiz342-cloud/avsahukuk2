/* ============================================
   AVAS Hukuk Bürosu — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ---- Active link on scroll ----
    function highlightActiveLink() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleNavScroll();
        highlightActiveLink();
    }, { passive: true });

    // ---- Mobile menu ----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ---- Scroll reveal animations ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Contact form ----
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmit');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value.trim();
        const phone = document.getElementById('formPhone').value.trim();
        const message = document.getElementById('formMessage').value.trim();

        if (!name || !phone || !message) {
            alert('Lütfen tüm zorunlu alanları doldurunuz.');
            return;
        }

        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = '✓ Gönderildi';
            submitBtn.style.background = 'rgba(201, 168, 76, 0.2)';
            submitBtn.style.borderColor = 'var(--accent-gold)';
            submitBtn.style.color = 'var(--accent-gold)';

            setTimeout(() => {
                form.reset();
                submitBtn.textContent = 'Gönder';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
            }, 3000);
        }, 1000);
    });
});
