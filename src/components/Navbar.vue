<template>
  <header>
    <h1>Блог Усона</h1>
    <nav>
      <router-link :to="{ name: 'Home' }">Главная</router-link>
      <router-link :to="{ name: 'Create' }">Создать Пост</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
header h1 {
  color: #dfdfdf;
  font-size: 48px;
}
header a {
  color: #bbb;
  text-decoration: none;
  margin-left: 20px;
}
header a.router-link-active {
  color: #444;
  font-weight: bold;
}

@media screen and (max-width: 576px) {
  header {
    flex-direction: column;
  }
  nav {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
}
</style>