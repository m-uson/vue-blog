<template>
  <div class="container details">
    <div class="post" v-if="post">
       <img v-if="post.imageUrl" :src="post.imageUrl" alt="" />
      <h3>{{ post.title }}</h3>
      <p>
        {{ post.body }}
      </p>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import getPost from "@/composables/getPost";
import Spinner from "@/components/Spinner";
export default {
  props: ["id"],
  components: { Spinner },
  setup(props) {
    const { post, error, fetchPost } = getPost(props.id);

    onMounted(() => {
      fetchPost()
    });

    return { post, error };
  },
};
</script>

<style>
.details p {
  color: #444;
  line-height: 1.5em;
  margin-top: 25px;
}
.details .post {
  flex-direction: column;
  margin: auto;
  width: 700px;
}
.details .post h3 {
  margin: 25px 0 0;
}
.details .post img {
  width: 100%;
  min-height: 300px;
}
/* .pre {
  white-space: pre-wrap;
} */
</style>