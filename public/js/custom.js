// prelaoder
$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').fadeOut(); // will first fade out the loading animation 
  $('.preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(350).css({'overflow':'visible'});
})


// header

$(function() {
  $(window).on("scroll", function() {
      if($(window).scrollTop() > 50) {
          $(".header").addClass("active");
      } else {
         $(".header").removeClass("active");
      }
  });
});

// banner slider

// $('.banner-slider').slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
// accessibility: false,
//   infinite: true,
//   prevArrow: '<span class="prev"><i class="fal fa-long-arrow-alt-left"></i></span>',
//         nextArrow: '<span class="next"><i class="fal fa-long-arrow-alt-right"></i></span>',
//   dots: true,
//   arrows: false
// });



// //   slider 2

// $('.feature-slider').slick({
//   slidesToShow: 3,
//    slidesToScroll: 1,
//    autoplay: true,
//    autoplaySpeed: 2000,
//    infinite: true,
// 	accessibility: false,
//    dots: true,
//    arrows: false,
//    responsive: [
//      {
//        breakpoint: 1199,
//        settings: {
//          slidesToShow: 2,
//          slidesToScroll: 2,
//          infinite: true,
//          dots: true
//        }
//      },
//      {
//        breakpoint: 767,
//        settings: {
//          slidesToShow: 1,
//          slidesToScroll: 1
//        }
//      },
//      {
//        breakpoint: 480,
//        settings: {
//          slidesToShow: 1,
//          slidesToScroll: 1
//        }
//      }
//    ]
//  });



//  // slider 3

// $('.products-slider').slick({
//   autoplaySpeed: 2000,
//   centerMode: false,
//   centerPadding: '60px',
//   accessibility: false,
//   slidesToShow: 4,
//   responsive: [
//     {
//       breakpoint: 1440,
//       settings: {
//         arrows: true,
//         centerMode: false,
//         centerPadding: '30px',
//         slidesToShow: 3
//       }
//     },
//     {
//       breakpoint: 1024,
//       settings: {
//         arrows: true,
//         centerMode: false,
//         centerPadding: '30px',
//         slidesToShow: 2
//       }
//     },
//     {
//       breakpoint: 767,
//       settings: {
//         arrows: false,
//         centerMode: true,
//         centerPadding: '30px',
//         slidesToShow: 1
//       }
//     }
//   ]
// });



// // brand
// $('.trustBrand-slider').slick({
//   slidesToShow: 3,
//   slidesToScroll: 1,
// 	accessibility: false,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   infinite: true,
//   prevArrow: '<span class="prev"><i class="fal fa-long-arrow-alt-left"></i></span>',
//         nextArrow: '<span class="next"><i class="fal fa-long-arrow-alt-right"></i></span>',
//   dots: true,
//   arrows: false,

//   responsive: [
//       {
//         breakpoint: 1440,
//         settings: {
//           arrows: false,
//           centerMode: false,
//           centerPadding: '0',
//           slidesToShow: 2
//         }
//       },
//       {
//         breakpoint: 767,
//         settings: {
//           arrows: false,
//           centerMode: true,
//           centerPadding: '0',
//           slidesToShow: 1
//         }
//       }
//     ]
// });



// // gallery
// $('.gallery-slider').slick({
//   slidesToShow: 3,
//    slidesToScroll: 1,
// accessibility: false,
//    autoplay: true,
//    autoplaySpeed: 2000,
//    infinite: true,
//    dots: false,
//    arrows: false,
//    responsive: [
//      {
//        breakpoint: 1024,
//        settings: {
//          slidesToShow: 3,
//          slidesToScroll: 2,
//          infinite: true,
//          dots: false
//        }
//      }
 
//    ]
//  });



//  // gallery2
// $('.gallery-slider2').slick({
//   slidesToShow: 4,
//    slidesToScroll: 1,
// accessibility: false,
//    autoplay: true,
//    autoplaySpeed: 2000,
//    infinite: true,
//    dots: false,
//    arrows: false,
//    responsive: [
//      {
//        breakpoint: 1024,
//        settings: {
//          slidesToShow: 3,
//          slidesToScroll: 2,
//          infinite: true,
//          dots: false
//        }
//      }
 
//    ]
//  });




//  // artisnal-details_gallery_new_slider
//  $('.artisnal-details_gallery_new_slider').slick({
//   slidesToShow: 4,
//    slidesToScroll: 1,
//    autoplay: true,
//    autoplaySpeed: 500,
// accessibility: false,
//    infinite: true,
//    dots: false,
//    arrows: false,
//    responsive: [
//      {
//        breakpoint: 1500,
//        settings: {
//          slidesToShow: 3,
//          slidesToScroll: 2,
//          infinite: true,
//          dots: false
//        }
//      },
//      {
//        breakpoint: 1024,
//        settings: {
//          slidesToShow: 2,
//          slidesToScroll: 1,
//     centerPadding: '20px'
//        }
//      },
//      {
//        breakpoint: 767,
//        settings: {
//          slidesToShow: 2,
//          slidesToScroll: 1,
//        }
//      }
//    ]
//  });





