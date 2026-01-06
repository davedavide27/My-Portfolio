// Firefly Animation System - Tiny popping lights
class FireflySystem {
    constructor(container) {
        this.container = container;
        this.fireflies = [];
        this.animationId = null;
        this.isActive = false;
        this.containerRect = null;
    }

    init() {
        // Wait for image to load before creating fireflies
        const imageElement = this.container.querySelector('.gallery-main-image');
        if (imageElement) {
            if (imageElement.complete) {
                // Image already loaded
                this.createFireflies();
            } else {
                // Wait for image to load
                imageElement.addEventListener('load', () => {
                    this.createFireflies();
                });
                // Fallback timeout in case load event doesn't fire
                setTimeout(() => {
                    if (!this.fireflies.length) {
                        this.createFireflies();
                    }
                }, 1000);
            }
        }
    }

    createFireflies() {
        // Create more tiny fireflies for better effect
        for (let i = 0; i < 12; i++) {
            this.createFirefly();
        }
        this.startAnimation();
    }

    createFirefly() {
        const firefly = document.createElement('div');
        firefly.className = 'firefly-light';

        // Get container dimensions
        const containerRect = this.container.getBoundingClientRect();

        // Random position within the container
        const x = Math.random() * (containerRect.width - 20) + 10; // 10px margin
        const y = Math.random() * (containerRect.height - 20) + 10;

        // Firefly properties - tiny lights that move around
        const fireflyData = {
            element: firefly,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 1.5, // Slow gentle movement
            vy: (Math.random() - 0.5) * 1.5,
            opacity: 0,
            life: 0,
            maxLife: 3000 + Math.random() * 4000, // 3-7 seconds per cycle
            popDelay: Math.random() * 3000, // Random delay before first pop
            glowIntensity: 0.4 + Math.random() * 0.6
        };

        this.fireflies.push(fireflyData);
        this.container.appendChild(firefly);
    }

    startAnimation() {
        if (this.isActive) return;
        this.isActive = true;
        this.animate();
    }

    stopAnimation() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    animate = () => {
        if (!this.isActive) return;

        this.updateContainerRect();
        this.updateFireflies();
        this.animationId = requestAnimationFrame(this.animate);
    }

    updateContainerRect() {
        if (this.container) {
            this.containerRect = this.container.getBoundingClientRect();
        }
    }

    updateFireflies() {
        this.fireflies.forEach((firefly, index) => {
            this.updateFirefly(firefly, index);
        });
    }

    updateFirefly(firefly, index) {
        const { element } = firefly;

        // Handle initial delay before first pop
        if (firefly.popDelay > 0) {
            firefly.popDelay -= 16;
            element.style.opacity = 0;
            return;
        }

        // Update life
        firefly.life += 16; // ~60fps

        // Calculate opacity for popping effect
        const lifeProgress = firefly.life / firefly.maxLife;
        if (lifeProgress < 0.2) {
            // Quick fade in
            firefly.opacity = lifeProgress * 5;
        } else if (lifeProgress > 0.8) {
            // Quick fade out
            firefly.opacity = (1 - lifeProgress) * 5;
        } else {
            // Full brightness in middle
            firefly.opacity = 1;
        }

        // Gentle movement within container bounds
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        // Boundary checking - keep fireflies inside container
        const margin = 10; // 10px margin from edges
        const maxX = this.containerRect.width - margin;
        const maxY = this.containerRect.height - margin;

        if (firefly.x <= margin || firefly.x >= maxX) {
            firefly.vx *= -1; // Reverse direction
            firefly.x = Math.max(margin, Math.min(maxX, firefly.x));
        }
        if (firefly.y <= margin || firefly.y >= maxY) {
            firefly.vy *= -1; // Reverse direction
            firefly.y = Math.max(margin, Math.min(maxY, firefly.y));
        }

        // Occasional gentle direction changes
        if (Math.random() < 0.005) {
            firefly.vx += (Math.random() - 0.5) * 0.3;
            firefly.vy += (Math.random() - 0.5) * 0.3;
            // Keep velocity gentle
            firefly.vx = Math.max(-1.5, Math.min(1.5, firefly.vx));
            firefly.vy = Math.max(-1.5, Math.min(1.5, firefly.vy));
        }

        // Apply position and opacity
        element.style.transform = `translate(${firefly.x}px, ${firefly.y}px)`;
        element.style.opacity = firefly.opacity;

        // Update glow intensity for twinkling effect
        firefly.glowIntensity = 0.5 + Math.sin(Date.now() * 0.005 + index * 0.7) * 0.3;
        element.style.boxShadow = `0 0 ${3 + firefly.glowIntensity * 8}px rgba(255, 215, 0, ${firefly.glowIntensity})`;

        // Reset when life cycle completes
        if (firefly.life >= firefly.maxLife) {
            this.resetFirefly(firefly);
        }
    }

    resetFirefly(firefly) {
        // Reset properties for next pop with new movement within container bounds
        firefly.x = Math.random() * (this.containerRect.width - 20) + 10;
        firefly.y = Math.random() * (this.containerRect.height - 20) + 10;
        firefly.vx = (Math.random() - 0.5) * 1.5; // New random velocity
        firefly.vy = (Math.random() - 0.5) * 1.5;
        firefly.life = 0;
        firefly.maxLife = 3000 + Math.random() * 4000; // 3-7 seconds per cycle
        firefly.popDelay = 1000 + Math.random() * 4000; // 1-5 seconds delay between pops
        firefly.opacity = 0;
        firefly.glowIntensity = 0.4 + Math.random() * 0.6;
    }

    destroy() {
        this.stopAnimation();
        this.fireflies.forEach(firefly => {
            if (firefly.element && firefly.element.parentNode) {
                firefly.element.parentNode.removeChild(firefly.element);
            }
        });
        this.fireflies = [];
    }
}

// Gallery integration
document.addEventListener('DOMContentLoaded', () => {
    let fireflySystem = null;

    // Listen for gallery modal open
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (galleryModal.classList.contains('show')) {
                        // Gallery opened - target the scroll container but position over image
                        const galleryScroll = galleryModal.querySelector('.gallery-scroll');
                        if (galleryScroll && !fireflySystem) {
                            fireflySystem = new FireflySystem(galleryScroll);
                            fireflySystem.init();
                        }
                    } else {
                        // Gallery closed
                        if (fireflySystem) {
                            fireflySystem.destroy();
                            fireflySystem = null;
                        }
                    }
                }
            });
        });

        observer.observe(galleryModal, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});
