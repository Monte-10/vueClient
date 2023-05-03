<template>
  <div id="container">
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
#container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  background: #667eea;


  background: -webkit-linear-gradient(
    to right,
    rgba(102, 126, 234, 1),
    rgba(118, 75, 162, 1)
  );

  background: linear-gradient(
    to right,
    rgba(102, 126, 234, 1),
    rgba(118, 75, 162, 1)
  );
}
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

  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
