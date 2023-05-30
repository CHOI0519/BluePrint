// const { event, contains } = require("jquery");
//const { response } = require("express");

// const { response } = require("express");
// const { data } = require("jquery");

function gomain() {
    location.href = "/views/MainPage.html";
}

$(document).ready(function() {
  $('#myForm').submit(function(e){
    e.preventDefault();

    var loadingDiv = $('<div id="loading"></div>');
    var image = new Image();
    image.src = '/public/image/loading.gif';
    
    image.onload = function() {
      loadingDiv.append(image);
      $('body').append(loadingDiv);

    };

    
    setTimeout(() => {
      loadingDiv.remove();
      
      fetch('/ListPage.html')
      .then(response => response.text())
      .then(html => {
        const targetDiv = document.getElementById('box2');
        targetDiv.innerHTML = html;
        
        const targets = document.querySelectorAll(".fade-class");
        const options = { root: null, threshold: 0.1, rootMargin: "-0px" };
        const observer = new IntersectionObserver(function (entries, observer) {
          entries.forEach((entry) => {
            const container = entry.target;
            if (entry.isIntersecting) {
              container.classList.add("fade-in");
            } else {
              container.classList.remove("fade-in");
            }
          });
        }, options);
        
        targets.forEach((target) => {
          observer.observe(target);
        });
      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      })
      
    }, 3000);

    var formData = {};

    $(this).find('input').each(function() {
      // Get the input field name and value
      var fieldName = $(this).attr('name');
      var fieldValue = $(this).val();

      // Add the field name and value to the formData object
      formData[fieldName] = fieldValue;
    });

    var jsonData = JSON.stringify(formData);

    $.ajax({
      type: 'GET', // Change the HTTP method as needed (e.g., POST, GET)
      url: '/views/MainPage.html', // Replace with the URL of your server-side script
      data: jsonData,
      success: function(response) {
        console.log(formData.height);

        // Create a new section element with the response value
        var newSection = $('<section></section>').text('Height: ' + formData.height + ', Weight: ' + formData.weight);

        // Append the new section to the specified container
        $('#showlist').append(newSection);
      },
      error: function(xhr, status, error) {
        // Handle errors here
        console.log(xhr.responseText);
      }
    });

    

    
    return false; // Prevent the default button behavior
  });
});



// $(document).ready(function(){
//   $('#myForm').submit(function(event) {
//     event.preventDefault();
    
//     console.log("Submit event handler triggered");

//     var height = $("#height").val();
//     var weight = $("#weight").val();
//     var gender = $("input[type='checkbox']:checked").map(function() {
//       return this.nextElementSibling.textContent;
//     }).get().join(", ");

//     var data = {
//       height: height,
//       weight: weight,
//       gender: gender
//     };

//     $.ajax({
//       url: "http://localhost:8080/views/ListPage.html", // 서버 엔드포인트에 맞게 수정
//       type: "GET",
//       data: JSON.stringify(data),
//       contentType: "application/json",
//       success: function(response) {
//         // 서버 응답 처리
//         console.log("데이터 저장 성공!");
//         // 섹션 요소에 저장된 데이터 표시
//         $("#intro").html("키: " + height + "cm, 몸무게: " + weight + "kg, 성별: " + gender);
//       },
//       error: function(xhr, status, error) {
//         // 에러 처리
//         console.log("데이터 저장 중 오류 발생.");
//       }
//     });
//   });
// });

// // function loadHTML() {
// //     $(document).ready(function(){
// //         $('#clickbtn').click(function(){
// //            var loadindDiv = $('<div id="loading"><img src="/public/image/loading.gif" alt="Loading"></div>');
// //            $('body').append(loadindDiv);

// //             setTimeout(function() {
// //                 loadindDiv.remove();

// //                 window.location.href = '/views/LiatPage.html';
// //             }, 3000);
// //         });
// //     });
// //     console.log("정상적으로 이동했습니다");
// // }

// function LoadingWithMask() {
//     //화면의 높이와 너비를 구합니다.
//     var maskHeight = $(document).height();
//     var maskWidth  = window.document.body.clientWidth;
     
//     //화면에 출력할 마스크를 설정해줍니다.
//     var mask       = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
//     var loadingImg = '';
    
//     loadingImg += "<div id='loadingImg'>";
//     loadingImg += " <img src='/public/image/loading.gif' style='position: relative; display: block; margin: 0px auto;'/>";
//     loadingImg += "</div>";  
 
//     //화면에 레이어 추가    
//     $('body')
//         .append(mask)
 
//     //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
//     $('#mask').css({
//             'width' : maskWidth,
//             'height': maskHeight,
//             'opacity' : '0'
//     }); 
  
//     //마스크 표시
//     $('#mask').show();
  
//     //로딩중 이미지 표시
//     $('#loadingImg').append(loadingImg);
//     $('#loadingImg').show();
// }

// function setTimeout() {
//     $('#mask, #loadingImg').hide();
//     $('#mask, #loadingImg').empty();  
// } 


