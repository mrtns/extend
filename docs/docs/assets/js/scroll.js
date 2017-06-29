$(document).ready(function(){
  $('.scrollspy').scrollSpy({ scrollOffset: 30 });
  var $navbar = $(".site-header");
  var $header = $("#page-header");
  var $docTitle = $(".doc-title");
  var height = $navbar.outerHeight();

  function handleScroll() {
    var scrollTop = $(this).scrollTop();
      var top = scrollTop > height ? height : scrollTop;
      $header.css({ top:  -top + 'px' })
      if (scrollTop > height) {
        $docTitle.addClass("shrink");
      } else {
        $docTitle.removeClass("shrink");
      }
  }

  $(document).scroll(handleScroll);
  handleScroll();
});