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
                    if (checkboxes4[i].checked) {
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

        var newSection = $('<section>');
        newSection.append($('<h2>결과 보고서</h2>'));
        newSection.append($('<h3>키 : ' +  heightValue + ' cm</h3>'));
        newSection.append($('<h3>몸무게 : ' +  weightValue + ' kg</h3>'));
        newSection.append($('<h3>성별 : ' +  gendercheck + ' </h3>'));
        newSection.append($('<h3>BMI : ' +  BMI + ' / ' + BMI_result + '</h3>'));
        newSection.append($('<p></p>'));
        newSection.append($('<h2>한줄 평 : ' +  working + ' / ' + worktime + '</h2>'));
        
        newSection.append($('</section>'));
        
        $('#intro2').append(newSection);

      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      })
    
      return false; // Prevent the default button behavior
    }
  });
});
