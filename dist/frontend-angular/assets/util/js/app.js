export function appMenu() {

    /*=========================================================================================
  File Name: app-menu.js
  Description: Menu navigation, custom scrollbar, hover scroll bar, multilevel menu
  initialization and manipulations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

  
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + "px");
  
    $.app = $.app || {};
  
    var $body = $('body');
    var $window = $(window);
    var menuWrapper_el = $('div[data-menu="menu-wrapper"]').html();
    var menuWrapperClasses = $('div[data-menu="menu-wrapper"]').attr('class');
  
    // Main menu
    $.app.menu = {
      expanded: null,
      collapsed: null,
      hidden: null,
      container: null,
      horizontalMenu: false,
  
      manualScroller: {
        obj: null,
  
        init: function () {
          var scroll_theme = ($('.main-menu').hasClass('menu-dark')) ? 'light' : 'dark';
          this.obj = new PerfectScrollbar(".main-menu-content", {
            suppressScrollX: true,
            wheelPropagation: false
          });
        },
  
        update: function () {
          if (this.obj) {
            // Scroll to currently active menu on page load if data-scroll-to-active is true
            if ($('.main-menu').data('scroll-to-active') === true) {
              var activeEl, menu, activeElHeight;
              activeEl = document.querySelector('.main-menu-content li.active');
              if ($body.hasClass('menu-collapsed')) {
                if ($('.main-menu-content li.sidebar-group-active').length) {
                  activeEl = document.querySelector('.main-menu-content li.sidebar-group-active');
                }
              } else {
                menu = document.querySelector('.main-menu-content');
                if (activeEl) {
                  activeElHeight = activeEl.getBoundingClientRect().top + menu.scrollTop;
                }
                // If active element's top position is less than 2/3 (66%) of menu height than do not scroll
                if (activeElHeight > parseInt((menu.clientHeight * 2) / 3)) {
                  var start = menu.scrollTop,
                    change = activeElHeight - start - parseInt(menu.clientHeight / 2);
                }
              }
              setTimeout(function () {
                $.app.menu.container.stop().animate({
                  scrollTop: change
                }, 300);
                $('.main-menu').data('scroll-to-active', 'false');
              }, 300);
            }
            this.obj.update();
          }
        },
  
        enable: function () {
          if (!$('.main-menu-content').hasClass('ps')) {
            this.init();
          }
        },
  
        disable: function () {
          if (this.obj) {
            this.obj.destroy();
          }
        },
  
        updateHeight: function () {
          if (($body.data('menu') == 'vertical-menu' || $body.data('menu') == 'vertical-menu-modern' || $body.data('menu') == 'vertical-overlay-menu') && $('.main-menu').hasClass('menu-fixed')) {
            $('.main-menu-content').css('height', $(window).height() - $('.header-navbar').height() - $('.main-menu-header').outerHeight() - $('.main-menu-footer').outerHeight());
            this.update();
          }
        }
      },
  
      init: function (compactMenu) {
        if ($('.main-menu-content').length > 0) {
          this.container = $('.main-menu-content');
  
          var menuObj = this;
          var defMenu = '';
  
          if (compactMenu === true) {
            defMenu = 'collapsed';
          }
  
          if ($body.data('menu') == 'vertical-menu-modern') {
            var menuToggle = '';
            if (menuToggle === "false") {
              this.change('collapsed');
            } else {
              this.change(defMenu);
            }
          } else {
            this.change(defMenu);
          }
        }
      },
  
      drillDownMenu: function (screenSize) {
        if ($('.drilldown-menu').length) {
          if (screenSize == 'sm' || screenSize == 'xs') {
            if ($('#navbar-mobile').attr('aria-expanded') == 'true') {
  
              $('.drilldown-menu').slidingMenu({
                backLabel: true
              });
            }
          } else {
            $('.drilldown-menu').slidingMenu({
              backLabel: true
            });
          }
        }
      },
  
      change: function (defMenu) {
        var currentBreakpoint = Unison.fetch.now(); // Current Breakpoint
  
        this.reset();
  
        var menuType = $body.data('menu');
  
        if (currentBreakpoint) {
          switch (currentBreakpoint.name) {
            case 'xl':
              if (menuType === 'vertical-overlay-menu') {
                this.hide();
              } else {
                if (defMenu === 'collapsed')
                  this.collapse(defMenu);
                else
                  this.expand();
              }
              break;
            case 'lg':
              if (menuType === 'vertical-overlay-menu' || menuType === 'vertical-menu-modern' || menuType === 'horizontal-menu') {
                this.hide();
              } else {
                this.collapse();
              }
              break;
            case 'md':
            case 'sm':
              this.hide();
              break;
            case 'xs':
              this.hide();
              break;
          }
        }
  
        // On the small and extra small screen make them overlay menu
        if (menuType === 'vertical-menu' || menuType === 'vertical-menu-modern') {
          this.toOverlayMenu(currentBreakpoint.name, menuType);
        }
  
        if ($body.is('.horizontal-layout') && !$body.hasClass('.horizontal-menu-demo')) {
          this.changeMenu(currentBreakpoint.name);
  
          $('.menu-toggle').removeClass('is-active');
        }
  
        // Initialize drill down menu for vertical layouts, for horizontal layouts drilldown menu is intitialized in changemenu function
        if (menuType != 'horizontal-menu') {
          // Drill down menu
          // ------------------------------
          this.drillDownMenu(currentBreakpoint.name);
        }
  
        // Dropdown submenu on large screen on hover For Large screen only
        // ---------------------------------------------------------------
        if (currentBreakpoint.name == 'xl') {
          $('body[data-open="hover"] .header-navbar .dropdown').on('mouseenter', function () {
            if (!($(this).hasClass('show'))) {
              $(this).addClass('show');
            } else {
              $(this).removeClass('show');
            }
          }).on('mouseleave', function (event) {
            $(this).removeClass('show');
          });
  
          $('body[data-open="hover"] .dropdown a').on('click', function (e) {
            if (menuType == 'horizontal-menu') {
              var $this = $(this);
              if ($this.hasClass('dropdown-toggle')) {
                return false;
              }
            }
          });
        }
  
        // Added data attribute brand-center for navbar-brand-center
        // TODO:AJ: Shift this feature in JADE.
        if ($('.header-navbar').hasClass('navbar-brand-center')) {
          $('.header-navbar').attr('data-nav', 'brand-center');
        }
        if (currentBreakpoint.name == 'sm' || currentBreakpoint.name == 'xs') {
          $('.header-navbar[data-nav=brand-center]').removeClass('navbar-brand-center');
        } else {
          $('.header-navbar[data-nav=brand-center]').addClass('navbar-brand-center');
        }
        // On screen width change, current active menu in horizontal
        if (currentBreakpoint.name == 'xl' && menuType == 'horizontal-menu') {
          $(".main-menu-content").find('li.active').parents('li').addClass('sidebar-group-active active');
        }
  
        if (currentBreakpoint.name !== 'xl' && menuType == 'horizontal-menu') {
          $("#navbar-type").toggleClass('d-none d-xl-block');
        }
  
        // Dropdown submenu on small screen on click
        // --------------------------------------------------
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
          if ($(this).siblings('ul.dropdown-menu').length > 0) {
            event.preventDefault();
          }
          event.stopPropagation();
          $(this).parent().siblings().removeClass('show');
          $(this).parent().toggleClass('show');
        });
  
  
        // Horizontal layout submenu drawer scrollbar
        if (menuType == 'horizontal-menu') {
          $('li.dropdown-submenu').on('mouseenter', function () {
            if (!$(this).parent('.dropdown').hasClass('show')) {
              $(this).removeClass('openLeft');
            }
            var dd = $(this).find('.dropdown-menu');
            if (dd) {
              var pageHeight = $(window).height(),
                // ddTop = dd.offset().top,
                ddTop = $(this).position().top,
                ddLeft = dd.offset().left,
                ddWidth = dd.width(),
                ddHeight = dd.height();
              if (((pageHeight - ddTop) - ddHeight - 28) < 1) {
                var maxHeight = (pageHeight - ddTop - 170);
                $(this).find('.dropdown-menu').css({
                  'max-height': maxHeight + 'px',
                  'overflow-y': 'auto',
                  'overflow-x': 'hidden'
                });
                var menu_content = new PerfectScrollbar('li.dropdown-submenu.show .dropdown-menu', {
                  wheelPropagation: false
                });
              }
              // Add class to horizontal sub menu if screen width is small
              if (ddLeft + ddWidth - (window.innerWidth - 16) >= 0) {
                $(this).addClass('openLeft');
              }
            }
          });
          $('.theme-layouts').find('.semi-dark').hide();
          $('#customizer-navbar-colors').hide();
        }
  
  
        // Horizontal Fixed Nav Sticky hight issue on small screens
        // if (menuType == 'horizontal-menu') {
        //   if (currentBreakpoint.name == 'sm' || currentBreakpoint.name == 'xs') {
        //     if ($(".menu-fixed").length) {
        //       $(".menu-fixed").unstick();
        //     }
        //   }
        //   else {
        //     if ($(".navbar-fixed").length) {
        //       $(".navbar-fixed").sticky();
        //     }
        //   }
        // }
  
        /********************************************
         *             Searchable Menu               *
         ********************************************/
  
        function searchMenu(list) {
  
          var input = $(".menu-search");
          $(input)
            .change(function () {
              var filter = $(this).val();
              if (filter) {
                // Hide Main Navigation Headers
                $('.navigation-header').hide();
                // this finds all links in a list that contain the input,
                // and hide the ones not containing the input while showing the ones that do
                $(list).find("li a:not(:Contains(" + filter + "))").hide().parent().hide();
                // $(list).find("li a:Contains(" + filter + ")").show().parents('li').show().addClass('open').closest('li').children('a').show();
                var searchFilter = $(list).find("li a:Contains(" + filter + ")");
                if (searchFilter.parent().hasClass('has-sub')) {
                  searchFilter.show()
                    .parents('li').show()
                    .addClass('open')
                    .closest('li')
                    .children('a').show()
                    .children('li').show();
  
                  // searchFilter.parents('li').find('li').show().children('a').show();
                  if (searchFilter.siblings('ul').length > 0) {
                    searchFilter.siblings('ul').children('li').show().children('a').show();
                  }
  
                } else {
                  searchFilter.show().parents('li').show().addClass('open').closest('li').children('a').show();
                }
              } else {
                // return to default
                $('.navigation-header').show();
                $(list).find("li a").show().parent().show().removeClass('open');
              }
              $.app.menu.manualScroller.update();
              return false;
            })
            .keyup(function () {
              // fire the above change event after every letter
              $(this).change();
            });
        }
  
        if (menuType === 'vertical-menu' || menuType === 'vertical-overlay-menu') {
          // custom css expression for a case-insensitive contains()
          jQuery.expr[':'].Contains = function (a, i, m) {
            return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
          };
  
          searchMenu($("#main-menu-navigation"));
        }
      },
  
      transit: function (callback1, callback2) {
        var menuObj = this;
        $body.addClass('changing-menu');
  
        callback1.call(menuObj);
  
        if ($body.hasClass('vertical-layout')) {
          if ($body.hasClass('menu-open') || $body.hasClass('menu-expanded')) {
            $('.menu-toggle').addClass('is-active');
  
            // Show menu header search when menu is normally visible
            if ($body.data('menu') === 'vertical-menu') {
              if ($('.main-menu-header')) {
                $('.main-menu-header').show();
              }
            }
          } else {
            $('.menu-toggle').removeClass('is-active');
  
            // Hide menu header search when only menu icons are visible
            if ($body.data('menu') === 'vertical-menu') {
              if ($('.main-menu-header')) {
                $('.main-menu-header').hide();
              }
            }
          }
        }
  
        setTimeout(function () {
          callback2.call(menuObj);
          $body.removeClass('changing-menu');
  
          menuObj.update();
        }, 500);
      },
  
      open: function () {
        this.transit(function () {
          $body.removeClass('menu-hide menu-collapsed').addClass('menu-open');
          this.hidden = false;
          this.expanded = true;
  
          if ($body.hasClass('vertical-overlay-menu')) {
            $('.sidenav-overlay').removeClass('d-none').addClass('d-block');
            $('body').css('overflow', 'hidden');
          }
        }, function () {
          if (!$('.main-menu').hasClass('menu-native-scroll') && $('.main-menu').hasClass('menu-fixed')) {
            this.manualScroller.enable();
            $('.main-menu-content').css('height', $(window).height() - $('.header-navbar').height() - $('.main-menu-header').outerHeight() - $('.main-menu-footer').outerHeight());
            // this.manualScroller.update();
          }
  
          if (!$body.hasClass('vertical-overlay-menu')) {
            $('.sidenav-overlay').removeClass('d-block d-none');
            $('body').css('overflow', 'auto');
          }
        });
      },
  
      hide: function () {
  
        this.transit(function () {
          $body.removeClass('menu-open menu-expanded').addClass('menu-hide');
          this.hidden = true;
          this.expanded = false;
  
          if ($body.hasClass('vertical-overlay-menu')) {
            $('.sidenav-overlay').removeClass('d-block').addClass('d-none');
            $('body').css('overflow', 'auto');
          }
        }, function () {
          if (!$('.main-menu').hasClass('menu-native-scroll') && $('.main-menu').hasClass('menu-fixed')) {
            this.manualScroller.enable();
          }
  
          if (!$body.hasClass('vertical-overlay-menu')) {
            $('.sidenav-overlay').removeClass('d-block d-none');
            $('body').css('overflow', 'auto');
          }
        });
      },
  
      expand: function () {
        if (this.expanded === false) {
          if ($body.data('menu') == 'vertical-menu-modern') {
            $('.modern-nav-toggle').find('.toggle-icon')
              .removeClass('feather icon-circle').addClass('feather icon-disc');
          }
          this.transit(function () {
            $body.removeClass('menu-collapsed').addClass('menu-expanded');
            this.collapsed = false;
            this.expanded = true;
  
            $('.sidenav-overlay').removeClass('d-block d-none');
          }, function () {
  
            if (($('.main-menu').hasClass('menu-native-scroll') || $body.data('menu') == 'horizontal-menu')) {
              this.manualScroller.disable();
            } else {
              if ($('.main-menu').hasClass('menu-fixed'))
                this.manualScroller.enable();
            }
  
            if (($body.data('menu') == 'vertical-menu' || $body.data('menu') == 'vertical-menu-modern') && $('.main-menu').hasClass('menu-fixed')) {
              $('.main-menu-content').css('height', $(window).height() - $('.header-navbar').height() - $('.main-menu-header').outerHeight() - $('.main-menu-footer').outerHeight());
              // this.manualScroller.update();
            }
  
          });
        }
      },
  
      collapse: function (defMenu) {
        if (this.collapsed === false) {
          if ($body.data('menu') == 'vertical-menu-modern') {
            $('.modern-nav-toggle').find('.toggle-icon')
              .removeClass('feather icon-disc').addClass('feather icon-circle');
          }
          this.transit(function () {
            $body.removeClass('menu-expanded').addClass('menu-collapsed');
            this.collapsed = true;
            this.expanded = false;
  
            $('.content-overlay').removeClass('d-block d-none');
          }, function () {
  
            if (($body.data('menu') == 'horizontal-menu') && $body.hasClass('vertical-overlay-menu')) {
              if ($('.main-menu').hasClass('menu-fixed'))
                this.manualScroller.enable();
            }
            if (($body.data('menu') == 'vertical-menu' || $body.data('menu') == 'vertical-menu-modern') && $('.main-menu').hasClass('menu-fixed')) {
              $('.main-menu-content').css('height', $(window).height() - $('.header-navbar').height());
              // this.manualScroller.update();
            }
            if ($body.data('menu') == 'vertical-menu-modern') {
              if ($('.main-menu').hasClass('menu-fixed'))
                this.manualScroller.enable();
            }
          });
        }
      },
  
      toOverlayMenu: function (screen, menuType) {
        var menu = $body.data('menu');
        if (menuType == 'vertical-menu-modern') {
          if (screen == 'lg' || screen == 'md' || screen == 'sm' || screen == 'xs') {
            if ($body.hasClass(menu)) {
              $body.removeClass(menu).addClass('vertical-overlay-menu');
            }
          } else {
            if ($body.hasClass('vertical-overlay-menu')) {
              $body.removeClass('vertical-overlay-menu').addClass(menu);
            }
          }
        } else {
          if (screen == 'sm' || screen == 'xs') {
            if ($body.hasClass(menu)) {
              $body.removeClass(menu).addClass('vertical-overlay-menu');
            }
          } else {
            if ($body.hasClass('vertical-overlay-menu')) {
              $body.removeClass('vertical-overlay-menu').addClass(menu);
            }
          }
        }
      },
  
      changeMenu: function (screen) {
        // Replace menu html
        $('div[data-menu="menu-wrapper"]').html('');
        $('div[data-menu="menu-wrapper"]').html(menuWrapper_el);
  
        var menuWrapper = $('div[data-menu="menu-wrapper"]'),
          menuContainer = $('div[data-menu="menu-container"]'),
          menuNavigation = $('ul[data-menu="menu-navigation"]'),
          /*megaMenu           = $('li[data-menu="megamenu"]'),
          megaMenuCol        = $('li[data-mega-col]'),*/
          dropdownMenu = $('li[data-menu="dropdown"]'),
          dropdownSubMenu = $('li[data-menu="dropdown-submenu"]');
  
        if (screen === 'xl') {
  
          // Change body classes
          $body.removeClass('vertical-layout vertical-overlay-menu fixed-navbar').addClass($body.data('menu'));
  
          // Remove navbar-fix-top class on large screens
          $('nav.header-navbar').removeClass('fixed-top');
  
          // Change menu wrapper, menu container, menu navigation classes
          menuWrapper.removeClass().addClass(menuWrapperClasses);
  
          // Intitialize drill down menu for horizontal layouts
          // --------------------------------------------------
          this.drillDownMenu(screen);
  
          $('a.dropdown-item.nav-has-children').on('click', function () {
            event.preventDefault();
            event.stopPropagation();
          });
          $('a.dropdown-item.nav-has-parent').on('click', function () {
            event.preventDefault();
            event.stopPropagation();
          });
        } else {
          // Change body classes
          $body.removeClass($body.data('menu')).addClass('vertical-layout vertical-overlay-menu fixed-navbar');
  
          // Add navbar-fix-top class on small screens
          $('nav.header-navbar').addClass('fixed-top');
  
          // Change menu wrapper, menu container, menu navigation classes
          menuWrapper.removeClass().addClass('main-menu menu-light menu-fixed menu-shadow');
          // menuContainer.removeClass().addClass('main-menu-content');
          menuNavigation.removeClass().addClass('navigation navigation-main');
  
          // If Dropdown Menu
          dropdownMenu.removeClass('dropdown').addClass('has-sub');
          dropdownMenu.find('a').removeClass('dropdown-toggle nav-link');
          dropdownMenu.children('ul').find('a').removeClass('dropdown-item');
          dropdownMenu.find('ul').removeClass('dropdown-menu');
          dropdownSubMenu.removeClass().addClass('has-sub');
  
          $.app.nav.init();
  
          // Dropdown submenu on small screen on click
          // --------------------------------------------------
          $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().siblings().removeClass('open');
            $(this).parent().toggleClass('open');
          });
  
          $(".main-menu-content").find('li.active').parents('li').addClass('sidebar-group-active');
  
          $(".main-menu-content").find("li.active").closest("li.nav-item").addClass("open");
        }
      },
  
      toggle: function () {
        var currentBreakpoint = Unison.fetch.now(); // Current Breakpoint
        var collapsed = this.collapsed;
        var expanded = this.expanded;
        var hidden = this.hidden;
        var menu = $body.data('menu');
  
        switch (currentBreakpoint.name) {
          case 'xl':
            if (expanded === true) {
              if (menu == 'vertical-overlay-menu') {
                this.hide();
              } else {
                this.collapse();
              }
            } else {
              if (menu == 'vertical-overlay-menu') {
                this.open();
              } else {
                this.expand();
              }
            }
            break;
          case 'lg':
            if (expanded === true) {
              if (menu == 'vertical-overlay-menu' || menu == 'vertical-menu-modern' || menu == 'horizontal-menu') {
                this.hide();
              } else {
                this.collapse();
              }
            } else {
              if (menu == 'vertical-overlay-menu' || menu == 'vertical-menu-modern' || menu == 'horizontal-menu') {
                this.open();
              } else {
                this.expand();
              }
            }
            break;
          case 'md':
          case 'sm':
            if (hidden === true) {
              this.open();
            } else {
              this.hide();
            }
            break;
          case 'xs':
            if (hidden === true) {
              this.open();
            } else {
              this.hide();
            }
            break;
        }
  
        // Re-init sliding menu to update width
        this.drillDownMenu(currentBreakpoint.name);
      },
  
      update: function () {
        this.manualScroller.update();
      },
  
      reset: function () {
        this.expanded = false;
        this.collapsed = false;
        this.hidden = false;
        $body.removeClass('menu-hide menu-open menu-collapsed menu-expanded');
      },
    };
  
    // Navigation Menu
    $.app.nav = {
      container: $('.navigation-main'),
      initialized: false,
      navItem: $('.navigation-main').find('li').not('.navigation-category'),
  
      config: {
        speed: 300,
      },
  
      init: function (config) {
        this.initialized = true; // Set to true when initialized
        $.extend(this.config, config);
  
        this.bind_events();
      },
  
      bind_events: function () {
        var menuObj = this;
  
        $('.navigation-main').on('mouseenter.app.menu', 'li', function () {
          var $this = $(this);
          $('.hover', '.navigation-main').removeClass('hover');
          if ($body.hasClass('menu-collapsed') && $body.data('menu') != 'vertical-menu-modern') {
            $('.main-menu-content').children('span.menu-title').remove();
            $('.main-menu-content').children('a.menu-title').remove();
            $('.main-menu-content').children('ul.menu-content').remove();
  
            // Title
            var menuTitle = $this.find('span.menu-title').clone(),
              tempTitle,
              tempLink;
            if (!$this.hasClass('has-sub')) {
              tempTitle = $this.find('span.menu-title').text();
              tempLink = $this.children('a').attr('href');
              if (tempTitle !== '') {
                menuTitle = $("<a>");
                menuTitle.attr("href", tempLink);
                menuTitle.attr("title", tempTitle);
                menuTitle.text(tempTitle);
                menuTitle.addClass("menu-title");
              }
            }
            // menu_header_height = ($('.main-menu-header').length) ? $('.main-menu-header').height() : 0,
            // fromTop = menu_header_height + $this.position().top + parseInt($this.css( "border-top" ),10);
            var fromTop;
            if ($this.css("border-top")) {
              fromTop = $this.position().top + parseInt($this.css("border-top"), 10);
            } else {
              fromTop = $this.position().top;
            }
            if ($body.data('menu') !== 'vertical-compact-menu') {
              menuTitle.appendTo('.main-menu-content').css({
                position: 'fixed',
                top: fromTop,
              });
            }
  
            // Content
            if ($this.hasClass('has-sub') && $this.hasClass('nav-item')) {
              var menuContent = $this.children('ul:first');
              menuObj.adjustSubmenu($this);
            }
          }
          $this.addClass('hover');
        }).on('mouseleave.app.menu', 'li', function () {
          // $(this).removeClass('hover');
        }).on('active.app.menu', 'li', function (e) {
          $(this).addClass('active');
          e.stopPropagation();
        }).on('deactive.app.menu', 'li.active', function (e) {
          $(this).removeClass('active');
          e.stopPropagation();
        }).on('open.app.menu', 'li', function (e) {
  
          var $listItem = $(this);
          $listItem.addClass('open');
  
          menuObj.expand($listItem);
  
          // If menu collapsible then do not take any action
          if ($('.main-menu').hasClass('menu-collapsible')) {
            return false;
          }
          // If menu accordion then close all except clicked once
          else {
            $listItem.siblings('.open').find('li.open').trigger('close.app.menu');
            $listItem.siblings('.open').trigger('close.app.menu');
          }
  
          e.stopPropagation();
        }).on('close.app.menu', 'li.open', function (e) {
          var $listItem = $(this);
  
          $listItem.removeClass('open');
          menuObj.collapse($listItem);
  
          e.stopPropagation();
        }).on('click.app.menu', 'li', function (e) {
          var $listItem = $(this);
          if ($listItem.is('.disabled')) {
            e.preventDefault();
          } else {
            if ($body.hasClass('menu-collapsed') && $body.data('menu') != 'vertical-menu-modern') {
              e.preventDefault();
            } else {
              if ($listItem.has('ul').length) {
                if ($listItem.is('.open')) {
                  $listItem.trigger('close.app.menu');
                } else {
                  $listItem.trigger('open.app.menu');
                }
              } else {
                if (!$listItem.is('.active')) {
                  $listItem.siblings('.active').trigger('deactive.app.menu');
                  $listItem.trigger('active.app.menu');
                }
              }
            }
          }
  
          e.stopPropagation();
        });
  
  
        $('.navbar-header, .main-menu').on('mouseenter', modernMenuExpand).on('mouseleave', modernMenuCollapse);
  
        function modernMenuExpand() {
          if ($body.data('menu') == 'vertical-menu-modern') {
            $('.main-menu, .navbar-header').addClass('expanded');
            if ($body.hasClass('menu-collapsed')) {
              if ($('.main-menu li.open').length === 0) {
                $(".main-menu-content").find('li.active').parents('li').addClass('open');
              }
              var $listItem = $('.main-menu li.menu-collapsed-open'),
                $subList = $listItem.children('ul');
  
              $subList.hide().slideDown(200, function () {
                $(this).css('display', '');
              });
  
              $listItem.addClass('open').removeClass('menu-collapsed-open');
              // $.app.menu.changeLogo('expand');
            }
          }
        }
  
        function modernMenuCollapse() {
          if ($body.hasClass('menu-collapsed') && $body.data('menu') == 'vertical-menu-modern') {
            setTimeout(function () {
              if ($('.main-menu:hover').length === 0 && $('.navbar-header:hover').length === 0) {
  
                $('.main-menu, .navbar-header').removeClass('expanded');
                if ($body.hasClass('menu-collapsed')) {
                  var $listItem = $('.main-menu li.open'),
                    $subList = $listItem.children('ul');
                  $listItem.addClass('menu-collapsed-open');
  
                  $subList.show().slideUp(200, function () {
                    $(this).css('display', '');
                  });
  
                  $listItem.removeClass('open');
                  // $.app.menu.changeLogo();
                }
              }
            }, 1);
          }
        }
  
        $('.main-menu-content').on('mouseleave', function () {
          if ($body.hasClass('menu-collapsed')) {
            $('.main-menu-content').children('span.menu-title').remove();
            $('.main-menu-content').children('a.menu-title').remove();
            $('.main-menu-content').children('ul.menu-content').remove();
          }
          $('.hover', '.navigation-main').removeClass('hover');
        });
  
        // If list item has sub menu items then prevent redirection.
        $('.navigation-main li.has-sub > a').on('click', function (e) {
          e.preventDefault();
        });
  
        $('ul.menu-content').on('click', 'li', function (e) {
          var $listItem = $(this);
          if ($listItem.is('.disabled')) {
            e.preventDefault();
          } else {
            if ($listItem.has('ul')) {
              if ($listItem.is('.open')) {
                $listItem.removeClass('open');
                menuObj.collapse($listItem);
              } else {
                $listItem.addClass('open');
  
                menuObj.expand($listItem);
  
                // If menu collapsible then do not take any action
                if ($('.main-menu').hasClass('menu-collapsible')) {
                  return false;
                }
                // If menu accordion then close all except clicked once
                else {
                  $listItem.siblings('.open').find('li.open').trigger('close.app.menu');
                  $listItem.siblings('.open').trigger('close.app.menu');
                }
  
                e.stopPropagation();
              }
            } else {
              if (!$listItem.is('.active')) {
                $listItem.siblings('.active').trigger('deactive.app.menu');
                $listItem.trigger('active.app.menu');
              }
            }
          }
  
          e.stopPropagation();
        });
      },
  
      /**
       * Ensure an admin submenu is within the visual viewport.
       * @param {jQuery} $menuItem The parent menu item containing the submenu.
       */
      adjustSubmenu: function ($menuItem) {
        var menuHeaderHeight, menutop, topPos, winHeight,
          bottomOffset, subMenuHeight, popOutMenuHeight, borderWidth, scroll_theme,
          $submenu = $menuItem.children('ul:first'),
          ul = $submenu.clone(true);
  
        menuHeaderHeight = $('.main-menu-header').height();
        menutop = $menuItem.position().top;
        winHeight = $window.height() - $('.header-navbar').height();
        borderWidth = 0;
        subMenuHeight = $submenu.height();
  
        if (parseInt($menuItem.css("border-top"), 10) > 0) {
          borderWidth = parseInt($menuItem.css("border-top"), 10);
        }
  
        popOutMenuHeight = winHeight - menutop - $menuItem.height() - 30;
        scroll_theme = ($('.main-menu').hasClass('menu-dark')) ? 'light' : 'dark';
  
        topPos = menutop + $menuItem.height() + borderWidth;
  
        ul.addClass('menu-popout').appendTo('.main-menu-content').css({
          'top': topPos,
          'position': 'fixed',
          'max-height': popOutMenuHeight,
        });
  
        var menu_content = new PerfectScrollbar('.main-menu-content > ul.menu-content', {
          wheelPropagation: false
        });
      },
  
      collapse: function ($listItem, callback) {
        var $subList = $listItem.children('ul');
  
        $subList.show().slideUp($.app.nav.config.speed, function () {
          $(this).css('display', '');
  
          $(this).find('> li').removeClass('is-shown');
  
          if (callback) {
            callback();
          }
  
          $.app.nav.container.trigger('collapsed.app.menu');
        });
      },
  
      expand: function ($listItem, callback) {
        var $subList = $listItem.children('ul');
        var $children = $subList.children('li').addClass('is-hidden');
  
        $subList.hide().slideDown($.app.nav.config.speed, function () {
          $(this).css('display', '');
  
          if (callback) {
            callback();
          }
  
          $.app.nav.container.trigger('expanded.app.menu');
        });
  
        setTimeout(function () {
          $children.addClass('is-shown');
          $children.removeClass('is-hidden');
        }, 0);
      },
  
      refresh: function () {
        $.app.nav.container.find('.open').removeClass('open');
      },
    };
  
  
  
  // We listen to the resize event
  window.addEventListener('resize', function() {
    // We execute the same script as before
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + "px");
  });

}

