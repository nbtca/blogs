<template>
  <div>
    <script
      src="https://giscus.app/client.js"
      data-repo="nbtca/blogs"
      data-repo-id="R_kgDOKylXpA"
      data-category="General"
      data-category-id="DIC_kwDOKylXpM4CbVRo"
      data-mapping="title"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      :data-theme="theme"
      data-lang="zh-CN"
      data-loading="lazy"
      crossorigin="anonymous"
      async
    ></script>
  </div>
</template>
<style scoped></style>
<script lang="ts">
// https://github.com/giscus/giscus-component/blob/main/vue/src/lib/types.ts
export default {
  props: {
    theme: {
      type: String,
      default: "noborder_gray",
    },
  },
};
</script>
