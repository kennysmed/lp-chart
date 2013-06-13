function LPChart() {
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 760,
      height = 120,
      // Both axes default to numeric scales:
      xValue = function(d) { return +d[0]; },
      yValue = function(d) { return +d[1]; },
      xScale = d3.scale.linear(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(6, 0),
      line = d3.svg.line().x(X).y(Y),
      xAxisType = 'numeric',
      yAxisType = 'numeric';

  var x_axis_types = {
    date:       {
      value: function(d) { return d3.time.format("%Y-%m-%d").parse(d[0]); },
      scale: d3.time.scale()
    },
    numeric:    {
      value: function(d) { return +d[0]; },
      scale: d3.scale.linear()
    },
    year:       {
      value: function(d) { return d3.time.format("%Y").parse(d[0]); },
      scale: d3.time.scale()
    },
    yearmonth:  {
      value: function(d) { return d3.time.format("%Y-%m").parse(d[0]); },
      scale: d3.time.scale()
    }
  };
  var y_axis_types = {
    numeric:    {
      value: function(d) { return +d[1]; },
      scale: d3.scale.linear()
    }
  };

  function chart(selection) {
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
              return d3.min(ds, function(d) { return d[0]; })
            }),
            d3.max(datasets, function(ds) { 
              return d3.max(ds, function(d) { return d[0]; })
            })
          ])
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      // Set the domains to go from min to max of all the datasets' y values.
      yScale
          .domain([
            0,
            d3.max(datasets, function(ds) { 
              return d3.max(ds, function(d) { return d[1]; })
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

  // The x-accessor for the path generator; xScale âˆ˜ xValue.
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for the path generator; yScale âˆ˜ yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  chart.xAxisType = function(_) {
    if (!arguments.length) return xAxisType;
    if (_ in x_axis_types) {
      xAxisType = _;
      xValue = x_axis_types[_].value;
      xScale = x_axis_types[_].scale;
      xAxis.scale(xScale);
    };
    return chart;
  };

  chart.yAxisType = function(_) {
    if (!arguments.length) return yAxisType;
    if (_ in y_axis_types) {
      yAxisType = _;
      yValue = y_axis_types[_].value;
      yScale = y_axis_types[_].scale;
      yAxis.scale(yScale);
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