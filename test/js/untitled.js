// 折线，堆积折线图，柱状图，堆积柱状图，折柱图，饼图,环形图，

// 树形图，力学图, 词云

//漏斗图，桑基图



class D3Charts {
  constructor(){
    this.initOpts = {
      // 设置图标大小及上下左右留白，用grid参考的是echart，但并没有网格的绘制
      grid:{
        width: 600,
        height: 400,
        padding: {
          top: 30,
          left: 70,
          right: 70,
          bottom: 50
        }
      },
      // 标题,可以设置其他样式，回头再优化
      // title: {
      //   text: '',
      //   style: {
      //     "font-size":"14",
      //   },
      //   align: 'center',
      // },
      // // 副标题
      // subTitle: {
      //   text: '',
      //   style: {
      //     "font-size":"12"
      //   },
      //   align: 'center',
      // },
      // 横坐标，先认为横坐标只有一份，后期优化含有多个横坐标的情况
      xAxis: {
        data: ['1000','27777777','1019年7月'],// 坐标轴数据
        name:'',//坐标轴名称
        nameStyle:{}, //名称的样式
        labels: { // 坐标轴标签
          interval: 0, //坐标轴刻度标签的显示间隔，在类目轴中有效
          formatter: null, // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。????
          rotate: -40, //刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
          margin: 5, //刻度标签与轴线之间的距离。
        },
      },
      // 纵坐标
      yAxis: [
        {
          name: 'right',
          position: 'right', // left ,right
          labels: { // 坐标轴标签
            formatter: null, // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。????
            rotate: 0, //刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
            margin: 8, //刻度标签与轴线之间的距离。
          },
        },
        {
          name: 'left',
          position: 'left', // left ,right
          labels: { // 坐标轴标签
            formatter: null, // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。????
            rotate: 0, //刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
            margin: 8, //刻度标签与轴线之间的距离。
          },
        }
      ],
       // 区分图形并且按不同图形处理数据
       // type: 'bar','line','pie','wordCloud','force','tree','funnel','sankey'
      series: [
        // {
        //   type:'bar',
        //   name:'left',
        //   //yAxisIndex:0,
        //   // type:'pie',
        //   // radius:[100,30],
        //   // center:[0.5,0.5],
        //   data:[4,8,9]
        // },
        // {
        //   type:'bar',
        //   name:'right',
        //   //yAxisIndex:0,
        //   // type:'pie',
        //   // radius:[100,30],
        //   // center:[0.5,0.5],
        //   data:[4,8,9]
        // },
        {
          type:'bar',
          name:'测试',
          type:'pie',
          radius:[100,30], // 饼图的内外半径
          center:[0.5,0.5], // 饼图的位置
          data:[   
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ]
        },
      ],
      // 图例
      // legend: {
      //   data: ['',''],
      //   align: 'left',
      //   textStyle:{

      //   }
      // },
      //颜色： 折线，堆积折线图，柱状图，堆积柱状图，折柱图，饼图,环形图等含有数组的可以用colors
      colors: [],
    }
  }
  init(ele, opts){
    opts = Object.assign({}, this.initOpts, opts);
    // 绘制画布
    this.svg = d3.select(ele)
        .append("svg")
        .attr("width", opts.grid.width)
        .attr("height", opts.grid.height);
    // 绘制图形
    this.drawGraph(opts)
  }
  drawGraph(opts){
    // 绘制坐标轴的条件？？？
    let series = opts.series;
    // 绘制坐标轴
    this.drawAxis(opts);
    // this.drawLegend();
    // this.drawTootips() //设置透明度为0或display为none，在图表中设置位置；也可以直接在图表中去添加移除

    // 处理参数转换成对应图表需要的参数
    // let opts = this.optsProcess(this.opts)
    // // 这里如果series长度大于1时做判断，混合图形，如堆叠折线图，堆积柱状图，折柱图等
    // if(series[0].type === 'line'){
    //   this.drawLine(opts)
    // }
    // if(series[0].type === 'bar'){
    //   this.drawBar(opts)
    // }

    if(series[0].type === 'pie'){
      this.drawPie(opts)
    }
    // if(series[0].type === 'tree'){
    //   this.drawTree(opts)
    // }
    // if(series[0].type === 'force'){
    //   this.drawForce(opts)
    // }
    // if(series[0].type === 'wordCloud'){
    //   this.drawWordCloud(opts)
    // }
    // if(series[0].type === 'funnel'){
    //   this.drawFunnel(opts)
    // }
  }

