---
layout: default
title: Width and Height
---

{% capture intro %}
By default the chart is as wide as its containing element and `200px` high. This includes space for both axes (if present).

Chart size can be changed using the `height()` and `width()` methods. They both accept either a number of pixels (eg, `250`) or a string indicating a percentage (eg, `75%`).
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/height.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-height"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/height.html %}
});
</script>
{% endcapture %}

{% include example.html %}


{% capture intro %}{% endcapture %}

{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/width_height.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-width-height"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/width_height.html %}
});
</script>
{% endcapture %}

{% include example.html %}

