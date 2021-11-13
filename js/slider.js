window.addEventListener('DOMContentLoaded', function(e) {
    $('.carousel').slick({
      dots: true,
      autoplay: true,
      autoplaySpeed: 7000,
      prevArrow: '<button class="previous-button is-control">' +
                 '  <span class="fas fa-angle-left" aria-hidden="true"></span>' +
                 '  <span class="sr-only">Previous slide</span>' +
                 '</button>',
      nextArrow: '<button class="next-button is-control">' +
                 '  <span class="fas fa-angle-right" aria-hidden="true"></span>' +
                 '  <span class="sr-only">Next slide</span>' +
                 '</button>'
    });
  });