document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  const navLinks = document.querySelectorAll('.nav-links a');

  // 1. Header Dinámico al hacer Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '1rem 0';
      header.style.backgroundColor = 'rgba(10, 9, 11, 0.9)';
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.padding = '1.5rem 0';
      header.style.backgroundColor = 'rgba(10, 9, 11, 0.5)';
      header.style.boxShadow = 'none';
    }
  });

  // 2. Efecto de Chispas al hacer Clic (Temática Pirotecnia)
  document.addEventListener('click', (e) => {
    createFireworkSpark(e.clientX, e.clientY);
  });

  function createFireworkSpark(x, y) {
    const colors = ['#ff6f43', '#ffb834', '#ffffff', '#25d366'];
    for (let i = 0; i < 8; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      spark.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px ${color};
      `;
      
      document.body.appendChild(spark);
      
      const destinationX = (Math.random() - 0.5) * 200;
      const destinationY = (Math.random() - 0.5) * 200;
      
      const animation = spark.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 500 + Math.random() * 500,
        easing: 'cubic-bezier(0, .9, .57, 1)'
      });
      
      animation.onfinish = () => spark.remove();
    }
  }

  // 3. Animación de entrada al hacer scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .catalog-item, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});
