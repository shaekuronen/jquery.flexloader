### Flexloader: lazyload Flexslider images

Flexloader loads the current, next, and prev slide in a Flexslider slideshow.  In a Flexslider carousel, Flexloader loads the current, next, and prev slides.

See demos [http://shaekuronen.github.io/jquery.flexloader/](http://shaekuronen.github.io/jquery.flexloader/)

To configure, add $.flexloader to the start and after events in Flexslider init.
```javascript
$('.flexslider').flexslider({
  start: function(slider) {
    $.flexloader(slider);
  },
  after: function(slider) {
    $.flexloader(slider);
  }
});
```
Default: load HTML markup following the Flexslider convention of li > img
```html
<div class="flexslider">
  <ul class="slides">
    <li class="slide slide-16 clone">
      <img src="img/1x1.gif" data-original="img/slideshow/16.jpg">
    </li>
    <li class="slide slide-01">
      <img src="img/1x1.gif" data-original="img/slideshow/01.jpg">
    </li>
    <li class="slide slide-02">
      <img src="img/1x1.gif" data-original="img/slideshow/02.jpg">
    </li>
    <li class="slide slide-03">
      <img src="img/1x1.gif" data-original="img/slideshow/03.jpg">
    </li>
    <li class="slide slide-04">
      <img src="img/1x1.gif" data-original="img/slideshow/04.jpg">
    </li>
    ...
    <li>
      <img src="img/1x1.gif" data-original="img/slideshow/16.jpg">
    </li>
    <li class="slide slide-01 clone">
      <img src="img/1x1.gif" data-original="img/slideshow/01.jpg">
    </li>
  </ul>
</div>
```
On Flexslider start, Flexloader will update the img src of Slides 1, c1, 2, 16, & c16 ("c" prefix indicates cloned slide).
When the next slide is animated to, Flexloader will update the img src of Slide 3.  Slides 1, c1, & 2 are already loaded and will not updated.
##### Two options: Picturefill and Background-Images

Picturefill JS
```javascript
$('.flexslider').flexslider({
  start: function(slider) {
    $.flexloader(slider, { 'picturefill': true });
  },
  after: function(slider) {
    $.flexloader(slider, { 'picturefill': true });
  }
});
```
Picturefill HTML
```html
<div class="flexslider">
  <ul class="slides">
    <li>
      <span data-picture data-alt="Description here...">
        <span
          data-src="img/1x1.gif"
          data-original="img/slideshow_flexloader_picturefill/540/grey01.jpg">
        </span>
        <span
          data-src="img/1x1.gif"
          data-original="img/slideshow_flexloader_picturefill/540/grey01.jpg"
          data-media="(max-width: 540px)">
        </span>
        <span
          data-src="img/1x1.gif"
          data-original="img/slideshow_flexloader_picturefill/720/grey01.jpg"
          data-media="(min-width: 541px) and (max-width: 720px)">
        </span>
        <span
          data-src="img/1x1.gif"
          data-original="img/slideshow_flexloader_picturefill/900/grey01.jpg"
          data-media="(min-width: 721px) and (max-width: 900px)">
        <span
          data-src="img/1x1.gif"
          data-original="img/slideshow_flexloader_picturefill/1080/grey01.jpg"
          data-media="(min-width: 901px)">
        </span>
        <!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
        <noscript>
          <img
            src="img/slideshow_flexloader_picturefill/540/grey01.jpg"
            alt="Description here...">
        </noscript>
      </span>
    </li>
    ...
  </ul>
</div>
```
Background-Images JS
```javascript
$('.flexslider').flexslider({
  start: function(slider) {
    $.flexloader(slider, { 'background_images': true });
  },
  after: function(slider) {
    $.flexloader(slider, { 'background_images': true });
  }
});
```
Background-Images HTML
```html
<div class="flexslider">
  <ul class="slides">
    <li class="slide slide-01"></li>
    ...
    <li class="slide slide-16"></li>
  </ul>
</div>
```
Background-Images CSS
```css
.slide {
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
}
@media (max-width: 540px) {
  .slide-01.flexloader-background-image-loaded {
    background-image: url('../img/slideshow_background_images/540/grey01.jpg');
  }
}
@media (min-width: 541px) and (max-width: 720px) {
  .slide-01.flexloader-background-image-loaded {
    background-image: url('../img/slideshow_background_images/720/grey01.jpg');
  }
}
@media (min-width: 721px) and (max-width: 900px) {
  .slide-01.flexloader-background-image-loaded {
    background-image: url('../img/slideshow_background_images/900/grey01.jpg');
  }
}
@media (min-width: 901px) {
  .slide-01.flexloader-background-image-loaded {
    background-image: url('../img/slideshow_background_images/1080/grey01.jpg');
  }
}
```
Flexloader defaults to adding the .flexloader-background-image-loaded class to slides that have been loaded.  If you want to change the default, it's possible to configure.
```javascript
$('.flexslider').flexslider({
  start: function(slider) {
    $.flexloader(slider, { 'background_images': true, 'class_name': 'your-class-name' });
  },
  after: function(slider) {
    $.flexloader(slider, { 'background_images': true, 'class_name': 'your-class-name' });
  }
});
```
Background-Images - Default Class: 'flexloader-background-image-loaded'
In CSS below, class name has be changed to 'your-class-name'
```css
.slide {
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
}
@media (max-width: 540px) {
  .slide-01.your-class-name {
    background-image: url('../img/slideshow_background_images/540/grey01.jpg');
  }
}
@media (min-width: 541px) and (max-width: 720px) {
  .slide-01.your-class-name {
    background-image: url('../img/slideshow_background_images/720/grey01.jpg');
  }
}
@media (min-width: 721px) and (max-width: 900px) {
  .slide-01.your-class-name {
    background-image: url('../img/slideshow_background_images/900/grey01.jpg');
  }
}
@media (min-width: 901px) {
  .slide-01.your-class-name {
    background-image: url('../img/slideshow_background_images/1080/grey01.jpg');
  }
}
```
Background Images - Preload Slide 1
Preloading the first slide improves performance by starting the image download earlier
```html
<div class="flexslider">
  <ul class="slides">
    <li class="slide slide-01 flexloader-background-image-loaded"></li>
    <li class="slide slide-02"></li>
    <li class="slide slide-03"></li>
    ...
    <li class="slide slide-16"></li>
  </ul>
</div>
```