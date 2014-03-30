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
        GLOBAL.flexslider_lazyloader.load_adjacent_slides(slider);
      },
      after: function(slider) {
        GLOBAL.flexslider_lazyloader.load_adjacent_slides(slider);
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
        GLOBAL.flexslider_lazyloader.load_adjacent_slides(slider, { 'picturefill': true });
      },
      after: function(slider) {
        GLOBAL.flexslider_lazyloader.load_adjacent_slides(slider, { 'picturefill': true });
      }
    });
    // end demo 3 slideshow

  });

}(jQuery));
