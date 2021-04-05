$(function () {
    $('.btn_login').on('click', function () {
        console.log("로그아웃");
        $('.pop_area').load("include/login_join.php .login1", function () { /* 콜백함수 */
        });
        $('.mask').addClass('on');
        return false;
    });
    $('.btn_join').on('click',function () {
        $('.pop_area').load("include/login_join.php .login2", function () { /* 콜백함수 */
        });
        $('.mask').addClass('on');
        return false;
    })
});
$(document).on('click', '.wrap_logjn_pop .btn_close', function (e) {
    $(this).closest('.wrap_logjn_pop').remove();
    $('.mask').removeClass('on')
})
    .on('click', '.wrap_logjn_pop .btn_join', function (e) {
            $('.pop_area').html('<section data-include="include/login_join.php .login2"></section>');
            includeLayout();
        })

    .on('click', '.wrap_logjn_pop.login2 .pk_mb_yes', function (e) {
        $('.pop_area').html('<section data-include="include/login_join.php .pk_join1"></section>');
        includeLayout();
    })
    .on('click', '.wrap_logjn_pop.login2 .pk_mb_no', function (e) {
            $('.pop_area').html('<section data-include="include/login_join.php .pk_step_complete"></section>');
            includeLayout();
        })    
     .on('click', '.pk_step_complete .complete', function (e) {
           $('.pop_area').html('<section data-include="include/login_join.php .pk_join_step1"></section>');
            includeLayout();
        })
    .on('click', '.pk_join_step1 .btn_next', function (e) {
            $('.pop_area').html('<section data-include="include/login_join.php .pk_join_step2"></section>');
            includeLayout();
        })
 
    .on('click', '.wrap_logjn_pop .btn_find_id', function (e) {
        $('.pop_area').html('<section data-include="include/account_find.php .findid1"></section>');
        includeLayout();
    })
    .on('click', '.findid1 .btn_auth', function (e) {
            $('.pop_area').html('<section data-include="include/account_find.php .findid2"></section>');
            includeLayout();
        })

    .on('click', '.findid2 .btn_login', function (e) {
                $('.pop_area').html('<section data-include="include/account_find.php .login1"></section>');
                includeLayout();
    })
    .on('click', '.wrap_logjn_pop .btn_find_pw', function (e) {
        $('.pop_area').html('<section data-include="include/account_find.php .findpw2"></section>');
        includeLayout();
    })

    .on('click', '.findpw2 .btn_login', function (e) {
            $('.pop_area').html('<section data-include="include/account_find.php .reset_pw"></section>');
            includeLayout();
        })
    .on('click', '.findpw2 .btn_login', function (e) {
        $('.pop_area').html('<section data-include="include/account_find.php .reset_pw"></section>');
        includeLayout();
    })


    .on('click', '.wrap_findac_pop .btn_close', function (e) {
        $(this).closest('.wrap_findac_pop').remove();
        $('.mask').removeClass('on');
    })
    .on('click', '.wrap_terms .all_check', function(e) {
        if ($(".wrap_terms input:checkbox").is(":checked")) {
            $(".wrap_terms input:checkbox").prop("checked", false);
            return false;
        } else {
            $(".wrap_terms input:checkbox").prop("checked", true);
            return false;
        }
    })
   

   .on('click', '.pk_join1 .check_contain',function(){
        if ($('input[name=service]').is(":checked") && $('input[name=privacy]').is(":checked")) {
            $('input[name=allchk]').prop("checked", true);
            $('.pk_step_complete .complete').addClass('on');
        } else {
            $('.pk_step_complete .complete').removeClass('on');
        }        
   })
   .on('click', '.pk_step_complete .check_contain',function(){

        if ($('input[name=service]').is(":checked") && $('input[name=privacy]').is(":checked")) {
            $('input[name=allchk]').prop("checked", true);
            $('.pk_step_complete .complete').addClass('on');
        } else {
            $('.pk_step_complete .complete').removeClass('on');
        }
        
   });



var login_cnt = 0;