export function app() {
    /*=========================================================================================
  File Name: app.js
  Description: Template related app JS.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

(function (window, document, $) {
    "use strict";
    var $html = $("html");
    var $body = $("body");
    var $danger = "#ea5455";
    var $primary = "#7367f0";
    var $textcolor = "#4e5154";
  
    $(window).on("load", function () {
      var rtl;
      var compactMenu = false; // Set it to true, if you want default menu to be compact
  
      if ($body.hasClass("menu-collapsed")) {
        compactMenu = true;
      }
  
      if ($("html").data("textdirection") == "rtl") {
        rtl = true;
      }
  
      setTimeout(function () {
        $html.removeClass("loading").addClass("loaded");
      }, 1200);
  
      $.app.menu.init(compactMenu);
  
      // Navigation configurations
      var config = {
        speed: 300 // set speed to expand / collpase menu
      };
      if ($.app.nav.initialized === false) {
        $.app.nav.init(config);
      }
  
      Unison.on("change", function (bp) {
        $.app.menu.change();
      });
  
      // Tooltip Initialization
      $('[data-toggle="tooltip"]').tooltip({
        container: "body"
      });
  
      // Top Navbars - Hide on Scroll
      if ($(".navbar-hide-on-scroll").length > 0) {
        $(".navbar-hide-on-scroll.fixed-top").headroom({
          offset: 205,
          tolerance: 5,
          classes: {
            // when element is initialised
            initial: "headroom",
            // when scrolling up
            pinned: "headroom--pinned-top",
            // when scrolling down
            unpinned: "headroom--unpinned-top"
          }
        });
        // Bottom Navbars - Hide on Scroll
        $(".navbar-hide-on-scroll.fixed-bottom").headroom({
          offset: 205,
          tolerance: 5,
          classes: {
            // when element is initialised
            initial: "headroom",
            // when scrolling up
            pinned: "headroom--pinned-bottom",
            // when scrolling down
            unpinned: "headroom--unpinned-bottom"
          }
        });
      }
  
      // Collapsible Card
      $('a[data-action="collapse"]').on("click", function (e) {
        e.preventDefault();
        $(this)
          .closest(".card")
          .children(".card-content")
          .collapse("toggle");
        // Adding bottom padding on card collapse
        $(this)
          .closest(".card")
          .children(".card-header")
          .css("padding-bottom", "1.5rem");
        $(this)
          .closest(".card")
          .find('[data-action="collapse"]')
          .toggleClass("rotate");
      });
  
      // Toggle fullscreen
      $('a[data-action="expand"]').on("click", function (e) {
        e.preventDefault();
        $(this)
          .closest(".card")
          .find('[data-action="expand"] i')
          .toggleClass("icon-maximize icon-minimize");
        $(this)
          .closest(".card")
          .toggleClass("card-fullscreen");
      });
  
      //  Notifications & messages scrollable
      $(".scrollable-container").each(function () {
        var scrollable_container = new PerfectScrollbar($(this)[0], {
          wheelPropagation: false
        });
      });
  
      // Reload Card
      $('a[data-action="reload"]').on("click", function () {
        var block_ele = $(this)
          .closest(".card")
          .find(".card-content");
        var reloadActionOverlay;
        if ($body.hasClass("dark-layout")) {
          var reloadActionOverlay = "#10163a";
        } else {
          var reloadActionOverlay = "#fff";
        }
        // Block Element
        block_ele.block({
          message: '<div class="feather icon-refresh-cw icon-spin font-medium-2 text-primary"></div>',
          timeout: 2000, //unblock after 2 seconds
          overlayCSS: {
            backgroundColor: reloadActionOverlay,
            cursor: "wait"
          },
          css: {
            border: 0,
            padding: 0,
            backgroundColor: "none"
          }
        });
      });
  
      // Close Card
      $('a[data-action="close"]').on("click", function () {
        $(this).closest(".card").removeClass().slideUp("fast");
      });
  
      // Match the height of each card in a row
      setTimeout(function () {
        $(".row.match-height").each(function () {
          $(this).find(".card").not(".card .card").matchHeight(); // Not .card .card prevents collapsible cards from taking height
        });
      }, 500);
  
      $('.card .heading-elements a[data-action="collapse"]').on(
        "click",
        function () {
          var $this = $(this),
            card = $this.closest(".card");
          var cardHeight;
  
          if (parseInt(card[0].style.height, 10) > 0) {
            cardHeight = card.css("height");
            card.css("height", "").attr("data-height", cardHeight);
          } else {
            if (card.data("height")) {
              cardHeight = card.data("height");
              card.css("height", cardHeight).attr("data-height", "");
            }
          }
        }
      );
  
      // Add sidebar group active class to active menu
      $(".main-menu-content").find("li.active").parents("li").addClass("sidebar-group-active");
  
      // Add open class to parent list item if subitem is active except compact menu
      var menuType = $body.data("menu");
      if (menuType != "horizontal-menu" && compactMenu === false) {
        $(".main-menu-content").find("li.active").parents("li").addClass("open");
      }
      if (menuType == "horizontal-menu") {
        $(".main-menu-content").find("li.active").parents("li:not(.nav-item)").addClass("open");
        $(".main-menu-content").find('li.active').closest('li.nav-item').addClass('sidebar-group-active open');
        // $(".main-menu-content")
        //   .find("li.active")
        //   .parents("li")
        //   .addClass("active");
      }
  
      //card heading actions buttons small screen support
      $(".heading-elements-toggle").on("click", function () {
        $(this)
          .next(".heading-elements")
          .toggleClass("visible");
      });
  
      //  Dynamic height for the chartjs div for the chart animations to work
      var chartjsDiv = $(".chartjs"),
        canvasHeight = chartjsDiv.children("canvas").attr("height"),
        mainMenu = $(".main-menu");
      chartjsDiv.css("height", canvasHeight);
  
      if ($body.hasClass("boxed-layout")) {
        if ($body.hasClass("vertical-overlay-menu")) {
          var menuWidth = mainMenu.width();
          var contentPosition = $(".app-content").position().left;
          var menuPositionAdjust = contentPosition - menuWidth;
          if ($body.hasClass("menu-flipped")) {
            mainMenu.css("right", menuPositionAdjust + "px");
          } else {
            mainMenu.css("left", menuPositionAdjust + "px");
          }
        }
      }
  
      //Custom File Input
      $(".custom-file input").change(function (e) {
        $(this)
          .next(".custom-file-label")
          .html(e.target.files[0].name);
      });
  
      /* Text Area Counter Set Start */
  
      $(".char-textarea").on("keyup", function (event) {
        checkTextAreaMaxLength(this, event);
        // to later change text color in dark layout
        $(this).addClass("active");
      });
  
      /*
      Checks the MaxLength of the Textarea
      -----------------------------------------------------
      @prerequisite:  textBox = textarea dom element
              e = textarea event
                      length = Max length of characters
      */
      function checkTextAreaMaxLength(textBox, e) {
        var maxLength = parseInt($(textBox).data("length")),
          counterValue = $(".counter-value"),
          charTextarea = $(".char-textarea");
  
        if (!checkSpecialKeys(e)) {
          if (textBox.value.length < maxLength - 1)
            textBox.value = textBox.value.substring(0, maxLength);
        }
        $(".char-count").html(textBox.value.length);
  
        if (textBox.value.length > maxLength) {
          counterValue.css("background-color", $danger);
          charTextarea.css("color", $danger);
          // to change text color after limit is maxedout out
          charTextarea.addClass("max-limit");
        } else {
          counterValue.css("background-color", $primary);
          charTextarea.css("color", $textcolor);
          charTextarea.removeClass("max-limit");
        }
  
        return true;
      }
      /*
      Checks if the keyCode pressed is inside special chars
      -------------------------------------------------------
      @prerequisite:  e = e.keyCode object for the key pressed
      */
      function checkSpecialKeys(e) {
        if (
          e.keyCode != 8 &&
          e.keyCode != 46 &&
          e.keyCode != 37 &&
          e.keyCode != 38 &&
          e.keyCode != 39 &&
          e.keyCode != 40
        )
          return false;
        else return true;
      }
  
      $(".content-overlay").on("click", function () {
        $(".search-list").removeClass("show");
        $(".app-content").removeClass("show-overlay");
        $(".bookmark-wrapper .bookmark-input").removeClass("show");
      });
  
      // To show shadow in main menu when menu scrolls
      var container = document.getElementsByClassName("main-menu-content");
      if (container.length > 0) {
        container[0].addEventListener("ps-scroll-y", function () {
          if (
            $(this)
            .find(".ps__thumb-y")
            .position().top > 0
          ) {
            $(".shadow-bottom").css("display", "block");
          } else {
            $(".shadow-bottom").css("display", "none");
          }
        });
      }
    });
  
    // Hide overlay menu on content overlay click on small screens
    $(document).on("click", ".sidenav-overlay", function (e) {
      // Hide menu
      $.app.menu.hide();
      return false;
    });
  
    // Execute below code only if we find hammer js for touch swipe feature on small screen
    if (typeof Hammer !== "undefined") {
      // Swipe menu gesture
      var swipeInElement = document.querySelector(".drag-target");
  
      if ($(swipeInElement).length > 0) {
        var swipeInMenu = new Hammer(swipeInElement);
  
        swipeInMenu.on("panright", function (ev) {
          if ($body.hasClass("vertical-overlay-menu")) {
            $.app.menu.open();
            return false;
          }
        });
      }
  
      // menu swipe out gesture
      setTimeout(function () {
        var swipeOutElement = document.querySelector(".main-menu");
        var swipeOutMenu;
  
        if ($(swipeOutElement).length > 0) {
          swipeOutMenu = new Hammer(swipeOutElement);
  
          swipeOutMenu.get("pan").set({
            direction: Hammer.DIRECTION_ALL,
            threshold: 100
          });
  
          swipeOutMenu.on("panleft", function (ev) {
            if ($body.hasClass("vertical-overlay-menu")) {
              $.app.menu.hide();
              return false;
            }
          });
        }
      }, 300);
  
      // menu overlay swipe out gestrue
      var swipeOutOverlayElement = document.querySelector(".sidenav-overlay");
  
      if ($(swipeOutOverlayElement).length > 0) {
        var swipeOutOverlayMenu = new Hammer(swipeOutOverlayElement);
  
        swipeOutOverlayMenu.on("panleft", function (ev) {
          if ($body.hasClass("vertical-overlay-menu")) {
            $.app.menu.hide();
            return false;
          }
        });
      }
    }
  
    $(document).on("click", ".menu-toggle, .modern-nav-toggle", function (e) {
      e.preventDefault();
  
      // Toggle menu
      $.app.menu.toggle();
  
      setTimeout(function () {
        $(window).trigger("resize");
      }, 200);
  
      if ($("#collapse-sidebar-switch").length > 0) {
        setTimeout(function () {
          if ($body.hasClass("menu-expanded") || $body.hasClass("menu-open")) {
            $("#collapse-sidebar-switch").prop("checked", false);
          } else {
            $("#collapse-sidebar-switch").prop("checked", true);
          }
        }, 50);
      }
  
      // Hides dropdown on click of menu toggle
      // $('[data-toggle="dropdown"]').dropdown('hide');
  
      // Hides collapse dropdown on click of menu toggle
      if (
        $(".vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse").hasClass("show")
      ) {
        $(".vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse").removeClass("show");
      }
  
      return false;
    });
  
    // Add Children Class
    $(".navigation")
      .find("li")
      .has("ul")
      .addClass("has-sub");
  
    $(".carousel").carousel({
      interval: 2000
    });
  
    // Page full screen
    $(".nav-link-expand").on("click", function (e) {
      if (typeof screenfull != "undefined") {
        if (screenfull.isEnabled) {
          screenfull.toggle();
        }
      }
    });
    if (typeof screenfull != "undefined") {
      if (screenfull.isEnabled) {
        $(document).on(screenfull.raw.fullscreenchange, function () {
          if (screenfull.isFullscreen) {
            $(".nav-link-expand")
              .find("i")
              .toggleClass("icon-minimize icon-maximize");
            $("html").addClass("full-screen");
          } else {
            $(".nav-link-expand")
              .find("i")
              .toggleClass("icon-maximize icon-minimize");
            $("html").removeClass("full-screen");
          }
        });
      }
    }
    $(document).ready(function () {
      /**********************************
       *   Form Wizard Step Icon
       **********************************/
      $(".step-icon").each(function () {
        var $this = $(this);
        if ($this.siblings("span.step").length > 0) {
          $this.siblings("span.step").empty();
          $(this).appendTo($(this).siblings("span.step"));
        }
      });
    });
  
    // Update manual scroller when window is resized
    $(window).resize(function () {
      $.app.menu.manualScroller.updateHeight();
    });
  
    $("#sidebar-page-navigation").on("click", "a.nav-link", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var $this = $(this),
        href = $this.attr("href");
      var offset = $(href).offset();
      var scrollto = offset.top - 80; // minus fixed header height
      $("html, body").animate({
          scrollTop: scrollto
        },
        0
      );
      setTimeout(function () {
        $this
          .parent(".nav-item")
          .siblings(".nav-item")
          .children(".nav-link")
          .removeClass("active");
        $this.addClass("active");
      }, 100);
    });
  
    // main menu internationalization
  
    // init i18n and load language file
    i18next.use(window.i18nextXHRBackend).init({
        debug: false,
        fallbackLng: "en",
        backend: {
          loadPath: "assets/data/locales/{{lng}}.json"
        },
        returnObjects: true
      },
      function (err, t) {
        // resources have been loaded
        jqueryI18next.init(i18next, $);
      }
    );
  
    // change language according to data-language of dropdown item
    $(".dropdown-language .dropdown-item").on("click", function () {
      var $this = $(this);
      $this.siblings(".selected").removeClass("selected");
      $this.addClass("selected");
      var selectedLang = $this.text();
      var selectedFlag = $this.find(".flag-icon").attr("class");
      $("#dropdown-flag .selected-language").text(selectedLang);
      $("#dropdown-flag .flag-icon")
        .removeClass()
        .addClass(selectedFlag);
      var currentLanguage = $this.data("language");
      i18next.changeLanguage(currentLanguage, function (err, t) {
        $(".main-menu, .horizontal-menu-wrapper").localize();
      });
    });
  
    /********************* Bookmark & Search ***********************/
    // This variable is used for mouseenter and mouseleave events of search list
    var $filename = $(".search-input input").data("search"),
      bookmarkWrapper = $(".bookmark-wrapper"),
      bookmarkStar = $(".bookmark-wrapper .bookmark-star"),
      bookmarkInput = $(".bookmark-wrapper .bookmark-input"),
      navLinkSearch = $(".nav-link-search"),
      searchInput = $(".search-input"),
      searchInputInputfield = $(".search-input input"),
      searchList = $(".search-input .search-list"),
      appContent = $(".app-content"),
      bookmarkSearchList = $(".bookmark-input .search-list");
  
    // Bookmark icon click
    bookmarkStar.on("click", function (e) {
      e.stopPropagation();
      bookmarkInput.toggleClass("show");
      bookmarkInput.find("input").val("");
      bookmarkInput.find("input").blur();
      bookmarkInput.find("input").focus();
      bookmarkWrapper.find(".search-list").addClass("show");
  
      var arrList = $("ul.nav.navbar-nav.bookmark-icons li"),
        $arrList = "",
        $activeItemClass = "";
  
      $("ul.search-list li").remove();
  
      for (var i = 0; i < arrList.length; i++) {
        if (i === 0) {
          $activeItemClass = "current_item";
        } else {
          $activeItemClass = "";
        }
        $arrList +=
          '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' +
          $activeItemClass +
          '">' +
          '<a class="d-flex align-items-center justify-content-between w-100" href=' +
          arrList[i].firstChild.href +
          ">" +
          '<div class="d-flex justify-content-start align-items-center">' +
          '<span class="mr-75 ' +
          arrList[i].firstChild.firstChild.className +
          '"  data-icon="' +
          arrList[i].firstChild.firstChild.className +
          '"></span>' +
          "<span>" +
          arrList[i].firstChild.dataset.originalTitle +
          "</span>" +
          "</div>" +
          '<span class="float-right bookmark-icon feather icon-star warning"></span>' +
          "</a>" +
          "</li>";
      }
      $("ul.search-list").append($arrList);
    });
  
    // Navigation Search area Open
    navLinkSearch.on("click", function () {
      var $this = $(this);
      var searchInput = $(this).parent(".nav-search").find(".search-input");
      searchInput.addClass("open");
      searchInputInputfield.focus();
      searchList.find("li").remove();
      bookmarkInput.removeClass("show");
    });
  
    // Navigation Search area Close
    $(".search-input-close i").on("click", function () {
      var $this = $(this),
        searchInput = $(this).closest(".search-input");
      if (searchInput.hasClass("open")) {
        searchInput.removeClass("open");
        searchInputInputfield.val("");
        searchInputInputfield.blur();
        searchList.removeClass("show");
        appContent.removeClass("show-overlay");
      }
    });
  
    // Filter
    if ($('.search-list-main').length) {
      var searchListMain = new PerfectScrollbar(".search-list-main", {
        wheelPropagation: false
      });
    }
    if ($('.search-list-bookmark').length) {
      var searchListBookmark = new PerfectScrollbar(".search-list-bookmark", {
        wheelPropagation: false
      });
    }
    // update Perfect Scrollbar on hover
    $(".search-list-main").mouseenter(function () {
      searchListMain.update();
    });
  
    searchInputInputfield.on("keyup", function (e) {
      $(this).closest(".search-list").addClass("show");
      if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 13) {
        if (e.keyCode == 27) {
          appContent.removeClass("show-overlay");
          bookmarkInput.find("input").val("");
          bookmarkInput.find("input").blur();
          searchInputInputfield.val("");
          searchInputInputfield.blur();
          searchInput.removeClass("open");
          if (searchInput.hasClass("show")) {
            $(this).removeClass("show");
            searchInput.removeClass("show");
          }
        }
  
        // Define variables
        var value = $(this).val().toLowerCase(), //get values of input on keyup
          activeClass = "",
          bookmark = false,
          liList = $("ul.search-list li"); // get all the list items of the search
        liList.remove();
        // To check if current is bookmark input
        if (
          $(this)
          .parent()
          .hasClass("bookmark-input")
        ) {
          bookmark = true;
        }
  
        // If input value is blank
        if (value != "") {
          appContent.addClass("show-overlay");
  
          // condition for bookmark and search input click
          if (bookmarkInput.focus()) {
            bookmarkSearchList.addClass("show");
          } else {
            searchList.addClass("show");
            bookmarkSearchList.removeClass("show");
          }
          if (bookmark === false) {
            searchList.addClass("show");
            bookmarkSearchList.removeClass("show");
          }
  
          var $startList = "",
            $otherList = "",
            $htmlList = "",
            $bookmarkhtmlList = "",
            $pageList = '<li class=" d-flex align-items-center">' +
            '<a href="#" class="pb-25">' +
            '<h6 class="text-primary mb-0">Pages</h6>' +
            '</a>' +
            '</li>',
            $activeItemClass = "",
            $bookmarkIcon = "",
            $defaultList = "",
            a = 0;
  
          // getting json data from file for search results
          $.getJSON("assets/data/" + $filename + ".json", function (
            data
          ) {
            for (var i = 0; i < data.listItems.length; i++) {
              // if current is bookmark then give class to star icon
              if (bookmark === true) {
                activeClass = ""; // resetting active bookmark class
                var arrList = $("ul.nav.navbar-nav.bookmark-icons li"),
                  $arrList = "";
                // Loop to check if current seach value match with the bookmarks already there in navbar
                for (var j = 0; j < arrList.length; j++) {
                  if (
                    data.listItems[i].name ===
                    arrList[j].firstChild.dataset.originalTitle
                  ) {
                    activeClass = " warning";
                    break;
                  } else {
                    activeClass = "";
                  }
                }
                $bookmarkIcon =
                  '<span class="float-right bookmark-icon feather icon-star' +
                  activeClass +
                  '"></span>';
              }
              // Search list item start with entered letters and create list
              if (
                data.listItems[i].name.toLowerCase().indexOf(value) == 0 &&
                a < 5
              ) {
                if (a === 0) {
                  $activeItemClass = "current_item";
                } else {
                  $activeItemClass = "";
                }
                $startList +=
                  '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' +
                  $activeItemClass +
                  '">' +
                  '<a class="d-flex align-items-center justify-content-between w-100" href=' +
                  data.listItems[i].url +
                  ">" +
                  '<div class="d-flex justify-content-start align-items-center">' +
                  '<span class="mr-75 ' +
                  data.listItems[i].icon +
                  '" data-icon="' +
                  data.listItems[i].icon +
                  '"></span>' +
                  "<span>" +
                  data.listItems[i].name +
                  "</span>" +
                  "</div>" +
                  $bookmarkIcon +
                  "</a>" +
                  "</li>";
                a++;
              }
            }
            for (var i = 0; i < data.listItems.length; i++) {
              if (bookmark === true) {
                activeClass = ""; // resetting active bookmark class
                var arrList = $("ul.nav.navbar-nav.bookmark-icons li"),
                  $arrList = "";
                // Loop to check if current seach value match with the bookmarks already there in navbar
                for (var j = 0; j < arrList.length; j++) {
                  if (
                    data.listItems[i].name ===
                    arrList[j].firstChild.dataset.originalTitle
                  ) {
                    activeClass = " warning";
                  } else {
                    activeClass = "";
                  }
                }
                $bookmarkIcon =
                  '<span class="float-right bookmark-icon feather icon-star' +
                  activeClass +
                  '"></span>';
              }
              // Search list item not start with letters and create list
              if (
                !(data.listItems[i].name.toLowerCase().indexOf(value) == 0) &&
                data.listItems[i].name.toLowerCase().indexOf(value) > -1 &&
                a < 5
              ) {
                if (a === 0) {
                  $activeItemClass = "current_item";
                } else {
                  $activeItemClass = "";
                }
                $otherList +=
                  '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' +
                  $activeItemClass +
                  '">' +
                  '<a class="d-flex align-items-center justify-content-between w-100" href=' +
                  data.listItems[i].url +
                  ">" +
                  '<div class="d-flex justify-content-start align-items-center">' +
                  '<span class="mr-75 ' +
                  data.listItems[i].icon +
                  '" data-icon="' +
                  data.listItems[i].icon +
                  '"></span>' +
                  "<span>" +
                  data.listItems[i].name +
                  "</span>" +
                  "</div>" +
                  $bookmarkIcon +
                  "</a>" +
                  "</li>";
                a++;
              }
            }
            $defaultList = $(".main-search-list-defaultlist").html();
            if ($startList == "" && $otherList == "") {
              $otherList = $(".main-search-list-defaultlist-other-list").html();
            }
            // concatinating startlist, otherlist, defalutlist with pagelist
            $htmlList = $pageList.concat($startList, $otherList, $defaultList);
            $("ul.search-list").html($htmlList);
            // concatinating otherlist with startlist
            $bookmarkhtmlList = $startList.concat($otherList);
            $("ul.search-list-bookmark").html($bookmarkhtmlList);
          });
        } else {
          if (bookmark === true) {
            var arrList = $("ul.nav.navbar-nav.bookmark-iconss li"),
              $arrList = "";
            for (var i = 0; i < arrList.length; i++) {
              if (i === 0) {
                $activeItemClass = "current_item";
              } else {
                $activeItemClass = "";
              }
              $arrList +=
                '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer">' +
                '<a class="d-flex align-items-center justify-content-between w-100" href=' +
                arrList[i].firstChild.href +
                ">" +
                '<div class="d-flex justify-content-start align-items-center">' +
                '<span class="mr-75 ' +
                arrList[i].firstChild.firstChild.className +
                '"  data-icon="' +
                arrList[i].firstChild.firstChild.className +
                '"></span>' +
                "<span>" +
                arrList[i].firstChild.dataset.originalTitle +
                "</span>" +
                "</div>" +
                '<span class="float-right bookmark-icon feather icon-star warning"></span>' +
                "</a>" +
                "</li>";
            }
            $("ul.search-list").append($arrList);
          } else {
            // if search input blank, hide overlay
            if (appContent.hasClass("show-overlay")) {
              appContent.removeClass("show-overlay");
            }
            // If filter box is empty
            if (searchList.hasClass("show")) {
              searchList.removeClass("show");
            }
          }
        }
      }
    });
  
    // Add class on hover of the list
    $(document).on("mouseenter", ".search-list li", function (e) {
      $(this)
        .siblings()
        .removeClass("current_item");
      $(this).addClass("current_item");
    });
    $(document).on("click", ".search-list li", function (e) {
      e.stopPropagation();
    });
  
    $("html").on("click", function ($this) {
      if (!$($this.target).hasClass("bookmark-icon")) {
        if (bookmarkSearchList.hasClass("show")) {
          bookmarkSearchList.removeClass("show");
        }
        if (bookmarkInput.hasClass("show")) {
          bookmarkInput.removeClass("show");
        }
      }
    });
  
    // Prevent closing bookmark dropdown on input textbox click
    $(document).on("click", ".bookmark-input input", function (e) {
      bookmarkInput.addClass("show");
      bookmarkSearchList.addClass("show");
    });
  
    // Favorite star click
    $(document).on("click", ".bookmark-input .search-list .bookmark-icon", function (e) {
      e.stopPropagation();
      if ($(this).hasClass("warning")) {
        $(this).removeClass("warning");
        var arrList = $("ul.nav.navbar-nav.bookmark-icons li");
        for (var i = 0; i < arrList.length; i++) {
          if (
            arrList[i].firstChild.dataset.originalTitle ==
            $(this).parent()[0].innerText
          ) {
            arrList[i].remove();
          }
        }
        e.preventDefault();
      } else {
        var arrList = $("ul.nav.navbar-nav.bookmark-icons li");
        $(this).addClass("warning");
        e.preventDefault();
        var $url = $(this).parent()[0].href,
          $name = $(this).parent()[0].innerText,
          $icon = $(this).parent()[0].firstChild.firstChild.dataset.icon,
          $listItem = "",
          $listItemDropdown = "";
        $listItem =
          '<li class="nav-item d-none d-lg-block">' +
          '<a class="nav-link" href="' +
          $url +
          '" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
          $name +
          '">' +
          '<i class="ficon ' +
          $icon +
          '"></i>' +
          "</a>" +
          "</li>";
        $("ul.nav.bookmark-icons").append($listItem);
        $('[data-toggle="tooltip"]').tooltip();
      }
    });
  
    // If we use up key(38) Down key (40) or Enter key(13)
    $(window).on("keydown", function (e) {
      var $current = $(".search-list li.current_item"),
        $next,
        $prev;
      if (e.keyCode === 40) {
        $next = $current.next();
        $current.removeClass("current_item");
        $current = $next.addClass("current_item");
      } else if (e.keyCode === 38) {
        $prev = $current.prev();
        $current.removeClass("current_item");
        $current = $prev.addClass("current_item");
      }
  
      if (e.keyCode === 13 && $(".search-list li.current_item").length > 0) {
        var selected_item = $(".search-list li.current_item a");
        window.location = selected_item.attr("href");
        $(selected_item).trigger("click");
      }
    });
  
    // Waves Effect
    Waves.init();
    Waves.attach(".btn", ["waves-light"]);
  })(window, document, jQuery);
  
}

