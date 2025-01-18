---
layout: page
title: SumBA
description: Video sumarization using state space models  
img: assets/img/SumBA.jpeg
importance: 1
category: work
related_publications: false
---
<style>
    .fixed-height {
        height: 150px; /* Set a fixed height */
    }
</style>

<h3>Method & Architecture</h3>
<div class="row">
    <div class="col-sm-6 mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/method.png"  class="img-fluid rounded z-depth-1 fixed-height" caption="SumBA Encoder"  %}
    </div>
    <div class="col-sm-6 mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Architecture.png" class="img-fluid rounded z-depth-1 fixed-height" caption="Proposed Approach" %}
    </div>
</div>

<h3>Quantitative Results</h3>
<div class="row">
    <div class="col-sm-6 mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/SOTA.png"  class="img-fluid rounded z-depth-1 fixed-height" caption="State-of-the-Art" %}
    </div>
    <div class="col-sm-6 mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/comparision.png" class="img-fluid rounded z-depth-1 fixed-height" caption="Computational Performance" %}
    </div>
</div>


<h3>Qualitative Results</h3>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/full-video-SH-1.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true  %}
         <figcaption class="caption">Full video</figcaption>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/summ.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
        <figcaption class="caption">Summarized video</figcaption>
    </div>
</div> 


