---
layout: default
title: Fills
---

{% capture intro %}
By default each dataset is drawn as a line chart. The area below the line can be filled in by calling `fill(true)`.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/fill.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-fill"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/fill.html %}
});
</script>
{% endcapture %}

{% include example.html %}

