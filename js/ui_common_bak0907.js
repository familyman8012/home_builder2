/* 메뉴설정 */
function newOwl() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        autoplay: 5000

    });
}

newOwl();

/* 섹션간 sort */
function newSortList(target) {
    newSort = new Sortable(eval(target), {
        swap: true, // Enable swap plugin
        swapClass: 'highlight', // The class applied to the hovered swap item
        animation: 150,

    });
}

if (!$('#list1').hasClass('wrap_fullpage')) {
    newSortList(list1);
}


/*  가로 요소 sort */
function newGridList(target) {
    newGridsort = new Sortable(eval(target), {
        animation: 150,
        ghostClass: 'blue-background-class'
    });
}


function gridAreaCreate() {
    var gridIndex = $('.wrap_grid').length;
    $('.grid_item').each(function (index, element) {
        $(this).attr('id', 'grid' + (index + 1));
    });

    for (var i = 1; i <= gridIndex; i++) {
        newGridList('grid' + i);
    }
}

gridAreaCreate();


/* 요소추가 */
$(function () {
    includeLayout();
});

function includeLayout() {
    var includeArea = $('[data-include]');
    var self, url;
    $.each(includeArea, function () {
        self = $(this);
        url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");
        });
    });
}

function includeLayout2() {
    var includeArea = $('[data-include]');
    var self, url;
    $.each(includeArea, function () {
        self = $(this);
        url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");
            gridAreaCreate();
        });
    });

}

function includeLayout_mainvis() {
    var includeArea = $('[data-include]');
    var self, url;
    $.each(includeArea, function () {
        self = $(this);
        url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");
            $('.owl-carousel').owlCarousel('destroy');
            newOwl();
            var mainVideoRatio = 1907 / 1074;

            var mainVideoRatioInit = $(window).width() / mainVideoRatio;
            $('.wrap_mainmovie_area iframe').css({
                height: $(window).width() / mainVideoRatio
            });
            (function ($, sr) {
                var debounce = function (func, threshold, execAsap) {
                    var timeout;
                    return function debounced() {
                        var obj = this, args = arguments;
                        function delayed() {
                            if (!execAsap)
                                func.apply(obj, args);
                            timeout = null;
                        };
                        if (timeout)
                            clearTimeout(timeout);
                        else if (execAsap)
                            func.apply(obj, args);
                        timeout = setTimeout(delayed, threshold || 400);
                    };
                }
                // smartresize
                jQuery.fn[sr] = function (fn) {
                    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
                };
            })(jQuery, 'smartresize');
            $(window).smartresize(function () {
                var mainVideoRatio = 1907 / 1074;
                var mainVideoRatioInit = $(window).width() / mainVideoRatio;
                $('.wrap_mainmovie_area iframe').css({
                    height: $(window).width() / mainVideoRatio
                });
            });
        });

    });
}

function includeLayout_designEl() {
    var includeArea = $('[data-include]');
    var self, url;
    $.each(includeArea, function () {
        self = $(this);
        url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");
        });
    });
}

function includeLayout_calendarEl() {
    var includeArea = $('[data-include]');
    var self, url;
    $.each(includeArea, function () {
        self = $(this);
        url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");
            calenderStart()
        });
    });
}

/* 오른쪽 마우스 클릭시 layer */
function rightClickMenu(rightlayerMenu) {
    $('body').contextmenu(function (e) {
        return false;
    });
    var winWidth = $(document).width();
    var winHeight = $(document).height();
    //Get pointer position:
    var posX = event.pageX;
    var posY = event.pageY;
    //Get contextmenu size:
    var menuWidth = rightlayerMenu.width();
    var menuHeight = rightlayerMenu.height();
    //Security margin:
    var secMargin = 10;
    //Prevent page overflow:
    if (posX + menuWidth + secMargin >= winWidth
        && posY + menuHeight + secMargin >= winHeight) {
        //Case 1: right-bottom overflow:
        posLeft = posX - menuWidth - secMargin + "px";
        posTop = posY - menuHeight - secMargin + "px";
    } else if (posX + menuWidth + secMargin >= winWidth) {
        //Case 2: right overflow:
        posLeft = posX - menuWidth - secMargin + "px";
        posTop = posY + secMargin + "px";
    } else if (posY + menuHeight + secMargin >= winHeight) {
        //Case 3: bottom overflow:
        posLeft = posX + secMargin + "px";
        posTop = posY - menuHeight - secMargin + "px";
    } else {
        //Case 4: default values:
        posLeft = posX + secMargin + "px";
        posTop = posY + secMargin + "px";
    }
}


/* 오른쪽 메뉴 */
$(document).ready(function () {
    $(document).on('mousedown', 'section', function (e) {
        e.stopPropagation();
        rightMenuSection($(this));
    }).on('mousedown', '.img_area', function (e) {
        e.stopPropagation();
        rightImgEdit($(this));
    }).on('mousedown', 'section .txt_area', function (e) {
        e.stopPropagation();
        if ($(this).closest('section').find('.main_visual ').length == 0) {
            rightMenuTxtEdit($(this));
        } else {
            rightMenuMainVis($(this));
        }
    }).on('mousedown', 'footer .txt_area', function (e) {
        e.stopPropagation();
        rightMenuTxtEdit($(this));
    }).on('mousedown', '.wrap_txt_area', function (e) {
        e.stopPropagation();
        rightTxtingEdit($(this));
    }).on('dblclick', 'section .txt_area', function (e) {
        e.stopPropagation();
        dbclickTxtingEdit($(this));
    }).on('dblclick', 'footer .txt_area', function (e) {
        e.stopPropagation();
        dbclickTxtingEdit($(this));
    })
        .on('mousedown', '.btn_area', function (e) {
            e.stopPropagation();
            rightMenuBtnEdit($(this));
        }).on('mousedown', 'header .logo', function (e) {
            e.stopPropagation();
            rightMenulogoEdit($(this));
        }).on('mousedown', 'footer .logo', function (e) {
            e.stopPropagation();
            rightFooterlogoEdit($(this));
        }).on('mousedown', '.login.on', function (e) {
            e.stopPropagation();
            rightMenulogin($(this));
        }).on('mousedown', '.wrap_search.on', function (e) {
            e.stopPropagation();
            rightMenuSearch($(this));
        }).on('mousedown', 'header', function (e) {
            e.stopPropagation();
            rightMenuHeader($(this));
        }).on('mousedown', '.main_visual', function (e) {
            e.stopPropagation();
            rightMenuMainVis($(this));
        }).on('mousedown', 'footer', function (e) {
            e.stopPropagation();
            rightMenuFooter($(this));
        }).on('mousedown', '.wrap_images_area', function (e) {
            e.stopPropagation();
            rightMenuImage($(this));
        }).on('mousedown', '.wrap_movie_area, .mask_youtube', function (e) {
            e.stopPropagation();
            rightMenuVideo($(this));
        }).on('mousedown', '.wrap_mainmovie_area .mask_mvis', function (e) {
            e.stopPropagation();
            rightMenuMainVideo($(this));
        }).on('mousedown', '.wrap_map_area', function (e) {
            e.stopPropagation();
            rightMenuMap($(this));
        }).on('mousedown', '.padding_sty2', function (e) {
            e.stopPropagation();
            rightMenuPadding($(this));
        }).on('mousedown', '.wrap_gallery ', function (e) {
            e.stopPropagation();
            rightMenuGallery($(this));
        })
});


/* 오른쪽 메뉴 */
function rightMenuSection(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        if ($('.note-editor').hasClass('note-airframe')) {
            saveTxtEditing();
        }
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu1"></div>');
        rightMenuSettion(el);
    }
}

function rightImgEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu2"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuTxtEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu3"></div>');
        rightMenuSettion(el);
    }
}

function rightTxtingEdit() {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $(document).contextmenu(function (e) {
            return true;
        });
    }
}

function rightMenuBtnEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();

        if (!(el.closest('.btn_area').find('.btn_add').length == 0)) {
            el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu4_2"></div>');
        } else {
            el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu4"></div>');
        }
        rightMenuSettion(el);
    }
}


function rightMenuSettion(el) {
    includeLayout()
    rightClickMenu($(".right-click-layer"));
    if ($('#list1').hasClass('wrap_fullpage')) {
        var transformMatrix = $('#fullpage').css("transform");
        var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
        var y = matrix[13] || matrix[5];
        el.children('.right-click-layer').css({
            "left": posLeft,
            "top": posTop,
            "marginTop": Math.abs(y) + 'px'
        }).show();
    }
    else {
        el.children('.right-click-layer').css({
            "left": posLeft,
            "top": posTop
        }).show();
    }
    $('body').click(function () {
        $('.right-click-layer').remove();
    });
}

function rightMenulogoEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu5"></div>');
        rightMenuSettion(el);
    }
}

function rightMenulogin(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu6"></div>');
        rightMenuSettion(el);
    }
}


function rightMenuSearch(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu7"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuHeader(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu8"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuMainVis(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu9"></div>');
        rightMenuSettion(el);
    }
}

function rightFooterlogoEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu10"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuFooter(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu11"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuImage(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu12"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuVideo(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu13"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuMainVideo(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu14"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuMap(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu15"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuPadding(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu16"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuGallery(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.html .right_menu17"></div>');
        rightMenuSettion(el);
    }
}



/* 레이어 팝업 section 위, 아래 순서 바꾸기 */
function sectionMoveDown(nowpos) {
    event.stopPropagation();
    if ($('#list1').hasClass('wrap_fullpage')) {
        var fpSectionBg = [];
        var addSlideNumber = $('.section.active').index();
        $('section').each(function (i, el) {
            fpSectionBg.push($(this).css('background-image'));
        });
        let tmp = fpSectionBg[addSlideNumber];
        fpSectionBg[addSlideNumber] = fpSectionBg[addSlideNumber + 1];
        fpSectionBg[addSlideNumber + 1] = tmp;
        $.fn.fullpage.destroy('all');
        nowpos.closest('section').before(nowpos.closest('section').next());
        $('#fullpage').fullpage({
            navigation: true,
            navigationPosition: 'right',
            verticalCentered: false
        });
        $('section').each(function (i, el) {
            $(this).css('background', fpSectionBg[i]);



        });
        $.fn.fullpage.silentMoveTo(addSlideNumber + 2);
    }
    else {
        nowpos.closest('section').before(nowpos.closest('section').next());
    }
    $('.right-click-layer').remove();
}

function sectionMoveUp(nowpos) {
    event.stopPropagation();
    if ($('#list1').hasClass('wrap_fullpage')) {
        var fpSectionBg = [];
        var addSlideNumber = $('.section.active').index();
        $('section').each(function (i, el) {
            fpSectionBg.push($(this).css('background-image'));
        });
        let tmp = fpSectionBg[addSlideNumber];
        fpSectionBg[addSlideNumber] = fpSectionBg[addSlideNumber - 1];
        fpSectionBg[addSlideNumber - 1] = tmp;
        $.fn.fullpage.destroy('all');
        nowpos.closest('section').after(nowpos.closest('section').prev());
        $('#fullpage').fullpage({
            navigation: true,
            navigationPosition: 'right',
            verticalCentered: false
        });
        $('section').each(function (i, el) {
            $(this).css('background', fpSectionBg[i]);
        });
        $.fn.fullpage.silentMoveTo(addSlideNumber);
    } else {
        nowpos.closest('section').after(nowpos.closest('section').prev());
    }
    $('.right-click-layer').remove();
}

function sectionBgLoad(nowpos) {
    var targetSection = nowpos.closest('section');
    $(".pop_area").load("include/popup.html .pop_section_bg", function () {
        
        document.querySelector('.mask').style.display = "block";

        checkOverHeader(); //mj 추가

        sectionBg(targetSection)
    });
}

//mj 추가, 수정 (fullpage 템플릿의 헤더가 마스크 엑스 버튼을 가리는 현상 보완)
function checkOverHeader(on) {// } mj 추가
    var over_header = document.querySelector('.header');

    if (over_header.classList.contains('over')) {
        if (on) {//설정창 닫고나서
            over_header.style.zIndex ="30";
        } else {
            over_header.style.zIndex = "0";
        }
    } 
}

function sectionDel(nowpos) {
    event.stopPropagation();
    if ($('#list1').hasClass('wrap_fullpage')) {
        var fpSectionBg = [];
        var addSlideNumber = $('.section.active').index();
        $('section').each(function (i, el) {
            fpSectionBg.push($(this).css('background-image'));
        });
        fpSectionBg.splice(addSlideNumber, 1);
        $.fn.fullpage.destroy('all');
        nowpos.closest('section').remove();
        $('section').each(function (i, el) {
            $(this).css('background', fpSectionBg[i]);
        });
        $('#fullpage').fullpage({
            navigation: true,
            navigationPosition: 'right',
            verticalCentered: false
        });
    } else {
        nowpos.closest('section').remove();
    }
    if ($('section').length == 0) {
        var emptyPage = '<section class="empty_page">'
        emptyPage += '<div class="inner_section">'
        emptyPage += '<i class="icon_emptyblock"><span class="blind">블록 아이콘</span></i>'
        emptyPage += '<p class="section_tit_center">위젯 또는 섹션을 추가해주세요.<i class="btn_add"></i></p>'
        emptyPage += '</div>'
        emptyPage += '</section>'
        $('#list1').append(emptyPage);
    }
}

function paddingDel(nowpos) {
    event.stopPropagation();
    nowpos.closest('.padding_sty2').remove();
}



/*  헤더영역 설정하기 */
$('.btn_all_menu').on('click', function () {
    $(".pop_area").load("include/popup.html .edit_all_menu", function () {
        $('.mask').show();
        menuSetting();
        newSortList(menuDepth1);
    });
});

$(document).ready(function () {
    if ($('.header .depth1_li').length > 5 && $('body').width() > 767) {
        $('.header, .mobile_header').addClass('leftmenu');
    } else {
        $('.header, .mobile_header').removeClass('leftmenu on');
    }
});
$(document).on('click', '.btn_leftmenu', function (event) {
    /* Act on the event */
    $('.header').addClass('on leftmenu');
    $('.mask').addClass('leftmenu').show();
    $('.list_depth2').hide();
    $('.depth1_li').eq(0).find('.list_depth2').show();

});
$(document).on('click', '.mask.leftmenu', function (event) {
    /* Act on the event */
    $('.header').removeClass('on');
    $('.mask').removeClass('leftmenu').hide();
});

$(document).on('click', '.search_area', function (event) {
    event.preventDefault();
    $('body').append('<section data-include="include/popup.html .search_container"></section>');
    includeLayout();
});

$(document).on('click', '.btn_close_schbox', function (event) {
    event.preventDefault();
    $(this).closest('section').remove();
});


/* 공통설정 메뉴 */
function headSty() {
    $(".pop_area").load("include/popup.html .set_header", function () {
        $('.mask').show();
        headStySel();
    });
}

function headStySel() {
    var headInit = $('header').attr('class');

    $('.set_header .btn').on('click', function () {
        var sty = ['normal', 'center', 'vertical'];
        var headBtnSelect = $(this).parent().index();
        $('header').removeClass('normal center vertical');
        $('header').addClass(sty[headBtnSelect]);
    });

    $('.set_header .btn_close').on('click', function () {
        $('header').removeAttr('class');
        $('header').addClass(headInit);
        $('.set_header').remove();
    });
    $('.set_header .btn_apply').on('click', function () {
        $('.mask').hide();
        $('.set_header').remove();
    });
}

/*  로고 설정하기 */

/* 이미지 미리보기 공용, 로고 및 불러오기 */
function readURL(input, chkpos, target1, target2) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (chkpos) {
                target1.attr('src', e.target.result);
            } else {
                target2.attr('src', e.target.result);
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function logoSetting(el) {
    var targetlogo = el.closest('.logo');
    var headerlogo = targetlogo.hasClass('header_logo');
    var targetlogoSel = targetlogo.find('.sel_logo');
    targetlogoSel.click();
    targetlogoSel.change(function () {
        readURL(this, headerlogo, $('.header .logoimg'), $('.footer .logoimg'));
    });


    targetlogo.find('.logoimg').removeClass('btn_add').removeAttr('onclick');
    targetlogo.find('.logoimg').show();
    targetlogo.find('.logo .txt').hide();
}

function logoTxtSetting() {
    $('.logoimg').hide();
    $('.logo .txt').show();
}

function logoDelSetting(el) {
    el.closest('.logo').find('.txt').hide();
    el.closest('.logo').find('.logoimg').addClass('btn_add').show().attr('src', 'images/btn_add.svg').attr('onclick', 'logoBtnAdd()');
}

function logoBtnAdd() {
    logoSetting($('.logoimg.btn_add'));
}

/*  로그인 설정하기 */
function loginDel() {
    $('.tool .login .txt').remove();
    $('.tool .login').removeClass('on').prepend('<img src="images/btn_add.svg" class="logoimg btn_add" alt="playkok" style="">')
}

function loginAdd() {
    $('.tool .login .btn_add').remove();
    $('.tool .login').addClass('on').prepend('<span class="txt">LOGIN</span>')
}

/*  검색 설정하기 */
function searchDel() {
    $('.tool .search_area').remove();
    $('.tool .wrap_search').removeClass('on').prepend('<img src="images/btn_add.svg" class="logoimg btn_add" alt="playkok" style="">')
}

function searchAdd() {
    $('.tool .wrap_search .btn_add').remove();
    $('.tool .wrap_search').addClass('on').prepend('<span class="search_area"></span>')
}

/* 공통설정 메뉴 */
$('.manage_option_page .btn_common_opt').on('click', function () {
    $(".pop_area").load("include/popup.html .common_edit", function () {
        $('.mask').show();
        h_builder_common($('.btn_click'))
    });
});

function menuSetting() {
    $('.edit_all_menu .set_list_depth1').append($('.gnb').find('.list_depth1').clone().attr('id', 'menuDepth1'));
    $('.edit_all_menu .depth1_li').each(function (index, el) {
        if ($(this).hasClass('on')) {
            $(this).attr('data-on', 'on');
        }
    });

    $('.edit_all_menu .list_depth1 li').removeClass('on');
    var init_el = $('.edit_all_menu .list_depth1 li').eq(0);
    init_el.addClass('on');
    $('#menu_name').val(init_el.find('.box_add_depth2 .menu_name').text());
    /*
    if (init_el.find('.txt').attr('href').indexOf('www') != -1) {
        $('#url_link').val(init_el.find('.txt').attr('href'));
    } else {
        $('#page_link').val(init_el.find('.txt').attr('href'));
    }
    */
    if (init_el.find('.txt').attr('target') == '_blank') {
        $('.edit_all_menu .newWindow').prop("checked", true);
    }
    if (init_el.hasClass('off')) {
        $('.edit_all_menu .displayis').prop("checked", true);
    }

    $('.edit_all_menu .set_list_depth1 a').each(function () {
        var elhref = $(this).attr('href');
        var eltarget = $(this).attr('target');
        var elClass = $(this).attr('class');
        $(this).contents().unwrap().wrap('<span href="' + elhref + '" target="' + eltarget + '" class="' + elClass + ' atag"></span>');
    });

    var depth2 = [].slice.call(document.querySelectorAll('.list_depth2'));
    for (var i = 0; i < depth2.length; i++) {
        var depth2Sort = new Sortable(depth2[i], {
            swap: true, // Enable swap plugin
            swapClass: 'highlight', // The class applied to the hovered swap item
            animation: 150,
        });
    }


    $(document).on('click', '.depth1_open_close', function () {

    });


    $(document).on('click', '.edit_all_menu .btn_del', function () {
        $('.pop_area').append('<section data-include="include/popup.html .pop_menudel"></section>');
        includeLayout();
    });
    $(document).on('click', '.edit_all_menu .btn_close', function () {
        $('.pop_menudel').remove();
        $('.edit_all_menu').remove();

    });
    $(document).on('click', '.pop_menudel .btn_cancle', function () {
        $('.pop_menudel').remove();
    });
    $(document).on('click', '.pop_menudel  .btn_del', function () {
        $('.pop_menudel').remove();
        $('.edit_all_menu .on').remove();
    });


    $(document).on('click', '.edit_all_menu .depth1_li', function (e) {
        e.stopPropagation();
        var loadMenuInfo = $(this).find('.txt');
        $('.edit_all_menu .btn_save').click();
        loadMenuSettion(loadMenuInfo, $(this));
    })


    $(document).on('click', '.edit_all_menu .depth2_li', function (e) {
        e.stopPropagation();
        var loadMenuInfo2 = $(this).find('.txt2');
        $('.edit_all_menu .btn_save').click();
        loadMenuSettion(loadMenuInfo2, $(this))
    })

    function thisMenuSave(el) {

        if ($('#url_link').val() != ' ') {
            el.attr('href', $('#url_link').val());
        }
        if ($('#page_link').val() != ' ') {
            el.attr('href', $('#page_link').val());
        }

        if ($('.displayis').is(":checked")) {
            $('.menu_area .on').addClass('off');
        } else {
            $('.menu_area .on').removeClass('off');
        }
        if ($('.newWindow').is(":checked")) {
            el.attr('target', '_blank');
        } else {
            el.removeAttr('target');
        }
    }

    $(document).on('click', '.btn_save', function () {
        if ($('.list_depth2 li').hasClass('on')) {
            thisMenuSave($('.on > .txt2'))
        } else {
            thisMenuSave($('.on  > .txt'))
        }
    });

    $(document).on('focus', '#page_link', function () {
        $('#url_link').val(' ');
    });
    $(document).on('focus', '#url_link', function () {
        $('#page_link').val(' ');
    });

    function loadMenuSettion(el1, el2) {
        $('#menu_name, #page_link, #url_link').val(' ');
        $('.edit_all_menu .newWindow').prop("checked", false);
        $('.edit_all_menu .displayis').prop("checked", false);
        $('.edit_all_menu').find('.on').removeClass('on');
        el2.addClass('on');

        $('#menu_name').val(el1.find('.menu_name').text());
        if (el1.attr('href').indexOf('www') != -1) {
            $('#url_link').val(el1.attr('href'));
        } else {
            $('#page_link').val(el1.attr('href'));
        }
        if (el1.attr('target') == '_blank') {
            $('.edit_all_menu .newWindow').prop("checked", true);
        }
        if (el2.hasClass('off')) {
            $('.edit_all_menu .displayis').prop("checked", true);
        }
    }


    $(document).on('click', '.edit_all_menu a', function () {
        return false;
    });
    $("#menu_name").on("change keyup paste", function (e) {
        e.stopPropagation();
        var currentTxt = $(this).val();
        if ($('.depth2_li').hasClass('on')) {
            $('.set_list_depth1 .on .txt2 .menu_name').text(currentTxt);
        } else {
            $('.set_list_depth1 .on .txt .menu_name').text(currentTxt);
        }

    });
    $("#page_link").on("focus", function () {
        if (!($(this).hasClass('on'))) {

            $(this).addClass('on');
            var selectMenu = $('.gnb li').clone();
            $('.select_page_link').show();
            $('.select_page_link .list').append(selectMenu);
        }
    });
    $("#page_link").on("focusout", function () {
        $(this).removeClass('on');
    });

    $(document).on('click', '.edit_all_menu', function () {
        if (!($(event.target).hasClass('page_link')) && !($(event.target).hasClass('select_page_link'))) {
            $('.select_page_link').hide();
        }
    });

    $(document).on('click', '.select_page_link a', function () {
        $("#page_link").val($(this).attr('href'));
        $('.select_page_link').hide();
    });

}

$(document).on('click', '.edit_all_menu .btn_apply', function () {

    if (!$('#list1').hasClass('wrap_fullpage')) {
        newSort.destroy();
    }
    $('.edit_all_menu .btn_save').click();
    $('.gnb .inner').empty().append($('.edit_all_menu').find('.list_depth1').clone().removeAttr('id'));
    $('.gnb .inner .atag').each(function () {
        var elhref = $(this).attr('href');
        var eltarget = $(this).attr('target');
        var elClass = $(this).attr('class');
        $(this).contents().unwrap().wrap('<a href="' + elhref + '" target="' + eltarget + '" class="' + elClass + ' atag"></a>');
    });
    $('.gnb .depth1_li').removeClass('on');
    $('.edit_all_menu .depth1_li').each(function (index, el) {
        var gnbOnIdx = $('.edit_all_menu .depth1_li[data-on="on"]').index();
        $('.gnb .depth1_li').eq(gnbOnIdx).addClass('on');
    });

    $('.gnb .inner .atag').removeClass('atag')
    $('.edit_all_menu .set_list_depth1').empty();
    $('.edit_all_menu').remove();
    if ($('.header .depth1_li').length > 5 && $('body').width() > 767) {
        $('.header, .mobile_header, .mask').addClass('leftmenu');
    } else {
        $('.header, .mobile_header, .mask').removeClass('leftmenu on');
    }
    $('.mask').hide();

});

$(document).on('click', '.btn_this_menu', function () {
    $(".pop_area").load("include/popup.html .edit_one_menu", function () {
        $('.mask').show();
        menuOneSetting()
    });
});
$(document).on('click', '.box_add_depth1 .btn_add', function () {
    var createMenu = '<li class="depth1_li"><span href="index_service.html" target="undefined" class="txt box_add_depth2 atag"><span class="wrap_menu"><em class="menu_name">신규메뉴</em><i class="btn_add"><span class="blind">하위 메뉴추가 버튼</span></i></span></span>'
    createMenu += '</li>'
    $('.edit_all_menu').find('.on').removeClass('on');
    $('.edit_all_menu .list_depth1').append(createMenu);
    $('.menu_area').scrollTop($('.list_depth1 li').length * 120);
});
$(document).on('click', '.set_list_depth1 .btn_add', function () {
    if ($(this).closest('li').find('.list_depth2').length == 0) {
        $(this).closest('li').append('<ul class="list_depth2"></ul>');
    }
    $(this).closest('li').find('.list_depth2').append('<li class="depth2_li"><span href="index12312.html" target="undefined" class="txt2 atag"><span class="wrap_menu"><em class="menu_name">신규서브메뉴</em></span></span></li>');

});

function menuOneSetting() {
    $('#menu_name').val($('.this_menu_name').text());
    var el = $('.gnb .on .txt');
    if (el.attr('href').indexOf('www') != undefined || el.attr('href').indexOf('www') != -1) {
        $('#url_link').val(el.attr('href'));
    } else {
        $('#page_link').val(el.attr('href'));
    }
    if (el.hasClass('off')) {
        $('.displayis').prop("checked", true);
    } else {
        $('.displayis').prop("checked", false);
    }
    if (el.attr('target') == '_blank') {
        $('.newWindow').prop("checked", true);
    } else {
        $('.newWindow').prop("checked", false);
    }

    $(document).on('focus', '#url_link', function () {
        $('#page_link').val('');
    });

    $(document).on('focus', '#page_link', function () {
        console.log('aa');
        $('#url_link').val('');
        var selectMenu = $('.gnb li').clone();
        $('.select_page_link').show();
        $('.select_page_link .list').append(selectMenu);
    });
    $(document).on('click', '.edit_one_menu', function () {
        if (!($(event.target).hasClass('page_link')) && !($(event.target).hasClass('select_page_link'))) {
            $('.select_page_link').hide();
        }
    });

    $(document).on('click', '.select_page_link a', function () {
        $("#page_link").val($(this).attr('href'));
        $('.select_page_link').hide();
        return false;
    });
    $(document).on('click', '.edit_one_menu .btn_del', function () {
        $('.gnb .on').remove();
    });
    $(document).on('click', '.edit_one_menu .btn_close', function () {
        $('.edit_one_menu').remove();
    });


    $(document).on('click', '.edit_one_menu .btn_apply', function () {
        $('.mask').hide();
        $('.gnb .on .menu_name, .this_menu_name').text($('#menu_name').val());
        el.attr('href', $('#url_link').val());
        el.attr('href', $('#page_link').val());
        if ($('.displayis').is(":checked")) {
            el.addClass('off');
        } else {
            el.removeClass('off');
        }
        if ($('.newWindow').is(":checked")) {
            el.attr('target', '_blank');
        } else {
            el.removeAttr('target');
        }
        $('.edit_one_menu').remove();
    });


}
$(document).on('click', '.leftmenu  .depth1_li', function () {
    if (!($(this).find('.list_depth2').length == 0)) {


        $(this).find('.list_depth2').slideToggle('fast', function () {
            if ($(this).is(':visible') == true) {
                $(this).closest('.depth1_li').addClass('on')
            } else {
                $(this).closest('.depth1_li').removeClass('on')
            }
            if ($('.depth1_li.on').length == 0) {
                $('.gnb .depth1_li[data-on="on"]').addClass('on');
            }

        });
        $('.depth1_li').removeClass('on');


        return false;
    }
});



function h_builder_common(targetel) {
    var bodyColorSetting;
    if ($('.com_set').hasClass('btn_only')) {
        $('#btn_txt').val(targetel.text())
    }

    $('.com_set .com_bgc').minicolors({
        letterCase: 'lowercase',
        opacity: true,
        change: function () {
            bodyColorSetting = $('.com_set  .com_bgc').val();
            //$('body').css('background-color', bodyColorSetting);
        }
    });
    $('#font_family').val('font');
    $('#font_family').change(function (event) {
        $('.set_fontfamily').remove();
        var ffVal = $('#font_family').val();
        if (ffVal == 'font') {
            $('.set_fontfamily').remove();
        } else {
            $('body').append('<div class="set_fontfamily"><link rel="stylesheet"  href="css/' + ffVal + '.css"></div>');
        }
        $('.common_edit .select_area label').text($("#font_family option:checked").text());

    });

    /* 버튼 모양 */
    $('.btn_shape_edit').on("click", function () {
        var comBtnIndex = $(this).parent().index() + 1;
        $('.com_set .btn_click').removeClass('sty1 sty2 sty3');
        $('.com_set .btn_click').addClass('sty' + comBtnIndex);
    });

    /* 버튼텍스트 */
    var btnColorSetting;
    var btnBgSetting;
    var btnlineSetting;
    var btnUrl;
    $('.com_set .inp_btntxt_color').minicolors({
        letterCase: 'lowercase',
        opacity: true,
        change: function () {
            btnColorSetting = $('.com_set .inp_btntxt_color').val();
            $('.com_set .btn_click').css('color', btnColorSetting);
        }
    });
    /* 버튼배경색 */
    $('.com_set .inp_btnbg_color').minicolors({
        letterCase: 'lowercase',
        opacity: true,
        change: function () {
            btnBgSetting = $('.com_set .inp_btnbg_color').val();
            $('.com_set .btn_click').css('background-color', btnBgSetting);
        }
    });
    /* 버튼색 */
    $('.com_set .inp_btnline_color').minicolors({
        letterCase: 'lowercase',
        opacity: true,
        change: function () {
            btnlineSetting = $('.com_set .inp_btnline_color').val();
            $('.com_set  .btn_click').css('border', '1px solid' + btnlineSetting);
        }
    });
    $('.com_set .btn_apply').on('click', function () {
        if ($('#font_family').val() == 'font') {
            $('.set_fontfamily').remove();
        }
        if (bodyColorSetting == undefined) {
            $('body').removeAttr('style');

        } else {
            $('body').css('background-color', bodyColorSetting);
        }
        var btnCommClass = $('.preview_btn_area .btn_click').attr('class');
        targetel.attr('class', btnCommClass);
        if (btnColorSetting == undefined) {
            targetel.css('color', '');
        } else {
            targetel.css('color', btnColorSetting);
        }
        if (btnBgSetting == undefined) {
            targetel.css('background-color', '');
        } else {
            targetel.css('background-color', btnBgSetting);
        }
        if (btnlineSetting == undefined) {
            targetel.css('border', '');
        } else {
            targetel.css('border', '1px solid' + btnlineSetting);
        }

        if ($(this).closest('.com_set').hasClass('btn_only')) {
            targetel.text($('#btn_txt').val());
            if ($('.inp_btn_url').val() != ' ') {
                targetel.attr('href', $('.inp_btn_url').val());
            }
            if ($('#newWindow').is(":checked")) {
                targetel.attr('target', '_blank');
            }
        }

        $('.com_set').remove();
        $('.mask').hide();
    });
    $('.com_set .btn_close').on('click', function () {
        $('.com_set, .set_fontfamily').remove();
        
        checkOverHeader('onon');
    });
}

/*  헤더 추가버튼 */
$(document).on('click', '.login  .btn_add', function (e) {
    loginAdd();
}).on('click', '.wrap_search .btn_add', function (e) {
    searchAdd();
});


/*  헤더스타일 */
function headOver() {
    $('header').addClass('over');
}

function headOverCancle() {
    $('header').removeClass('over');
}


/* 메인 비쥬얼 설정 */
function mainVisualEditLoad(el) {
    var mainVisTarget = el.closest('.main_visual');
    var mainVisOwlTarget = el.closest('.main_visual').find('.owl-carousel');

    $(".pop_area").load("include/popup.html .pop_visual_setting", function () {
        $('.mask').show();
        mainVisualEdit(mainVisTarget, mainVisOwlTarget)
    });
}

function mainVisualEdit(mainVisTarget, mainVisOwlTarget) {

    var summernoteDefalutSetting = summernoteDsetting();
    // 이미지 정보들을 담을 배열

    $("#input_imgs").on("change", handleImgFileSelect);
    $('.mask').addClass('mask_mainvisual');
    if ($('#mvmask').is(":checked")) {
        $('.mask_mainvisual_preview').addClass('on');
    }




    function handleImgFileSelect(e) {
        // 이미지 정보들을 초기화
        sel_files = [];
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        var index = 0;

        filesArr.forEach(function (f) {
            if (!f.type.match("image.*")) {
                alert("확장자는 이미지 확장자만 가능합니다.");
                return;
            }
            sel_files.push(f);
            var reader = new FileReader();
            reader.onload = function (e) {
                var addSlider = '<div class="wrap_txt" style="background-image: url(' + e.target.result + ');background-position:center center">'
                addSlider += '       <div class="btn_del"></div>'
                addSlider += '       <div class="txt_area"><h2>텍스트를 입력해주세요.</h2><h3>텍스트를 입력해주세요.</h3><p>텍스트를 입력해주세요</p></div>'
                addSlider += '   </div>'
                if ($('.add_slide_area .wrap_txt').length == 0) {
                    $('.note-editable').attr('style', 'background-image: url(' + e.target.result + ')').append('<div class="txt_area"><h2>텍스트를 입력해주세요.</h2><h3>텍스트를 입력해주세요.</h3><p>텍스트를 입력해주세요</p></div>');
                }
                $(".add_slide_area").append(addSlider);
                index++;
            }
            reader.readAsDataURL(f);


        });
        $('#input_imgs').val('');
    }



    function deleteImageAction(index) {
        sel_files.splice(index, 1);
        var img_id = "#img_id_" + index;
        $(img_id).remove();
    }




    /* 현재 슬라이더 가져와서 메인비쥬얼 수정 팝업으로 가져오기 */
    $('.owl-carousel').owlCarousel('destroy');
    $('.owl-carousel').show();
    var currentSliderSetting = mainVisTarget.find('.wrap_txt').clone().addClass('grid-square');
    var undoSetting = mainVisTarget.find('.wrap_txt').clone().addClass('grid-square');

    mainVisTarget.find('.wrap_txt').hide();
    mainVisTarget.find('.wrap_txt').eq(0).show();
    $('.add_slide_area').append(currentSliderSetting);
    $('.add_slide_area .wrap_txt').eq(0).addClass('now');

    var linkEl = $('#grid_preview .wrap_txt').eq(0).find('.link_visual_slide');
    if (linkEl.length != 0) {
        $('#url').val(linkEl.attr('href'));
    }
    if (linkEl.attr('target') == '_blank') {
        $('#newWindow').prop("checked", true);
    } else {
        $('#newWindow').prop("checked", false);
    }



    $('.pop_visual_setting .edit_area').append(mainVisTarget.find('.wrap_txt').eq(0).find('.txt_area').clone());
    $('.pop_visual_setting .edit_area').summernote(summernoteDefalutSetting);

    $('.note-editing-area').prepend('<div class="mask mask_mainvisual_preview"></div>');
    $('.pop_visual_setting .note-editable').attr('style', $('.add_slide_area .wrap_txt').eq(0).attr('style'));

    if ($('.add_slide_area .now').hasClass('maskon')) {
        $('#mvmask').prop("checked", true);
        $('.mask_mainvisual_preview').addClass('on')
    } else {
        $('#mvmask').prop("checked", false);
        $('.mask_mainvisual_preview').removeClass('on')
    }




    $('.position_ui li').removeClass('active').eq($('.now').attr('data-pos')).addClass('active');



    /* 썸네일 sort 기능 */
    newSortList(grid_preview);




    $('.pop_visual_setting .btn_close').one('click', function () {
        $('.pop_visual_setting .edit_area').summernote('destroy');
        var resultSlideEdit = undoSetting.removeClass('grid-square');
        mainVisOwlTarget.empty().append(resultSlideEdit);
        newOwl();
        mainVisTarget.find('.wrap_txt').show();
        $('.add_slide_area, .pop_visual_setting .note-editable, .pop_visual_setting .edit_area').empty();
        $('.pop_visual_setting').remove();
    });

    $('.mask_mainvisual').one('click', function () {
        $('.pop_visual_setting .btn_close').click();
    });


    $('.pop_visual_setting .btn_pop_mv').one('click', function () {
        if ($('.note-editable .txt_area').length != 0) {
            var $firstEdit = $('.pop_visual_setting .note-editable .txt_area').html();
        } else {
            var $firstEdit = $('.pop_visual_setting .note-editable').html();
        }
        if (!($('#url').val() == '')) {
            var $addslidenow = $('.add_slide_area .now');
            var $url = $('#url');
            if ($('#newWindow').is(":checked")) {
                $addslidenow.find('a').remove();
                $addslidenow.append('<a href="' + $url.val() + '" target="_blank" class="link_visual_slide"></a>');
                $url.val('');
            } else {
                $addslidenow.find('a').remove();
                $addslidenow.append('<a href="' + $url.val() + '"  class="link_visual_slide"></a>');
                $url.val('');
            }
        } else {
            var $addslidenow = $('.add_slide_area .now a');
            $addslidenow.remove();

        }

        $('.now').find('.txt_area').html($firstEdit);
        $('.pop_visual_setting .edit_area').summernote('destroy');
        var resultSlideEdit = $('.add_slide_area .wrap_txt').clone().removeClass('now prev grid-square');
        mainVisOwlTarget.empty().append(resultSlideEdit);
        newOwl();
        mainVisTarget.find('.wrap_txt').show();
        $('.add_slide_area, .pop_visual_setting .note-editable, .pop_visual_setting .edit_area').empty();
        $('.pop_visual_setting').remove();
        $('.mask').hide();
        $('.main_visual .wrap_txt').each(function (index, el) {
            if ($(this).hasClass('maskon') && $(this).find('.mask').length == 0) {
                $(this).prepend('<div class="mask"></div>');
            } else if (!($(this).hasClass('maskon'))) {
                $(this).find('.mask').remove();
            }
        });

    });
}

$(document).on('change', '.pop_visual_setting #mvmask', function () {
    if ($("#mvmask").is(":checked")) {
        $('.pop_visual_setting .mask').addClass('on');
        $('.add_slide_area .now').addClass('maskon')
    } else {
        $('.pop_visual_setting .mask').removeClass('on');
        $('.add_slide_area .now').removeClass('maskon')
    }
});


/* 불러온 이미지를 클릭하면 해당 내용을 에디터로 가져오기 */
$(document).on('click', '.add_slide_area .wrap_txt', function (e) {
    var summernoteDefalutSetting = summernoteDsetting();
    $('.prev').removeClass('prev');
    if ($('.note-editable .txt_area').length != 0) {
        var t = $('.note-editable .txt_area').html();
    } else {
        var t = $('.note-editable').html();
    }
    if ($('#mvmask').is(":checked")) {
        $('.mask_mainvisual_preview').addClass('on');
    }

    if (!($('#url').val() == '')) {
        var $addslidenow = $('.add_slide_area .now');
        var $url = $('#url');
        if ($('#newWindow').is(":checked")) {
            $addslidenow.find('a').remove();
            $addslidenow.append('<a href="' + $url.val() + '" target="_blank" class="link_visual_slide"></a>');
            $url.val('');
        } else {
            $addslidenow.find('a').remove();
            $addslidenow.append('<a href="' + $url.val() + '"  class="link_visual_slide"></a>');
            $url.val('');
        }
    }
    $('.now').addClass('prev').find('.txt_area').html(t).end().removeClass('now');
    $(this).addClass('now');
    var previewMvClone = $(this).find('.txt_area').clone();

    $VisualEditArea = $('.pop_visual_setting .edit_area');
    $VisualEditArea.summernote('destroy');
    $VisualEditArea.empty().append(previewMvClone);
    $VisualEditArea.summernote(summernoteDefalutSetting);
    $('.note-editing-area').prepend('<div class="mask mask_mainvisual_preview"></div>');
    $('.pop_visual_setting .note-editable').attr('style', $(this).attr('style'));
    $('.position_ui li').removeClass('active').eq($('.now').attr('data-pos')).addClass('active');

    if ($('.add_slide_area .now').hasClass('maskon')) {
        $('#mvmask').prop("checked", true);
        $('.mask_mainvisual_preview').addClass('on')
    } else {
        $('#mvmask').prop("checked", false);
        $('.mask_mainvisual_preview').removeClass('on')
    }
    var linkEl = $(this).find('.link_visual_slide');
    if (linkEl.length != 0) {
        $('#url').val(linkEl.attr('href'));
    }
    if (linkEl.attr('target') == '_blank') {
        $('#newWindow').prop("checked", true);
    } else {
        $('#newWindow').prop("checked", false);
    }
});
$(document).on('click', '.pop_visual_setting .btn_img_del', function (e) {
    var delMvItem = $(this).closest('.item').index();
    $('.item').eq(delMvItem).remove();
    $('.add_slide_area .wrap_txt').eq(delMvItem).remove();
});

$(document).on('click', '.pop_visual_setting .btn_del', function (e) {
    e.stopPropagation();
    var summernoteDefalutSetting = summernoteDsetting();
    var btnDelEl = $(this).closest('.wrap_txt');
    $('.prev').removeClass('prev');
    $('.pop_visual_setting .edit_area').summernote('destroy');
    $('.pop_visual_setting .note-editable, .pop_visual_setting .edit_area').empty();
    if ($('.add_slide_area .wrap_txt').length == (btnDelEl.index() + 1)) {
        var newfirstEl = btnDelEl.prev();
    } else {
        var newfirstEl = btnDelEl.next();
    }
    newfirstEl.addClass('now');
    var newFirstClone = newfirstEl.find('.txt_area').clone();

    console.log(newfirstEl.attr('style'));

    $('.pop_visual_setting .edit_area').append(newFirstClone);
    $('.pop_visual_setting .edit_area').summernote(summernoteDefalutSetting);
    console.log($('.pop_visual_setting .note-editable').length);
    $('.pop_visual_setting .note-editable').removeAttr().attr('style', newfirstEl.attr('style'));
    btnDelEl.remove();

});

$(document).on('click', '.pop_visual_setting .btn_add_slide', function (e) {
    $('.pop_visual_setting #input_imgs')[0].click();
});
$(document).on('click', '.pop_visual_setting .position_ui', function () {
    imgBackPosition(1);
});
$(document).on('click', '.pop_section_bg .position_ui', function () {
    imgBackPosition(2);
});



function sectionBg(targetSection) {
    targetSection.addClass('bgsetting');

    $(document).ready(function () {
        $(".selimg").on("change", handleImgFileSelect);
    });

    function handleImgFileSelect(e) {
        $('.pop_section_bg .section_bgc').val('');
        $('.minicolors-swatch-color').css('background-color', '');
        $('#chk_bgcolor').prop("checked", false);
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);

        filesArr.forEach(function (f) {
            if (!f.type.match("image.*")) {
                alert("확장자는 이미지 확장자만 가능합니다.");
                return;
            }

            sel_file = f;

            var reader = new FileReader();
            reader.onload = function (e) {
                $(".wrap_img").attr("style", 'background:url("' + e.target.result + '") no-repeat left top;background-size:cover');
            }
            reader.readAsDataURL(f);
        });
    }

    $("#mvmask").change(function () {
        if ($("#mvmask").is(":checked")) {
            $('.pop_section_bg .wrap_img').append('<div class="mask_section_bg"></div>').addClass('maskon');
        } else {
            $('.pop_section_bg .wrap_img').remove('.mask_section_bg').removeClass('maskon');
        }
    });
    $('.pop_section_bg .section_bgc').minicolors({
        letterCase: 'lowercase',
        opacity: true,
        change: function () {
            $('.wrap_img').css('background', '');
            $('.section_bgc').addClass('on');
            $('.wrap_img').css('background-color', $('.pop_section_bg .section_bgc').val());
        }
    });
    $(document).on('click', '.pop_section_bg .btn_pop_mv', function () {
        $bgSetting = $('.bgsetting');
        $bgSetting.attr('style', $(".pop_section_bg .wrap_img").attr('style'));

        if ($('#mvmask').is(":checked")) {
            if ($bgSetting.find('.mask_section_bg').length == 0) {
                $bgSetting.append('<div class="mask_section_bg "></div>').addClass('maskon');
            }
        } else {
            $bgSetting.find('.mask_section_bg').remove();
        }
        $('.pop_section_bg').remove();
        $('.bgsetting div').css('background', '');
        $bgSetting.removeClass('bgsetting');
        $('.mask').hide();

    });
    $(document).on('click', '.pop_section_bg .btn_close', function () {
        $('.bgsetting').removeClass('bgsetting');
        $('.pop_section_bg').remove();
        
        checkOverHeader('onon');
    });
}


function imgBackPosition(chk) {
    $('.position_ui_option').show();
    $('.position_ui li, .position_ui_option li').removeClass('active');
    $('.position_ui_option li').on('click', function () {
        var $backgroundPos = $(this).index();
        $('.position_ui_option li').eq($backgroundPos).addClass('active');
        $('.position_ui li').eq($backgroundPos).addClass('active');
        if (chk == 1) {
            var el = $('.add_slide_area .now');
        } else if (chk == 2) {
            var el = $(".pop_section_bg .wrap_img");
        }
        switch ($backgroundPos) {
            case 0:
                el.css('background-position', 'left top');
                el.attr('data-pos', '0');
                break;
            case 1:
                el.css('background-position', 'center top');
                el.attr('data-pos', '1');
                break;
            case 2:
                el.css('background-position', 'right top');
                el.attr('data-pos', '2');
                break;
            case 3:
                el.css('background-position', 'left center');
                el.attr('data-pos', '3');
                break;
            case 4:
                el.css('background-position', 'center center');
                el.attr('data-pos', '4');
                break;
            case 5:
                el.css('background-position', 'right center');
                el.attr('data-pos', '5');
                break;
            case 6:
                el.css('background-position', 'left bottom');
                el.attr('data-pos', '6');
                break;
            case 7:
                el.css('background-position', 'left bottom');
                el.attr('data-pos', '7');
                break;
            case 8:
                el.css('background-position', 'right bottom');
                el.attr('data-pos', '8');
                break;
            default:
                console.log('error');
        }
        $('.position_ui_option').hide();
    });

}




function maskOnOff(clickel, targetel) {
    clickel.on('click', function () {
        if ($('.mvmask').is(":checked")) {
            targetel.removeClass('off');
        } else {
            targetel.addClass('off');
        }
    });
}

function summernoteDsetting() {
    var closeTxtButton2 = function (context) {
        var ui = $.summernote.ui;
        var button2 = ui.button({
            contents: 'close2',
            click: function () {
                saveTxtEditing(summernoteTraget2);
            }
        });

        return button2.render();
    }
    var saveTxtEditing = function (el) {
        var markup = el.summernote('code');
        el.summernote('destroy');
        if (!$('#list1').hasClass('wrap_fullpage')) {
            newSortList(list1);
        }
        gridAreaCreate();
    };
    var summernoteDefalutSetting = {
        'codeviewFilter': false,
        'codeviewIframeFilter': true,
        'prettifyHtml': true,
        codemirror: { // codemirror options
            theme: 'monokai',
            lineNumbers: true
        },
        toolbar: [
            ['fontsize', ['fontsize']],
            ['style', ['fontname', 'bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['color', ['forecolor']],
            ['insert', ['picture', 'video', 'link', 'table', 'hr']],
            ['para', ['ul', 'ol', 'paragraph', 'style']],
            ['height', ['height']],
            ['view', ['codeview', 'help']],
            ['close2', ['closebtn2']],
        ],
        fontNames: ['바탕', '굴림', '돋움', '궁서', '본고딕', '티몬', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
        fontSizes: ['11', '12', '13', '14', '16', '18', '20', '22', '24', '26', '28', '30', '36', '44', '48', '64', '82', '150'],
        focus: true,
        popover: {
            image: [
                ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                ['remove', ['removeMedia']]
            ],
            link: [
                ['link', ['linkDialogShow', 'unlink']]
            ],
            table: [
                ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
            ],
            styleTags: [
                'div', 'p', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
            ]
        },
        buttons: {
            closebtn2: closeTxtButton2
        }
    };
    return summernoteDefalutSetting;
}

function textEdit(nowpos) {
    if (!$('#list1').hasClass('wrap_fullpage')) {
        newSort.destroy();
    }
    if ($('.wrap_grid').length > 0) {
        newGridsort.destroy();
    }
    

   // $('.wrap_txt_area .txt_area, .inner_section .txt_area').summernote('destroy');

    var saveTxtEditing = function (el) {
        var markup = el.summernote('code');
        el.summernote('destroy');
        if (!$('#list1').hasClass('wrap_fullpage')) {
            newSortList(list1);
        }
        gridAreaCreate();
        
        checkOverHeader('onon');
    };
    
    var closeTxtButton = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: 'close',
            click: function () {
                saveTxtEditing(summernoteTraget);
                checkOverHeader('onon');
            }
        });

        return button.render();
       
    }
    summernoteTraget = nowpos.closest('.wrap_txt_area .txt_area');
    summernoteTraget2 = nowpos.closest('.inner_section .txt_area');

    summernoteTraget.summernote({
        airMode: true,
        'codeviewFilter': false,
        'codeviewIframeFilter': true,
        'prettifyHtml': true,

        codemirror: { // codemirror options
            theme: 'monokai',
            lineNumbers: true
        },
        fontNames: ['바탕', '굴림', '돋움', '궁서', '본고딕', '티몬', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
        fontSizes: ['11', '12', '13', '14', '16', '18', '20', '22', '24', '26', '28', '30', '36', '44', '48', '64', '82', '150'],
        focus: true,
        popover: {
            link: [
                ['link', ['linkDialogShow', 'unlink']]
            ],
            table: [
                ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
            ],
            styleTags: [
                'div', 'p', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
            ],
            air: [
                ['fontsize', ['fontsize']],
                ['color', ['forecolor']],
                ['style', ['bold', 'fontname', 'underline', 'clear']],
                ['font', ['strikethrough']],
                ['para', ['paragraph']],
                ['insert', ['link', 'table', 'hr']],
                ['view', ['codeview', 'help']],
                ['close', ['closebtn']]
            ]

        },
        buttons: {
            closebtn: closeTxtButton
        }
    });
    var summernoteDefalutSetting = summernoteDsetting();
    summernoteTraget2.summernote(summernoteDefalutSetting);
    
    checkOverHeader();//mj 추가    
}

function dbclickTxtingEdit(el) {
   
    textEdit(el);
}


function imgEditLoad(el) {
    var $imgeditTarget = el.closest('.img_area').find('.changedimg');
    var urledited = el.closest('.img_area').find('.url_edited');
    $(".pop_area").load("include/popup.html .pop_img_edit", function () {
        $('.mask').show();
        imgEdit($imgeditTarget, urledited);
        checkOverHeader();
    });
}

/* 이미지 수정 */
function imgEdit($imgeditTarget, urledited) {
    var $imgeditTargetWidth = $imgeditTarget.width();
    var $imgeditTargetHeight = $imgeditTarget.height();
    if (urledited.hasClass('lightBoxShow')) {
        $('.pop_img_edit #lightboxchk').prop("checked", true);
    }
    $('#url').val(urledited.attr('href'));
    if (urledited.attr('target') == '_blank') {
        $('.pop_img_edit #newWindow').prop("checked", true);
    }


    $('.pop_img_edit .changingimg').croppie('destroy');
    var editImgSrc = $imgeditTarget.attr('src');
    $('.pop_img_edit .changingimg').attr('src', editImgSrc);
    var $image_crop = $('.pop_img_edit .changingimg');
    $image_crop.croppie({
        viewport: {
            url: editImgSrc,
            enableExif: true,
            width: $imgeditTargetWidth,
            height: $imgeditTargetHeight
        }
    });
    $('.selimg').on('change', function () {
        $('.pop_img_edit .changingimg').croppie('destroy');
        var reader = new FileReader();
        var $image_crop = $(this).closest('.wrap_pop_cont').children('.upload-image');
        $image_crop.addClass('on');
        reader.onload = function (e) {
            $imgeditTarget.attr('src', e.target.result);
            $('.pop_img_edit .changingimg').attr('src', e.target.result).hide();
            $image_crop.croppie('destroy');
            $image_crop.croppie({
                url: e.target.result,
                enableExif: true,
                viewport: {
                    width: $imgeditTargetWidth,
                    height: $imgeditTargetHeight,
                    type: 'square'
                }

            })
        }
        reader.readAsDataURL(this.files[0]);
    })
    $('.complete').on('click', function () {
        if ($('#newWindow').is(":checked")) {
            urledited.attr('target', '_blank');
        }
        if ($('.pop_img_edit #lightboxchk').is(":checked")) {
            urledited.attr('href', '').removeAttr('target').removeAttr('onclick');
            urledited.addClass('lightBoxShow');
        } else {
            if ($('#url').val() == ' ') {
                urledited.attr('href', '#').attr('onclick', 'return false');
            } else {
                urledited.attr('href', $('.pop_img_edit #url').val());
                if ($('#newWindow').is(":checked")) {
                    urledited.attr('target', '_blank');
                }
                urledited.removeClass('lightBoxShow').removeAttr('onclick');
            }
        }
        if ($('.wrap_pop_cont .upload-image').hasClass('on')) {
            var $image_crop = $('.wrap_pop_cont .upload-image');
        } else {
            var $image_crop = $('.pop_img_edit .changingimg');
        }
        ;
        $image_crop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            $imgeditTarget.attr('src', resp);
        });
        $('.upload-image').croppie('destroy');
        $('.pop_img_edit').remove();
        $('.mask').hide();
        checkOverHeader('onon');
    });
    $(document).on('focus', '.pop_img_edit #url', function () {
        $('.pop_img_edit #lightboxchk').prop("checked", false);
    });
    $("#newWindow").change(function () {
        if ($("#newWindow").is(":checked")) {
            $('.pop_img_edit #lightboxchk').prop("checked", false);
        }
    });
    $("#lightboxchk").change(function () {
        if ($("#lightboxchk").is(":checked")) {
            $('.pop_img_edit #url').val('');
            $('.pop_img_edit #newWindow').prop("checked", false);
        }
    });

    $('.pop_img_edit .btn_close').on('click', function () {
        $('.pop_img_edit').remove();
        checkOverHeader('onon');
    });
}
$(document).on('click', '.lightBoxShow', function (event) {
    event.preventDefault();
    $('body').append($(this).find('.changedimg').clone().addClass('lightBoxImg'));
    $('.mask').addClass('lightImg').show();
});
$(document).on('click', '.lightImg .btn_close', function (event) {
    event.preventDefault();
    $('.lightBoxImg').remove();
    $('.mask').removeClass('.lightImg').hide();
});




