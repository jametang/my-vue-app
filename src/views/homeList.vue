<template>
  <div id="homelist">
    <h1>XXX眼镜</h1>
    <div>
      <el-table
        :data="OrderList"
        style="width: 100%; background-color: blueviolet"
        :header-row-style="{ height: '50px' }"
        :row-style="{ height: '50px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column
          prop="orderid"
          label="订单号"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户名称"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Content"
          label="商品内容"
          min-width="41.67%"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods[0].Content }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="CreatedTime"
          label="创建日期"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <span :class="ShowStastus(scope.row.status, 'class')">{{
              ShowStastus(scope.row.status)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-button @click="jumpto" class="add" type="primary" plain>新建</el-button>
    </div>
  </div>
</template>

<script>
import { isArray } from "@vue/shared";

const CONTRACTCHECKMAP = [
  {
    value: 100,
    text: "处理中",
    class: "pending",
  },
  {
    value: 101,
    text: "已完成",
    class: "complete",
  },
];

export default {
  created() {
    console.log("homeList created");
  },
  mounted() {
    var that = this;
    console.log("homeList mounted");
    this.GLOBAL.initDB(function (state) {
      console.log("homeList initDB callback");
      if (state == "success") {
        that.GLOBAL.QueryInfo(function (state, res) {
          var value = JSON.stringify(res);
          console.log("homeList QueryInfo callbck, res : %s", value);
          if (state == "success") {
            let jsonObj = res.data;
            if (Array.isArray(jsonObj)) {
              console.log("yes is array");
              for (let i in jsonObj) {
                that.OrderList.push(jsonObj[i]);
              }
            } else {
              console.log("nooop");
            }
          }
        });
      }
    });
  },
  data() {
    return {
      arg0: "我是从hostlist过来的",
      OrderList: [],
    };
  },
  methods: {
    jumpto() {
      this.$router.push({
        path: "order",
        query: {
          desc: this.arg0,
        },
      });
    },
    ShowStastus(value, type = "text") {
      if (typeof value == "undefined") return "";
      return CONTRACTCHECKMAP.find((item) => item.value == value)[type];
    },
  },
};
</script>

<style>
.complete {
  display: inline-block;
  padding: 6px 13px;
  border-radius: 2px;
  line-height: 1;
  text-align: center;
  color: green;
}
.pending {
  display: inline-block;
  padding: 6px 13px;
  border-radius: 2px;
  line-height: 1;
  text-align: center;
  color: red;
}
.add {
  padding: 16px;
  margin-top: 100px;
}
</style>

