/*
 *  jQuery Flexloader - v0.3.1
 *  Lazyload Flexslider slides, optionally using Picturefill
 *  http://shaekuronen.github.io/jquery.flexloader
 *
 *  Made by Shae Kuronen
 *  Under MIT License
 */
;(function($) {

	$.flexloader = function(flexslider, options) {

		// constructor
		function Flexloader(flexslider, options) {

			this.flexslider = flexslider;
			this.current_slide = 0;
			this.next_slide = 0;
			this.prev_slide = 0;
			this.last_slide = 0;
			this.visible_slides = 0;
			this.offset = 0;
			this.slide_ids = [];
			// flexslider.slides does not include any cloned elements
			this.$slides = $(this.flexslider.slides);
			this.options = $.extend({
				picturefill: false,
				background_images: false,
				class_name: 'flexloader-background-image-loaded'
			}, options);

			// if the slider.move is defined, set offset to that, otherwise set to 1
			(typeof this.flexslider.move !== 'undefined') ? this.offset = this.flexslider.move : this.offset = 1;

			this.current_slide = this.flexslider.currentSlide;

			this.last_slide = this.flexslider.last;

			// if flexslider.visible is defined, calculate the visible items, otherwise set visible_slides to 0
			// don't forget, flexslider.visible is zero indexed and is the quantity of visible slides
			// so if there are 6 visible slides in the slideshow, flexslider.visible will be 5
			(typeof this.flexslider.visible !== 'undefined') ? this.visible_slides = this.calculate_visible_items() : this.visible_slides = 0;

			// these functions add slides to the slide_ids array
			this.get_current_slides();
			this.get_next_slides();
			this.get_prev_slides();

			this.init();

		}
		// end constructor

		// plugin prototype methods
		Flexloader.prototype = {

			init: function() {

				var _this = this;

				// if this slideshow implements picturefill
				if (this.options.picturefill === true) {

					// load the slides
					_this.load_picturefill_slides(this.slide_ids);

					// load any cloned slides
					_this.load_picturefill_cloned_slides();

				// if this slideshow has background images
				} else if (this.options.background_images === true) {

					// load slides with background images
					_this.load_background_image_slides(this.slide_ids);

					// load any cloned slides
					_this.load_background_image_clone_slides();

				} else {

					// load the slides
					_this.load_slides(this.slide_ids);

					// load any cloned slides
					_this.load_cloned_slides();

				}

			},

			// flexslider does not correctly calculate visible items for a carousel
			// because does not take into account slider.itemMargin
			// TODO - figure out why this flexslider code is not working
			// slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
			//                (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
			//                (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;
			//
			// slider.visible = Math.floor(slider.w/(slider.itemW));
			// https://github.com/woothemes/FlexSlider/blob/master/jquery.flexslider.js
			calculate_visible_items: function() {

				var slider_width,
						item_width;

				slider_width = (this.flexslider.viewport===undefined) ? this.flexslider.width() : this.flexslider.viewport.width();
				item_width = this.flexslider.vars.itemWidth + this.flexslider.vars.itemMargin;

				return Math.floor(slider_width / item_width);

			},

			// GET THE IDS OF SLIDES TO LOAD

			// get the currently visible slides and add to slide_ids array
			get_current_slides: function() {

				var first_visible_slide = this.current_slide * this.offset,
						last_visible_slide = first_visible_slide + this.visible_slides,
						i;

				for (i = first_visible_slide; i <= last_visible_slide; i++) {
					this.slide_ids.push(i);
				}

			},
			// end get the currently visible slides

			// get the next slides
			get_next_slides: function() {

				var current_last_slide = (this.current_slide * this.offset) + this.visible_slides,
						future_last_slide = current_last_slide + this.offset,
						i;

				// if this is the last slide
				if (this.current_slide === this.last_slide) {

					// add the first slide
					this.slide_ids.push(0);

				} else {

					for (i = future_last_slide; i > current_last_slide; i--) {
						this.slide_ids.push(i);
					}

				}

			},
			// end get the next slides

			// get the prev slides
			get_prev_slides: function() {

				var adjusted_last_slide,
						future_last_slide,
						current_first_slide,
						future_first_slide,
						i;

				// if this is the first slide
				if (this.current_slide === 0) {

					// calculate the last slides (or last slide if not a carousel)
					adjusted_last_slide = (this.last_slide * this.offset) + this.visible_slides;
					future_last_slide = adjusted_last_slide + this.offset;

					// add the last slides
					for (i = adjusted_last_slide; i < future_last_slide; i++) {
						this.slide_ids.push(i);
					}

				// if this is any slide except the first slide
				} else {

					current_first_slide = this.current_slide * this.offset;
					future_first_slide = current_first_slide - this.offset;

					for (i = future_first_slide; i < current_first_slide; i++) {
						this.slide_ids.push(i);
					}

				}

			},
			// end get the prev slides

			// END GET THE IDS OF SLIDES TO LOAD

			// NO PICTUREFILL LOAD SLIDES
			load_slides: function(_slides_ids) {

				var _this = this;

				$(_slides_ids).each(function(index) {

					var slide_id = _slides_ids[index],
							current_src,
							current_data_original,
							$slide = $(_this.$slides[slide_id]);

					current_src = $slide.find('img').attr('src');
					current_data_original = $slide.find('img').attr('data-original');

					// if there is a data-original attribute and it has not already been loaded into src
					if ( current_data_original !== 'undefined' && current_src !== current_data_original ) {

						// update the current slide source
						$slide.find('img').attr('src', current_data_original);

					}

				});

			},
			// END NO PICTUREFILL LOAD SLIDES

			// NO PICTUREFILL LOAD CLONED SLIDES
			load_cloned_slides: function() {

					if ( $(this.flexslider).find('.clone').length > 0 ) {

					// get the cloned slides
						$(this.flexslider).find('.clone').each(function() {

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

			},
			// END NO PICTUREFILL LOAD CLONED SLIDES

			// PICTUREFILL LOAD SLIDES
			load_picturefill_slides: function(_slides) {

				var _this = this;

				$(_slides).each(function(_slide) {

					var slide_id = _slides[_slide],
							picturefill_container,
							current_data_src,
							current_data_original,
							$spans;

					// get the jquery object for this slide and find an element with attribute data-picture
					picturefill_container = $(_this.$slides[slide_id]).find('[data-picture]');

					// get this slide's picturefill element and get the value of it's first span data-src
					current_data_src = $(picturefill_container).find('span').attr('data-src');

					current_data_original = $(picturefill_container).find('span').attr('data-original');

					// if there is a data-original attribute and it has not already been loaded into src
					if ( current_data_original !== 'undefined' && current_data_src !== current_data_original ) {

						// get all the children span elements of the picturefill container
						$spans = $(picturefill_container).find('span');

						// for each span in the picturefill container span
						$.each($spans, function(index) {

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

			},
			// END PICTUREFILL LOAD SLIDES

			// PICTUREFILL LOAD CLONED SLIDES
			load_picturefill_cloned_slides: function() {

				if ( $(this.flexslider).find('.clone').length > 0 ) {

					// get the cloned slides
					$(this.flexslider).find('.clone').each(function() {

						var $clone_slide = $(this),
						    picturefill_container,
						    current_data_src,
						    current_data_original,
						    $spans;

						// get the jquery object for this slide and find an element with attribute data-picture
						picturefill_container = $clone_slide.find('[data-picture]');

						// get this slide's picturefill element and get the value of it's first span data-src
						current_data_src = $(picturefill_container).find('span').attr('data-src');

						current_data_original = $(picturefill_container).find('span').attr('data-original');

						// if there is a data-original attribute and it has not already been loaded into src
						if ( current_data_original !== 'undefined' && current_data_src !== current_data_original ) {

							// get all the children span elements of the picturefill container
							$spans = $(picturefill_container).find('span');

							// for each span in the picturefill container span
							$.each($spans, function(index) {

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

			},
			// END PICTUREFILL LOAD CLONED SLIDES

			// LOAD SLIDES WITH BACKGROUND IMAGES
			load_background_image_slides: function(_slides_ids) {

				var _this = this;

				// for each slide id in the slide_ids array
				$(_slides_ids).each(function(index, _slide_id) {

					// get the slide and add load the image by adding the background image loaded class
					$(_this.$slides[_slide_id]).addClass(_this.options.class_name);

				});

			},
			// END LOAD SLIDES WITH BACKGROUND IMAGES

			// LOAD CLONE SLIDES WITH BACKGROUND IMAGES
			load_background_image_clone_slides: function() {

				var _this = this;

				// if the slider has cloned slides
				if ( $(_this.flexslider).find('.clone').length > 0 ) {

					// get the cloned slides
					$(_this.flexslider).find('.clone').each(function(index, slide) {

						// for each cloned slide add class to load the background image
						$(slide).addClass(_this.options.class_name);

					});

				}

			}
			// END LOAD CLONE SLIDES WITH BACKGROUND IMAGES

		};
		// end plugin prototype methods

		// wrapper to prevent multiple instances of flexloader
		if ( !$.data(flexslider, 'plugin_flexloader') ) {

			// add a data attribute
			$.data(flexslider, 'plugin_flexloader');

			// create an instance of flexloader
			return new Flexloader(flexslider, options);

		}
		// end wrapper to prevent multiple instances of flexloader

  };

}(jQuery));

