<template>
  <div class="container">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="grid">
      <PostsList :posts="posts" />
      <TagsCloud :posts="posts"/>
    </div>
    <div v-else><Spinner /></div>
  </div>
</template>

<script>
import PostsList from "@/components/PostsList";
import { onMounted } from "@vue/runtime-core";
import getPosts from "@/composables/getPosts";
import Spinner from "@/components/Spinner";
import TagsCloud from '@/components/TagsCloud'
export default {
  name: "Home",
  components: { PostsList, Spinner,TagsCloud },
  setup() {
    const { posts, error, fetchPosts } = getPosts();

    onMounted(() => {
      fetchPosts();
    });

    return { posts, error };
  },
};
</script>


<style>
.grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
@media screen and (max-width: 576px) {
  .grid {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>