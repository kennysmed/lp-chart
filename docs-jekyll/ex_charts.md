---
layout: default
title: Multiple charts 
---

{% capture intro %}
It's possible to draw several charts on the same page, using the same instance of `LPChart`. Any options applied, such as `showXAxis()`, carry over to subsequent charts, but can be changed for each in turn.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/charts.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-charts-1"> </div>
    <div id="chart-charts-2"> </div>
    <div id="chart-charts-3"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/charts.html %}
});
</script>
{% endcapture %}

{% include example.html %}

