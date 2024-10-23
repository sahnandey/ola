document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const animateSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateSection, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate hero section elements
    gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from('.hero h2', { opacity: 0, y: 50, duration: 1, delay: 0.7 });
    gsap.from('.hero p', { opacity: 0, y: 50, duration: 1, delay: 0.9 });
    gsap.from('.hero .cta-button', { opacity: 0, y: 50, duration: 1, delay: 1.1 });

    // Animate agenda items
    const days = document.querySelectorAll('.day');
    days.forEach((day, index) => {
        gsap.from(day, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 1,
            scrollTrigger: {
                trigger: day,
                start: 'top 80%'
            }
        });
    });

    // Form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for registering! We will contact you soon.');
        form.reset();
    });
});