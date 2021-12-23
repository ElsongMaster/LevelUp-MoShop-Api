<template>
  <div class="mainContent">
    <div class="form-container w-1/2 h-screen flex flex-col justify-center">


      <div class="form-content bg-white rounded-lg mt-4">
        <form class="rounded-lg w-3/4 mx-auto mt-5">
          <div class="form-line my-5">
            <input
              id="email"
              class="border-2 border-gray-300 rounded-md p-2"
              type="text"
              placeholder="Email Address"
              :isEmpty="false"
              v-model="bodyDataForm.email"
            />
            <p v-show="!inputEmail.isValid" class="textError pt-2">
              look like this is not an email
            </p>
            <p v-show="inputEmail.isEmpty" class="textError pt-2">
              Email cannot be empty
            </p>
          </div>
          <div id="Password" class="form-line my-5">
            <input
              class="border-2 border-gray-300 rounded-md p-2"
              type="password"
              placeholder="Password"
              :isEmpty="false"
              v-model="bodyDataForm.password"
            />
            <p v-show="inputPassword.isEmpty" class="textError">
              Password cannot be empty
            </p>
          </div>

          <button
            class="btnSubmit rounded-sm"
            @click="checkValidityData($event)"
          >
            Login
          </button>
        </form>

        <p class="text-xs my-4">
          By clicking the button, you are agreeing to our
          <a class="link text-xs" href="#">Terms and Services</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isOkToSubmit: true,
      bodyDataForm: {
        email: null,
        password: null,
      },
      inputEmail: {
        isEmpty: false,
        isValid: true,
      },
      inputPassword: {
        isEmpty: false,
      },
    };
  },

  computed: {
    ...mapState(["tokenConnexion"]),
  },

  methods: {
    checkValidityData(e) {
      (this.inputEmail.isEmpty = false), (this.inputEmail.isValid = true);
      this.inputPassword.isEmpty = false;
      e.preventDefault();
      var tabInputBis = Array.from(document.getElementsByTagName("input"));
      let elt = null;
      for (var i = 0; i < tabInputBis.length; i++) {
        switch (i) {
          case 0:
            elt = tabInputBis[i];

            if (elt.value == "") {
              this.inputEmail.isEmpty = true;
              elt.classList.add("error");
              this.isOkToSubmit = false;
            } else if (
              !elt.value.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              )
            ) {
              this.inputEmail.isValid = false;
              this.isOkToSubmit = false;

              elt.value = "";
              elt.placeholder =
                "email@example/com                                       !";
              elt.classList.add("error");
            }
            break;
          case 1:
            elt = tabInputBis[i];
            if (elt.value == "") {
              this.inputPassword.isEmpty = true;
              elt.classList.add("error");
              this.isOkToSubmit = false;
            }
            break;

          default:
            break;
        }
      }

      this.sendDataForm();
    },
    sendDataForm() {

      var formRequest = new FormData();
      var tokenReq = null;
      formRequest.append("email", this.bodyDataForm.email);
      formRequest.append("password", this.bodyDataForm.password);

      if (this.isOkToSubmit) {
        axios
          .post("https://api-moshop.molengeek.pro/api/v1/login", formRequest)
          .then((response) => {
            console.log("login", response);
            tokenReq = response.data.data.token;

            this.$store.dispatch("updateTokenConnexion", tokenReq);
            localStorage.setItem("tokenConnexion", tokenReq);
            this.$router.push({ path: "/" });

            //call api data user
            axios
              .get("https://api-moshop.molengeek.pro/api/v1/user", {
                headers: { Authorization: "Bearer " + tokenReq },
              })
              .then((res) => {
                console.log("user", res);
                let profilUser = res.data.data.profile;
                console.log("profil", profilUser);
                localStorage.setItem(
                  "profilUserConnected",
                  JSON.stringify(profilUser)
                );
                this.$store.dispatch("updateProfilUserConnected", profilUser);

                // Recuperer data mon shop
                axios
                  .get("https://api-moshop.molengeek.pro/api/v1/shop", {
                    headers: { Authorization: "Bearer " + tokenReq },
                  })
                  .then((res) => {
                    console.log("monshop", res);
                    let dataShop = res.data.data;
                    localStorage.setItem(
                      "dataMonShop",
                      JSON.stringify(res.data.data)
                    );
                    this.$store.dispatch("updateDataMonShop", dataShop);
                  })


                // Recuperer data cart
                axios
                  .get("https://api-moshop.molengeek.pro/api/v1/cart", {
                    headers: { Authorization: "Bearer " + tokenReq },
                  })
                  .then((res) => {
                    console.log("cart", res);
                    let dataCart = res.data.data;
                    localStorage.setItem(
                      "dataCart",
                      JSON.stringify(dataCart)
                    );

                  })

              })

          });

      }
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  .mainContent {
    background-color: gray;
    min-height: 90vh;
    width: 100%;
    display: flex;
    justify-content: center;

    .form-content {
      min-height: 150px;
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      input {
        outline: none;
      }
    }
  }
}
.error {
  border: 1px solid rgb(214, 100, 100);
}

.error::placeholder {
  color: rgb(214, 100, 100);
}

.error {
  font-family: " Arial", "Font Awesome";
  font-weight: 900;
}

.textError {
  font-size: 9px;
  text-align: end;
  width: 100%;
  color: rgb(214, 100, 100);
}

.btnSubmit {
  background-color: rgb(119, 226, 180);
  color: white;
  text-transform: uppercase;
  padding: 5px 10px;
}

.link {
  color: rgb(214, 100, 100);
}

.try-paraph {
  background-color: rgb(93, 84, 163);
  color: white;
  box-shadow: 0 5px 0 0 rgba(0, 0, 0, 0.2);
}
form {
  * {
    width: 100%;
  }
}
</style>
