import { ref } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);

  const fetchPost = async () => {
    try {
      const docRef = doc(firestore, "posts", id);
      const document = await getDoc(docRef);

      post.value = { ...document.data(), id };

    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, fetchPost };
};

export default getPost;
