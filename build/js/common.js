$(function () {
    $('select:not(.no-selectize)').selectize();

    $('.header-slider').slick({
        autoplay: true,
        dots: true,
        fade: true
    });

    $('.thanks-slider').slick({
        slidesToShow: 3,
        appendArrows: '.thanks-slider-arrows',
        prevArrow: '<div class="button button_primary button__next"></div>',
        nextArrow: '<div class="button button_primary button__prev"></div>'
    });

    $('.thanks-doc-info__link a').magnificPopup({
        type: 'image'
    });
});

$(window).scroll(function () {
    var wTop = $(this).scrollTop(), $header = $('header');

    if (wTop > 250) {
        if (!$header.hasClass('header_visible')) {
            $header.show();
            setTimeout(function () {
                $header.addClass('header_visible');
            }, 100);
        }
    } else {
        if ($header.hasClass('header_visible')) {
            $header.removeClass('header_visible');
            setTimeout(function () {
                $header.hide();
            }, 100);
        }
    }
});

var $document = $(document);

$document.on('click', '.csc-title', function () {
    $(this).hide();
    $('.csc-form').show().find('.csc-input').focus();
});

$document.on('blur', '.csc-input', function () {
    if (!$(this).val()) {
        $('.csc-form').hide();
        $('.csc-title').show();
    }
});

$document.on('click', '.drop__active, .drop-button', function (e) {
    e.stopPropagation();
});

$document.on('click', 'body', function () {
    $('.drop__active').removeClass('drop__active');
    $('.drop-button__active').removeClass('drop-button__active');
});

$document.on('click', '.calc-button', function () {
    var $this = $(this);

    $this.toggleClass('drop-button__active');
    $this.next().toggleClass('drop__active');
});

$document.on('click', '.ss-list a', function (e) {
    e.preventDefault();
    var $li = $(this).parent(), ind = $li.index();

    $li.addClass('active').siblings().removeClass('active');
    $('.ss-content > div').eq(ind).addClass('active').siblings().removeClass('active');

    return false;
});