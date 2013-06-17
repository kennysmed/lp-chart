function LPChart() {

  // The ways we can format different types of tick data.
  var tickFormats = {
    date: function(d) { return d3.time.format('%e %b')(d); },
    numeric: function(d) { return d3.format(',')(d); },
    hour: function(d) { return d3.time.format('%H:%M')(d); },
    weekday: function(d) { return d3.time.format('%a')(d); },
    year: function(d) { return d3.time.format('%Y')(d); },
    yearmonth: function(d) { return d3.time.format('%b %Y')(d); }
  };

  var line = d3.svg.line().x(X).y(Y),
      // Not user-editable - depend on presence of axes etc:
      marginLeft = 0,
      marginRight = 0,
      marginTop = 0,
      marginBottom = 0,
      // Width and height, which can be overridden with
      // chart.width() and chart.height(). In pixels or a string with %.
      // These are the width and height allocated to the entire chart,
      // including labels.
      width = '100%',
      height = 200,
      // The rough number of ticks. Override with chart.xAxisTicks() and
      // chart.yAxisTicks().
      xAxisTicks = 8,
      yAxisTicks = 5,
      // The default axis types, which can be overriden with
      // chart.xAxisType() and chart.yAxisType():
      xAxisType = 'numeric',
      yAxisType = 'numeric',
      // Will have extra things applied in chart(), based on axis types:
      xAxis = d3.svg.axis().orient('bottom').tickSize(5, 0, 0),
      yAxis = d3.svg.axis().orient('left').tickSize(5, 0, 0),
      showXAxis = true,
      showYAxis = true,
      // Will be set in chart() based on axis types:
      xValue = null,
      yValue = null,
      xScale = null,
      yScale = null,
      xTickFormat = null,
      yTickFormat = null;

  // Keys are valid values for xAxisType and yAxisType, which can be set using
  // chart.xAxisType() and chart.yAxisType.
  var xAxisTypes = {
    date: {
      value: function(d) { return d3.time.format("%Y-%m-%d").parse(d[0]); },
      scale: d3.time.scale(),
      tickFormat: tickFormats.date
    },
    hour: {
      value: function(d) { return d3.time.format("%H:%M").parse(d[0]); },
      scale: d3.time.scale(),
      tickFormat: tickFormats.hour
    },
    numeric: {
      value: function(d) { return +d[0]; },
      scale: d3.scale.linear(),
      tickFormat: tickFormats.numeric
    },
    weekday: {
      value: function(d) { return d3.time.format("%Y-%m-%d").parse(d[0]); },
      scale: d3.time.scale(),
      tickFormat: tickFormats.weekday
    },
    year: {
      value: function(d) { return d3.time.format("%Y").parse(d[0]); },
      scale: d3.time.scale(),
      tickFormat: tickFormats.year
    },
    yearmonth:  {
      value: function(d) { return d3.time.format("%Y-%m").parse(d[0]); },
      scale: d3.time.scale(),
      tickFormat: tickFormats.yearmonth
    }
  };
  var yAxisTypes = {
    numeric: {
      value: function(d) { return +d[1]; },
      scale: d3.scale.linear(),
      tickFormat: tickFormats.numeric
    }
  };


  function chart(selection) {
    // Set the values for this particular chart based on axis types:
    xValue = xAxisTypes[xAxisType].value;
    yValue = yAxisTypes[yAxisType].value;
    xScale = xAxisTypes[xAxisType].scale;
    yScale = yAxisTypes[yAxisType].scale;
    xTickFormat = xAxisTypes[xAxisType].tickFormat;
    yTickFormat = yAxisTypes[yAxisType].tickFormat;
    // Some aspects of the axes need to be updated:
    xAxis.scale(xScale).tickFormat(xTickFormat).ticks(xAxisTicks);
    yAxis.scale(yScale).tickFormat(yTickFormat).ticks(yAxisTicks);

    if (width.toString().substr(-1) == '%') {
      width = selection[0][0].offsetWidth * (width.substr(0, width.length-1) / 100);
    }

    if (showXAxis) {
      // Enough space for ticks and text:
      marginBottom = 20;
    } else {
      if (showYAxis) {
        // Enough space for bottom label on y-axis to not be clipped:
        marginBottom = 5;
      } else {
        marginBottom = 0;
      }
    }
    if (showYAxis) {
      // Enough to allow for top of a y-axis label at top of its axis:
      marginTop = 7;
    } else {
      // Should stop peaks of lines being clipped:
      marginTop = 1;
    }

    // The dimensions of the chart area itself.

    // For each of the lines...
    selection.each(function(orig_datasets) {

      var datasets = [];

      orig_datasets.forEach(function(data) {
        // Convert data to standard representation greedily;
        // this is needed for nondeterministic accessors.
        data = data.map(function(d, i) {
          return [xValue.call(data, d, i), yValue.call(data, d, i)];
        });

        datasets.push(data);
      });

      // Get the min and max of all the datasets' x and y values:
      var minX = d3.min(datasets, function(ds) {
                    return d3.min(ds, function(d) { return d[0]; });
                  });
      var maxX = d3.max(datasets, function(ds) {
                    return d3.max(ds, function(d) { return d[0]; });
                  });
      var minY = 0;
      var maxY = d3.max(datasets, function(ds) {
                    return d3.max(ds, function(d) { return d[1]; });
                  });

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([datasets]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");

      // The graph area(?):
      var g = svg.select("g");


      // Will be the space we need on the left for the y-axis' widest label:
      var yAxisMarginLeft = 0;
      // Will be the space we need on the left for x-axis' first label:
      var xAxisMarginLeft = 0;
      // Will be the space we need on the right for x-axis' last label:
      var xAxisMarginRight = 0;


      // DRAW Y-AXIS ////////////////////////////////////////////////////

      // Height of the chart-area itself.
      var innerHeight = height - marginTop - marginBottom;

      yScale
          .domain([0, maxY])
          .range([innerHeight, 0]);

      if (showYAxis) {
        // Add it.
        gEnter.append("g").attr("class", "axis axis-y");
        g.select(".axis-y")
          .call(yAxis);

        // Get the width of the widest y-axis label.
        var maxYTickW = 0;
        d3.select(this).select('.axis-y').selectAll('text').each(function(){
          if (this.getBBox().width > maxYTickW) maxYTickW = this.getBBox().width;
        });

        // We add 8px to allow for the ticks and space:
        yAxisMarginLeft = maxYTickW + 8;
      }


      if (showXAxis) {
        // DRAW DUMMY X-AXIS ///////////////////////////////////////////
        // Just so we can measure its first and last labels' widths.

        // Width of chart area itself, based on what we have so far:
        var dummyInnerWidth = width - d3.max([marginLeft, yAxisMarginLeft]) - marginRight;

        xScale
            .domain([minX, maxX])
            .range([0, dummyInnerWidth]);

        gEnter.append("g").attr("class", "axis axis-x");
        g.select(".axis-x")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis);

        var firstTick = d3.select(this).select('.axis-x').select('.tick');
        var firstTickWidth = firstTick.node().getBBox().width;
        xAxisMarginLeft = firstTickWidth / 2;

        var lastTick = d3.select(
                d3.select(this).select('.axis-x').selectAll('.tick')[0].pop()
              );
        var lastTickWidth = lastTick.node().getBBox().width;
        xAxisMarginRight = lastTickWidth / 2;

        // Now remove the dummy x-axis.
        g.select(".axis-x").remove();
      }


      // Having drawn the y-axis and the dummy x-axis, we now know the most
      // space we need to leave on the left and right of the chart area:
      marginLeft = d3.max([yAxisMarginLeft, xAxisMarginLeft]);
      marginRight = xAxisMarginRight;


      // DRAW REAL X-AXIS ////////////////////////////////////////////////

      // Width of the chart-area itself.
      var innerWidth = width - marginLeft - marginRight;

      xScale
          .domain([minX, maxX])
          .range([0, innerWidth]);

      if (showXAxis) {
        gEnter.append("g").attr("class", "axis axis-x");
        g.select(".axis-x")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis);
      }


      // ON WITH THE MAIN PART OF THE CHART ///////////////////////////////   

      // Update the outer dimensions.
      svg.attr("width", width)
          .attr("height", height);

      // Add the line paths.
      g.selectAll(".line").data(datasets)
       .enter()
       .append("path")
       .attr("class", function(d,i) { return "line line-"+(i+1); })
       .attr("d", line);

      g.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
    });
  }

  // The x-accessor for the path generator; xScale . xValue.
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for the path generator; yScale . yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  chart.xAxisType = function(_) {
    if (!arguments.length) return xAxisType;
    if (_ in xAxisTypes) {
      xAxisType = _;
    }
    return chart;
  };

  chart.yAxisType = function(_) {
    if (!arguments.length) return yAxisType;
    if (_ in yAxisTypes) {
      yAxisType = _;
    }
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.xAxisTicks = function(_) {
    if (!arguments.length) return xAxisTicks;
    xAxisTicks = _;
    return chart;
  };

  chart.yAxisTicks = function(_) {
    if (!arguments.length) return yAxisTicks;
    yAxisTicks = _;
    return chart;
  };

  chart.showXAxis = function(_) {
    if (!arguments.length) return showXAxis;
    showXAxis = _;
    return chart;
  };

  chart.showYAxis = function(_) {
    if (!arguments.length) return showYAxis;
    showYAxis = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}