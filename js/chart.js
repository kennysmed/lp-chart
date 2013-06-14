function LPChart() {

  var tickFormats = {
    date: function(d) { return d3.time.format('%e %b')(d); },
    numeric: function(d) { return d3.format(',')(d); },
    year: function(d) { return d3.time.format('%Y')(d); },
    yearmonth: function(d) { return d3.time.format('%b %Y')(d); }
  };

  var line = d3.svg.line().x(X).y(Y),
      // Default margins, which can be overridden with chart.margin():
      margin = {top: 20, right: 20, bottom: 20, left: 20},
      // Default width and height, which can be overridden with
      // chart.width() and chart.height():
      width = 384,
      height = 120,
      // The rough number of ticks. Override with chart.xAxisTicks() and
      // chart.yAxisTicks().
      xAxisTicks = 10,
      yAxisTicks = 10,
      // The default axis types, which can be overriden with
      // chart.xAxisType() and chart.yAxisType():
      xAxisType = 'numeric',
      yAxisType = 'numeric',
      // Will have extra things applied in chart(), based on axis types:
      xAxis = d3.svg.axis().orient('bottom').tickSize(6, 0),
      yAxis = d3.svg.axis().orient('left').tickSize(6, 0),
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
    numeric: {
      value: function(d) { return +d[0]; },
      scale: d3.scale.linear(),
      tickFormat: tickFormats.numeric
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


      // Update the x-scale.
      // Set the domains to go from min to max of all the datasets' x values.
      xScale
          .domain([
            d3.min(datasets, function(ds) {
              return d3.min(ds, function(d) { return d[0]; });
            }),
            d3.max(datasets, function(ds) {
              return d3.max(ds, function(d) { return d[0]; });
            })
          ])
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      // Set the domains to go from min to max of all the datasets' y values.
      yScale
          .domain([
            0,
            d3.max(datasets, function(ds) {
              return d3.max(ds, function(d) { return d[1]; });
            })
          ])
          .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([datasets]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("g").attr("class", "x axis");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the line paths.
      g.selectAll(".line").data(datasets)
       .enter()
       .append("path")
       .attr("class", function(d,i) { return "line line-"+(i+1); })
       .attr("d", line);

      // Update the x-axis.
      g.select(".x.axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis);
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
    };
    return chart;
  };

  chart.yAxisType = function(_) {
    if (!arguments.length) return yAxisType;
    if (_ in yAxisTypes) {
      yAxisType = _;
    };
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
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