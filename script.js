// Smooth scrolling for internal navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle functionality
const lightModeButton = document.querySelector('.light-mode-btn');
const darkModeButton = document.querySelector('.dark-mode-btn');
const body = document.body;

// Event listener for light mode button
lightModeButton.addEventListener('click', () => {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
});

// Event listener for dark mode button
darkModeButton.addEventListener('click', () => {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
});

// Particle animation with explosive pop effect
const particleContainer = document.querySelector('.background-animation');
const numberOfParticles = 50;

class Particle {
    constructor() {
        this.size = Math.random() * 4 + 2; // Initial size
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speedX = (Math.random() * 0.4) - 0.2; // Adjusted speed for smoother movement
        this.speedY = (Math.random() * 0.4) - 0.2;
        this.opacity = 1;

        this.element = document.createElement('div');
        this.element.classList.add('particle');

        const randomX = (Math.random() * 400) - 200;
        const randomY = (Math.random() * 400) - 200;
        const randomDuration = Math.random() * 10 + 5;

        this.element.style.setProperty('--random-x', `${randomX}px`);
        this.element.style.setProperty('--random-y', `${randomY}px`);
        this.element.style.setProperty('--random-duration', `${randomDuration}s`);
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;

        particleContainer.appendChild(this.element);

        this.initiateRandomPop(); // Initialize random pop behavior
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges
        if (this.x > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }

        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
    }

    pop() {
        const popSize = Math.random() * 5 + 5; // Random explosion size (e.g., 5x to 10x)
        const popDuration = Math.random() * 3 + 2; // Random explosion duration (2 to 5 seconds)

        // Dynamically apply inline styles for pop size and duration
        this.element.style.transition = `transform ${popDuration}s ease-out, opacity ${popDuration}s ease-out`;
        this.element.style.transform = `scale(${popSize})`; // Dynamically set the size of explosion
        this.element.style.opacity = '0'; // Fade out during explosion

        setTimeout(() => {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.element.style.top = `${this.y}px`;
            this.element.style.left = `${this.x}px`;
            this.element.style.transform = 'scale(1)'; // Reset the scale
            this.element.style.opacity = '1'; // Reset opacity
            this.element.style.transition = ''; // Reset transition after explosion
        }, popDuration * 1000); // Reset after the explosion duration
    }

    initiateRandomPop() {
        // Generate a random interval for when the particle will pop
        const randomPopInterval = Math.random() * 5000 + 2000; // Random interval between 2 and 7 seconds
        setTimeout(() => {
            this.pop(); // Trigger the pop effect
            this.initiateRandomPop(); // Keep the effect going with new random intervals
        }, randomPopInterval);
    }
}

const particlesArray = [];

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    particlesArray.forEach(particle => {
        particle.update();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize particle container on window resize
window.addEventListener('resize', () => {
    particlesArray.forEach(particle => {
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
    });
});
