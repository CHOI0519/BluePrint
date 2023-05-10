fetch('text.json')
  .then(response => response.json())
  .then(data  => {
    const entries = data.entries;
    const randomIndex = Math.floor(Math.random() * entries.length);
    const selectedEntry = entries[randomIndex];
    const outputDiv = document.getElementById('random-text');
    outputDiv.innerHTML = 
      `${selectedEntry.text}<br>${selectedEntry.person}`;
  })
  .catch(error => console.error(error));