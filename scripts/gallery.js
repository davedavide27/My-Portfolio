// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryModal = document.getElementById('galleryModal');
    const galleryScroll = document.querySelector('.gallery-scroll');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    const viewProjectButtons = document.querySelectorAll('.button');

    // Define images for each folder with descriptions
    const projectImages = {
        'pos_backoffice': [
            {
                src: 'images/pos_backoffice/pos_back_office_web_app.png',
                description: 'Point of Sale Back Office Web Application - Login Page'
            }
        ],
        'pos_mobile': [
            {
                src: 'images/pos_mobile/image.png',
                description: 'Point of Sale Mobile Application - Login Page.'
            },
            {
                src: 'images/pos_mobile/items.png',
                description: 'Point of Sale Mobile Application - Item Management'
            }
        ],
        'motoshop': [
            {
                src: 'images/motoshop/motoshop_web_app.png',
                description: 'Motoshop Web Application - Login Page.'
            },
            {
                src: 'images/motoshop/dashboard.png',
                description: 'Motoshop Web Application - Dashboard Page.'
            },
            {
                src: 'images/motoshop/dashboard2.png',
                description: 'Motoshop Web Application - Dashboard Page.'
            }
        ]
    };

    // Open gallery modal when "View Project" container is clicked
    viewProjectButtons.forEach(container => {
        container.addEventListener('click', (e) => {
            e.preventDefault();
            const button = container.querySelector('.view-project-btn');
            const folder = button.getAttribute('data-folder');
            if (folder && projectImages[folder]) {
                currentImages = projectImages[folder];
                currentIndex = 0;

                // Clear existing content
                galleryScroll.innerHTML = '';

                // Create mechanical border elements
                const topBorder = document.createElement('div');
                topBorder.className = 'mechanical-border top';
                galleryScroll.appendChild(topBorder);

                const bottomBorder = document.createElement('div');
                bottomBorder.className = 'mechanical-border bottom';
                galleryScroll.appendChild(bottomBorder);

                const leftBorder = document.createElement('div');
                leftBorder.className = 'mechanical-border left';
                galleryScroll.appendChild(leftBorder);

                const rightBorder = document.createElement('div');
                rightBorder.className = 'mechanical-border right';
                galleryScroll.appendChild(rightBorder);

                // Create corner bolts
                const topLeftBolt = document.createElement('div');
                topLeftBolt.className = 'corner-bolt top-left';
                galleryScroll.appendChild(topLeftBolt);

                const topRightBolt = document.createElement('div');
                topRightBolt.className = 'corner-bolt top-right';
                galleryScroll.appendChild(topRightBolt);

                const bottomLeftBolt = document.createElement('div');
                bottomLeftBolt.className = 'corner-bolt bottom-left';
                galleryScroll.appendChild(bottomLeftBolt);

                const bottomRightBolt = document.createElement('div');
                bottomRightBolt.className = 'corner-bolt bottom-right';
                galleryScroll.appendChild(bottomRightBolt);



                // Create description
                const description = document.createElement('p');
                description.textContent = currentImages[currentIndex].description;
                description.className = 'gallery-description';
                galleryScroll.appendChild(description);

                // Create main image display
                const mainImg = document.createElement('img');
                mainImg.src = currentImages[currentIndex].src;
                mainImg.alt = `${folder} project screenshot`;
                mainImg.className = 'gallery-main-image';
                galleryScroll.appendChild(mainImg);

                // Create thumbnail strip
                const thumbnailStrip = document.createElement('div');
                thumbnailStrip.className = 'gallery-thumbnails';

                currentImages.forEach((imageObj, index) => {
                    const thumb = document.createElement('img');
                    thumb.src = imageObj.src;
                    thumb.alt = `${folder} thumbnail ${index + 1}`;
                    thumb.className = 'gallery-thumbnail';
                    if (index === currentIndex) {
                        thumb.classList.add('active');
                    }
                    thumb.addEventListener('click', () => showImage(index));
                    thumbnailStrip.appendChild(thumb);
                });

                galleryScroll.appendChild(thumbnailStrip);

                galleryModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close gallery modal
    galleryClose.addEventListener('click', closeGallery);
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGallery();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const zoomedImg = document.querySelector('.gallery-zoomed.show');
            if (zoomedImg) {
                zoomedImg.classList.remove('show');
                setTimeout(() => zoomedImg.remove(), 300);
            } else if (galleryModal.classList.contains('show')) {
                closeGallery();
            }
        }
    });

    function closeGallery() {
        galleryModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Navigation buttons
    galleryPrev.addEventListener('click', () => {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
        showImage(prevIndex);
    });

    galleryNext.addEventListener('click', () => {
        const nextIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
        showImage(nextIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('show')) return;

        if (e.key === 'ArrowLeft') {
            galleryPrev.click();
        } else if (e.key === 'ArrowRight') {
            galleryNext.click();
        }
    });

    // Function to show specific image
    function showImage(index) {
        currentIndex = index;
        const mainImg = galleryScroll.querySelector('.gallery-main-image');
        const description = galleryScroll.querySelector('.gallery-description');
        const thumbnails = galleryScroll.querySelectorAll('.gallery-thumbnail');

        if (mainImg) {
            mainImg.src = currentImages[currentIndex].src;
        }

        if (description) {
            description.textContent = currentImages[currentIndex].description;
        }

        thumbnails.forEach((thumb, i) => {
            if (i === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });

        // Trigger corner bolt pulse animation
        const cornerBolts = galleryScroll.querySelectorAll('.corner-bolt');
        cornerBolts.forEach(bolt => {
            bolt.style.animation = 'none';
            bolt.offsetHeight; // Trigger reflow
            bolt.style.animation = 'cornerBoltPulse 0.6s ease-in-out';
        });
    }

    // Zoom image function
    function zoomImage(imageSrc) {
        // Remove any existing zoomed image
        const existingZoomed = document.querySelector('.gallery-zoomed');
        if (existingZoomed) {
            existingZoomed.remove();
        }

        // Create new zoomed image
        const zoomedImg = document.createElement('img');
        zoomedImg.src = imageSrc;
        zoomedImg.alt = 'Zoomed project screenshot';
        zoomedImg.className = 'gallery-zoomed';
        zoomedImg.addEventListener('click', () => {
            zoomedImg.classList.remove('show');
            setTimeout(() => zoomedImg.remove(), 300);
        });

        // Add to gallery modal
        galleryModal.appendChild(zoomedImg);

        // Show zoomed image
        setTimeout(() => {
            zoomedImg.classList.add('show');
        }, 10);
    }
});
