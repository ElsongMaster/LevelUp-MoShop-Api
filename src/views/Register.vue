<template>
  <div class="mainContent">
    <div class="form-container w-1/2 h-screen flex flex-col justify-center">


      <div class="form-content bg-white rounded-lg mt-4">
        <form
          class="rounded-lg w-3/4 mx-auto mt-5"
          @submit="sendDataForm($event)"
        >
          <div class="form-line">
            <input
              id="picture"
              class="border-2 border-gray-300 rounded-md p-2"
              type="file"
              :isEmpty="false"
              ref="file"
              @change="uploadFile"
            />
            <p v-show="inputFile.isEmpty" class="textError pt-2">
              Image cannot be empty
            </p>
            <p v-show="inputFile.isTooBig" class="textError pt-2">
              Image size is too big (max 2mb)
            </p>
            <p v-show="!inputFile.isGoodExtension" class="textError pt-2">
              Image extension is not supported (has to be: png , jpeg, jpg)
            </p>
          </div>
          <div class="form-line my-4">
            <input
              id="first Name"
              class="border-2 border-gray-300 rounded-md p-2"
              type="text"
              placeholder="firstname"
              :isEmpty="false"
              v-model="bodyDataForm.firstname"
            />
            <p v-show="inputFirstName.isEmpty" class="textError pt-2">
              First Name cannot be empty
            </p>
          </div>
          <div class="form-line my-5">
            <input
              id="Last Name"
              class="border-2 border-gray-300 rounded-md p-2"
              type="text"
              placeholder="Last Name"
              :isEmpty="false"
              v-model="bodyDataForm.lastname"
            />
            <p v-show="inputFirstName.isEmpty" class="textError pt-2">
              First Name cannot be empty
            </p>
          </div>
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
            <p v-show="!inputPassword.isLongEnough" class="textError">
              Password is too short min. 4 characters
            </p>
          </div>

          <button
            class="btnSubmit rounded-sm"
            @click="checkValidityData($event)"
          >
            Register
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
      image: null,
      isOkToSubmit: true,
      inputFile: {
        isEmpty: false,
        isTooBig: false,
        isGoodExtension: true,
      },
      inputFirstName: {
        isEmpty: false,
      },
      inputLastName: {
        isEmpty: false,
      },
      inputEmail: {
        isEmpty: false,
        isValid: true,
      },
      inputPassword: {
        isEmpty: false,
        isLongEnough: true,
      },

      bodyDataForm: {
        picture: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(["tokenConnexion"]),
  },

  methods: {
    checkValidityData(e) {
      this.inputFirstName.isEmpty = false;
      this.inputLastName.isEmpty = false;
      (this.inputEmail.isEmpty = false), (this.inputEmail.isValid = true);
      this.inputPassword.isEmpty = false;
      e.preventDefault();
      var tabInputBis = Array.from(document.getElementsByTagName("input"));
      let elt = null;
      let fsize = null;
      for (var i = 0; i < tabInputBis.length; i++) {
        switch (i) {
          case 0:
            elt = tabInputBis[i];
            if (elt.value == "") {
              this.inputFile.isEmpty = true;
              elt.classList.add("error");
              this.isOkToSubmit = false;
            } else {
              fsize = Math.round(elt.files.item(0).size / 1024);
              if (fsize > 2000) {
                elt.classList.add("error");
                this.inputFile.isTooBig = true;
                this.isOkToSubmit = false;
              } else if (
                !["jpeg", "jpg", "png"].includes(elt.value.split(".").pop())
              ) {
                this.inputFile.isGoodExtension = false;
                this.isOkToSubmit = false;
              }
            }
            break;
          case 1:
            elt = tabInputBis[i];
            if (elt.value == "") {
              this.inputFirstName.isEmpty = true;
              elt.classList.add("error");
              this.isOkToSubmit = false;
            }
            break;
          case 2:
            elt = tabInputBis[i];
            if (elt.value == "") {
              this.inputLastName.isEmpty = true;
              elt.classList.add("error");
              this.isOkToSubmit = false;
            }
            break;
          case 3:
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
          case 4:
            elt = tabInputBis[i];
            if (elt.value == "") {
              this.inputPassword.isEmpty = true;
              elt.classList.add("error");
              this.isOkToSubmit = false;
            } else if (elt.value.length < 4) {
              elt.classList.add("error");
              this.inputPassword.isLongEnough = false;
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
      var imageUrl = document.getElementById("picture").files.item(0);
      var formRequest = new FormData();
      formRequest.append("picture", this.image);
      formRequest.append("firstname", this.bodyDataForm.firstname);
      formRequest.append("lastname", this.bodyDataForm.lastname);
      formRequest.append("email", this.bodyDataForm.email);
      formRequest.append("password", this.bodyDataForm.password);

      if (this.isOkToSubmit) {

        this.bodyDataForm.picture = imageUrl;

        axios
          .post(
            "https://api-moshop.molengeek.pro/api/v1/register",
            formRequest,

            {
              "Content-Type": "multipart/form-data",
            }
          )
          .then((response) => {
            console.log("register", response);
          });
      }
    },

    uploadFile() {
      this.image = this.$refs.file.files[0];
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

    input {
      outline: none;
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
