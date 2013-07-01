---
layout: default
title: Introduction
---

{% capture intro %}
[LPChart](https://github.com/bergcloud/lp-chart/) is some JavaScript that makes it easier to draw line charts. It provides a simplified way of interacting with [d3](http://d3js.org/) and is designed to be particularly useful when making publications for [Little Printer](http://bergcloud.com/littleprinter/).

The aim is to be able to draw one or more simple charts, with a simple data format, and minimal JavaScript and configuration. It won't suit everyone, but for most Little Printer publication needs it should create good-looking and easy to implement charts.

At [BERG](http://berglondon.com) we currently use this for the [Google Analytics](http://remote.bergcloud.com/publications/138) and [Gmail Stats](http://remote.bergcloud.com/publications/177) publications.

By default the chart will fill the full width of its surrounding element, and include x and y axes. You can [change the dimensions](ex_size.html), use [different types of data](ex_axis_type.html) for the x-axis, [hide the axes or add grids](ex_axes_grids.html) across the chart, [specify the values](ex_axis_tick.html) shown on the axes, [fill the area](ex_fills.html) below the line, [draw multiple lines](ex_lines.html) on the same chart, or [draw multiple charts](ex_charts.html) on the same page (or publication).


Next steps:

* Read a [basic, complete example](usage.html)
* Read the [method reference](reference.html)
* See [more examples](ex_default.html)
* Go to [the LPChart code on GitHub](https://github.com/bergcloud/lp-chart/)
{% endcapture %}

{% capture code %}{% endcapture %}
{% capture chart %}{% endcapture %}

{% include example.html %}
