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
        data: ['直接访问','邮件营销','联盟广告'],// 坐标轴数据
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
          name: '测试1', // 名称，和series对应的指代这份y轴对应的数据
          position: 'left', // left ,right
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
        {
          type:'bar',
          name:'测试1', 
          stack: '堆叠', //是否数据堆叠
          data:[4,8,9]
        },
        {
          type:'line',
          name:'测试2',
          stack: '堆叠',
          data:[5,7,10]
        },
        {
          type:'bar',
          name:'测试3',
          stack: '堆叠',
          data:[5,4,10]
        },
        // {
        //   type:'bar',
        //   name:'测试',
        //   type:'pie',
        //   radius:[100,30], // 饼图的内外半径
        //   center:[0.5,0.5], // 饼图的位置
        //   data:[   
        //     {value:1, name:'直接访问'},
        //     {value:310, name:'邮件营销'},
        //     {value:234, name:'联盟广告'},
        //     {value:135, name:'视频广告'},
        //     {value:1548, name:'搜索引擎'}
        //   ]
        // },
      ],
      // 图例
      // legend: {
      //   data: ['',''],
      //   align: 'left',
      //   textStyle:{

      //   }
      // },
      //颜色： 折线，堆积折线图，柱状图，堆积柱状图，折柱图，饼图,环形图等含有数组的可以用colors
      colors: ['#b7e1fc', '#b1d4cb', '#fae871', '#91cae9', '#d5f997'],
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
    // this.drawAxis(opts); //??堆叠柱状图

    //柱状图，折线图混合绘制,这两种图含有坐标轴
    let lineData = [], 
        barData = [], 
        xAxisBarNum = []; // 绘制group bar时XScale定义域
    series.forEach(d => {
      if(d.type == 'bar'){
          barData.push(d);
           //获取xAxisBarNum的值
          if(!d.stack){
            //当stack为空时，即没有设置值，则该柱状图单独绘制，name值插入xAxisBarNum
              xAxisBarNum.push(d.name);
          }else{
            // xAxisBarNum不存在时或者没有与d.stack值相同的值时，插入stack
              if((!xAxisBarNum && !xAxisBarNum.length) || !xAxisBarNum.includes(d.stack)) {  /*xAxisBarNum为空时*/
                  xAxisBarNum.push(d.stack);
              }
          }
          opts.xAxisBarNum = xAxisBarNum;
      }else if(d.type == 'line'){
          lineData.push(d);
      }
      

      // if(item.type === 'pie'){
      //   this.drawPie(opts, item)
      // }
      // if(item.type === 'tree'){
      //   this.drawTree(opts)
      // }
      // if(item.type === 'force'){
      //   this.drawForce(opts)
      // }
      // if(item.type === 'wordCloud'){
      //   this.drawWordCloud(opts)
      // }
      // if(item.type === 'funnel'){
      //   this.drawFunnel(opts)
      // }
    })
    if(barData.length){
      let stackBarData = this.stackLineBarDataProcess(barData, opts.xAxis.data);
      opts.barData = stackBarData;
      this.drawBar(opts)
    }
    if(lineData.length){
      let stackLineData = this.stackLineBarDataProcess(lineData, opts.xAxis.data);
      opts.lineData = stackLineData;
      this.drawLine(opts)
    }
   
  }

  stackLineBarDataProcess(initData, xAixisData){
    let stackGroups = {}, stackData = []; //将barData根据stack的值进行分组
    initData.forEach(item => {
      let stackName = item.stack || item.name;
      stackGroups[stackName] = stackGroups[stackName] || [];
      stackGroups[stackName].push(item); // 根据stack分组
    })
    // 将数据转化
    for(let i in stackGroups){
      let item = stackGroups[i];
       // 有堆叠的数据处理
      let stackItemData = [], keys = []; 
      xAixisData.forEach((xItem,xi) => {
        stackItemData[xi] = {name: xItem}
      })
      item.forEach((value, key) => { // 不考虑缺少某一栏数据的情况
        let data = value.data;
        keys.push(value.name)
        data.forEach((item, index) => {
          stackItemData[index][value.name] = item;
          stackItemData[index]['stack'] = i;
        })
      })
      let series = d3.stack().keys(keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)(stackItemData);
      stackData.push(series)
    }
    return stackData
  }
  // 重复代码多，且
  drawPie(opts, series){
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        outerRadius = Math.max(...series.radius),
        innerRadius = Math.min(...series.radius),
        colors = opts.colors,
        labelRadius = outerRadius + 10;

    let pie = d3.pie()
        .value(function(d) {  // 将数据中的value值作为饼图的区域值
          return d.value;
        });;
    let pieData = pie(series.data);  
    let pieArc = d3.arc() 
    // 创建弧生成器，并且设置内外半径，优化，非环形时，radius必须是含有两项的数组吗？参考echarts
    // 半径的数值类型可以是300  30%， 优化？？ 
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
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
        // 重复代码多？？？
        .attr('d', function(d, i) {
          if (d.data.value == 0) {
            return;
          }
          let centroid = pieArc.centroid(d); // 计算环的中心点
          var x0 = pieArc.centroid(d)[0]; // 计算环的中心点x坐标
          var y0 = pieArc.centroid(d)[1]; // 计算环的中心点y坐标
          let midAngle = Math.atan2(y0, x0); // 计算环的扇形中心点的角度
          let x1 = Math.cos(midAngle) * labelRadius;
          let x2 = x1 > 0 ? labelRadius : -labelRadius; // ??? 设置引出横线的长度？？
          let y1 = Math.sin(midAngle) * labelRadius;
          let ret = [];
          ret.push('M', x0, y0, 'L', x1, y1, 'L', x2, y1);
          return ret.join(' '); // 返回引出线的路径信息
        })
        .style('stroke', function(d,i){
          return colors[i]
        }) // 引出线的颜色
        .style('fill', 'none');
        
    // 添加引出标记文案  
    let textLabels = labels
        .append('text')
        .attr('x', function(d, i) {
          // centroid 重复太多？？   
          let centroid = pieArc.centroid(d);
          let midAngle = Math.atan2(centroid[1], centroid[0]);
          let x = Math.cos(midAngle) * labelRadius;
          return x > 0 ? labelRadius : -labelRadius;
        })
        .attr('y', function(d, i) {
          let centroid = pieArc.centroid(d);
          let midAngle = Math.atan2(centroid[1], centroid[0]);
          let y = Math.sin(midAngle) * labelRadius;
          return y;
        })
        .attr('text-anchor', function(d, i) {
          let centroid = pieArc.centroid(d);
          let midAngle = Math.atan2(centroid[1], centroid[0]);
          let x = Math.cos(midAngle) * labelRadius;
          return (x > 0) ? 'start' : 'end';
        })
        .attr('class', 'label-text')
        .text(function(d) {
          if (d.data.value == 0) {
            return;
          }
          return d.data.name;
        })
        .attr('font-size', '12')
        .attr('fill',function(d,i){
          return colors[i]
        });
    
    // 防止label重叠
    relax();
    // 优化方法
    function relax() {
      // 放出应该可以自主设置
      const alpha = 0.5, // 两个文案间的距离比例
            spacing = 16; // 文案件的距离，这里设的是font-size的大小，

      let again = false;
      textLabels.each(function(d, i) {
        let a = this;
        let da = d3.select(a);
        let y1 = da.attr('y');
        textLabels.each(function(d, j) {
          let b = this;
          // a & b are the same element and don't collide.
          if (a == b) return;
          let db = d3.select(b);
          // a & b are on opposite sides of the chart and
          // don't collide
          if (da.attr('text-anchor') != db.attr('text-anchor')) return;
          // Now let's calculate the distance between
          // these elements.
          let y2 = db.attr('y');
          let deltaY = y1 - y2;

          // Our spacing is greater than our specified spacing,
          // so they don't collide.
          if (Math.abs(deltaY) > spacing) return;

          // If the labels collide, we'll push each
          // of the two labels up and down a little bit.
          again = true;
          let sign = deltaY > 0 ? 1 : -1;
          let adjust = sign * alpha;
          da.attr('y', +y1 + adjust);
          db.attr('y', +y2 - adjust);
        });
      });
      // Adjust our line leaders here
      // so that they follow the labels.
      if (again) {
        let labelElements = textLabels._groups[0];
        textLines.attr(
          'd',
          function(d, i) {
            if (d.data.value == 0) {
              return;
            }
            var x0 = pieArc.centroid(d)[0];
            var y0 = pieArc.centroid(d)[1];
            var centroid = pieArc.centroid(d);
            var midAngle = Math.atan2(centroid[1], centroid[0]);
            var x1 = Math.cos(midAngle) * labelRadius;
            var x2 = x1 > 0 ? labelRadius : -labelRadius;

            var y1 = d3.select(labelElements[i]).attr('y');
            var ret = [];
            ret.push('M', x0, y0, 'L', x1, y1, 'L', x2, y1);
            return ret.join(' ');
          });
        setTimeout(relax, 20);
      }
    }
  }
  
  drawBar(opts){
    let barData = opts.barData;
    let padding = opts.grid.padding;
    let scale = this.scaleProcess(opts, barData)
    let colorScale = scale.colorScale,
        xScale = scale.xScale,
        xAxisScale = scale.xAxisScale,
        yScale = scale.yScale;
    this.drawAxis(opts, scale)
    barData.map((item, i) => {
      this.svg.append("g")
        .selectAll('g')
        .data(item)
        .enter()
        .append("g")
        .attr("fill", function(d) { 
          return colorScale(d.key); 
        })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("width", xAxisScale.bandwidth())
        .attr("x", function(d, j) { 
          return xScale(d.data.name) + xAxisScale(d.data.stack)

        })
        .attr("y", function(d) { 
          return yScale(d[1]); 
        })
        .attr("height", function(d) { 
          return yScale(d[0]) - yScale(d[1]); 
        })
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    })
  }

  scaleProcess(opts, stackData){
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        xAxis = opts.xAxis,
        yAxis = opts.yAxis,
        colors = opts.colors,
        barData = opts.barData,
        xAxisBarNum = opts.xAxisBarNum;
      let colorScale = d3.scaleOrdinal()
          .domain(opts.series.map(value => {
            return value.name
          }))
          .range(colors);
      // 横坐标的比例尺
      let xScale = d3.scaleBand() 
          .domain(opts.xAxis.data)
          .rangeRound([0, width-padding.left-padding.right])
          .padding(0.1);   
      // 多个柱在x轴的一个横坐标上的比例尺    
      let xAxisScale = d3.scaleBand()  //柱状图x区间段比例尺
          .domain(xAxisBarNum)    //xAxisBarNum为数据的名称
          .rangeRound([0, xScale.bandwidth()])
          .padding(0.1);
      // y轴要判断是不是多纵轴，而且是不是堆叠使用？？？
      // 先认为一个纵轴
     let yScaleData = stackData.reduce((prev, cur) => {
        return  prev.concat(cur)
     }, [])   
     let yScale = d3.scaleLinear()
        .domain([d3.min(yScaleData, stackMin), d3.max(yScaleData, stackMax)])
        .rangeRound([height - padding.bottom - padding.top, 0]);

    return {
      colorScale,
      xScale,
      xAxisScale,
      yScale
    }

    function stackMin(serie) {
      return d3.min(serie, function(d) { 
        return d[0]; 
      });
    }
    function stackMax(serie) {
      return d3.max(serie, function(d) { 
        return d[1]; 
      });
    }
  }
  drawLine(opts){
    let lineData = opts.lineData;
    let padding = opts.grid.padding;
    let scale = this.scaleProcess(opts, lineData)
    let colorScale = scale.colorScale,
        xScale = scale.xScale,
        xAxisScale = scale.xAxisScale,
        yScale = scale.yScale;
    this.drawAxis(opts, scale)
    lineData.map((item, i) => {
      this.svg.append("g")
        .selectAll('g')
        .data(item)
        .enter()
        .append("g")
        .attr("fill", function(d) { 
          return colorScale(d.key); 
        })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("width", xAxisScale.bandwidth())
        .attr("x", function(d, j) { 
          return xScale(d.data.name) + xAxisScale(d.data.stack)

        })
        .attr("y", function(d) { 
          return yScale(d[1]); 
        })
        .attr("height", function(d) { 
          return yScale(d[0]) - yScale(d[1]); 
        })
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    })
  }

  drawAxis(opts, scale){
    // 绘制坐标轴
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        xAxis = opts.xAxis,
        yAxis = opts.yAxis;
    let xScale = scale.xScale,
        yScale = scale.yScale;

   // x轴显示的条件，？？？

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

    // y轴显示的条件？？？
    // 绘制y轴，现在只考虑最多两条的情况，左右分布，对应条件？y轴多条比例尺，多条情况后面优化， 
    yAxis.forEach(yItem => {
      //双重循环优化？？？？
      //暂时先利用name相同作为判断，series里与yAxis里name相同的数据为此yScale,并且series里的数据要有对应的yScale,name作为判断条件不合适
      opts.series.forEach( seriesItem => {
        if(yItem.name === seriesItem.name){
          // y轴比例尺，设置比例？？
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