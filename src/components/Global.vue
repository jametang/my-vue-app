<script type="text/javascript">
// 定义一些公共的属性和方法
const httpUrl = "http://39.105.17.99:8080/";
function initDB() {
  // const cloudbase = require("@cloudbase/node-sdk");
  // const app = cloudbase.init({
  //   env: "my-vue-app-6gy9qpwhaa42ffed",
  // });
  // this.database = app.database();

  // console.log("Global initDB complete");
  const app = cloudbase.init({
    env: "my-vue-app-6gy9qpwhaa42ffed",
  });

  app
    .auth({
      persistence: "session",
    })
    .anonymousAuthProvider()
    .signIn()
    .then(() => {
      // 登录成功
      console.log("成功");
      this.database = app.database();
    })
    .catch((err) => {
      // 登录失败
      console.log("失败");
    });
  //匿名登录结束
  console.log("发起匿名登录"); // true
}
// 暴露出这些属性和方法
function addData(orderInfo, tableGoods) {
  var moment = require('moment');
  this.database
    .collection("my-vue-app-order-db")
    .add({
      datecomplete: orderInfo.order_datetime, //todo 控件需要时间timepick，获取规范的时间
      datesaled: orderInfo.order_expected_time, //todo 控件需要时间timepick，获取规范的时间
      from: orderInfo.order_from,
      name: orderInfo.order_customer,
      optometrist: orderInfo.order_doctor,
      phone: orderInfo.order_phonenum,
      saler: orderInfo.order_saler,
      order_id: Date.now(),
      create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      goods: tableGoods
    })
    .then((res) => {
      console.log("addData 保存数据成功 %s", res);
    })
    .catch((err) => {
      console.log("addData 保存数据失败 %s", err);
    });
  console.log("addData保存数据"); // true
}

export default {
  httpUrl,
  initDB,
  addData,
  data() {
    return {
      database,
    };
  },
};
</script>