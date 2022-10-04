<template>
  <div class="post">
     <div class="post-details">
      <router-link :to="{ name: 'Details', params: { id: post.id } }">
        <h3>{{ post.title }}</h3></router-link
      >
      <p>
        {{ body }}
      </p>
      <div>
        <router-link
          :to="{ name: 'Tags', params: { tag } }"
          v-for="tag in post.tags"
          :key="tag"
          >#{{ tag }}</router-link
        >
      </div>
    </div>
    <img v-if="post.imageUrl" :src="post.imageUrl" alt="" />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
export default {
  props: ["post"],
  setup(props) {
    const body = computed(() => {
      return props.post.body.substring(0, 300) + "...";
    });

    return { body };
  },
};
</script>


<style>
.post {
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
}
.post-details {
  padding-right: 15px;
}
.post img {
  width: 250px;
  height: 250px;
}
.post p {
  line-height: 1.8;
  max-width: 700px;
}
.post a {
  color: #444;
  font-weight: 700;
  text-decoration: none;
}
.post h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  margin-top: 0;
  max-width: 400px;
}
.post h3::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}
@media screen and (max-width: 576px) {
  .post {
    margin: 0 20px 30px;
    flex-direction: column-reverse;
  }
  .post img {
    margin-bottom: 25px;
    width: 100%;
  }
}
</style>