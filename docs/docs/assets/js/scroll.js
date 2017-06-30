$(document).ready(function(){
  $('.scrollspy').scrollSpy({ scrollOffset: 30 });
  var $navbar = $(".site-header"),
      $docBar = $(".navigation-bar")
      $header = $("#page-header"),
      $docTitle = $(".doc-title"),
      $sidebar = $(".sidebar"),
      $content = $(".docs-content");
  

  function handleScroll() {
    var scrollTop = $(this).scrollTop(),
        sidebarHeight = $sidebar.outerHeight(),
        navbarHeight = $navbar.outerHeight(),
        contentHeight = $content.outerHeight(),
        top = scrollTop > navbarHeight ? navbarHeight : scrollTop,
        offset = navbarHeight - top + 'px';

    $docBar.css({ top: offset });
    $docTitle.css({ top: offset });

    if (scrollTop > navbarHeight) {
      $docTitle.addClass("shrink");
    } else {
      $docTitle.removeClass("shrink");
    }

    offset = contentHeight - scrollTop <= sidebarHeight ?
      (contentHeight - sidebarHeight - scrollTop) + 'px' :
      offset;
    
    $sidebar.css({ top: offset });
  }

  $(document).scroll(handleScroll);
  handleScroll();
});