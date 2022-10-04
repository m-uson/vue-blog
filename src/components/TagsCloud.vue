<template>
  <div class="tags-cloud">
    <h3>Теги</h3>
    <div v-for="tag in tags" :key="tag">
      <router-link :to="{ name: 'Tags', params: { tag } }">
        #{{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import useTags from "@/composables/useTags";
export default {
  props: ["posts"],
  setup(props) {
    console.log(props.posts)
    const { tags } = useTags(props.posts);

    return { tags };
  },
};
</script>

<style>
.tags-cloud {
  padding: 10px;
}
.tags-cloud h3 {
  border-bottom: 1px solid #eee;
  padding: 16px 8px;
  color: #444;
}
.tags-cloud div {
  display: inline-block;
  padding: 10px;
}
.tags-cloud a {
  color: #ccc;
  text-decoration: none;
}
.tags-cloud a.router-link-active {
  color: #ff8800;
  font-weight: bold;
}
</style>