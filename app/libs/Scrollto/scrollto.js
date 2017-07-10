"use strict";

(function ($) {

$.fn.scrolltoSetup = function (settings) {
  settings = jQuery.extend({
      animationSpeed: 1000,
      additionalHeight: 0
  }, settings);

  return this.each(function () {

    var $scrollButton = $(this),
        scrollDestination = $scrollButton.attr('href');

    $scrollButton.on('click.scrollto', function (e) {
      e.preventDefault();

      $('html, body').animate({
          scrollTop: $(scrollDestination).offset().top - settings.additionalHeight
      }, settings.animationSpeed);
    });
  });
}

}(jQuery));
