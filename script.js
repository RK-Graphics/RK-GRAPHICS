document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du Swiper
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
      // Paramètres de base
      direction: 'horizontal',
      loop: true,
      grabCursor: true,
      speed: 1000,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

        
      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
  
      // Navigation
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  
      // Configuration responsive
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
  
    // Gestion du menu burger
    const burgerToggle = document.getElementById('burger-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
  
    burgerToggle.addEventListener('change', function() {
      if (this.checked) {
        navMenu.style.transform = 'translateX(0)';
        navItems.forEach((item, index) => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          item.style.transitionDelay = `${index * 0.1}s`;
        });
      } else {
        navMenu.style.transform = 'translateX(-100%)';
        navItems.forEach(item => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
        });
      }
    });
  
    // Fermer le menu lorsqu'un lien est cliqué (sur mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          burgerToggle.checked = false;
          navMenu.style.transform = 'translateX(-100%)';
          navItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
          });
        }
      });
    });

    // ===== CODE DE NAVIGATION FLUIDE =====
    // Animation de défilement fluide améliorée
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ne pas appliquer sur les liens externes ou autres
            if (this.getAttribute('href') === '#' || 
                this.getAttribute('href').startsWith('http') ||
                this.getAttribute('href').startsWith('mailto') ||
                this.getAttribute('href').startsWith('tel')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calcul de la position cible avec offset pour le menu fixed
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Fermer le menu burger si ouvert
            if (burgerToggle && burgerToggle.checked) {
                burgerToggle.checked = false;
                navMenu.style.transform = 'translateX(-100%)';
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                });
            }
        });
    });
});