// 로그인 ajax
function login() {
    var data = $("#login_f").serialize();
    $.ajax({
        type: 'post',
        url: './ajax/login.php',
        data: data,
        dataType: 'json',
        error: function (xhr, status, error) {
            alert(error);
        },
        success: function (data) {
            if (data.success == 'ok') {
                console.log(data);
                if (data.stat == 'no_block') {
                    alert("플레이블럭 회원가입을 해주세요.")
                } else if (data.stat == 'reserve') {
                    var con_test = confirm("탈퇴 중입니다. 탈퇴상태를 해제하시겠습니까?");
                    if (con_test == true) {
                        location.href = '/main.php'
                    } else {
                        location.href = '/account/logout.php'
                    }
                } else if (data.stat == 'out') {
                    show_modal_pop('alert_red1', '탈퇴한 계정입니다.');
                } else if (data.stat == 'stop') {
                    show_modal_pop('alert_red1', '회원님의 계정은 현재 관리자에 의해 정지되었습니다.\n' +
                        '\n' +
                        '정지 기간: ' + data.ad_start + '~' + data.ad_last + '\n' +
                        '\n' +
                        '자세한 사항은 플레이콕(070-4101-4620)으로 문의주세요.');
                } else {
                    location.href = '/home_builder/main.php'
                }
            } else {

                if (data.success == 'pw_fail') {
                    // alert('회원정보가 없습니다.')
                    login_cnt++;
                    $('#pw').blur();
                    show_modal_pop('alert_red1', '비밀번호가 일치하지 않습니다. ' + login_cnt + '회 오류');
                    //10회 오류 후, "계정 보호 조치 안내" 본인인증 페이지로 이동 후 해제 절차
                } else if (data.success == 'email_fail') {
                    // alert('회원정보가 없습니다.')
                    $('#email').blur();
                    show_modal_pop('alert_red1', '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
                    //10회 오류 후, "계정 보호 조치 안내" 본인인증 페이지로 이동 후 해제 절차
                }

            }
        },
    });
}

//연동
function connect() {
    var data = $("#connect_f").serialize();

    if (!$('#privacy').is(":checked")) {
        alert("개인 정보 처리방침에 동의해주세요.")
        return;
    }
    if (!$('#service').is(":checked")) {
        alert("서비스 이용 약관에 동의해주세요.")
        return;
    }

    $.ajax({
        type: 'post',
        url: './ajax/connect.php',
        data: data,
        dataType: 'json',
        error: function (xhr, status, error) {
            alert(error);
        },
        success: function (data) {
            if (data.success == 'ok') {
                console.log(data);
                if (data.stat == 'reserve') {
                    var con_test = confirm("탈퇴 중입니다. 탈퇴상태를 해제하시겠습니까?");
                    if (con_test == true) {
                        location.href = '/main.php'
                    } else {
                        location.href = '/account/logout.php'
                    }
                } else if (data.stat == 'out') {
                    show_modal_pop('alert_red1', '탈퇴한 계정입니다.');
                } else if (data.stat == 'stop') {
                    show_modal_pop('alert_red1', '회원님의 계정은 현재 관리자에 의해 정지되었습니다.\n' +
                        '\n' +
                        '정지 기간: ' + data.ad_start + '~' + data.ad_last + '\n' +
                        '\n' +
                        '자세한 사항은 플레이콕(070-4101-4620)으로 문의주세요.');
                } else {
                    alert("연동되었습니다.");
                    location.href = '/home_builder/main.php'
                }

                $('.pk_join1').remove();
                $('.mask').removeClass('on');

            } else {

                if (data.success == 'pw_fail') {
                    // alert('회원정보가 없습니다.')
                    login_cnt++;
                    $('#pw').blur();
                    show_modal_pop('alert_red1', '비밀번호가 일치하지 않습니다. ' + login_cnt + '회 오류');
                    //10회 오류 후, "계정 보호 조치 안내" 본인인증 페이지로 이동 후 해제 절차
                } else if (data.success == 'email_fail') {
                    // alert('회원정보가 없습니다.')
                    $('#email').blur();
                    show_modal_pop('alert_red1', '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
                    //10회 오류 후, "계정 보호 조치 안내" 본인인증 페이지로 이동 후 해제 절차
                }

            }
        },
    });
}



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
