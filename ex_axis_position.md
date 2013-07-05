---
layout: default
title: Y-axis Position
---

{% capture intro %}
By default the y-axis on a chart, if shown, will be on the left-hand side. It
can be moved to the right using `yAxisPosition('right')`:
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/y_axis_position.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-yaxis-position-1"> </div>
</div>
<div class="pub">
    <div id="chart-yaxis-position-2"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/y_axis_position.html %}
});
</script>
{% endcapture %}

{% include example.html %}
