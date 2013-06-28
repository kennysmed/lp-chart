---
layout: default
title: Multiple lines
---

{% capture intro %}
To draw multiple lines on the same chart, prepare the data for each line, and pass those arrays in at the same time. All lines must use the same type of x-axis data (eg, dates, strings, or numbers) but do not have to have the same values.
{% endcapture %}


{% capture code %}
{% highlight javascript %}
window.onload = function() {
{% include code/lines.html %}
};
{% endhighlight %}
{% endcapture %}


{% capture chart %}
<div class="pub">
    <div id="chart-lines"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/lines.html %}
});
</script>
{% endcapture %}

{% include example.html %}



{% capture intro %}
Individual lines can be styled differently with CSS. The lines have classes that increment, in the order in which the data is added: `.line-1`, `.line-2`, etc. By default each line has a width of `2px`.

We can style the above chart differently like this:
{% endcapture %}


{% capture code %}
{% highlight css %}
{% include code/lines_style.css %}
{% endhighlight %}
{% endcapture %}


{% capture chart %}
{% include code/lines_style.css %}
<div class="pub">
   <div id="chart-lines-style"> </div>
</div>
<script>
loadstack.push(function(win){
    {% include code/lines_style.html %}
});
</script>
{% endcapture %}

{% include example.html %}

