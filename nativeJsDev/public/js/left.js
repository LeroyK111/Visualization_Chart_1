// 指定图表的配置项和数据
var data = [];
for (let i = 0; i < 5; ++i) {
  // 加入五个0-200之间的伪随机数
  data.push(Math.round(Math.random() * 200));
}
// 柱形图
export let option_left1 = {
  // y轴
  yAxis: { name: "数量" },
  xAxis: {
    type: "category",
    data: ["衣服", "酒水", "汽车", "日用品", "鞋袜"],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 4,
  },
  series: [
    {
      realtimeSort: true,
      name: "销量",
      type: "bar",
      data: data,
      colorBy: "data",
      label: {
        show: true,
        position: "top",
        valueAnimation: true,
      },
    },
  ],
  animationDuration: 3000,
  animationDurationUpdate: 3000,
  animationEasing: "sinusoidalInOut",
  animationEasingUpdate: "sinusoidalInOut",
};

// 写一个数据更新
export function update() {
  // 取出当前对象中的数据
  data = option_left1.series[0].data;
  // 为每组数据重新赋值
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() >= 0.6) {
      data[i] += Math.round(Math.random() * 200);
    } else if (data[i] >= 200) {
      data[i] -= Math.round(Math.random() * 200);
    }
  }
}

// 圆环图
export var option_left2 = {
  tooltip: {
    trigger: "item",
    position: "bottom",
  },
  title: {
    text: "资产占比",
    left: "center",
    top: "center",
    textStyle: {
      color: "#fff",
    },
  },
  // 图例
  legend: {
    top: "5%",
    left: "center",
    textStyle: {
      color: "#fff",
    },
  },
  itemStyle: {
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  emphasis: {
    label: {
      show: true,
      fontSize: "40",
      fontWeight: "bold",
    },
  },

  series: [
    {
      type: "pie",
      data: [
        {
          value: 735,
          name: "房屋",
        },
        {
          value: 234,
          name: "车辆",
        },
        {
          value: 1548,
          name: "仓储货品",
        },
        {
          value: 500,
          name: "其他",
        },
      ],
      radius: ["40%", "70%"],
      // 关闭标签显示
      label: {
        show: false,
      },
      avoidLabelOverlap: false,
    },
  ],
};

// 雷达图，带扫描效果
export var option_left3 = {
  title: {
    text: "全网热点扫描",
    left: "center",
    textStyle: {
      color: "#fff",
    },
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "微博", max: 6500 },
      { name: "bilibili", max: 16000 },
      { name: "小红书", max: 30000 },
      { name: "抖音", max: 38000 },
      { name: "快手", max: 52000 },
      { name: "知乎", max: 25000 },
    ],
  },
  series: [
    {
      type: "radar",
    },
  ],
};
