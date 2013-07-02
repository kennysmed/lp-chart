---
layout: default
title: X-axis types
---

{% capture intro %}
The `xAxisType` should be set to match the type of data that will be used for the chart's x-axis.

The `numeric` format is the default.
{% endcapture %}

{% include example.html %}



{% capture intro %}
## hour 
By doing `chart.xAxisType('hour')` we can specify a time of day as x-axis labels.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_hour.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-hour"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_hour.html %}
});
</script>
{% endcapture %}

{% include example.html %}




{% capture intro %}
## date
By doing `chart.xAxisType('date')` we can use specific dates on the x-axis.

The dates should be in order, but do not need to be consecutive. d3 will fill in any missing dates in the sequence.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_date.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-date"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_date.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## month 
By doing `chart.xAxisType('month')` we can specify months as x-axis labels.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_month.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-month"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_month.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## numeric
By default the chart has an x-axis that expects numbers. This could also be set explicitly with `chart.xAxisType('numeric')`.
{% endcapture %}

{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_numeric.html %}
};
{% endhighlight %}
{% endcapture %}

{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-numeric"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_numeric.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## string
We can use different kinds of data for the x-axis by setting the `xAxisType`. 

Doing `chart.xAxisType('string')` lets us use arbitrary strings for x-axis values.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_string.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-string"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_string.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## weekday 
To use days of the week on the x-axis, use `chart.xAxisType('weekday')`. The x-axis values must be dates in the format `YYYY-MM-DD`. 
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_weekday.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-weekday"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_weekday.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## year 
By doing `chart.xAxisType('year')` we can use years on the x-axis.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/axis_type_year.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-axis-type-year"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/axis_type_year.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
## yearmonth 
By doing `chart.xAxisType('yearmonth')` we can specify year and month combinations on the x-axis.

The x-axis labels overlap in this example, but [we can specifiy](ex_axis_tick.html) roughly how many labels we want, or exactly which labels should be displayed.
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

