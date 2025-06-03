const carrosselImagens = document.querySelector(".carrossel-images");

// Conta quantas imagens existem no carrossel
const totalSlides = document.querySelectorAll(".carrossel-images img").length;

const indicadores = document.querySelectorAll(".indicador");
let indexAtual = 0;

let autoplayIntervalo;

document.querySelector(".proximo").addEventListener("click", () => {
  // Avança para o próximo slide (ou volta ao primeiro se estiver no último)
  apresentacaoSlide((indexAtual + 1) % totalSlides);
});

// Evento de clique no botão "anterior"
document.querySelector(".anterior").addEventListener("click", () => {
  apresentacaoSlide((indexAtual - 1 + totalSlides) % totalSlides);
});

// Adiciona evento de clique em cada bolinha (indicador)
indicadores.forEach((indicador) => {
  indicador.addEventListener("click", () => {
    // Lê o número do slide que a bolinha representa
    const index = parseInt(indicador.getAttribute("data-index"));
    // Vai diretamente para o slide correspondente
    apresentacaoSlide(index);
  });
});

// Função que muda o slide visível

function apresentacaoSlide(index) {
  // Descobre a largura do carrossel para calcular o deslocamento
  const larguraSlide = document.querySelector(".carrossel").clientWidth;

  // Move o container das imagens para a esquerda (-index * largura)
  carrosselImagens.style.transform = `translateX(-${index * larguraSlide}px)`;

  indexAtual = index;

  atualizarIndicadores();
}

function atualizarIndicadores() {
  indicadores.forEach((indicador) => indicador.classList.remove("active"));

  indicadores[indexAtual].classList.add("active");
}

// Troca de slide a cada 4 segundos (4000ms)
function startAutoplay() {
  autoplayIntervalo = setInterval(() => {
    apresentacaoSlide((indexAtual + 1) % totalSlides);
  }, 4000);
}

// Função que pausa o autoplay
function stopAutoplay() {
  clearInterval(autoplayIntervalo);
}

document
  .querySelector(".carrossel")
  .addEventListener("mouseenter", stopAutoplay);

document
  .querySelector(".carrossel")
  .addEventListener("mouseleave", startAutoplay);

apresentacaoSlide(0);
startAutoplay();

// MENU MOBILE
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.toggle("active");
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.remove("active");
}

document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (
    !mobileMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    mobileMenu.classList.remove("active");
  }
});

let textoInicio = document.querySelector('.inicio-texto')
let textoSobre = document.querySelector('.sobre-texto')


// muda o texto de acordo com o tamanho da tela (mobile ou desktop)
function mediaQ() {
  if (window.innerWidth <= 768) {
    textoInicio.innerHTML = `Aqui na <strong>LK's</strong> oferecemos mais que cabelo, barba e bigode.`

    textoSobre.innerHTML = `Estamos no mercado há mais de 10 anos. Nossa equipe é composta por profissionais altamente qualificados.`
  } else {
    textoInicio.innerHTML = `Aqui na <strong>LK's</strong> oferecemos mais que <strong>cabelo, barba e bigode</strong>. Aqui você encontra e faz amigos enquanto relaxa e recebe um atendimento personalizado com profissionais altamente qualificados.</p>`

    textoSobre.innerHTML = `Estamos no mercado há mais de 10 anos. Nossa equipe é composta por profissionais altamente qualificados, comprometidos em oferecer um atendimento personalizado, com técnica apurada e atenção às preferências de cada cliente. Na LK's, cultivamos não apenas a estética, mas também o relacionamento.`
  }

}

window.addEventListener('resize', mediaQ)
mediaQ()

// Smooth scroll com offset para mobile
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     const target = document.querySelector(this.getAttribute("href"));
//     if (target) {
//       // Só previne o padrão e faz scroll manual em telas pequenas
//       if (window.innerWidth <= 768) {
//         e.preventDefault();
//         const offsetTop = target.offsetTop - 80; // ajuste conforme header mobile
//         window.scrollTo({
//           top: offsetTop,
//           behavior: "smooth",
//         });
//       }
//       // Em telas grandes, deixa o CSS cuidar do scroll suave
//     }
//   });
// });

