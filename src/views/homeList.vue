<template>
  <div id="homelist">
    <h1>I am title</h1>
    <div>Home List</div>
    <div>
      <button @click="jumpto">跳转到detailorder</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arg0: "我是从hostlist过来的",
    };
  },
  methods: {
    jumpto() {
      this.$router.push({
        path: "preview",
        query: {
          desc: this.arg0,
        },
      });
    },
  },
};
</script>

