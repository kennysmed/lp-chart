---
layout: default
title: Introduction
---

{% capture intro %}
[LPChart](https://github.com/bergcloud/lp-chart/) is some JavaScript that makes it easier to draw line charts. It provides a simplified way of interacting with [d3](http://d3js.org/) and is designed to be particularly useful when making publications for [Little Printer](http://bergcloud.com/littleprinter/).

The aim is to be able to draw one or more simple charts, with a simple data format, and minimal JavaScript and configuration. It won't suit everyone, but for most Little Printer publication needs it should create good-looking and easy to implement charts.

At [BERG](http://berglondon.com) we currently use this for the [Google Analytics](http://remote.bergcloud.com/publications/138) and [Gmail Stats](http://remote.bergcloud.com/publications/163) publications.

By default the chart will fill the full width of its surrounding element, and include x and y axes. You can [change the dimensions](ex_size.html), use [different types of data](ex_axis_type.html) for the x-axis, [hide the axes or add grids](ex_axes_grids.html) across the chart, [specify the values](ex_axis_tick.html) shown on the axes, [fill the area](ex_fills.html) below the line, [draw multiple lines](ex_lines.html) on the same chart, or [draw multiple charts](ex_charts.html) on the same page (or publication).

Here's a complete example of the code and the chart it generates:
{% endcapture %}

{% capture code %}
{% highlight html %}
<!DOCTYPE html>
<html lang="en-gb">
<head>
  <!-- Include both d3 and LPChart -->
  <script src="js/d3.v3.min.js"></script>
  <script src="js/lpchart.min.js"></script>

  <!-- The default chart styles -->
  <link rel="stylesheet" href="css/lpchart.css">

  <script>
{% endhighlight %}
{% highlight javascript %}
    // Run the chart code on load:
    window.onload = function() {
{% include code/intro.html %}
    };
{% endhighlight %}
{% highlight html %}
  </script>
</head>
<body>
  <!-- The element that the chart will be drawn in -->
  <div id="chart-intro"></div>
</body>
</html>
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-intro"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/intro.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
Now you can:

* Read the [method reference](reference.html)
* See [more examples](ex_default.md)
* Go to [the LPChart code on GitHub](https://github.com/bergcloud/lp-chart/)
{% endcapture %}

{% capture code %}{% endcapture %}
{% capture chart %}{% endcapture %}

{% include example.html %}
