// Seleciona o container que agrupa todas as imagens do carrossel
const carouselImages = document.querySelector('.carousel-images');

// Seleciona todos os indicadores (bolinhas) do carrossel
const dots = document.querySelectorAll('.dot');

// Conta quantas imagens existem no carrossel
const totalSlides = document.querySelectorAll('.carousel-images img').length;

// Índice do slide atual (começa no primeiro slide, índice 0)
let currentIndex = 0;

// Variável que armazenará o identificador do autoplay (setInterval)
let autoplayInterval;

// Evento de clique no botão "próximo"
document.querySelector('.next').addEventListener('click', () => {
  // Avança para o próximo slide (ou volta ao primeiro se estiver no último)
  goToSlide((currentIndex + 1) % totalSlides);
});

// Evento de clique no botão "anterior"
document.querySelector('.prev').addEventListener('click', () => {
  // Volta para o slide anterior (ou vai para o último se estiver no primeiro)
  goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
});

// Adiciona evento de clique em cada bolinha (indicador)
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    // Lê o número do slide que a bolinha representa
    const index = parseInt(dot.getAttribute('data-index'));
    // Vai diretamente para o slide correspondente
    goToSlide(index);
  });
});

// Função que muda o slide visível
function goToSlide(index) {
  // Descobre a largura do carrossel para calcular o deslocamento
  const slideWidth = document.querySelector('.carousel').clientWidth;

  // Move o container das imagens para a esquerda (-index * largura)
  carouselImages.style.transform = `translateX(-${index * slideWidth}px)`;

  // Atualiza o índice atual
  currentIndex = index;

  // Atualiza visualmente as bolinhas (indicadores)
  updateDots();
}

// Função que ativa apenas a bolinha correspondente ao slide atual
function updateDots() {
  // Remove a classe 'active' de todas as bolinhas
  dots.forEach(dot => dot.classList.remove('active'));

  // Adiciona a classe 'active' apenas na bolinha atual
  dots[currentIndex].classList.add('active');
}

// Função que inicia o autoplay (troca automática de slides)
function startAutoplay() {
  // Troca de slide a cada 4 segundos (4000ms)
  autoplayInterval = setInterval(() => {
    goToSlide((currentIndex + 1) % totalSlides);
  }, 4000);
}

// Função que pausa o autoplay
function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Quando o mouse entra no carrossel, o autoplay é pausado
document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);

// Quando o mouse sai do carrossel, o autoplay é reiniciado
document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);

// Inicialização: mostra o primeiro slide e inicia o autoplay
goToSlide(0);
startAutoplay();
