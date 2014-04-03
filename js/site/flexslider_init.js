;(function($) {

  $(window).load(function() {

    // demo 1 slideshow
    $('#flexloader-demo-1-slideshow').flexslider({
      namespace: "flexloader-demo-1-",
      animation: "slide",
      keyboard: false,
      slideshowSpeed: 100000,
      animationSpeed: 300
    });
    // end demo 1 slideshow

    // demo 2 slideshow
    $('#flexloader-demo-2-slideshow').flexslider({
      namespace: "flexloader-demo-2-",
      animation: "slide",
      prevText: "prev",
      nextText: "next",
      keyboard: false,
      slideshowSpeed: 100000,
      animationSpeed: 300,
      start: function(slider) {
        $.flexloader(slider);
      },
      after: function(slider) {
        $.flexloader(slider);
      }
    });
    // end demo 2 slideshow

    // demo 3 slideshow
    $('#flexloader-demo-3-slideshow').flexslider({
      namespace: "flexloader-demo-3-",
      animation: "slide",
      prevText: "prev",
      nextText: "next",
      keyboard: false,
      slideshowSpeed: 100000,
      animationSpeed: 300,
      start: function(slider) {
        $.flexloader(slider, { 'picturefill': true });
      },
      after: function(slider) {
        $.flexloader(slider, { 'picturefill': true });
      }
    });
    // end demo 3 slideshow



    // demo 4 carousel
    $('#flexloader-demo-4-carousel').flexslider({
      namespace: "flexloader-demo-4-",
      animation: "slide",
      controlNav: false,
      itemWidth: 270,
      itemMargin: 0,
      minItems: 4,
      maxItems: 4,
      prevText: "prev",
      nextText: "next",
      keyboard: false,
      slideshowSpeed: 100000,
      animationSpeed: 600,
      animationLoop: false,
      move: 2
    });
    // end demo 4 carousel

    // demo 5 carousel
    $('#flexloader-demo-5-carousel').flexslider({
      namespace: "flexloader-demo-5-",
      animation: "slide",
      controlNav: false,
      itemWidth: 270,
      itemMargin: 0,
      minItems: 4,
      maxItems: 4,
      prevText: "prev",
      nextText: "next",
      keyboard: false,
      slideshowSpeed: 100000,
      animationSpeed: 600,
      animationLoop: false,
      move: 2,
      start: function(slider) {
        $.flexloader(slider);
      },
      after: function(slider) {
        $.flexloader(slider);
      }
    });
    // end demo 5 carousel

    // demo 6 carousel
    $('#flexloader-demo-6-carousel').flexslider({
      namespace: "flexloader-demo-6-",
      animation: "slide",
      controlNav: false,
      itemWidth: 270,
      itemMargin: 0,
      minItems: 4,
      maxItems: 4,
      prevText: "prev",
      nextText: "next",
      keyboard: false,
      slideshowSpeed: 100000,
      animationSpeed: 600,
      animationLoop: false,
      move: 2,
      start: function(slider) {
        $.flexloader(slider, { 'picturefill': true });
      },
      after: function(slider) {
        $.flexloader(slider, { 'picturefill': true });
      }
    });
    // end demo 6 carousel

    // demo 7 slideshow
    $('#flexloader-demo-7-slideshow').flexslider({
      namespace: "flexloader-demo-7-",
      animation: "slide",
      prevText: "prev",
      nextText: "next",
      keyboard: false,
      slideshowSpeed: 100000,
      animationSpeed: 300,
      start: function(slider) {
        $.flexloader(slider, { 'background_images': true });
      },
      after: function(slider) {
        $.flexloader(slider, { 'background_images': true });
      }
    });
    // end demo 7 slideshow

  });

}(jQuery));
