const carrosselImagens = document.querySelector('.carrossel-images')

// Conta quantas imagens existem no carrossel
const totalSlides = document.querySelectorAll('.carrossel-images img').length

const indicadores = document.querySelectorAll('.indicador')
let indexAtual = 0;

let autoplayIntervalo;

document.querySelector('.proximo').addEventListener('click', () => {
  // Avança para o próximo slide (ou volta ao primeiro se estiver no último)
  apresentacaoSlide((indexAtual + 1) % totalSlides)
})

// Evento de clique no botão "anterior"
document.querySelector('.anterior').addEventListener('click', () => {
  apresentacaoSlide((indexAtual - 1 + totalSlides) % totalSlides)
})

// Adiciona evento de clique em cada bolinha (indicador)
indicadores.forEach( indicador => {
  indicador.addEventListener('click', () => {
    // Lê o número do slide que a bolinha representa
    const index = parseInt(indicador.getAttribute('data-index'))
    // Vai diretamente para o slide correspondente
    apresentacaoSlide(index)
  })
})

// Função que muda o slide visível

function apresentacaoSlide(index) {
  // Descobre a largura do carrossel para calcular o deslocamento
  const larguraSlide = document.querySelector('.carrossel').clientWidth
  
    // Move o container das imagens para a esquerda (-index * largura)
  carrosselImagens.style.transform = `translateX(-${index * larguraSlide}px)`

  indexAtual = index

  atualizarIndicadores()
}

function atualizarIndicadores() {
  indicadores.forEach(indicador => indicador.classList.remove('active'))

  indicadores[indexAtual].classList.add('active')
  
}

  // Troca de slide a cada 4 segundos (4000ms)
function startAutoplay() {
  autoplayIntervalo = setInterval(() => {
    apresentacaoSlide((indexAtual + 1) % totalSlides)
  }, 4000);
}

// Função que pausa o autoplay
function stopAutoplay() {
  clearInterval(autoplayIntervalo)
}

document.querySelector('.carrossel').addEventListener('mouseenter', stopAutoplay)

document.querySelector('.carrossel').addEventListener('mouseleave', startAutoplay)

apresentacaoSlide(0)
startAutoplay()
