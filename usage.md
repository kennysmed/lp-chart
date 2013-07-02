---
layout: default
title: Usage
---


{% capture intro %}
Include the following files in your page:

* `js/d3.v3.min.js`
* `js/lpchart.min.js`
* `lpchart.css`

Create an HTML element in which the chart will be drawn.

Write your code to draw the chart when the page has loaded, eg within
`window.onload()`.

Below is a complete example of the code and the chart it generates.

(**Note:** We have found that including JavaScript files in Little
Printer publications can be problematic; they might not load before BERG Cloud
captures the page's output. If you find your charts aren't drawing at all, try
embedding D3 and LPChart's JavaScript directly within your HTML page, rather
than including the files. It's ugly, but at the moment it's more reliable.)
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
  <link rel="stylesheet" href="lpchart.css">

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
