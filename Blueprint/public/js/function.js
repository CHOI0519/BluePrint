// function loadHTML(){
//     fetch('/ListPage.html')
//       .then(response => response.text())
//       .then(html => {
//         const targetDiv = document.getElementById('box2');
//         targetDiv.innerHTML = html;
//         // loadMap();
//       })
//       .catch(error => {
//         console.error('Error loading HTML:', error);
//       });
//     }

function loadHTML() {
    location.href = "/public/ListPage.html";
}
