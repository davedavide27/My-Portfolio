document.addEventListener('DOMContentLoaded', () => {
  const background = document.querySelector('.background-animation');
  const meteors = [];

  function createMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    resetMeteor(meteor);
    background.appendChild(meteor);
    meteors.push(meteor);
  }

  function resetMeteor(meteor) {
    const sidebarWidth = window.innerWidth * 0.25;
    meteor.style.top = '0px'; // start at very top
    meteor.style.left = (sidebarWidth + Math.random() * (window.innerWidth - sidebarWidth)) + 'px'; // spawn only right of sidebar
    meteor.style.opacity = Math.random() * 0.5 + 0.5;
    meteor.style.transform = `rotate(45deg)`; // fixed direction angle
    const speed = 2 + Math.random() * 4; // random speed scalar
    meteor.dataset.speedX = speed * Math.cos(Math.PI / 4); // fixed direction x component
    meteor.dataset.speedY = speed * Math.sin(Math.PI / 4); // fixed direction y component
    meteor.dataset.exploding = 'false';
    meteor.style.display = 'block';
  }

  function animateMeteors() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarWidth = sidebar ? sidebar.offsetWidth : window.innerWidth * 0.25;

    meteors.forEach(meteor => {
      if (meteor.dataset.exploding === 'true') return;

      let left = parseFloat(meteor.style.left);
      let top = parseFloat(meteor.style.top);
      const speedX = parseFloat(meteor.dataset.speedX);
      const speedY = parseFloat(meteor.dataset.speedY);

      meteor.style.left = (left - speedX) + 'px';
      meteor.style.top = (top + speedY) + 'px';

      // Check if meteor reached ground (bottom of screen) or hit sidebar
      if (top >= window.innerHeight - 10 || left <= sidebarWidth) {
        explodeMeteor(meteor);
      }
    });

    requestAnimationFrame(animateMeteors);
  }

  function explodeMeteor(meteor) {
    meteor.classList.add('explode');
    meteor.dataset.exploding = 'true';
    setTimeout(() => {
      meteor.classList.remove('explode');
      meteor.style.display = 'none';
      // Remove meteor from DOM and array
      background.removeChild(meteor);
      const index = meteors.indexOf(meteor);
      if (index > -1) meteors.splice(index, 1);
      // Schedule new meteor creation at random interval
      setTimeout(createMeteor, Math.random() * 3000 + 1000);
    }, 500); // explosion duration
  }

  function animateMeteors() {
    meteors.forEach(meteor => {
      if (meteor.dataset.exploding === 'true') return;

      let left = parseFloat(meteor.style.left);
      let top = parseFloat(meteor.style.top);
      const speedX = parseFloat(meteor.dataset.speedX);
      const speedY = parseFloat(meteor.dataset.speedY);

      meteor.style.left = (left - speedX) + 'px';
      meteor.style.top = (top + speedY) + 'px';

      // Calculate sidebar width in pixels (25% of window width)
      const sidebarWidth = window.innerWidth * 0.25;

      // Check if meteor reached ground (bottom of screen) or hit sidebar
      if (top >= window.innerHeight - 10 || left <= sidebarWidth) {
        explodeMeteor(meteor);
      }
    });

    requestAnimationFrame(animateMeteors);
  }

  // Initial meteors with staggered creation
  for (let i = 0; i < 10; i++) {
    setTimeout(createMeteor, i * 500 + Math.random() * 1000);
  }

  animateMeteors();
});
