<template>
  <div class="mainContent">
    <div class="form-container w-1/2 h-screen flex flex-col justify-center">
      <!-- <a class="try-paraph rounded-lg py-3 text-sm" href=""
        ><span>Try it free 7 days</span> then $20/mo.thereafter</a
      > -->

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
      console.log("dans ma fonction");

      var formRequest = new FormData();

      formRequest.append("email", this.bodyDataForm.email);
      formRequest.append("password", this.bodyDataForm.password);

      if (this.isOkToSubmit) {
        axios
          .post("https://api-moshop.molengeek.pro/api/v1/login", formRequest)
          .then((response) => {
            console.log("login", response);

            this.$store.dispatch(
              "updateTokenConnexion",
              response.data.data.token
            );
            let token = response.data.data.token;
            localStorage.setItem("tokenConnexion", JSON.stringify(token));
            this.$router.push({ path: "/" });
          })
          .catch(function (error) {
            if (error.response) {
              console.log("response:", error.response.request);
            } else if (error.request) {
              console.log("request:", error.request);
            } else if (error.message) {
              console.log("message:", error.message);
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .signup{
//   background-image: url(./assets/bg-intro-desktop.png);
//   background-size: cover;
//   background-color: rgb(255,121,120);
// }
body {
  background-color: gray;
  .mainContent {
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
