---
layout: default
title: Axes and Grids
---

{% capture intro %}
By default the x and y axes are displayed and there is no grid across the chart area. You can switch off one or both axes and add lines over the chart area in either direction
{% endcapture %}

{% include example.html %}


{% capture intro %}
## showXAxis and showYAxis

To switch the axes on or off, pass `true` or `false` to the relevant methods:
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_hide_y.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-hide-y"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_hide_y.html %}
});
</script>
{% endcapture %}

{% include example.html %}


{% capture intro %}{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_hide_both.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-hide-both"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_hide_both.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## showXAxisGrid and showYAxisGrid

We can add lines across the chart from one or both of the x or y axes by passing `true` to `showXAxisGrid()` or `showYAxisGrid()`. These can make it easier to line points up with axes values but can also clutter things up, particularly on a small chart.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_grid_show_y.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-grid-show-y"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_grid_show_y.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_grid_show_both.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-grid-show-both"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_grid_show_both.html %}
});
</script>
{% endcapture %}

{% include example.html %}

