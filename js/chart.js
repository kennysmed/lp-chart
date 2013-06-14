function LPChart() {

  var tickFormats = {
    date: function(d) { return d3.time.format('%e %b')(d); },
    numeric: function(d) { return d3.format(',')(d); },
    year: function(d) { return d3.time.format('%Y')(d); },
    yearmonth: function(d) { return d3.time.format('%b %Y')(d); }
  };

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 760,
      height = 120,
      line = d3.svg.line().x(X).y(Y),
      // The default axis types:
      xAxisType = 'numeric',
      yAxisType = 'numeric';

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

  // Set the default values based on the default axis types:
  var xValue = xAxisTypes[xAxisType].value,
      yValue = yAxisTypes[yAxisType].value,
      xScale = xAxisTypes[xAxisType].scale,
      yScale = yAxisTypes[yAxisType].scale,
      xTickFormat = xAxisTypes[xAxisType].tickFormat,
      yTickFormat = yAxisTypes[yAxisType].tickFormat,
      xAxis = d3.svg.axis().orient('bottom').tickSize(6, 0).scale(xScale).tickFormat(xTickFormat),
      yAxis = d3.svg.axis().orient('left').tickSize(6, 0).scale(yScale).tickFormat(yTickFormat);

  function chart(selection) {
    // Reset the default values for this particular chart:
    xValue = xAxisTypes[xAxisType].value;
    yValue = yAxisTypes[yAxisType].value;
    xScale = xAxisTypes[xAxisType].scale;
    yScale = yAxisTypes[yAxisType].scale;
    xTickFormat = xAxisTypes[xAxisType].tickFormat;
    yTickFormat = yAxisTypes[yAxisType].tickFormat;
    xAxis.scale(xScale).tickFormat(xTickFormat);
    yAxis.scale(yScale).tickFormat(yTickFormat);

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