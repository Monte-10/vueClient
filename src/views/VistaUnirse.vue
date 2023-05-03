<template>
  <div id="container" class="full-height">
    <div class="container-fluid h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-lg-6 col-md-8 col-sm-10 col-xs-12">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title text-center text-dark mb-5">
                ¡Unete a una partida!
              </h1>
              <form @submit.prevent="addParticipant">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="alias"
                    id="alias"
                    placeholder="Introduce tu alias"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="gameID"
                    id="gameId"
                    placeholder="Introduce el ID de la partida"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-outline-primary w-100 mt-4"
                >
                  Unirse
                </button>
              </form>
              <div class="alert alert-danger mt-4" role="alert" v-if="error">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
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

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-group {
  width: 100%;
}

.form-control {
  border-radius: 10px;
  border: none;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.form-control::placeholder {
  color: #a1a1a1;
}

.btn {
  border-radius: 10px;
  font-size: 1.2em;
  text-transform: uppercase;
}
</style>

<script>
import axios from "axios";
export default {
  name: "VistaUnirse",
  data() {
    return {
      alias: "",
      gameID: "",
      error: "",
    };
  },
  methods: {
    addParticipant() {
      const url =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/api/participants/"
          : "https://kahootclone-6esl.onrender.com/api/participants/";
      axios
        .post(url, {
          alias: this.alias,
          game: this.gameID,
        })
        .then((response) => {
          // Guarda el alias y uuidp
          sessionStorage.setItem("alias", this.alias);
          sessionStorage.setItem("uuidP", response.data.uuidP);
          sessionStorage.setItem("gameID", this.gameID);
          this.$router.push("/wait");
        })
        .catch((error) => {
          console.log(error.response.data.error);
          this.error = error.response.data.error;
          console.log(this.error);
        });
    },
  },
};
</script>