function footerLoadSetting() {
    $(".pop_area").load("include/popup.html .pop_edit_footer", function () {
        $('.mask').show();
        footerSetting()
    });
}

function footerSetting() {
    customSelect();
    $('.mask').addClass('mask_footer').show();
    var $snsShareInfo = [];
    var $snsShareLink = [];
    var $newWindowChk = [];
    var snsIconLength = $('.sns_icon_area a').length;


    $('.wrap_sns_opt').empty();
    for (var i = 0; i <= snsIconLength; i++) {
        $snsShareInfo.push($('.sns_icon_area a').eq(i).attr('class'));
        $snsShareLink.push($('.sns_icon_area a').eq(i).attr('href'));
        $newWindowChk.push($('.sns_icon_area a').eq(i).attr("target") == '_blank');
        if ($snsShareInfo[i] != undefined) {
            var sns_share_clone = '<div class="area_sns_opt sns_opt1">'
            sns_share_clone += '<div class="wrap_select_custom">'
            sns_share_clone += '<div class="' + $snsShareInfo[i] + ' select_sns"><span class="blind">sns 아이콘</span><span class="select_arrow"></span></div>'
            sns_share_clone += ' <ul class="option_area on" style="display:none">'
            sns_share_clone += ' 	<li class="icon-sns1"><span class="blind">플레이콕</span></li>'
            sns_share_clone += ' 	<li class="icon-sns2"><span class="blind">페이스북</span></li>'
            sns_share_clone += ' 	<li class="icon-sns3"><span class="blind">네이버블로그</span></li>'
            sns_share_clone += ' 	<li class="icon-sns4"><span class="blind">유튜브</span></li>'
            sns_share_clone += ' 	<li class="icon-sns5"><span class="blind">인스타그램</span></li>'
            sns_share_clone += ' </ul>'
            sns_share_clone += '</div>'
            sns_share_clone += '<div class="inp_area"><div class="inp_box"><input type="text" value="' + $snsShareLink[i] + '" class="link_sns"></div><label class="check_contain">새창 <input type="checkbox" checked="checked" class="sns_window"><span class="checkmark"></span></label></div>'
            sns_share_clone += '<div class="del_area"><i class="btn_del"><span class="blind">버튼설정닫기</span></i></div>'
            sns_share_clone += '</div>'
            $('.wrap_sns_opt').append(sns_share_clone);
        }
        if ($newWindowChk[i] == true) {
            $('.wrap_sns_opt .sns_window').eq(i).prop("checked", true);
        } else {
            $('.wrap_sns_opt .sns_window').eq(i).prop("checked", false);
        }

    }



    $('.pop_edit_footer .btn_close').one('click', function () {
        $('footer').addClass('footer layoutsty2');
        $('.pop_edit_footer').remove();
        $('.mask').hide();
    });
}

