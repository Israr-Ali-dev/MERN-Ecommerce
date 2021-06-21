$(document).ready(function () {
  // Grid & list..
  $('#viewlist').click(function () {
    $('#viewlist').toggleClass('usf-active');
    $('#viewgrid').removeClass('usf-active');
    $('.list-view-items').toggle();
    $('.grid-view-items').toggle();
  });

  $('#viewgrid').click(function () {
    $('#viewlist').toggleClass('usf-active');
    $('#viewgrid').toggleClass('usf-active');
    $('.grid-view-items').toggle();
    $('.list-view-items').toggle();
  });

  // Show Mobile Filter
  $('.m-show-filter').click(function () {
    $('.mobile-filters').addClass('mobile-filters-show');
  });

  // Close Moile Filter
  $('#close-m-filter').click(function () {
    $('.mobile-filters').removeClass('mobile-filters-show');
  });

  // Sub Mobile Filters
  $('#m-collection').click(function () {
    $('.m-collection-list').css('display', 'block');
    $('.main-list').css('display', 'none');
  });

  $('#m-cases').click(function () {
    $('.m-cases-list').css('display', 'block');
    $('.main-list').css('display', 'none');
  });

  $('#m-models').click(function () {
    $('.m-models-list').css('display', 'block');
    $('.main-list').css('display', 'none');
  });

  $('#m-personlised').click(function () {
    $('.m-personlised-list').css('display', 'block');
    $('.main-list').css('display', 'none');
  });

  $('.m-back').click(function () {
    $('.main-list').css('display', 'block');
    $('.m-collection-list').css('display', 'none');
    $('.m-models-list').css('display', 'none');
    $('.m-cases-list').css('display', 'none');
    $('.m-personlised-list').css('display', 'none');
  });

  // Select Tick
  $('.m-final-select').click(function () {
    $(this).toggleClass('m-final-selected');

    $('.m-show-filter').addClass('m-filter-tick');

    $('.m-all').text('Clear All');
    $('.m-all').addClass('clear-all-m');
  });

  $('.m-all').click(function () {
    var a = $(this).text();
    if (a == 'Clear All');
    {
      $(this).text('All');
      $('.m-final-select').removeClass('m-final-selected');

      $('.m-show-filter').removeClass('m-filter-tick');
    }
  });

  // Single Page
  $('#collape-trigger').click(function () {
    $('#collape-trigger-data').toggleClass('expand-data');
  });

  $('#ig-collape-trigger').click(function () {
    $('#ig-gallery-data').toggleClass('display-flex');
  });
  // Write review
  $('#write-review').click(function () {
    $('#write-review-data').toggleClass('display-block');
  });

  // Currency Selector
  $('#curreny-list-expand').click(function () {
    $('#CurrencyList').toggleClass('disclosure-list--visible');

    var el = $('disclosure-list__item');
    for (var i = 0; i < el.length; i++) {
      $(el[i]).click(function (e) {
        $('.disclosure-list__item--current').css('display', 'block');
        //$(this).addClass('disclosure-list__item--current');
      });
    }
  });

  // Live ajax search
  $('#search-ajax').keyup(function () {
    $('#search-pop').css('display', 'block');
    var textLength = $(this).val();

    if (textLength.length == 0) {
      $('#search-pop').css('display', 'none');
    }
  });

  // Live ajax search
  $('#search-ajax').blur(function () {
    $('#search-pop').css('display', 'none');
  });
  $('.site-header__search-btn').click(function () {
    $('#search-pop').css('display', 'none');
  });

  // $(document).click(function (e) {
  //   if ($('#search-pop').css('display') === 'block') {
  //     $('#search-pop').css('display', 'none');
  //   }
  // });

  // Drop Down with Image
  var langArray = [];
  $('.casespicker option').each(function () {
    var img = $(this).attr('data-thumbnail');
    var text = this.innerText;
    var value = $(this).val();
    var item =
      '<li><img src="' +
      img +
      '" alt="" value="' +
      value +
      '"/><span>' +
      text +
      '</span></li>';
    langArray.push(item);
  });

  $('#a').html(langArray);

  //Set the button value to the first el of the array
  $('.btn-select').html(langArray[0]);
  $('.btn-select').attr('value', 'en');

  //change button stuff on click
  $('#a li').click(function () {
    var img = $(this).find('img').attr('src');
    var value = $(this).find('img').attr('value');
    var text = this.innerText;
    var item =
      '<li><img src="' + img + '" alt="" /><span>' + text + '</span></li>';
    $('.btn-select').html(item);
    $('.btn-select').attr('value', value);
    $('.b').toggle();
  });

  $('.btn-select').click(function () {
    $('.b').toggle();
  });

  // Star Rating
  var set;

  // $('.star-border').hover(
  //   function () {
  //     $(this).find('.star').css('background', 'gold');
  //     $(this).prevAll().find('.star').css('background', 'gold');
  //   },
  //   function () {
  //     $(this).find('.star').css('background', 'white');
  //     $(this).prevAll().find('.star').css('background', 'white');
  //   }
  // );

  $('.star-border').click(function () {
    $(this).find('.star').css('background', 'gold');
    $(this).prevAll().find('.star').css('background', 'gold');
    $(this).nextAll().find('.star').css('background', 'rgb(209, 208, 208)');
    set = $(this).prevAll().length + 1;
  });

  setInterval(function () {
    $('.ratingNum').text(set);
  }, 50);

  // Insta Slider
  // $('.responsive-ig-slider').slick({
  //   // dots: true,
  //   infinite: false,
  //   speed: 300,
  //   slidesToShow: 6,
  //   slidesToScroll: 6,
  //   arrows: true,
  //   // mobileFirst: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 4,
  //         infinite: true,

  //         // dots: true
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         mobileFirst: true,
  //       },
  //     },
  //   ],
  // });

  //  Tiktok Design Begins

  // $('.slick', '.vertical-slider').slick({
  //   vertical: true,
  //   verticalSwiping: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  // });

  $(function () {
    $('.horizontal-slider').slick({
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      // autoplaySpeed: 10000,
      // fade: true
    });

    $('.vertical-slider').slick({
      arrows: false,
      dots: false,
      edgeFriction: 0.5,
      infinite: false,
      vertical: true,
      verticalSwiping: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });

    // $('.vertical-slider').mousewheel(function (e) {
    //     if (e.deltaY < 0) {
    //         if ($(this).slick('slickCurrentSlide') == $(this).find('.slide')
    //             .length - 1) {
    //             return
    //         }

    //         e.preventDefault()
    //         $(this).slick('slickNext')
    //     } else {
    //         if ($(this).slick('slickCurrentSlide') == 0) {
    //             return
    //         }

    //         e.preventDefault()
    //         $(this).slick('slickPrev')
    //     }
    // });
  });

  // Cart icon display
  // Show Mobile Detail
  $('.m-show-detail').click(function () {
    $('.mobile-side-detail').addClass('mobile-side-detail-show');
  });

  // Close Moile detail
  $('#close-m-detail').click(function () {
    $('.mobile-side-detail').removeClass('mobile-side-detail-show');
  });

  // Grid & Tiktok View
  $('.mgrid-view').click(function () {
    $('.mtiktok-view').toggle();
    $('.mgrid-view').toggle();
    $('.grid-view-items').toggle();
    $('.tiktok-view-items').toggle();
  });

  $('.mtiktok-view').click(function () {
    $('.mgrid-view').toggle();
    $('.mtiktok-view').toggle();
    $('.grid-view-items').toggle();
    $('.tiktok-view-items').toggle();
  });

  //  Tiktok Design End

  // Popup Order Detail
  $('.order-detail').click(function (e) {
    setTimeout(function () {
      $('.popup').removeClass('animationClose').addClass('animationOpen');
    }, 100);
    $('.obscure').fadeIn(50);
    e.preventDefault();
  });

  $('.closeOrderDetail').click(function (e) {
    e.preventDefault();
    setTimeout(function () {
      $('.obscure').fadeOut(350);
    }, 50);
    $('.popup').removeClass('animationOpen').addClass('animationClose');
  });

  // Profile edit
  $('.js-edit, .js-save').on('click', function () {
    var $form = $(this).closest('form');
    $form.toggleClass('is-readonly is-editing');
    var isReadonly = $form.hasClass('is-readonly');
    $form.find('input,textarea').prop('disabled', isReadonly);
  });

  // Desktop Filters
  // $('.d-fliter-clear--all').on('click', function () {
  //   $('.usf-refineby').hide();
  // });

  // // Collection filter
  // $('.collection-container .usf-label').on('click', function () {
  //   $('.usf-refineby').show();
  //   var filter_list =
  //     '<div class="usf-refineby__item usf-pointer usf-clear"><span>Collection:' +
  //     '</span><b>' +
  //     $(this).text() +
  //     '</b><span class="usf-remove"></span></div>';
  //   $('.usf-refineby__body').append(filter_list);
  // });

  // // Model filter
  // $('.model-container .usf-label').on('click', function () {
  //   $('.usf-refineby').show();
  //   var filter_list =
  //     '<div class="usf-refineby__item usf-pointer usf-clear"><span>Phone Model:' +
  //     '</span><b>' +
  //     $(this).text() +
  //     '</b><span class="usf-remove"></span></div>';
  //   $('.usf-refineby__body').append(filter_list);
  // });

  // // Case filter
  // $('.case-container .usf-facet-value--with-background').on(
  //   'click',
  //   function () {
  //     $('.usf-refineby').show();
  //     var filter_list =
  //       '<div class="usf-refineby__item usf-pointer usf-clear"><span>Case Type:' +
  //       '</span><b>' +
  //       $(this).text() +
  //       '</b><span class="usf-remove"></span></div>';
  //     $('.usf-refineby__body').append(filter_list);
  //   }
  // );

  // // Customize filter
  // $('.customize-container .usf-label').on('click', function () {
  //   $('.usf-refineby').show();
  //   var filter_list =
  //     '<div class="usf-refineby__item usf-pointer usf-clear"><span>Customizable?:' +
  //     '</span><b>' +
  //     $(this).text() +
  //     '</b><span class="usf-remove"></span></div>';
  //   $('.usf-refineby__body').append(filter_list);
  // });

  // Remove Filters
  // $(document).on('click', '.usf-refineby__item .usf-remove', function () {
  //   $(this).parent().remove();
  // });

  // Search popup
  $('.site-nav').on('click', function () {
    $('.site-header__search-container').toggleClass('is-active');
  });

  $('.js-search-header-close').on('click', function () {
    $('.site-header__search-container').toggleClass('is-active');
  });
  // Plus, Minus Counter
  // var cartButtons = $('.cart-plus-minus').find('button');
  // $(cartButtons).on('click', function (e) {
  //   var $this = $(this);
  //   var target = $this.parent().data('target');
  //   var target = $('#' + target);
  //   var current = parseFloat($(target).val());
  //   if ($this.hasClass('cart-plus-1')) target.val(current + 1);
  //   else {
  //     current < 2 ? null : target.val(current - 1);
  //   }
  //   getTotal();
  // });

  // function getTotal() {
  //   tPrice = document.getElementById('totalPrice');
  //   Price = document.getElementById('price');

  //   var tQty =
  //     parseInt(document.getElementById('amount-1').value) +
  //     parseInt(document.getElementById('amount-2').value) +
  //     parseInt(document.getElementById('amount-3').value) +
  //     parseInt(document.getElementById('amount-4').value) +
  //     parseInt(document.getElementById('amount-5').value);

  //   document.getElementById('qty').value = tQty;

  //   if (tQty <= 3) {
  //     tPrice.value = (tQty * 1.24).toFixed(2);
  //     Price.value = 1.24;
  //   }

  //   if (tQty > 3 && tQty <= 5) {
  //     tPrice.value = (tQty * 1.16).toFixed(2);
  //     Price.value = 1.16;
  //   }

  //   if (tQty > 5 && tQty <= 10) {
  //     tPrice.value = (tQty * 1.1).toFixed(2);
  //     Price.value = 1.1;
  //   }

  //   if (tQty > 10 && tQty <= 20) {
  //     tPrice.value = (tQty * 1.04).toFixed(2);
  //     Price.value = 1.04;
  //   }

  //   if (tQty > 20) {
  //     tPrice.value = (tQty * 0.97).toFixed(2);
  //     Price.value = 0.97;
  //   }
  // }

  // getTotal();
});
