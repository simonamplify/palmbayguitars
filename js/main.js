(function($){
    // Nested mobile menu
    function setup_collapsible_submenus() {
        var $menu = $('.et_mobile_menu'),
            top_level_link = '.et_mobile_menu .menu-item-has-children > a';
        $menu.find('a').each(function() {
            $(this).off('click'); 
            if ( $(this).is(top_level_link) ) {
                $(this).attr('href', '#');
            }
            if ( ! $(this).siblings('.sub-menu').length ) {
                $(this).on('click', function(event) {
                    $(this).parents('.mobile_nav').trigger('click');
                });
            } else {
                $(this).on('click', function(event) {
                    event.preventDefault();
                    $(this).parent().toggleClass('visible');
                });
            }
        });
    }
    $(window).load(function() {
        setTimeout(function() {
            setup_collapsible_submenus();
        }, 700);
    });
	$(document).ready( function(){
		// Menu Search
        function searchBar() {
            event.preventDefault();
            $('.menuSearch').toggleClass('focus');
            const srchInpt = document.querySelector('.menuSearch.focus .dgwt-wcas-search-input');
            if ($('.menuSearch').hasClass("focus")) {
                srchInpt.focus({preventScroll: true});
            }
            //document.querySelector('.menuSearch.focus .dgwt-wcas-search-input').focus({preventScroll: true});
            var ms = document.querySelectorAll('.menuSearchBtn .material-icons');
            for(var i = 0; i < ms.length; i++) {
                if (ms[i].innerHTML == "search") {
                    ms[i].innerHTML = "search_off";
                } else {
                    ms[i].innerHTML = "search";
                }
            }
        }
        function closeSearchBar() {
            event.preventDefault();
            $('.menuSearch').removeClass('focus');
            document.querySelector('.menuSearch.focus .dgwt-wcas-search-input').blur();
            var ms = document.querySelectorAll('.menuSearchBtn .material-icons');
            for(var i = 0; i < ms.length; i++) {
                ms[i].innerHTML = "search";
            }
        }
        $('.menuSearchBtn').click(function(event) {
            searchBar();
        });
        $('.et_divi_100_custom_hamburger_menu__icon').click(function(event) {
            closeSearchBar();
        });
        
        /* Hover Cards */
        var hoverCard = null;
        var hoverCard = document.querySelector('.card');
        if(hoverCard !== null && hoverCard !== '') {
            console.log('card')
            hoverCard.classList.add('expanded');
            var hoverCards = document.querySelector('.cards');
            hoverCards.onmouseover=function(){
                hoverCard.classList.remove('expanded');
            };
        }

        // Card Scroller 
        var sCs = document.querySelectorAll('.scrollerContainer');
        if(sCs !== null && sCs !== '') {
            for(var i = 0; i < sCs.length; i++) {
                function scrolled(evt) {
                    const sC = evt.target.closest('.scrollerContainer');
                    const s = sC.querySelector('.scroller');
                    const c = s.querySelector('.scrollerItem');
                    const cW = c.offsetWidth;
                    const srBtn = sC.querySelector('.srBtn');
                    const slBtn = sC.querySelector('.slBtn');
                    
                    if(evt.target.className == 'srBtn') {
                        s.scrollLeft += cW;
                        slBtn.setAttribute('aria-disabled', false);
                        s.onscroll = () => {
                            if (s.scrollLeft + s.offsetWidth>= s.scrollWidth ) {
                                evt.target.setAttribute('aria-disabled', true);
                            } else {
                                evt.target.setAttribute('aria-disabled', false);
                            }
                        };
                    }
                    if(evt.target.className == 'slBtn') {
                        s.scrollLeft -= cW;
                        srBtn.setAttribute('aria-disabled', false);
                        s.onscroll = () => {
                            if (s.scrollLeft == 0 ) {
                                evt.target.setAttribute('aria-disabled', true);
                            } else {
                                evt.target.setAttribute('aria-disabled', false);
                            }
                        };
                    }
                    s.onscroll = () => {
                        slBtn.setAttribute('aria-disabled', false);
                        slBtn.blur();
                        srBtn.setAttribute('aria-disabled', false);
                        srBtn.blur();
                        if (s.scrollLeft + s.offsetWidth>= s.scrollWidth ) {
                            srBtn.setAttribute('aria-disabled', true);
                        } else if (s.scrollLeft == 0 ) {
                            slBtn.setAttribute('aria-disabled', true);
                        }
                    };
                }
                const scroller = sCs[i].querySelector('.scroller');
                let isDown = false;
                let startX;
                let scrollLeft;
                scroller.addEventListener('scroll', () => {
                    scroller.classList.add('active');
                });
                scroller.addEventListener('mousedown', (e) => {
                    isDown = true;
                    startX = e.pageX - scroller.offsetLeft;
                    scrollLeft = scroller.scrollLeft;
                    // scroller.onscroll = () => {
                    //     scroller.classList.add('active');
                    // }
                });
                scroller.addEventListener('mouseleave', () => {
                    isDown = false;
                    scroller.classList.remove('active');
                });
                scroller.addEventListener('mouseup', () => {
                    isDown = false;
                    scroller.classList.remove('active');
                });
                scroller.addEventListener('mousemove', (e) => {
                    if(!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - scroller.offsetLeft;
                    const walk = (x - startX) * 1; //scroll-fast
                    scroller.scrollLeft = scrollLeft - walk;
                });
                sCs[i].addEventListener('click', scrolled);
                sCs[i].addEventListener('touchmove', scrolled);
            }
        }

        // Change add to cart button text after click
        $('.et_pb_shop .ajax_add_to_cart, #related .products .ajax_add_to_cart, .single-product .single_add_to_cart_button').on('click', function(event) {
			$(this).text('Added to Cart');
            var addToCart = $(this);
            window.setTimeout(function () {
                $(addToCart).text('Add to Cart');
            }, 5000);
		});
		$('#related .products .outofstock .button, .et_pb_shop .products .outofstock .button').text('Out of stock');

        // Dropdown Menu
        let ddMenu = null;
        ddMenu = document.querySelectorAll('.dropDownMenu > a:first-of-type');
        if(ddMenu !== null && ddMenu !== '') {
            for(var i = 0; i < ddMenu.length; i++) { 
                ddMenu[i].onclick = function () {
                    event.preventDefault();
                    $(this).toggleClass('open');
                };
            }
        }

	});
})(jQuery)