$(document).on('click', '.btn_plus_sns', function () {
    var sns_share_clone = '<div class="area_sns_opt sns_opt1">'
    sns_share_clone += '<div class="wrap_select_custom">'
    sns_share_clone += '<div class="icon-sns1 select_sns"><span class="blind">sns 아이콘</span><span class="select_arrow"></span></div>'
    sns_share_clone += ' <ul class="option_area on" style="display:none">'
    sns_share_clone += ' 	<li class="icon-sns1"><span class="blind">플레이콕</span></li>'
    sns_share_clone += ' 	<li class="icon-sns2"><span class="blind">페이스북</span></li>'
    sns_share_clone += ' 	<li class="icon-sns3"><span class="blind">네이버블로그</span></li>'
    sns_share_clone += ' 	<li class="icon-sns4"><span class="blind">유튜브</span></li>'
    sns_share_clone += ' 	<li class="icon-sns5"><span class="blind">인스타그램</span></li>'
    sns_share_clone += ' </ul>'
    sns_share_clone += '</div>'
    sns_share_clone += '<div class="inp_area"><div class="inp_box"><input type="text" class="link_sns"></div><label class="check_contain">새창 <input type="checkbox" checked="checked" class="sns_window"><span class="checkmark"></span></label></div>'
    sns_share_clone += '<div class="del_area"><i class="btn_del"><span class="blind">버튼설정닫기</span></i></div>'
    sns_share_clone += '</div>'
    if ($('.wrap_select_custom').length < 4) {
        $('.wrap_sns_opt').append(sns_share_clone);
    }
});

