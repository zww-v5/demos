var tl = new TimelineMax({onComplete: onScrollAnimation});
var tl2 = new TimelineMax();

var ha = document.getElementById("HA");
var c = document.getElementById("C");
var k = document.getElementById("K");
var h = document.getElementById("H");
var et = document.getElementById("ET");
var justH = document.getElementById("just_H");
var justK = document.getElementById("just_K");
var justE = document.getElementById("just_E");
var lineH = document.getElementById("Line_H");
var lineA = document.getElementById("Line_A");
var lineC = document.getElementById("Line_C");
var justA = document.getElementById("just_A");
var lineT = document.getElementById("Line_T");

  tl.from(ha, 1.1, { y: -600, x: -1000 })
    .from(c, 1.1, { y: 880, x: -1000 }, "-=0.8")
    .from(k, 1.2, { y: -850, x: 2000 }, "-=1")
    .from(h, 1.1, { x: 2000 }, "-=1.2")
    .from(et, 1.5, { y: 1200, x: 2000 }, "-=1.3");
    // .fromTo(ha, 1.1, { y: -600, x: -1000 }, { x: 175.0, y: 66.0 })
    // .fromTo(c, 1.1, { y: 880, x: -1000 }, { x: 175.0, y: 198.0 }, "-=0.8")
    // .fromTo(k, 1.2, { y: -850, x: 2000 }, { x: 290.0, y: 132.0 }, "-=1")
    // .fromTo(h, 1.1, { x: 2000 }, { x: 405.0, y: 331.0 }, "-=1.2")
    // .fromTo(et, 1.5, { y: 1200, x: 2000 }, { x: 290.0, y: 397.0 }, "-=1.3");

  tl2.from(just_H, 1, { y: -600, x: -1000 }, "+=1")
    .from(lineH, 1, { y: -600, x: -1000 }, "-=0.8")
    .from(justK, 1, { y: -850, x: 2000 }, "-=1")
    .from(lineA, 1, { y: -1250, x: 2000 }, "-=0.8")
    .from(lineC, 1, { y: 550, x: -1000 }, "-=0.8")
    .from(justA, 1, { y: -1200, x: 2000 }, "-=1.6")
    .from(justE, 1, { y: 1200, x: 2000 }, "-=1.6")
    .from(lineT, 1, { y: 1200, x: 2000 }, "-=1.4");

  
  var controller = new ScrollMagic.Controller();

  // Create a scene with custom options
  var scene = new ScrollMagic.Scene({
    duration: "70%", // resposive duration in %
    offset: 0, // offset trigger position by 100px
    triggerElement: "#trigger", // what will trigger scene
    triggerHook: 0 // 0=top, 0.5=middle, 1=bottom
  });

  // scene.addIndicators({ name: "Scroll animation" });

  function onScrollAnimation() {
    var timeline = new TimelineMax();
    timeline
      .to(ha, 1.1, { y: -600, x: -1000 })
      .to(c, 1.1, { y: 880, x: -1000 }, "-=0.8")
      .to(k, 1.2, { y: -850, x: 2000 }, "-=1")
      .to(h, 1.1, { x: 2000 }, "-=1.2")
      .to(et, 1.5, { y: 1200, x: 2000 }, "-=1.3");
    scene.setTween(timeline);
    scene.addTo(controller);
  }
  
