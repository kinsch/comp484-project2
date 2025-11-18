$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.rest-button').click(clickedRestButton);
  
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Miffy", weight:10, happiness:50, energy:100};
  
    function clickedTreatButton() {
      // Increase pet happiness
      // Increase pet weight
      pet_info.happiness += 5;
      pet_info.weight += 2;

      //Shake animation for pet image when treat button is clicked
      shakePetImage();

      // Visual notification after button press
      $('.pet-notif')
        .text("You gave your pet a treat!")
        // UNIQUE METHOD: .fadeTo(). First parameter is the duration in ms to fade to the opacity of the second parameter.
        // "slow" is another way to specify duration, 600ms.
        // jquery reference: https://api.jquery.com/fadeTo/
        .fadeTo(0, 0) // Invisible element
        .fadeTo("slow", 1); // Fade in to fully visible over 1 second

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      // Decrease pet weight
      pet_info.happiness += 10;
      pet_info.weight -= 1;
      pet_info.energy -= 5;

      //Shake pet image
      shakePetImage();

      // Visual notification after button press
      $('.pet-notif')
        .text("You played with your pet!")
        .fadeTo(0, 0) // Invisible element
        .fadeTo("slow", 1); // Fade in to fully visible over 1 second

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      // Decrease pet weight
      pet_info.happiness -= 5;
      pet_info.weight -= 3;
      pet_info.energy -= 15;

      // Shake pet image
      shakePetImage();

      // Visual notification after button press
      $('.pet-notif')
        .text("Your pet exercised!")
        .fadeTo(0, 0) // Invisible element
        .fadeTo("slow", 1); // Fade in to fully visible over 1 second

      checkAndUpdatePetInfoInHtml();
    }

    function clickedRestButton() {
      // Increase pet energy
      pet_info.energy += 20;

      // shake pet image
      shakePetImage();

      // Visual notification after button press
      $('.pet-notif')
          .text("Your pet is resting!")
          .fadeTo(0, 0) // Invisible element
          .fadeTo("slow", 1); // Fade in to fully visible over 1 second

      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessAndEnergyBeforeUpdating();
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessAndEnergyBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info['weight'] < 0 && pet_info['energy'] < 0) {
        pet_info['weight'] = 0;
        pet_info['energy'] = 0;
        $('.pet-notif')
          // UNIQUE METHOD: .stop(). Stops the current animation, clears the animation queue, and completes all animations after.
          // jquery reference: https://api.jquery.com/stop/
          // I am using the stop() method here to cancel the animation beforehand as to not have the message appear mutliple times.
          .stop(true, true)
          .text("Your pet's weight cannot go below zero and is out of energy!")
          .fadeTo(0, 0) // Invisible element
          .fadeTo("slow", 1); // Fade in to fully visible over 1 second
      }
      if (pet_info['happiness'] < 0) {
        pet_info['happiness'] = 0;
        $('.pet-notif')
          .stop(true, true)
          .text("Your pet is severely unhappy. Please give them a treat!")
          .fadeTo(0, 0) // Invisible element
          .fadeTo("slow", 1); // Fade in to fully visible over 1 second
      }
      if (pet_info['weight'] < 0) {
        pet_info['weight'] = 0;
        $('.pet-notif')
          .stop(true, true)
          .text("Your pet's weight cannot go below zero!")
          .fadeTo(0, 0) // Invisible element
          .fadeTo("slow", 1); // Fade in to fully visible over 1 second
      }
      //Add conditional if energy is lower than zero.
      if (pet_info['energy'] < 0) {
        pet_info['energy'] = 0;
        $('.pet-notif')
          .stop(true, true)
          .text("Your pet is out of energy!")
          .fadeTo(0, 0) // Invisible element
          .fadeTo("slow", 1); // Fade in to fully visible over 1 second
      }
      //No conditional added to check if happiness is lower than zero because a pet can be very unhappy.
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info['energy']);
    }
  
    // Function to shake the pet image
    function shakePetImage() {
      $('.pet-image')
        .animate({ marginLeft: "-=10px" }, 100)
        .animate({ marginLeft: "+=20px" }, 100)
        .animate({ marginLeft: "-=20px" }, 100)
        .animate({ marginLeft: "+=10px" }, 100);
    }