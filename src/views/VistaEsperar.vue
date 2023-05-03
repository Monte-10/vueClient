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

    // Cambia los colores
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

    // body de pagina
    const body = document.getElementsByTagName("body")[0];

    // Hace la transición
    function transitionColor(currentTime) {
      // Calcula el porcentaje de tiempo transcurrido
      const percentage = currentTime / transitionTime;

      // Cambia el rgb
      const startColor = colors[currentColorIndex];
      const endColor = colors[(currentColorIndex + 1) % colors.length];
      const interpolatedColor = startColor.map((value, index) => {
        const delta = endColor[index] - value;
        return Math.round(value + delta * percentage);
      });

      // Cambia el fondo
      body.style.backgroundColor = `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`;

      // Sigue la transición si no se ha completado
      if (currentTime < transitionTime) {
        requestAnimationFrame(() => {
          transitionColor(currentTime + 10); // vuelve a llamar a la funcion
        });
      } else {
        // cambia de color
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        // siguiente transición
        transitionColor(0);
      }
    }

    // Inicia todo
    transitionColor(0);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
