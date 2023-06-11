
var valid = true;

// 로고 페이지 클릭시 메인 화면 이동
function gomain() {
    location.href = "/views/MainPage.html";
}

// 체크리시트 빈칸 사항 점검
function AlertCheckbox1(){
  if($('#cm').val().length == 0){
    alert("키를 입력하세요");
    valid = true;
    return false;
  }
  else{
    valid = false;
  }


 if($('#kg').val().length == 0){
    alert("몸무게를 입력하세요");
    valid = true;
    return false;
  }
  else{
    valid = false;
  }

  var checkboxes = $('.checkbox1');
  var checkboxes1 = $('.checkbox2');
  var checkboxes2 = $('.checkbox3');
  var checkboxes3 = $('.checkbox4');
  var checkboxes4 = $('.checkbox6');
  var checked = false;
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      for (var j = 0; j < checkboxes1.length; j++) {
        if (checkboxes1[j].checked) {
          for (var k = 0; k < checkboxes2.length; k++) {
            if (checkboxes2[k].checked) {
              for (var l = 0; l < checkboxes3.length; l++) {
                if (checkboxes3[l].checked) {
                  for (var m = 0; m < checkboxes4.length; m++) {
                    if (checkboxes4[m].checked) {
                      checked = true;
                      break;
                    }
                  }
                  if (!checked) {
                    alert('사용목적을 선택해주세요!');
                    valid = true;
                    return false;
                  }
                }
              }
              if (!checked) {
                alert('식사량을 선택해주세요!');
                valid = true;
                return false;
              }
            }
          }
          if (!checked) {
            alert('운동시간을 선택해주세요!');
            valid = true;
            return false;
          }
        }
      }
      if (!checked) {
        alert('운동횟수를 선택해주세요!');
        valid = true;
        return false;
      }
    }
  }
  if (!checked) {
    alert('성별을 선택해주세요!');
    valid = true;
    return false;
  }
  else{
    valid = false;
  }
}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// form 버튼 클릭시부터 작동하는 코드
$(document).ready(function() {
  $('#myForm').submit(function(e){

    AlertCheckbox1();
    
    e.preventDefault();
    
    var formData = {};

    $(this).find('input').each(function() {
      // Get the input field name and value
      var fieldName = $(this).attr('name');
      var fieldValue = $(this).val();

      // Add the field name and value to the formData object
      formData[fieldName] = fieldValue;
    });

    var jsonData = $(this).serializeArray();

    console.log(jsonData);

    // 신장 변수 선언
    var heightValue;
    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i].name === "height") {
        if (jsonData[i].name = ""){
          vaild = true;
        }else{
          heightValue = jsonData[i].value;
          break; // Exit the loop since we found the value
        }
      };
    };

    // 몸무게 변수 선언
    var weightValue;
    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i].name === "weight") {
        if (jsonData[i].name = ""){
          vaild = true;
        }else{
          weightValue = jsonData[i].value;
          break; // Exit the loop since we found the value
        }
      };
    };

    // BMI 변수 선언
    var BMI, BMI_result;
    BMI = (weightValue / (heightValue/100)**2).toFixed(1);
    if (BMI <= 18.5){
      BMI_result = "저체중"
    } if (18.5 < BMI <= 22.9 ) {
      BMI_result = "정상"
    } if (22.9 < BMI < 25 ) {
      BMI_result = "과체중"
    } else {
      BMI_result = "비만"
    }; 
    

    // 성별 변수 선언
    var gendercheck;
    if (jsonData[2].name === "gender1") {
      gendercheck = "남자"
    } else {
      gendercheck = "여자"
    };
  
    //운동 횟수
    var working;
    var checkboxes1 = document.getElementsByClassName('checkbox2');
    for (var i = 0; i < checkboxes1.length; i++) {
      if (checkboxes1[i].checked && checkboxes1[i].name === 'number1') {
        working = 'number1';
        break;
      } else if (checkboxes1[i].checked && checkboxes1[i].name === 'number2') {
        working = 'number2';
        break;
      } else if (checkboxes1[i].checked && checkboxes1[i].name === 'number3') {
        working = 'number3';
        break;
      } else {
        working = 'number4';
      }
    };

    //운동 시간
    var worktime;
    var checkboxes2 = document.getElementsByClassName('checkbox3');
    for (var i = 0; i < checkboxes2.length; i++) {
      if (checkboxes2[i].checked && checkboxes2[i].name === 'time1') {
         worktime = 'time1';
        break;
      } else if (checkboxes2[i].checked && checkboxes2[i].name === 'time2') {
         worktime = 'time2';
        break;
      } else if (checkboxes2[i].checked && checkboxes2[i].name === 'time3') {
         worktime = 'time3';
        break;
      } else {
         worktime = 'time4';
      }
    };

    //운동시간 + 운동횟수를 합친 새로운 변수생성  >> 한줄 평 및 그것에 맞는 정보 제공 시 비교가능 한 변수를 만들기 위해
    var habit;
    if (working == "number1" || (working == "number2" && worktime == "time1") || (working == "number2" && worktime == "time2")) {
      habit = "low";  // 1회 미만 모든 경우의 수 || 3회 미만 30분 미만 || 3회 미만 1시간 미만 
    } else if((working == "number2" && worktime == "time3") || (working == "number2" && worktime == "time4")){
      habit = "middle"; // 3회 미만 2시간 미만 || 3회 미만 2시간 이상
    } else if((working == "number3" && worktime == "time1") || (working == "number3" && worktime == "time2")){
      habit = "middle"; // 5회 미만 30분 미만 || 5회 미만 1시간 미만
    } else if((working == "number4" && worktime == "time1")){
      habit = "middle"; // 5회 이상 30분 미만
    } else if((working == "number3" && worktime == "time3") || (working == "number3" && worktime == "time4")){
      habit = "high"; // 5회 미만 2시간 미만 || 5회 미만 2시간 이상
    } else if((working == "number3" && worktime == "time3") || (working == "number3" && worktime == "time4")){
      habit = "high"; // 5회 미만 2시간 미만 || 5회 미만 2시간 이상
    } else {
      habit = "high"; 
    }
    
    

    //식사량
    var food;
    var checkboxes3 = document.getElementsByClassName('checkbox4');
    for (var i = 0; i < checkboxes3.length; i++) {
      if (checkboxes3[i].checked && checkboxes3[i].name === 'meal1') {
         food = 'meal1';
        break;
      } else if (checkboxes3[i].checked && checkboxes3[i].name === 'meal2') {
        food = 'meal2';
        break;
      } else {
        food = 'meal3';
      }
    };
    
    //보유질병
    var disease;
    var checkboxes4 = document.getElementsByClassName('checkbox5');
    for (var i = 0; i < checkboxes4.length; i++) {
      if (checkboxes4[i].checked && checkboxes4[i].name === 'disease1') {
        disease = 'disease1';
        break;
      } else if (checkboxes4[i].checked && checkboxes4[i].name === 'disease2') {
        disease = 'disease2';
        break;
      } else {
        disease = 'disease3';
      }
    };
    // console.log(disease);

    //사용목적
    var goal;
    var checkboxes5 = document.getElementsByClassName('checkbox6');
    for (var i = 0; i < checkboxes5.length; i++) {
      if (checkboxes5[i].checked && checkboxes5[i].name === 'goal1') {
        goal = 'goal1';
        break;
      } else if (checkboxes5[i].checked && checkboxes5[i].name === 'goal2') {
        goal = 'goal2';
        break;
      } else {
        goal = 'goal3';
      }
    };
    


    // 로딩화면 생성
    var loadingDiv = $('<div id="loading"></div>');
    var image = new Image();
    image.src = '/public/image/loading.gif';
  

    //form형 작성완료 시 로딩화면 및 결과 도출
    if(!valid){
      image.onload = function() {
        loadingDiv.append(image);
        $('body').append(loadingDiv);

      };

      setTimeout(() => {
        loadingDiv.remove();
      }, 3000);

      fetch('ListPage.html')
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

        var newSection = $('<div>');
        newSection.append($('<h2>결과 보고서</h2>'));
        newSection.append($('<h3>키 : ' +  heightValue + ' cm</h3>'));
        newSection.append($('<h3>몸무게 : ' +  weightValue + ' kg</h3>'));
        newSection.append($('<h3>성별 : ' +  gendercheck + ' </h3>'));
        newSection.append($('<h3>BMI : ' +  BMI + ' / ' + BMI_result + '</h3>'));
        newSection.append($('<p></p>'));
        newSection.append($('</section>'));
        
        $('#intro2').append(newSection);
        
        // json에 저장 되있는 값 가져오기
        fetch('/json/list.json')
        .then(response => response.json())
        .then(data  => {
          var lifecycle;
          if (goal == 'goal1'){
            if(habit == 'low'){
              lifecycle = data.For_diet.low;
            } else if (habit == 'middle'){
              lifecycle = data.For_diet.middle;              
            } else {
              lifecycle = data.For_diet.high;
            } 
            var newSection3 = $('<div><img src="/public/image/diet.png">');
            newSection3.append($('<p>' + data.diet.exercise + '</p>'));
            newSection3.append($('</div>'));
            
            $('#intro4').append(newSection3);
          }
          else if (goal == 'goal2') {
            if(habit == 'low'){
              lifecycle = data.For_health.low;
            } else if (habit == 'middle'){
              lifecycle = data.For_health.middle;              
            } else {
              lifecycle = data.For_health.high;
            } 
            var newSection3 = $('<div><img src="/public/image/health.png">');
            newSection3.append($('<p>' + data.health.exercise + '</p>'));
            newSection3.append($('</div>'));  
            
            $('#intro4').append(newSection3);
          }
          else{
            if(habit == 'low'){
              lifecycle = data.For_medical.low;
            } else if (habit == 'middle'){
              lifecycle = data.For_medical.middle;              
            } else {
              lifecycle = data.For_medical.high;
            } 
            var newSection3 = $('<div><img src="/public/image/medical.png">');
            newSection3.append($('<p>' + data.medical.exercise + '</p>'));
            newSection3.append($('</div>'));  
            
            $('#intro4').append(newSection3);
          };
          // 가져온 json 값 section으로 만들기 
          newSection3.css('display','flex');
          newSection3.css('color','gray');
          newSection3.css('font-size','20px');
          newSection3.css('font-family','"GmarketSans"');
          newSection3.css('src','url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff")');

          var newSection2 = $('<div>');
          newSection2.append($('<p><한줄 평가></p>'));
          newSection2.append($('<p>' + lifecycle + '</p>'));
          newSection2.append($('</div>'));
                    
          newSection2.css('color','#4966F5');
          newSection2.css('font-size','25px');
          newSection2.css('font-family','"GmarketSans"');
          newSection2.css('src','url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff")');
          
          $('#intro3').append(newSection2);
          
        })
        .catch(error => console.error(error));
        
        fetch('/json/youtube.json')
          .then(response => response.json())
          .then(data => {

            var newSection5 = $('<p> 관련 영상도 보여드릴게요. 참고하세요!</p>');
            $('#intro5').append(newSection5);
            
            newSection5.css({
              "font-size" : "25px",
              'font-family' : '"GmarketSans"',
              "src" : 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff")',
              "margin-bottom" : "50px"
            });

            if(goal == 'goal1'){
              for (var i=0; i<data.diet.length; i++){
               var iframe = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data.diet[i] + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
               $('#intro5').append(iframe); 
              }
            }
            else if(goal == 'goal2'){
              for (var i=0; i<data.diet.length; i++){
               var iframe = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data.health[i] + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
               $('#intro5').append(iframe); 
              }
            }
            if(goal == 'goal3'){
              for (var i=0; i<data.diet.length; i++){
               var iframe = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + data.medical[i] + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
               $('#intro5').append(iframe); 
              }
            }
            

          })
          .catch(error => console.error(error));
          

        fetch('/json/foodlist.json')
          .then(response => response.json())
          .then(data  => {

            var newSection4 = $('<div>'); 
            
            if (disease == 'disease1') {
              newSection4.append($('<p style="margin-bottom: 30px; font-size:large;">디스크에 좋은 음식은 다음과 같아요!</p>'))

              var selectData = data.slice(0, 3); 

              $.each(selectData, function(index, entry){
                var div = $('<div>');
                var img = $('<img>');
                img.attr('src', entry.img);
                img.attr('m')
                div.append(img);
                var div1 = $('<div>');
                div1.append($('<p>' + entry.text + '</p>'));
                div1.append($('<p>' + entry.explain + '</p>'));
                div1.append($('</div>'));
                div.append(div1);
                div.append('</div>');
  
                div.css({
                  "display":"flex",
                  "color":"gray",
                  "font-size":"16px"
                });

                div1.css({
                  "margin-start":"15px"
                });
                
                newSection4.append(div);

              });
              newSection4.append($('</div>'));

              newSection4.css({
                "font-size" : "25px",
                'font-family' : '"GmarketSans"',
                "src" : 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff")'
              });

              $('#intro6').append(newSection4);
  
            }
            else if (disease == 'disease2') {
              newSection4.append($('<p style="margin-bottom: 30px; font-size:large;">당뇨에 좋은 음식은 다음과 같아요!</p>'))

              var selectData = data.slice(3, 6); 

              $.each(selectData, function(index, entry){
                var div = $('<div>');
                var img = $('<img>');
                img.attr('src', entry.img);
                img.attr('m')
                div.append(img);
                var div1 = $('<div>');
                div1.append($('<p>' + entry.text + '</p>'));
                div1.append($('<p>' + entry.explain + '</p>'));
                div1.append($('</div>'));
                div.append(div1);
                div.append('</div>');
  
                div.css({
                  "display":"flex",
                  "color":"gray",
                  "font-size":"16px"
                });
                
                div1.css({
                  "margin-start":"15px"
                });
                
                newSection4.append(div);
                
              });
              newSection4.append($('</div>'));

              newSection4.css({
                "font-size" : "25px",
                'font-family' : '"GmarketSans"',
                "src" : 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff")'
              });

              $('#intro6').append(newSection4);
  
            }
            else {
              newSection4.append($('<p style="margin-bottom: 30px; font-size:large;">호흡기질환에 좋은 음식은 다음과 같아요!</p>'))

              var selectData = data.slice(6, 9); 

              $.each(selectData, function(index, entry){
                var div = $('<div>');
                var img = $('<img>');
                img.attr('src', entry.img);
                img.attr('m')
                div.append(img);
                var div1 = $('<div>');
                div1.append($('<p>' + entry.text + '</p>'));
                div1.append($('<p>' + entry.explain + '</p>'));
                div1.append($('</div>'));
                div.append(div1);
                div.append('</div>');
  
                div.css({
                  "display":"flex",
                  "color":"gray",
                  "font-size":"16px"
                });
                
                div1.css({
                  "margin-start":"15px"
                });
                
                newSection4.append(div);
                
              });
              newSection4.append($('</div>'));

              newSection4.css({
                "font-size" : "25px",
                'font-family' : '"GmarketSans"',
                "src" : 'url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff")'
              });

              $('#intro6').append(newSection4);
  
            }
          })
          .catch(error => console.error(error));

        

      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      });
    
      return false; // Prevent the default button behavior
    }
  });
});

//메모장 설정 기능 
function saveNote() {
  var noteText = $('#memo').val();
  if (noteText !== '') {
    var checkbox = $('<input type="checkbox">');
    var label = $('<label></label>').text(noteText);
    $('#StickyNote').append($('<div></div>').append(checkbox, label));
    $('#memo').val('');
  }
}

