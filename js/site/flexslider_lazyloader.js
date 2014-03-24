GLOBAL.flexslider_lazyloader = {

  // load the prev and next slides of the current slide
  load_adjacent_slides: function(slider) {

    var current_slide = 0,
        next_slide = 0,
        prev_slide = 0,
        current_slides = [],
        next_slides = [],
        prev_slides = [],
        all_slides = [],
        unique_slides = [],
        last_slide = 0,
        $slides,
        current_src,
        current_data_original,
        offset,
        visible_slides = 0;

    current_slide = slider.currentSlide;
    last_slide = slider.last;
    $slides = $(slider.slides);

    // offset
    if (typeof slider.move !== 'undefined') {
      offset = slider.move;
    } else {
      offset = 1;
    }
    // end offset

    if (typeof slider.visible !== 'undefined') {
      console.log('in if, slider.visible is ' + slider.visible);
      // don't forget, slider.visible is zero indexed and is the quantity of visible slides
      // so if there are 6 visible slides in the slideshow, slider.visible will be 5
      visible_slides = slider.visible;
    }
    // end visible slides



    // LOAD MULTIPLE SLIDES

    // get the current slides
    function get_current_slides() {

      var first_visible_slide = current_slide * offset;
      var last_visible_slide = first_visible_slide + visible_slides;

      for (var i = first_visible_slide; i <= last_visible_slide; i++) {
        current_slides.push(i);
      }

    }
    get_current_slides();

    // end get the current slides

    // get the next slides
    function get_next_slides() {

      var current_last_slide = (current_slide * offset) + visible_slides;
      var future_last_slide = current_last_slide + offset;

      for (var i = future_last_slide; i > current_last_slide; i--) {
        next_slides.push(i);
      }

    }
    get_next_slides();
    // end get the next slides

    // get the prev slides
    function get_prev_slides() {

      var current_first_slide = (current_slide * offset);
      var future_first_slide = current_first_slide - offset;

      if (current_slide !== 0) {

        for (var i = future_first_slide; i < current_first_slide; i++) {
          prev_slides.push(i);
        }

      } else {

        prev_slides.push(0);

      }

    }
    get_prev_slides();
    // end get the prev slides

    // combine current, next, and prev slides
    all_slides.push(current_slides, next_slides, prev_slides);
    console.log('all_slides are ' + all_slides);

    function get_unique_array(array) {

      var unique_array = [];

      $.each(array, function(item) {

        console.log('the item is ' + array[item]);
        console.log('the inArray value is ' + $.inArray(item, array));
        console.log('the value of unique_array is now ' + unique_array);

        if ( $.inArray(item, array) === -1 ) {
          console.log('if happeneed');
          unique_array.push(array[item]);
        } else {
          console.log('else happeneed');
        }

        console.log('after function, the value of unique_array is now ' + unique_array);

      });

      return unique_array;

    }
    unique_slides = get_unique_array(all_slides);
    console.log('unique_slides are ' + unique_slides);

    // load slides
    function load_slides(slides) {

      $(slides).each(function(slide) {

        var slide_id = slides[slide];

        current_src = $($slides[slide_id]).find('img').attr('src');
        current_data_original = $($slides[slide_id]).find('img').attr('data-original');

        // if there is a data-original attribute and it has not already been loaded into src
        if ( current_data_original !== 'undefined' && current_src !== current_data_original ) {
          $($slides[slide_id]).find('img').attr('src', current_data_original);
        }

      });
    }

    // load the current slides
    load_slides(current_slides);

    // load the next slides
    load_slides(next_slides);

    // load the prev slides
    load_slides(prev_slides);

    // END LOAD MULTIPLE SLIDES

  }

};

