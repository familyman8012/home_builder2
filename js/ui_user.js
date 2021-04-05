function newOwl() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1
    });
}
newOwl();


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




function calenderStart() {
    console.log('aaaaaa');
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
    $('.map_ma').each(function (index) {
        $(this).attr('id', 'map_ma' + (index + 1))
    });

    var mapLength = $('.map_ma').last().attr('id');

    $(document).on('click', '.complete', function (e) {
        mapCreate(mapLength);
        $('.set_map').remove();
    });
    $(document).on('click', '.btn_close', function (e) {
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

