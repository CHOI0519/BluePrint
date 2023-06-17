var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(37.3468471, 126.9524528), // 지도의 중심좌표
    level: 5 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다    

var positions = [
{
    title: '짐무브', 
    latlng: new kakao.maps.LatLng(37.3483241, 126.9552313)
},
{
    title: '퍼펙트헬스클럽', 
    latlng: new kakao.maps.LatLng(37.3480777, 126.9553803)
},  
{
    title: '오버탑휘트니스', 
    latlng: new kakao.maps.LatLng(37.3464992, 126.944337)
},
{
    title: '글로리 휘트니스',
    latlng: new kakao.maps.LatLng(37.3434654, 126.9524528)
},
{
    title: '내셔널 국가대표 PT센터',
    latlng: new kakao.maps.LatLng(37.3406687, 126.9376536)
}];

var contents = [
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/?itemId=199390746" target="_blank">' +
        '    <span class="title">짐무드</span>' +
        '  </a>' +
        '</div>'
    },
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/2029163062" target="_blank">' +
        '    <span class="title">퍼펙트 헬스클럽</span>' +
        '  </a>' +
        '</div>'
    },
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/1299873470" target="_blank">' +
        '    <span class="title">오버탑휘트니스</span>' +
        '  </a>' +
        '</div>'
    },
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/14855480" target="_blank">' +
        '    <span class="title">글로리 휘트니스</span>' +
        '  </a>' +
        '</div>'
    },
    {
        content : '<div class="customoverlay">' +
        '  <a href="https://map.kakao.com/link/map/1494860653" target="_blank">' +
        '    <span class="title">내셔널 국가대표 PT센터</span>' +
        '  </a>' +
        '</div>'
    } 
]

for (var i = 0; i < positions.length; i ++) {

    var imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClElEQVR4nO2bzUrcUBTHz2oWvsCEvoPgphOLs/ADWnVALBQp+IGb+kEz6sZ278b4HoLgqrW0pTvBlxCykcGYzizszo3CKfeSGeKYZDJzzyS5k3PgDyE5uffmN+ece5NMANjY+rESAJwAwB0AuABg+/t08Vc2GwCwS7ZG/srmik4ufv7B7z9+tzt0NfJXNhTyWv+kAtR18Vc2HGUApUBBwTiFdKiLf2yhtHMwwFT8owqlKw5eLS7j0+Z2qKI6zL3/xhY+1lbx8s3bYCSE51NUZ7m6oAH8BQChQBT0D+DV2Jj0EVPOt4tfclvs08GfBMCX8YkX+fR1fEILfxIADxufZKeCspDYFvt08CcB8KSxGECNIwA5BWoJagAURwwgNAKunZuRVs8IuC46AM9fV4+aGIDDEYCcAg7XAOQiCDwLIE+DQLgOaNw28bO1j+VyuZNfhmGgVT+Qx1Tnb6r2hzYNWvWDyBsOcUwVAFX7QwNgGIY8b3b+Pa6s7eDSh02sTi90filVAFTtkwFohISk0Mr6rpQYoBDV0rpX+0lTggyAFRGSWQJIkhJkAAw/JKszi88GkhWA+aWPaFbneqYEGQDw/boHkiUAoV79DQzgdcUMDbekAKiUFEBQFXNSHQBEDEgHAMHrUQawd3gk1S+A9nmDql8A3ecxgBanACqlQMWcLHYR9Io+DXpRC6HphdwAMKdSXAhZOV4K1/dSWAo3bpsSQjsSCncz5EWkxOy75c7t6tQwbocV28/kgUg9JiTTbn9oABohKUH9SIyifX4z5PCbIeQ3Qw6/GULyIuhpIq4BDtcA5BrgcA3AuCLotv97n3XBopb7916G/+nZeewXIzblE5yc6zgMQMmHICNhRJXK57VsoJH9B86VhXJ5rmdjAAAAAElFTkSuQmCC", // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(35, 35), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    var marker = new kakao.maps.Marker({
        map: map, 
        position: positions[i].latlng, 
        title : positions[i].title,
        image : markerImage
    });

    
    var overlay = new kakao.maps.CustomOverlay({
        content: contents[i].content,
        map: map,
        position: positions[i].latlng,  
        yAnchor: -0.1     
    });


    
    kakao.maps.event.addListener(marker, 'click', function() {
        if (overlay.getMap()) {
            overlay.setMap(map); 
        } else {
            overlay.setMap(map); 
        };
    });
}

function closeOverlay() {
    overlay.setVisible(false);
}