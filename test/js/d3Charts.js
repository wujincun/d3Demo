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
          //position: 'left', // left ,right
          labels: { // 坐标轴标签
            formatter: null, // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。????
            rotate: 0, //刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
            margin: 8, //刻度标签与轴线之间的距离。
          },
        },
        {
          name: 'left',
          position: 'right', // left ,right
          labels: { // 坐标轴标签
            formatter: null, // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。????
            rotate: 0, //刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
            margin: 8, //刻度标签与轴线之间的距离。
          },
        },
        {
          name: 'left',
          position: 'right', // left ,right
          offset: 40,
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
          //stack: '堆叠',
          yAxisIndex: 1,
          data:[5,7,30]
        },
        {
          type:'bar',
          name:'测试3',
          stack: '堆叠',
          //yAxisIndex: 1,
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
      colors: ['#b7e1fc', '#d5f997', '#b1d4cb', '#91cae9','#fae871'],
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
        d.stack && (opts.lineStack = true); // 只要有一条线的stack存在，多条线图就以堆叠线图显示，但是参数要全写上stack，否则纵轴绘制出错，应该怎么操作？
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
      opts.barData = barData;
      this.drawBar(opts)
    }
    if(lineData.length){
      opts.lineData = lineData;
      this.drawLine(opts)
    }
    
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
  // 参考drawLine优化？
  drawBar(opts){
    let barData = this.stackBarDataProcess(opts.barData, opts.xAxis.data);
    let padding = opts.grid.padding;

    let scale = this.scaleProcess(opts, {type: 'bar', data: barData})
    let colorScale = scale.colorScale,
        xScale = scale.xScale,
        xAxisScale = scale.xAxisScale,
        yScale = scale.yScale; 
    !opts.drawAxis && this.drawAxis(opts, scale)
      // 是否将堆积的柱状图一个纵轴，非堆叠的一个纵轴
    opts.xAxisBarNum && this.drawStackYAxis(opts, yScale);
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

  drawLine(opts){
    // 简单折线，堆叠折线,只能全部堆叠或不堆叠，不能部分
    let padding = opts.grid.padding;
    let lineData = opts.lineStack ? this.stackLineDataProcess(opts) : opts.lineData;
    let scale = this.scaleProcess(opts, {type: 'line', data: lineData})
    let colorScale = scale.colorScale,
        xScale = scale.xScale,
        yScale = scale.yScale; // 堆叠折线
    !opts.drawAxis && this.drawAxis(opts, scale); //没有绘制过坐标轴
    opts.lineStack && this.drawStackYAxis(opts, yScale);
    let line = d3.line()
      .x((d, i) => {
        return xScale(opts.xAxis.data[i]) + xScale.bandwidth() / 2;
      })
      .y(d => {
        return opts.lineStack ? yScale(d[1]) : yScale(d);
      })
    lineData.forEach((value, index) => {
        let lineEl = this.svg
          .append('g')
          .attr('class', 'line')
          .attr(
            'transform',
            'translate(' + padding.left + ',' + padding.top + ')'
          );
        lineEl
          .append('path')
          .attr('d', function(){
              return opts.lineStack ? line(value) : line(value.data)
          })
          .style('fill', 'none')
          .style('stroke-width', 1)
          .style('stroke', colorScale(opts.lineStack ? value.key :value.name))
          .style('stroke-opacity', 0.9);
        lineEl
          .append('g')
          .attr('class', 'circles')
          .selectAll('circle')
          .data(opts.lineStack ? value : value.data)
          .enter()
          .append('circle')
          .attr('cx', function(d, i) {
            return xScale(opts.xAxis.data[i]) + xScale.bandwidth() / 2;
          })
          .attr('cy', function(d) {
            return opts.lineStack ? yScale(d[1]) : yScale(d);
          })
          .attr('r', 3)
          .attr('stroke-width', 1)
          .attr('stroke','#ffffff')
          .attr('fill', colorScale(opts.lineStack ? value.key :value.name))
          .on('mouseover', function(d, i) { // 添加toolTips？并且需要在移动区域给全部提示，参考carsv
            d3.select(this).attr('r', 4);
          })
          .on('mouseout', function(d, i) {
            d3.select(this).attr('r',3);
          });
      });   
  }

  stackBarDataProcess(initData, xAixisData){
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

  stackLineDataProcess(opts){
    let xAixisData = opts.xAxis.data, lineData = opts.series;
    let stackData = [], keys = []; 
    xAixisData.forEach((xItem,xi) => {
      stackData[xi] = {name: xItem}
    })
    lineData.forEach((value, key) => { // 不考虑缺少某一栏数据的情况
      let data = value.data;
      keys.push(value.name)
      data.forEach((item, index) => {
        stackData[index][value.name] = item;
      })
    })
    let series = d3.stack().keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)(stackData);
    return series;
  }

  scaleProcess(opts, dataObj){
    let type = dataObj.type,data = dataObj.data;
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        xAxis = opts.xAxis,
        yAxis = opts.yAxis,
        colors = opts.colors,
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

      //多纵轴，
      // 多个柱在x轴的一个横坐标上的比例尺  
      let xAxisScale, yScale;
      if(type === 'bar'){ //堆叠  判断条件？？？？
        if(xAxisBarNum){
          xAxisScale = d3.scaleBand()  //柱状图x区间段比例尺
          .domain(xAxisBarNum)    //xAxisBarNum为数据的名称
          .rangeRound([0, xScale.bandwidth()])
          .padding(0.1);
        }
        let yScaleData = data.reduce((prev, cur) => {
            return  prev.concat(cur)
         }, []);
        yScale = d3.scaleLinear()
            .domain([d3.min(yScaleData, stackMin), d3.max(yScaleData, stackMax)])
            .rangeRound([height - padding.bottom - padding.top, 0]);

      }else if(type === 'line'){ // 仍旧判断堆叠情况
        //堆叠情况？？？
        if(opts.lineStack){
          console.log(d3.min(data, stackMin))
          yScale = d3.scaleLinear()
            .domain([d3.min(data, stackMin), d3.max(data, stackMax)])
            .rangeRound([height - padding.bottom - padding.top, 0]);
        }else{
          yScale = d3.scaleLinear()
            .domain([d3.min(data, (d)=>{return d3.min(d.data)}), d3.max(data, (d)=>{return d3.max(d.data)})])
            .rangeRound([height - padding.bottom - padding.top, 0]);
        }
      }
      
      // y轴要判断是不是多纵轴，而且是不是堆叠使用？？？
      
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
  // scale和Axis需要重新梳理
  // 绘制color和X轴
  drawAxis(opts, scale){
    // 绘制坐标轴
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        series = opts.series,
        xAxis = opts.xAxis,
        yAxis = opts.yAxis;
    let xScale = scale.xScale;
    // 绘制x轴，默认为bottom，以后优化;横轴ticks间距显示？？？ 不画多个？？？
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
    this.drawYAxis(opts)
    opts.drawAxis = true;
  }
  // 绘制y轴
  drawYAxis(opts){
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding,
        series = opts.series,
        yAxis = opts.yAxis;
     yAxis.forEach((yItem, yIndex) => {
    // 双重循环优化,没有判断堆积图？？？
      let yDirectionScale, translate, yScale, typeObj = {};
      series.forEach( (seriesItem, seriesIndex) => { 
        if(!seriesItem.yAxisIndex){
          seriesItem.yAxisIndex = 0;
        }
        if(!seriesItem.stack ){ // 没有堆叠才正常绘制, 还要区分type
          // 如果是有stack的折线图，
          if(opts.lineStack && seriesItem.type === 'line'){
            return
          }
          if(seriesItem.yAxisIndex === yIndex){
            //要按图形类型区分
            typeObj[seriesItem.type] ? typeObj[seriesItem.type].push(seriesItem) : typeObj[seriesItem.type] = [seriesItem]
          }
        }
      })
      // 普通的多种图多条y轴绘制
      for(let key in typeObj){
        let item = typeObj[key];
        if((key === 'line' || key === 'bar') && item.length){
          yScale = d3.scaleLinear()
                .domain([d3.min(item, (d)=>{return d3.min(d.data)}), d3.max(item, (d)=>{return d3.max(d.data)})])
                .rangeRound([height - padding.bottom - padding.top, 0]);
          let offset = yItem.offset || 0; // offset默认值为0
          let position = yItem.position;// position 默认为left？？ 应该是默认第一个没有position的为left
          if( position === 'left'){
            yDirectionScale = d3.axisLeft(yScale);
            translate = 'translate(' + Number(padding.left + offset) + ',' + padding.top + ')';
          }else if(position === 'right'){
            yDirectionScale = d3.axisRight(yScale)
            translate = 'translate(' + (width - padding.right + offset) + ',' + padding.top + ')';
          }else{
            if(this.svg.selectAll('.leftAxis')._groups[0].length){
              position = "right";
              yDirectionScale = d3.axisRight(yScale);
              translate = 'translate(' + (width - padding.right) + ',' + padding.top + ')';
            }else{
              position = "left";
              yDirectionScale = d3.axisLeft(yScale);
              translate = 'translate(' + padding.left + ',' + padding.top + ')';
            }
          }
           // 绘制y轴
          let yaxis = this.svg.append('g')
            .attr('class', `${position}Axis`)
            .attr('transform', translate)
            .attr('stroke', 'red')
            .call(yDirectionScale.ticks(5)) //设置ticks？？？
            //.style('font-size', '12'); // d3.axisLeft(yScale) --V4版本
          // 绘制y轴名称 ???没有显示 //判断显示条件？？？
          yaxis.append('text')
              .text(yItem.name)
              .attr('transform','translate(' + -25 + ',' + -15 + ')');
        } 
      }
    })
  }
  // 绘制堆叠y轴
  drawStackYAxis(opts, yScale){
    let height = opts.grid.height,
        width = opts.grid.width,
        padding = opts.grid.padding;
    let yDirectionScale,translate,position;
    if(this.svg.selectAll('.leftAxis')._groups[0].length){
      position = "right";
      yDirectionScale = d3.axisRight(yScale);
      translate = 'translate(' + (width - padding.right) + ',' + padding.top + ')';
    }else{
      position = "left";
      yDirectionScale = d3.axisLeft(yScale);
      translate = 'translate(' + padding.left + ',' + padding.top + ')';
    }
    
   let yaxis = this.svg.append('g')
      .attr('class', `${position}Axis`) 
      .attr('transform', translate)
      .attr('stroke', 'red')
      .call(yDirectionScale.ticks(5)) //设置ticks？？？
      .style('font-size', '12'); // d3.axisLeft(yScale) --V4版本
      // 绘制y轴名称 ???没有显示 //判断显示条件？？？

      yaxis.append('text')
          .text('堆叠')
          .attr('transform','translate(' + -25 + ',' + -15 + ')');
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