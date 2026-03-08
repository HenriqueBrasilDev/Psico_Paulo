
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.carousel-item'));

let activeIndex = 3; 
if(items[activeIndex]) items[activeIndex].classList.add('active');

function updateCarouselPosition(animate = true) {
    const activeItem = document.querySelector('.carousel-item.active');
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
    const activeItem = document.querySelector('.carousel-item.active');
    let nextItem = activeItem.nextElementSibling;
    
    if (!nextItem) nextItem = track.children[0];

    activeItem.classList.remove('active');
    nextItem.classList.add('active');
    updateCarouselPosition(true);

    setTimeout(() => {
        const firstItem = track.children[0];    
        track.appendChild(firstItem);
        updateCarouselPosition(false); 
    }, 500); 

}, 3000);


const testimonialsTrack = document.querySelector('.testimonials-track');
const prevTestimonialBtn = document.querySelector('.prev-btn');
const nextTestimonialBtn = document.querySelector('.next-btn');
let autoScrollInterval;

function scrollNextTestimonial() {
    if(!testimonialsTrack) return;
    const card = document.querySelector('.testimonial-card');
    if(!card) return;
    
    const cardWidth = card.offsetWidth + 30;
    
    
    if (testimonialsTrack.scrollLeft + testimonialsTrack.clientWidth >= testimonialsTrack.scrollWidth - 10) {
        
        testimonialsTrack.scrollTo({ transition:0, left: 0, behavior: 'smooth' });
    } else {
        
        testimonialsTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
}

function startAutoScroll() {
    autoScrollInterval = setInterval(scrollNextTestimonial, 4000); // Muda a cada 4 segundos
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

if(nextTestimonialBtn && prevTestimonialBtn && testimonialsTrack) {
    
    startAutoScroll();

    
    testimonialsTrack.addEventListener('mouseenter', stopAutoScroll);
    testimonialsTrack.addEventListener('mouseleave', startAutoScroll);

    
    nextTestimonialBtn.addEventListener('click', () => {
        const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 30;
        testimonialsTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevTestimonialBtn.addEventListener('click', () => {
        const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 30;
        testimonialsTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    
    
    nextTestimonialBtn.addEventListener('mouseenter', stopAutoScroll);
    nextTestimonialBtn.addEventListener('mouseleave', startAutoScroll);
    prevTestimonialBtn.addEventListener('mouseenter', stopAutoScroll);
    prevTestimonialBtn.addEventListener('mouseleave', startAutoScroll);
}


const modalTriggers = {
    'link-privacidade': 'modal-privacidade',
    'link-termos': 'modal-termos',
    'link-cancelamento': 'modal-cancelamento',
    'link-confidencialidade': 'modal-confidencialidade',
    'link-termosdeatendimento': 'modal-termosdeatendimento',
    'btn-certificados': 'modal-certificados'
};


for (const [btnId, modalId] of Object.entries(modalTriggers)) {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById(modalId);
    
    if (btn && modal) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    }
}


document.querySelectorAll('.close-modal').forEach(fecharBtn => {
    fecharBtn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('show');
    });
});


window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});


window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
});


const hamburgerBtn = document.getElementById('hamburger');
const navMenuBox = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav a');

if (hamburgerBtn && navMenuBox) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenuBox.classList.toggle('active');
    });

    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenuBox.classList.remove('active');
        });
    });
}