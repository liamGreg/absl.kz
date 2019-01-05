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

    $('.popup-button').magnificPopup();

    $('.datepicker-input').datepicker({
        dateFormat: 'yyyy-mm-dd',
        onSelect: function (formattedDate, date, inst) {
            var $parent = inst.$el.parent();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            $parent.find('.date-day').val(day);
            $parent.find('.date-month').val(month);
            $parent.find('.date-year').val(date.getFullYear());
        }
    })
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

$document.on('click', '.accordeon-title', function () {
    var $this = $(this);

    $this.toggleClass('active').next().toggleClass('active');

    return false;
});

$document.on('click', '.date-day, .date-month, .date-year, .date-pick', function () {
    $(this).parents('.datepicker-group').find('.datepicker-input').focus();
});

$document.on('click', '.burger', function () {
    $('.m-menu').addClass('active');
    $('body').addClass('push-right');
    $('.m-canvas').addClass('active');
});

$document.on('click', '.m-canvas', function () {
    $('.m-menu').removeClass('active');
    $('body').removeClass('push-right');
    $('.m-canvas').removeClass('active');
});

$document.on('click', '.tabs li', function () {
    var $this = $(this), ind = $this.index(), parent = $this.parent().data('target');

    if (!$this.hasClass('active')) {
        $this.addClass('active').siblings().removeClass('active');
        var $parent = $(parent);
        var $target = $parent.height($parent.children('.active').height()).find('.tabs-content-item').hide().removeClass('active').eq(ind).show();
        setTimeout(function () {
            $target.addClass('active');
            $parent.height($target.height());
        }, 100);
    }
});

$document.on('submit', '#register-form', function () {
    $.magnificPopup.open({
        items: {
            src: '#register-complete-popup'
        },
        type: 'inline'
    });

    return false;
});

$document.on('submit', '#forgot-form', function () {
    $.magnificPopup.open({
        items: {
            src: '#forgot-complete-popup'
        },
        type: 'inline'
    });

    return false;
});

$document.on('click', '.button_popup-close', function () {
    $.magnificPopup.close();

    return false;
});