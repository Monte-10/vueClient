<template>
  <div id="container">
    <div class="error-container">
      <div
        class="alert alert-danger mt-4 error-message"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
    </div>
    <div id="squares-container">
      <div id="container_square">
        <div class="square square01" @click="sendPostRequest(0)"></div>
      </div>
      <div id="container_square">
        <div class="square square02" @click="sendPostRequest(1)"></div>
      </div>
      <div id="container_square">
        <div class="square square03" @click="sendPostRequest(2)"></div>
      </div>
      <div id="container_square">
        <div class="square square04" @click="sendPostRequest(3)"></div>
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
  /* fallback for old browsers */
  background: #667eea;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(102, 126, 234, 1),
    rgba(118, 75, 162, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(102, 126, 234, 1),
    rgba(118, 75, 162, 1)
  );
}

#container_square {
  width: 45%;
  aspect-ratio: 1;
}

#squares-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  flex-basis: 75%;
  aspect-ratio: 1;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #fff;
}

.square {
  border-radius: 10%;
  height: 100%;
  width: 100%;
}

.square01 {
  background-color: rgb(235, 83, 83);
}

.square01:hover {
  background-color: rgb(265, 113, 113);
}

.square02 {
  background-color: rgb(24, 116, 152);
}

.square02:hover {
  background-color: rgb(54, 146, 182);
}

.square03 {
  background-color: rgb(54, 174, 124);
}

.square03:hover {
  background-color: rgb(84, 204, 154);
}

.square04 {
  background-color: rgb(246, 186, 111);
}

.square04:hover {
  background-color: rgb(276, 216, 141);
}

.error-message {
  width: 100%;
  text-align: center;
}

.error-container {
  width: 50%;
  height: 10%;
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
      error: "",
    };
  },
  methods: {
    sendPostRequest(answerNo) {
      let url = "";
      if (process.env.NODE_ENV == "development") {
        url = "http://localhost:8000/api/guesses/";
      } else {
        url = "https://kahootclone-6esl.onrender.com/api/guesses/";
      }
      axios
        .post(url, {
          answer: answerNo,
          uuidp: sessionStorage.getItem("uuidP"),
          game: sessionStorage.getItem("gameID"),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.error;
        });
    },
  },
};
</script>
