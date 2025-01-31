document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[name="gameData"]');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true;

    // Validation (add more as needed)
    const gameTitleInput = document.getElementById('gameTitle');
    if (gameTitleInput.value.trim() === '') {
      alert('Please enter a Game Title.');
      isValid = false;
    }
    // Add validation for other required fields here...

    // Data Usage Checkbox
    const dataUsageCheckbox = document.getElementById('dataUsage');
    if (!dataUsageCheckbox.checked) {
      alert('You must agree to the data usage terms.');
      isValid = false;
    }

    if (isValid) {
      console.log("Form is valid, preparing to send data...");

      // 1. Capture Form Data:
      const formData = {};
      const formElements = form.elements;

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) { // Check if the element has a name attribute
          formData[element.name] = element.type === 'checkbox' ? element.checked : element.value;
        }
      }

      console.log("Captured form data:", formData);

      // 2. Send Data to Serverless Function:
      fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        console.log("Response from serverless function:", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
        form.reset(); // Optionally reset the form after successful submission
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Form submission failed. Please try again.');
      });
    }
  });
});
