GLOBAL.flexslider_lazyloader = {

  // load the prev and next slides of the current slide
  load_adjacent_slides: function(slider, _options) {

    // VARIABLES

    var current_slide = 0,
        next_slide = 0,
        prev_slide = 0,
        last_slide = 0,
        visible_slides = 0,
        offset = 0,
        slide_ids = [],
        get_current_slides,
        get_next_slides,
        get_prev_slides,
        calculate_visible_items,
        load_slides,
        load_cloned_slides,
        load_picturefill_slides,
        load_picturefill_cloned_slides,
        $slides,
        current_src,
        current_data_original,
        options;

    // if the slider.move is defined, set offset to that, otherwise set to 1
    (typeof slider.move !== 'undefined') ? offset = slider.move : offset = 1;

    // if options was passed as an argument, define local options as that, otherwise set options to object
    (typeof _options !== 'undefined') ? options = _options : options = {};

    current_slide = slider.currentSlide;
    last_slide = slider.last;

    // get a jquery reference to the slides DOM element
    $slides = $(slider.slides);

    // flexslider does not correctly calculate visible items for a carousel
    // because does not take into account slider.itemMargin
    // TODO - figure out why this flexslider code is not working
    // slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
    //                (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
    //                (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;
    //
    // slider.visible = Math.floor(slider.w/(slider.itemW));
    // https://github.com/woothemes/FlexSlider/blob/master/jquery.flexslider.js
    calculate_visible_items = function() {

      var slider_width,
          item_width;

      slider_width = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      item_width = slider.vars.itemWidth + slider.vars.itemMargin;

      return Math.floor(slider_width / item_width);

    };

    // if slider.visible is defined, calculate the visible items, otherwise set visible_slides to 0
    // don't forget, slider.visible is zero indexed and is the quantity of visible slides
    // so if there are 6 visible slides in the slideshow, slider.visible will be 5
    (typeof slider.visible !== 'undefined') ? visible_slides = calculate_visible_items() : visible_slides = 0;

    // END VARIABLES

    // GET THE IDS OF SLIDES TO LOAD

    // get the currently visible slides and add to slide_ids array
    get_current_slides = (function() {

      var first_visible_slide = current_slide * offset,
          last_visible_slide = first_visible_slide + visible_slides;

      for (var i = first_visible_slide; i <= last_visible_slide; i++) {
        slide_ids.push(i);
      }
      console.log('slide_ids is ' + slide_ids);

    }());
    // end get the currently visible slides

    // get the next slides
    get_next_slides = (function() {

      var current_last_slide = (current_slide * offset) + visible_slides,
          future_last_slide = current_last_slide + offset;

      // if this is the last slide
      if (current_slide === last_slide) {

        // add the first slide
        slide_ids.push(0);

      } else {

        for (var i = future_last_slide; i > current_last_slide; i--) {
          slide_ids.push(i);
        }

      }

    }());
    // end get the next slides

    // get the prev slides
    get_prev_slides = (function() {

      var current_first_slide = (current_slide * offset),
          future_first_slide = current_first_slide - offset;

      // if this is the first slide
      if (current_first_slide <= 0) {

        // calculate the last slides
        var adjusted_last_slide = (last_slide * offset) + visible_slides,
            future_last_slide = adjusted_last_slide + offset;

        // add the last slides
        for (var i = future_first_slide; i < current_first_slide; i++) {
          slide_ids.push(i);
        }

      } else {

        for (var i = future_first_slide; i < current_first_slide; i++) {
          slide_ids.push(i);
        }

      }

    }());
    // end get the prev slides

    // END GET THE IDS OF SLIDES TO LOAD

    // NO PICTUREFILL LOAD SLIDES
    load_slides = function(slides) {

      $(slides).each(function(slide) {

        var slide_id = slides[slide],
            current_src,
            current_data_original,
            $slide = $($slides[slide_id]);

        current_src = $slide.find('img').attr('src');
        current_data_original = $slide.find('img').attr('data-original');

        // if there is a data-original attribute and it has not already been loaded into src
        if ( current_data_original !== 'undefined' && current_src !== current_data_original ) {

          // update the current slide source
          $slide.find('img').attr('src', current_data_original);

        }

      });
    };
    // END NO PICTUREFILL LOAD SLIDES

    // NO PICTUREFILL LOAD CLONED SLIDES
    load_cloned_slides = function() {

      if ( $(slider).find('.clone').length > 0 ) {

        // get the cloned slides
        $(slider).find('.clone').each(function() {

          var $clone_slide_image = $(this).find('img'),
              current_src,
              current_data_original;

          // get this slide's picturefill element and get the value of it's first span data-src
          current_src = $clone_slide_image.attr('src');

          current_data_original = $clone_slide_image.attr('data-original');

          // if there is a data-original attribute and it has not already been loaded into src
          if ( current_data_original !== 'undefined' && current_src !== current_data_original ) {

            // load data-original into img src
            $clone_slide_image.attr('src', current_data_original);

          }

        });

      }

    };
    // END NO PICTUREFILL LOAD CLONED SLIDES

    // PICTUREFILL LOAD SLIDES
    load_picturefill_slides = function(_slides) {

      $(_slides).each(function(_slide) {

        var slide_id = _slides[_slide],
            picturefill_container,
            current_data_src,
            current_data_original,
            $slide = $($slides[slide_id]);

        // get the jquery object for this slide and find an element with attribute data-picture
        picturefill_container = $($slides[slide_id]).find('[data-picture]');

        // get this slide's picturefill element and get the value of it's first span data-src
        current_data_src = $(picturefill_container).find('span').attr('data-src');

        current_data_original = $(picturefill_container).find('span').attr('data-original');

        // if there is a data-original attribute and it has not already been loaded into src
        if ( current_data_original !== 'undefined' && current_data_src !== current_data_original ) {

          // get all the children span elements of the picturefill container
          var $spans = $(picturefill_container).find('span');

          // for each span in the picturefill container span
          $.each($spans, function(index, value) {

            var $span = $($spans[index]),
                source = $span.attr('data-original');

            $span.attr('data-src', source);

            // if this span has a child element img
            if ($span.find('img').length > 0) {
              $span.find('img').attr('src', source);
            }

          });

        }

      });

    };
    // END PICTUREFILL LOAD SLIDES

    // PICTUREFILL LOAD CLONED SLIDES
    load_picturefill_cloned_slides = function() {

      if ( $(slider).find('.clone').length > 0 ) {

        // get the cloned slides
        $(slider).find('.clone').each(function() {

          var $clone_slide = $(this),
              picturefill_container,
              current_data_src,
              current_data_original;

          // get the jquery object for this slide and find an element with attribute data-picture
          picturefill_container = $clone_slide.find('[data-picture]');

          // get this slide's picturefill element and get the value of it's first span data-src
          current_data_src = $(picturefill_container).find('span').attr('data-src');

          current_data_original = $(picturefill_container).find('span').attr('data-original');

          // if there is a data-original attribute and it has not already been loaded into src
          if ( current_data_original !== 'undefined' && current_data_src !== current_data_original ) {

            // get all the children span elements of the picturefill container
            var $spans = $(picturefill_container).find('span');

            // for each span in the picturefill container span
            $.each($spans, function(index, value) {

              var $span = $($spans[index]),
                  source = $span.attr('data-original');

              $span.attr('data-src', source);

              // if this span has a child element img
              if ($span.find('img').length > 0) {
                $span.find('img').attr('src', source);
              }

            });

          }


        });

      }

    }
    // END PICTUREFILL LOAD CLONED SLIDES

    // if this slideshow implements picturefill
    if (options.picturefill === true) {

      // load the slides
      load_picturefill_slides(slide_ids);

      // load any cloned slides
      load_picturefill_cloned_slides();

    } else {

      // load the slides
      load_slides(slide_ids);

      // load any cloned slides
      load_cloned_slides();

    }

  }

};

