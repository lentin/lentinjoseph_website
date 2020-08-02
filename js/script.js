(function($) {
	
	"use strict";
	

	// Mobile Nav Toggler
	function mobileNavToggler () {
		if ($('.mainmenu-holder').length) {
			$('.mainmenu-holder .nav-header .navigation li > a').on('click', function(e) {
				$('.mainmenu-holder .nav-header').addClass('closed-header');
			});
			$('.mainmenu-holder .nav-footer .menu-expander').on('click', function(e) {
				$('.mainmenu-holder .nav-header').removeClass('closed-header');
			});
			$('.mainmenu-holder .nav-footer .menu-expander').on('click', function () {
				$('.mainmenu-holder .nav-header').toggleClass('closed opened');
				return false;
			});
			$('.mainmenu-holder .nav-header .navigation li > a').on('click', function(e) {
				$('.mainmenu-holder .nav-header').removeClass('closed opened');
			});

		}
	}
	
	
	
	// Add OnepageNav / Sidebar
	function sideNav() {
		if($('.menu-box .sticky-menu').length){
			$('.menu-box .sticky-menu ul').onePageNav();
		}
	}


	// Sortable Masonary with Filters
	function enableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : 2 
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.bind('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
		
		
	}
	enableMasonry();
	
	// Prealoder
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	// Scroll to top
	function scrollToTop() {
	    if ($('.scroll-top').length) {

	        //Check to see if the window is top if not then display button
	        $(window).on('scroll', function() {
	            if ($(this).scrollTop() > 200) {
	                $('.scroll-top').fadeIn();
	            } else {
	                $('.scroll-top').fadeOut();
	            }
	        });

	        //Click event to scroll to top
	        $('.scroll-top').on('click', function() {
	            $('html, body').animate({ scrollTop: 0 }, 1500);
	            return false;
	        });
	    }
	}


	
	// testimonial carousel
	if ($('.testimonials-slider').length) {
		$('.testimonials-slider').owlCarousel({
		    loop: true,
		    margin: 30,
		    nav: false,
			nav:true,
			autoplay:true,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
		    responsive: {
		        0:{
		            items:1,
		            loop:true,
					dots:false
		        },
		        480:{
					items:1,
					loop:true,
					dots:false
				},
		        768:{
		            items:2,
		            loop:true,
					dots:false
		        },
		        1000:{
		            items:2,
		            loop:true
		        }
		    }
		});
		
		
	}
	$('.knob').pieChart({
        barColor: '#48c7ec',
        trackColor: '#DCF5FC',
        lineCap: 'butt',
        lineWidth: 16,
        size: 190,
        rotate: 0,
        animate: {
          duration: 1000,
          enabled: true
        },
        onStep: function (from, to, percent) {
            $(this.element).find('.pie-value').text(Math.round(percent) + '%');
        }
    });
	
	//Contact Form Validation
	if($('#contact-form').length){
		$("#contact-form").validate({
		    submitHandler: function(form) {
		      var form_btn = $(form).find('button[type="submit"]');
		      var form_result_div = '#form-result';
		      $(form_result_div).remove();
		      form_btn.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
		      var form_btn_old_msg = form_btn.html();
		      form_btn.html(form_btn.prop('disabled', true).data("loading-text"));
		      $(form).ajaxSubmit({
		        dataType:  'json',
		        success: function(data) {
		          if( data.status == 'true' ) {
		            $(form).find('.form-control').val('');
		          }
		          form_btn.prop('disabled', false).html(form_btn_old_msg);
		          $(form_result_div).html(data.message).fadeIn('slow');
		          setTimeout(function(){ $(form_result_div).fadeOut('slow') }, 6000);
		        }
		      });
		    }
		});
	}

	//Add Scroll Bar To Sidebar
	if($('#sidebar .menu-box').length){
		$("#sidebar .menu-box").mCustomScrollbar({
			axis:"y",
			autoExpandScrollbar:false
		});
	}
	
	//animate to top on Page Refresh
    $('html, body').animate({
	   scrollTop: $('html, body').offset().top
	}, 10);

	//Mixitup Gallery
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	    //LightBox / Fancybox
    if($('.lightbox-image').length) {
        $('.lightbox-image').fancybox({
            openEffect  : 'elastic',
            closeEffect : 'elastic',
            helpers : {
                media : {}
            }
        });
    }
    	




	
/* ==========================================================================
   When document is ready, do
   ========================================================================== */
   
	$(document).on('ready', function() {
		mobileNavToggler();
		sideNav();
		scrollToTop();
	});
	
	$(window).on('load', function() {
		enableMasonry();
		handlePreloader();
	});



})(window.jQuery);











