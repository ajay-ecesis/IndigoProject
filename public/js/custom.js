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

/* $('.brand-logo').slick({
  slidesToShow: 6,
   slidesToScroll: 1,
  accessibility: false,
   autoplay: true,
   autoplaySpeed: 0,
   cssEase: 'linear',
   speed:2500,
   infinite: true,
   dots: false,
   arrows: false,

responsive: [
     {
       breakpoint: 1440,
       settings: {
         slidesToShow: 5,
         slidesToScroll: 1
       }
     },
	     {
       breakpoint: 767,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 1
       }
     }
   ]
   
 });
 */


 $(".humburger-menu img").click(function(){
  $(".Navbar").toggleClass("active");
});

$(".humburger-menu img").click(function(){
  $(".banner_min_height").toggleClass("show");
});

$(".humburger-menu img").click(function(){
  $(".user-info").toggleClass("active");
});

$(".humburger-menu img").click(function(){
  $(".logo_text-span").toggleClass("active");
});



$("#productBtn").click(function(){
  $(this).toggleClass("active");
});

$('#search_btn').click(function(){
  event.preventDefault();
  $('.search_input_wrapper').addClass('active');
    $('#search_btn').hide();


});
$('.search_input_wrapper i').click(function(){
  $('.search_input_wrapper').removeClass('active');
  $('#search_btn').show();
});




var toggle_img = $('.humburger-menu img').attr('src');

$('.humburger-menu').click(function(){
  
  var current_icon = $('.humburger-menu img').attr("src");

  if (toggle_img == current_icon){
  $('.humburger-menu img').attr("src", "images/nav_close.svg");
  }
  else{
    $('.humburger-menu img').attr("src", "images/nav_open.svg");
  }
});