$(document).on('click', '.pop_edit_footer .img_box', function () {
    var $footerIdx = $(this).index();
    $('footer').removeAttr('class');
    switch ($footerIdx) {
        case 0:
            $('footer').addClass('footer layoutsty2');
            break;
        case 1:
            $('footer').addClass('footer sty2 layoutsty2');
            break;
        case 2:
            $('footer').addClass('footer');
            break;
        case 3:
            $('footer').addClass('footer sty2');
            break;
        default:
            break;
    }
});
$(document).on('click', '.pop_edit_footer .select_sns', function () {
    if ($(this).next().is(':visible') == true) {
        $(this).next().hide();
    } else {
        $(this).next().show();
    }
});

$(document).on('click', '.pop_edit_footer .option_area li', function () {
    var snsClass = $(this).attr('class');
    $(this).closest('.area_sns_opt').find('.select_sns').removeClass('icon-sns1 icon-sns2 icon-sns3 icon-sns4').addClass(snsClass);
    $('.option_area').hide();

});
$(document).on('click', '.wrap_sns_opt .btn_del', function () {
    $(this).closest('.area_sns_opt').remove();

});


$(document).on('click', '.pop_edit_footer .btn_apply', function () {
    var $snsShareInfo = [];
    var $snsShareLink = [];
    var $newWindowChk = [];
    $('.sns_icon_area').empty()
    for (var i = 0; i <= 3; i++) {
        $snsShareInfo.push($('.area_sns_opt .select_sns').eq(i).attr('class'));
        $snsShareLink.push($('.area_sns_opt .link_sns').eq(i).val());
        $newWindowChk.push($('.sns_window').eq(i).is(":checked"));
        if ($snsShareInfo[i] != undefined) {
            var snsShareEl = '<a href="' + $snsShareLink[i] + '" class="' + $snsShareInfo[i] + '"></a>'
            $('.sns_icon_area').append(snsShareEl).find('a').removeClass('select_sns');
        }
        if ($newWindowChk[i] == true) {
            $('.sns_icon_area a').eq(i).attr('target', '_blank');
        }
    }
    if ($('.inp_privacy').is(":checked") == false) {
        $('.page_terms_wrap').hide();
    } else {
        $('.page_terms_wrap').show();
    }

    if ($('.inp_copyright').is(":checked") == false) {
        $('.copyright_area').hide();
    } else {
        $('.copyright_area').show();
    }


    $('.pop_edit_footer').remove();
    $('.mask').hide();
});
$(document).on('click', '.mask_footer', function () {
    $('.pop_edit_footer .btn_close').click();
});




function imgLoadSetting(el) {
    var $imgAreaTarget = el.closest('.wrap_images_area');
    var $imgeditTarget = el.closest('.wrap_images_area').find('.changedimg2');
    var urledited = el.closest('.wrap_images_area').find('.url_edited');
    $(".pop_area").load("include/popup.html .pop_img_edit_sty2", function () {
        $('.mask').show();
        imgElSetting($imgeditTarget, urledited, $imgAreaTarget)
    });
}

function videoLoadSetting(el) {
    var $videoAreaTarget = el.closest('.wrap_movie_area');
    $(".pop_area").load("include/popup.html .set_movie", function () {
        $('.mask').show();
        videoElSetting($videoAreaTarget)
    });
}

function mainVideoLoadSetting(el) {
    var $MainvideoAreaTarget = el.closest('.wrap_mainmovie_area');
    $(".pop_area").load("include/popup.html .main_set_movie", function () {
        $('.mask').show();
        mainVideoElSetting($MainvideoAreaTarget)
    });
}

function mapLoadSetting(el) {
    var $MapAreaTarget = el.closest('.wrap_map_area');
    $(".pop_area").load("include/popup.html .set_map", function () {
        $('.mask').show();
        mapElSetting($MapAreaTarget);
    });
}

