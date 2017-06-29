$(document).ready(function(){
  $('.scrollspy').scrollSpy({ scrollOffset: 30 });
  var $navbar = $(".site-header"),
      $header = $("#page-header"),
      $docTitle = $(".doc-title"),
      $sidebar = $(".sidebar-container"),
      $content = $(".docs-content");
  

  function handleScroll() {
    var scrollTop = $(this).scrollTop(),
        sidebarHeight = $sidebar.outerHeight(),
        navbarHeight = $navbar.outerHeight(),
        contentHeight = $content.outerHeight(),
        top = scrollTop > navbarHeight ? navbarHeight : scrollTop;

    $header.css({ top:  -top + 'px' })
    if (scrollTop > navbarHeight) {
      $docTitle.addClass("shrink");
    } else {
      $docTitle.removeClass("shrink");
    }
    
    if (contentHeight - scrollTop <= sidebarHeight) {
      $sidebar.css({ top: (contentHeight - sidebarHeight - scrollTop) + 'px' })
    } else {
      $sidebar.css({ top: 0 + 'px' })
    }
  }

  $(document).scroll(handleScroll);
  handleScroll();
});