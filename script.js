$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.rest-button').click(clickedRestButton);

    // Navigation arrows when switching between pets
    $('.arrow-left').click(prevPet);
    $('.arrow-right').click(nextPet);
   });

    // Pet constructor function
    function Pet(name, weight, happiness, energy, imageSrc) {
      this.name = name;
      this.weight = weight;
      this.happiness = happiness;
      this.energy = energy;
      this.imageSrc = imageSrc;
    }

    // Create pet instances with the constructor
    var pets = [
      new Pet("Tigress", 10, 50, 100, "images/tiger.png"),
      new Pet("Ellie", 90, 40, 80, "images/elephant.png"),
      new Pet("Red", 70, 60, 90, "images/red-panda.png")
    ];

    // To tell which Pet we are currently viewing
    var currentPetIndex = 0;
    
    // Get the current pet
    function getCurrentPet() {
      return pets[currentPetIndex];
    }

    // Function To go to previous pet
    function prevPet() {
      currentPetIndex--;
      if (currentPetIndex < 0) {
        currentPetIndex = pets.length - 1; // Wrap around to last pet
      }
      checkAndUpdatePetInfoInHtml();
    }

    // Function To go to next pet
    function nextPet() {
      currentPetIndex++;
      if (currentPetIndex >= pets.length) {
        currentPetIndex = 0;
      }
      checkAndUpdatePetInfoInHtml();
    }
  
    function clickedTreatButton() {
      var pet = getCurrentPet();
      // Increase pet happiness
      // Increase pet weight
      pet.happiness += 5;
      pet.weight += 2;

      //Shake animation for pet image when treat button is clicked
      shakePetImage();

      // Visual notification after button press
      showPetNotif("You gave " + pet.name + " a treat!");
      
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      var pet = getCurrentPet();
      // Increase pet happiness
      // Decrease pet weight
      pet.happiness += 10;
      pet.weight -= 1;
      pet.energy -= 5;

      //Shake pet image
      shakePetImage();

      // Visual notification after button press
      showPetNotif("You played with " + pet.name + "!");

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      var pet = getCurrentPet();
      // Decrease pet happiness
      // Decrease pet weight
      pet.happiness -= 5;
      pet.weight -= 3;
      pet.energy -= 15;

      // Shake pet image
      shakePetImage();

      // Visual notification after button press
      showPetNotif(pet.name + " exercised!");

      checkAndUpdatePetInfoInHtml();
    }

    function clickedRestButton() {
      var pet = getCurrentPet();
      // Increase pet energy
      pet.energy += 20;

      // shake pet image
      shakePetImage();

      // Visual notification after button press
      showPetNotif(pet.name + " is resting!");

      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessAndEnergyBeforeUpdating();
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessAndEnergyBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      var pet = getCurrentPet();
      if (pet.weight < 0 && pet.energy < 0) {
        pet.weight = 0;
        pet.energy = 0;
        showPetNotif(pet.name + " is out of energy and weight cannot go below zero!");
      }
      if (pet.happiness < 0) {
        pet.happiness = 0;
        showPetNotif(pet.name + " is very unhappy! Please give them a treat.");
      }
      if (pet.weight < 0) {
        pet.weight = 0;
        showPetNotif(pet.name + "'s weight cannot go below zero!");
      }
      //Add conditional if energy is lower than zero.
      if (pet.energy < 0) {
        pet.energy = 0;
        showPetNotif(pet.name + " is out of energy!");
      }

      //New conditional to check if weight, happiness, and energy levels are capped at 100
      if (pet.weight > 100) {
        pet.weight = 100;
        showPetNotif(pet.name + "'s weight cannot exceed 100!");
      }
      if (pet.happiness > 100) {
        pet.happiness = 100;
        showPetNotif(pet.name + "'s happiness cannot exceed 100!");
      }
      if (pet.energy > 100) {
        pet.energy = 100;
        showPetNotif(pet.name + "'s energy cannot exceed 100!");
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    // Also calculate a new health score and update the hearts based on current values
    function updatePetInfoInHtml() {
      var pet = getCurrentPet();
      $('.name').text(pet.name);
      $('.weight').text(pet.weight);
      $('.happiness').text(pet.happiness);
      $('.energy').text(pet.energy);
      $('.pet-image').attr('src', pet.imageSrc);

      // Calculate and update health hearts
      updateHealthHearts();
    }
  
    // Function to shake the pet image
    function shakePetImage() {
      $('.pet-image')
        .stop(true, true) // Added stop() to prevent unwanted animations
        .animate({ 'top': '-40px' }, 120)
        .animate({ 'top': '5px' }, 100)
        .animate({ 'top': '-30px' }, 120)
        .animate({ 'top': '0px' }, 100)
        .animate({ 'top': '-15px' }, 100)
        .animate({ 'top': '0px' }, 100);       
    }

    // Function for pet notif
    function showPetNotif(message) {
      $('.pet-notif')
        // UNIQUE METHOD: .stop(). Stops the current animation, clears the animation queue, and completes all animations after.
        // jquery reference: https://api.jquery.com/stop/
        // I am using the stop() method here to cancel the animation beforehand as to not have the message appear mutliple times.
        .stop(true, true)
        .text(message)
        // UNIQUE METHOD: .fadeTo(). First parameter is the duration in ms to fade to the opacity of the second parameter.
        // "slow" is another way to specify duration, 600ms.
        // jquery reference: https://api.jquery.com/fadeTo/
        .fadeTo(0, 0) // Invisible element
        .fadeTo("slow", 1); // Fade in to fully visible over 1 second
    }

    // Function for a way to calculate pet health -> Since I capped all values at 100, I can take their average like so:
    function calculatePetHealth() {
      var pet = getCurrentPet();
      var healthScore = (pet.happiness + pet.weight + pet.energy) / 3;
      return Math.round(healthScore); // returns rounded average
    } 

    function updateHealthHearts() {
      var health = calculatePetHealth();
      var hearts = '';

      // Number of hearts to display
      // (Hearts taken from: https://emojicombos.com/heart-symbols)
      if (health >= 0 && health < 20) {
        hearts = '❤︎';  // 1 heart
      } else if (health >= 20 && health < 40) {
        hearts = '❤︎❤︎';  // 2 hearts
      } else if (health >= 40 && health < 60) {
        hearts = '❤︎❤︎❤︎';  // 3 hearts
      } else if (health >= 60 && health < 80) {
        hearts = '❤︎❤︎❤︎❤︎';  // 4 hearts
      } else if (health >= 80 && health <= 100) {
        hearts = '❤︎❤︎❤︎❤︎❤︎';  // 5 hearts
      }

      // Display hearts
      $('.health-hearts').html(hearts);
    }
