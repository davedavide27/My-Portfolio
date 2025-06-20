document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.modal-close');

    // Add click event listeners to images inside computer-frame and tablet-frame to open modal
    const clickableImages = document.querySelectorAll('.clickable-image');

    clickableImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            captionText.textContent = img.alt;
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    // Close modal when clicking on close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // Light and Dark Mode Toggle Buttons
    const lightModeBtn = document.querySelector('.light-mode-btn');
    const darkModeBtn = document.querySelector('.dark-mode-btn');
    const body = document.body;

    lightModeBtn.addEventListener('click', () => {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    });

    darkModeBtn.addEventListener('click', () => {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    });

    // Button hover effect for the new button style on all buttons with class "button" only in dark mode
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.add('hover');
            }
        });

        btn.addEventListener('mouseleave', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('hover');
            }
        });
    });
});
