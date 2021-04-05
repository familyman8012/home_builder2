function newOwl() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items:1
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
newSortList(list1);


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
$(function () { includeLayout(); });
function includeLayout() { var includeArea = $('[data-include]'); var self, url; $.each(includeArea, function () { self = $(this); url = self.data("include"); self.load(url, function () { self.removeAttr("data-include"); }); }); }
function includeLayout2() {
    var includeArea = $('[data-include]'); var self, url;
    $.each(includeArea, function () {
        self = $(this); url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");
            gridAreaCreate();
        });
    });
}
function includeLayout_mainvis() {
    var includeArea = $('[data-include]'); var self, url;
    $.each(includeArea, function () {
        self = $(this); url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");            
            $('.owl-carousel').owlCarousel('destroy');
            newOwl();
            var mainVideoRatio = 1907/1074;

            var mainVideoRatioInit = $(window).width() / mainVideoRatio;
            $('.wrap_mainmovie_area iframe').css({
                height: $(window).width() / mainVideoRatio
            })
        });
    });
}
function includeLayout_designEl() {
    var includeArea = $('[data-include]'); var self, url;
    $.each(includeArea, function () {
        self = $(this); url = self.data("include");
        self.load(url, function () {
            self.removeAttr("data-include");
        });
    });
}
function includeLayout_calendarEl() {
    var includeArea = $('[data-include]'); var self, url;
    $.each(includeArea, function () {
        self = $(this); url = self.data("include");
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
    }
    else if (posX + menuWidth + secMargin >= winWidth) {
        //Case 2: right overflow:
        posLeft = posX - menuWidth - secMargin + "px";
        posTop = posY + secMargin + "px";
    }
    else if (posY + menuHeight + secMargin >= winHeight) {
        //Case 3: bottom overflow:
        posLeft = posX + secMargin + "px";
        posTop = posY - menuHeight - secMargin + "px";
    }
    else {
        //Case 4: default values:
        posLeft = posX + secMargin + "px";
        posTop = posY + secMargin + "px";
    };
}


/* 오른쪽 메뉴 */
$(document).ready(function () {
    $(document).on('mousedown', 'section', function (e) {
        e.stopPropagation();
        rightMenuSection($(this));
    }).on('mousedown', '.img_area', function (e) {
        e.stopPropagation();
        rightImgEdit($(this));
    }).on('mousedown', 'section .txt_area, footer .txt_area', function (e) {
        e.stopPropagation();
        rightMenuTxtEdit($(this));
    }).on('mousedown', '.wrap_txt_area', function (e) {
        e.stopPropagation();
        rightTxtingEdit($(this));
    }).on('mousedown', '.btn_area', function (e) {
        e.stopPropagation();
        rightMenuBtnEdit($(this));
    }).on('mousedown', 'header .logo', function (e) {
        e.stopPropagation();
        rightMenulogoEdit($(this));
    }).on('mousedown', 'footer .logo', function (e) {
        e.stopPropagation();
        rightFooterlogoEdit($(this));
    }) .on('mousedown', '.login.on', function (e) {
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
    }).on('mousedown', '.wrap_images_area', function(e){
        e.stopPropagation();
        rightMenuImage($(this));
    }).on('mousedown', '.wrap_movie_area', function (e) {
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
    });
});



/* 오른쪽 메뉴 */
function rightMenuSection(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        if ($('.note-editor').hasClass('note-airframe')) {
            saveTxtEditing();
        }
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu1"></div>');
        rightMenuSettion(el);
    }
}
function rightImgEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu2"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuTxtEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu3"></div>');
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
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu4"></div>');
        rightMenuSettion(el);
    }
}



function rightMenuSettion(el) {
    includeLayout()
    rightClickMenu($(".right-click-layer"));
    el.children('.right-click-layer').css({
        "left": posLeft,
        "top": posTop
    }).show();
    $('body').click(function () {
        $('.right-click-layer').remove();
    });
}

function rightMenulogoEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu5"></div>');
        rightMenuSettion(el);
    }
}

function rightMenulogin(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu6"></div>');
        rightMenuSettion(el);
    }
}


function rightMenuSearch(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu7"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuHeader(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu8"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuMainVis(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu9"></div>');
        rightMenuSettion(el);
    }
}

function rightFooterlogoEdit(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu10"></div>');
        rightMenuSettion(el);
    }
}