  drawPie(opts){
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        series = opts.series[0],
        colors = opts.colors;

    let pie = d3.pie().sort(null);
      // jhw_pie.value(function(d, i) {
      //   // Tells the layout function what
      //   // property of our data object to
      //   // use as the value.
      //   return d.total;
      // });
    let pieData = pie(series.data);  
    let pieArc = d3.arc() // 创建弧生成器，并且设置内外半径，优化，非环形时，radius必须是含有两项的数组吗？参考echarts
        .innerRadius(Math.min(...series.radius))
        .outerRadius(Math.max(...series.radius));
    // 饼图的容器及位置
    let pieSvg = this.svg.append("g")
        .attr('id', 'pieSvg')
        // 位置的传参格式50%  0.5  200 没有定，优化？？
        .attr("transform", "translate(" + width * series.center[0]+ "," + height * series.center[1] + ")");
     //添加arc包裹元素
    let arcsGroup = pieSvg
        .append('g')
        .attr('class', 'arcsGroup');
    //添加弧的路径元素  
    let arcs = arcsGroup
        .selectAll('arcs')
        .data(pieData)
        .enter()
        .append("path")
        .attr("d", pieArc)
        .attr("fill", function(d, i) {
            return colors[i];
        });
    // 添加label包裹元素
    let labelsGroup = pieSvg
        .append('g')
        .attr('class', 'labelsGroup');
    // 添加label
    let labels = labelsGroup
        .selectAll('.label')
        .data(pieData)
        .enter()
        .append('g')
        .attr('class', 'label');
    // 添加引出线
    let textLines = labels
        .append('path')
        .attr('d', function(d, i) {
          if (d.data.value == 0) {
            return;
          }
        })
        // console.log(pieArc)
        // var x0 = pieArc.centroid(d)[0];
        // var y0 = pieArc.centroid(d)[1];

        //   var centroid = pied_arc.centroid(d);
        //   var midAngle = Math.atan2(centroid[1], centroid[0]);
    //       var x1 = Math.cos(midAngle) * cDim.labelRadius;
    //       var centroid = pied_arc.centroid(d);
    //       var x2 = x1 > 0 ? 150 : -150;
    //       var midAngle = Math.atan2(centroid[1], centroid[0]);
    //       var centroid = pied_arc.centroid(d);
    //       var midAngle = Math.atan2(centroid[1], centroid[0]);
    //       var y1 = Math.sin(midAngle) * cDim.labelRadius;
    //       var ret = [];
    //       ret.push('M', x0, y0, 'L', x1, y1, 'L', x2, y1);
    //       return ret.join(' ');
    //     })
    //     .style('stroke', '#1C90F3')
    //     .style('fill', 'none');
    // // 添加引出标记文案  
    //   let textLabels = labels
    //     .append('text')
    //     .attr('x', function(d, i) {
    //       let centroid = pied_arc.centroid(d);
    //       let midAngle = Math.atan2(centroid[1], centroid[0]);
    //       let x = Math.cos(midAngle) * cDim.labelRadius;
    //       // sign = (x > 0) ? 1 : -1
    //       // labelX = x + (5 * sign)
    //       // return labelX;
    //       return x > 0 ? 150 : -150;
    //     })
    //     .attr('y', function(d, i) {
    //       let centroid = pied_arc.centroid(d);
    //       let midAngle = Math.atan2(centroid[1], centroid[0]);
    //       let y = Math.sin(midAngle) * cDim.labelRadius;
    //       return y;
    //     })
    //     .attr('text-anchor', function(d, i) {
    //       let centroid = pied_arc.centroid(d);
    //       let midAngle = Math.atan2(centroid[1], centroid[0]);
    //       let x = Math.cos(midAngle) * cDim.labelRadius;
    //       return (x > 0) ? 'start' : 'end';
    //     })
    //     .attr('class', 'label-text')

    //     .text(function(d) {
    //       if (d.data.total == 0) {
    //         return;
    //       }
    //       var percent = Number(d.data.total) / d3.sum(_this.pieData, function(d) {
    //         return d.total;
    //       }) * 100;
    //       // 保留一位小数点 末尾加一个百分号返回
    //       return d.data.viewName + ' ' + percent.toFixed(1) + '%';
    //     })
    //     .attr('font-size', '12');

    //   let alpha = 0.5,
    //     spacing = 12;

    //   function relax() {
    //     let again = false;
    //     textLabels.each(function(d, i) {
    //       let a = this;
    //       let da = d3.select(a);
    //       let y1 = da.attr('y');
    //       textLabels.each(function(d, j) {
    //         let b = this;
    //         // a & b are the same element and don't collide.
    //         if (a == b) return;
    //         let db = d3.select(b);
    //         // a & b are on opposite sides of the chart and
    //         // don't collide
    //         if (da.attr('text-anchor') != db.attr('text-anchor')) return;
    //         // Now let's calculate the distance between
    //         // these elements.
    //         let y2 = db.attr('y');
    //         let deltaY = y1 - y2;

    //         // Our spacing is greater than our specified spacing,
    //         // so they don't collide.
    //         if (Math.abs(deltaY) > spacing) return;

    //         // If the labels collide, we'll push each
    //         // of the two labels up and down a little bit.
    //         again = true;
    //         let sign = deltaY > 0 ? 1 : -1;
    //         let adjust = sign * alpha;
    //         da.attr('y', +y1 + adjust);
    //         db.attr('y', +y2 - adjust);
    //       });
    //     });
    //     // Adjust our line leaders here
    //     // so that they follow the labels.
    //     if (again) {
    //       let labelElements = textLabels._groups[0];

    //       textLines.attr(
    //         'd',
    //         function(d, i) {
    //           if (d.data.total == 0) {
    //             return;
    //           }
    //           var x0 = pied_arc.centroid(d)[0];
    //           var y0 = pied_arc.centroid(d)[1];
    //           var centroid = pied_arc.centroid(d);
    //           var midAngle = Math.atan2(centroid[1], centroid[0]);
    //           var x1 = Math.cos(midAngle) * cDim.labelRadius;
    //           var x2 = x1 > 0 ? 150 : -150;

    //           var y1 = d3.select(labelElements[i]).attr('y');
    //           var ret = [];
    //           ret.push('M', x0, y0, 'L', x1, y1, 'L', x2, y1);
    //           return ret.join(' ');
    //         });
    //       setTimeout(relax, 20);
    //     }
    //   }

    //   relax();
  }
  
