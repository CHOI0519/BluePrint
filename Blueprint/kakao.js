var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(37.3468471, 126.9524528), // 지도의 중심좌표
    level: 5 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다    

var positions = [
{
title: '짐무브 /  ', 
latlng: new kakao.maps.LatLng(37.3483241, 126.9552313)
},
{
title: '퍼펙트헬스클럽', 
latlng: new kakao.maps.LatLng(37.3480777, 126.9553803)
},  
{
title: '오버탑휘트니스&필라테스 군포점', 
latlng: new kakao.maps.LatLng(37.3464992, 126.944337)
},
{
title: '영빈휘트니스센터',
latlng: new kakao.maps.LatLng(37.3483942, 126.94459)
}
];

var contents = [
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
        '    <span class="title">구의야구공원</span>' +
        '  </a>' +
        '</div>'
    },
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
        '    <span class="title">구의야구공원</span>' +
        '  </a>' +
        '</div>'
    },
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
        '    <span class="title">구의야구공원</span>' +
        '  </a>' +
        '</div>'
    },
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
        '    <span class="title">구의야구공원</span>' +
        '  </a>' +
        '</div>'
    } 
]

// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

for (var i = 0; i < positions.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 

    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    var overlay = new kakao.maps.CustomOverlay({
        content: contents[i].content,
        map: map,
        position: marker.getPosition(),  
        yAnchor: 1     
    });


    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        if (overlay.getMap()) {
            overlay.setMap(map); // Hide the overlay if it's already visible
        } else {
            overlay.setMap(map); // Show the overlay if it's hidden
        };
    });
}


// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay() {
    overlay.setVisible(false);
}