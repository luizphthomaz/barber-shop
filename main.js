const carouselImages = document.querySelector('.carousel-images');
const dots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.carousel-images img').length;
let currentIndex = 0;
let autoplayInterval;

document.querySelector('.next').addEventListener('click', () => {
  goToSlide((currentIndex + 1) % totalSlides);
});

document.querySelector('.prev').addEventListener('click', () => {
  goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    goToSlide(index);
  });
});

function goToSlide(index) {
  const slideWidth = document.querySelector('.carousel').clientWidth;
  carouselImages.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
  updateDots();
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Autoplay
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    goToSlide((currentIndex + 1) % totalSlides);
  }, 4000); // 4 segundos
}

// Pausar autoplay ao interagir
function stopAutoplay() {
  clearInterval(autoplayInterval);
}

document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);

// Inicializar
goToSlide(0);
startAutoplay();
