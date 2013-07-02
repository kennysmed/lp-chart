---
layout: default
title: Y-axis Max and Min
---

{% capture intro %}
By default the y-axis on a chart will stretch from 0 to the maximum value of
all the y-values. This shows the full extent of the data and is usually what's
needed. But if charting small changes in large numbers (such as stock prices)
then you may want to zoom in on only the part of the data that shows changes.

For example, we can compare a chart that uses the default value for `yAxisMin`
(which is `0`) with one where we focus on the minimum and maximum of the data, by setting
`yAxisMin('min')`:
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/y_axis_min.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-yaxis-min-1"> </div>
</div>
<div class="pub">
    <div id="chart-yaxis-min-2"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/y_axis_min.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
`yAxisMax()` works in the same way, although there's probably less need to use
it. By default it is set to `"max"`, but can be set to any numeric value.
{% endcapture %}

{% capture code %}{% endcapture %}
{% capture chart %}{% endcapture %}

{% include example.html %}
