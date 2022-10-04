<template>
  <div class="container">
    <div v-if="error">{{ error }}</div>
    <div v-if="filteredTags.length" class="grid">
      <PostsList :posts="filteredTags" />
      <TagsCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import getPosts from "@/composables/getPosts";
import Spinner from "@/components/Spinner";
import { computed, onMounted } from "@vue/runtime-core";
import PostsList from "@/components/PostsList";
import TagsCloud from '@/components/TagsCloud'
export default {
  props: ["tag"],
  components: { Spinner, PostsList,TagsCloud },
  setup(props) {
    const { posts, error, fetchPosts } = getPosts();

    const filteredTags = computed(() => {
      return posts.value.filter((post) => post.tags.includes(props.tag));
    });

    onMounted(() => {
      fetchPosts();
    });

    return { filteredTags, error,posts };
  },
};
</script>

<style>
</style>