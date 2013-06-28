---
layout: default
title: Axis Ticks
---

{% capture intro %}
There are two ways to control the number of ticks and labels on the axes.

By default, d3 estimates how many ticks to display on each label and often makes a good guess. But sometimes it doesn't look good, or you have more specific requirements.
{% endcapture %}

{% include example.html %}


{% capture intro %}
## xAxisTicks and yAxisTicks

You can provide a number of ticks you'd like to see on each axis and d3 will *aim* to use roughly this many. It's a bit hit and miss though.

Our example of using an `xAxisType` of `'yearmonth'` results in overlapping labels on the x-axis:
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_yearmonth.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-yearmonth"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_yearmonth.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
By default d3 is using all seven of our x-axis points. We can try suggesting fewer points, but it only seems to take notice when we get down to 2. While we're at it we'll increase the number of ticks on the y-axis.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_tick.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-tick"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_tick.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## xAxisTickValues and yAxisTickValues
We can be more specific about the axis ticks which are used, by supplying them explicitly.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_tick_values.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-tick-values"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_tick_values.html %}
});
</script>
{% endcapture %}

{% include example.html %}