function galleryLoadSetting(el) {
    var $galleryTarget = el.closest('.wrap_gallery');
    $(".pop_area").load("include/popup.html .pop_gallery", function () {
        $('.mask').show();
        galleryElSetting($galleryTarget);
    });
}


function imgElSetting($imgeditTarget, urledited, $imgAreaTarget) {
    var sel_file;
    $('.wrap_img_el').attr('src', $imgeditTarget.attr('src'));
    $(".pop_img_edit_sty2 .selimg3").on("change", handleImgFileSelect2);
    if (urledited.hasClass('lightBox')) {
        $('#lightboxchk').prop("checked", true);
    }
    if (urledited.closest('.inner_section').hasClass('full_width')) {
        $('#fitimg').prop("checked", true);
    }
    $('#url').val(urledited.attr('href'));
    if (urledited.attr('target') == '_blank') {
        $('#newWindow').prop("checked", true);
    }

    function handleImgFileSelect2(e) {
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);

        filesArr.forEach(function (f) {
            if (!f.type.match("image.*")) {
                alert("확장자는 이미지 확장자만 가능합니다.");
                return;
            }

            sel_file = f;

            var reader = new FileReader();
            reader.onload = function (e) {
                $(".wrap_img_el").attr('src', e.target.result);
            }
            reader.readAsDataURL(f);
        });
    }

    $('.complete').one('click', function () {
        $imgeditTarget.attr('src', $('.wrap_img_el').attr('src'));
        if ($('#newWindow').is(":checked")) {
            urledited.attr('target', '_blank');
        }

        if ($('.pop_img_edit_sty2 #lightboxchk').is(":checked")) {
            urledited.removeAttr('target').removeAttr('onclick');
            urledited.addClass('lightBox');
        } else {
            if ($('#url').val() == ' ') {
                urledited.attr('href', '#').attr('onclick', 'return false');
                urledited.removeClass('lightBox');
            } else {
                urledited.attr('href', $('.pop_img_edit_sty2 #url').val());
                urledited.removeAttr('onclick');
                urledited.removeClass('lightBox');
            }
        }
        if ($('#fitimg').is(":checked")) {
            $imgAreaTarget.removeAttr('style');
            urledited.closest('.inner_section').addClass('full_width');
        } else {
            urledited.closest('.inner_section').removeClass('full_width');
            $imgAreaTarget.css('height', $('.changedimg2').height());
        }


        $('.pop_img_edit_sty2').remove();
        $('.mask').hide();
    });
    $(document).on('focus', '.pop_img_edit_sty2 #url', function () {
        $('.pop_img_edit_sty2 #lightboxchk').prop("checked", false);
    });
    $("#newWindow").change(function () {
        if ($("#newWindow").is(":checked")) {
            $('.pop_img_edit_sty2 #lightboxchk').prop("checked", false);
        }
    });
    $("#lightboxchk").change(function () {
        if ($("#lightboxchk").is(":checked")) {
            $('.pop_img_edit_sty2 #url').val('');
            $('.pop_img_edit_sty2 #newWindow').prop("checked", false);
        }
    });

    $('.pop_img_edit_sty2 .btn_close').on('click', function () {
        $('.pop_img_edit_sty2').remove();
    });

}

$(document).on('click', '.designEl0 .lightBox', function () {
    $('body').append($(this).find('img').clone().addClass('lightbox lightInImg'));
    $('.mask').show().addClass('imgLightbox');
    return false;
});


function videoElSetting($videoAreaTarget) {
    $videoAreaTarget.addClass('target_on');
    if ($('.target_on').hasClass('autoplay')) {
        $('#autoplay').prop("checked", true);
    }
    if ($('.target_on').hasClass('lightbox')) {
        $('#lightboxchk').prop("checked", true);
    }
    if ($('.target_on').closest('.div_movie_el').hasClass('fullvideo')) {
        $('#fitmovie').prop("checked", true);
    }
    //alert($videoAreaTarget.find('source').attr('src'));
    if ($('.target_on').find('source').attr('src') != undefined) {
        $('#urlmovie').val($('.target_on').find('source').attr('src'));
        var previewSetVideo = '<video class="video-js vjs-theme-sea preview_video_init" data-idx="' + $('.target_on video').attr('data-idx') + '" controls preload="auto" data-setup="{}">'
        previewSetVideo += '<source src="' + $('.target_on').find('source').attr('src') + '" type="video/mp4" id="video_here" />'
        previewSetVideo += '</video>'
        $('.wrap_movie_api').empty().append(previewSetVideo);
        // videojs(document.querySelector('.preview_video_init'));
    }
    if ($('.target_on').find('iframe').length != 0 && $('.target_on').find('source').attr('src') == undefined) {
        $('.target_on').remove('.mask_movie');
        var $urlmovieEdit = $('.target_on').find('iframe').attr('src');
        console.log($urlmovieEdit);
        $urlmovieEdit2 = $urlmovieEdit.substring(24).split("?");

        console.log($urlmovieEdit2);
        $('#urlmovie').val('https://youtu.be' + $urlmovieEdit2[0]);
        $('.wrap_movie_api').append($('.target_on').find('iframe').clone());
    }

    function videoElPreview() {
        if (($('#urlmovie').val() != ' ')) {
            var vjsinit = '<video class="video-js vjs-theme-sea" controls id = "pop_previewarea_video">'
            vjsinit += '<source src="" id="video_here">'
            vjsinit += '</video>'
            $('.wrap_movie_api').empty().append(vjsinit);
            if ($('#urlmovie').val().indexOf('you') != -1) {
                var $urlmovieVal = $('#urlmovie').val().substring(16);
                var youtubeMovie = '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + $urlmovieVal + '?mode=opaque&amp;autoplay=1&amp;loop=1&amp;rel=0&amp;playlist=&amp;showinfo=1&amp;controls=&amp;mute=1" frameborder = "0" allowfullscreen = "" ></iframe >'
                $('.wrap_movie_api').append(youtubeMovie);
            } else {
                var $urlmovieVal = $('#urlmovie').val();
                var previewSetVideo = '<video class="video-js vjs-theme-sea preview_video_init" controls preload="auto" data-setup="{}">'
                previewSetVideo += '<source src="' + $urlmovieVal + '" type="video/mp4" id="video_here" />'
                previewSetVideo += '</video>'
                $('.wrap_movie_api').empty().append(previewSetVideo);
                // videojs(document.querySelector('.preview_video_init'));
            }
        }
    }

    $(document).on("focusout", "#urlmovie", function () {
        videoElPreview();
    });
    $(document).on("keydown", "#urlmovie", function (key) {
        if (key.keyCode == 13) {
            videoElPreview();
        }
    });


    $('.file_multi_video').change(function () {
        $('#urlmovie').val(' ').attr("disabled", true);
        var $source = $('#video_here');
        $source[0].src = URL.createObjectURL(this.files[0]);
        //$source.parent()[0].load();
        //$('#pop_previewarea_video').show();
        $('.wrap_movie_api').empty();
        var $previewVideo = '<video class="video-js vjs-theme-sea preview_video" controls preload="auto" data-setup="{}">'
        $previewVideo += '<source src="' + $source[0].src + '" type="video/mp4" id="video_here" />'
        $previewVideo += '</video>'
        $('.wrap_movie_api').append($previewVideo);
    })


    $('.complete').on('click', function () {
        var $videoIdx = $('.div_movie_el:last-child').length;
        var $runVideojs = 'video-js' + $videoIdx;
        console.log($runVideojs);
        var $videoClone = $('#pop_previewarea_video').clone();
        console.log($('#video_here').attr('src'));
        console.log($('#video_here').parent().attr('data-idx'));
        var data_idx = $('#video_here').parent().attr('data-idx');

        var $videoClone2 = '<video class="' + $runVideojs + ' video-js vjs-theme-sea" data-idx="' + data_idx + '" controls preload="auto" data-setup="{}">'
        $videoClone2 += '<source src="' + $('#video_here').attr('src') + '" type="video/mp4" />'
        $videoClone2 += '</video>'
        console.log($('#urlmovie').val());
        if ($('#urlmovie').val() != ' ') {
            if ($('#urlmovie').val().indexOf('you') != -1) {
                var $urlmovieVal = $('#urlmovie').val().substring(16);
                if ($('#autoplay').is(":checked") == true) {
                    $('.target_on').addClass('autoplay');
                    var youtubeMovie = '<div class="mask_youtube"></div><iframe width="100%" height="100%" src="//www.youtube.com/embed/' + $urlmovieVal + '?mode=opaque&amp;autoplay=1&amp;loop=1&amp;rel=0&amp;playlist=&amp;showinfo=1&amp;controls=&amp;mute=1" frameborder = "0" allowfullscreen = "" ></iframe >'

                } else {
                    $('.target_on').removeClass('autoplay');
                    var youtubeMovie = '<div class="mask_youtube"></div><iframe width="100%" height="100%" src="//www.youtube.com/embed/' + $urlmovieVal + '?mode=opaque&amp;autoplay=0&amp;loop=1&amp;rel=0&amp;playlist=&amp;showinfo=1&amp;controls=&amp;mute=0" frameborder = "0" allowfullscreen = "" ></iframe >'
                }
                $('.target_on').empty().append(youtubeMovie);


            } else if ($('#urlmovie').val().indexOf('www') != -1) {
                $('.target_on').empty().append($videoClone2);
                if ($('#autoplay').is(":checked") == true) {
                    if ($('#list1').hasClass('wrap_fullpage')) {
                        $('.target_on').addClass('autoplay');
                        $('.target_on video').attr('data-autoplay', 'data-autoplay');
                    } else {
                        $('.target_on').addClass('autoplay');
                        $('.target_on video').attr('muted', 'muted').attr('autoplay', 'autoplay');
                    }
                } else {
                    if ($('#list1').hasClass('wrap_fullpage')) {
                        $('.target_on').removeClass('autoplay');
                        $('.target_on video').removeAttr('data-autoplay');
                    } else {
                        $('.target_on').removeClass('autoplay');
                        $('.target_on video').removeAttr('muted', 'muted').removeAttr('autoplay', 'autoplay');
                    }
                }
            }
        } else {
            $('.target_on').empty().append($videoClone2);
            if ($('#autoplay').is(":checked") == true) {
                $('.wrap_movie_area').addClass('autoplay');
                $('.target_on video').attr('muted', 'muted').attr('autoplay', 'autoplay');
            } else {
                $('.wrap_movie_area').removeClass('autoplay');
                $('.target_on video').removeAttr('muted', 'muted').removeAttr('autoplay', 'autoplay');
            }
        }


        if ($('#fitmovie').is(":checked") == true) {
            $('.target_on').closest('.div_movie_el').addClass('fullvideo');
        } else {
            $('.target_on').closest('.div_movie_el').removeClass('fullvideo');
        }
        if ($('.set_movie #lightboxchk').is(":checked")) {
            $('.target_on').addClass('lightbox').append('<div class="showlightbox"></div>');
        } else {
            $('.target_on').removeClass('lightbox on').remove('.showlightbox');
        }
        if ($('#urlmovie').val().substring(9, 10) == 'w' || $('.video-js').length != 0) {
            // eval("videojs(document.querySelector('." + $runVideojs + "'))");
            $('.wrap_ivm .wrap_movie_area').css('height', 'auto');
        } else {
            $('.wrap_ivm .wrap_movie_area').css('height', '');
        }
        $('.set_movie').remove();
        $('.mask').hide();
        $('#autoplay').prop("checked", false);
        $('.target_on').removeClass('target_on');

    });
    $('.set_movie .btn_close').on('click', function () {
        $('.set_movie').remove();
    });
}

$(document).on("click", ".mask_youtube", function (e) {
    $(this).remove();
});


