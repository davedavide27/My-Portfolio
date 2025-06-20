document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const resizeHandle = document.querySelector('.resize-handle');
  const content = document.querySelector('.content');

  let isResizing = false;
  let startX;
  let startWidth;

  function onMouseMove(e) {
    if (!isResizing) return;
    let newWidth = startWidth + (e.clientX - startX);
    const maxWidth = window.innerWidth * 0.75;
    const minWidth = 200; // minimum sidebar width in px

    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;

    sidebar.style.width = newWidth + 'px';
    content.style.marginLeft = newWidth + 'px';
  }

  function onMouseUp() {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  resizeHandle.addEventListener('mousedown', (e) => {
    if (window.innerWidth < 768) return; // Only enable on desktop
    isResizing = true;
    startX = e.clientX;
    startWidth = sidebar.offsetWidth;
    document.body.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Optional: Adjust content margin on window resize if sidebar width is fixed
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      sidebar.style.width = '';
      content.style.marginLeft = '';
    } else {
      content.style.marginLeft = sidebar.offsetWidth + 'px';
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

  // Sidebar h2 letter hover effect with adjacent letters highlight
  const sidebarH2 = document.querySelector('.sidebar h2');
  if (sidebarH2) {
    const letters = sidebarH2.querySelectorAll('span');
    letters.forEach((letter, index) => {
      letter.addEventListener('mouseenter', () => {
        // Highlight the hovered letter and adjacent letters (1 before and 1 after)
        letters.forEach((l, i) => {
          if (i >= index - 1 && i <= index + 1) {
            l.classList.add('highlight');
          } else {
            l.classList.remove('highlight');
          }
        });
      });
      letter.addEventListener('mouseleave', () => {
        // Remove highlight from all letters
        letters.forEach(l => l.classList.remove('highlight'));
      });
    });
  }

  // Fix for "Let's Talk" button to open email client in the same tab/window
  const talkBtn = document.querySelector('.talk-btn');
  if (talkBtn) {
    talkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'mailto:dave.davide@example.com';
    });
  }

  // Add click event listeners to images inside computer-frame and tablet-frame to open modal
  const clickableImages = document.querySelectorAll('.clickable-image');

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.modal-close');

  clickableImages.forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      captionText.textContent = img.alt;
      captionText.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // Close modal when clicking on close button
  closeBtn.addEventListener('click', () => {
    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.remove('fade-out');
      modal.setAttribute('aria-hidden', 'true');
    }, 500);
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('fade-out');
      setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
        modal.setAttribute('aria-hidden', 'true');
      }, 500);
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.classList.add('fade-out');
      setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
        modal.setAttribute('aria-hidden', 'true');
      }, 500);
    }
  });
});
