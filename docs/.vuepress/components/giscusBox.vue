<template>
  <div>
    <div v-if="show">
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
    <div v-else class="change-theme">
      <!-- skelon text -->
      <p>正在切换主题...</p>
    </div>
  </div>
</template>
<style scoped>
.change-theme {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
<script lang="ts">
export default {
  data() {
    return {
      // https://github.com/giscus/giscus-component/blob/main/vue/src/lib/types.ts
      theme: this.getCurrentTheme(),
      show: true,
    };
  },
  watch: {
    theme: {
      //主题变化时重新加载giscus
      handler: function (val, oldVal) {
        this.show = false;
        // 让 giscus 重新加载
        setTimeout(() => (this.show = true), 1000);
      },
    },
  },
  methods: {
    getCurrentTheme() {
      if (document.body.classList.contains("theme-mode-dark")) {
        return "noborder_dark";
      } else {
        return "noborder_light";
      }
    },
    refreshTheme() {
      //   console.log("className 变动:", document.body.classList);
      this.theme = this.getCurrentTheme();
    },
  },
  mounted() {
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // 检查是否是我们关心的变动（属性变动并且是className）
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          // 在控制台打印新的 className 值
          this.refreshTheme();
        }
      });
    })
      // 配置 MutationObserver 来监视 document.body
      .observe(document.body, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
      });
  },
};
</script>
