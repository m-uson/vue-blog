<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Заголовок</label>
      <input v-model="title" type="text" required />

      <label>Контент:</label>
      <textarea v-model="body"></textarea>

      <label>Загрузите картинку:</label>
      <input @change="sendImage" type="file" />

      <label>Теги (Нажмите на Enter чтобы добавить тег)</label>
      <div class="add-tag">
        <input
          @keydown.enter.prevent="handleAddTag"
          v-model="tag"
          type="text"
        />
        <span @click="handleAddTag">Добавить</span>
      </div>
      <div v-for="tag in tags" :key="tag" class="pill">
        <span @click="handleDeleteTag(tag)">#{{ tag }}</span>
      </div>
      <div class="error" v-if="error">{{ error }}</div>

      <button v-if="!isLoading">Создать</button>
      <button v-else class="disabled" disabled>
        <span>Идет загрузка...</span>
        <Spinner />
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useStorage } from "../composables/useStorage";
import Spinner from "@/components/Spinner";
export default {
  components: { Spinner },
  setup() {
    const title = ref("");
    const error = ref(null);
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);
    const router = useRouter();
    const image = ref(null);
    const { uploadImageToFirebase } = useStorage();
    const isLoading = ref(false);

    const sendImage = (event) => {
      image.value = event.target.files[0];
    };

    const handleAddTag = () => {
      if (
        !tags.value.includes(tag.value) &&
        !tag.value.includes(" ") &&
        tag.value
      ) {
        tags.value.push(tag.value);
        tag.value = "";
        error.value = "";
      }
      tag.value = "";
    };

    const handleDeleteTag = (item) => {
      tags.value = tags.value.filter((tag) => tag !== item);
    };

    const handleSubmit = async () => {
      const newPost = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        createdAt: serverTimestamp(),
      };

      try {
        isLoading.value = true;
        if (!tags.value.length) {
          error.value = "Поле тегов не может быть пуста!";
          throw Error("Поле тегов не может быть пуста!");
        }

        if (image.value !== null) {
          const getImageUrl = await uploadImageToFirebase(image.value);

          await addDoc(collection(firestore, "posts"), {
            ...newPost,
            imageUrl: getImageUrl,
          });
        } else {
          await addDoc(collection(firestore, "posts"), newPost);
        }
        isLoading.value = false;

        router.push("/");
      } catch (err) {
        isLoading.value = false;
        error.value = err.message;
      }
    };

    return {
      isLoading,
      sendImage,
      error,
      title,
      body,
      tag,
      handleSubmit,
      tags,
      handleAddTag,
      handleDeleteTag,
    };
  },
};
</script>

<style>
.add-tag {
  position: relative;
}
.add-tag input {
  padding-right: 120px;
}
.add-tag span {
  position: absolute;
  right: 2px;
  top: 5px;
  color: #444;
  padding: 5px 20px;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 700;
}
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
.disabled {
  background-color: transparent;
  color: #444;
  display: flex;
  align-items: center;
  margin-top: -25px;
  padding: 0;
}
.disabled span {
  margin-right: 25px;
}

input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
  padding: 2px 0;
}
label::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  top: 0;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}
button {
  display: block;
  margin-top: 30px;
  background: #ff8800;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}

.error {
  color: red;
  margin-top: 10px;
}

@media screen and (max-width: 576px) {
  form {
    max-width: 300px;
  }
  label::before {
    left: -20px;
  }
}
</style>