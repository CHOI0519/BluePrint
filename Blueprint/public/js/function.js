var valid = true;

function gomain() {
    location.href = "/views/MainPage.html";
}

// 체크리시트 빈칸 사항 점검
function AlertCheckbox1(){
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

function AlertCheckbox2(){
  if($('#cm').val().length == 0){
    alert("키를 입력하세요");
    valid = true;
    return false;
  }
  else{
    valid = false;
  }
}


function AlertCheckbox3(){
  if($('#kg').val().length == 0){
    alert("몸무게를 입력하세요");
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

    AlertCheckbox2();
    AlertCheckbox3();
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
    BMI = weightValue / (heightValue/100)**2 ;
    if (BMI <= 18.5){
      BMI_result = "저체중"
    } if (18.5 < BMI <= 22.9 ) {
      BMI_result = "정상"
    } if (22.9 < BMI < 25 ) {
      BMI_result = "과체중"
    } else {
      BMI_result = "비만"
    }; 
    console.log(BMI_result);
    

    // 성별 변수 선언
    var gendercheck;
    if (jsonData[2].name === "gender1") {
      gendercheck = "남자"
    } else {
      gendercheck = "여자"
    };
  


    var loadingDiv = $('<div id="loading"></div>');
    var image = new Image();
    image.src = '/public/image/loading.gif';
  
    //console.log(valid);
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

        var newSection = $('<h2>키 : ' + + heightValue + ' cm</h2>');
        $('#intro2').append(newSection);

      })
      .catch(error => {
        console.error('Error loading HTML:', error);
      })
    
      return false; // Prevent the default button behavior
    }
  });
});
