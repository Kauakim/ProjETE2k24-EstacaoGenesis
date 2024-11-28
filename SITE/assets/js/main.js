/*=============== MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Mostrar menu */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Ocultar menu */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const closeConfig = document.querySelector('.fechar-config');

  // Adiciona evento de clique aos círculos de cor
  const estiloElementos = document.querySelectorAll('.circle-color');
  estiloElementos.forEach((elemento) => {
      elemento.addEventListener('click', () => {
          estiloElementos.forEach((el) => el.classList.remove('selected')); // Remove a seleção de todos
          elemento.classList.add('selected'); // Marca o círculo clicado como selecionado
      });
  });

  closeConfig.addEventListener('click', () => {
      // Coleta a cor selecionada (estilo)
      let estilo = 'yellow';
      estiloElementos.forEach((elemento) => {
          if (elemento.classList.contains('selected')) {
              estilo = elemento.getAttribute('data-color') || 'Cor não definida'; // Captura a cor do atributo data-color
          }
      });

      paleta = document.getElementById('paleta');

      if(estilo == "yellow"){paleta.href = "../assets/CSS/paleta1.css";}
      else if(estilo == "green"){paleta.href = "../assets/CSS/paleta2.css";}
      else if(estilo == "blue"){paleta.href = "../assets/CSS/paleta3.css";}
      else if(estilo == "black"){paleta.href = "../assets/CSS/paleta4.css";}
      else if(estilo == "white"){paleta.href = "../assets/CSS/paleta5.css";}
      else if(estilo == "grey"){paleta.href = "../assets/CSS/paleta6.css";}

      // Fecha a aba de configurações
      const glassBackground = document.querySelector('.glass-background');
      glassBackground.classList.remove('visible');
      closeConfig.closest('.pai-ct-config').classList.remove('open');
  });
});