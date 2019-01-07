var animationTime = 300,
    delayTime = 100;

$(function () {
    $('input[type=text], input[type=email], input[type=tel], input[type=password]').each(function () {
        var $this = $(this);
        if ($this.val() !== '') {
            $this.parents('.group').addClass('focused');
        }
    });

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
        dateFormat: 'dd.mm.yyyy',
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

            if (inst.$el.parents('.datepicker-group').hasClass('step-form-date')) {
                $('.filled-field-step-date').text(formattedDate);
            }

            $('.datepicker-group input').each(function () {
                var $this = $(this);
                if ($this.val() !== '') {
                    $this.parents('.group').addClass('focused');
                }
            });
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
            }, delayTime);
        }
    } else {
        if ($header.hasClass('header_visible')) {
            $header.removeClass('header_visible');
            setTimeout(function () {
                $header.hide();
            }, delayTime);
        }
    }
});

var $document = $(document);

$document.on('focus', 'input[type=text], input[type=email], input[type=tel], input[type=password]', function () {
    $(this).parents('.group').addClass('focused');
});

$document.on('blur', 'input[type=text], input[type=email], input[type=tel], input[type=password]', function () {
    var $this = $(this);
    if ($this.val() === '') {
        $this.parents('.group').removeClass('focused');
    }
});

$document.on('click', '.csc-title', function () {
    $(this).hide().parents('.header-right').addClass('csc-active');
    $('.csc-form').show().find('.csc-input').focus();
});

