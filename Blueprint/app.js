fetch('text.json')
  .then(response => response.json())
  .then(texts => {
    const values = texts.textValues;
    const randomIndex = Math.floor(Math.random() * values.length);
    const randomValue = values[randomIndex];
    const outputDiv = document.getElementById('random-text');
    outputDiv.innerHTML = {
      randomValue
    };
  })
  .catch(error => console.error(error));