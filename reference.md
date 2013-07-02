---
layout: default
title: Reference
---

{% capture intro %}
After creating a chart object, but before passing data into it, options can be set to change the chart's behaviour and appearance. The methods below are called on an `LPChart` object and can be chained. eg:
{% endcapture %}

{% capture code %}
{% highlight javascript %}
var chart = LPChart();

chart.width(200)
     .height(150)
     .showXAxis(false)
     .yAxisTickValues([0, 50, 100, 150, 200])
     .fill(true);
{% endhighlight %}
{% endcapture %}

{% capture chart %}{% endcapture %}

{% include example.html %}


<table>
  <thead>
    <tr>
      <th class="tbl-method">Method</th>
      <th class='tbl-types'>Argument type</th>
      <th class="tbl-values">Possible values</th>
      <th class="tbl-default">Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>width()</code></td>
      <td><code>integer</code> or <code>string</code></td>
      <td>eg, <code>200</code>, <code>"50%"</code></td>
      <td><code>"100%"</code></td>
    </tr>
    <tr>
      <td><code>height()</code></td>
      <td><code>integer</code></td>
      <td>eg, <code>150</code></td>
      <td><code>200</code></td>
    </tr>

    <tr>
      <td><code>xAxisType()</code></td>
      <td><code>string</code></td>
      <td><code>"hour"</code>, <code>"date"</code>, <code>"month"</code>, <code>"numeric"</code>, <code>"string"</code>, <code>"weekday"</code>, <code>"year"</code> or <code>"yearmonth"</code></td>
      <td><code>"numeric"</code></td>
    </tr>
    <tr>
      <td><code>yAxisType()</code></td>
      <td><code>string</code></td>
      <td><code>"numeric"</code></td>
      <td><code>"numeric"</code></td>
    </tr>

    <tr>
      <td><code>showXAxis()</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> or <code>false</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><code>showYAxis()</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> or <code>false</code></td>
      <td><code>true</code></td>
    </tr>

    <tr>
      <td><code>showXAxisGrid()</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> or <code>false</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><code>showYAxisGrid()</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> or <code>false</code></td>
      <td><code>false</code></td>
    </tr>

    <tr>
      <td><code>xAxisTicks()</code></td>
      <td><code>integer</code></td>
      <td>eg, <code>2</code>, <code>7</code></td>
      <td><code>8</code></td>
    </tr>
    <tr>
      <td><code>yAxisTicks()</code></td>
      <td><code>integer</code></td>
      <td>eg, <code>2</code>, <code>7</code></td>
      <td><code>5</code></td>
    </tr>

    <tr>
      <td><code>xAxisTickValues()</code></td>
      <td><code>array</code></td>
      <td>eg, <code>["00:00", "06:00", "12:00", "18:00"]</code></td>
      <td><code>null</code></td>
    </tr>
    <tr>
      <td><code>yAxisTickValues()</code></td>
      <td><code>array</code></td>
      <td>eg, <code>[0, 25, 50, 75, 100]</code></td>
      <td><code>null</code></td>
    </tr>

    <tr>
      <td><code>yAxisMin()</code></td>
      <td><code>integer</code> or <code>string</code></td>
      <td>eg, <code>0</code>, <code>437</code>, or <code>"min"</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>yAxisMax()</code></td>
      <td><code>integer</code> or <code>string</code></td>
      <td>eg, <code>500</code>, or <code>"max"</code></td>
      <td><code>"max"</code></td>
    </tr>

    <tr>
      <td><code>fill()</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> or <code>false</code></td>
      <td><code>false</code></td>
    </tr>
  </tbody>
</table>
