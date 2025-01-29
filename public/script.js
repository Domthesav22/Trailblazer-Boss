document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[name="gameData"]');

  form.addEventListener('submit', function(event) {
    let isValid = true;

    // Example validation: Check if gameTitle is filled
    const gameTitleInput = document.getElementById('gameTitle');
    if (gameTitleInput.value.trim() === '') {
      alert('Please enter a Game Title.');
      isValid = false;
      event.preventDefault(); // Prevent form submission
    }

    // Add more validation for other required fields...

    if (isValid) {
      console.log("Form is valid, submitting...");
      // Here you will eventually add the code to send data to the serverless function
    }
  });
});
