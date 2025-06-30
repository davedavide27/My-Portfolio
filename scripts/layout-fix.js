document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');

  function adjustContentMargin() {
    if (window.innerWidth >= 768) {
      content.style.marginLeft = sidebar.offsetWidth + 'px';
    } else {
      content.style.marginLeft = '';
    }
  }

  adjustContentMargin();

  window.addEventListener('resize', adjustContentMargin);
});
