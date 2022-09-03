<template>
  <div id="app">
    <h1>友时光眼镜销售单</h1>

    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="2022-08-01" v-model="orderInfo.order_datetime">
              <template slot="prepend">销售日期</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="张三" v-model="orderInfo.order_customer">
              <template slot="prepend">顾客姓名</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="12345678999" v-model="orderInfo.order_phonenum">
              <template slot="prepend">顾客电话</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="text-center-oblique-large">顾客联</div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="张三" v-model="orderInfo.order_saler">
              <template slot="prepend">
                <span v-html="'营业员&nbsp;&nbsp;&nbsp;&nbsp;'"></span>
              </template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="张三" v-model="orderInfo.order_doctor">
              <template slot="prepend">
                <span v-html="'验光师&nbsp;&nbsp;&nbsp;&nbsp;'"></span>
              </template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="张三" v-model="orderInfo.order_from">
              <template slot="prepend">处方来源</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input placeholder="2022-08-02" v-model="orderInfo.order_expected_time">
              <template slot="prepend">取镜时间</template>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-table
        :data="tableGoods"
        style="width: 100%; background-color: blueviolet"
        :header-row-style="{ height: '50px' }"
        :row-style="{ height: '50px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column
          prop="Type"
          label="类型"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.Type" v-show="editEnable" />
            <span v-show="!editEnable">{{ scope.row.Type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Content"
          label="产品内容"
          min-width="41.67%"
          align="center"
        >
          <template slot-scope="scope">
            <input
              type="text"
              v-model="scope.row.Content"
              v-show="editEnable"
            />
            <span v-show="!editEnable">{{ scope.row.Content }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Unit"
          label="单位"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.Unit" v-show="editEnable" />
            <span v-show="!editEnable">{{ scope.row.Unit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Num"
          label="数量"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.Num" v-show="editEnable" />
            <span v-show="!editEnable">{{ scope.row.Num }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Prices"
          label="原价"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.Prices" v-show="editEnable" />
            <span v-show="!editEnable">{{ scope.row.Prices }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Sales"
          label="折扣"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.Sales" v-show="editEnable" />
            <span v-show="!editEnable">{{ scope.row.Sales }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="AfterSales"
          label="折扣价"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <input
              type="text"
              v-model="scope.row.AfterSales"
              v-show="editEnable"
            />
            <span v-show="!editEnable">{{ scope.row.AfterSales }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Sum"
          label="金额"
          min-width="8.33%"
          align="center"
        >
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.Sum" v-show="editEnable" />
            <span v-show="!editEnable">{{ scope.row.Sum }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 备注title-->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content text-left">备注:</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content text-center">合计</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content text-center">1400</div>
        </el-col>
      </el-row>

      <!-- 订金 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content text-left">明天要带，今天要拿</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content text-center">定金</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content text-center">--</div>
        </el-col>
      </el-row>

      <!-- 余额 -->
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content text-left"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content text-center">余额</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content text-center">--</div>
        </el-col>
      </el-row>

      <!-- 视力 -->
    </div>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content-200">
          <el-container style="height: 250px; border: 1px solid #eee">
            <el-aside width="25%" style="background-color: blue">
              <el-container style="width: 100%; background-color: cadetblue">
                <el-header :style="{ height: '50px' }">屈光度</el-header>
                <el-container :style="{ height: '100px' }">
                  <el-aside width="50%" style="border: 1px solid gray"
                    >远用</el-aside
                  >
                  <el-main
                    width="50%"
                    style="background-color: white; padding: 0"
                  >
                    <div
                      style="
                        line-height: 50px;
                        text-align: center;
                        border: 1px solid gray;
                      "
                    >
                      R
                    </div>
                    <div
                      style="
                        line-height: 50px;
                        text-align: center;
                        border: 1px solid gray;
                      "
                    >
                      L
                    </div>
                  </el-main>
                </el-container>
                <el-container :style="{ height: '100px' }">
                  <el-aside width="50%" style="border: 1px solid gray"
                    >近用</el-aside
                  >
                  <el-main
                    width="50%"
                    style="background-color: white; padding: 0"
                  >
                    <div
                      style="
                        line-height: 50px;
                        text-align: center;
                        border: 1px solid gray;
                      "
                    >
                      R
                    </div>
                    <div
                      style="
                        line-height: 50px;
                        text-align: center;
                        border: 1px solid gray;
                      "
                    >
                      L
                    </div>
                  </el-main>
                </el-container>
              </el-container>
            </el-aside>
            <el-main width="75%" style="background-color: yellow; padding: 0">
              <el-table
                :data="tableData"
                style="width: 100%; background-color: blueviolet"
                :header-row-style="{ height: '50px' }"
                :row-style="{ height: '50px' }"
                :cell-style="{ padding: '0px' }"
              >
                <el-table-column
                  prop="SphericalMirror"
                  label="球镜"
                  min-width="16.66%"
                  align="center"
                >
                  <template slot-scope="scope">
                    <input
                      type="text"
                      v-model="scope.row.SphericalMirror"
                      v-show="editEnable"
                    />
                    <span v-show="!editEnable">{{
                      scope.row.SphericalMirror
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="Cylinder"
                  label="柱镜"
                  min-width="16.66%"
                  align="center"
                >
                  <template slot-scope="scope">
                    <input
                      type="text"
                      v-model="scope.row.Cylinder"
                      v-show="editEnable"
                    />
                    <span v-show="!editEnable">{{ scope.row.Cylinder }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="AxialPos"
                  label="轴位"
                  min-width="16.66%"
                  align="center"
                >
                  <template slot-scope="scope">
                    <input
                      type="text"
                      v-model="scope.row.AxialPos"
                      v-show="editEnable"
                    />
                    <span v-show="!editEnable">{{ scope.row.AxialPos }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="CorrectedVision"
                  label="矫正视力"
                  min-width="16.66%"
                  align="center"
                >
                  <template slot-scope="scope">
                    <input
                      type="text"
                      v-model="scope.row.CorrectedVision"
                      v-show="editEnable"
                    />
                    <span v-show="!editEnable">{{
                      scope.row.CorrectedVision
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="InterpupillaryDis"
                  label="瞳距"
                  min-width="16.66%"
                  align="center"
                >
                  <template slot-scope="scope">
                    <input
                      type="text"
                      v-model="scope.row.InterpupillaryDis"
                      v-show="editEnable"
                    />
                    <span v-show="!editEnable">{{
                      scope.row.InterpupillaryDis
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="DownLight"
                  label="下加光"
                  min-width="16.67%"
                  align="center"
                >
                  <template slot-scope="scope">
                    <input
                      type="text"
                      v-model="scope.row.DownLight"
                      v-show="editEnable"
                    />
                    <span v-show="!editEnable">{{ scope.row.DownLight }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content-200 padding-48">
          <img
            src="https://6d65-melo-order-app-env-2dxtm5d9d9602-1251479247.tcb.qcloud.la/phone.png?sign=168483cc4b51556343daee9abe34ff82&t=1661592744"
            alt=""
            height="200px"
            width="200px"
          />
        </div>
      </el-col>
    </el-row>
    <div class="grid-content text-left">本产品经检测符合国标</div>
    <div class="grid-content text-left">凡在本公司购买产品，执行三包</div>

    <div class="grid-content text-left" style="font-size: x-large">
      地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXX 电话： XXXXXXXXXXX
    </div>

    <div>
      <el-button @click="modifyCommit">
        <span>{{ editEnable ? "保存" : "编辑" }}</span>
      </el-button>
    </div>
    <!-- <div>
      <input type="file" ref="upload" accept=".xls,.xlsx" class="outputlist_upload"/>
    </div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("App mounted");
    // this.$refs.upload.addEventListener('change', e => {//绑定监听表格导入事件
    //   console.log("test mounted 1");
    //   this.readExcel(e);
    // })
    //初始化tencentclouddb
    this.GLOBAL.initDB();
  },
  created() {
    console.log("App created");
  },
  methods: {
    modifyCommit() {
      this.editEnable = !this.editEnable;
      if (!this.editEnable) {
        this.$notify({
          title: "It works!",
          type: "success",
          message:
            "We've laid the ground work for you. It's time for you to build something epic!",
          duration: 5000,
        });
        // this.GLOBAL.addData(this.orderInfo, this.tableGoods);
        this.GLOBAL.updateData(this.orderInfo, this.tableGoods);
      }
    },
    getTime() {
      var date1 = new Date();
      var year = date1.getFullYear();
      var month = date1.getMonth() + 1;
      var day = date1.getDate();
      // var hours = date1.getHours();
      // var minutes = date1.getMinutes();
      // var seconds = date1.getSeconds();
      return (
        year + "年" + month + "月" + day + "日"
      ); /*+ hours + ":" + minutes + ":" + seconds*/
    },
    //  readExcel(e) {
    //   console.log("exec readexcel");
    //    var that = this;
    //    const files = e.target.files;
    //    // 如果没有文件名
    //    if(files.length<=0){
    //     console.log("exec readexcel error for length 0");
    //  		return false;
    //    }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
    //       this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
    //       console.log("上传格式不正确，请上传xls或者xlsx格式");
    //       return false;
    //    }

    //  const fileReader = new FileReader();
    //  fileReader.onload = (ev) => {
    //    try {
    //        const data = ev.target.result;
    //        // 切换为新的调用方式
    //        const workbook = this.read(data, {
    //        	type: 'binary'
    //        });
    //        // 取第一张表
    //        const wsname = workbook.SheetNames[0];
    //        // 切换为新的调用方式 生成json表格内容
    //        const ws = this.utils.sheet_to_json(workbook.Sheets[wsname]);
    //        console.log(ws);
    //        // 后续为自己对ws数据的处理
    //        this.userInfos = ws;
    //        //赋值第一个
    //        this.order_customer = this.userInfos[0].name;
    //        this.order_phonenum = this.userInfos[0].phone;
    //        this.order_doctor = this.userInfos[0].optometrist;
    //        this.order_from = this.userInfos[0].from;

    //    } catch (e) {
    //        console.log(e);
    //        return false;
    //    }
    //  };
    //  fileReader.readAsBinaryString(files[0]);
    //  }
  },
  data() {
    return {
      orderInfo: {
        order_datetime: this.getTime(),
        order_customer: "XXX",
        order_phonenum: "12345678999",
        order_saler: "XXX",
        order_doctor: "XXX",
        order_from: "N/A",
        order_expected_time: this.getTime(),
        order_id: 0,
        create_time: "",
        modify_time: "",
        _id: "b69f67c06313238d14136cec48433d87"
      },
      editEnable: false,
      tableGoods: [
        {
          Type: "镜架",
          Content: "ZAMA钛-银",
          Unit: "副",
          Num: "1",
          Prices: "1999",
          Sales: "0.85",
          AfterSales: "1900",
          Sum: "1900",
        },
        {
          Type: "镜架",
          Content: "ZAMA钛-银",
          Unit: "副",
          Num: "1",
          Prices: "1999",
          Sales: "0.85",
          AfterSales: "1900",
          Sum: "1900",
        },
        {
          Type: "镜架",
          Content: "ZAMA钛-银",
          Unit: "副",
          Num: "1",
          Prices: "1999",
          Sales: "0.85",
          AfterSales: "1900",
          Sum: "1900",
        },
        {
          Type: "镜架",
          Content: "ZAMA钛-银",
          Unit: "副",
          Num: "1",
          Prices: "1999",
          Sales: "0.85",
          AfterSales: "1900",
          Sum: "1900",
        },
        {
          Type: "镜架",
          Content: "ZAMA钛-银",
          Unit: "副",
          Num: "1",
          Prices: "1999",
          Sales: "0.85",
          AfterSales: "1900",
          Sum: "1900",
        },
      ],
      tableData: [
        {
          SphericalMirror: "-125",
          Cylinder: "-",
          AxialPos: "-",
          CorrectedVision: "1.0",
          InterpupillaryDis: "30.5",
          DownLight: "-",
        },
        {
          SphericalMirror: "-126",
          Cylinder: "-",
          AxialPos: "-",
          CorrectedVision: "1.0",
          InterpupillaryDis: "30.5",
          DownLight: "-",
        },
        {
          SphericalMirror: "-127",
          Cylinder: "-",
          AxialPos: "-",
          CorrectedVision: "1.0",
          InterpupillaryDis: "30.5",
          DownLight: "-",
        },
        {
          SphericalMirror: "-128",
          Cylinder: "-",
          AxialPos: "-",
          CorrectedVision: "1.0",
          InterpupillaryDis: "30.5",
          DownLight: "-",
        },
      ],
      userInfos: [],
    };
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
}

.el-row.last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.text-center {
  text-align: center;
  line-height: 36px;
}

.text-left {
  text-align: left;
  line-height: 36px;
}

.text-center-oblique-large {
  font-style: oblique;
  text-align: center;
  line-height: auto;
  font-size: x-large;
}

.grid-content-200 {
  min-height: 200px;
}

.padding-48 {
  padding: 24px;
}

.el-header,
.el-footer {
  text-align: center;
  line-height: 50px;
  background-color: tomato;
}

.el-aside {
  text-align: center;
  line-height: 100px;
}

.el-main {
  text-align: center;
}

.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}

.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
</style>
