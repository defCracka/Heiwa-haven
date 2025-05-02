// Grab elements
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".main-nav");
const closeBtn = document.getElementById("close-btn");
const overlay = document.querySelector(".menu-overlay");
const body = document.body;

// Open menu: slide-in, show overlay, disable scroll, hide hamburger
function openMenu() {
    nav.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("no-scroll");
    hamburger.style.display = "none";
}

// Close menu: reverse everything
function closeMenu() {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    hamburger.style.display = "flex";
}

// Event listeners for menu toggling
hamburger?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

// Sticky header on scroll
window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }
});

// Slider functionality
const slides = document.querySelectorAll(".slide");
const heroContent = document.getElementById("hero-content");

const slideText = [
    {
        h1: "Invest in Land. Build Wealth That Lasts.",
        p: "High-end spaces. Built right. Delivered beyond expectations."
    },
    {
        h1: "Land, Elevated. Crafted to Luxury.",
        p: "Prime plots. High value. Affordable investment. Secure your future."
    }
];

let currentSlide = 0;

// Typing effect for hero content
function typeText(element, text, speed = 10) {
    if (!element) return;
    let index = 0;
    element.textContent = ""; // Clear existing content
    const typing = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

// Function to show a slide & apply typing effect
function showSlide(index) {
    if (slides.length === 0 || !heroContent) return;

    // Remove active class from all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    // Add active class to the current slide
    slides[index].classList.add("active");

    // Update hero content element
    heroContent.innerHTML = `
        <h1 class="fade-in">${slideText[index].h1}</h1>
        <p class="fade-in delay-1">${slideText[index].p}</p>
        <div class="hero-cta fade-in delay-2">
            <a href="#lands" class="btn btn-primary">Browse Lands</a>
            <a href="#quote" class="btn btn-ghost">Estimate My Build</a>
        </div>
    `;

    // Apply typing effect on text elements
    const heroHeading = document.querySelector(".hero-content h1");
    const heroSubtext = document.querySelector(".hero-content p");

    if (heroHeading && heroSubtext) {
        typeText(heroHeading, slideText[index].h1, 70);
        setTimeout(() => {
            typeText(heroSubtext, slideText[index].p, 50);
        }, 2500); // Delay to start subtext typing
    }
}

// Auto-slide every 7 seconds & run typing effect
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 12000);

// Initialize first slide safely
window.addEventListener("DOMContentLoaded", () => {
    showSlide(currentSlide);
});