$document.on('blur', '.csc-input', function () {
    if (!$(this).val()) {
        $('.csc-form').hide();
        $('.csc-title').show().parents('.header-right').removeClass('csc-active');
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
        }, delayTime);
    }

    if ($this.hasClass('orders-tab')) {
        $('.orders-notice').show();
    } else {
        $('.orders-notice').hide();
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

$document.on('click', '.size-label div', function () {
    var $this = $(this),
        $group = $this.parents('.size-group'),
        $inputs = $group.find('.size-input'),
        $labels = $this.parents('.size-label');

    if ($this.hasClass('active')) {
        if ($this.hasClass('size-volume')) {
            $inputs.children().hide();
            $inputs.find('.size-input-volume').show().find('input').first().focus();
        } else if ($this.hasClass('size-dimension')) {
            $inputs.children().hide();
            $inputs.find('.size-input-dimension').show().find('input').first().focus();
            $this.hide();
            $labels.find('.size-volume').addClass('pushed');
        }
        $labels.addClass('active');
    } else {
        $this.addClass('active').siblings().removeClass('active');
        $inputs.children().hide();
        $labels.removeClass('active').children().show().removeClass('pushed');
    }
    if ($this.hasClass('size-volume')) {
        $group.find('.size-radio-volume').prop('checked', true);
    } else if ($this.hasClass('size-dimension')) {
        $group.find('.size-radio-dimension').prop('checked', true);
    }

    return false;
});

$document.on('change', '.step-form-role input[type=radio]', function () {
    var $field = $('.filled-field-role');
    switch ($(this).val()) {
        case '1':
            $field.text('Отправитель');
            break;
        case '2':
            $field.text('Получатель');
            break;
    }
});

$document.on('click', '.step-form .button_next', function () {
    var $parent = $(this).parents('.step-form-content'),
        $next = $parent.next(),
        ind = $next.index();

    $parent.removeClass('active').hide();
    $next.show();
    $('.side-menu li').removeClass('active checked').eq(ind).addClass('active').prevAll().addClass('checked');

    setTimeout(function () {
        $next.addClass('active');
    }, delayTime);

    $('.side-container').removeClass('side-container-xl');
    $('.side-right').show();

    return false;
});

$document.on('click', '.step-form .button_prev', function () {
    var $parent = $(this).parents('.step-form-content'),
        $prev = $parent.prev(),
        ind = $prev.index();

    $parent.removeClass('active').hide();
    $prev.show();
    $('.side-menu li').removeClass('active').eq(ind).addClass('active');

    setTimeout(function () {
        $prev.addClass('active');
    }, delayTime);

    $('.side-container').removeClass('side-container-xl');
    $('.side-right').show();

    return false;
});

$document.on('click', '.side-menu li', function () {
    var $this = $(this),
        ind = $this.index(),
        $steps = $('.step-form-content'),
        $step = $steps.eq(ind);

    $steps.removeClass('active').hide();
    $step.show();
    $this.addClass('active').siblings().removeClass('active');

    setTimeout(function () {
        $step.addClass('active');
    }, delayTime);

    $('.side-container').removeClass('side-container-xl');
    $('.side-right').show();

    return false;
});

$document.on('change', '.step-form-content-2 input[type=text]', function () {
    var text = [];
    $('.step-form-content-2 input:not(.step-form-sender-address)').each(function () {
        var val = $(this).val();
        if (val) {
            text.push(val);
        }
    });

    $('.filled-field-sender').text(text.join(', '));
});

$document.on('change', '.step-form-content-2 .step-form-sender-address', function () {
    $('.filled-field-sender-address').text($(this).val());
});

$document.on('change', '.step-form-content-3 input[type=text]', function () {
    var text = [];
    $('.step-form-content-3 input:not(.step-form-receiver-address)').each(function () {
        var val = $(this).val();
        if (val) {
            text.push(val);
        }
    });

    $('.filled-field-receiver').text(text.join(', '));
});

$document.on('change', '.step-form-content-3 .step-form-receiver-address', function () {
    $('.filled-field-receiver-address').text($(this).val());
});

$document.on('click', '.add-cargo-button', function () {
    var $trs = $('.step-form-cargos tr'),
        $first = $trs.first();
    $first.find('.cargo-delete-button a').removeClass('disabled');
    var $clone = $first.clone();
    $clone.find('input').val('');
    $clone.find('.cargo-num').text($trs.length + 1 + '.');
    $('.step-form-cargos table').append($clone);

    return false;
});

$document.on('click', '.cargo-delete-button a:not(.disabled)', function () {
    $(this).parents('tr').remove();

    var $trs = $('.step-form-cargos tr'), count = $trs.length;
    if (count === 1) {
        $trs.find('.cargo-delete-button a').addClass('disabled');
    }
    var num = 1;
    $trs.each(function () {
        $(this).find('.cargo-num').text(num + '.');
        num++;
    });

    return false;
});

$document.on('click', '#to-confirmation-step', function () {
    var html = $('.filled-fields').html();
    $('.filled-fields-confirmation').html(html);

    var cargos = '<table>', i = 1;
    $('.step-form-cargos table tr').each(function () {
        var $this = $(this),
            places = $this.find('.cargo-places input').val();
        cargos += '<tr><td>' + i + ':</td><td>' + $this.find('.cargo-name input').val()
            + '</td><td>' + $this.find('.cargo-weight input').val()
            + ' кг</td><td>' + $this.find('.cargo-volume input').val() + ' м<sup>3</sup></td><td>'
            + places + ' ' + declOfNum(places, ['место', 'места', 'мест']) + '</td></tr>';
        i++;
    });
    cargos += '</table>';
    $('.filled-field-cargos').html(cargos);

    var lis = '';
    $('.step-form-radios input[type=radio]:checked').each(function () {
        var $this = $(this), val = $this.val();

        if (val && val !== '0') {
            var title = $this.parents('.radio-group').find('.radio-title').text();
            lis += '<li>' + title + '</li>';
        }
    });
    if (lis) {
        $('.filled-field-services ul').append(lis);
    } else {
        $('.filled-field-services').parents('.filled-field-group').hide();
    }

    var buyer = $('.step-form-buyer option:checked').text();
    $('.confirmation-buyer').text(buyer);

    $('.side-container').addClass('side-container-xl');
    $('.side-right').hide();

    return false;
});

$document.on('submit', '#order-delivery-form', function () {
    $.magnificPopup.open({
        items: {
            src: '#order-delivery-complete-popup'
        },
        type: 'inline'
    });

    return false;
});

$document.on('click', '.order-info-button', function () {
    $.magnificPopup.open({
        items: {
            src: '#order-info-popup'
        },
        type: 'inline'
    });

    return false;
});


function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}