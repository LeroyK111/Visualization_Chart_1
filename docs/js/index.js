// @ts-nocheck
// 导入时间模块
import m1 from "./timer.js";
// 导入jq模块

// 选择直接引用
import "./echarts.min.js";

// 导入左边一列的图形参数
import * as left from "./left.js";

// 导入中间一列的图形参数
import center from "./center.js";

// 导入右边一列的图形参数
import * as right from "./right.js";

// 使用时间模块
window.addEventListener("load", (e) => {
  const showtime = document.querySelector(".showtime");
  // 启动一个定时器模块
  const t = setInterval(() => {
    showtime.innerHTML = "当前时间: " + m1.formatTime(new Date());
  }, 1000);

  // 自适应图表大小
  window.addEventListener("resize", () => {
    myChartLeft1.resize();
    myChartLeft2.resize();
    myChartLeft3.resize();
    myChartRight1.resize();
    myChartRight2.resize();
    myChartRight3.resize();
    myChartEarth.resize();
  });

  // 右一柱形图
  const left1 = document.getElementById("left1");
  var myChartLeft1 = echarts.init(left1);
  setInterval(function () {
    myChartLeft1.setOption(left.option_left1);
    // 数据更新
    left.update();
  }, 3000);

  // 左二，饼图
  const left2 = document.getElementById("left2");
  var myChartLeft2 = echarts.init(left2);
  myChartLeft2.setOption(left.option_left2);

  let currentIndex = -1;

  setInterval(function () {
    // 赋予数据长度
    var dataLen = left.option_left2.series[0].data.length;
    // 取消之前高亮的图形
    myChartLeft2.dispatchAction({
      type: "downplay",
      // 数据维度
      seriesIndex: 0,
      // 选择数据索引
      dataIndex: currentIndex,
    });
    // 更新数据索引
    currentIndex = (currentIndex + 1) % dataLen;
    // 高亮当前图形
    myChartLeft2.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    // 显示 tooltip
    myChartLeft2.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
  }, 1500);

  // 左三，这热点雷达
  const left3 = document.getElementById("left3");
  var myChartLeft3 = echarts.init(left3);
  myChartLeft3.setOption(left.option_left3);

  // 中上展示板
  const visitors = document.querySelector("#visitors");
  setInterval(() => {
    let oldData = parseInt(visitors.innerHTML);
    if (oldData >= 100000) {
      oldData = 42;
    }
    visitors.innerHTML = oldData + Math.floor(Math.random() * 100);
  }, 1000);

  // 中下3d地球
  var bigEarth = document.getElementById("bigEarth");
  var myChartEarth = echarts.init(bigEarth);
  // 注册一个地图
  echarts.registerMap("world", center.world);
  myChartEarth.setOption(center.option);

  var step = 1;
  var rotateX = -105;
  setTimeout(() => {
    clearInterval(anime);
    // 配个自动旋转的动画
    var anime = setInterval(() => {
      rotateX += step;
      if (step !== 0) {
        center.onChange(myChartEarth, rotateX);
      }
    }, 1);
  }, 1000);

  // 设置鼠标动作
  myChartEarth.on("mouseover", (e) => {
    step = 0;
  });

  myChartEarth.on("mousemove", (e) => {
    step = 0;
  });

  myChartEarth.on("mouseout", (e) => {
    step = 1;
  });

  // 右一折现图
  const right1 = document.getElementById("right1");
  var myChartRight1 = echarts.init(right1);
  myChartRight1.setOption(right.option_right1);
  setInterval(() => {
    // 跟新数据
    right.update1();
    myChartRight1.setOption(right.option_right1);
  }, 3000);

  // 右二极天气表盘
  const right2 = document.getElementById("right2");
  var myChartRight2 = echarts.init(right2);
  myChartRight2.setOption(right.option_right2);
  setInterval(() => {
    right.update2();
    myChartRight2.setOption(right.option_right2);
  }, 3000);

  // 右三极网格
  const right3 = document.getElementById("right3");
  var myChartRight3 = echarts.init(right3);
  myChartRight3.setOption(right.option_right3);
});
