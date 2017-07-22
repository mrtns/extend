$(document).ready(function(){
  $('.scrollspy').scrollSpy({ scrollOffset: 30 });
  var $navbar = $(".site-header");
  var $docBar = $(".navigation-bar");
  var $header = $("#page-header");
  var $content = $(".docs-content");
  var $sidebar = $(".sidebar");
  var $sidebarMobileHeader = $sidebar.find(".js-sidebar-mobile-header");
  var $sidebarMobileContent = $sidebar.find(".js-sidebar-mobile-content");
  

  function handleScroll() {
    var scrollTop = $(this).scrollTop(),
        sidebarHeight = $sidebar.outerHeight(),
        navbarHeight = $navbar.outerHeight(),
        contentHeight = $content.outerHeight(),
        top = scrollTop > navbarHeight ? navbarHeight : scrollTop,
        offset = navbarHeight - top + 'px';

    $docBar.css({ top: offset });

    offset = contentHeight - scrollTop <= sidebarHeight ?
      (contentHeight - sidebarHeight - scrollTop) + 'px' :
      offset;
    
    $sidebar.css({ top: offset });

    // Setup sidebar for mobile view only
    const activeCategory = $sidebar.find('.js-subcategory.active').text();
    const activeSubcategory = $sidebar.find('.js-subcategory-item.active').text();

    $sidebarMobileHeader.find('.js-active-category').text(activeCategory);
    $sidebarMobileHeader.find('.js-active-subcategory').text(activeSubcategory);
  }

  $(document).scroll(handleScroll);
  handleScroll();

  $($sidebarMobileHeader)
    .add($sidebarMobileContent.find('a'))
    .on('click', function() {
      $sidebarMobileContent.toggleClass('visible');
      $sidebarMobileHeader
        .find('.sidebar-mobile-header-icon')
        .toggleClass('icon-budicon-460 icon-budicon-462');

      $(document.body).toggleClass("prevent-scroll");
    })
});