  drawAxis(opts){
    // 绘制坐标轴
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        xAxis = opts.xAxis,
        yAxis = opts.yAxis;

    // 绘制横坐标比例尺，此处用的离散输入域
    let xScale = d3.scaleBand()
        .domain(d3.range(0, xAxis.data.length)) // 返回等差数列
        .range([0, width - padding.left - padding.right]);

    // 绘制x轴，默认为bottom，以后优化;横轴ticks间距显示？？？
    this.svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .text(function(d, i) {
          return xAxis.data[i];
        })
        .attr('font-size', '12')
        .style('transform', (d,i) => {
          // 这里需要计算角度和距离的关系以及文案的位置,需要求取text的长度？？
          let distance = xAxis.labels.margin / Math.cos(Number(xAxis.labels.rotate)) 
          return 'rotate(' + xAxis.labels.rotate + 'deg) translate('+ distance +'px, -'+ 10 +'px)'; 
        })
    // 绘制y轴，现在只考虑最多两条的情况，左右分布，对应条件？y轴多条比例尺，多条情况后面优化， 
    yAxis.forEach(yItem => {
      //双重循环优化？？？？
      //暂时先利用name相同作为判断，series里与yAxis里name相同的数据为此yScale,并且series里的数据要有对应的yScale,name作为判断条件不合适
      opts.series.forEach( seriesItem => {
        if(yItem.name === seriesItem.name){
          // y轴比例尺，设置比例？？
          let yScale = seriesItem.yScale = d3.scaleLinear() // V4版本
            .domain([0, d3.max(seriesItem.data)])
            .range([height - padding.bottom - padding.top, 0]);

          let yDirectionScale, translate;
          if(yItem.position === 'left'){
            yDirectionScale = d3.axisLeft(yScale);
            translate = 'translate(' + padding.left + ',' + padding.top + ')';
          }else if(yItem.position === 'right'){
            yDirectionScale = d3.axisRight(yScale)
            translate = 'translate(' + (width - padding.right) + ',' + padding.top + ')';
          }
          // 绘制y轴
          let yaxis = this.svg.append('g')
            .attr('class', 'axis')
            .attr('transform', translate)
            .call(yDirectionScale)
            .style('font-size', '12'); // d3.axisLeft(yScale) --V4版本
          // 绘制y轴名称 ???没有显示 //判断显示条件？？？
          yaxis.append('text')
              .text(yItem.name)
              .attr('transform','translate(' + -25 + ',' + -15 + ')');

        }
      })

      // let seriesItem = opts.series.find(item => {
      //   return item.name === d.name
      // })
      // seriesItem.yScale = d3.scaleLinear() // V4版本
      //   .domain([0, d3.max(seriesItem.data)])
      //   .range([height - padding.bottom - padding.top, 0]);
    })
  }
  // 标题可以在图外边用元素设置
  drawTitle(opts){
    // 绘制标题
    let title = opts.title,
    subTitle = opts.subTitle;
    this.svg.append('g')

  }
  drawLegend(){
    //绘制图例

  }

}


//