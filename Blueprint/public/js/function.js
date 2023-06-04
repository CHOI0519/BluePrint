var valid = true;

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

  var checkboxes = document.getElementsByClassName('checkbox1');
  var checkboxes1 = document.getElementsByClassName('checkbox2');
  var checkboxes2 = document.getElementsByClassName('checkbox3');
  var checkboxes3 = document.getElementsByClassName('checkbox4');
  var checkboxes4 = document.getElementsByClassName('checkbox6');
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
    console.log(habit);
    

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

        var newSection = $('<div>');
        newSection.append($('<h2>결과 보고서</h2>'));
        HEAD
        newSection.append($('<h3>키 : ' +  heightValue + ' cm</h3>'));
        newSection.append($('<h3>몸무게 : ' +  weightValue + ' kg</h3>'));
        newSection.append($('<h3>성별 : ' +  gendercheck + ' </h3>'));
        newSection.append($('<h3>BMI : ' +  BMI + ' / ' + BMI_result + '</h3>'));
        newSection.append($('<p></p>'));
        newSection.append($('</section>'));
        
        $('#intro2').append(newSection);
<<<<<<< HEAD
        newSection.append($('<h2>키 : ' +  heightValue + ' cm</h2>'));
        newSection.append($('<h2>몸무게 : ' +  weightValue + ' kg</h2>'));
        newSection.append($('<h2>성별 : ' +  gendercheck + ' </h2>'));
        newSection.append($('<h2>BMI : ' +  BMI + ' / ' + BMI_result + '</h2>'));
        newSection.append($('</div>'));
        
        $('#intro2').append(newSection);
=======
>>>>>>> 5c569e64324403f28e469521e491c15848fa100a
        
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
          }
          else if (goal == 'goal2') {
            if(habit == 'low'){
              lifecycle = data.For_health.low;
            } else if (habit == 'middle'){
              lifecycle = data.For_health.middle;              
            } else {
              lifecycle = data.For_health.high;
            } 
          }
          else{
            if(habit == 'low'){
              lifecycle = data.For_medical.low;
            } else if (habit == 'middle'){
              lifecycle = data.For_medical.middle;              
            } else {
              lifecycle = data.For_medical.high;
            } 
          };
          // 가져온 json 값 section으로 만들기 
<<<<<<< HEAD
          var newSection2 = $('<div>');
          newSection2.append($('<p><한줄 평가></p>'));
          newSection2.append($('<p>' + lifecycle + '</p>'));
          newSection2.append($('</div>'));
          
          
          // newSection2.css('margin-top','300px');
          newSection2.css('color','#4966F5');
          newSection2.css('font-size','25px');
          newSection2.css('font-family','"GmarketSans"');
          newSection2.css('src','url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff")');
          
          $('#intro3').append(newSection2);
          

=======
          var newSection2 = $('<section style="margin-">');
          newSection2.append($('<h2 stlye ="color: blue;"> 한줄 평 : ' + lifecycle + '</h2>'));
          newSection2.append($('</section>'));
  
          $('#intro2').append(newSection2);
>>>>>>> 5c569e64324403f28e469521e491c15848fa100a
        })
        .catch(error => console.error(error));


<<<<<<< HEAD
// >>>>>>> 2866f04 (결과 체크 리스트 스타일 수정)
=======
>>>>>>> 5c569e64324403f28e469521e491c15848fa100a

      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      })
    
      return false; // Prevent the default button behavior
    }
  });
});
