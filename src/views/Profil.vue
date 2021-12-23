<template>
  <div class="mainContent">
    <h1>Mon profil</h1>
    <div class="card-profile">
      <div class="container-img" v-if="!profilDataEdit.picture.isToEdit">
        <img
          :src="'https://api-moshop.molengeek.pro' + profilUser.picture_path"
          alt="Image profil"
        />
        <i class="fas fa-edit" @click="updateProfilDataEdit('picture')"></i>
      </div>
      <div class="container-uploadImg" v-if="profilDataEdit.picture.isToEdit">
        <img
          :src="'https://api-moshop.molengeek.pro/images/' + imgUrl"
          :alt="altImg"
        />
        <label for="file" class="label-file"
          >Choisir une image<input
            id="file"
            class="input-file"
            type="file"
            ref="file"
            @change="uploadFile"
        /></label>
        <span class="btn" @click="submitValue('picture')">ok</span>
      </div>
      <div class="text-card">
        <div class="container_text-line">
          <p>
            <span>Prénom: </span>
            <span ref="firstname" v-if="!profilDataEdit.firstname.isToEdit">{{
              profilUser.firstname
            }}</span
            ><input
              type="text"
              v-if="profilDataEdit.firstname.isToEdit"
              v-model="profilDataEdit.firstname.inputValue"
              @keyup.enter="submitValue('firstname')"
            />
          </p>
          <i
            class="fas fa-edit"
            @click="updateProfilDataEdit('firstname')"
            id="firstname"
          ></i>
        </div>
        <div class="container_text-line">
          <p>
            <span>Nom: </span>
            <span ref="lastname" v-if="!profilDataEdit.lastname.isToEdit">{{
              profilUser.lastname
            }}</span>
            <input
              type="text"
              v-if="profilDataEdit.lastname.isToEdit"
              v-model="profilDataEdit.lastname.inputValue"
              @keyup.enter="submitValue('lastname')"
            />
          </p>
          <i
            class="fas fa-edit"
            @click="updateProfilDataEdit('lastname')"
            id="lastname"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
    name:"Profil",
  data() {
    return {
      profilUser: null,

      profilDataEdit: {
        firstname: {
          isToEdit: false,
          inputValue: this.$store.state.profilUserConnected.firstname,
        },
        lastname: {
          isToEdit: false,
          inputValue: this.$store.state.profilUserConnected.lastname,
        },
        picture: {
          isToEdit: false,
          inputValue: null,
        },
      },
    };
  },

  mounted() {
    this.profilUser = this.profilUserConnected;
  },
  computed: {
    ...mapState(["profilUserConnected", "tokenConnexion"]),

  },

  methods: {
    submitValue(nameFieldToEdit) {
      this.profilUser[nameFieldToEdit] =
        this.profilDataEdit[nameFieldToEdit].inputValue;
      this.profilDataEdit[nameFieldToEdit].isToEdit = false;

      if (nameFieldToEdit == "picture") {
          
        let formRequest = new FormData();

        let img = this.profilDataEdit.picture.inputValue;
        let tokenReq = this.tokenConnexion;
        formRequest.append("picture", img);

        axios.put(
          "https://api-moshop.molengeek.pro/api/v1/user/picture",
          formRequest,
          {
            headers: {
              Authorization: "Bearer " + tokenReq,
            },
          }
        ).then(()=>{
            axios
              .get("https://api-moshop.molengeek.pro/api/v1/user", {
                headers: { Authorization: "Bearer " + tokenReq },
              })
              .then((res) => {
                console.log("user", res);
                let profilUser = res.data.data.profile;
                localStorage.setItem(
                  "profilUserConnected",
                  JSON.stringify(profilUser)
                );
                this.$store.dispatch("updateProfilUserConnected", profilUser);
              });
            location.reload()
        })
      } else {

        let formRequest = new FormData();
        formRequest.append(
          "firstname",
          this.profilDataEdit.firstname.inputValue
        );
        formRequest.append("lastname", this.profilDataEdit.lastname.inputValue);

        let tokenReq = this.tokenConnexion;
        let frstNm = this.profilDataEdit.firstname.inputValue;
        let lstNm = this.profilDataEdit.lastname.inputValue;
        axios
          .put(
            "https://api-moshop.molengeek.pro/api/v1/user",
            { firstname: frstNm, lastname: lstNm },
            { headers: { Authorization: "Bearer " + tokenReq } }
          )
          .then((res) => {
            console.log("put", res);
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
              });
          })

      }
    },
    updateProfilDataEdit(nameFieldToEdit) {
      this.profilDataEdit[nameFieldToEdit].isToEdit = true;
    },
    uploadFile() {
      this.profilDataEdit.picture.inputValue = this.$refs.file.files.item(0);

    },
  },
};
</script>

<style lang="scss" scoped>
.mainContent {
  border: 2px solid;
  min-height: 80vh;
  height: fit-content;
  width: 50vw;
  margin: 0 auto;

  h1 {
    font-size: 30px;
    font-weight: bold;
  }
  input {
    border: 1px solid rgba(160, 158, 158, 0.3);
    outline: none;
  }
  .card-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    min-width: 400px;
    margin: 0 auto;

    i {
      width: fit-content;
      background-color: yellow;
      padding: 10px;
      border-radius: 5px;
    }
    i:hover {
      cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
        auto;
    }
    .container-img {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 50%;
      width: 100%;
      // border: 1px solid green;
      img {
        height: 100px;
        width: 150px;
        object-fit: cover;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        margin: 10px auto;
      }
      i {
        display: inline-flex;
        margin: 0 auto;
      }
    }
    .container-uploadImg {
      .btn {
        padding: 0.5em;
        background-color: rgb(0, 119, 255);
        border-radius: 5px;
      }
      .btn:hover {
        cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
          auto;
      }
    }
    .text-card {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-top: 30px;
      //   border: 1px solid;
      min-height: 100px;
      height: 100px;
      .container_text-line {
        display: flex;
        justify-content: space-between;
        width: 100%;
        // width: 200px;
        // border: 1px solid;
        p {
          // border: 2px solid;
          text-align: left;
          span:first-child {
            font-weight: bold;
          }
        }
        i {
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