function rightMenuFooter(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu11"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuImage(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu12"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuVideo(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu13"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuMainVideo(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu14"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuMap(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu15"></div>');
        rightMenuSettion(el);
    }
}
function rightMenuPadding(el) {
    event.stopPropagation();
    if ((event.button == 2) || (event.which == 3)) {
        $('.right-click-layer').remove();
        el.prepend('<div class="right-click-layer" data-include="include/right_menu.php .right_menu16"></div>');
        rightMenuSettion(el);
    }
}

/* 레이어 팝업 section 위, 아래 순서 바꾸기 */
function sectionMoveDown(nowpos) {
    event.stopPropagation();
    nowpos.closest('section').before(nowpos.closest('section').next());
    $('.right-click-layer').remove();
}
function sectionMoveUp(nowpos) {
    event.stopPropagation();
    nowpos.closest('section').after(nowpos.closest('section').prev());
    $('.right-click-layer').remove();
}
function sectionBgLoad(nowpos) {
   var targetSection = nowpos.closest('section');
    $(".pop_area").load("include/popup.php .pop_section_bg", function () { sectionBg(targetSection) });
}
function sectionDel(nowpos) {
    event.stopPropagation();
    nowpos.closest('section').remove();
}
function paddingDel(nowpos) {
    event.stopPropagation();
    nowpos.closest('.padding_sty2').remove();
}
/*  헤더영역 설정하기 */
$('.btn_all_menu').on('click',function(){
    $(".pop_area").load("include/popup.php .edit_all_menu", function () { menuSetting() });
});
$('.btn_this_menu').on('click', function () {
    $(".pop_area").load("include/popup.php .edit_one_menu", function () {});
});


$(document).on('click', '.edit_one_menu .btn_close', function () {
    $('.edit_one_menu').remove();
});

/* 공통설정 메뉴 */
function headSty() {
    $(".pop_area").load("include/popup.php .set_header", function () { headStySel() });
}

function headStySel() {
    var headInit = $('header').attr('class');

    $('.set_header .btn').on('click', function () {
        var sty = ['normal', 'center', 'vertical'];
        var headBtnSelect = $(this).parent().index();
        $('header').removeAttr('class');
        $('header').addClass(sty[headBtnSelect]);
    });

    $('.set_header .btn_close').on('click', function () {
        $('header').removeAttr('class');
        $('header').addClass(headInit);
        $('.set_header').remove();
    });
    $('.set_header .btn_apply').on('click', function () {
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
    var headerlogo = el.closest('.logo').hasClass('header_logo');
    var targetlogo = el.closest('.logo');
    targetlogo.find('.sel_logo').click();
    targetlogo.find('.sel_logo').change(function () {
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
    logoSetting();
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
    $(".pop_area").load("include/popup.php .common_edit", function () { h_builder_common($('.btn_click')) });
});

function menuSetting() {
    $(document).on('click','.edit_all_menu .btn_del', function(){
        $('.pop_area').append('<section data-include="include/popup.php .pop_menudel"></section>');
        includeLayout();
    });
    $(document).on('click', '.edit_all_menu .btn_close', function () {
        $('.pop_menudel').remove();
        $('.edit_all_menu').remove();

    });
    $(document).on('click', '.pop_menudel .btn_cancle', function () {
        $('.pop_menudel').remove();
    });

}

function h_builder_common(targetel) {
    /* 공통설정 */
    /* 본문 */
    /* 배경색 */
    var bodyColorSetting;

    $('.com_set .com_bgc').minicolors({
        letterCase: 'lowercase',
        opacity: true,
        change: function () {
            bodyColorSetting = $('.com_set  .com_bgc').val();
            //$('body').css('background-color', bodyColorSetting);
        }
    });

    $('#font_family').change(function(event) {
        $('.set_fontfamily').remove();
        var ffVal = $('#font_family').val();
        $('body').append('<div class="set_fontfamily"><link rel="stylesheet"  href="css/' + ffVal + '.css"></div>');

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
        if (bodyColorSetting != 'undefined') {
            $('body').css('background-color', bodyColorSetting);
        }
        var btnCommClass = $('.preview_btn_area .btn_click').attr('class');
        targetel.attr('class', btnCommClass);
        if (btnColorSetting != 'undefined') {
            targetel.css('color', btnColorSetting);
        }
        if (btnBgSetting != 'undefined') {
            targetel.css('background-color', btnBgSetting);
        }
        if (btnlineSetting != 'undefined') {
            targetel.css('border', '1px solid' + btnlineSetting);
        }
        if ($(this).closest('.com_set').hasClass('btn_only')) {
            if ($('.inp_btn_url').val() != ' ') {
                btnElementTarget.attr('href', $('.inp_btn_url').val());
            }
            if ($('.inp_btn_newwindow').is(":checked")) {
                btnElementTarget.attr('target', '_blank');
            }
        }

        $('.com_set').remove();
    });
    $('.com_set .btn_close').on('click', function () {
        $('.com_set').remove();
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

    $(".pop_area").load("include/popup.php .pop_visual_setting", function () { mainVisualEdit(mainVisTarget, mainVisOwlTarget)});
}

function mainVisualEdit(mainVisTarget, mainVisOwlTarget) {

    var summernoteDefalutSetting = summernoteDsetting();
    // 이미지 정보들을 담을 배열
    var sel_files = [];
    $(document).on('click', '.btn_add_slide', function (e) {
        $('#input_imgs')[0].click();
    })
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
            if (!f.type.match("image.*")) {
                alert("확장자는 이미지 확장자만 가능합니다.");
                return;
            }
            sel_files.push(f);
            var reader = new FileReader();
            reader.onload = function (e) {
                var addSlider = '<div class="wrap_txt" style="background-image: url(' + e.target.result + ')">'
                addSlider += '       <div class="mask"></div><div class="btn_del"></div>'
                addSlider += '       <div class="txt_area"><h2>텍스트를 입력해주세요.</h2><h3>텍스트를 입력해주세요.</h3><p>텍스트를 입력해주세요</p></div>'
                addSlider += '   </div>'

                $(".add_slide_area").append(addSlider);
                index++;
            }
            reader.readAsDataURL(f);


        });
    }
    $(document).on('click', '.btn_img_del', function (e) {
        var delMvItem = $(this).closest('.item').index();
        $('.item').eq(delMvItem).remove();
        $('.add_slide_area .wrap_txt').eq(delMvItem).remove();
    });

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
    $('.pop_visual_setting .edit_area').append(mainVisTarget.find('.wrap_txt').eq(0).find('.txt_area').clone());
    $('.pop_visual_setting .edit_area').summernote(summernoteDefalutSetting);
    $('.pop_visual_setting .note-editable').attr('style', $('.add_slide_area .wrap_txt').eq(0).attr('style')).append('<div class="mask"></div>');


    $(document).on('click', '.pop_visual_setting .btn_del', function (e) {
        e.stopPropagation();
        var btnDelEl = $(this).closest('.wrap_txt');
        $('.prev').removeClass('prev');
        $('.pop_visual_setting .edit_area').summernote('destroy');
        $('.pop_visual_setting .note-editable, .pop_visual_setting .edit_area').empty();
        var newfirstEl = btnDelEl.next();
        newfirstEl.addClass('now');
        var newFirstClone = newfirstEl.find('.txt_area').clone();
        $('.pop_visual_setting .edit_area').append(newFirstClone).append('<div class="mask"></div>');
        $('.pop_visual_setting .edit_area').summernote(summernoteDefalutSetting);
        $('.pop_visual_setting .note-editable').removeAttr().attr('style', newfirstEl.attr('style'));
        btnDelEl.remove();

    });

    /* 불러온 이미지를 클릭하면 해당 내용을 에디터로 가져오기 */
    $(document).on('click', '.add_slide_area .wrap_txt', function (e) {
        $('.prev').removeClass('prev');
        var t = $('.note-editable .txt_area').html();
        $('.now').addClass('prev').find('.txt_area').html(t).end().removeClass('now');
        $(this).addClass('now');
        var previewMvClone = $(this).find('.txt_area').clone();

        $('.pop_visual_setting .edit_area').summernote('destroy');
        $('.pop_visual_setting .edit_area').empty();
        $('.pop_visual_setting .edit_area').append(previewMvClone).append('<div class="mask"></div>');
        $('.pop_visual_setting .edit_area').summernote(summernoteDefalutSetting);
        $('.pop_visual_setting .note-editable').attr('style', $(this).attr('style'));
    });

    /* 썸네일 sort 기능 */
    newSortList(grid_preview);

    imgBackPosition($('.add_slide_area .wrap_txt, .pop_visual_setting .note-editable'));
    maskOnOff($('.pop_visual_setting .mvmask'), $('.pop_visual_setting .mask'));

    $('.pop_visual_setting .btn_close').one('click', function () {
        $('.pop_visual_setting .edit_area').summernote('destroy');
        var resultSlideEdit = undoSetting.removeClass('grid-square');        
        mainVisOwlTarget.empty().append(resultSlideEdit);
        newOwl();
        mainVisTarget.find('.wrap_txt').show();
        $('.add_slide_area, .pop_visual_setting .note-editable, .pop_visual_setting .edit_area').empty();
        $('.pop_visual_setting').remove();
    });
    $('.pop_visual_setting .btn_pop_mv').one('click', function () {       
        var $firstEdit = $('.pop_visual_setting .note-editable .txt_area').html();
        $('.now').find('.txt_area').html($firstEdit);
        $('.pop_visual_setting .edit_area').summernote('destroy');
        var resultSlideEdit = $('.add_slide_area .wrap_txt').clone().removeClass('now prev grid-square');        
        mainVisOwlTarget.empty().append(resultSlideEdit);
        newOwl();
        mainVisTarget.find('.wrap_txt').show();
        $('.add_slide_area, .pop_visual_setting .note-editable, .pop_visual_setting .edit_area').empty();
        $('.pop_visual_setting').remove();
    });

}

function sectionBg(targetSection) {
    $(document).ready(function () {
        $(".selimg").on("change", handleImgFileSelect);
    });

    function handleImgFileSelect(e) {
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
    imgBackPosition($(".pop_section_bg .wrap_img"));
    $("#mvmask").change(function () {
        if ($("#mvmask").is(":checked")) {
            $('.pop_section_bg .wrap_img').append('<div class="mask_section_bg"></div>').addClass('maskon');
        } else {
            $('.pop_section_bg .wrap_img').remove('.mask_section_bg').removeClass('maskon');
        }
    });
    $(document).on('click', '.pop_section_bg .btn_pop_mv', function () {
        targetSection.attr('style', $(".pop_section_bg .wrap_img").attr('style'));
        if ($('#mvmask').is(":checked")) {
            targetSection.append('<div class="mask_section_bg"></div>').addClass('maskon');
        } else {
            targetSection.remove('.mask_section_bg').removeClass('maskon');
        }
        $('.pop_section_bg').remove();      
    });
    $(document).on('click', '.pop_section_bg .btn_close', function () {
        $('.pop_section_bg').remove();      
    });
}



function imgBackPosition(el) {
    /* 백그라운드 포지션 설정 */
    $(document).on('click', '.position_ui li', function () {
        $('.position_ui_option').show();
    });
    $(document).on('click', '.position_ui_option li', function () {
        $('.position_ui li, .position_ui_option li').removeClass('active');
        var $backgroundPos = $(this).index();
        console.log($backgroundPos);
        $('.position_ui li').eq($backgroundPos).addClass('active');
        $('.position_ui_option li').eq($backgroundPos).addClass('active');
        switch ($backgroundPos) {
            case 0:
                el.css('background-position', 'left top');
                break;
            case 1:
                el.css('background-position', 'center top');
                break;
            case 2:
                el.css('background-position', 'right top');
                break;
            case 3:
                el.css('background-position', 'left center');
                break;
            case 4:
                el.css('background-position', 'center center');
                break;
            case 5:
                el.css('background-position', 'right center');
                break;
            case 6:
                el.css('background-position', 'left bottom');
                break;
            case 7:
                el.css('background-position', 'left bottom');
                break;
            case 8:
                el.css('background-position', 'right bottom');
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
        newSortList(list1);
        gridAreaCreate();
    };
   var summernoteDefalutSetting = {
        addclass: {
            debug: false,
            classTags: ["section_tit_center", "section_tit_left", "visual_tit", "visual_sub_tit", "section_tit_left", "cont_page_tit", "cont_page_subtit",  "btn btn-success", "btn btn-danger", "alert alert-success", "alert alert-info", "alert alert-warning", "alert alert-danger"]
        }, 
        'codeviewFilter': false,
        'codeviewIframeFilter': true,
        'prettifyHtml': true, 
        codemirror: { // codemirror options
            theme: 'monokai',
            lineNumbers: true
        },
        toolbar: [
            ['fontsize', ['fontsize']],
            ['style', ['fontname', 'bold', 'addclass', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['color', ['forecolor']],
            ['insert', ['picture', 'video', 'link', 'table', 'hr']],
            ['para', ['ul', 'ol', 'paragraph', 'style']],
            ['height', ['height']],
            ['view', ['codeview', 'help']],
            ['close2', ['closebtn2']],
        ],
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
                'div','p', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
            ]
        },
        buttons: {
            closebtn2: closeTxtButton2
        }
    };
   return summernoteDefalutSetting;
}

function textEdit(nowpos) {


    newSort.destroy();
    newGridsort.destroy();
    
    var saveTxtEditing = function (el) {
        var markup = el.summernote('code');
        el.summernote('destroy');
        newSortList(list1);
        gridAreaCreate();
    };
    var closeTxtButton = function (context) {
        var ui = $.summernote.ui;
        var button = ui.button({
            contents: 'close',
            click: function () {
                saveTxtEditing(summernoteTraget);
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
                'div','p', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
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

}


function imgEditLoad(el) {
    var $imgeditTarget = el.closest('.img_area').find('.changedimg');
    var urledited = el.closest('.img_area').find('.url_edited');
    $(".pop_area").load("include/popup.php .pop_img_edit", function () { imgEdit($imgeditTarget, urledited) });
}

/* 이미지 수정 */
function imgEdit($imgeditTarget, urledited) {
    var $imgeditTargetWidth = $imgeditTarget.width();
    var $imgeditTargetHeight = $imgeditTarget.height();
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
            urledited.removeAttr('target').removeAttr('onclick');
            var lightimgurl = "<img src='" + $imgeditTarget.attr('src') + "' />";
            urledited.attr('href', 'javascript:lightbox("' + lightimgurl + '")');
        } else {
            if ($('#url').val() == ' ') {
                urledited.attr('href', '#').attr('onclick', 'return false');
            } else {
                urledited.attr('href', $('.pop_img_edit #url').val());
                urledited.removeAttr('onclick');
            }
        }
        if($('.wrap_pop_cont .upload-image').hasClass('on')){
            var $image_crop = $('.wrap_pop_cont .upload-image');
        } else {
            var $image_crop = $('.pop_img_edit .changingimg');
        };
        $image_crop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            $imgeditTarget.attr('src', resp);
        });
        $('.upload-image').croppie('destroy');
        $('.pop_img_edit').remove();
    });
    $("#lightboxchk").change(function () {
        if ($("#lightboxchk").is(":checked")) {
            $('.pop_img_edit #url').val('').attr('disabled', true);
            $('.pop_img_edit #newWindow').prop("checked", false).attr('disabled', true);
        } else {
            $('.pop_img_edit #url').attr('disabled', false);
            $('.pop_img_edit #newWindow').attr('disabled', false);
        }
    });
    $('.pop_img_edit .btn_close').on('click', function () {
        $('.pop_img_edit').remove();
    });    
}
function footerLoadSetting() {
    $(".pop_area").load("include/popup.php .pop_edit_footer", function () { footerSetting() });
}
function footerSetting() {
    customSelect()

    $(document).on('click', '.btn_plus_sns', function () {
        if ($('.area_sns_opt').length < 4) {
            var sns_share_clone = $('.sns_opt1').clone();
            $('.wrap_sns_opt').append(sns_share_clone);
            $('.wrap_sns_opt .area_sns_opt:last-child').removeClass('sns_opt1').find('.wSelect').remove();
            $('.sel_sns').wSelect();
        }
    });
    $(document).on('click', '.btn_del', function () {
        $(this).closest('.area_sns_opt').remove();
    });


    $('.wrap_sty_img .img_box').click(function(){
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
    $('.pop_edit_footer .btn_apply').click(function(){
       var $snsShareInfo = [];
       var $snsShareLink = [];
       var $newWindowChk = [];
        $('.sns_icon_area').empty()
       for (var i=0; i <= 3; i++) {
           $snsShareInfo.push($('.area_sns_opt .sel_sns').eq(i).val());
           $snsShareLink.push($('.area_sns_opt .link_sns').eq(i).val());
           $newWindowChk.push($('.sns_window').eq(i).is(":checked"));
           if ($snsShareInfo[i] != undefined) {
               var snsShareEl = '<a href="' + $snsShareLink[i] + '" class="icon_' + $snsShareInfo[i] + '"><i class="blind">' + $snsShareInfo[i] + '으로 공유하기</i></a>'
               $('.sns_icon_area').append(snsShareEl);
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
    });
    $('.pop_edit_footer .btn_close').click(function(){
        $('footer').addClass('footer layoutsty2');
        $('.pop_edit_footer').remove();
    });


}
function imgLoadSetting(el) {
    var $imgAreaTarget = el.closest('.wrap_images_area');
    var $imgeditTarget = el.closest('.wrap_images_area').find('.changedimg2');
    var urledited = el.closest('.wrap_images_area').find('.url_edited');
    $(".pop_area").load("include/popup.php .pop_img_edit_sty2", function () { imgElSetting($imgeditTarget, urledited, $imgAreaTarget) });
}
function videoLoadSetting(el) {   
    var $videoAreaTarget = el.closest('.wrap_movie_area');
    $(".pop_area").load("include/popup.php .set_movie", function () { videoElSetting($videoAreaTarget)});
}

function mainVideoLoadSetting(el) {
    var $MainvideoAreaTarget = el.closest('.wrap_mainmovie_area');
    $(".pop_area").load("include/popup.php .main_set_movie", function () {mainVideoElSetting($MainvideoAreaTarget) });
}
function mapLoadSetting(el) {
    var $MapAreaTarget = el.closest('.wrap_map_area');
    $(".pop_area").load("include/popup.php .set_map", function () { mapElSetting($MapAreaTarget);});
}



function imgElSetting($imgeditTarget, urledited, $imgAreaTarget) {
    var sel_file;
    console.log($imgeditTarget.attr('src'));
    $('.wrap_img_el').attr('src', $imgeditTarget.attr('src'));
    $(".pop_img_edit_sty2 .selimg3").on("change", handleImgFileSelect2);
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
    if (urledited.hasClass('lightbox')) {
        $('#lightboxchk').prop("checked", true);
    }
    if (urledited.closest('.inner_section').hasClass('full_width')) {
        $('#fitimg').prop("checked", true);
    }
   
    $('.complete').one('click', function () {
        $imgeditTarget.attr('src', $('.wrap_img_el').attr('src'));
        if ($('#newWindow').is(":checked")) {
            urledited.attr('target', '_blank');
        }
       
        if ($('.pop_img_edit_sty2 #lightboxchk').is(":checked")) {
            urledited.addClass('lightbox').removeAttr('target').removeAttr('onclick');
            var lightimgurl = "<img src='" + $imgeditTarget.attr('src') + "' />";
            urledited.attr('href', 'javascript:lightbox("' + lightimgurl + '")');
        } else {
            urledited.removeClass('lightbox');
            if ($('#url').val() == ' ') {
                urledited.attr('href', '#').attr('onclick', 'return false');
            } else {
                urledited.attr('href', $('.pop_img_edit_sty2 #url').val());
                urledited.removeAttr('onclick');
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
    });
    $("#lightboxchk").change(function () {
        if ($("#lightboxchk").is(":checked")) {
            $('.pop_img_edit_sty2 #url').val('').attr('disabled', true);
            $('.pop_img_edit_sty2 #newWindow').prop("checked", false).attr('disabled', true);
        } else {
            $('.pop_img_edit_sty2 #url').attr('disabled', false);
            $('.pop_img_edit_sty2 #newWindow').attr('disabled', false);
        }
    });
    $('.pop_img_edit_sty2 .btn_close').on('click', function () {
        $('.pop_img_edit_sty2').remove();
    });

}
function videoElSetting($videoAreaTarget) {
    
    if ($videoAreaTarget.find('.vjs-tech').attr('src') != undefined) {
        console.log($videoAreaTarget.find('.vjs-tech').attr('src'));
        if ($('.vjs-tech').attr('src').substring(9, 10) == 'w') {
            $('#urlmovie').val($('.vjs-tech').attr('src'));
        }
        var previewSetVideo = '<video class="video-js vjs-theme-sea preview_video_init" controls preload="auto" data-setup="{}">'
            previewSetVideo += '<source src="' + $videoAreaTarget.find('.vjs-tech').attr('src') + '" type="video/mp4" id="video_here" />'
            previewSetVideo += '</video>'
            $('.wrap_movie_api').empty().append(previewSetVideo);
            videojs(document.querySelector('.preview_video_init'));
    };
    if ($videoAreaTarget.find('iframe').length != 0) {
        $videoAreaTarget.remove('.mask_movie');
        var $urlmovieEdit = $videoAreaTarget.find('iframe').attr('src');
        console.log($urlmovieEdit);
        $urlmovieEdit2 = $urlmovieEdit.substring(24).split("?");

        console.log($urlmovieEdit2);
        $('#urlmovie').val('https://youtu.be/' + $urlmovieEdit2[0]);
        $('.wrap_movie_api').append($videoAreaTarget.find('iframe').clone());
    }
    function videoElPreview() {
        if (($('#urlmovie').val() != ' ')) {
            var vjsinit = '<video class="video-js vjs-theme-sea" controls id = "pop_previewarea_video">'
            vjsinit += '<source src="" id="video_here">'
            vjsinit += '</video>'
            $('.wrap_movie_api').empty().append(vjsinit);
            if ($('#urlmovie').val().substring(8, 9) == 'y') {
                var $urlmovieVal = $('#urlmovie').val().substring(16);
                var youtubeMovie = '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + $urlmovieVal + '?mode=opaque&amp;autoplay=1&amp;loop=1&amp;rel=0&amp;playlist=&amp;showinfo=1&amp;controls=&amp;mute=1" frameborder = "0" allowfullscreen = "" ></iframe >'
                $('.wrap_movie_api').append(youtubeMovie);
            } else if ($('#urlmovie').val().substring(8, 9) == 'w') {
                var $urlmovieVal = $('#urlmovie').val();
                var previewSetVideo = '<video class="video-js vjs-theme-sea preview_video_init" controls preload="auto" data-setup="{}">'
                previewSetVideo += '<source src="' + $urlmovieVal + '" type="video/mp4" id="video_here" />'
                previewSetVideo += '</video>'
                $('.wrap_movie_api').empty().append(previewSetVideo);
                videojs(document.querySelector('.preview_video_init'));
            }
        }
    }
    if ($videoAreaTarget.hasClass('lightbox')) {
        $('#lightboxchk').prop("checked", true);
    }
    if ($videoAreaTarget.closest('.designEl2').hasClass('fullvideo')) {
        $('#fitmovie').prop("checked", true);
    }
    if ($videoAreaTarget.find('.video-js').attr('autoplay')) {
        $('#autoplay').prop("checked", true);
    }
    $(document).on("focusout", "#urlmovie", function () {
        videoElPreview();
    });  
    $(document).on("keydown", "#urlmovie", function (key) {
        if (key.keyCode == 13) {
            videoElPreview();
        }
    });
 

    $(document).on("change", ".file_multi_video", function (evt) {
        $('#urlmovie').val(' ').attr("disabled", true);
        var $source = $('#video_here');
        $source[0].src = URL.createObjectURL(this.files[0]);
        //$source.parent()[0].load();
        //$('#pop_previewarea_video').show();
        $('.wrap_movie_api').empty();
        var $previewVideo = '<video class="video-js vjs-theme-sea preview_video" controls preload="auto" data-setup="{}">'
            $previewVideo += '<source src="' + $source[0].src +'" type="video/mp4" id="video_here" />'
            $previewVideo +='</video>'
        $('.wrap_movie_api').append($previewVideo);
        videojs(document.querySelector('.preview_video'));
    });
    

    $('.complete').on('click', function(){
        var $videoIdx = $('.designEl2:last-child').length;
        var $runVideojs = 'video-js' + $videoIdx;
        console.log($runVideojs);
        var $videoClone = $('#pop_previewarea_video').clone();
        console.log($('#video_here').attr('src'));
        if ($('#autoplay').is(":checked") == true) {
            var $videoClone2 = '<video class="' + $runVideojs + ' video-js vjs-theme-sea" autoplay muted controls preload="auto" data-setup="{}">'
            $videoClone2 += '<source src="' + $('#video_here').attr('src') + '" type="video/mp4" />'
            $videoClone2 += '</video>'
        } else {
            var $videoClone2 = '<video class="' + $runVideojs + ' video-js vjs-theme-sea"  controls preload="auto" data-setup="{}">'
            $videoClone2 += '<source src="' + $('#video_here').attr('src') + '" type="video/mp4" />'
            $videoClone2 += '</video>'
        }
        console.log($('#urlmovie').val());
       
            if ($('#urlmovie').val().substring(8, 9) == 'y') {
                var $urlmovieVal = $('#urlmovie').val().substring(16);
                if ($('#autoplay').is(":checked") == true) {
                    var youtubeMovie = '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + $urlmovieVal + '?mode=opaque&amp;autoplay=1&amp;loop=1&amp;rel=0&amp;playlist=&amp;showinfo=1&amp;controls=&amp;mute=1" frameborder = "0" allowfullscreen = "" ></iframe >'
                } else {
                    var youtubeMovie = '<iframe width="100%" height="100%" src="//www.youtube.com/embed/' + $urlmovieVal + '?mode=opaque&amp;loop=1&amp;rel=0&amp;playlist=&amp;showinfo=1&amp;controls=" frameborder = "0" allowfullscreen = "" ></iframe >'
                }
                $videoAreaTarget.empty().append(youtubeMovie);
            } else {
                $videoAreaTarget.empty().append($videoClone2);
            }
       
        if ($('#fitmovie').is(":checked") == true) {
            $videoAreaTarget.closest('.designEl2').addClass('fullvideo');
        } else {
            $videoAreaTarget.closest('.designEl2').removeClass('fullvideo');
        }
        if ($('.set_movie #lightboxchk').is(":checked")) {
            $videoAreaTarget.addClass('lightbox').append('<div class="showlightbox"></div>');
        } else {
            $videoAreaTarget.removeClass('lightbox on').remove('.showlightbox');
        }
        if ($('#urlmovie').val().substring(9, 10) == 'w' || $('.wrap_movie_api .vjs-tech').attr('src') != undefined) {
            eval("videojs(document.querySelector('." + $runVideojs + "'))");
        }
        $('.wrap_movie_area').css('height','auto');
        $('.set_movie').remove();

    });
    $('.set_movie .btn_close').on('click', function(){
        $('.set_movie').remove();
    }); 
}


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
        $(this).closest('.lightbox').find('.vjs-big-play-button').click();
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
    if ($('iframe').length != 0) { 
        $('.lightbox iframe').attr('src', lightyoutubu);
    }
});
$(document).on('click', '.main_set_movie .btn_close', function (e) {
    $('.main_set_movie').remove();
});



function calenderStart() {
    console.log('aaaaaa');
        var calendarIdx = 'calendar' + $('.calendar').length;
        $('.calendar').each(function(index){
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
    $('.map_ma').each(function (index) {
        $(this).attr('id', 'map_ma' + (index+1))
    });

    var mapLength = $('.map_ma').last().attr('id');
    
    $(document).on('click', '.complete', function (e) {
        mapCreate(mapLength);
        $('.set_map').remove();
    });
    $(document).on('click', '.btn_close', function(e) {
        $('.set_map').remove();

    })
}
function mapCreate(mapLength) {
    var myLatlng = new google.maps.LatLng(35.837143, 128.558612); // 위치값 위도 경도
    var Y_point = 35.837143;		// Y 좌표
    var X_point = 128.558612;		// X 좌표
    var zoomLevel = 18;				// 지도의 확대 레벨 : 숫자가 클수록 확대정도가 큼
    var markerTitle = "대구광역시";		// 현재 위치 마커에 마우스를 오버을때 나타나는 정보
    var markerMaxWidth = 300;				// 마커를 클릭했을때 나타나는 말풍선의 최대 크기

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



function customSelect() {
    $('.sel_sns').wSelect();
}


$(function () {
    closeLightbox();
    $('#lightbox-shadow').click(function (e) {
        closeLightbox();
    });
});
function lightbox(insertContent, ajaxContentUrl) {
    // remove any previously added content
    $('#lightbox').empty();
    // insert HTML content
    if (insertContent != null) {
        $('#lightbox').append(insertContent);
    }
    // insert AJAX content
    if (ajaxContentUrl != null) {
        // temporarily add a "Loading..." message in the lightbox
        $('#lightbox').append('<p class="loading">Loading...</p>');
        // request AJAX content
        $.ajax({
            type: 'GET',
            url: ajaxContentUrl,
            success: function (data) {
                // remove "Loading..." message and append AJAX content
                $('#lightbox').empty();
                $('#lightbox').append(data);
            },
            error: function () {
                alert('AJAX Failure!');
            }
        });
    }
    // move the lightbox to the current window top + 100px
    $('#lightbox').css('top', $(window).scrollTop() + 100 + 'px');
    // display the lightbox
    $('#lightbox').show();
    $('#lightbox-shadow').show();
}
// close the lightbox
function closeLightbox() {
    // hide lightbox and shadow
    $('#lightbox').hide();
    $('#lightbox-shadow').hide();
    // remove contents of lightbox in case a video or other content is actively playing
    $('#lightbox').empty();
}

/* 버튼설정 메뉴 */
function rightBtnSetting(el) {
    var targetbtn = el.closest('.btn_area').find('.btn_click');
    $(".pop_area").load("include/popup.php .btn_only", function () { h_builder_common(targetbtn); });
}


/* 컴포넌트 추가 */
$(document).on('click', '.component_add .btn_add', function (e) {
    var sel_section_idx = $(this).closest('section').index();
    var clickComponentAdd = $(this).parent().hasClass('top');
    $(".pop_area").load("include/popup.php .add_section_pop", function () {componentAdd(sel_section_idx, clickComponentAdd) });
    
})

function componentAdd(sel_section_idx, clickComponentAdd) {
    if (clickComponentAdd) {
        $('.add_section_pop').attr('data-idx', sel_section_idx).addClass('top').removeClass('bottom');
    } else  {
        $('.add_section_pop').attr('data-idx', sel_section_idx).addClass('bottom').removeClass('top');
    }

    $(document).on('click', '.pop_component_add li', function (e) {
        var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();

        if ($('.add_section_pop').hasClass('top')) {
            $('main section').eq(sectionIdx).before('<section  data-include="include/component.php .comp' + btnIdx + '"></section>');
        } else if ($('.add_section_pop').hasClass('bottom')) {
            $('main section').eq(sectionIdx).after('<section  data-include="include/component.php .comp' + btnIdx + '"></section>');
        }
        includeLayout2();
        $('.add_section_pop').remove();
    }); 
    $(document).on('click', '.visual_dsgn li', function (e) {
        var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();
        if ($('.add_section_pop').hasClass('top')) {
            $('main section').eq(sectionIdx).before('<section  data-include="include/component.php .mainvisual' + btnIdx + '"></section>');
        } else if ($('.add_section_pop').hasClass('bottom')) {
            $('main section').eq(sectionIdx).after('<section  data-include="include/component.php .mainvisual' + btnIdx + '"></section>');
        }
        includeLayout_mainvis();
        $('.add_section_pop').remove();
    }); 
    $(document).on('click', '.wrap_dsgn_list dl', function (e) {
        var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();
        if ($(this).index() != 4) {           
            if ($('.add_section_pop').hasClass('top')) {
                $('main section').eq(sectionIdx).before('<section  data-include="include/component.php .designEl' + btnIdx + '"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                $('main section').eq(sectionIdx).after('<section  data-include="include/component.php .designEl' + btnIdx + '"></section>');
            }
            
        } else {            
            if ($('.add_section_pop').hasClass('top')) {
                $('main section').eq(sectionIdx).prepend('<div  data-include="include/component.php .designEl' + btnIdx + '"></div>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                $('main section').eq(sectionIdx).append('<div  data-include="include/component.php .designEl' + btnIdx + '"></div>');
            }           
        }
        includeLayout_designEl();
        $('.add_section_pop').remove();
    });
    $(document).one('click', '.wrap_db_list dl', function (e) {
         var sectionIdx = $(".add_section_pop").attr('data-idx');
        var btnIdx = $(this).index();
        if (btnIdx == 0) {
            if ($('.add_section_pop').hasClass('top')) {
                $('main section').eq(sectionIdx).before('<section  data-include="board/list.php"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                $('main section').eq(sectionIdx).after('<section  data-include="board/list.php"></section>');
            }
            includeLayout();
        }
        if (btnIdx == 1) {
            if ($('.add_section_pop').hasClass('top')) {
                $('main section').eq(sectionIdx).before('<section  data-include="include/pb_gallery.php"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                $('main section').eq(sectionIdx).after('<section  data-include="include/pb_gallery.php"></section>');
            }
            includeLayout();
        }
        if (btnIdx == 2) {
            if ($('.add_section_pop').hasClass('top')) {
                $('main section').eq(sectionIdx).before('<section  data-include="include/component.php .dbEl' + btnIdx + '"></section>');
            } else if ($('.add_section_pop').hasClass('bottom')) {
                $('main section').eq(sectionIdx).after('<section  data-include="include/component.php .dbEl' + btnIdx + '"></section>');
            }
            includeLayout_calendarEl();
        }

       
        $('.add_section_pop').remove();
    }); 

    $(document).on('click', '.add_section_pop .btn_close', function (e) {
        $('.add_section_pop').remove();
    });
    $(document).on('click', '.add_section_pop .wrap_type_list span', function (e) {
        var $typelistIdx = $(this).index();
        $('.add_section_pop .wrap_type_list span').removeClass('on');
        $(this).addClass('on');

        $('.wrap_dsgn_list ul').hide().removeClass('on');
        $('.wrap_dsgn_list ul').eq($typelistIdx).show();
    });

    
}


