document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // 1. ANIMAÇÃO

    const tlHero = gsap.timeline();

    tlHero.from(".hero-left h1", { x: -100, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".services-list li", { x: -50, opacity: 0, duration: 0.7, stagger: 0.15 }, "-=0.3")
        .from(".quote", { opacity: 0, duration: 1 }, "-=0.2")
        .from(".hero-left p", { opacity: 0, duration: 1, ease: "power2.out" }, "-=0.9")
        .from(".hero-center .imagem-central", { scale: 0.9, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=1")
        .from(".badge", { x: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, "-=0.8")
        .from(".badge-certificados", {opacity: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.4");

    // 2. ANIMAÇÃO
    gsap.from(".info-card", {
        scrollTrigger: {
            trigger: ".info-grid",
            start: "top 60%",
        },
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.inOut"
    });

    // 3. ANIMAÇÃO 
    gsap.from(".profile-photo", {
        scrollTrigger: {
            trigger: ".about-profile",
            start: "top 60%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".profile-text, .schedule-box", {
        scrollTrigger: {
            trigger: ".about-profile",
            start: "top 60%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    });

    // 4. ANIMAÇÃO
    gsap.from(".step, .step-arrow", {
        scrollTrigger: {
            trigger: ".steps-bar",
            start: "top 60%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)"
    });

    // 5. ANIMAÇÃO DOS MÉTODOS
    gsap.utils.toArray('.method-row').forEach((row) => {
        const isReverse = row.classList.contains('reverse');
        
        gsap.from(row, {
            scrollTrigger: {
                trigger: row,
                start: "top 60%",
            },

            x: isReverse ? 80 : -80, 
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 6. ANIMAÇÃO
    gsap.from(".testimonials h2", {
        scrollTrigger: {
            trigger: ".testimonials",
            start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    gsap.from(".testimonial-card", {
        scrollTrigger: {
            trigger: ".testimonials-track",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Anima um card logo após o outro
        ease: "power2.out"
    });

    // 7. ANIMAÇÃO DO FOOTER
    gsap.from(".footer-col", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
});