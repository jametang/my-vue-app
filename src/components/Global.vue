<script type="text/javascript">
// 定义一些公共的属性和方法
const httpUrl = "http://39.105.17.99:8080/";
function initDB() {
  const cloudbase = require("@cloudbase/node-sdk");
  const app = cloudbase.init({
    env: "my-vue-app-6gy9qpwhaa42ffed",
  });
  this.database = app.database();
  
  console.log("Global initDB complete");
}
// 暴露出这些属性和方法

export default {
  httpUrl,
  initDB,
  data() {
    return {
      database,
    };
  }
};
</script>