//  // Artisanal-slider_second_view_all
// $('.Artisanal-slider_second_view_all').slick({
//   slidesToShow: 3,
//    slidesToScroll: 1,
//    autoplay: true,
//    autoplaySpeed: 500,
// accessibility: false,
//    infinite: true,
//    dots: false,
//    arrows: false,
//    responsive: [
//      {
//        breakpoint: 1024,
//        settings: {
//          slidesToShow: 2,
//          slidesToScroll: 1,
//     centerPadding: '20px'
//        }
//      },
//      {
//        breakpoint: 480,
//        settings: {
//          slidesToShow: 2,
//          slidesToScroll: 1,
//          centerPadding: '5px'
//        }
//      }
//    ]
//  });


//  // Artisanal-slider
// $('.Artisanal-slider').slick({
//   slidesToShow: 4,
//    slidesToScroll: 1,
//    autoplay: true,
//    autoplaySpeed: 500,
// accessibility: false,
//    infinite: true,
//    dots: false,
//    arrows: false,
//    responsive: [
//      {
//        breakpoint: 1500,
//        settings: {
//          slidesToShow: 3,
//          slidesToScroll: 2,
//          infinite: true,
//          dots: false
//        }
//      },
//      {
//        breakpoint: 1024,
//        settings: {
//          slidesToShow: 2,
//          slidesToScroll: 1,
//     centerPadding: '20px'
//        }
//      },
//      {
//        breakpoint: 767,
//        settings: {
//          slidesToShow: 1,
//          slidesToScroll: 1
//        }
//      }
//    ]
//  });


//  // Artisanal-slider_second
// $('.Artisanal-slider_second').slick({
//   slidesToShow: 3,
//    slidesToScroll: 1,
//    autoplay: true,
//    autoplaySpeed: 500,
// accessibility: false,
//    infinite: true,
//    dots: false,
//    arrows: false,
//    responsive: [
//      {
//        breakpoint: 1500,
//        settings: {
//          slidesToShow: 3,
//          slidesToScroll: 2,
//          infinite: true,
//          dots: false
//        }
//      },
//      {
//        breakpoint: 1024,
//        settings: {
//          slidesToShow: 2,
//          slidesToScroll: 1,
//     centerPadding: '20px'
//        }
//      },
//      {
//        breakpoint: 767,
//        settings: {
//          slidesToShow: 1,
//          slidesToScroll: 1
//        }
//      }
//    ]
//  });












//  // brand-logo
// $('.brand-logo').slick({
//   slidesToShow: 6,
//    slidesToScroll: 1,
// accessibility: false,
//    autoplay: true,
//    autoplaySpeed: 500,
//    infinite: true,
//    dots: false,
//    arrows: false,

// responsive: [
//      {
//        breakpoint: 1440,
//        settings: {
//          slidesToShow: 5,
//          slidesToScroll: 1
//        }
//      },
// 	     {
//        breakpoint: 767,
//        settings: {
//          slidesToShow: 3,
//          slidesToScroll: 1
//        }
//      }
//    ]
   
//  });





 



 

//   smoth dropdown

$(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    };
  } 

  var accordion = new Accordion($('#accordion'), false);
});


//   dropdown 2
$(function(){
  $('.js-dropdown-footer-menu').hide();
  $('.js-dropdown-footer').click(function(){
    $('i').removeClass('is-rotate');
    $('.js-dropdown-footer-menu').slideUp(200);
    if($('+.js-dropdown-footer-menu',this).css('display') == 'none'){
        $('i',this).addClass('is-rotate');
        $('+.js-dropdown-footer-menu',this).slideDown(200);
    }
  });
});
 
 


$(".humburger-span").click(function(){
  $(".Navbar").toggleClass("active");
});

$("#productBtn").click(function(){
  $(this).toggleClass("active");
});


//  sign in

$('#signIn').click(function(){
  event.preventDefault();
  $('.signin-popup-open').addClass('active');
  $(this).parents('.modal-bg').addClass('active');
});

$('.modal_close').click(function(){
  event.preventDefault();
  $(this).parents('.modal-bg').removeClass('active');		
    $(this).parents('.signin-popup').removeClass('active');
});


/* $('#forSignUp').click(function(){
  event.preventDefault();
  $('.signUp-popup-open').addClass('active');
  $('.modal-bg').addClass('active');
});

$('.brand_open').click(function(){
  event.preventDefault();
  $('.registar-popup_new').addClass('active');
  $('.modal-bg').addClass('active');
});
$('.manufactur_open').click(function(){
  event.preventDefault();
  $('.uploadFile').addClass('active');
  $('.modal-bg').addClass('active');
});
 */
