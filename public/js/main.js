var topLimit = $('.order-summary').offset().top;
$(window).scroll(function() {
  //console.log(topLimit <= $(window).scrollTop())
  if (topLimit <= $(window).scrollTop()) {
    $('.order-summary').addClass('sticky-top')
  } else {
    $('.order-summary').removeClass('sticky-top')
  }
})