function mainVideoElSetting($MainvideoAreaTarget) {
    var txtcont = $MainvideoAreaTarget.find('.wrap_txt').clone();
    var summernoteDefalutSetting = summernoteDsetting();
    $('.main_set_movie .edit_area').append(txtcont);


    if ($MainvideoAreaTarget.find('iframe').length != 0) {
        var mIframeSrc = $MainvideoAreaTarget.find('iframe').attr('src');
        var bgThumbImg = mIframeSrc.substring(25, 36);
        var mIframeSrc2 = 'https://youtu.be/' + bgThumbImg;
        $('#urlmovie').val(mIframeSrc2);
        $('.main_set_movie .edit_area').summernote(summernoteDefalutSetting);
        $('.main_set_movie .note-editing-area').css('background-image', 'url("https://img.youtube.com/vi/' + bgThumbImg + '/maxresdefault.jpg")');
    }
    if ($MainvideoAreaTarget.find('video').length != 0) {
        var mVideoSrc = $MainvideoAreaTarget.find('.mainvideo_init').attr('src');
        $('#urlmovie').val(mVideoSrc);
        var bgThumbImg = mVideoSrc.replace('board/movie', 'thumnail').replace('mp4', 'jpg');
        $('.main_set_movie .edit_area').summernote(summernoteDefalutSetting);
        $('.main_set_movie .note-editing-area').css('background-image', 'url("' + bgThumbImg + '")');
    }

    function mainVideoPreview() {
        if (($('#urlmovie').val() != ' ')) {
            if ($('#urlmovie').val().substring(8, 9) == 'y') {
                var $urlmovieVal = $('#urlmovie').val().substring(17);
                $('.main_set_movie .note-editing-area').css('background-image', 'url("https://img.youtube.com/vi/' + $urlmovieVal + '/maxresdefault.jpg")');

            } else if ($('#urlmovie').val().substring(8, 9) == 'w') {
                var $urlmovieVal = $('#urlmovie').val().replace('board/movie', 'thumnail').replace('mp4', 'jpg');
                $('.main_set_movie .note-editing-area').css('background-image', 'url("' + $urlmovieVal + '")');
            }
        }
    }

    $(document).on("keydown", "#urlmovie", function (key) {
        if (key.keyCode == 13) {
            mainVideoPreview();
        }
    });
    $(document).on("focusout", "#urlmovie", function () {
        mainVideoPreview();
    });

    var m_video_src;
    $(document).on("change", ".file_multi_video", function (evt) {
        $('#urlmovie').val(' ').attr("disabled", true);
        m_video_src = URL.createObjectURL(this.files[0]);
    });
    $('.complete').on('click', function () {
        var editMvTxt = $('.note-editable .wrap_txt').clone();
        console.log(m_video_src);
        if (($('#urlmovie').val() != ' ')) {
            if ($('#urlmovie').val().substring(8, 9) == 'y') {
                var $urlmovieVal = $('#urlmovie').val().substring(17);
                $MainvideoAreaTarget.empty().append('<div class="mask_mvis"></div><iframe width="100%" height="100%" src="//www.youtube.com/embed//' + $urlmovieVal + '?mode=opaque&amp;autoplay=1&amp;loop=1&amp;rel=0&amp;playlist=&amp;showinfo=1&amp;controls=&amp;mute=1" frameborder = "0" allowfullscreen = "" ></iframe>');
                $('.main_set_movie').remove();
                var mainVideoRatio = 1907 / 1074;
                var mainVideoRatioInit = $(window).width() / mainVideoRatio;
                $MainvideoAreaTarget.find('iframe').css({
                    height: $(window).width() / mainVideoRatio
                })
            } else {
                var $urlmovieVal = $('#urlmovie').val();
                $MainvideoAreaTarget.empty().append('<div class="mask_mvis"></div><video style="width:100%;" muted autoplay><source src="' + $urlmovieVal + '" class="mainvideo_init"></video>');
                $('.main_set_movie').remove();
            }
        }
        if (m_video_src != undefined) {
            var $urlmovieVal = m_video_src;
            $MainvideoAreaTarget.empty().append('<div class="mask_mvis"></div><video style="width:100%;" muted autoplay><source src="' + $urlmovieVal + '" class="mainvideo_init"></video>');
            $('.main_set_movie').remove();
        }
        $MainvideoAreaTarget.append(editMvTxt);
    });
}

$(document).on('click', '.showlightbox', function (e) {
    $(this).closest('.lightbox').addClass('on');
    if ($('iframe').length == 0) {
        var videoLightBox = $(this).closest('.lightbox').find('video').clone().addClass('lightboxVideo');
        $('body').append(videoLightBox);
    } else {
        lightyoutubu = $(this).closest('.lightbox').find('iframe').attr('src');
        lightyoutubu2 = lightyoutubu + "&amp;autoplay=1&amp;mute=1";
        $(this).closest('.lightbox').find('iframe').attr('src', lightyoutubu2);
    }
    $('.mask').addClass('movie').show();

})
$(document).on('click', '.mask.movie', function (e) {
    $('.lightbox').removeClass('on');
    $('.mask').hide();
    $('.lightboxVideo').remove();
    if ($('iframe').length != 0) {
        $('.lightbox iframe').attr('src', lightyoutubu);
    }
});
$(document).on('click', '.main_set_movie .btn_close', function (e) {
    $('.main_set_movie').remove();
});


function calenderStart() {
    var calendarIdx = 'calendar' + $('.calendar').length;
    $('.calendar').each(function (index) {
        $(this).attr('id', calendarIdx);
        console.log(index);
    });
    var calendarEl = document.getElementById(calendarIdx);


    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        defaultDate: '2020-02-12',
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectMirror: true,
        select: function (arg) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay
                })
            }
            calendar.unselect()
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'All Day Event',
                start: '2020-02-01'
            },
            {
                title: 'Long Event',
                start: '2020-02-07',
                end: '2020-02-10'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-02-09T16:00:00'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-02-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2020-02-11',
                end: '2020-02-13'
            },
            {
                title: 'Meeting',
                start: '2020-02-12T10:30:00',
                end: '2020-02-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2020-02-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2020-02-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2020-02-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2020-02-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2020-02-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2020-02-28'
            }
        ]
    });

    calendar.render();
}

function mapElSetting() {
    $('.map_area').each(function (index) {
        $(this).attr('id', 'map_area' + (index + 1))
    });

    var mapLength = $('.map_area').last().attr('id');

    $(document).on('click', '.complete', function (e) {
        mapCreate(mapLength);
        $('.set_map').remove();
        $('.mask').hide();
    });
    $(document).on('click', '.btn_close', function (e) {
        $('.set_map').remove();

    })
}
function mapBasicLoad() {
    $('.map_area').each(function (index) {
        $(this).attr('id', 'map_area' + (index + 1))
    });
    var mapLength = $('.map_area').last().attr('id');
    mapCreate(mapLength);
}

function mapCreate(mapLength) {
    var myLatlng = new google.maps.LatLng(35.837143, 128.558612); // 위치값 위도 경도
    var Y_point = 37.4815559;        // Y 좌표
    var X_point = 126.878715;       // X 좌표
    var zoomLevel = 16;             // 지도의 확대 레벨 : 숫자가 클수록 확대정도가 큼
    var markerTitle = "대구광역시";      // 현재 위치 마커에 마우스를 오버을때 나타나는 정보
    var markerMaxWidth = 300;               // 마커를 클릭했을때 나타나는 말풍선의 최대 크기

    // 말풍선 내용
    var contentString = '<div>' +
        '<p>안녕하세요. 구글지도입니다.</p>' +

        '</div>';
    var myLatlng = new google.maps.LatLng(Y_point, X_point);
    var mapOptions = {
        disableDefaultUI: true,
        zoom: zoomLevel,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById(mapLength), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: markerTitle
    });
    var infowindow = new google.maps.InfoWindow(
        {
            content: contentString,
            maxWizzzdth: markerMaxWidth
        }
    );
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

function galleryElSetting(galleryTarget) {
    var sel_files = [];
    var $lightboxchk = $('#lightboxchk');
    var $newWindow = $('#newWindow');

    $('#gallery_tit').val(galleryTarget.find('li').eq(0).attr('data-title'));
    $('#gallery_desc').val(galleryTarget.find('li').eq(0).attr('data-desc'));
    $('#inp_btn_url').val(galleryTarget.find('li').eq(0).find('a').attr('href'));

    if (galleryTarget.find('li').eq(0).hasClass('lightbox_item')) {
        $lightboxchk.prop("checked", true);
    }
    if (galleryTarget.find('li').eq(0).find('a').attr('target') == '_blank') {
        $newWindow.prop("checked", true);
    }


    $(document).ready(function () {
        $("#input_imgs").on("change", handleImgFileSelect);
    });

    function handleImgFileSelect(e) {
        // 이미지 정보들을 초기화
        sel_files = [];
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        var index = 0;

        filesArr.forEach(function (f) {
            if (!f.type.match("image.*") && !f.type.match("video.*")) {
                alert("이미지 혹은 비디오만 올리실 수 있습니다.");
                return;
            }
            if (f.type.match("video.*")) {
                var videoEl = URL.createObjectURL(f);
                var addSlider = '<li class="grid-square lightbox_item"  data-title=" " data-desc=" " >'
                addSlider += '<div class="wrap_img_txt"><span class="btn_del"></span><video src="' + videoEl + '"></video></div>'
                //  addSlider += ''
                addSlider += '   </li>'
                $(".add_imgs_area").append(addSlider);
                index++;
            }
            if (f.type.match("image.*")) {
                sel_files.push(f);
                var reader = new FileReader();
                reader.onload = function (e) {
                    var addSlider = '<li class="grid-square lightbox_item" data-title=" " data-desc=" " >'
                    addSlider += '       <div class="wrap_img_txt"><span class="btn_del"></span><a href="#"><img src="' + e.target.result + '" /></a></div>'
                    //  addSlider += ''
                    addSlider += '   </li>'

                    $(".add_imgs_area").append(addSlider);
                    index++;
                }
                reader.readAsDataURL(f);
            }
            $('#input_imgs').val('');
        });


    }


    var currentSliderSetting = galleryTarget.find('li').clone().addClass('grid-square');
    //var undoSetting = mainVisTarget.find('.wrap_txt').clone().addClass('grid-square');
    $('.add_imgs_area').append(currentSliderSetting);
    $('.add_imgs_area li').eq(0).addClass('now');

    /* 썸네일 sort 기능 */
    newSortList(grid_preview);

    $("#lightboxchk").change(function () {
        if ($("#lightboxchk").is(":checked")) {
            $('#newWindow').prop("checked", false);
            $('.inp_btn_url').val('');
        }
    });
    $("#newWindow").change(function () {
        if ($("#newWindow").is(":checked")) {
            $('#lightboxchk').prop("checked", false);
        }
    });
    $(document).on('focus', '.inp_btn_url', function () {
        $('#lightboxchk').prop("checked", false);
    });


}
$(document).on('click', '.btn_del', function (e) {
    var delMvItem = $(this).closest('li').remove();
});
/* 불러온 이미지를 클릭하면 해당 내용을 에디터로 가져오기 */
$(document).on('click', '.add_imgs_area li', function (e) {
    $('.prev').removeClass('prev');
    var saveDataTitle = $('#gallery_tit').val();
    var saveDataDesc = $('#gallery_desc').val();
    var saveUrl = $('#inp_btn_url').val();
    var $lightboxchk = $('#lightboxchk');
    var $newWindow = $('#newWindow');

    if ($lightboxchk.is(":checked")) {
        $('.now').addClass('prev').addClass('lightbox_item').attr('data-title', saveDataTitle).attr('data-desc', saveDataDesc).find('a').attr('href', '').removeAttr('target', '').end().removeClass('now');
    } else if ($newWindow.is(":checked")) {
        $('.now').addClass('prev').removeClass('lightbox_item').attr('data-title', saveDataTitle).attr('data-desc', saveDataDesc).find('a').attr('href', saveUrl).attr('target', '_blank').end().removeClass('now');
    } else {
        $('.now').addClass('prev').removeClass('lightbox_item').attr('data-title', saveDataTitle).attr('data-desc', saveDataDesc).find('a').attr('href', saveUrl).end().removeClass('now');
    }

    $('#gallery_tit, #gallery_desc, #inp_btn_url').val(' ');
    $lightboxchk.prop("checked", false);
    $newWindow.prop("checked", false);

    $(this).addClass('now');
    if ($(this).hasClass('lightbox_item')) {
        $lightboxchk.prop("checked", true);
    }
    if ($(this).find('a').attr('target') == '_blank') {
        $newWindow.prop("checked", true);
    }
    $('#gallery_tit').val($(this).attr('data-title'));
    $('#gallery_desc').val($(this).attr('data-desc'));
    $('#inp_btn_url').val($(this).find('a').attr('href'));
    return false;
});
$(document).on('click', '.btn_add_imgs', function (e) {
    $('#input_imgs')[0].click();
})

$(document).on('click', '.pop_gallery .btn_pop_mv', function (e) {
    var saveDataTitle = $('#gallery_tit').val();
    var saveDataDesc = $('#gallery_desc').val();
    var saveUrl = $('#inp_btn_url').val();
    var $lightboxchk = $('#lightboxchk');
    var $newWindow = $('#newWindow');

    if ($lightboxchk.is(":checked")) {
        $('.now').addClass('lightbox_item').attr('data-title', saveDataTitle).attr('data-desc', saveDataDesc).find('a').attr('href', '').removeAttr('target', '');
    } else if ($newWindow.is(":checked")) {
        $('.now').removeClass('lightbox_item').attr('data-title', saveDataTitle).attr('data-desc', saveDataDesc).find('a').attr('href', saveUrl).attr('target', '_blank');
    } else {
        $('.now').removeClass('lightbox_item').attr('data-title', saveDataTitle).attr('data-desc', saveDataDesc).find('a').attr('href', saveUrl);
    }
    $('.wrap_gallery').empty().append($('.add_imgs_area li').clone().removeClass('now grid-square prev'));
    $('.pop_gallery').remove();
    $('.mask').hide();
});
$(document).on({
    mouseenter: function () {
        $(this).find('a').append('<div class="mask_text"><span class="wrap_txt"></span></div>');
        $('.mask_text .wrap_txt').text($(this).parent().attr('data-desc'));
    },
    mouseleave: function () {
        $('.mask_text').remove();
    }
}, ".wrap_gallery .wrap_img_txt");

