$(function() {
    $('select:not(.no-selectize)').selectize();

    $('.header-slider').slick({
        autoplay: true,
        dots: true,
        fade: true
    });
});

var $document = $(document);

$document.on('click', '.calc-button', function () {
    var $this = $(this);

    $this.toggleClass('active');
    $this.next().toggle();
});