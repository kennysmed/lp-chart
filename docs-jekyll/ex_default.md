---
layout: default
title: Line chart 
---

{% capture intro %}
By default the chart expects x-axis values to be numbers, and x- and y-axes are displayed.

In this case we don't supply any options to `chart` -- we only:

* Create the object,
* identify the HTML element that will contain the chart,
* pass the data in,
* and make it draw.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/default.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-default"> </div>
</div>
<script>
window.onload = function() {
    {% include code/default.html %}
};
</script>
{% endcapture %}


{% include example.html %}