$(document).on('click', '.wrap_gallery .lightbox_item', function (e) {
    $(this).addClass('on');
    $('body').append('<div class="lightbox_g"></div>');

    GalleryLightbox_length = $('.lightbox_item').length;//전체 갤러리 이미지 수
    curr_gallIdx = $('.wrap_gallery').find('.lightbox_item.on').index() + 1;//현재 이미지 수

    $('.lightbox_g').append('<div class="cnt_image_info"><span class="current_page">' + 1 + '</span>/<span class="ttl_page">' + GalleryLightbox_length + '</span></div><div class="wrap_big"><div class="area_cont"></div><div class="area_foot"></div></div>');

    if ($(this).find('img').length != 0) {
        $('.lightbox_g .area_cont').append('<img src="' + $(this).find('img').attr('src') + '" />');
    } else {
        $('.lightbox_g .area_cont').append('<video src="' + $(this).find('video').attr('src') + '" autoplay controls="true""></video>');
    }
    $('.wrap_big').append('<div class="area_side_arrow"></div>');
    $('.lightbox_g .area_side_arrow').append("<span class='btn_prev'></span><span class='btn_next'></span>");
    $('.lightbox_g .area_foot').append('<div class="text_box"><div class="text_title">' + $(this).attr("data-title") + '</div><div class="text_desc">' + $(this).attr("data-desc") + '</div></div>');
    $('.mask').addClass('gallerymask').show();
    return false;
});
$(document).on('click', '.lightbox_g .btn_next', function (e) {

    if (!($('.lightbox_item').eq(GalleryLightbox_length - 1).hasClass('on'))) {
        galleryBtn('next');
    }
});
$(document).on('click', '.lightbox_g .btn_prev', function (e) {
    if (!($('.lightbox_item').eq(0).hasClass('on'))) {
        galleryBtn('prev')
    }
});
$(document).on('click', '.gallerymask', function (e) {
    $('.lightbox_g').remove();
    $('.mask').hide();
});

function galleryBtn(target) {
    $('.wrap_gallery li').removeClass(target);
    $('.wrap_gallery li.on').addClass(target).removeClass('on');
    $('.wrap_gallery li').removeClass('on');

    if (target == 'next') {
        $('.wrap_gallery .lightbox_item.' + target).nextAll('.lightbox_item').eq(0).addClass('on');
        $('.lightbox_item').each(function (index, el) {
            if ($(this).hasClass('on')) {
                cpIdx = $(".lightbox_item").index(this);
            }
        })
        $('.current_page').text(cpIdx + 1);
    } else if (target == 'prev') {
        $('.wrap_gallery li.' + target).prevAll('.lightbox_item').eq(0).addClass('on');
        $('.lightbox_item').each(function (index, el) {
            if ($(this).hasClass('on')) {
                cpIdx2 = $(".lightbox_item").index(this);
            }
        })
        $('.current_page').text(cpIdx2 + 1);
    }
    if ($('.wrap_gallery li.on').find('img').length != 0) {
        $('.lightbox_g video').hide();
        if ($('.lightbox_g').find('img').length == 0) {
            $('.lightbox_g .area_cont').prepend('<img src="' + $('.wrap_gallery li.on').find('img').attr('src') + '" />');
        } else {
            $('.lightbox_g img').show().attr('src', $('.wrap_gallery li.on img').attr('src'));
        }
    } else {
        $('.lightbox_g img').hide();
        if ($('.lightbox_g').find('video').length == 0) {
            $('.lightbox_g .area_cont').prepend('<video src="' + $('.wrap_gallery li.on').find('video').attr('src') + '" autoplay controls="true""></video>');
        } else {
            $('.lightbox_g video').show().attr('src', $('.wrap_gallery li.on video').attr('src'));
        }
    }
    $('.text_title').text($('.wrap_gallery li.on').attr('data-title'));
    $('.text_desc').text($('.wrap_gallery li.on').attr('data-desc'));
}

$(document).on('click', '.mask .btn_close', function (e) {
    if (!($(this).closest('.mask').hasClass('mask_mainvisual'))) {
        $('.wrap_gallery li').removeClass('on prev next');
        $('.wrap_pop').remove();
        $('.mask').hide();

        checkOverHeader('onon');
    }
});

function customSelect() {
    $('.sel_sns').wSelect();
}


/* 버튼설정 메뉴 */
function rightBtnSetting(el) {
    var targetbtn = el.closest('.btn_area').find('.btn_click');
    $(".pop_area").load("include/popup.html .btn_only", function () {
        $('.mask').show();
        h_builder_common(targetbtn);
        checkOverHeader();
    });
}


function rightBtnDel(el) {
    var targetBtnArea = el.closest('.btn_area');
    targetBtnArea.find('.btn_click').remove();
    if (targetBtnArea.find('.btn_add').length == 0) {
        targetBtnArea.append('<img src="images/btn_add.svg" style="width:50px" class="btn_add" alt="버튼추가" onclick="BtnClickAdd($(this))">');
    }
    if (targetBtnArea.closest('section').find('.btn_click').length == 0) {
        targetBtnArea.closest('section').find('.btn_area').addClass('off');
    }
}
function BtnClickAdd(el) {
    el.closest('.btn_area').append('<a href="#" class="btn_click">BUTTON</a>');
    el.closest('.btn_area').find('.btn_add').remove();
    el.closest('section').find('.btn_area').removeClass('off');
}


$(document).on('click', '.mask .btn_close, .wrap_pop  .btn_close', function () {
    if ($('.wrap_pop').hasClass('pop_visual_setting')) {
        $('.pop_visual_setting .edit_area').summernote('destroy');
        var resultSlideEdit = undoSetting.removeClass('grid-square');
        mainVisOwlTarget.empty().append(resultSlideEdit);
        newOwl();
        mainVisTarget.find('.wrap_txt').show();
        $('.add_slide_area, .pop_visual_setting .note-editable, .pop_visual_setting .edit_area').empty();
        $('.pop_visual_setting').remove();
    } else if ($('.mask').hasClass('imgLightbox')) {
        $('.mask').hide();
        $('.lightInImg').remove();

    }
    else {
        $('.wrap_pop').remove();
        $('.mask').hide();
    }
});


/* 컴포넌트 추가 */
$(document).on('click', '.component_add .btn_add', function (e) {

    var sel_section_idx = $(this).closest('section').index();
    var clickComponentAdd = $(this).parent().hasClass('top');
    $(".pop_area").load("include/popup.html .add_section_pop", function () {
        $('.mask').show();
        componentAdd(sel_section_idx, clickComponentAdd)
    });

})

function fullpageAddComponent(addSlideNumber) {
    if ($('#list1').hasClass('wrap_fullpage')) {
        var fpSectionBg = [];
        $('section').each(function (i, el) {
            fpSectionBg.push($(this).css('background-image'));
        });



        $.fn.fullpage.destroy('all');
        $('section').each(function (i, el) {
            $(this).css('background', fpSectionBg[i]);
        });
        $('#fullpage').fullpage({
            navigation: true,
            navigationPosition: 'right',
            verticalCentered: false
        });

        $.fn.fullpage.silentMoveTo(addSlideNumber);
    }
}

function componentAdd(sel_section_idx, clickComponentAdd) {

    if (clickComponentAdd) {
        $('.add_section_pop').attr('data-idx', sel_section_idx).addClass('top').removeClass('bottom');
    } else {
        $('.add_section_pop').attr('data-idx', sel_section_idx).addClass('bottom').removeClass('top');
    }

    $(document).off('click', '.pop_component_add li').on('click', '.pop_component_add li', function (e) {
        var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();

        if ($('.add_section_pop').hasClass('top')) {
            if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 1; }
            $('main section').eq(sectionIdx).before('<section class="section" data-include="include/component.html .comp' + btnIdx + '"></section>');
        } else if ($('.add_section_pop').hasClass('bottom')) {
            if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 2; }
            $('main section').eq(sectionIdx).after('<section class="section" data-include="include/component.html .comp' + btnIdx + '"></section>');
        }
        includeLayout2();

        fullpageAddComponent(addSlideNumber);

        $('.add_section_pop').remove();
        $('.mask').hide();
        if ($('.empty_page').length != 0) {
            $('.empty_page').remove();
        }
    });
    $(document).off('click', '.visual_dsgn li').on('click', '.visual_dsgn li', function (e) {
        var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();
        if ($('.add_section_pop').hasClass('top')) {
            if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 1; }
            $('main section').eq(sectionIdx).before('<section class="section" data-include="include/component.html .mainvisual' + btnIdx + '"></section>');
        } else if ($('.add_section_pop').hasClass('bottom')) {
            if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 2; }
            $('main section').eq(sectionIdx).after('<section class="section" data-include="include/component.html .mainvisual' + btnIdx + '"></section>');
        }
        includeLayout_mainvis();
        fullpageAddComponent(addSlideNumber);
        $('.add_section_pop').remove();
        $('.mask').hide();
        if ($('.empty_page').length != 0) {
            $('.empty_page').remove();
        }

    });
    $(document).off('click', '.wrap_dsgn_list dl').on('click', '.wrap_dsgn_list dl', function (e) {
        var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();
        if ($(this).index() != 4) {
            if ($('.add_section_pop').hasClass('top')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 1; }
                $('main section').eq(sectionIdx).before('<section class="section" data-include="include/component.html .designEl' + btnIdx + '"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 2; }
                $('main section').eq(sectionIdx).after('<section class="section"  data-include="include/component.html .designEl' + btnIdx + '"></section>');
            }

        } else {
            if ($('.add_section_pop').hasClass('top')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 1; }
                $('main section').eq(sectionIdx).prepend('<section class="section"  data-include="include/component.html .designEl' + btnIdx + '"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 2; }
                $('main section').eq(sectionIdx).append('<section class="section"  data-include="include/component.html .designEl' + btnIdx + '"></section>');
            }
        }
        includeLayout_designEl();
        fullpageAddComponent(addSlideNumber);
        $('.add_section_pop').remove();
        $('.mask').hide();
        if ($('.empty_page').length != 0) {
            $('.empty_page').remove();
        }
    });
    $(document).off('click', '.wrap_db_list dl').one('click', '.wrap_db_list dl', function (e) {
        var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();
        if (btnIdx == 0) {
            if ($('.add_section_pop').hasClass('top')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 1; }
                $('main section').eq(sectionIdx).before('<section  data-include="board/list.html"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 2; }
                $('main section').eq(sectionIdx).after('<section  data-include="board/list.html"></section>');
            }
            includeLayout();
            fullpageAddComponent(addSlideNumber);
        }
        if (btnIdx == 1) {
            if ($('.add_section_pop').hasClass('top')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 1; }
                $('main section').eq(sectionIdx).before('<section  data-include="include/pb_gallery.html"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 2; }
                $('main section').eq(sectionIdx).after('<section  data-include="include/pb_gallery.html"></section>');
            }
            includeLayout();
            fullpageAddComponent(addSlideNumber);
        }
        if (btnIdx == 2) {
            if ($('.add_section_pop').hasClass('top')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 1; }
                $('main section').eq(sectionIdx).before('<section  data-include="include/component.html .dbEl' + btnIdx + '"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                if ($('#list1').hasClass('wrap_fullpage')) { var addSlideNumber = $('.section.active').index() + 2; }
                $('main section').eq(sectionIdx).after('<section  data-include="include/component.html .dbEl' + btnIdx + '"></section>');
            }
            includeLayout_calendarEl();
            fullpageAddComponent(addSlideNumber);
        }


        $('.add_section_pop').remove();
        $('.mask').hide();
        if ($('.empty_page').length != 0) {
            $('.empty_page').remove();
        }
    });

    $(document).on('click', '.add_section_pop .btn_close', function (e) {
        $('.add_section_pop').remove();
    });
    $(document).on('click', '.add_section_pop .wrap_type_list span', function (e) {
        var $typelistIdx = $(this).index();
        $('.add_section_pop .wrap_type_list span').removeClass('on');
        $(this).addClass('on');

        $('.wrap_dsgn_list ul').hide().removeClass('on');
        if ($typelistIdx == 0) {
            $('.wrap_dsgn_list .visual_dsgn').show();
        } else if ($typelistIdx == 1) {
            $('.wrap_dsgn_list .content_dsgn').show();
        }

    });


}
$(".mCustomScrollbar, .header.leftmenu  .gnb").mCustomScrollbar({
    axis: "y",
    live: true,
    theme: "rounded-dark"
});
