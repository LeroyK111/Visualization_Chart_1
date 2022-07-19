// @ts-nocheck
// 直接引用
import "./d3-array.min.js";
import "./d3-geo.min.js";
// 直接引用转换成为js对象的world
import { world } from "./world.js";

// 网格区域
function createLineString(start, end) {
  // 计算网格
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const segs = 50;
  const stepX = dx / segs;
  const stepY = dy / segs;
  const points = [];
  // TODO needs adaptive sampling on the -180 / 180 of azimuthal projections.
  for (let i = 0; i <= segs; i++) {
    points.push([start[0] + i * stepX, start[1] + i * stepY]);
  }
  return points;
}

// 加入经纬线网格
const graticuleLineStrings = [];
for (let lat = -80; lat <= 80; lat += 10) {
  graticuleLineStrings.push(createLineString([-180, lat], [180, lat]));
}
for (let lng = -180; lng <= 180; lng += 10) {
  graticuleLineStrings.push(createLineString([lng, -80], [lng, 80]));
}

// 为地理信息坐标内容加入新的特性
world.features.unshift({
  // 几何
  geometry: {
    type: "MultiLineString",
    coordinates: graticuleLineStrings,
  },
  // 属性
  properties: {
    name: "graticule",
  },
});

// 实例化一个d3的方法,确定使用日晷投影模式
var projection = d3.geoOrthographic();
// 指定默认角度
projection.rotate([-105, 0]);

// 余下的配置
let option = {
  geo: {
    // 名字
    map: "world",
    // 设置投影公式
    projection: {
      // 将经纬度坐标投影为其它坐标。日冕模式
      project: (pt) => projection(pt),
      // 根据投影后坐标计算投影前的经纬度坐标.反转点位
      unproject: (pt) => projection.invert(pt),
      // 可以直接使用 d3-geo 提供的 stream 方法。计算线条和图形
      stream: projection.stream,
    },
    // 地图区域的多边形 图形样式
    itemStyle: {
      // 图形边界线颜色
      borderColor: "#333",
      // 边界线宽度
      borderWidth: 1,
      // 用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性
      borderJoin: "round",
      // 图形颜色
      color: "#fff",
    },
    // 图形上的签名
    label: {},
    // 鼠标高亮
    emphasis: {
      // 开启聚焦,当触发某个地区时,淡化其他地区
      focus: "self",
      // 触发时 标签的颜色
      label: {
        show: true,
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
      },
      // 触发时,图形颜色
      itemStyle: {
        color: "orange",
      },
    },
    // 在地图中对特定的区域配置样式。
    regions: [
      {
        name: "China",
        itemStyle: {
          color: "#c00000",
        },
        emphasis: {
          itemStyle: {
            color: "red",
          },
        },
      },
    ],
  },
};



function onChange(myChart, rotateX, rotateY = 0) {
  /*
  如果指定了旋转，则将投影的三轴球面旋转设置为指定的角度，它必须是一个二元或三元数字数组 [ lambda , phi , gamma ]，指定围绕每个球轴的旋转角度（以度为单位）。（这些对应于yaw、pitch 和 roll。）如果省略旋转角度gamma，则默认为 0。另见d3.geoRotation。如果未指定旋转，则返回默认为 [0, 0, 0] 的当前旋转。
  */
  projection && projection.rotate([rotateX, rotateY]);
  myChart.setOption({
    geo: {},
  });
}

// 暴露数据更新
export default {
  world,
  option,
  onChange
};
