<script type="text/javascript">
// 定义一些公共的属性和方法
const httpUrl = "http://39.105.17.99:8080/";
function initDB(callback) {
  // const cloudbase = require("@cloudbase/node-sdk");
  // const app = cloudbase.init({
  //   env: "my-vue-app-6gy9qpwhaa42ffed",
  // });
  // this.database = app.database();

  // console.log("Global initDB complete");
  if (this.auth && auth.currentUser) {
    console.log("已经处于登录状态，无需再次登录");
    return;
  }
  const app = cloudbase.init({
    env: "my-vue-app-6gy9qpwhaa42ffed",
  });
  this.auth = app.auth({
    persistence: "session",
  });
  this.auth
    .anonymousAuthProvider()
    .signIn()
    .then(() => {
      // 登录成功
      console.log("登录成功");
      // this.auth = app.auth();
      this.database = app.database();

      callback("success");
    })
    .catch((err) => {
      // 登录失败
      console.log("登录失败");
      callback("failed");
    });
  //匿名登录结束
  console.log("发起匿名登录"); // true
}
// 暴露出这些属性和方法
function addData(orderInfo, tableGoods) {
  var moment = require("moment");
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
      create_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      goods: tableGoods,
    })
    .then((res) => {
      console.log("addData 保存数据成功 %s", res);
    })
    .catch((err) => {
      console.log("addData 保存数据失败 %s", err);
    });
  console.log("addData保存数据"); // true
}

// 暴露出这些属性和方法
function updateData(orderInfo, tableGoods) {
  var moment = require("moment");
  this.database
    .collection("my-vue-app-order-db")
    .doc(orderInfo._id)
    .set({
      datecomplete: orderInfo.order_datetime, //todo 控件需要时间timepick，获取规范的时间
      datesaled: orderInfo.order_expected_time, //todo 控件需要时间timepick，获取规范的时间
      from: orderInfo.order_from,
      name: orderInfo.order_customer,
      optometrist: orderInfo.order_doctor,
      phone: orderInfo.order_phonenum,
      saler: orderInfo.order_saler,
      order_id: Date.now(),
      create_time: orderInfo.create_time,
      modify_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      goods: tableGoods,
    })
    .then((res) => {
      console.log("updateData 保存数据成功 %s", res);
    })
    .catch((err) => {
      console.log("updateData 保存数据失败 %s", err);
    });
  console.log("updateData保存数据"); // true
}

function QueryInfo(callback) {
  const currentUser = this.auth.currentUser;
  const uid = currentUser.uid;
  const _ = this.database.command;
  this.database
    .collection("my-vue-app-order-db")
    .where({
      _openid: _.eq(uid),
    })
    .get()
    .then((res) => {
      console.log("QueryInfo 成功 %s", res);
      callback("success", res);
    })
    .catch((err) => {
      console.log("QueryInfo 失败 %s", err);
      callback("failed", err);
    });
  console.log("queryInfo , uid=%s", uid);
}

export default {
  httpUrl,
  initDB,
  addData,
  updateData,
  QueryInfo,
  data() {
    return {
      database,
      auth,
    };
  },
};
</script>