export function component() {
    /*=========================================================================================
  File Name: Components.js
  Description: For Generic Components.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

(function (window, document, $) {
    /***** Component Variables *****/
    var alertValidationInput = $(".alert-validation"),
      alertRegex = /^[0-9]+$/,
      alertValidationMsg = $(".alert-validation-msg"),
      accordion = $(".accordion"),
      collapseTitle = $(".collapse-title"),
      collapseHoverTitle = $(".collapse-hover-title"),
      dropdownMenuIcon = $(".dropdown-icon-wrapper .dropdown-item");
  
    /***** Alerts *****/
    /* validation with alert */
    alertValidationInput.on('input', function () {
      if (alertValidationInput.val().match(alertRegex)) {
        alertValidationMsg.css("display", "none");
      } else {
        alertValidationMsg.css("display", "block");
      }
    });
  
    /***** Carousel *****/
    // For Carousel With Enabled Keyboard Controls
    $(document).on("keyup", function (e) {
      if (e.which == 39) {
        $('.carousel[data-keyboard="true"]').carousel('next');
      } else if (e.which == 37) {
        $('.carousel[data-keyboard="true"]').carousel('prev');
      }
    })
  
    // To open Collapse on hover
    if (accordion.attr("data-toggle-hover", "true")) {
      collapseHoverTitle.closest(".card").on("mouseenter", function () {
        $(this).children(".collapse").collapse("show");
      });
    }
    // Accordion with Shadow - When Collapse open
    $('.accordion-shadow .collapse-header .card-header').on("click", function () {
      var $this = $(this);
      $this.parent().siblings(".collapse-header.open").removeClass("open");
      $this.parent(".collapse-header").toggleClass("open");
    });
  
    /***** Dropdown *****/
    // For Dropdown With Icons
    dropdownMenuIcon.on("click", function () {
      $(".dropdown-icon-wrapper .dropdown-toggle i").remove();
      $(this).find("i").clone().appendTo(".dropdown-icon-wrapper .dropdown-toggle");
      $(".dropdown-icon-wrapper .dropdown-toggle .dropdown-item").removeClass("dropdown-item");
    });
  +
  
  
    /***** Chips *****/
    // To close chips
    $('.chip-closeable').on('click', function () {
      $(this).closest('.chip').remove();
    })
  })(window, document, jQuery);
  
}