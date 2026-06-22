const header = document.querySelector('.header');
const hamburgerBtn = document.getElementById('hamburger');
const navMenuBox = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }

    if (window.scrollY > 50 && hamburgerBtn?.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navMenuBox?.classList.remove('active');
    }
});

// Menu Hamburger
if (hamburgerBtn && navMenuBox) {
    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('active');
        navMenuBox.classList.toggle('active');
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenuBox.classList.remove('active');
        });
    });
}

// 2. CARROSSEL PRINCIPAL
const track = document.querySelector('.carousel-track');

if (track) {
    const items = Array.from(track.querySelectorAll('.carousel-item'));
    let activeIndex = 3; 
    
    if (items[activeIndex]) items[activeIndex].classList.add('active');

    function updateCarouselPosition(animate = true) {
        const activeItem = track.querySelector('.carousel-item.active');
        if (!activeItem) return;

        const bar = track.parentElement;
        const barCenter = bar.offsetWidth / 2;
        const itemCenter = activeItem.offsetLeft + (activeItem.offsetWidth / 2);
        const moveAmount = barCenter - itemCenter;

        track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(${moveAmount}px)`;
    }

    window.addEventListener('load', () => updateCarouselPosition(false));
    window.addEventListener('resize', () => updateCarouselPosition(false));

    setInterval(() => {
        const activeItem = track.querySelector('.carousel-item.active');
        if (!activeItem) return;

        const nextItem = activeItem.nextElementSibling || track.firstElementChild;

        activeItem.classList.remove('active');
        nextItem.classList.add('active');
        updateCarouselPosition(true);

        setTimeout(() => {
            track.appendChild(track.firstElementChild);
            updateCarouselPosition(false); 
        }, 500); 

    }, 3000);
}

// 3. CARROSSEL DE DEPOIMENTOS
const testimonialsTrack = document.querySelector('.testimonials-track');

if (testimonialsTrack) {
    const prevTestimonialBtn = document.querySelector('.prev-btn');
    const nextTestimonialBtn = document.querySelector('.next-btn');
    let autoScrollInterval;

    const getCardWidth = () => {
        const card = testimonialsTrack.querySelector('.testimonial-card');
        return card ? card.offsetWidth + 30 : 0;
    };

    function scrollNextTestimonial() {
        const cardWidth = getCardWidth();
        if (!cardWidth) return;
        
        if (testimonialsTrack.scrollLeft + testimonialsTrack.clientWidth >= testimonialsTrack.scrollWidth - 10) {
            testimonialsTrack.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            testimonialsTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(scrollNextTestimonial, 4000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    startAutoScroll();

    testimonialsTrack.addEventListener('mouseenter', stopAutoScroll);
    testimonialsTrack.addEventListener('mouseleave', startAutoScroll);

    if (nextTestimonialBtn && prevTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', () => {
            testimonialsTrack.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        });

        prevTestimonialBtn.addEventListener('click', () => {
            testimonialsTrack.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        });
        
        [nextTestimonialBtn, prevTestimonialBtn].forEach(btn => {
            btn.addEventListener('mouseenter', stopAutoScroll);
            btn.addEventListener('mouseleave', startAutoScroll);
        });
    }
}

const modalTriggers = {
    'link-privacidade': 'modal-privacidade',
    'link-termos': 'modal-termos',
    'link-cancelamento': 'modal-cancelamento',
    'link-confidencialidade': 'modal-confidencialidade',
    'link-termosdeatendimento': 'modal-termosdeatendimento',
    'btn-certificados': 'modal-certificados'
};

Object.entries(modalTriggers).forEach(([btnId, modalId]) => {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    
    if (btn && modal) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    }
});


document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) modal.classList.remove('show');
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});