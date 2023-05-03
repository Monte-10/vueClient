<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="row justify-content-center">
      <div class="wait-page__content justify-content-center">
        <h2 class="wait-page__title">Gracias por unirte al juego con ID:</h2>
        <h2 class="wait-page__title">{{ gameID ? gameID : "9999" }}</h2>
        <h3 class="wait-page__subtitle">La partida comenzará pronto</h3>
      </div>
    </div>
  </div>
</template>

<style>
.wait-page__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.wait-page__title {
  font-size: 3rem;
  color: #f8f8f8;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px #3b3b3b;
}

.wait-page__subtitle {
  font-size: 2rem;
  text-align: center;
  color: #f8f8f8;
  margin-bottom: 1rem;
  text-shadow: 2px 2px #3b3b3b;
}
</style>

<script>
/* global process */
import axios from "axios";
export default {
  data() {
    return {
      gameID: sessionStorage.getItem("gameID"),
      interval: null,
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      let url = "";
      if (process.env.NODE_ENV == "development") {
        url = "http://localhost:8000/api/games/" + this.gameID + "/";
      } else {
        url =
          "https://kahootclone-6esl.onrender.com/api/games/" + this.gameID + "/";
      }
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          if (response.data.state == 2) {
            setTimeout(() => {
              this.$router.push("/play");
            }, 1000 * response.data.countdownTime);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
    const transitionTime = 5000;

    // Define los colores de inicio y fin que quieres para la transición
    const colors = [
      [66, 72, 116], // azul oscuro
      [112, 140, 162], // gris azulado
      [198, 198, 168], // verde grisaceo
      [246, 232, 195], // beige
      [243, 201, 136], // amarillo suave
      [214, 148, 96], // naranja suave
      [190, 86, 64], // rojo suave
      [135, 56, 82], // rosa oscuro
    ];

    let currentColorIndex = 0;

    // Obtiene el elemento body de la página
    const body = document.getElementsByTagName("body")[0];

    // Define la función que se llamará para hacer la transición de color
    function transitionColor(currentTime) {
      // Calcula el porcentaje de tiempo transcurrido
      const percentage = currentTime / transitionTime;

      // Interpola los valores RGB de inicio y fin basados en el porcentaje de tiempo transcurrido
      const startColor = colors[currentColorIndex];
      const endColor = colors[(currentColorIndex + 1) % colors.length];
      const interpolatedColor = startColor.map((value, index) => {
        const delta = endColor[index] - value;
        return Math.round(value + delta * percentage);
      });

      // Asigna el nuevo color de fondo a la página
      body.style.backgroundColor = `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`;

      // Si aún no se ha alcanzado el tiempo de transición completo, sigue haciendo la transición
      if (currentTime < transitionTime) {
        requestAnimationFrame(() => {
          transitionColor(currentTime + 10); // llama a la función de transición de nuevo en el siguiente cuadro de animación
        });
      } else {
        // Si se completó la transición, avanza al siguiente color
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        // Inicia la siguiente transición de color
        transitionColor(0);
      }
    }

    // Inicia la transición de color al cargar la página
    transitionColor(0);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
