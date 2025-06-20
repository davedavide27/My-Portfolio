document.addEventListener('DOMContentLoaded', () => {
  // Existing code...

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
});
