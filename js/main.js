// ---------- HAMBURGER MENU ----------

let isX = false;

// Nudge the stents independently, on hover
function nudgeStents(stent, wait) {
    $(stent)
    .stop(true)
    .delay(wait)
    .animate({left: '10px'}, 400)
    .queue(function() {
        $(stent).animate({left: '-15px'}, 400).dequeue()
    })
    .queue(function() {
        $(stent).animate({left: ''}, 400).dequeue()
    })
    .removeAttr('style');
};

function scissorX() {
    // Rotate the top and bottom stents a bit more
    $('#top-stent').css('transform', 'rotate(312deg)');
    $('#bottom-stent').css('transform', 'rotate(48deg)');
    // $('#top-stent').css('transform', 'rotate(320deg)');
    // $('#bottom-stent').css('transform', 'rotate(35deg)');
    
    setTimeout(function() {
      // Quickly return them to their previous positions
      $('#top-stent').removeAttr('style');
      $('#bottom-stent').removeAttr('style');
    }, 400);
}

$('#hamburger').on('mouseenter', function() {
    if (isX === true) {
        scissorX();
    } else if (isX === false) {
        nudgeStents('#top-stent', 300);
        nudgeStents('#middle-stent', 0);
        nudgeStents('#bottom-stent', 600);
    }
});

$('#hamburger').on('click', function() {
    if (isX === true) {
        // Hide the nav
        $('nav').animate({left: '100%'}, 750);

        // Remove the stent transformations
        $('#top-stent').removeClass('rotate-top-stent');
        $('#middle-stent').removeClass('hide-middle-stent');
        $('#bottom-stent').removeClass('rotate-bottom-stent');
        
        // So the x is a hamburger again
        isX = false;
    } else if (isX === false) {
        // display the hidden nav
        $('nav').animate({left: 0}, 750);

        // Add the stent transformations
        $('#top-stent').addClass('rotate-top-stent');
        $('#middle-stent').addClass('hide-middle-stent');
        $('#bottom-stent').addClass('rotate-bottom-stent');
        
        // So the hamburger is now an x
        isX = true;
    } 
});

// Close the mobile nav, to view the Quality section
$('#see-quality').on('click', function() {
    $('nav').removeAttr('style');
});

// ---------- SERVICES ---------

function setFlagHeight() {
    let serviceLink = $('.flagged-links');
    let serviceLinkHeight = serviceLink.outerHeight();
    let flagHeight = serviceLinkHeight + 0.5;

    // Set the orange and blue flag heights
    $('.blurb-title img').css('height', `${flagHeight}` + 'px');
};

setFlagHeight();

$('.orange-flag').hover(
    function() {
        // Darken the link's background
        $(this).find('a').css('backgroundColor', '#ff7b00');
        // Darken the flag
        $(this).find('img').attr('src', './images/hover-flag.svg');
    }, function() {
        // Revert back to lighter background
        $(this).find('a').css('backgroundColor', '#ff8b00');
        // Revert back to the lighter flag
        $(this).find('img').attr('src', './images/orange-flag.svg');
    }
);

(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * author: Sam Sehnert
     * desc: A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */
  
    $.fn.visible = function(partial) {
      
        var $t            = $(this),
            $w            = $(window),
            viewTop       = $w.scrollTop(),
            viewBottom    = viewTop + $w.height(),
            _top          = $t.offset().top,
            _bottom       = _top + $t.height(),
            compareTop    = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
      
      return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  
    };
      
})(jQuery);

$(window).scroll(function(event) {
    // On scroll, slide divs up
    $('.blurb-wrapper').each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass('come-in'); 
      } 
    });
});

var win = $(window);
var allMods = $('.blurb-wrapper');

// Already visible modules
allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass('already-visible'); 
  } 
});

win.scroll(function(event) {
  
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass('come-in'); 
    } 
  });
});

// ---------- QUALITY ----------

// Modify the Quality section's PDF icon and link, on hover
$('#quality-download').hover(
    function() {
    // Turn the PDF icon red
    $(this).find('img').attr('src', './images/red-pdf-icon.svg');
    // Change the link color (lighter purple)
    $(this).find('p').css('color', '#76769e');
}, function() {
    // Revert back to the outlined PDF icon
    $(this).find('img').attr('src', './images/red-outline-pdf-icon.svg');
    // Change the link color (darker purple)
    $(this).find('p').css('color', '#484865');
});

// ---------- CONTACT ----------

$('#submit').on('click', function() {
    $('.form-item input:required, .form-item textarea:required').each(function() {
        // Set red outline/border, if required inputs are blank
        if ($(this).val() === '') {
            $(this).css('border', '1px auto #ee0a30');
            $(this).css('outline', '1px auto #ee0a30');
        }
    });
});

$('.form-item input:required, .form-item textarea:required').on('change', function() {
    // Remove red outline/border, if input is filled
    if ($(this).val() !== '') {
        $(this).css('border', '1px auto light-dark(rgb(118, 118, 118), rgb(133, 133, 133)');
        $(this).css('outline', 'none');
    }
});

// ---------- INFO PAGES ----------

// Animate the aside elements, so they slide in from the right
$(window).on('load', function() {
    $('aside').animate({left: 0}, 600).queue(function() {
        $('aside').animate({opacity: 1}, 600).dequeue()
    }).queue(function() {
        $('aside').addClass('slide-left').dequeue()
    });
});
