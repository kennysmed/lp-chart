function LPChart() {

  // The ways we can format different types of tick data.
  var tickFormats = {
    date: function(d) { return d3.time.format('%e %b')(d); },
    numeric: function(d) { return d3.format(',')(d); },
    hour: function(d) { return d3.time.format('%H:%M')(d); },
    month: function(d) { return d3.time.format('%b')(d); },
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
      outerWidth = '100%',
      outerHeight = 200,
      // Not user-editable. Calculated based on presence of axes.
      innerWidth = 20,
      innerHeight = 0,
      // The rough number of ticks. Override with chart.xAxisTicks() and
      // chart.yAxisTicks().
      xAxisTicks = 8,
      yAxisTicks = 5,
      // The default axis types, which can be overriden with
      // chart.xAxisType() and chart.yAxisType():
      xAxisType = 'numeric',
      yAxisType = 'numeric',
      // Will have extra things applied in chart(), based on axis types:
      xAxis = d3.svg.axis().orient('bottom'),
      yAxis = d3.svg.axis().orient('left'),
      // Do we show the x or y axes?
      // Set with chart.showXAxis() and chart.showYAxis().
      showXAxis = true,
      showYAxis = true,
      // Do we show grid lines across the chart for x or y axes?
      // Set with chart.showXAxisGrid() and chart.showYAxisGrid().
      showXAxisGrid = false,
      showYAxisGrid = false,
      // Will be set in chart() based on axis types:
      xValue = null,
      yValue = null,
      xScale = null,
      yScale = null,
      xAxisTickFormat = null,
      yAxisTickFormat = null,
      xAxisTickSize = 5;
      yAxisTickSize = 5;

  // Keys are valid values for xAxisType and yAxisType, which can be set using
  // chart.xAxisType() and chart.yAxisType.
  // The formats in the `value` functions show the formats we expect for each
  // item on the x-axis.
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
    month: {
      value: function(d) { return d3.time.format("%m").parse(d[0]); },
      scale: d3.time.scale(),
      tickFormat: tickFormats.month
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


  // Called for each chart.
  function chart(selection) {

    // Processes the (possibly multiple) datasets, and finds out the min and
    // max values for the X and Y axes.
    var process_datasets = function(selection) {
      var datasets = [];
      var minX, maxX, minY, maxY;

      // For each of the lines...
      selection.each(function(orig_datasets) {

        orig_datasets.forEach(function(data) {
          // Convert data to standard representation greedily;
          // this is needed for nondeterministic accessors.
          data = data.map(function(d, i) {
            return [xValue.call(data, d, i), yValue.call(data, d, i)];
          });

          datasets.push(data);
        });

        // Get the min and max of all the datasets' x and y values:
        minX = d3.min(datasets, function(ds) {
                      return d3.min(ds, function(d) { return d[0]; });
                    });
        maxX = d3.max(datasets, function(ds) {
                      return d3.max(ds, function(d) { return d[0]; });
                    });
        minY = 0;
        maxY = d3.max(datasets, function(ds) {
                      return d3.max(ds, function(d) { return d[1]; });
                    });
      });

      return {
        datasets: datasets,
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
      };
    };

    // Set the values for this particular chart based on axis types:
    xValue = xAxisTypes[xAxisType].value;
    yValue = yAxisTypes[yAxisType].value;
    xScale = xAxisTypes[xAxisType].scale;
    yScale = yAxisTypes[yAxisType].scale;
    xAxisTickFormat = xAxisTypes[xAxisType].tickFormat;
    yAxisTickFormat = yAxisTypes[yAxisType].tickFormat;
    // Some aspects of the axes need to be updated:
    xAxis.scale(xScale).tickFormat(xAxisTickFormat).ticks(xAxisTicks);
    yAxis.scale(yScale).tickFormat(yAxisTickFormat).ticks(yAxisTicks);

    // Process the datasets and get the min/max axes values.
    var results = process_datasets(selection);
    var datasets = results.datasets,
        minX = results.minX,
        maxX = results.maxX,
        minY = results.minY,
        maxY = results.maxY;

    // Set the width in pixels if it's been set as a percentage.
    if (outerWidth.toString().substr(-1) == '%') {
      outerWidth = selection[0][0].offsetWidth * (
                              outerWidth.substr(0, outerWidth.length-1) / 100
                            );
    }

    marginLeft = 0;
    marginRight = 0;
    marginTop = 0;
    marginBottom = 0;

    if (showXAxis) {
      // Enough space for text:
      marginBottom = 12 + xAxis.tickPadding();

      // Add some space for the ticks and their padding.
      if ( ! showXAxisGrid) {
        marginBottom += xAxisTickSize;
      }

    } else {
      if (showYAxis) {
        // Enough space for bottom label on y-axis to not be clipped:
        marginBottom = 5;
      }
    }
    if (showYAxis) {
      // Enough to allow for top of a y-axis label at top of its axis:
      marginTop = 7;
      // Just a rough value for now - we'll create a specific one based on
      // the widest tick label later.
      marginLeft = 20;

    } else {
      // Should stop peaks of lines being clipped:
      marginTop = 1;
    }

    // I don't quite understand why `this` on its own no longer works.
    var container = this[0][0];

    // Select the svg element, if it exists.
    var svg = d3.select(container).selectAll("svg").data([datasets]);

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

    // Height of the chart-area itself.
    innerHeight = outerHeight - marginTop - marginBottom;
    innerWidth = outerWidth - marginLeft - marginRight;

    xScale.domain([minX, maxX])
          .range([0, innerWidth]);
    yScale.domain([0, maxY])
          .range([innerHeight, 0]);


    // DRAW DUMMY X-AXIS ///////////////////////////////////////////

    if (showXAxis) {
      // Just so we can measure its first and last labels' widths.
      // From this we'll get:
      //  xAxisMarginRight
      //  xAxisMarginLeft

      gEnter.append("g").attr("class", "axis axis-x");
      g.select(".axis-x")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis);

      var firstTick = d3.select(container).select('.axis-x').select('.tick');
      var firstTickWidth = firstTick.node().getBBox().width;
      xAxisMarginLeft = firstTickWidth / 2;

      var lastTick = d3.select(
              d3.select(container).select('.axis-x').selectAll('.tick')[0].pop()
            );
      var lastTickWidth = lastTick.node().getBBox().width;
      xAxisMarginRight = lastTickWidth / 2;

      // Now remove the dummy x-axis.
      g.select(".axis-x").remove();
    }


    // DRAW DUMMY Y-AXIS ////////////////////////////////////////////

    if (showYAxis) {
      // Just so we can measure its widest label's width.
      // From this we'll get:
      //  yAxisMarginLeft

      gEnter.append("g").attr("class", "axis axis-y");
      g.select(".axis-y")
        .call(yAxis);

      // Get the width of the widest y-axis label.
      var maxYTickW = 0;
      d3.select(container).select('.axis-y').selectAll('text').each(function(){
        if (this.getBBox().width > maxYTickW) maxYTickW = this.getBBox().width;
      });

      yAxisMarginLeft = maxYTickW + xAxis.tickPadding();

      // We need to add some for the ticks.
      if ( ! showYAxisGrid) {
        yAxisMarginLeft += yAxisTickSize;
      }

      // Now remove the dummy x-axis.
      g.select(".axis-y").remove();
    }


    // Now we can calculate the exact left/right margins we need,
    // and therefore the innerWidth.
    marginLeft = d3.max([yAxisMarginLeft, xAxisMarginLeft]);
    marginRight = xAxisMarginRight;
    innerWidth = outerWidth - marginLeft - marginRight;


    // DRAW REAL X-AXIS ////////////////////////////////////////////////

    if (showXAxisGrid) {
      xAxis.tickSize(-innerHeight, 0, 0);
    } else {
      xAxis.tickSize(xAxisTickSize, 0, 0);
    }

    xScale.domain([minX, maxX])
          .range([0, innerWidth]);

    if (showXAxis) {
      gEnter.append("g").attr("class", "axis axis-x");
      g.select(".axis-x")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis);
    }


    // DRAW REAL Y-AXIS ///////////////////////////////////////////////

    if (showYAxisGrid) {
      yAxis.tickSize(-innerWidth, 0, 0);
    } else {
      yAxis.tickSize(yAxisTickSize, 0, 0);
    }

    yScale.domain([0, maxY])
          .range([innerHeight, 0]);

    if (showYAxis) {
      // Add it.
      gEnter.append("g").attr("class", "axis axis-y");
      g.select(".axis-y")
        .call(yAxis);
    }


    // ON WITH THE MAIN AREA OF THE CHART ///////////////////////////////   

    // Update the outer dimensions.
    svg.attr("width", outerWidth)
        .attr("height", outerHeight);

    // Add the line paths.
    g.selectAll(".line").data(datasets)
     .enter()
     .append("path")
     .attr("class", function(d,i) { return "line line-"+(i+1); })
     .attr("d", line);

    g.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
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
    if (!arguments.length) return outerWidth;
    outerWidth = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return outerHeight;
    outerHeight = _;
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

  chart.showXAxisGrid = function(_) {
    if (!arguments.length) return showXAxisGrid;
    showXAxisGrid = _;
    return chart;
  }

  chart.showYAxisGrid = function(_) {
    if (!arguments.length) return showYAxisGrid;
    showYAxisGrid = _;
    return chart;
  }

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